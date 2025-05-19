import { CommerceGetters } from './CommerceGetters';
import { Renderer } from './Renderer';

export type HeadlinesButtonClassNames = Partial<{
  wrapper?: string;
  container?: string;
  itemsContainer?: string;
  item?: string;
  itemContent?: string;
  itemTitle?: string;
  itemDescription?: string;
  itemImage?: string;
  list?: string;
  readMore?: string;
}>;

export type GSEHeadlineRecord = {
  objectID: string;
  title: string;
  description: string;
  objects: any[];
};

export type ViewProps<
  TItem extends GSEHeadlineRecord,
  TClassNames extends Record<string, string>
> = {
  classNames: TClassNames;
  itemComponent<TComponentProps extends Record<string, unknown> = {}>(
    props: { item: TItem } & Renderer & TComponentProps
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
  items: TItem[];
  getters: CommerceGetters;
  showFeedback?: boolean;
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
  alreadyCast?: boolean;
};

export type ItemComponentProps = {
  item: GSEHeadlineRecord;
  classNames?: HeadlinesButtonClassNames;
  getters: CommerceGetters;
} & Renderer;

export type ComponentProps = {
  classNames: HeadlinesButtonClassNames;
  headlines: GSEHeadlineRecord[];
};

export type ChildrenProps = ComponentProps & {
  status: 'loading' | 'stalled' | 'idle';
  View(props: unknown): JSX.Element;
};

export type HeadlinesComponentProps<
  TComponentProps extends Record<string, unknown> = {}
> = {
  itemComponent?(props: ItemComponentProps): JSX.Element;
  items: GSEHeadlineRecord[];
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
  alreadyCast?: boolean;
  showFeedback?: boolean;
  classNames?: HeadlinesButtonClassNames;
  children?(props: ChildrenProps & TComponentProps): JSX.Element;
  status: 'loading' | 'stalled' | 'idle';
  view?(
    props: ViewProps<GSEHeadlineRecord, Record<string, string>> & Renderer
  ): JSX.Element;
  getters?: CommerceGetters;
};
