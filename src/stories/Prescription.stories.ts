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
  {
    name: 'kinh-gioi',
    price: 300000,
    displayedIn: { en: 'Kinh Gioi', 'vi-VN': 'Kinh Giới' },
  },
  {
    name: 'dang-sam',
    price: 200000,
    displayedIn: { en: 'Dang Sam', 'vi-VN': 'Đảng Sâm' },
  },
  {
    name: 'ty-ba-diep',
    price: 400000,
    displayedIn: { en: 'Ty Ba Diep', 'vi-VN': 'Tỳ Bà Diệp' },
  },
  {
    name: 'mach-mon',
    price: 100000,
    displayedIn: { en: 'Mach Mon', 'vi-VN': 'Mạch Môn' },
  },
  {
    name: 'sai-ho',
    price: 100000,
    displayedIn: { en: 'Sai Ho', 'vi-VN': 'Sài Hồ' },
  },
  {
    name: 'thuong-nhi-tu',
    price: 100000,
    displayedIn: { en: 'Thuong Nhi Tu', 'vi-VN': 'Thương Nhĩ Tử' },
  },
  {
    name: 'duong-quy',
    price: 100000,
    displayedIn: { en: 'Duong Quy', 'vi-VN': 'Đương Quy' },
  },
  {
    name: 'hoang-ba',
    price: 100000,
    displayedIn: { en: 'Hoang Ba', 'vi-VN': 'Hoàng Bá' },
  },
  {
    name: 'huynh-ky',
    price: 100000,
    displayedIn: { en: 'Huynh Ky', 'vi-VN': 'Huỳnh Kỳ' },
  },
  {
    name: 'cam-thao',
    price: 500000,
    displayedIn: { en: 'Cam Thao', 'vi-VN': 'Cam Thảo' },
  },
  {
    name: 'luc-than-Khuc',
    price: 100000,
    displayedIn: { en: 'Luc Than Khuc', 'vi-VN': 'Lục Thần Khúc' },
  },
  {
    name: 'cat-can',
    price: 100000,
    displayedIn: { en: 'Cat Can', 'vi-VN': 'Cát Căn' },
  },
  {
    name: 'kiet-canh',
    price: 100000,
    displayedIn: { en: 'Kiet Canh', 'vi-VN': 'Kiết Cánh' },
  },
  {
    name: 'hanh-nhan',
    price: 100000,
    displayedIn: { en: 'Hanh Nhan', 'vi-VN': 'Hạnh Nhân' },
  },
  {
    name: 'dai-tao',
    price: 100000,
    displayedIn: { en: 'Dai Tao', 'vi-VN': 'Đại Táo' },
  },
  {
    name: 'tran-bi',
    price: 100000,
    displayedIn: { en: 'Tran Bi', 'vi-VN': 'Trần Bì' },
  },
  {
    name: 'kim-ngan-hoa',
    price: 100000,
    displayedIn: { en: 'Kim Ngan Hoa', 'vi-VN': 'Kim Ngân Hoa' },
  },
  {
    name: 'tay-di-hoa',
    price: 100000,
    displayedIn: { en: 'Tay Di Hoa', 'vi-VN': 'Tây Di Hoa' },
  },
  {
    name: 'xuyen-khung',
    price: 100000,
    displayedIn: { en: 'Xuyen Khung', 'vi-VN': 'Xuyên Khung' },
  },
  {
    name: 'bach-chi',
    price: 600000,
    displayedIn: { en: 'Bach Chi', 'vi-VN': 'Bạch Chỉ' },
  },
  {
    name: 'bach-thuoc',
    price: 300000,
    displayedIn: { en: 'Bach Thuoc', 'vi-VN': 'Bạch Thược' },
  },
  {
    name: 'mach-nha',
    price: 100000,
    displayedIn: { en: 'Mach Nha', 'vi-VN': 'Mạch Nha' },
  },
  {
    name: 'hoang-cam',
    price: 100000,
    displayedIn: { en: 'Hoang Cam', 'vi-VN': 'Hoàng Cầm' },
  },
  {
    name: 'truc-nhu',
    price: 100000,
    displayedIn: { en: 'Truc Nhu', 'vi-VN': 'Trúc Nhự' },
  },
  {
    name: 'o-tac-cot',
    price: 100000,
    displayedIn: { en: 'O Tac Cot', 'vi-VN': 'Ô Tặc Cốt' },
  },
  {
    name: 'ban-ha-che',
    price: 400000,
    displayedIn: { en: 'Ban Ha Che', 'vi-VN': 'Bán Hạ Chế' },
  },
  {
    name: 'son-thu',
    price: 100000,
    displayedIn: { en: 'Son Thu', 'vi-VN': 'Sơn Thù' },
  },
  {
    name: 'te-tan',
    price: 100000,
    displayedIn: { en: 'Te Tan', 'vi-VN': 'Tế Tân' },
  },
];

export const Default: Story = {
  args: {
    herbs,
  },
};
