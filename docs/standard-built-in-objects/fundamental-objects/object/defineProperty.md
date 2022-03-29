---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.defineProperty
order: 5
---

# Object.defineProperty

`Object.defineProperty()` 方法用于为一个对象定义一个自有 Property 和/或修改已有 Property 的 Attributes。

## 语法

语法：

```js
Object.defineProperty(o, p, attributes);
```

类型声明：

```ts
declare type PropertyKey = string | number | symbol;

interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}

interface ThisType<T> {}

interface ObjectConstructor {
  defineProperty<T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): T;
}
```

参数：

| 参数       | 说明                           | 类型   |
| :--------- | :----------------------------- | :----- |
| o          | 定义或修改 Property 的目标对象 | object |
| p          | 需要定义的 Property 键名       | string |
| attributes | 被定义或修改的 Attributes      | object |

返回值：

返回变更后的对象。

## 示例

```js
const foo = {};

Object.defineProperty(foo, 'a', {
    value: 100,
    writable: true,
    enumerable: true,
    configurable: true
})

console.log(foo);
// { a: 100 }

const bar;

// 添加属性和存取描述符
Object.defineProperty(foo, 'b', {
    get: function(){
        return foo
    },
    set: function(newValue){
        bar = newValue
    },
    enumerable: true,
    configurable: true,
})

foo.b = 99;

console.log(foo.b);
// 99
```

### 对象属性劫持

遍历劫持对象的所有属性

```js
const data = {
  a: 'a',
  b: 'b',
  c: 'c',
};

// 遍历对象，对其属性值进行劫持
Object.keys(data).forEach(function (key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('GET');
    },
    set: function (value) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log('SET');
    },
  });
});
```

## 参考资料

- [MDN: Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
