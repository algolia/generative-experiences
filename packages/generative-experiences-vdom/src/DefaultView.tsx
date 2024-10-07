/** @jsxRuntime classic */
/** @jsx createElement */

import {
  GSEHeadlineRecord,
  HeadlinesButtonClassNames,
  Renderer,
  ViewProps,
} from './types';
import { cx } from './utils';

export function createListViewComponent({ createElement, Fragment }: Renderer) {
  return function ListView<TItem extends GSEHeadlineRecord>(
    props: ViewProps<TItem, HeadlinesButtonClassNames>
  ) {
    return (
      <div
        className={cx('auc-Headlines-container', props.classNames.container)}
      >
        <ol className={cx('auc-Headlines-list', props.classNames.list)}>
          {props.items.map((item) => (
            <li
              key={item.objectID}
              className={cx('auc-Headlines-item', props.classNames.item)}
            >
              <props.itemComponent
                createElement={createElement}
                Fragment={Fragment}
                classNames={props.classNames}
                item={item}
              />
            </li>
          ))}
          ``
        </ol>
      </div>
    );
  };
}
