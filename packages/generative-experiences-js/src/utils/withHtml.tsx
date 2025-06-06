/** @jsxRuntime classic */
/** @jsx h */

import { html } from 'htm/preact';
import { h } from 'preact';

import { HTMLTemplate } from '../types';

export function withHtml<TProps>(
  Component: preact.FunctionComponent<TProps>
): (props: TProps & HTMLTemplate) => JSX.Element {
  const ComponentWithHtml = (props: TProps) => (
    <Component {...props} html={html} />
  );

  return ComponentWithHtml;
}
