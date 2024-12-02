import { ShoppingGuideContentOptions } from '@algolia/generative-experiences-api-client';
import {
  createShoppingGuideContentComponent,
  ContentComponentProps as ContentComponentPropsVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';
import { useShoppingGuidesContent } from './useShoppingGuidesContent';

export type UseShoppingGuidesContentProps = ShoppingGuideContentOptions;

export type ShoppingGuidesContentProps = UseShoppingGuidesContentProps &
  Omit<
    ContentComponentPropsVDOMProps,
    'item' | 'status' | 'createElement' | 'Fragment'
  >;

const UncontrolledShoppingGuidesContent = createShoppingGuideContentComponent({
  // @ts-expect-error
  createElement,
  Fragment,
});

export function ShoppingGuidesContent(props: ShoppingGuidesContentProps) {
  const { content, status } = useShoppingGuidesContent(props);

  return (
    <UncontrolledShoppingGuidesContent
      {...props}
      item={content}
      status={status}
    />
  );
}
