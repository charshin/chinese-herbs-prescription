import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/core/components/Input';

const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Name',
  },
};

export const WithLeadingAddOn: Story = {
  args: {
    label: 'Price',
    leadingAddOn: '$',
  },
};

export const WithTrailingAddOn: Story = {
  args: {
    label: 'Price',
    leadingAddOn: '$',
    trailingAddOn: 'USD',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Website',
    leadingAddOn: 'https://',
    placeholder: 'example.com',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    label: 'Amount',
    leadingAddOn: '$',
    placeholder: '0.00',
  },
};
