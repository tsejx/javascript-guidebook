const config = {
  mode: 'site',
  title: 'JavaScript Guidebook',
  description: 'JavaScript 完全知识体系',
  base: '/javascript-guidebook/',
  publicPath: '/javascript-guidebook/',
  favicon: './favicon.ico',
  logo: 'http://img.mrsingsing.com/javascript-guidebook-favicon.png',
  exportStatic: {},
  dynamicImport: {},
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/tsejx/javascript-guidebook',
    },
  ],
};

if (process.env.NODE_ENV !== 'development') {
  config.ssr = {};
}

export default config;
