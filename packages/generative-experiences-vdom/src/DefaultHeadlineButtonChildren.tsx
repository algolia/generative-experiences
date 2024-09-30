/** @jsxRuntime automatic */
/** @jsx createElement */

import { ChildrenProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultHeadlinesButtonChildrenComponent({
  createElement,
  Fragment,
}: Renderer) {
  return function DefaultChildren(props: ChildrenProps) {
    return (
      <section
        className={cx(
          'ais-ShoppingGuideHeadlinesButtonSection',
          props.classNames.root
        )}
      >
        <props.View createElement={createElement} Fragment={Fragment} />
      </section>
    );
  };
}
