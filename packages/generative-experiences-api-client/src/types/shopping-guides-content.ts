import type { PlainSearchParameters } from 'algoliasearch-helper';

export type ShoppingGuideContentOptions = {
  objectID: string;
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
   * @default 'en_US'
   */
  language_code?: string;
  /**
   * @default 'natural'
   */
  tone?: string;
  content_to_avoid?: string;
};
