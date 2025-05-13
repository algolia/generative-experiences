import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { vi, describe, it, afterEach, expect } from 'vitest';

import { ShoppingGuide, createTestClient } from '../../../../test/utils';
import { useGuideContent } from '../useGuideContent';

describe('useGuideContent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getHeadlines', () => {
    const client = createTestClient({
      appId: 'app-id',
      indexName: 'indexName',
      searchOnlyAPIKey: 'api-key',
    });

    it('should retrieve one guide', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useGuideContent({
          client,
          objectID: '1',
        })
      );

      await waitForNextUpdate();
      await waitFor(() => {
        expect(result.current.content).toEqual(ShoppingGuide);
      });
    });
  });
});
