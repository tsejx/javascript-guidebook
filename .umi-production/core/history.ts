// @ts-nocheck
import { createBrowserHistory } from '/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/@umijs/runtime';

let options = {
  "basename": "/javascript-guidebook/"
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: any = process.env.__IS_SERVER ? null : createBrowserHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createBrowserHistory(options);
  }

  return history;
};

// 通常仅微前端场景需要调用这个 API
export const setCreateHistoryOptions = (newOpts: any = {}) => {
  options = { ...options, ...newOpts };
};

export { history };
