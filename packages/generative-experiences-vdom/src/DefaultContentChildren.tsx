/** @jsxRuntime classic */
/** @jsx createElement */

import { ContentChildrenProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultContentChildrenComponent({
  createElement,
}: Renderer) {
  return function DefaultContentChildren(props: ContentChildrenProps) {
    return (
      <section
        className={cx(
          'ais-ShoppingGuidesContentSection',
          props.classNames?.wrapper
        )}
      >
        <props.View />
      </section>
    );
  };
}
