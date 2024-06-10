import type { Preview } from '@storybook/react';
import StoryDecorator, { DocDecorator } from './StoryDecorator';
import { initialize, mswLoader } from 'msw-storybook-addon';
import handlers from '@/mocks/handlers';

initialize(
  {
    serviceWorker: {
      url: './mockServiceWorker.js'
    }
  },
  handlers
);

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      page: DocDecorator
    }
  },
  tags: ['autodocs'],
  decorators: [StoryDecorator],
  loaders: [mswLoader]
};

export default preview;
