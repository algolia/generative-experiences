/** @jsxRuntime classic */
/** @jsx createElement */

import { createDefaultFeedbackChildrenComponent } from './DefaultFeedbackChildren';
import { createDefaultFeedbackComponent } from './DefaultFeedbackComponent';
import { FeedbackComponentProps, Renderer } from './types';

export function createShoppingGuidesFeedbackComponent({
  createElement,
  Fragment,
}: Renderer) {
  return function ShoppingGuidesFeedback(props: FeedbackComponentProps) {
    const classNames = props.classNames ?? {};

    const children =
      props.children ??
      createDefaultFeedbackChildrenComponent({
        createElement,
        Fragment,
      });

    const ViewComponent =
      props.view ?? createDefaultFeedbackComponent({ createElement, Fragment });

    const View = (viewProps: any) => (
      <ViewComponent
        classNames={classNames}
        Fragment={Fragment}
        createElement={createElement}
        castFeedback={props.castFeedback}
        alreadyCast={props.alreadyCast}
        {...viewProps}
      />
    );

    return children({
      classNames,
      alreadyCast: false,
      status: props.status,
      View,
    });
  };
}
