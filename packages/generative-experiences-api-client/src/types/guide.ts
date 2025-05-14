import { Hit } from '@algolia/client-search';

export type BaseGuide = {
  objectID: string;
  status: 'draft' | 'generating' | 'headline' | 'published';
  title: string;
  score_content: number;
  generated_at: number;
};
export type ContentBlock = {
  type: 'conclusion' | 'factor' | 'introduction' | 'feature';
  title?: string;
  content: string;
};

export type FactorsContentBlock = {
  type: 'factors';
  title: string;
  content: Array<{ name: string; description: string }>;
};

export type ProductDescriptionContent = {
  type: 'description';
  content: string;
};

export type ProductFactorsContent = {
  type: 'product_factors';
  content: Array<{ name: string; description: string }>;
};

export type ProductContentBlock = {
  type: 'product';
  title: string;
  objectID: string;
  content: Array<ProductDescriptionContent | ProductFactorsContent>;
};

export type GuideType = BaseGuide & {
  type: 'shopping_guide' | 'category';
  description: string;
  category: string;
  objects: Hit[];
  objectIDs: string[];
  content: Array<ContentBlock | FactorsContentBlock>;
  score_headline: number;
};

export type ComparisonGuide = BaseGuide & {
  type: 'comparison';
  objects: Hit[];
  objectIDs: string[];
  content: Array<ContentBlock | FactorsContentBlock | ProductContentBlock>;
  comparedObjectIDs: string[];
};

export type Guide = GuideType | ComparisonGuide;
