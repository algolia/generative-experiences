import { Hit } from '@algolia/client-search';

export type BaseShoppingGuide = {
  objectID: string;
  status: 'draft' | 'generating' | 'headline' | 'published';
  title: string;
  score_content: number;
  generated_at: number;
};

export type CategoryGuide = BaseShoppingGuide & {
  type: 'category';
  description: string;
  category: string;
  objects: Hit[];
  content: Array<{
    type: 'conclusion' | 'factor' | 'introduction';
    title: string;
    content: string[];
  }>;
  score_headline: number;
};

export type ShoppingGuideType = BaseShoppingGuide & {
  type: 'shopping_guide';
  description: string;
  category: string;
  objects: Hit[];
  content: Array<{ title: string; content: string[] }>;
  score_headline: number;
};

export type ComparisonGuide = BaseShoppingGuide & {
  type: 'comparison';
  objects: Hit[];
  content: Array<{
    title: string;
    type: 'conclusion' | 'introduction' | 'product';
    objectID?: string;
    content: string[];
  }>;
  comparedObjectIDs: string[];
};

export type ShoppingGuide = CategoryGuide | ShoppingGuideType | ComparisonGuide;
