import { Hit } from '@algolia/client-search';

import { Guide } from '@algolia/generative-experiences-api-client';

import { CommerceGetters } from './CommerceGetters';
import { Renderer } from './Renderer';

export const defaultState: Guide = {
  objectID: 'default',
  status: 'draft',
  title: '',
  score_content: 0,
  generated_at: 0,
  type: 'shopping_guide',
  description: '',
  category: '',
  objects: [],
  objectIDs: [],
  content: [
    {
      type: 'introduction',
      title: '',
      content: '',
    },
  ],
  score_headline: 0,
};

export type ContentClassNames = Partial<{
  wrapper?: string;
  container?: string;
  contentSection?: string;
  productLink?: string;
  heroImage?: string;
  factorSection?: string;
  introSection?: string;
  conclusionSection?: string;
  factorsSection?: string;
  factorsList?: string;
  productSection?: string;
  productFactorsList?: string;
  relatedItemsSection?: string;
  relatedItemsListContainer?: string;
  relatedItemsTitle?: string;
  relatedItemsList?: string;
  item?: string;
}>;

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

export type GSEContentRecord = {
  objectID: string;
  status: 'draft' | 'generating' | 'headline' | 'published';
  title: string;
  score_content: number;
  generated_at: number;
} & (
  | {
      type: 'category' | 'shopping_guide';
      description: string;
      category: string;
      objects: Hit[];
      content: Array<ContentBlock | FactorsContentBlock>;
      score_headline: number;
    }
  | {
      type: 'comparison';
      objects: Hit[];
      content: Array<ContentBlock | FactorsContentBlock | ProductContentBlock>;
      comparedObjectIDs: string[];
    }
);

export type GSEContentComponentProps = {
  classNames?: ContentClassNames;
  content: GSEContentRecord;
};

export type ContentChildrenProps = GSEContentComponentProps & {
  status: 'loading' | 'stalled' | 'idle';
  View(props: unknown): JSX.Element;
};

export type ContentViewProps<TClassNames extends Record<string, string>> = {
  classNames: TClassNames;
  item: GSEContentRecord;
  itemComponent<TComponentProps extends Record<string, unknown> = {}>(
    props: { hit: Hit | undefined } & Renderer & TComponentProps
  ): JSX.Element;
  feedbackComponent<TComponentProps extends Record<string, unknown> = {}>(
    props: {
      castFeedback: (
        voteType: 'upvote' | 'downvote',
        objectIDs?: string[],
        voteTarget?: 'content' | 'headline'
      ) => void;
      alreadyCast?: boolean;
    } & Renderer &
      TComponentProps
  ): JSX.Element;
  showFeedback?: boolean;
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
  alreadyCast?: boolean;
  getters: CommerceGetters;
};

export type ContentItemComponentProps<TObject = {}> = {
  hit: Hit<TObject>;
  classNames?: ContentClassNames;
  getters: CommerceGetters;
} & Renderer;

export type ContentComponentProps<
  TObject = {},
  TComponentProps extends Record<string, unknown> = {}
> = {
  itemComponent(props: ContentItemComponentProps<TObject>): JSX.Element;
  item: GSEContentRecord;
  classNames?: ContentClassNames;
  children?(props: ContentChildrenProps & TComponentProps): JSX.Element;
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
  alreadyCast?: boolean;
  showFeedback?: boolean;
  status: 'loading' | 'stalled' | 'idle';
  view?(
    props: ContentViewProps<Record<string, string>> & Renderer
  ): JSX.Element;
  getters?: CommerceGetters;
};
