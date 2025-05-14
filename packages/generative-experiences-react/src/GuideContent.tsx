import { GuideContentOptions } from '@algolia/generative-experiences-api-client';
import {
  createGuideContentComponent,
  ContentComponentProps as ContentComponentPropsVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';

import { UseGuidesFeedbackProps } from './GuidesFeedback';
import { useGuideContent } from './useGuideContent';
import { useGuidesFeedback } from './useGuidesFeedback';

export type UseGuideContentProps = GuideContentOptions;

export type GuideContentProps<TObject = {}> = UseGuideContentProps &
  Omit<
    ContentComponentPropsVDOMProps<TObject>,
    | 'item'
    | 'status'
    | 'createElement'
    | 'Fragment'
    | 'castFeedback'
    | 'alreadyCast'
  > &
  Omit<UseGuidesFeedbackProps, 'client'>;

const UncontrolledGuideContent = createGuideContentComponent({
  // @ts-expect-error - Pragma issue
  createElement,
  Fragment,
});

export function GuideContent<TObject = {}>(props: GuideContentProps<TObject>) {
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
