import { CommerceClient } from '@algolia/generative-experiences-api-client';
import { vi } from 'vitest';

import {
  GeneratedHeadline,
  GeneratedShoppingGuide,
  ShoppingGuide,
  SingleHeadline,
} from './mockData';

export function createTestClient(args: any = {}): CommerceClient {
  return {
    addAlgoliaAgent: vi.fn(),
    searchSingleIndex: vi.fn(),
    clearCache: vi.fn(),
    options: {
      host: '',
      appId: '',
      searchOnlyAPIKey: '',
      writeAPIKey: '',
      indexName: '',
    },
    appId: '',
    getHeadlines: vi.fn(() => Promise.resolve(SingleHeadline)),
    getContent: vi.fn(() => Promise.resolve(ShoppingGuide)),
    generateHeadlines: vi.fn(() =>
      Promise.resolve({ data: GeneratedHeadline })
    ),
    generateContent: vi.fn(() => Promise.resolve(GeneratedShoppingGuide)),
    transporter: {
      userAgent: {
        value: '',
        add() {
          return {};
        },
      },
      queryParameters: {},
    } as any,
    ...args,
  };
}
