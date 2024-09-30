/** @jsxRuntime automatic */
/** @jsx createElement */

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { HeadlinesButtonClassNames, Renderer, ViewProps } from './types';
import { cx } from './utils';

export function createHeadlinesButtonViewComponent({
  createElement,
  Fragment,
}: Renderer) {
  return function ButtonView(props: ViewProps<HeadlinesButtonClassNames>) {
    return (
      <>
        {!props.isShowing && (
          <button
            type="button"
            className={cx(
              'ais-ShoppingGuideHeadlinesButton-button',
              'ais-ShoppingGuideHeadlinesButton-buttonNotShowing',
              props.classNames.button,
              // @ts-expect-error
              props.isLoading &&
                'ais-ShoppingGuideHeadlinesButton-buttonLoading',
              props.isLoading && props.classNames.buttonLoading
            )}
            disabled={props.isLoading}
            onClick={() => {
              // @ts-expect-error
              props.showHeadlines(props.source);
            }}
          >
            {props.isLoading ? (
              <ArrowPathIcon
                className={cx(
                  'ais-ShoppingGuideHeadlinesButton-icon ais-ShoppingGuideHeadlinesButton-iconLoading',
                  props.classNames.icon,
                  props.classNames.iconLoading
                )}
              />
            ) : (
              <SparklesIcon
                className={cx(
                  'ais-ShoppingGuideHeadlinesButton-icon',
                  props.classNames.icon
                )}
              />
            )}
            <span>{props.label}</span>
          </button>
        )}
        {props.isShowing && (
          <button
            type="button"
            className={cx(
              'ais-ShoppingGuideHeadlinesButton-button',
              'ais-ShoppingGuideHeadlinesButton-buttonShowing',
              props.classNames.button
            )}
            onClick={() => props.hideHeadlines()}
          >
            <ArrowLeftIcon
              className={cx(
                'ais-ShoppingGuideHeadlinesButton-icon',
                props.classNames.icon
              )}
            />
            <span>
              Back
              <span
                className={cx(
                  'ais-ScreenReaderOnly',
                  props.classNames.screenReaderOnly
                )}
              >
                {' '}
                to products
              </span>
            </span>
          </button>
        )}
      </>
    );
  };
}
