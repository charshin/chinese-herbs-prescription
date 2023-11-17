import type { Meta, StoryObj } from '@storybook/react';

import PatientForm from '@/app/[locale]/components/PatientForm';

const meta = {
  title: 'PatientForm',
  component: PatientForm,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="flex min-h-screen w-screen items-center justify-center p-5 antialiased dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PatientForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
