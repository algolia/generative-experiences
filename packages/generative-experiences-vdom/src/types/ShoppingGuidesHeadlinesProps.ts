import { Renderer } from './Renderer';

export type HeadlinesButtonClassNames = Partial<{
  wrapper?: string;
  container?: string;
  item?: string;
  itemContent?: string;
  itemTitle?: string;
  itemImage?: string;
  list?: string;
  readMore?: string;
}>;

export type GSEHeadlineRecord = {
  objectID: string;
  title: string;
  description: string;
};

export type ViewProps<
  TItem extends GSEHeadlineRecord,
  TClassNames extends Record<string, string>
> = {
  classNames: TClassNames;
  itemComponent<TComponentProps extends Record<string, unknown> = {}>(
    props: { item: TItem } & Renderer & TComponentProps
  ): JSX.Element;
  items: GSEHeadlineRecord[];
};

export type ItemComponentProps = {
  item: GSEHeadlineRecord;
  classNames: HeadlinesButtonClassNames;
} & Renderer;

export type ComponentProps = {
  classNames: HeadlinesButtonClassNames;
  headlines: GSEHeadlineRecord[];
};

export type ChildrenProps = ComponentProps & {
  status: 'loading' | 'stalled' | 'idle';
  View(props: unknown): JSX.Element;
};

export type HeadlinesComponentProps = {
  itemComponent?(props: ItemComponentProps): JSX.Element;
  items: GSEHeadlineRecord[];
  classNames?: HeadlinesButtonClassNames;
  children?(props: ChildrenProps): JSX.Element;
  status: 'loading' | 'stalled' | 'idle';
  view?(
    props: ViewProps<GSEHeadlineRecord, Record<string, string>> & Renderer
  ): JSX.Element;
};
