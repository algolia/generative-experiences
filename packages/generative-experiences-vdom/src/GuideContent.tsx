/** @jsxRuntime classic */
/** @jsx createElement */

import { createArticleViewComponent } from './DefaultArticleView';
import { createDefaultContentChildrenComponent } from './DefaultContentChildren';
import { createDefaultFeedbackComponent } from './DefaultFeedbackComponent';
import { defaultGetters } from './DefaultGetters';
import { ContentComponentProps, Renderer, defaultState } from './types';

export function createGuideContentComponent<TObject>({
  createElement,
  Fragment,
}: Renderer) {
  return function GuideContent(props: ContentComponentProps<TObject>) {
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

    const featuredItemsTitle =
      props.featuredItemsTitle ?? 'Items featured in this article';

    const maxFeaturedItems = props.maxFeaturedItems ?? 4;

    const View = (viewProps: any) => (
      <ViewComponent
        classNames={classNames}
        Fragment={Fragment}
        itemComponent={props.itemComponent}
        item={props.item}
        error={props.error}
        featuredItemsTitle={featuredItemsTitle}
        createElement={createElement}
        castFeedback={props.castFeedback}
        alreadyCast={props.alreadyCast}
        maxFeaturedItems={maxFeaturedItems}
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
