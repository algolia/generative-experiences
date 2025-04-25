import type { PlainSearchParameters } from 'algoliasearch-helper';

import { CommerceClient } from '../client';

import { GenerationSource } from './utils';

export type GuideContentRequestParameters = {
  /**
   * @default 'shopping_guide'
   */
  type?: 'category_guide' | 'shopping_guide';
  /**
   * Parameters to pass to the Algolia search for the matching items.
   */
  search_parameters?: PlainSearchParameters;
  /**
   * Only return published guides.
   *
   * @default true
   */
  onlyPublished?: boolean;
  /**
   * Timestamp (in ns) of when the content was generated.
   */
  generated_at?: number;
  /**
   * @default 'english'
   */
  language_code?: string;
  /**
   * @default 'natural'
   */
  tone?: string;
  content_to_avoid?: string;
};

export type GuideContentOptionsForIndex = {
  objectID: string;
  source?: 'index';
  /**
   * Only return headlines that have had their content generated.
   */
  onlyPublished?: boolean;
};

export type GuideContentOptionsForGenerated = Partial<GuideContentRequestParameters> & {
  source: 'generated';
  objectID: string;
};

export type GuideContentOptionsForCombined = {
  source: 'combined';
  objectID: string;
  generateParams?: GuideContentRequestParameters;
  /**
   * Only return headlines that have had their content generated and published.
   * This is only used when source is 'index' or 'combined'.
   *
   * @default true
   */
  onlyPublished?: boolean;
};

export type GuideContentOptions = Omit<
  GuideContentOptionsForCombined,
  'source'
> & {
  source?: GenerationSource;
  showImmediate?: boolean;
  client: CommerceClient;
};
