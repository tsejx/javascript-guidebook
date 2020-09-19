---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: instanceof
order: 2
---

# instanceof

`instanceof` 运算符用于测试构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。

```js
target instanceof constructor;
```

## 检测类型

`instanceof` 可以检测某个对象是否是另一个对象的 **实例**。

```js
const Person = function() {};
const student = new Person();

console.log(student instanceof Person);
// true
```

`instanceof` 可以检测父类型。

```js
function Person() {}
function Student() {}

const p = new Person();

// 继承原型
Student.prototype = p;

const s = new Student();

console.log(s instanceof Student);
// true
console.log(s instanceof Person);
// true
```

## 代码实现

查看对象 Parent 的 `prototype` 指向的对象是否在对象 Child 的 `[[prototype]]` 链上。

如果在，则返回 `true`，如果不在则返回 `false`。

不过有一个特殊的情况，当对象 Parent 的 `prototype` 为 `null` 将会报错（类似于空指针异常）。

```js
function _instanceof(Child, Parent) {
  // 取 Parent 的显式原型
  const prototype = Parent.prototype;

  // 取 Child 的隐式原型
  Child = Child.__proto__;

  // 递归原型链
  while (true) {
    // Object.prototype.__proto__ === null
    if (Child === null) return false;

    // 这里重点：当 Child 严格等于 prototype 时，返回 true
    if (Child === prototype) return true;

    Child = Child.__proto__;
  }
}
```

---

**参考资料：**

- [📝 JS 魔法堂：再识 instanceof](https://juejin.im/entry/5804640d0bd1d0005813083e)
- [📝 instanceof 原理](https://juejin.im/post/5b7f64be51882542c83476f0)
