/** @jsxRuntime classic */
/** @jsx createElement */

import { createListViewComponent } from './DefaultView';
import { createDefaultHeadlinesChildrenComponent } from './DefaultHeadlinesChildren';
import { HeadlinesComponentProps, Renderer } from './types';
import { createDefaultHeadlineComponent } from './DefaultHeadlineComponent';

export function createShoppingGuidesHeadlinesComponent({
  createElement,
  Fragment,
}: Renderer) {
  return function ShoppingGuidesHeadlines(props: HeadlinesComponentProps) {
    const classNames = props.classNames ?? {};

    const children =
      props.children ??
      createDefaultHeadlinesChildrenComponent({
        createElement,
        Fragment,
      });

    const itemComponent =
      props.itemComponent ??
      createDefaultHeadlineComponent({ createElement, Fragment });

    const ViewComponent =
      props.view ?? createListViewComponent({ createElement, Fragment });
    const View = (viewProps: any) => (
      <ViewComponent
        classNames={classNames}
        Fragment={Fragment}
        itemComponent={itemComponent}
        items={props.items}
        createElement={createElement}
        {...viewProps}
      />
    );

    return children({
      classNames,
      headlines: [],
      status: props.status,
      View,
    });
  };
}
