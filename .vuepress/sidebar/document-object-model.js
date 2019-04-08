const documentObjectModel = [
  {
    title: '文档对象模型',
    link: '',
    children: [{ title: 'DOM', link: 'dom' }, { title: 'DOM API', link: 'dom-api' }],
  },
  {
    title: '节点层次',
    link: 'hierarchy-of-nodes',
    children: [
      { title: '节点层次', link: 'hierarchy-of-nodes' },
      { title: 'Node 类型', link: 'the-node-type' },
      { title: 'Document 类型', link: 'the-document-type' },
      { title: 'Element 类型', link: 'the-element-type' },
    ],
  },
  {
    title: '节点访问',
    link: 'nodes-access',
    children: [
      { title: '节点访问', link: 'nodes-access' },
      { title: '节点关系', link: 'nodes-relationships' },
      { title: '元素遍历', link: 'element-traversal' },
      { title: '动态集合', link: 'dynamic-collection' },
    ],
  },
  {
    title: '节点操作',
    link: 'manipulating-nodes',
    children: [
      { title: '节点创建', link: 'nodes-create' },
      { title: '节点操作', link: 'manipulating-nodes/' },
    ],
  },
  {
    title: '脚本化CSS',
    link: 'scripting-css',
    children: [
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
    documentObjectModel
}