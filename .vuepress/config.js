const mainPage = require('./sidebar/main-page').mainPage;
const basicConcept = require('./sidebar/basic-concept').basicConcept;
const standardBuiltInObject = require('./sidebar/standard-built-in-objects').standardBuiltInObject;
const coreModules = require('./sidebar/core-modules').coreModules;
const objectOrientedProgamming = require('./sidebar/object-oriented-programming')
  .objectOrientedProgamming;
const browserObjectModel = require('./sidebar/browser-object-model').browserObjectModel;
const documentObjectModel = require('./sidebar/document-object-model').documentObjectModel;
const html5ScriptingProgramming = require('./sidebar/html5-scripting-programming').html5ScriptingProgramming;
const computerNetworks = require('./sidebar/computer-networks').computerNetworks;
const transform = require('./utils/transform');

const main = transform(mainPage);
const name = 'javascript-guidebook';

module.exports = {
  base: `/${name}/`,
  head: [['link', { rel: 'icon', href: 'favicon.ico' }]],
  title: 'JavaScript-Guidebook',
  serviceWorker: true,

  themeConfig: {
    repo: 'tsejx/JavaScript-Guidebook',
    logo: '/favicon.png',
    search: true,
    searchMaxSuggestions: 15,
    nav: [
      { text: '主页', link: '/' },
      {
        text: '目录',
        items: [
          { text: '基本语法', link: '/basic-concept/' },
          { text: '标准内置对象', link: '/standard-built-in-objects/' },
          { text: '核心模块', link: '/core-modules/' },
          { text: '面向对象编程', link: '/object-oriented-programming/' },
          { text: '浏览器对象模型', link: '/browser-object-model/' },
          { text: '文档对象模型', link: '/document-object-model/' },
          { text: 'HTML5脚本编程', link: '/html5-scripting-programming/' },
          { text: '计算机网络', link: '/computer-networks/' },
        ],
      },

      { text: 'Wiki', link: 'https://github.com/tsejx/JavaScript-Guidebook/wiki' },
    ],
    sidebarDepth: 0,
    sidebar: {
      '/computer-networks/': main.concat(transform(computerNetworks)),
      '/html5-scripting-programming/': main.concat(transform(html5ScriptingProgramming)),
      '/document-object-model/': main.concat(transform(documentObjectModel)),
      '/browser-object-model/': main.concat(transform(browserObjectModel)),
      '/object-oriented-programming/': main.concat(transform(objectOrientedProgamming)),
      '/core-modules/': main.concat(transform(coreModules)),
      '/standard-built-in-objects/': main.concat(transform(standardBuiltInObject)),
      '/basic-concept/': main.concat(transform(basicConcept)),
      '/': [
        {
          title: '项目目录',
          collapsable: false,
          children: [
            ['/', '主页'],
            '/basic-concept/',
            '/standard-built-in-objects/',
            '/core-modules/',
            '/object-oriented-programming/',
            '/browser-object-model/',
            '/document-object-model/',
            '/html5-scripting-programming/',
            '/computer-networks/',
          ],
        },
      ],
    },
    lastUpdated: '最近更新时间',
  },

  vueThemes: {
    links: {
      github: 'https://github.com/tsejx/JavaScript-Guidebook',
    },
  },
};
