/** @jsxRuntime classic */
/** @jsx h */

import { ShoppingGuideContentOptions } from '@algolia/generative-experiences-api-client';
import {
  createShoppingGuideContentComponent,
  ContentComponentProps as ContentComponentPropsVDOMProps,
} from '@algolia/generative-experiences-vdom';
import { html } from 'htm/preact';
import { createElement, Fragment, h, render } from 'preact';

import { useShoppingGuidesContent, useShoppingGuidesFeedback } from './hooks';
import {
  EnvironmentProps,
  HTMLTemplate,
  UseShoppingGuidesFeedbackProps,
} from './types';
import { getHTMLElement, withHtml } from './utils';

const UncontrolledShoppingGuidesContent = createShoppingGuideContentComponent({
  createElement,
  Fragment,
});

export type ShoppingGuidesContentProps<
  TComponentProps extends Record<string, unknown> = {}
> = ShoppingGuideContentOptions &
  Omit<
    ContentComponentPropsVDOMProps<TComponentProps>,
    'item' | 'status' | 'castFeedback' | 'alreadyCast'
  > &
  Omit<UseShoppingGuidesFeedbackProps, 'client'>;

function ShoppingGuidesContent<
  TComponentProps extends Record<string, unknown> = {}
>(props: ShoppingGuidesContentProps<TComponentProps>) {
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

export function shoppingGuidesContent({
  container,
  environment = window,
  itemComponent,
  getters,
  view,
  children,
  ...props
}: ShoppingGuidesContentProps<HTMLTemplate> & EnvironmentProps) {
  const vnode = (
    <ShoppingGuidesContent<HTMLTemplate>
      {...props}
      view={view && withHtml(view)}
      itemComponent={itemComponent && withHtml(itemComponent)}
    >
      {children
        ? (childrenProps) => children({ ...childrenProps, html })
        : undefined}
    </ShoppingGuidesContent>
  );

  if (!container) {
    return vnode;
  }

  render(vnode, getHTMLElement(container, environment));

  return null;
}
