/** @jsxRuntime classic */
/** @jsx h */

import {
  createShoppingGuidesFeedbackComponent,
  FeedbackComponentProps as FeedbackComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';

import { html } from 'htm/preact';
import { createElement, Fragment, h, render } from 'preact';

import {
  EnvironmentProps,
  HTMLTemplate,
  UseShoppingGuidesFeedbackProps,
} from './types';
import { getHTMLElement, withHtml } from './utils';
import { useShoppingGuidesFeedback } from './hooks';

const UncontrolledShoppingGuidesFeedback = createShoppingGuidesFeedbackComponent(
  {
    createElement,
    Fragment,
  }
);

export type ShoppingGuidesFeedbackProps<
  TComponentProps extends Record<string, unknown> = {}
> = UseShoppingGuidesFeedbackProps &
  Omit<
    FeedbackComponentVDOMProps<TComponentProps>,
    'status' | 'castFeedback' | 'alreadyCast'
  >;

function ShoppingGuidesFeedback<
  TComponentProps extends Record<string, unknown> = {}
>(props: ShoppingGuidesFeedbackProps<TComponentProps>) {
  const { castFeedback, alreadyCast, status } = useShoppingGuidesFeedback(
    props
  );

  return (
    <UncontrolledShoppingGuidesFeedback
      {...props}
      castFeedback={castFeedback}
      alreadyCast={alreadyCast}
      status={status}
    />
  );
}

export function shoppingGuidesFeedback({
  container,
  environment = window,
  view,
  children,
  ...props
}: ShoppingGuidesFeedbackProps<HTMLTemplate> & EnvironmentProps) {
  const vnode = (
    <ShoppingGuidesFeedback<HTMLTemplate>
      {...props}
      view={view && withHtml(view)}
    >
      {children
        ? (childrenProps) => children({ ...childrenProps, html })
        : undefined}
    </ShoppingGuidesFeedback>
  );

  if (!container) {
    return vnode;
  }

  render(vnode, getHTMLElement(container, environment));

  return null;
}
