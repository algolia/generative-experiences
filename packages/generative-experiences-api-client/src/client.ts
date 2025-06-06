import type { FacetFilters } from 'algoliasearch';
import { algoliasearch } from 'algoliasearch';
import type { PlainSearchParameters } from 'algoliasearch-helper';

import { getObjectIDs, getObjects } from './helpers/records';
import {
  GenerationSource,
  Guide,
  GuideContentOptions,
  GuideContentOptionsForGenerated,
  GuideContentOptionsForIndex,
  GuideHeadline,
  GuideHeadlinesOptionsForCombined,
  GuideHeadlinesOptionsForGenerated,
  GuideHeadlinesOptionsForIndex,
  ProductsComparisonOptions,
  RequestParameters,
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
  /**
   * Region of the Algolia Application. Either 'us' or 'eu'.
   */
  region?: 'us' | 'eu';
};

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

  const searchClient = algoliasearch(opts.appId, opts.searchOnlyAPIKey);

  searchClient.addAlgoliaAgent('generative-experiences-api-client', version);

  const region = opts.region ?? 'us';

  return {
    options: {
      ...opts,
      host: opts.host || `https://generative-${region}.algolia.com/`,
    },
    transporter: searchClient.transporter,
    searchSingleIndex: searchClient.searchSingleIndex,
    search: searchClient.search,
    appId: searchClient.appId,
    addAlgoliaAgent: searchClient.addAlgoliaAgent,
    async clearCache() {
      await searchClient.clearCache();
    },

    async request({
      path,
      body,
      headers = {},
      options = {},
    }: {
      path: string;
      body?: Record<string, unknown>;
      headers: Record<string, unknown>;
      options?: RequestInit;
    }) {
      const response = await fetch(this.options.host + path, {
        body: body && JSON.stringify(body),
        ...options,
        headers: {
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          ...headers,
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
      headers: Record<string, unknown>,
      requestOptions?: RequestParameters
    ) {
      do {
        await new Promise((r) => {
          setTimeout(r, 2000);
        });
      } while (
        (
          await this.request({
            path: `/1/task/${taskID}/status`,
            headers,
            options: requestOptions,
          })
        ).completed === false
      );

      return await this.request({
        path: `/1/task/${taskID}/result`,
        headers,
        options: requestOptions,
      });
    },

    async generateHeadlines(
      options: Omit<GuideHeadlinesOptionsForGenerated, 'source'>,
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.writeAPIKey,
      };

      const { taskID } = await this.request({
        path: '/1/generate/headlines',
        body: {
          index_name: this.options.indexName,
          output_index_name: this._outputIndexName(),
          ...options,
        },
        headers,
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });

      return await this.waitTask({ taskID }, headers, requestOptions);
    },

    async generateContent(
      { objectID, ...options }: Omit<GuideContentOptionsForGenerated, 'source'>,
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }
      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.writeAPIKey,
      };

      const { taskID } = await this.request({
        path: `/1/generate/guide_content/${objectID}`,
        body: {
          index_name: this.options.indexName,
          output_index_name: this._outputIndexName(),
          ...options,
        },
        headers,
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });

      return await this.waitTask({ taskID }, headers, requestOptions);
    },

    async generateComparison(
      { objectIDs, ...options }: ProductsComparisonOptions,
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }

      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.writeAPIKey,
      };

      const { taskID } = await this.request({
        path: '/1/generate/products_comparison',
        body: {
          object_ids: objectIDs,
          index_name: this.options.indexName,
          output_index_name: this._outputIndexName(),
          ...options,
        },
        headers,
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });

      return await this.waitTask({ taskID }, headers, requestOptions);
    },

    async getHeadlines(
      {
        category,
        object,
        breadcrumbs = [],
        maxHeadlines = 4,
        onlyPublished = true,
        searchParams,
      }: Omit<GuideHeadlinesOptionsForIndex, 'source'>,
      requestOptions?: PlainSearchParameters
    ) {
      if (maxHeadlines < 0 || maxHeadlines > 1000) {
        throw new Error(
          `maxHeadlines expected value between 1 and 1,000, maxHeadlines=${maxHeadlines}`
        );
      }
      const paths = breadcrumbs.reduce<string[]>((acc, facet) => {
        acc.push([acc.at(-1), facet].filter(Boolean).join(' > '));
        return acc;
      }, []);

      const res = await this.searchSingleIndex<GuideHeadline>({
        indexName: this._outputIndexName(),
        searchParams: {
          facetFilters: [
            category ? [`category:${category}`] : undefined,
            onlyPublished ? ['status:published'] : [],
          ].filter(Boolean) as FacetFilters,
          hitsPerPage: maxHeadlines,
          optionalFilters: [
            ...(object
              ? [[`objects.objectID:${object.objectID}<score=${paths.length}>`]]
              : []),
            ...paths.map((facet, i) => [`category:${facet}<score=${i + 1}>`]),
          ],
          attributesToHighlight: [],
          getRankingInfo: true,
          ...searchParams,
          ...requestOptions,
        },
      });

      // slice is not necessary because of the search call uses hitsPerPage
      // but it is helpful for tests
      const headlines: GuideHeadline[] =
        res?.hits?.slice(0, maxHeadlines) ?? [];

      if (res?.hits) {
        /**
         * For backward compatibility, we need to ensure that the objectIDs array is filled.
         * This can be dropped at the next major release.
         */

        headlines?.map((hit) => {
          if (Boolean(hit.objects?.length) && !hit.objectIDs?.length) {
            hit.objectIDs = getObjectIDs(hit.objects);
          }
        });

        /**
         * Fetch records from objectIDs, this used to be done on the API side. But the records could get too large, so this logic is now done on the client side.
         */
        const objectIDs = Array.from(
          new Set(res?.hits?.flatMap((hit) => hit.objectIDs) ?? [])
        ).filter(Boolean);

        const objects = await getObjects(
          objectIDs,
          this.options.indexName,
          searchClient
        );

        headlines?.map((hit) => {
          if (Boolean(hit.objectIDs?.length) && !hit.objects?.length) {
            hit.objectIDs.forEach((objectID) => {
              const object = objects.find(
                (object) => object.objectID === objectID
              );
              if (!hit.objects) {
                hit.objects = [];
              }
              hit.objects.push(object);
            });
          }
        });
      }

      return headlines;
    },

    async getContent(
      {
        objectID,
        onlyPublished = true,
      }: Omit<GuideContentOptionsForIndex, 'source'>,
      requestOptions?: PlainSearchParameters
    ) {
      const res = await this.searchSingleIndex<Guide>({
        indexName: this._outputIndexName(),
        searchParams: {
          facetFilters: [
            `objectID:${objectID}`,
            onlyPublished ? 'status:published' : undefined,
          ].filter(Boolean) as FacetFilters,
          hitsPerPage: 1,
          ...requestOptions,
        },
      });

      const record = res?.hits?.at(0);

      if (record?.content) {
        /**
         * For backward compatibility, we need to ensure that the objectIDs array is filled.
         * This can be dropped at the next major release.
         */
        if (Boolean(record.objects?.length) && !record.objectIDs?.length) {
          record.objectIDs = getObjectIDs(record.objects);
        }

        /**
         * Fetch records from objectIDs, this used to be done on the API side. But the records could get too large, so this logic is now done on the client side.
         */
        if (Boolean(record.objectIDs?.length) && !record.objects?.length) {
          record.objects = await getObjects(
            record.objectIDs,
            this.options.indexName,
            searchClient
          );
        }

        return record;
      }

      return null;
    },

    async getOrGenerateHeadlines<TSource extends GenerationSource>(
      params: {
        combined: GuideHeadlinesOptionsForCombined;
        generated: GuideHeadlinesOptionsForGenerated;
        index: GuideHeadlinesOptionsForIndex;
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
          } = params as GuideHeadlinesOptionsForCombined;
          return await this.generateHeadlines(
            {
              ...combinedParams,
              ...generateParams,
            },
            requestParams
          );
        }
        return await this.generateHeadlines(params, requestParams);
      }

      return null;
    },

    async getOrGenerateContent<TSource extends GenerationSource>(
      {
        source,
        ...args
      }: GuideContentOptions & {
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
      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.searchOnlyAPIKey,
      };

      return await this.request({
        path: '/1/vote',
        body: {
          index_name: this.options.indexName,
          output_index_name: this._outputIndexName(),
          object_ids: objectIDs,
          vote_type: voteType,
          vote_target: voteTarget,
          user_token: userToken,
        },
        headers,
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

      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.writeAPIKey,
      };

      return await this.request({
        path: '/1/delete/guides',
        body: {
          object_ids: objectIDs,
          index_name: this._outputIndexName(),
        },
        headers,
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

      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.writeAPIKey,
      };

      return await this.request({
        path: '/1/delete/guides_content',
        body: {
          object_ids: objectIDs,
          index_name: this._outputIndexName(),
        },
        headers,
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });
    },

    async updateGuide(
      {
        objectID,
        data,
      }: {
        objectID: string;
        data: Partial<Omit<Guide, 'objectID'>>;
      },
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }
      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.writeAPIKey,
      };
      return await this.request({
        path: '/1/update/guide',
        body: {
          object_id: objectID,
          data,
          index_name: this._outputIndexName(),
        },
        headers,
        options: {
          method: 'POST',
          ...requestOptions,
        },
      });
    },

    async createGuidesIndex(
      { indexName }: { indexName: string },
      requestOptions?: RequestParameters
    ) {
      if (!this.options.writeAPIKey) {
        throw new Error('Missing writeAPIKey');
      }
      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.writeAPIKey,
      };

      return await this.request({
        path: '/1/create/guides_index/',
        body: {
          index_name: indexName,
        },
        headers,
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
      const headers = {
        'X-Algolia-Application-Id': this.options.appId,
        'X-Algolia-API-Key': this.options.writeAPIKey,
      };
      return await this.request({
        path: '/1/tasks',
        headers,
        options: {
          ...requestOptions,
        },
      });
    },

    _outputIndexName() {
      return `guides_${this.options.indexName}`;
    },
  };
}

export type CommerceClient = ReturnType<typeof createClient>;
export type CommerceClientOptions = Parameters<typeof createClient>[0];
