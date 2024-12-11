import { CommerceClient } from '@algolia/generative-experiences-api-client';
import { vi } from 'vitest';

import { ShoppingGuide, SingleHeadline } from './mockData';

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
