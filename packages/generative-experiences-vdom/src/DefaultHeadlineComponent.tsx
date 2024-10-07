/** @jsxRuntime classic */
/** @jsx createElement */

import { ItemComponentProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultHeadlineComponent({ createElement }: Renderer) {
  return function HeadlineComponent(props: ItemComponentProps) {
    return (
      <div
        key={props.item.objectID}
        className={cx(
          'ais-ShoppingGuideHeadlinesContent-item',
          props.classNames.item
        )}
      >
        <div
          className={cx(
            'ais-ShoppingGuideHeadlinesContent-itemContent',
            props.classNames.itemContent
          )}
        >
          <h3
            className={cx(
              'ais-ShoppingGuideHeadlinesContent-itemTitle',
              props.classNames.itemTitle
            )}
          >
            {props.item.title}
          </h3>
          <p>{props.item.description}</p>
          <a
            className={cx(
              'ais-ShoppingGuideHeadlinesContent-readMore',
              props.classNames.readMore
            )}
            // href={getters.guideURL(props.item.objectID)}
          >
            Read more
          </a>
        </div>
        {/* {image && (
          <div
            className={cx(
              'ais-ShoppingGuideHeadlinesContent-itemImage',
              props.classNames.itemImage
            )}
          >
            eslint-disable-next-line @next/next/no-img-element
            <img src={image.src} alt={image.alt} />
          </div>
        )} */}
      </div>
    );
  };
}
