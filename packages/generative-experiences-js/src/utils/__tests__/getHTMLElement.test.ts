import { describe, it, expect } from 'vitest';

import { getHTMLElement } from '../getHTMLElement';

describe('getHTMLElement', () => {
  it('should return the HTMLElement when passed as an argument', () => {
    const element = document.createElement('div');
    const result = getHTMLElement(element, window);
    expect(result).toBe(element);
  });

  it('should return the HTMLElement when a valid selector string is passed', () => {
    const element = document.createElement('div');
    element.className = 'test-element';
    document.body.appendChild(element);

    const result = getHTMLElement('.test-element', window);
    expect(result).toBe(element);

    document.body.removeChild(element);
  });

  it('should return null when an invalid selector string is passed', () => {
    const result = getHTMLElement('.non-existent-element', window);
    expect(result).toBeNull();
  });
});
