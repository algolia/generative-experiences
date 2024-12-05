import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { vi, describe, it, afterEach, expect } from 'vitest';
import {
  GeneratedHeadline,
  SingleHeadline,
  createTestClient,
} from '../../../../test/utils';

import { useShoppingGuidesHeadlines } from '../useShoppingGuidesHeadlines';

describe('useShoppingGuidesHeadlines', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getHeadlines', () => {
    const client = createTestClient({
      appId: 'app-id',
      indexName: 'indexName',
      searchOnlyAPIKey: 'api-key',
    });

    it('should retrieve one headline', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useShoppingGuidesHeadlines({
          client: client,
          showImmediate: true,
          category: 'some-category',
          nbHeadlines: 1,
        })
      );

      await waitForNextUpdate();
      await waitFor(() => {
        expect(result.current.headlines).toEqual(SingleHeadline);
      });
    });

    it('should generate one headline', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useShoppingGuidesHeadlines({
          client: client,
          showImmediate: true,
          source: 'generated',
          category: 'some-category',
          nbHeadlines: 1,
        })
      );

      await waitForNextUpdate();
      await waitFor(() => {
        expect(result.current.headlines).toEqual(GeneratedHeadline);
      });
    });
  });
});
