import type { Meta, StoryObj } from '@storybook/react';

import Prescription from '@/app/[locale]/components/Prescription';

const meta = {
  title: 'Prescription',
  component: Prescription,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Prescription>;

export default meta;
type Story = StoryObj<typeof meta>;

const herbs = [
  { id: '1', name: 'Kinh Gioi', price: 100000, prescribed: true, quantity: 5 },
  { id: '2', name: 'Dang Sam', price: 100000, prescribed: true, quantity: 10 },
  { id: '3', name: 'Ty Ba Diep', price: 100000, prescribed: true, quantity: 15 },
  { id: '4', name: 'Mach Mon', price: 100000, prescribed: true, quantity: 20 },
  { id: '5', name: 'Sai Ho', price: 100000, prescribed: true, quantity: 25 },
  { id: '6', name: 'Thuong Nhi Tu', price: 100000, prescribed: true, quantity: 30 },
  { id: '7', name: 'Duong Quy', price: 100000, prescribed: true, quantity: 35 },
  { id: '8', name: 'Hoang Ba', price: 100000 },
  { id: '9', name: 'Huynh Ky', price: 100000 },
  { id: '10', name: 'Cam Thao', price: 100000 },
  { id: '11', name: 'Luc Than Khuc', price: 100000 },
  { id: '12', name: 'Cat Can', price: 100000 },
  { id: '13', name: 'Kiet Canh', price: 100000 },
  { id: '14', name: 'Hanh Nhan', price: 100000 },
  { id: '15', name: 'Dai Tao', price: 100000 },
  { id: '16', name: 'Tran Bi', price: 100000 },
  { id: '17', name: 'Kim Ngan Hoa', price: 100000 },
  { id: '18', name: 'Tay Di Hoa', price: 100000 },
  { id: '19', name: 'Xuyen Khung', price: 100000 },
  { id: '20', name: 'Bach Chi', price: 100000 },
  { id: '21', name: 'Bach Thuoc', price: 100000 },
  { id: '22', name: 'Mach Nha', price: 100000 },
  { id: '23', name: 'Hoang Cam', price: 100000 },
  { id: '24', name: 'Truc Nhu', price: 100000 },
  { id: '25', name: 'O Tac Cot', price: 100000 },
  { id: '26', name: 'Ban Ha Che', price: 100000 },
  { id: '27', name: 'Son Thu', price: 100000 },
  { id: '28', name: 'Te Tan', price: 100000 },
];

export const Default: Story = {
  args: {
    herbs,
  },
};
