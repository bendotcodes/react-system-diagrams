import type { Meta, StoryObj } from '@storybook/react';

import { Diagram } from './';

const meta = {
  component: Diagram,
} satisfies Meta<typeof Diagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
