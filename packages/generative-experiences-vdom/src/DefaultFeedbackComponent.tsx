/** @jsxRuntime classic */
/** @jsx createElement */

import { FeedbackViewComponentProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultFeedbackComponent({ createElement }: Renderer) {
  function ThumbUpIcon({ className }: { className: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
    );
  }
  function ThumbDownIcon({ className }: { className: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M17 14V2" />
        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
      </svg>
    );
  }
  function SparklesIcon({ className }: { className: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
        <path d="M4 17v2" />
        <path d="M5 18H3" />
      </svg>
    );
  }
  return function FeedbackComponent(props: FeedbackViewComponentProps) {
    return (
      <div className={cx('ais-Feedback', props.classNames?.container)}>
        {props.alreadyCast ? (
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
          <div
            className={cx(
              'ais-feedbackContainer',
              props.classNames?.feedbackContainer
            )}
          >
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
              <p className={cx('ais-NoWrap', props.classNames?.noWrap)}>
                Give us feedback
              </p>
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
                  props.castFeedback(
                    'upvote',
                    props.objectIDs,
                    props.voteTarget
                  );
                }}
              >
                <ThumbUpIcon
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
                  props.castFeedback(
                    'downvote',
                    props.objectIDs,
                    props.voteTarget
                  );
                }}
              >
                <ThumbDownIcon
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
