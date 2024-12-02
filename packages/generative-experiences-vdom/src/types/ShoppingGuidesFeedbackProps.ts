import { Renderer } from "./Renderer";

export type FeedbackClassNames = Partial<{
    wrapper?: string;
    container?: string;
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
    alreadyCasted?: boolean;
    status: 'loading' | 'stalled' | 'idle';
    View(props: unknown): JSX.Element;
};

export type FeedbackViewComponentProps = {
    castFeedback: (voteType: 'upvote' | 'downvote') => void;
    alreadyCasted?: boolean;
    classNames?: FeedbackClassNames;
} & Renderer;

export type FeedbackViewProps<
    TClassNames extends Record<string, string>
> = {
    classNames: TClassNames;
    castFeedback: (voteType: 'upvote' | 'downvote') => void;
};

export type FeedbackComponentProps = {
    castFeedback: (voteType: 'upvote' | 'downvote') => void;
    alreadyCasted?: boolean;
    classNames?: FeedbackClassNames;
    children?(props: FeedbackChildrenProps): JSX.Element;
    status: 'loading' | 'stalled' | 'idle';
    view?(
        props: FeedbackViewProps<Record<string, string>> & Renderer
    ): JSX.Element;
};