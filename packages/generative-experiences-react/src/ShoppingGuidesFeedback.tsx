import { CommerceClient } from '@algolia/generative-experiences-api-client';
import {
  createShoppingGuidesFeedbackComponent,
  FeedbackComponentProps as FeedbackComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import React, { createElement, Fragment } from 'react';

import { useShoppingGuidesFeedback } from './useShoppingGuidesFeedback';

export type UseShoppingGuidesFeedbackProps = {
  objectIDs?: string[];
  client: CommerceClient;
  voteTarget?: 'content' | 'headline';
  userToken: string;
};

export type ShoppingGuidesFeedbackProps = UseShoppingGuidesFeedbackProps &
  Omit<
    FeedbackComponentVDOMProps,
    'castFeedback' | 'status' | 'createElement' | 'Fragment' | 'alreadyCasted'
  >;

const UncontrolledShoppingGuidesFeedback = createShoppingGuidesFeedbackComponent(
  {
    // @ts-expect-error
    createElement,
    Fragment,
  }
);

export function ShoppingGuidesFeedback(props: ShoppingGuidesFeedbackProps) {
  const { castFeedback, alreadyCasted, status } = useShoppingGuidesFeedback(
    props
  );

  return (
    <UncontrolledShoppingGuidesFeedback
      {...props}
      castFeedback={castFeedback}
      alreadyCasted={alreadyCasted}
      status={status}
    />
  );
}
