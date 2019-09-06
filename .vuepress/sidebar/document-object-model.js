const documentObjectModel = [
  {
    title: '文档对象模型',
    link: 'dom',
    children: [
      { title: '文档对象模型', link: 'dom' },
      { title: '节点层次', link: 'hierarchy-of-nodes' },
    ],
  },
  {
    title: 'EventTarget',
    link: 'event-target',
    children: [
      { title: 'EventTarget', link: 'event-target' },
    ]
  },
  {
    title: 'Node',
    link: 'node',
    children: [
      { title: 'Node', link: 'node' },
      { title: '节点属性', link: 'node-properties' },
      { title: '节点关系', link: 'node-relationships' },
      { title: '节点操作', link: 'node-manipulation' },
    ],
  },
  {
    title: 'Document',
    link: 'document',
    children: [
      { title: 'Document', link: 'document' },
      { title: '文档属性', link: 'document-properties' },
      { title: '文档节点创建', link: 'document-node-creation' },
      { title: '文档元素访问', link: 'document-element-access' },
      { title: '文档方法', link: 'document-methods'}
    ],
  },
  {
    title: 'Element',
    link: 'element',
    children: [
      { title: 'Element', link: 'element' },
      { title: '元素遍历', link: 'element-traversal' },
      { title: '动态集合', link: 'dynamic-collection' },
      { title: 'element-matches', link: 'element-matches' },
      { title: '查询样式', link: 'accessing-element-styles' },
      { title: '操作样式', link: 'working-with-style-sheets' },
    ],
  },
  {
    title: 'DOM 事件流',
    link: 'events',
    children: [
      { title: '事件流', link: 'event-flow' },
      { title: '事件处理程序', link: 'event-handlers-or-listener' },
      { title: '事件对象', link: 'the-event-object' },
      { title: '事件委托', link: 'event-delegation' },
    ],
  },
  {
    title: '事件类型',
    link: 'events/event-types',
    children: [
      { title: '事件类型', link: 'event-types' },
      { title: '用户界面事件', link: 'ui-events' },
      { title: '鼠标与滚轮事件', link: 'the-mouse-and-dom-mouse-scroll-events' },
      { title: '键盘与文本事件', link: 'the-keyboard-and-text-events' },
    ],
  },
];

module.exports = {
  documentObjectModel,
};
