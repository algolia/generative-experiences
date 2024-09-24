import { createClient } from '@algolia/generative-experiences-api-client';

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

console.log('test up');

const commerceClient = createClient(options);

const headlines = commerceClient.getHeadlines({
  category: 'On view in Gallery Prince Willem V',
  nbHeadlines: 2,
});

console.log(headlines);
