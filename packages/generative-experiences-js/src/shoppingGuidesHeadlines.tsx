/** @jsxRuntime classic */
/** @jsx h */

import {
  createShoppingGuidesHeadlinesComponent,
  HeadlinesComponentProps as HeadlinesComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import { ShoppingGuideHeadlinesOptions } from '@algolia/generative-experiences-api-client';

import { html } from 'htm/preact';
import { createElement, Fragment, h, render } from 'preact';

import {
  EnvironmentProps,
  HTMLTemplate,
  UseShoppingGuidesFeedbackProps,
} from './types';
import { getHTMLElement, withHtml } from './utils';
import { useShoppingGuidesFeedback, useShoppingGuidesHeadlines } from './hooks';

const UncontrolledShoppingGuidesHeadlines = createShoppingGuidesHeadlinesComponent(
  {
    createElement,
    Fragment,
  }
);

export type ShoppingGuidesHeadlinesProps<
  TComponentProps extends Record<string, unknown> = {}
> = ShoppingGuideHeadlinesOptions &
  Omit<
    HeadlinesComponentVDOMProps<TComponentProps>,
    'items' | 'status' | 'castFeedback' | 'alreadyCast'
  > &
  Omit<UseShoppingGuidesFeedbackProps, 'client'>;

function ShoppingGuidesHeadlines<
  TComponentProps extends Record<string, unknown> = {}
>(props: ShoppingGuidesHeadlinesProps<TComponentProps>) {
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

export function shoppingGuidesHeadlines({
  container,
  environment = window,
  itemComponent,
  getters,
  view,
  children,
  ...props
}: ShoppingGuidesHeadlinesProps<HTMLTemplate> & EnvironmentProps) {
  const vnode = (
    <ShoppingGuidesHeadlines<HTMLTemplate>
      {...props}
      view={view && withHtml(view)}
      itemComponent={itemComponent && withHtml(itemComponent)}
    >
      {children
        ? (childrenProps) => children({ ...childrenProps, html })
        : undefined}
    </ShoppingGuidesHeadlines>
  );

  if (!container) {
    return vnode;
  }
  console.log('>>>> props', props);

  render(vnode, getHTMLElement(container, environment));

  return null;
}
