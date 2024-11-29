/** @jsxRuntime classic */
/** @jsx createElement */

import { createArticleViewComponent } from './DefaultArticleView';
import { createDefaultContentChildrenComponent } from './DefaultContentChildren';
import { defaultGetters } from './DefaultGetters';
import { ContentComponentProps, Renderer } from './types';

export function createShoppingGuideContentComponent({
  createElement,
  Fragment,
}: Renderer) {
  return function ShoppingGuideContent(props: ContentComponentProps) {
    const classNames = props.classNames ?? {};

    const children =
      props.children ??
      createDefaultContentChildrenComponent({
        createElement,
        Fragment,
      });

    const ViewComponent =
      props.view ?? createArticleViewComponent({ createElement, Fragment });

    const getters = props.getters ?? defaultGetters;

    const View = (viewProps: any) => (
      <ViewComponent
        classNames={classNames}
        Fragment={Fragment}
        itemComponent={props.itemComponent}
        item={props.item}
        createElement={createElement}
        getters={getters}
        {...viewProps}
      />
    );

    return children({
      classNames,
      // @ts-expect-error
      content: null,
      status: props.status,
      View,
    });
  };
}
