import { IntlProvider } from '@/core/lib/intl';
import { LOCALES } from '@/core/config/i18n';
import I18n from '@/core/utils/i18n';

import Header from './components/Header';
import Footer from './components/Footer';

export default async function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: LOCALES };
}) {
  I18n.locale = locale;
  const messages = await I18n.getMessages();

  return (
    <IntlProvider locale={I18n.locale} messages={messages}>
      <div className="relative min-h-screen pb-14">
        <Header />
        <main>{children}</main>
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-center">
          <Footer />
        </div>
      </div>
    </IntlProvider>
  );
}
