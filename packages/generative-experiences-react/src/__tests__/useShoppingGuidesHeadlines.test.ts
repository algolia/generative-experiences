import { DEFAULT_HOST, createClient } from '@algolia/generative-experiences-api-client';
import { HttpResponse, http } from 'msw';
import { waitFor } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';
import { expect, describe, test, beforeEach } from 'vitest';
import { initMSWServer } from '../../../../test/utils'

import { useShoppingGuidesHeadlines } from '../useShoppingGuidesHeadlines';

const server = initMSWServer();

const commerceClient = createClient({
    appId: 'app-id',
    indexName: 'indexName',
    searchOnlyAPIKey: 'api-key',
});

describe('useShoppingGuidesHeadlines', () => {
    beforeEach(() => {
        server.use(http.get(`${DEFAULT_HOST}/delete/shopping_guides/`, () => HttpResponse.json()));
    });

    test('gets Shopping Guides Headlines', async () => {
        const { headlines, waitForNextUpdate } = renderHook(() =>
            useShoppingGuidesHeadlines({
                client: commerceClient,
                showImmediate: true,
                category: 'some-category',
            })
        );

        await waitForNextUpdate();
        await waitFor(() => {
            expect(commerceClient).toHaveBeenCalledTimes(1);
        });
    });
});
