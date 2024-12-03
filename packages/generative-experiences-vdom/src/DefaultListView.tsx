/** @jsxRuntime classic */
/** @jsx createElement */

import {
  FeedbackClassNames,
  GSEHeadlineRecord,
  HeadlinesButtonClassNames,
  Renderer,
  ViewProps,
} from './types';
import { cx } from './utils';

export function createListViewComponent({ createElement, Fragment }: Renderer) {
  return function ListView<TItem extends GSEHeadlineRecord>(
    props: ViewProps<
      TItem,
      HeadlinesButtonClassNames & Omit<FeedbackClassNames, 'container'>
    >
  ) {
    return (
      <div
        className={cx(
          'ais-ShoppingGuideHeadlinesContent-container',
          props.classNames?.container
        )}
      >
        {props.items.map((item) => (
          <div
            key={item.objectID}
            className={cx(
              'ais-ShoppingGuideHeadlinesContent-item',
              props.classNames?.item
            )}
          >
            <props.itemComponent
              createElement={createElement}
              Fragment={Fragment}
              classNames={props.classNames}
              item={item}
              getters={props.getters}
            />
          </div>
        ))}
        {props.showFeedback && (
          <props.feedbackComponent
            castFeedback={props.castFeedback}
            objectIDs={props.items.map((item) => item.objectID)}
            voteTarget="headline"
            alreadyCasted={props.alreadyCasted}
            createElement={createElement}
            Fragment={Fragment}
          />
        )}
      </div>
    );
  };
}
