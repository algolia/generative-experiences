import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { vi, describe, it, afterEach, expect } from 'vitest';

import { SingleHeadline, createTestClient } from '../../../../test/utils';
import { useGuidesHeadlines } from '../useGuidesHeadlines';

describe('useGuidesHeadlines', () => {
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
        useGuidesHeadlines({
          client,
          showImmediate: true,
          category: 'some-category',
          maxHeadlines: 1,
        })
      );

      await waitForNextUpdate();
      await waitFor(() => {
        expect(result.current.headlines).toEqual(SingleHeadline);
      });
    });
  });
});
