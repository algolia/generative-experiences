import { ShoppingGuideContentOptions } from '@algolia/generative-experiences-api-client';
import {
  createShoppingGuideContentComponent,
  ContentComponentProps as ContentComponentPropsVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';

import { UseShoppingGuidesFeedbackProps } from './ShoppingGuidesFeedback';
import { useShoppingGuidesContent } from './useShoppingGuidesContent';
import { useShoppingGuidesFeedback } from './useShoppingGuidesFeedback';

export type UseShoppingGuidesContentProps = ShoppingGuideContentOptions;

export type ShoppingGuidesContentProps<
  TObject = {}
> = UseShoppingGuidesContentProps &
  Omit<
    ContentComponentPropsVDOMProps<TObject>,
    | 'item'
    | 'status'
    | 'createElement'
    | 'Fragment'
    | 'castFeedback'
    | 'alreadyCast'
  > &
  Omit<UseShoppingGuidesFeedbackProps, 'client'>;

const UncontrolledShoppingGuidesContent = createShoppingGuideContentComponent({
  // @ts-expect-error - Pragma issue
  createElement,
  Fragment,
});

export function ShoppingGuidesContent<TObject = {}>(
  props: ShoppingGuidesContentProps<TObject>
) {
  const { content, status } = useShoppingGuidesContent(props);
  const { castFeedback, alreadyCast } = useShoppingGuidesFeedback(props);

  return (
    <UncontrolledShoppingGuidesContent
      {...props}
      item={content}
      castFeedback={castFeedback}
      alreadyCast={alreadyCast}
      status={status}
    />
  );
}
