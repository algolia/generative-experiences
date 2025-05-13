export type ProductsComparisonOptions = {
  objectIDs: string[];
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
  custom_content?: string;
  keywords?: string[];
};
