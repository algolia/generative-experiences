import { CommerceGetters } from './types';

export const defaultGetters: CommerceGetters = {
  guideURL: (objectID) => `/shopping-guide/${objectID}`,
  objectURL: (objectID) => `/product/${objectID}`,
  images: (object) => {
    if (!object) {
      return [];
    }
    const images = object.images;

    if (
      Array.isArray(images) &&
      images.every(
        ({ src, alt }) => typeof src === 'string' && typeof alt === 'string'
      )
    ) {
      return images;
    }

    const image =
      object.image ||
      object.image_url ||
      object.imageURL ||
      object.imageUrl ||
      object.images;
    const alt = object.name || object.title || object.objectID;

    if (typeof image === 'string') {
      return [{ src: image, alt }];
    }

    // eslint-disable-next-line no-console
    console.warn('Could not find images for object', object);

    return [];
  },
};
