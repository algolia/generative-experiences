/** @jsxRuntime classic */
/** @jsx createElement */

import { ChildrenProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultHeadlinesChildrenComponent({
  createElement,
}: Renderer) {
  return function DefaultChildren(props: ChildrenProps) {
    return (
      <section
        className={cx(
          'ais-ShoppingGuidesHeadlinesSection',
          props.classNames?.wrapper
        )}
      >
        <props.View />
      </section>
    );
  };
}
