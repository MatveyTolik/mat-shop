import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  const store = await cookies();
  const rawLocale = store.get('lng')?.value || 'uk';
  const locale = rawLocale === 'uk' ? 'ua' : rawLocale;


  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
