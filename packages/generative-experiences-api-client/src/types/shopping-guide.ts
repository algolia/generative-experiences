export type ShoppingGuide = {
  objectID: string;
  content: Array<{ title: string; content: string[] }>;
  objects: any[];
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'generating' | 'headline' | 'published';
  type: 'shopping_guide' | 'comparison' | 'category';
  language: string;
  tone: string;
  generated_at: number;
  score_content: number;
  score_headline: number;
};
