export const SingleHeadline = [
  {
    objectID: '1',
    title: 'Headline',
    description: 'Test Headlines',
    objects: [],
    category: 'category-headline',
    status: 'draft',
    score_headline: 0,
  },
];

export const GeneratedHeadline = [
  {
    objectID: '1',
    title: 'Generated Headline',
    description: 'Test Generated Headlines',
    objects: [],
    category: 'category-headline',
    status: 'draft',
    score_headline: 0,
  },
];

export const ShoppingGuide = {
  objectID: '1',
  status: 'published',
  title: 'Guide title',
  score_content: 0,
  type: 'shopping_guide',
  description: 'I am a guide',
  category: 'category-guide',
  objects: [],
  content: [{ title: 'Headline', content: 'Content' }],
  score_headline: 0,
};

export const GeneratedShoppingGuide = {
  objectID: '1',
  status: 'published',
  title: 'Generated Guide title',
  score_content: 0,
  type: 'shopping_guide',
  description: 'I am a generated guide',
  category: 'category-guide',
  objects: [],
  content: [{ title: 'Generated Headline', content: 'Generated Content' }],
  score_headline: 0,
};
