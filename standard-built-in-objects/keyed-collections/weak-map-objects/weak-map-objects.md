## WeakMap

WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

### 语法

```js
new WeakMap([iterable])
```

参数 `iterable` 是一个数组或者其他可迭代的且元素是键值对的对象。每个键值对会被加到新的 WeakMap 里。`null` 会被当做 `undefiend`。

### 特征

#### 只接受对象作为键名

```js
const map = new WeakMap()

map.set(1, 2)
// TypeError: Invalid value used as weak map key

map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

#### 键名所引用的对象是弱引用

> WeakMaps hold "weak" references to key objects

翻译过来应该是 **WeakMap 保持了对键名所引用的对象的弱引用**。

这个弱引用的特性，就是 WeakMap 保持了对键名所引用的对象的弱引用，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

也正是因为这样的特性，WeakMap 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakMap 不可遍历。

所以 WeakMap 不像 Map，一是没有遍历操作（即没有 `keys()`、`values()` 和 `entries()` 方法），也没有 `size` 属性，也不支持 `clear` 方法，所以 WeakMap 只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

特征详细分析请点击 [ES6 系列之 WeakMap](https://juejin.im/post/5b594512f265da0f6263840f)

### 实例方法

| 方法                            | 说明                                |
| ------------------------------- | ----------------------------------- |
| `WeakMap.prototype.delete(key)` | 移除 `key` 的关联对象               |
| `WeakMap.prototype.get(key)`    | 返回 `key` 的关联对象或 `undefined` |
| `WeakMap.prototype.has(key)`    | 判定是否有指定 `key` 关联对象爱哪个 |
| `WeakMap.prototype.set(key)`    | 设置一组 `key` 关联对象             |

### 示例

```js
const x = new WeakMap()
const y = new WeakMap()

const a = {}
const b = function(){}
const c = window

x.set(a, 100)
x.set(b, 'BINGO!')

y.set(a, b)
y.set(c, undefined)
y.set(x , y)

x.get(b)		// Output: 'BINGO!'

y.get(b)		// Output: undefined
y.get(c)		// Output: undefined

x.has(b)		// Output: true

y.has(b)		// Output: false
y.has(c)		// Output: true

// delete()
x.has(a)		// Output: true
x.delete(a)
x.has(a)		// Output: false
```

---

参考资料：

* [ES6 系列之 WeakMap](https://juejin.im/post/5b594512f265da0f6263840f)