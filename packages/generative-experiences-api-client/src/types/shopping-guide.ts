export type ShoppingGuide = {
    objectID: string;
    content: Array<{ title: string; content: string[] }>;
    objects: any[];
    title: string;
    description: string;
    category: string;
    loading: false;
    status: 'draft' | 'generating' | 'headline' | 'published';
    generated_at: number;
    score_content: number;
    score_headline: number;
};