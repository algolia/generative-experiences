import { ShoppingGuideHeadlinesOptions } from '@algolia/generative-experiences-api-client';
import {
  createShoppingGuidesHeadlinesComponent,
  HeadlinesComponentProps as HeadlinesComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';

import { UseShoppingGuidesFeedbackProps } from './ShoppingGuidesFeedback';
import { useShoppingGuidesFeedback } from './useShoppingGuidesFeedback';
import { useShoppingGuidesHeadlines } from './useShoppingGuidesHeadlines';

export type UseShoppingGuidesHeadlinesProps = ShoppingGuideHeadlinesOptions;

export type ShoppingGuidesHeadlinesProps = UseShoppingGuidesHeadlinesProps &
  Omit<
    HeadlinesComponentVDOMProps,
    | 'items'
    | 'status'
    | 'createElement'
    | 'Fragment'
    | 'castFeedback'
    | 'alreadyCast'
  > &
  Omit<UseShoppingGuidesFeedbackProps, 'client'>;

const UncontrolledShoppingGuidesHeadlines = createShoppingGuidesHeadlinesComponent(
  {
    // @ts-expect-error - Pragma issue
    createElement,
    Fragment,
  }
);

export function ShoppingGuidesHeadlines(props: ShoppingGuidesHeadlinesProps) {
  const { headlines, status } = useShoppingGuidesHeadlines(props);
  const { castFeedback, alreadyCast } = useShoppingGuidesFeedback(props);

  return (
    <UncontrolledShoppingGuidesHeadlines
      {...props}
      items={headlines}
      castFeedback={castFeedback}
      alreadyCast={alreadyCast}
      status={status}
    />
  );
}
