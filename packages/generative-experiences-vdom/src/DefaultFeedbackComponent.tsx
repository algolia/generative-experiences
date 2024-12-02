/** @jsxRuntime classic */
/** @jsx createElement */

import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { FeedbackViewComponentProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultFeedbackComponent({ createElement }: Renderer) {
  return function FeedbackComponent(props: FeedbackViewComponentProps) {
    return (
      <div className={cx('ais-Feedback', props.classNames?.container)}>
        {props.alreadyCasted ? (
          <div
            className={cx(
              'ais-Feedback-thanksWrapper',
              props.classNames?.thanksWrapper
            )}
          >
            <span className={cx('ais-NoWrap', props.classNames?.noWrap)}>
              Thanks for contributing!
            </span>
          </div>
        ) : (
          <div>
            <div
              className={cx(
                'ais-Feedback-labelWrapper',
                props.classNames?.labelWrapper
              )}
            >
              <SparklesIcon
                className={cx(
                  'ais-Feedback-labelIcon',
                  props.classNames?.labelIcon
                )}
              />
              <span className={cx('ais-NoWrap', props.classNames?.noWrap)}>
                Give us feedback
              </span>
            </div>
            <div
              className={cx(
                'ais-Feedback-buttonsWrapper',
                props.classNames?.buttonsWrapper
              )}
            >
              <button
                type="button"
                className={cx('ais-Feedback-button', props.classNames?.button)}
                onClick={() => {
                  props.castFeedback('upvote');
                }}
              >
                <HandThumbUpIcon
                  className={cx(
                    'ais-Feedback-buttonIcon',
                    props.classNames?.buttonIcon
                  )}
                />
                <span
                  className={cx(
                    'ais-ScreenReaderOnly',
                    props.classNames?.screenReaderOnly
                  )}
                >
                  I like it
                </span>
              </button>
              <button
                type="button"
                className={cx('ais-Feedback-button', props.classNames?.button)}
                onClick={() => {
                  props.castFeedback('downvote');
                }}
              >
                <HandThumbDownIcon
                  className={cx(
                    'ais-Feedback-buttonIcon',
                    props.classNames?.buttonIcon
                  )}
                />
                <span
                  className={cx(
                    'ais-ScreenReaderOnly',
                    props.classNames?.screenReaderOnly
                  )}
                >
                  I don&apos;t like it
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
}
