/** @jsxRuntime classic */
/** @jsx h */

import { GuideHeadlinesOptions } from '@algolia/generative-experiences-api-client';
import {
  createGuidesHeadlinesComponent,
  HeadlinesComponentProps as HeadlinesComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import { html } from 'htm/preact';
import { createElement, Fragment, h, render } from 'preact';

import { useGuidesFeedback, useGuidesHeadlines } from './hooks';
import {
  EnvironmentProps,
  HTMLTemplate,
  UseGuidesFeedbackProps,
} from './types';
import { getHTMLElement, withHtml } from './utils';

const UncontrolledGuidesHeadlines = createGuidesHeadlinesComponent({
  createElement,
  Fragment,
});

export type GuidesHeadlinesProps<
  TComponentProps extends Record<string, unknown> = {}
> = GuideHeadlinesOptions &
  Omit<
    HeadlinesComponentVDOMProps<TComponentProps>,
    'items' | 'status' | 'castFeedback' | 'alreadyCast'
  > &
  Omit<UseGuidesFeedbackProps, 'client'>;

function GuidesHeadlines<TComponentProps extends Record<string, unknown> = {}>(
  props: GuidesHeadlinesProps<TComponentProps>
) {
  const { headlines, status } = useGuidesHeadlines(props);
  const { castFeedback, alreadyCast } = useGuidesFeedback(props);

  return (
    <UncontrolledGuidesHeadlines
      {...props}
      items={headlines}
      castFeedback={castFeedback}
      alreadyCast={alreadyCast}
      status={status}
    />
  );
}

export function guidesHeadlines({
  container,
  environment = window,
  itemComponent,
  getters,
  view,
  children,
  ...props
}: GuidesHeadlinesProps<HTMLTemplate> & EnvironmentProps) {
  const vnode = (
    <GuidesHeadlines<HTMLTemplate>
      {...props}
      view={view && withHtml(view)}
      itemComponent={itemComponent && withHtml(itemComponent)}
    >
      {children
        ? (childrenProps) => children({ ...childrenProps, html })
        : undefined}
    </GuidesHeadlines>
  );

  if (!container) {
    return vnode;
  }

  render(vnode, getHTMLElement(container, environment));

  return null;
}
