/** @jsxRuntime classic */
/** @jsx h */

import {
  createGuidesFeedbackComponent,
  FeedbackComponentProps as FeedbackComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import { html } from 'htm/preact';
import { createElement, Fragment, h, render } from 'preact';

import { useGuidesFeedback } from './hooks';
import {
  EnvironmentProps,
  HTMLTemplate,
  UseGuidesFeedbackProps,
} from './types';
import { getHTMLElement, withHtml } from './utils';

const UncontrolledGuidesFeedback = createGuidesFeedbackComponent({
  createElement,
  Fragment,
});

export type GuidesFeedbackProps<
  TComponentProps extends Record<string, unknown> = {}
> = UseGuidesFeedbackProps &
  Omit<
    FeedbackComponentVDOMProps<TComponentProps>,
    'status' | 'castFeedback' | 'alreadyCast'
  >;

function GuidesFeedback<TComponentProps extends Record<string, unknown> = {}>(
  props: GuidesFeedbackProps<TComponentProps>
) {
  const { castFeedback, alreadyCast, status } = useGuidesFeedback(props);

  return (
    <UncontrolledGuidesFeedback
      {...props}
      castFeedback={castFeedback}
      alreadyCast={alreadyCast}
      status={status}
    />
  );
}

export function guidesFeedback({
  container,
  environment = window,
  view,
  children,
  ...props
}: GuidesFeedbackProps<HTMLTemplate> & EnvironmentProps) {
  const vnode = (
    <GuidesFeedback<HTMLTemplate> {...props} view={view && withHtml(view)}>
      {children
        ? (childrenProps) => children({ ...childrenProps, html })
        : undefined}
    </GuidesFeedback>
  );

  if (!container) {
    return vnode;
  }

  render(vnode, getHTMLElement(container, environment));

  return null;
}
