import { Renderer } from "./Renderer";
import { GenerationSource, ShoppingGuideHeadlinesOptionsForCombined } from '@algolia/generative-experiences-api-client';

export type ViewProps<
    TClassNames extends Record<string, string>
> = {
    classNames: TClassNames;
    label: string;
    source?: GenerationSource;
    isShowing: boolean;
    isLoading: boolean | undefined;
    showHeadlines: (
        args?: Partial<Omit<ShoppingGuideHeadlinesOptionsForCombined, 'source'>> & {
            source?: GenerationSource;
        }
    ) => Promise<void>;
    hideHeadlines: () => void;
};


export type HeadlinesButtonClassNames = Partial<{
    root?: string;
    button?: string;
    buttonLoading?: string;
    icon?: string;
    iconLoading?: string;
    screenReaderOnly?: string;
}>;

export type ComponentProps = {
    classNames: HeadlinesButtonClassNames;
    // headlines: TObject[];
};

export type ChildrenProps = ComponentProps & {
    View(props: unknown & Renderer): JSX.Element;
};

export type HeadlinesButtonComponentProps<
    TComponentProps extends Record<string, unknown> = {}
> = {
    classNames?: HeadlinesButtonClassNames;
    label?: string;
    source?: GenerationSource;
    children?(props: ChildrenProps & TComponentProps): JSX.Element;
    isShowing: boolean;
    isLoading: boolean | undefined;
    showHeadlines: (
        args?: Partial<Omit<ShoppingGuideHeadlinesOptionsForCombined, 'source'>> & {
            source?: GenerationSource;
        }
    ) => Promise<void>;
    hideHeadlines: () => void;
    view?(
        props: ViewProps<
            Record<string, string>
        > &
            Renderer &
            TComponentProps
    ): JSX.Element;
};