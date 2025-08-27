// @ts-nocheck
import { Plugin } from '/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/@umijs/runtime';

const plugin = new Plugin({
  validKeys: ['patchRoutes','rootContainer','render','onRouteChange','ssr',],
});
plugin.register({
  apply: require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/app.ts'),
  path: '/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/app.ts',
});

export { plugin };
