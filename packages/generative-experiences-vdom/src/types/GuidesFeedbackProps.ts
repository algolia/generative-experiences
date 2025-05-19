import { Renderer } from './Renderer';

export type FeedbackClassNames = Partial<{
  wrapper?: string;
  container?: string;
  feedbackContainer?: string;
  button?: string;
  buttonIcon?: string;
  buttonsWrapper?: string;
  labelIcon?: string;
  labelWrapper?: string;
  noWrap?: string;
  screenReaderOnly?: string;
  thanksWrapper?: string;
}>;

export type FeedbackChildrenProps = {
  classNames?: FeedbackClassNames;
  alreadyCast?: boolean;
  status: 'loading' | 'stalled' | 'idle';
  View(props: unknown): JSX.Element;
};

export type FeedbackViewComponentProps = {
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
  alreadyCast?: boolean;
  classNames?: FeedbackClassNames;
  objectIDs?: string[];
  voteTarget?: 'content' | 'headline';
} & Renderer;

export type FeedbackViewProps<TClassNames extends Record<string, string>> = {
  classNames: TClassNames;
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
};

export type FeedbackComponentProps<
  TComponentProps extends Record<string, unknown> = {}
> = {
  castFeedback: (
    voteType: 'upvote' | 'downvote',
    objectIDs?: string[],
    voteTarget?: 'content' | 'headline'
  ) => void;
  alreadyCast?: boolean;
  classNames?: FeedbackClassNames;
  children?(props: FeedbackChildrenProps & TComponentProps): JSX.Element;
  status: 'loading' | 'stalled' | 'idle';
  view?(
    props: FeedbackViewProps<Record<string, string>> & Renderer
  ): JSX.Element;
};
