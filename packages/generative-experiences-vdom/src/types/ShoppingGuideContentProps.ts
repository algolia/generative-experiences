import { Hit } from '@algolia/client-search';

import { CommerceGetters } from './CommerceGetters';
import { Renderer } from './Renderer';

export type ContentClassNames = Partial<{
  wrapper?: string;
  container?: string;
  contentSection?: string;
  productLink?: string;
  heroImage?: string;
  factorSection?: string;
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
    }
  | {
      type: 'comparison';
      objects: Hit[];
      content: Array<{
        title: string;
        type: 'conclusion' | 'introduction' | 'product';
        objectID?: string;
        content: string[];
      }>;
      comparedObjectIDs: string[];
    }
  | {
      type: 'shopping_guide';
      description: string;
      category: string;
      objects: Hit[];
      content: Array<{ title: string; content: string[] }>;
      score_headline: number;
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
    props: { hit: Hit } & Renderer & TComponentProps
  ): JSX.Element;
  feedbackComponent<TComponentProps extends Record<string, unknown> = {}>(
    props: {
      castFeedback: (
        voteType: 'upvote' | 'downvote',
        objectIDs?: string[],
        voteTarget?: 'content' | 'headline'
      ) => void;
      alreadyCasted?: boolean;
    } & Renderer &
      TComponentProps
  ): JSX.Element;
  showFeedback?: boolean;
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
  alreadyCasted?: boolean;
  getters: CommerceGetters;
};

export type ContentItemComponentProps = {
  hit: Hit;
  classNames?: ContentClassNames;
  getters: CommerceGetters;
} & Renderer;

export type ContentComponentProps = {
  itemComponent(props: ContentItemComponentProps): JSX.Element;
  item: GSEContentRecord;
  classNames?: ContentClassNames;
  children?(props: ContentChildrenProps): JSX.Element;
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
  alreadyCasted?: boolean;
  showFeedback?: boolean;
  status: 'loading' | 'stalled' | 'idle';
  view?(
    props: ContentViewProps<Record<string, string>> & Renderer
  ): JSX.Element;
  getters?: CommerceGetters;
};
