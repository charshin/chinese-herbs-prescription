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
        <div className="sticky top-0 z-40">
          <Header />
        </div>
        <main>{children}</main>
        <div className="absolute inset-x-0 bottom-0 h-14">
          <Footer />
        </div>
      </div>
    </IntlProvider>
  );
}
