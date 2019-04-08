const html5ScriptingProgramming = [
  {
    title: '语义化',
    link: 'semantics',
    children: [
      { title: 'HTML5 表单', link: 'form-inprovements' },
      { title: 'HTML5 新语义元素', link: 'new-semantic-elements' },
    ],
  },
  {
    title: '离线与存储',
    link: 'offline-and-storage',
    children: [
      { title: 'Service Worker', link: 'service-worker' },
      { title: 'IndexedDB', link: 'indexedDB' },
      { title: '本地文件应用', link: 'local-files-application' },
    ],
  },
  {
    title: '通信',
    link: 'connectivity',
    children: [
      { title: 'PostMessage', link: 'post-message' },
      { title: 'Server-sent Events', link: 'server-sent-events' },
      { title: 'WebSocket', link: 'web-socket' },
      { title: 'WebRTC', link: 'web-real-time-communication' },
    ],
  },
  {
    title: '多媒体',
    link: 'multimedia',
    children: [{ title: '音频', link: 'audio' }, { title: '视频', link: 'video' }],
  },
  {
    title: '图形特效',
    link: 'graphics-and-effects',
    children: [{ title: 'Canvas', link: 'canvas/' }, { title: '', link: '' }],
  },
  {
    title: '性能与集成',
    link: 'performance-and-integration',
    children: [
      { title: 'WebWorkers', link: 'web-workers' },
      { title: '动画渲染', link: 'request-animation-frame' },
      { title: '拖放API', link: 'drag-and-drop-api' },
      { title: '全屏API', link: 'full-screen-api' },
    ],
  },
  {
    title: '设备访问',
    link: 'device-access',
    children: [
      { title: '地理定位', link: 'geolocation' },
      { title: '触控事件', link: 'touch-event' },
      { title: '摄录设备', link: 'camera' },
    ],
  },
  {
    title: '移动开发',
    link: 'wireless-development',
    children: [
      { title: '移动Web开发', link: 'mobile-web-development' },
      { title: '视口', link: 'viewport' },
      { title: '适配方案', link: 'adaptation' },
    ],
  }
];

module.exports = {
  html5ScriptingProgramming,
};
