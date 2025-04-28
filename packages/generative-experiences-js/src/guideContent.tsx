/** @jsxRuntime classic */
/** @jsx h */

import { GuideContentOptions } from '@algolia/generative-experiences-api-client';
import {
  createGuideContentComponent,
  ContentComponentProps as ContentComponentPropsVDOMProps,
} from '@algolia/generative-experiences-vdom';
import { html } from 'htm/preact';
import { createElement, Fragment, h, render } from 'preact';

import { useGuideContent, useGuidesFeedback } from './hooks';
import {
  EnvironmentProps,
  HTMLTemplate,
  UseGuidesFeedbackProps,
} from './types';
import { getHTMLElement, withHtml } from './utils';

const UncontrolledGuideContent = createGuideContentComponent({
  createElement,
  Fragment,
});

export type GuideContentProps<
  TObject = {},
  TComponentProps extends Record<string, unknown> = {}
> = GuideContentOptions &
  Omit<
    ContentComponentPropsVDOMProps<TObject, TComponentProps>,
    'item' | 'status' | 'castFeedback' | 'alreadyCast'
  > &
  Omit<UseGuidesFeedbackProps, 'client'>;

function GuideContent<
  TObject = {},
  TComponentProps extends Record<string, unknown> = {}
>(props: GuideContentProps<TObject, TComponentProps>) {
  const { content, status } = useGuideContent(props);
  const { castFeedback, alreadyCast } = useGuidesFeedback(props);

  return (
    <UncontrolledGuideContent
      {...props}
      item={content}
      castFeedback={castFeedback}
      alreadyCast={alreadyCast}
      status={status}
    />
  );
}

export function guideContent<TObject = {}>({
  container,
  environment = window,
  itemComponent,
  getters,
  view,
  children,
  ...props
}: GuideContentProps<TObject, HTMLTemplate> & EnvironmentProps) {
  const vnode = (
    <GuideContent<TObject, HTMLTemplate>
      {...props}
      view={view && withHtml(view)}
      itemComponent={itemComponent && withHtml(itemComponent)}
    >
      {children
        ? (childrenProps) => children({ ...childrenProps, html })
        : undefined}
    </GuideContent>
  );

  if (!container) {
    return vnode;
  }

  render(vnode, getHTMLElement(container, environment));

  return null;
}
