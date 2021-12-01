---
nav:
  title: BOM
  order: 5
group:
  title: 监视 API
  order: 16
title: MutationObserver API
order: 2
---

# MutationObserver API

MutationObservr API 用于监视 DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。

DOM 发生变动都会触发 Mutation Observer 事件。但是，它跟事件还是有不同点：事件是同步触发的，DOM 变化立即触发相应的事件；Mutation Observer 是一部触发，DOM 变化不会马上触发，而是等当前所有 DOM 操作都结束后才触发。

总的来说，特点如下：

- 它等待所有脚本任务完成后，才会运行（即一步触发方式）
- 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动
- 它既可以观察 DOM 的所有类型变动，也可以指定只观察某类变动

## 接口定义

```ts
declare var MutationObserver: {
  new(callback: Mutationcallback): MutationObserver;

  prototype: MutationObserver;
}

interface MutationObserver {
  constructor(MutationCallback callback);

  /**
   * @param target 被观察的 DOM 节点
   * @param options 配置对象（指定所要观察特征）
   */
  observer(target: Node, options?: MutationObserverInit): void;

  disconnect(): void;

  takeRecords(): MutationRecord[];
}

interface MutationObserverInit {
  /* 观察特定属性 */
  attributeFilter?: string[];
  /* 观察 attributes 变动时，是否需要记录变动前的属性值 */
  attributeOldValue?: boolean;
  /* 属性的变动*/
  attributes?: boolean;
  /* 节点内容或节点文本的变动*/
  characterData?: boolean;
  /* 观察 characterData 变动，是否需要记录变动前的值 */
  characterDataOldValue?: boolean;
  /* 子节点的变动（新增、删除或者更改） */
  childList?: boolean;
  /* 是否将观察器应用于该节点的所有后代节点 */
  subtree?: boolean;
}

interface MutationRecord {

}
```

## 应用实战

### 基本用法

```js
// 获取需要观察变动的元素节点
const targetElement = document.getElementById('observer');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const onMutationObserverChange = function(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed');
    } else if (mutation.type === 'attributes') {
      console.log(mutation.attributeName);
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(onMutationObserverChange);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 停止观察
observer.disconnect();
```

## 参考资料

- [📖 W3C Mutation Events API Standard](https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-eventgroupings-mutationevents)
- [📖 DOM Living Standard: Mutation observers](https://dom.spec.whatwg.org/#mutation-observers)
- [📖 TypeScript: Interface MutationObserver](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.mutationobserver.html)
- [📝 Detect DOM changes with Mutation Observers](https://developers.google.com/web/updates/2012/02/Detect-DOM-changes-with-Mutation-Observers)
- [📝 如何优雅监听容器高度变化](https://segmentfault.com/a/1190000019877595)
