/** @type {import('next').NextConfig} */
//
// Issue #73: in production "static-export" mode (set RAPIER_BUILD_TARGET=static
// before `next build`) we emit a fully static site for GitHub Pages. Dev mode
// and the preview machine keep the regular SSR behaviour so rewrites still work.
const isStaticExport = process.env.RAPIER_BUILD_TARGET === 'static';
const basePath = process.env.RAPIER_BASE_PATH || '';

const nextConfig = {
  // Next.js 16 uses Turbopack by default — empty config silences warnings
  // if AI-generated code accidentally adds a webpack config.
  turbopack: {},
  allowedDevOrigins: ['rapier-preview.fly.dev'],
  ...(isStaticExport
    ? {
        output: 'export',
        images: { unoptimized: true },
        trailingSlash: true,
        basePath,
      }
    : {
        async rewrites() {
          return [
            {
              source: '/picsum/:path*',
              destination: '/api/picsum/:path*',
            },
          ];
        },
      }),
};

export default nextConfig;
