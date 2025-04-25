import { GuideContentOptions } from '@algolia/generative-experiences-api-client';
import {
  createGuideContentComponent,
  ContentComponentProps as ContentComponentPropsVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';

import { UseGuidesFeedbackProps } from './GuidesFeedback';
import { useGuidesContent } from './useGuidesContent';
import { useGuidesFeedback } from './useGuidesFeedback';

export type UseGuidesContentProps = GuideContentOptions;

export type GuidesContentProps<TObject = {}> = UseGuidesContentProps &
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

const UncontrolledGuidesContent = createGuideContentComponent({
  // @ts-expect-error - Pragma issue
  createElement,
  Fragment,
});

export function GuidesContent<TObject = {}>(
  props: GuidesContentProps<TObject>
) {
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
