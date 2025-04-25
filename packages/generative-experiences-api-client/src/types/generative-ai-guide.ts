import { Hit } from '@algolia/client-search';

export type BaseGuide = {
  objectID: string;
  status: 'draft' | 'generating' | 'headline' | 'published';
  title: string;
  score_content: number;
  generated_at: number;
};

export type CategoryGuide = BaseGuide & {
  type: 'category';
  description: string;
  category: string;
  objects: Hit[];
  objectIDs: string[];
  content: Array<{
    type: 'conclusion' | 'factor' | 'introduction';
    title: string;
    content: string;
  }>;
  score_headline: number;
};

export type ShoppingGuideType = BaseGuide & {
  type: 'shopping_guide';
  description: string;
  category: string;
  objects: Hit[];
  objectIDs: string[];
  content: Array<{ title: string; content: string }>;
  score_headline: number;
};

export type ComparisonGuide = BaseGuide & {
  type: 'comparison';
  objects: Hit[];
  objectIDs: string[];
  content: Array<{
    title: string;
    type: 'conclusion' | 'introduction' | 'product';
    objectID?: string;
    content: string;
  }>;
  comparedObjectIDs: string[];
};

export type GenerativeAIGuide =
  | CategoryGuide
  | ShoppingGuideType
  | ComparisonGuide;
