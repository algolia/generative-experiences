import type { FacetFilters } from 'algoliasearch';
import type { PlainSearchParameters } from 'algoliasearch-helper';
import { liteClient } from 'algoliasearch/lite';

import {
  GenerationSource,
  ProductsComparisonOptions,
  RequestParameters,
  ShoppingGuide,
  ShoppingGuideContentOptions,
  ShoppingGuideContentOptionsForGenerated,
  ShoppingGuideContentOptionsForIndex,
  ShoppingGuideHeadline,
  ShoppingGuideHeadlinesOptionsForCombined,
  ShoppingGuideHeadlinesOptionsForGenerated,
  ShoppingGuideHeadlinesOptionsForIndex,
  TasksResponse,
} from './types';
import { version } from './version';

export type CreateClientOptions = {
  /**
   * Host of the API.
   */
  host?: string;
  /**
   * App to target with the initialized client.
   */
  appId: string;
  /**
   * Index name to target.
   */
  indexName: string;
  /**
   * A *Search Only* API key of the targeted app ID.
   * Should have granted ACLs: `search`
   *
   * https://www.algolia.com/doc/guides/security/api-keys/#search-only-api-key
   */
  searchOnlyAPIKey: string;
  /**
   * A *Write* API key of the targeted app ID.
   * Should have granted ACLs: `addObject`, `deleteObject`
   *
   * https://www.algolia.com/doc/guides/security/api-keys/#rights-and-restrictions
   */
  writeAPIKey?: string;
};

export const DEFAULT_HOST = 'https://generative-ai.algolia.com';

export function createClient(opts: CreateClientOptions) {
  if (!opts.appId) {
    throw new Error('Missing appId');
  }
  if (!opts.indexName) {
    throw new Error('Missing indexName');
  }
  if (!opts.searchOnlyAPIKey) {
    throw new Error('Missing searchOnlyAPIKey');
  }

  const searchClient = liteClient(opts.appId, opts.searchOnlyAPIKey);

  searchClient.addAlgoliaAgent('generative-experiences-api-client', version);

  return {
    options: {
      ...opts,
      host: opts.host || DEFAULT_HOST,
    },
    transporter: searchClient.transporter,
    search: searchClient.searchForHits,
    appId: searchClient.appId,
    addAlgoliaAgent: searchClient.addAlgoliaAgent,
    async clearCache() {
      await searchClient.clearCache();
    },

    async request({
      path,
      body,
      options = {},
    }: {
      path: string;
      body?: Record<string, unknown>;
      options?: RequestInit;
    }) {
      const response = await fetch(this.options.host + path, {
        body: body && JSON.stringify(body),
        ...options,
        headers: {
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          'X-Algolia-Application-Id': this.options.appId,
          'X-Algolia-API-Key': body?.output_api_key
            ? String(body?.output_api_key)
            : '',
          ...options.headers,
        },
      });

      const contentType = response.headers.get('content-type');
      const content = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(content?.error || content);
      }

      return content;
    },

    async waitTask(
      { taskID }: { taskID: string },
      requestOptions?: RequestParameters
    ) {
      do {
        await new Promise((r) => {
          setTimeout(r, 2000);
        });
      } while (
        (
          await this.request({
            path: `/task/${taskID}/status/`,
            options: requestOptions,
          })
        ).completed === false
      );

      return await this.request({
        path: `/task/${taskID}/result/`,
        options: requestOptions,
      });
    },

    async generateHeadlines(
      options: Omit<ShoppingGuideHeadlinesOptionsForGenerated, 'source'>,
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      const { taskID } = await this.request({
        path: '/generate/shopping_guides_headlines/',
        body: {
          index_name: this.options.indexName,
          output_application_id: this.options.appId,
          output_api_key: this.options.writeAPIKey,
          output_index_name: this._outputIndexName(),
          ...options,
        },
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });

      return await this.waitTask({ taskID }, requestOptions);
    },

    async generateContent(
      {
        objectID,
        type = 'shopping_guide',
        ...options
      }: Omit<ShoppingGuideContentOptionsForGenerated, 'source'>,
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      const { taskID } = await this.request({
        path: `/generate/${type}_content/${objectID}/`,
        body: {
          index_name: this.options.indexName,
          output_application_id: this.options.appId,
          output_api_key: this.options.writeAPIKey,
          output_index_name: this._outputIndexName(),
          ...options,
        },
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });

      return await this.waitTask({ taskID }, requestOptions);
    },

    async generateComparison(
      { objectIDs, ...options }: ProductsComparisonOptions,
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      const { taskID } = await this.request({
        path: '/generate/products_comparison/',
        body: {
          object_ids: objectIDs,
          index_name: this.options.indexName,
          output_application_id: this.options.appId,
          output_api_key: this.options.writeAPIKey,
          output_index_name: this._outputIndexName(),
          ...options,
        },
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });

      return await this.waitTask({ taskID }, requestOptions);
    },

    async getHeadlines(
      {
        category,
        object,
        breadcrumbs = [],
        nbHeadlines = 4,
        onlyPublished = true,
        searchParams,
      }: Omit<ShoppingGuideHeadlinesOptionsForIndex, 'source'>,
      requestOptions?: PlainSearchParameters
    ) {
      const paths = breadcrumbs.reduce<string[]>((acc, facet) => {
        acc.push([acc.at(-1), facet].filter(Boolean).join(' > '));
        return acc;
      }, []);

      const response = await this.search<ShoppingGuideHeadline>([
        {
          indexName: this._outputIndexName(),
          params: {
            facetFilters: [
              category ? [`category:${category}`] : undefined,
              onlyPublished ? ['status:published'] : [],
            ].filter(Boolean) as FacetFilters,
            hitsPerPage: nbHeadlines,
            optionalFilters: [
              ...(object
                ? [
                    [
                      `objects.objectID:${object.objectID}<score=${paths.length}>`,
                    ],
                  ]
                : []),
              ...paths.map((facet, i) => [`category:${facet}<score=${i + 1}>`]),
            ],
            attributesToHighlight: [],
            getRankingInfo: true,
            ...searchParams,
            ...requestOptions,
          },
        },
      ]);

      return response?.results?.at(0)?.hits ?? [];
    },

    async getContent(
      {
        objectID,
        onlyPublished = true,
      }: Omit<ShoppingGuideContentOptionsForIndex, 'source'>,
      requestOptions?: PlainSearchParameters
    ) {
      const res = await this.search<ShoppingGuide>([
        {
          indexName: this._outputIndexName(),
          params: {
            facetFilters: [
              `objectID:${objectID}`,
              onlyPublished ? 'status:published' : undefined,
            ].filter(Boolean) as FacetFilters,
            hitsPerPage: 1,
            ...requestOptions,
          },
        },
      ]);

      const record = res?.results?.at(0)?.hits?.at(0);
      if (record?.content) {
        return record;
      }
      return null;
    },

    async getOrGenerateHeadlines<TSource extends GenerationSource>(
      params: {
        combined: ShoppingGuideHeadlinesOptionsForCombined;
        generated: ShoppingGuideHeadlinesOptionsForGenerated;
        index: ShoppingGuideHeadlinesOptionsForIndex;
      }[TSource] & {
        source?: TSource;
      },
      {
        searchParams,
        requestParams,
      }: {
        searchParams?: PlainSearchParameters;
        requestParams?: RequestParameters;
      } = {}
    ) {
      if (params.source === 'combined' || params.source === 'index') {
        const headlines = await this.getHeadlines(params, searchParams);
        if (headlines && Array.isArray(headlines) && headlines.length > 0) {
          return headlines;
        }
      }

      if (params.source === 'combined' || params.source === 'generated') {
        if (params.source === 'combined') {
          const {
            generateParams,
            ...combinedParams
          } = params as ShoppingGuideHeadlinesOptionsForCombined;
          return await this.generateHeadlines(
            {
              ...combinedParams,
              ...generateParams,
            },
            requestParams
          );
        }
        // @ts-expect-error - types for params clash
        return await this.generateHeadlines(params, requestParams);
      }

      return null;
    },

    async getOrGenerateContent<TSource extends GenerationSource>(
      {
        source,
        ...args
      }: ShoppingGuideContentOptions & {
        source: TSource;
      },
      {
        searchParams,
        requestParams,
      }: {
        searchParams?: PlainSearchParameters;
        requestParams?: RequestParameters;
      }
    ) {
      if (source === 'combined' || source === 'index') {
        const record = await this.getContent(args, searchParams);
        if (
          record &&
          Array.isArray(record.content) &&
          record.content.length > 0
        ) {
          return record;
        }
      }

      if (source === 'combined' || source === 'generated') {
        return await this.generateContent(args, requestParams);
      }

      return null;
    },

    async vote({
      objectIDs,
      voteType,
      userToken,
      voteTarget,
    }: {
      objectIDs: string[];
      voteType: 'upvote' | 'downvote';
      voteTarget: 'content' | 'headline';
      userToken: string;
    }) {
      return await this.request({
        path: '/vote/',
        body: {
          index_name: this.options.indexName,
          output_application_id: this.options.appId,
          // replace with searchOnly Key after BE patch
          output_api_key: this.options.writeAPIKey,
          output_index_name: this._outputIndexName(),
          object_ids: objectIDs,
          vote_type: voteType,
          vote_target: voteTarget,
          user_token: userToken,
        },
        options: {
          method: 'POST',
        },
      });
    },

    async deleteHeadlines(
      { objectIDs }: { objectIDs: string[] },
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      return await this.request({
        path: '/delete/shopping_guides/',
        body: {
          object_ids: objectIDs,
          output_application_id: this.options.appId,
          output_api_key: this.options.writeAPIKey,
          index_name: this._outputIndexName(),
        },
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });
    },

    async deleteContent(
      { objectIDs }: { objectIDs: string[] },
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      return await this.request({
        path: '/delete/shopping_guides_content/',
        body: {
          object_ids: objectIDs,
          output_application_id: this.options.appId,
          output_api_key: this.options.writeAPIKey,
          index_name: this._outputIndexName(),
        },
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });
    },

    async updateShoppingGuide(
      {
        objectID,
        data,
      }: {
        objectID: string;
        data: Partial<Omit<ShoppingGuide, 'objectID'>>;
      },
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      return await this.request({
        path: '/update/shopping_guide/',
        body: {
          object_id: objectID,
          data,
          output_application_id: this.options.appId,
          output_api_key: this.options.writeAPIKey,
          index_name: this._outputIndexName(),
        },
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });
    },

    async createShoppingGuidesIndex(
      { indexName }: { indexName: string },
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      return await this.request({
        path: '/create/shopping_guides_index/',
        body: {
          output_application_id: this.options.appId,
          output_api_key: this.options.writeAPIKey,
          index_name: indexName,
        },
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });
    },

    async tasks(
      _args: unknown,
      requestOptions?: RequestParameters
    ): Promise<TasksResponse> {
      return await this.request({
        path: '/tasks/',
        options: {
          ...requestOptions,
        },
      });
    },

    _outputIndexName() {
      return `shopping_guides_${this.options.indexName}`;
    },
  };
}

export type CommerceClient = ReturnType<typeof createClient>;
export type CommerceClientOptions = Parameters<typeof createClient>[0];
