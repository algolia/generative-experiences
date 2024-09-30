import {
  ShoppingGuideHeadline,
  createClient,
} from '@algolia/generative-experiences-api-client';
import React, {
  Fragment,
  createElement,
  useEffect,
  useRef,
  useState,
} from 'react';
// @ts-expect-error
import { createRoot } from 'react-dom/client';
import { createShoppingGuidesHeadlinesButtonComponent } from '@algolia/generative-experiences-vdom';

const options = {
  source: {
    apiKey: '3822adc5fe3553a54bfde83232f4a531',
    appId: '8FVG9T3219',
    indexName: 'artwork',
    categoryAttribute: '',
  },
  content: {
    apiKey: '22adca448c7ba70df7127cf74c0fdf0d',
    appId: '8FVG9T3219',
    indexName: `shopping_guides_artwork`,
  },
};

const commerceClient = createClient(options);

// test getHeadlines method
commerceClient
  .getHeadlines({
    category: 'On view in Gallery Prince Willem V',
    nbHeadlines: 2,
  })
  .then((response) => console.log(response));

// test getContent method
// commerceClient
//   .getContent({
//     category: 'On view in Gallery Prince Willem V',
//     nbHeadlines: 2,
//   })
//   .then((response) => console.log(response));

export function useShoppingGuideHeadlines({
  immediate = false,
  ...defaultOptions
}) {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [headlines, setHeadlines] = useState<ShoppingGuideHeadline[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
  const abortController = useRef(new AbortController());

  async function showHeadlines(options = {}) {
    const {
      // @ts-expect-error
      object,
      // @ts-expect-error
      category, // @ts-expect-error
      breadcrumbs,
      nbHeadlines = 4,
      source = 'index',
      // @ts-expect-error
      searchParams,
      // @ts-expect-error
      generateParams,
      // @ts-expect-error
      onlyPublished,
    } = {
      ...defaultOptions,
      ...options,
    };

    if (isLoading) {
      abortController.current.abort();
    }
    const { signal } = abortController.current;

    if (source === 'index' || source === 'combined') {
      const hits = await commerceClient
        .getHeadlines({
          category,
          object,
          breadcrumbs,
          nbHeadlines,
          searchParams,
          onlyPublished,
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.warn(
            '[commerce-ai]: error while fetching headlines from Algolia, falling back to generated headlines'
          );
        });

      if (hits && hits.length === nbHeadlines) {
        setIsShowing(true);
        setIsLoading(false);
        setHeadlines(hits);
        return;
      }
    }

    // @ts-expect-error
    if (source === 'generated' || source === 'combined') {
      setIsLoading(true);

      if (!category) {
        throw new Error('category is required when using generated headlines');
      }

      try {
        const { data } = await commerceClient.generateHeadlines(
          {
            category,
            nbHeadlines,
            ...generateParams,
          },
          { signal }
        );
        setIsShowing(true);
        setIsLoading(false);
        setHeadlines(data);
        abortController.current = new AbortController();
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setIsShowing(true);
          setIsLoading(false);
          setError(err as Error);
        }
      }
    }
  }

  useEffect(() => {
    if (immediate) {
      showHeadlines();
    }
    return () => {
      abortController.current.abort();
      abortController.current = new AbortController();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, []);

  return {
    headlines,
    error,
    isShowing,
    isLoading,
    showHeadlines,
    hideHeadlines: () => setIsShowing(false),
    commerceClient,
  };
}

const UncontrolledHeadlinesButton =
  createShoppingGuidesHeadlinesButtonComponent({
    // @ts-expect-error
    createElement,
    Fragment,
  });

function ComponentTest() {
  //   const { isShowing, isLoading, showHeadlines, hideHeadlines, headlines } =
  //     useShoppingGuideHeadlines({
  //       category: 'On view in Gallery Prince Willem V',
  //     });

  //   console.log('vdom works', headlines);
  return (
    // <div>Hi</div>
    <UncontrolledHeadlinesButton
      //   {...props}
      isShowing={true}
      isLoading={false}
      //@ts-expect-error
      showHeadlines={() => {}}
      hideHeadlines={() => {}}
    />
  );
}

export default ComponentTest();

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <ComponentTest />
  </React.StrictMode>
);
