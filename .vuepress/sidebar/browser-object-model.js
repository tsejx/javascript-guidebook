const browserObjectModel = [
    {
        title: 'Window 对象',
        link: 'the-window-object/the-window-object'
    },
    {
        title: '定时器',
        link: 'the-window-object/timers',
        children: [
            { title: 'setInterval', link: 'setInterval' },
            { title: 'setTimeout', link: 'setTimeOut' }
        ]
    }, {
        title: '系统对话框',
        link: 'the-window-object/system-dialogs',
        children: [
            { title: 'alert', link: 'alert' },
            { title: 'confirm', link: 'confirm' },
            { title: 'prompt', link: 'prompt' },
        ]
    }, {
        title: '视窗尺寸位置',
        link: 'the-window-object/window-position',
        children: [
            { title: 'Window视图属性', link: 'window-view-properties' },
            { title: 'Screen视图属性', link: 'screen-view-properties' },
            { title: '文档视图和元素视图', link: 'document-view-and-element-view' },
            { title: '元素视图属性', link: 'element-view-properties' },
            { title: '鼠标位置', link: 'mouse-position' },
        ]
    }, {
        title: 'Location 对象',
        link: 'the-location-object',
        children: [
            { title: '属性', link: 'the-location-object-properties' },
            { title: '方法', link: 'the-location-object-methods' },
        ]
    }, {
        title: 'History 对象',
        link: 'the-history-object',
        children: [
            { title: '属性', link: 'the-history-object-properties' },
            { title: '方法', link: 'the-history-object-methods' },
        ]
    }, {
        title: 'Screen 对象',
        link: 'the-screen-object',
        children: [
            { title: '属性', link: 'the-screen-object-properties' },
            { title: '方法', link: 'the-screen-object-methods' },
        ]
    }, {
         title: 'Navigator 对象',
         link: 'the-navigator-object',
         children: [
            { title: '属性', link: 'the-navigator-object-properties' },
            { title: '方法', link: 'the-navigator-object-methods' },
         ]
    }, {
        title: '其他 WebAPI',
        link: 'the-other-web-api',
        children: [
            { title: 'File对象', link: 'the-file-object' },
            { title: 'FileList对象', link: 'the-file-list-object' },
            { title: 'FileReader对象', link: 'the-file-reader-object' },
            { title: 'FileReaderSync对象', link: 'the-file-reader-sync-object' },
            { title: 'FormData对象', link: 'the-form-data-object' },
            { title: 'ProgressEvent对象', link: 'the-progress-event-object' },
            { title: 'Blob对象', link: 'the-blob-object' },
            { title: 'URL对象', link: 'the-url-object' },
            { title: 'Position对象', link: 'the-position-object' },
            { title: 'XMLHttpRequest对象', link: 'the-xmlhttprequest-object' },
            { title: 'FetchAPI', link: 'the-fetch-api' },
            { title: 'EventSource对象', link: 'the-event-source-object' },
        ]
    }, {
        title: '浏览器缓存',
        link: 'browser-cache',
        children: [
            { title: '浏览器缓存机制', link: 'web-cache' },
            { title: 'HTTP缓存', link: 'http-cache' },
            { title: 'Cookie', link: 'cookie' },
            { title: 'WebStorage', link: 'web-storage' },
        ]
    }, {
        title: '客户端检测',
        link: 'client-detection',
        children: [
            { title: '客户端检测', link: 'client-detection' }
        ]
    }, {
        title: '浏览器工作原理',
        link: 'browser-working-principle',
        children: [
            { title: '整体工作流程', link: 'overall-workflow' },
            { title: '渲染引擎', link: 'the-rendering-engine' },
            { title: '解析过程', link: 'parsing' },
            { title: '渲染树构建', link: 'render-tree-construction' },
            { title: '布局', link: 'layout' },
            { title: '绘制', link: 'painting' },
            { title: '回流和重绘', link: 'reflow-and-repaint' },
            { title: '动态变化和渲染引擎的线', link: 'dynamic-changes-and-rendering-engine-threads' },
            { title: 'CSS2可视模型', link: 'css2-visual-module' },
            { title: '渲染层合并', link: 'composite' },
        ]
    }
]

module.exports = {
    browserObjectModel
}