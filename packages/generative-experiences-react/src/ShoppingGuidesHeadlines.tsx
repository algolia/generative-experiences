import { ShoppingGuideHeadlinesOptions } from '@algolia/generative-experiences-api-client';
import {
  createShoppingGuidesHeadlinesComponent,
  HeadlinesComponentProps as HeadlinesComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';

import { useShoppingGuidesHeadlines } from './useShoppingGuidesHeadlines';

export type UseShoppingGuidesHeadlinesProps = ShoppingGuideHeadlinesOptions & {
  showImmediate: boolean;
};

export type RelatedProductsProps = UseShoppingGuidesHeadlinesProps &
  Omit<
    HeadlinesComponentVDOMProps,
    'items' | 'status' | 'createElement' | 'Fragment'
  >;

const UncontrolledShoppingGuidesHeadlines = createShoppingGuidesHeadlinesComponent(
  {
    // @ts-expect-error
    createElement,
    Fragment,
  }
);

export function ShoppingGuidesHeadlines(props: any) {
  const { headlines, status } = useShoppingGuidesHeadlines(props);

  return (
    <UncontrolledShoppingGuidesHeadlines
      {...props}
      items={headlines}
      status={status}
    />
  );
}
