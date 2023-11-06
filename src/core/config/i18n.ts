const locales = ['vi-VN'] as const;
export type LOCALES = (typeof locales)[number];
export const i18nConfig = {
  locales: locales as unknown as string[],
  defaultLocale: locales[0],
};

export const currencies = {
  [locales[0]]: 'VND',
} as const;
