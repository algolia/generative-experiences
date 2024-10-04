import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import {
  vi,
  it,
  expect,
  describe,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';

import { createClient, DEFAULT_HOST } from '../client';

const addAlgoliaAgent = vi.fn();
const searchSingleIndex = vi.fn();

vi.mock('algoliasearch', () => ({
  algoliasearch: vi.fn(() => ({
    addAlgoliaAgent,
    searchSingleIndex,
  })),
}));

const server = setupServer(
  http.post(`${DEFAULT_HOST}/delete/shopping_guides/`, () => {
    return HttpResponse.json({ status: 'success' });
  })
);

describe('createClient', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('required parameters', () => {
    it('should require an application id', () => {
      expect(() =>
        // @ts-expect-error
        createClient({
          indexName: 'indexName',
          searchOnlyAPIKey: 'api-key',
        })
      ).toThrowError('Missing appId');
    });

    it('should require an index name', () => {
      expect(() =>
        // @ts-expect-error
        createClient({
          appId: 'appId',
          searchOnlyAPIKey: 'api-key',
        })
      ).toThrowError('Missing indexName');
    });

    it('should require an read-only API key', () => {
      expect(() =>
        // @ts-expect-error
        createClient({
          appId: 'appId',
          indexName: 'indexName',
        })
      ).toThrowError('Missing searchOnlyAPIKey');
    });
  });

  describe('getHeadlines', () => {
    it('should use the content index', async () => {
      const client = createClient({
        appId: 'app-id',
        indexName: 'indexName',
        searchOnlyAPIKey: 'api-key',
      });

      await client.getHeadlines({
        category: 'some-category',
        nbHeadlines: 2,
      });

      expect(searchSingleIndex).toHaveBeenCalledTimes(1);

      expect(searchSingleIndex).toHaveBeenCalledWith(
        expect.objectContaining({
          indexName: 'shopping_guides_indexName',
        })
      );
    });
  });

  describe('getContent', () => {
    it('should use the content index', async () => {
      const client = createClient({
        appId: 'app-id',
        indexName: 'indexName',
        searchOnlyAPIKey: 'api-key',
      });

      await client.getContent({
        objectID: '333683a3-8038-42bd-9988-2eb97e46ddfd',
      });

      expect(searchSingleIndex).toHaveBeenCalledTimes(1);

      expect(searchSingleIndex).toHaveBeenCalledWith(
        expect.objectContaining({
          indexName: 'shopping_guides_indexName',
        })
      );
    });
  });

  describe('should require a write API key', () => {
    it('deleteHeadlines', async () => {
      const client = createClient({
        appId: 'app-id',
        indexName: 'indexName',
        searchOnlyAPIKey: 'api-key',
      });

      await expect(() =>
        client.deleteHeadlines({ objectIDs: [] })
      ).rejects.toThrowError('Missing writeAPIKey');
    });

    it('deleteContent', async () => {
      const client = createClient({
        appId: 'app-id',
        indexName: 'indexName',
        searchOnlyAPIKey: 'api-key',
      });

      await expect(() =>
        client.deleteContent({ objectIDs: [] })
      ).rejects.toThrowError('Missing writeAPIKey');
    });

    it('generateContent', async () => {
      const client = createClient({
        appId: 'app-id',
        indexName: 'indexName',
        searchOnlyAPIKey: 'api-key',
      });

      await expect(() =>
        client.generateContent({ objectID: 'objectID' })
      ).rejects.toThrowError('Missing writeAPIKey');
    });

    it('generateHeadlines', async () => {
      const client = createClient({
        appId: 'app-id',
        indexName: 'indexName',
        searchOnlyAPIKey: 'api-key',
      });

      await expect(() =>
        client.generateHeadlines({ category: '' })
      ).rejects.toThrowError('Missing writeAPIKey');
    });

    it('generateComparison', async () => {
      const client = createClient({
        appId: 'app-id',
        indexName: 'indexName',
        searchOnlyAPIKey: 'api-key',
      });

      await expect(() =>
        client.generateComparison({ objectIDs: [] })
      ).rejects.toThrowError('Missing writeAPIKey');
    });
  });
});
