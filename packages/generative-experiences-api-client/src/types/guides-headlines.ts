import type { PlainSearchParameters } from 'algoliasearch-helper';

import { CommerceClient } from '../client';

import { GenerationSource } from './utils';

export type GuideHeadline = {
  objectID: string;
  title: string;
  description: string;
  objects: any[];
  objectIDs: string[];
  category: string;
  status: 'draft' | 'generating' | 'headline' | 'published';
  score_headline: number;
};

export type GuideHeadlinesRequestParameters = {
  category?: string;
  nb_headlines?: number;
  index_name?: string;
  output_application_id?: string;
  output_api_key?: string;
  output_index_name?: string;
  /**
   * Parameters to pass to the Algolia search for the matching items.
   */
  search_parameters?: PlainSearchParameters;
  /**
   * @default 'english'
   */
  language_code?: string;
  /**
   * @default 'natural'
   */
  tone?: string;
  custom_content?: string;
  keywords?: string[];
  wait?: boolean;
};

export type GuideHeadlinesOptionsForIndex = {
  source?: 'index';
  nbHeadlines?: number;
  showFeedback?: boolean;
  category?: string;
  object?: { objectID: string };
  breadcrumbs?: string[];
  /**
   * Search parameters to pass to the Algolia search for headlines.
   */
  searchParams?: PlainSearchParameters;
  /**
   * Only return headlines that have had their content generated.
   */
  onlyPublished?: boolean;
};
export type GuideHeadlinesOptionsForGenerated = Partial<GuideHeadlinesRequestParameters> & {
  source: 'generated';
  nbHeadlines?: number;
  category: string;
  showFeedback?: boolean;
};

export type GuideHeadlinesOptionsForCombined = {
  source: 'combined';
  nbHeadlines?: number;
  category: string;
  showFeedback?: boolean;
  object?: { objectID: string };
  breadcrumbs?: string[];
  searchParams?: PlainSearchParameters;
  generateParams?: GuideHeadlinesRequestParameters;
  /**
   * Only return headlines that have had their content generated and published.
   * This is only used when source is 'index' or 'combined'.
   *
   * @default true
   */
  onlyPublished?: boolean;
};

export type GuideHeadlinesOptions = Omit<
  GuideHeadlinesOptionsForCombined,
  'source'
> & {
  source?: GenerationSource;
  showImmediate?: boolean;
  client: CommerceClient;
};
