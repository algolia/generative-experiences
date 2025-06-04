import type { Hit } from '@algolia/client-search';
import type { Algoliasearch } from 'algoliasearch';

export const getObjects = async (
  objectIDs: Array<Hit['objectID']>,
  indexName: string,
  searchClient: Algoliasearch
): Promise<Hit[]> => {
  const response = await searchClient.getObjects<Hit>({
    requests: objectIDs.map((objectID) => ({
      indexName,
      objectID,
      attributesToRetrieve: ['*'],
    })),
  });

  return response?.results ?? [];
};

export const getObjectIDs = (objects: Hit[]): Array<Hit['objectID']> =>
  objects.map((object) => object.objectID);
