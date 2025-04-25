/** @jsxRuntime classic */
/** @jsx h */

import { GuideContentOptions } from '@algolia/generative-experiences-api-client';
import {
  createGuideContentComponent,
  ContentComponentProps as ContentComponentPropsVDOMProps,
} from '@algolia/generative-experiences-vdom';
import { html } from 'htm/preact';
import { createElement, Fragment, h, render } from 'preact';

import { useGuidesContent, useGuidesFeedback } from './hooks';
import {
  EnvironmentProps,
  HTMLTemplate,
  UseGuidesFeedbackProps,
} from './types';
import { getHTMLElement, withHtml } from './utils';

const UncontrolledGuidesContent = createGuideContentComponent({
  createElement,
  Fragment,
});

export type GuidesContentProps<
  TObject = {},
  TComponentProps extends Record<string, unknown> = {}
> = GuideContentOptions &
  Omit<
    ContentComponentPropsVDOMProps<TObject, TComponentProps>,
    'item' | 'status' | 'castFeedback' | 'alreadyCast'
  > &
  Omit<UseGuidesFeedbackProps, 'client'>;

function GuidesContent<
  TObject = {},
  TComponentProps extends Record<string, unknown> = {}
>(props: GuidesContentProps<TObject, TComponentProps>) {
  const { content, status } = useGuidesContent(props);
  const { castFeedback, alreadyCast } = useGuidesFeedback(props);

  return (
    <UncontrolledGuidesContent
      {...props}
      item={content}
      castFeedback={castFeedback}
      alreadyCast={alreadyCast}
      status={status}
    />
  );
}

export function guidesContent<TObject = {}>({
  container,
  environment = window,
  itemComponent,
  getters,
  view,
  children,
  ...props
}: GuidesContentProps<TObject, HTMLTemplate> & EnvironmentProps) {
  const vnode = (
    <GuidesContent<TObject, HTMLTemplate>
      {...props}
      view={view && withHtml(view)}
      itemComponent={itemComponent && withHtml(itemComponent)}
    >
      {children
        ? (childrenProps) => children({ ...childrenProps, html })
        : undefined}
    </GuidesContent>
  );

  if (!container) {
    return vnode;
  }

  render(vnode, getHTMLElement(container, environment));

  return null;
}
