import type { Meta, StoryObj } from '@storybook/react';

import PatientForm from '@/app/[locale]/components/PatientForm';

const meta = {
  title: 'PatientForm',
  component: PatientForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PatientForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
