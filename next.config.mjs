import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "your-strapi-server.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.alrawafid.ly",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // إعدادات خاصة بـ Vercel لتجنب أخطاء middleware
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Fix for Next.js 16 + next-intl resolution error in Turbopack
  turbopack: {
    resolveAlias: {
      'next-intl/config': './src/i18n/request.ts',
    },
  },
};

const finalConfig = withNextIntl(nextConfig);

// Strip invalid experimental keys that next-intl might inject for older Next.js versions
if (finalConfig.experimental && finalConfig.experimental.turbo) {
  delete finalConfig.experimental.turbo;
}

export default finalConfig;
