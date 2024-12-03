export type CommerceGetters = {
  /**
   * URL for a specific guide.
   */
  guideURL: (objectID: string) => string;
  /**
   * URL for a specific product.
   */
  objectURL: (objectID: string) => string;
  /**
   * List of images for a product.
   */
  images: (
    object: Record<string, unknown>
  ) => Array<{ src: string; alt: string }>;
};
