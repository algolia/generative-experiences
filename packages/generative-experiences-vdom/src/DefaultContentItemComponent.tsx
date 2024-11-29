/** @jsxRuntime classic */
/** @jsx createElement */

import { ContentItemComponentProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultContentItemComponent({ createElement }: Renderer) {
  return function ContentItemComponent(props: ContentItemComponentProps) {
    console.log(props.hit);
    // const [image] = props.getters.images(props.hit);
    // const url = props.getters.objectURL(props.hit.objectID);
    return (
      <div
        key={props.hit.objectID}
        className={cx(
          'ais-ShoppingGuideContentContent-item',
          props.classNames?.item
        )}
      >
        hello
      </div>
    );
  };
}
