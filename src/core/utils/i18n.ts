import 'server-only';

import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { createIntl, createIntlCache } from '@formatjs/intl';

import type { LOCALES } from '@/core/config/i18n';
import { prisma } from '@/core/db/prisma';

export default class I18n {
  static #locale: LOCALES;
  static get locale() {
    return I18n.#locale;
  }
  static set locale(locale) {
    I18n.#locale = locale;
  }

  static readonly DEFAULT_MESSAGES = {
    'pick-herbs.filter.placeholder': 'Type to filter',
  };
  static #getCachedMessages = cache(
    unstable_cache(
      async (locale: LOCALES): Promise<Record<string, string>> => {
        const data = await prisma.i18n.findUnique({ where: { locale } });
        const messages =
          (data?.messages as Prisma.JsonObject as Record<string, string>) ?? I18n.DEFAULT_MESSAGES;
        return messages;
      },
      ['i18n-messages'],
    ),
  );
  static getMessages() {
    return I18n.#getCachedMessages(I18n.#locale);
  }

  static readonly #cache = createIntlCache();
  static #getCachedIntl = cache(async (locale: LOCALES) => {
    const messages = await I18n.getMessages();
    return createIntl({ locale: I18n.#locale, messages }, I18n.#cache);
  });
  static async getIntl() {
    return I18n.#getCachedIntl(I18n.#locale);
  }
}
