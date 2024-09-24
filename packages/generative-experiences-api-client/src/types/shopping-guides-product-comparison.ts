export type ProductsComparisonOptions = {
    objectIDs: string[];
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