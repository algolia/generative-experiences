/** @jsxRuntime classic */
/** @jsx createElement */

import { FeedbackChildrenProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultFeedbackChildrenComponent({
  createElement,
}: Renderer) {
  return function DefaultFeedbackChildren(props: FeedbackChildrenProps) {
    return (
      <section
        className={cx('ais-Feedback-wrapper', props.classNames?.wrapper)}
      >
        <props.View />
      </section>
    );
  };
}
