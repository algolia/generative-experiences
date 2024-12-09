/** @jsxRuntime classic */
/** @jsx h */

import {
  createShoppingGuidesHeadlinesComponent,
  HeadlinesComponentProps as HeadlinesComponentVDOMProps,
} from '@algolia/generative-experiences-vdom';
import { html } from 'htm/preact';
import { createElement, Fragment, h, render } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import { EnvironmentProps, HTMLTemplate } from './types';
import { getHTMLElement, withHtml } from './utils';
import {
  ShoppingGuideHeadline,
  ShoppingGuideHeadlinesOptions,
} from '@algolia/generative-experiences-api-client';

const UncontrolledShoppingGuidesHeadlines = createShoppingGuidesHeadlinesComponent(
  {
    createElement,
    Fragment,
  }
);

export function useShoppingGuidesHeadlines(
  props: ShoppingGuideHeadlinesOptions
) {
  const [headlines, setHeadlines] = useState<ShoppingGuideHeadline[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'stalled'>('idle');
  const [error, setError] = useState<Error | undefined>(undefined);

  props.client.addAlgoliaAgent('generative-experiences-js', '1.0.0');

  const abortController = useRef(new AbortController());

  async function showHeadlines(options = {}) {
    const {
      object,
      category,
      breadcrumbs,
      nbHeadlines = 4,
      source = 'index',
      searchParams,
      generateParams,
      onlyPublished,
    } = {
      ...props,
      ...options,
    };

    if (status === 'loading') {
      abortController.current.abort();
    }
    const { signal } = abortController.current;

    if (source === 'index' || source === 'combined') {
      const hits = await props.client
        .getHeadlines({
          category,
          object,
          breadcrumbs,
          nbHeadlines,
          searchParams,
          onlyPublished,
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.warn(
            '[commerce-ai]: error while fetching headlines from Algolia, falling back to generated headlines'
          );
        });

      if (hits && hits.length === nbHeadlines) {
        setStatus('idle');
        setHeadlines(hits);
        return;
      }
    }

    if (source === 'generated' || source === 'combined') {
      setStatus('loading');

      if (!category) {
        throw new Error('category is required when using generated headlines');
      }

      try {
        const { data } = await props.client.generateHeadlines(
          {
            category,
            nbHeadlines,
            ...generateParams,
          },
          { signal }
        );
        setStatus('idle');
        setHeadlines(data);
        abortController.current = new AbortController();
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setStatus('idle');
          setError(err as Error);
        }
      }
    }
  }

  useEffect(() => {
    if (props.showImmediate) {
      showHeadlines();
    }
    return () => {
      abortController.current.abort();
      abortController.current = new AbortController();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    headlines,
    error,
    status,
    showHeadlines,
  };
}

export type ShoppingGuidesHeadlinesProps<
  TComponentProps extends Record<string, unknown> = {}
> = ShoppingGuideHeadlinesOptions &
  Omit<
    HeadlinesComponentVDOMProps<TComponentProps>,
    'items' | 'status' | 'castFeedback' | 'alreadyCast'
  >;
// Omit<UseShoppingGuidesFeedbackProps, 'client'>;

function ShoppingGuidesHeadlines<
  TComponentProps extends Record<string, unknown> = {}
>(props: ShoppingGuidesHeadlinesProps<TComponentProps>) {
  const { headlines, status } = useShoppingGuidesHeadlines(props);

  return (
    <UncontrolledShoppingGuidesHeadlines
      {...props}
      items={headlines}
      castFeedback={() => {}}
      alreadyCast={true}
      status={status}
    />
  );
}

export function shoppingGuidesHeadlines({
  container,
  environment = window,
  itemComponent,
  getters,
  view,
  showFeedback,
  children,
  ...props
}: ShoppingGuidesHeadlinesProps<HTMLTemplate> & EnvironmentProps) {
  const vnode = (
    <ShoppingGuidesHeadlines<HTMLTemplate>
      {...props}
      view={view && withHtml(view)}
      itemComponent={itemComponent && withHtml(itemComponent)}
    >
      {children
        ? (childrenProps) => children({ ...childrenProps, html })
        : undefined}
    </ShoppingGuidesHeadlines>
  );

  if (!container) {
    return vnode;
  }

  render(vnode, getHTMLElement(container, environment));

  return null;
}
