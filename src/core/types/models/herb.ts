import { LOCALES } from '@/core/config/i18n';

export interface HerbModel {
  name: string;
  photo?: string;
  traits?: string[];
  price: number;
  displayedIn: Record<LOCALES, string>;
}
