import { Hit } from '@algolia/client-search';
import {
  ContentBlock,
  FactorsContentBlock,
  Guide,
  ProductContentBlock,
} from '@algolia/generative-experiences-api-client';

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
  errorContainer?: string;
  errorContainerTitle?: string;
  contentSection?: string;
  productLink?: string;
  heroImage?: string;
  introSection?: string;
  articleContentSection?: string;
  factorsSection?: string;
  factorsList?: string;
  factorItem?: string;
  productSection?: string;
  productFactorsList?: string;
  relatedItemsSection?: string;
  relatedItemsListContainer?: string;
  relatedItemsTitle?: string;
  relatedItemsList?: string;
  item?: string;
}>;

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
  featuredItemsTitle?: string;
  maxFeaturedItems?: number;
  error?: Error | undefined;
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
  featuredItemsTitle?: string;
  maxFeaturedItems?: number;
  item: GSEContentRecord;
  error?: Error | undefined;
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
