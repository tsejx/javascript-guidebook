# Object.defineProperty

`Object.defineProperty()` 方法用于为一个对象定义一个自有 Property 和/或修改已有 Property 的 Attributes。

## 语法

```js
Object.defineProperty(O, P, Attributes)
```

### 参数

| 参数       | 说明                           | 类型   |
| ---------- | ------------------------------ | ------ |
| O          | 定义或修改 Property 的目标对象 | object |
| P          | 需要定义的 Property 键名       | string |
| Attributes | 被定义或修改的 Attributes      | object |

### 返回值

返回变更后的对象。

## 示例

### 基本示例

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