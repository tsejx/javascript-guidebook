// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';
import rawCode1 from '!!dumi-raw-code-loader!/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/binary-data/blob-url/index.tsx?dumi-raw-code';
import rawCode2 from '!!dumi-raw-code-loader!/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/binary-data/blob-url/index.less?dumi-raw-code';
import rawCode3 from '!!dumi-raw-code-loader!/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/drag-and-drop-events/index.tsx?dumi-raw-code';
import rawCode4 from '!!dumi-raw-code-loader!/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/drag-and-drop-events/index.less?dumi-raw-code';
import rawCode5 from '!!dumi-raw-code-loader!/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/mouse-event/index.tsx?dumi-raw-code';
import rawCode6 from '!!dumi-raw-code-loader!/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/mouse-event/index.less?dumi-raw-code';

export default {
  'binary-data-blob-url': {
    component: (require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/binary-data/blob-url/index.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode1},"index.less":{"import":"./index.less","content":rawCode2}},"dependencies":{"react":{"version":"16.13.1"}},"title":"Blob Url","description":"<div class=\"markdown\"><p>Blob URL 可以通过 URL.createObjectURL(blob) 创建，在绝大部分场景下，我们可以像使用 HTTP 协议的 URL 一样，使用 Blob URL</p></div>","identifier":"binary-data-blob-url"},
  },
  'javascript-guidebook-drag-and-drop-events': {
    component: (require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/drag-and-drop-events/index.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode3},"index.less":{"import":"./index.less","content":rawCode4}},"dependencies":{"react":{"version":"16.13.1"}},"title":"可以吧","description":"<div class=\"markdown\"><p>不可以</p></div>","identifier":"javascript-guidebook-drag-and-drop-events"},
  },
  'javascript-guidebook-mouse-event': {
    component: (require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/example/mouse-event/index.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode5},"index.less":{"import":"./index.less","content":rawCode6}},"dependencies":{"react":{"version":"16.13.1"}},"title":"鼠标事件示例","description":"","identifier":"javascript-guidebook-mouse-event"},
  },
};
