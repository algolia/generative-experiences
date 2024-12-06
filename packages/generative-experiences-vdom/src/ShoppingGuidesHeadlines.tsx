/** @jsxRuntime classic */
/** @jsx createElement */

import { createDefaultFeedbackComponent } from './DefaultFeedbackComponent';
import { defaultGetters } from './DefaultGetters';
import { createDefaultHeadlineComponent } from './DefaultHeadlineComponent';
import { createDefaultHeadlinesChildrenComponent } from './DefaultHeadlinesChildren';
import { createListViewComponent } from './DefaultListView';
import { HeadlinesComponentProps, Renderer } from './types';

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

    const feedbackComponent =
      props.showFeedback &&
      createDefaultFeedbackComponent({ createElement, Fragment });

    const getters = props.getters ?? defaultGetters;

    const View = (viewProps: any) => (
      <ViewComponent
        classNames={classNames}
        Fragment={Fragment}
        itemComponent={itemComponent}
        items={props.items}
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
      headlines: [],
      status: props.status,
      View,
    });
  };
}
