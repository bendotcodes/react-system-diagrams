import { ComponentType } from 'react';
import type { Preview } from '@storybook/react';
import { css, Global } from '@emotion/react';

const withFullHeight = (Story: ComponentType) => (
  <>
    <Global
      styles={css`
        html,
        body,
        #storybook-root {
          height: 100%;
        }
      `}
    />
    <Story />
  </>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withFullHeight],
};

export default preview;
