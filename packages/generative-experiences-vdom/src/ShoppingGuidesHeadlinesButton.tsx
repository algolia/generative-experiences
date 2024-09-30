/** @jsxRuntime automatic */
/** @jsx createElement */
import { createHeadlinesButtonViewComponent } from './HeadlinesButtonView';
import { createDefaultHeadlinesButtonChildrenComponent } from './DefaultHeadlineButtonChildren';
import { HeadlinesButtonComponentProps, Renderer } from './types';

export type ShoppingGuidesHeadlinesButtonProps<
  TComponentProps extends Record<string, unknown> = {},
> = HeadlinesButtonComponentProps<TComponentProps>;

export function createShoppingGuidesHeadlinesButtonComponent({
  createElement,
  Fragment,
}: Renderer) {
  return function ShoppingGuidesHeadlinesButton(
    props: ShoppingGuidesHeadlinesButtonProps
  ) {
    const buttonLabel =
      props.label ??
      `${props.source === 'index' ? 'See' : 'Generate'} Shopping Guides`;
    const classNames = props.classNames ?? {};

    const children =
      props.children ??
      createDefaultHeadlinesButtonChildrenComponent({
        createElement,
        Fragment,
      });
    const ViewComponent =
      props.view ??
      createHeadlinesButtonViewComponent({ createElement, Fragment });
    const View = (viewProps: any) => (
      <ViewComponent
        classNames={classNames}
        label={buttonLabel}
        Fragment={Fragment}
        source={props.source}
        isShowing={props.isShowing}
        isLoading={props.isLoading}
        showHeadlines={props.showHeadlines}
        hideHeadlines={props.hideHeadlines}
        createElement={createElement}
        {...viewProps}
      />
    );

    return children({
      classNames,
      //   headlines,
      View,
    });
  };
}
