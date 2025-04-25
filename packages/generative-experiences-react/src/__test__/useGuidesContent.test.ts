import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { vi, describe, it, afterEach, expect } from 'vitest';

import { ShoppingGuide, createTestClient } from '../../../../test/utils';
import { useGuidesContent } from '../useGuidesContent';

describe('useGuidesContent', () => {
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
        useGuidesContent({
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
