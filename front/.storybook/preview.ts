import type { Preview } from '@storybook/react';
import StoryDecorator, { DocDecorator } from './StoryDecorator';

const preview: Preview = {
  parameters: {
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
  decorators: [StoryDecorator]
};

export default preview;
