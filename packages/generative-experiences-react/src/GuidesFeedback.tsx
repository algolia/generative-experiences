import { CommerceClient } from '@algolia/generative-experiences-api-client';
import {
  createGuidesFeedbackComponent,
  FeedbackComponentProps as FeedbackComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';

import { useGuidesFeedback } from './useGuidesFeedback';

export type UseGuidesFeedbackProps = {
  objectIDs?: string[];
  client: CommerceClient;
  voteTarget?: 'content' | 'headline';
  userToken?: string;
};

export type GuidesFeedbackProps = UseGuidesFeedbackProps &
  Omit<
    FeedbackComponentVDOMProps,
    'castFeedback' | 'status' | 'createElement' | 'Fragment' | 'alreadyCast'
  >;

const UncontrolledGuidesFeedback = createGuidesFeedbackComponent({
  // @ts-expect-error - Pragma issue
  createElement,
  Fragment,
});

export function GuidesFeedback(props: GuidesFeedbackProps) {
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
