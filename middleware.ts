import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ar', 'en'],

  // Used when no locale matches
  defaultLocale: 'ar',
  
  // Automatically redirect root path to default locale
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames, exclude API routes and static files
  matcher: [
    // Match all pathnames except for:
    // - API routes
    // - _next (Next.js internals)
    // - Static files
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match root
    '/',
    // Match locale pathnames
    '/(ar|en)/:path*'
  ]
};
