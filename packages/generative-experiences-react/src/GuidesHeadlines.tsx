import { GuideHeadlinesOptions } from '@algolia/generative-experiences-api-client';
import {
  createGuidesHeadlinesComponent,
  HeadlinesComponentProps as HeadlinesComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';

import { UseGuidesFeedbackProps } from './GuidesFeedback';
import { useGuidesFeedback } from './useGuidesFeedback';
import { useGuidesHeadlines } from './useGuidesHeadlines';

export type UseHeadlinesProps = GuideHeadlinesOptions;

export type GuidesHeadlinesProps = UseHeadlinesProps &
  Omit<
    HeadlinesComponentVDOMProps,
    | 'items'
    | 'status'
    | 'createElement'
    | 'Fragment'
    | 'castFeedback'
    | 'alreadyCast'
  > &
  Omit<UseGuidesFeedbackProps, 'client'>;

const UncontrolledGuidesHeadlines = createGuidesHeadlinesComponent({
  // @ts-expect-error - Pragma issue
  createElement,
  Fragment,
});

export function GuidesHeadlines(props: GuidesHeadlinesProps) {
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
