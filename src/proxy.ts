import createMiddleware from 'next-intl/middleware';

export const proxy = createMiddleware({
  // A list of all locales that are supported
  locales: ['ar', 'en'],

  // Used when no locale matches
  defaultLocale: 'ar',
  
  // No prefix for the default locale
  localePrefix: 'as-needed'
});

export default proxy;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
};
