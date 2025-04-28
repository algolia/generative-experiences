/** @jsxRuntime classic */
/** @jsx createElement */

import { ItemComponentProps, Renderer } from './types';
import { cx } from './utils';

export function createDefaultHeadlineComponent({ createElement }: Renderer) {
  return function HeadlineComponent(props: ItemComponentProps) {
    const [image] = props.getters.images(props.item.objects[0]);
    return (
      <div>
        <div
          className={cx(
            'ais-GuideHeadlinesContent-itemContent',
            props.classNames?.itemContent
          )}
        >
          <h3
            className={cx(
              'ais-GuideHeadlinesContent-itemTitle',
              props.classNames?.itemTitle
            )}
          >
            {props.item.title}
          </h3>
          <p>{props.item.description}</p>
          <a
            className={cx(
              'ais-GuideHeadlinesContent-readMore',
              props.classNames?.readMore
            )}
            href={props.getters.guideURL(props.item.objectID)}
          >
            Read more
          </a>
        </div>
        {image && (
          <div
            className={cx(
              'ais-GuideHeadlinesContent-itemImage',
              props.classNames?.itemImage
            )}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        )}
      </div>
    );
  };
}
