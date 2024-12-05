/** @jsxRuntime classic */
/** @jsx createElement */

import { createArticleViewComponent } from './DefaultArticleView';
import { createDefaultContentChildrenComponent } from './DefaultContentChildren';
import { createDefaultFeedbackComponent } from './DefaultFeedbackComponent';
import { defaultGetters } from './DefaultGetters';
import { ContentComponentProps, Renderer, defaultState } from './types';

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

    const feedbackComponent =
      props.showFeedback &&
      createDefaultFeedbackComponent({ createElement, Fragment });

    const getters = props.getters ?? defaultGetters;

    const View = (viewProps: any) => (
      <ViewComponent
        classNames={classNames}
        Fragment={Fragment}
        itemComponent={props.itemComponent}
        item={props.item}
        createElement={createElement}
        castFeedback={props.castFeedback}
        alreadyCast={props.alreadyCast}
        showFeedback={props.showFeedback}
        feedbackComponent={feedbackComponent}
        getters={getters}
        {...viewProps}
      />
    );

    return children({
      classNames,
      content: defaultState,
      status: props.status,
      View,
    });
  };
}
