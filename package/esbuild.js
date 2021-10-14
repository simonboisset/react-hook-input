const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'node',
  })
  .catch(() => process.exit(1));
