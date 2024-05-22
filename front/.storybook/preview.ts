import type { Preview } from "@storybook/react";
import StoryDecorator from "./StoryDecorator";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    StoryDecorator
  ]
};

export default preview;
