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

import { createClient } from '../client';

const addAlgoliaAgent = vi.fn();
const searchSingleIndex = vi.fn();
const getObjects = vi.fn();

vi.mock('algoliasearch', () => ({
  algoliasearch: vi.fn(() => ({
    addAlgoliaAgent,
    searchSingleIndex,
    getObjects,
  })),
}));

const server = setupServer(
  http.post('https://generative-us.algolia.com/1/delete/guides/', () => {
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
        maxHeadlines: 2,
      });

      expect(searchSingleIndex).toHaveBeenCalledTimes(1);

      expect(searchSingleIndex).toHaveBeenCalledWith(
        expect.objectContaining({
          indexName: 'guides_indexName',
        })
      );
    });

    it.only.each([
      {
        count: 0,
        maxHeadlines: 4,
        expected: 0,
      },
      {
        count: 0,
        maxHeadlines: 0,
        expected: 0,
      },
      {
        count: 10,
        maxHeadlines: 0,
        expected: 0,
      },

      {
        count: 10,
        maxHeadlines: 5,
        expected: 5,
      },
      {
        count: 10,
        maxHeadlines: 10,
        expected: 10,
      },
      {
        count: 10,
        maxHeadlines: 20,
        expected: 10,
      },
    ])(
      'should return the correct number of headlines ($expected)',
      async ({ count, maxHeadlines, expected }) => {
        searchSingleIndex.mockImplementation(() => ({
          hits: Array(count).map((_, i) => ({ objectID: i + '' })),
        }));
        const client = createClient({
          appId: 'app-id',
          indexName: 'indexName',
          searchOnlyAPIKey: 'api-key',
        });

        const headlines = await client.getHeadlines({
          category: 'some-category',
          maxHeadlines,
        });

        expect(headlines).toHaveLength(expected);
      }
    );
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
          indexName: 'guides_indexName',
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
