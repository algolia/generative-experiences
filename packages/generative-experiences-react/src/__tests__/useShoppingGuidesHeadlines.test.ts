import { waitFor } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';

import { createClient } from "@algolia/generative-experiences-api-client";
import {
    expect,
    describe,
    test,
} from 'vitest';
import { useShoppingGuidesHeadlines } from '../useShoppingGuidesHeadlines'

const commerceClient = createClient({
    appId: 'app-id',
    indexName: 'indexName',
    searchOnlyAPIKey: 'api-key',
});

describe('useShoppingGuidesHeadlines', () => {
    test('gets Shopping Guides Headlines', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useShoppingGuidesHeadlines({
                client: commerceClient,
                showImmediate: true,
                category: 'some-category'
            })
        );

        await waitForNextUpdate();
        await waitFor(() => {
            expect(commerceClient).toHaveBeenCalledTimes(1);
        });
    });
});
