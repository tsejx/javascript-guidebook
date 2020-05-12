---
nav:
  title: 基本语法
  order: 1
group:
  title: 一元运算符
  order: 6
title: instanceof
order: 2
---

# instanceof

`instanceof` 运算符用于测试构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。

```js
obj instanceof constructor;
```

## 检测类型

`instanceof` 可以检测某个对象是否是另一个对象的**实例**。

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

## 检测实例

查看对象 Bar 的 `prototype` 指向的对象是否在对象 Foo 的 `[[prototype]]` 链上。如果在，则返回 `true`，如果不在则返回 `false`。不过有一个特殊的情况，当对象 Bar 的 `prototype` 为 `null` 将会报错（类似于空指针异常）。

函数模拟 `Foo instanceof Bar`：

```js
function _instanceof(Foo, Bar) {
  // 取 Bar 的显式原型
  var O = Bar.prototype;
  // 取 Foo 的隐式原型
  Foo = Foo.__proto__;
  while (true) {
    // Object.prototype.__proto__ === null
    if (Foo === null) return false;
    // 这里重点：当 O 严格等于 Foo 时，返回 true
    if (O === Foo) return true;
    Foo = Foo.__proto__;
  }
}
```

## 示例

```js
null instanceof Object;
// invalid
```

---

**参考资料：**

- [📝 JS 魔法堂：再识 instanceof](https://juejin.im/entry/5804640d0bd1d0005813083e)
- [📝 instanceof 原理](https://juejin.im/post/5b7f64be51882542c83476f0)
