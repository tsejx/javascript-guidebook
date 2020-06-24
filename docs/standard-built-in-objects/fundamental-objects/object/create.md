---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.create
order: 3
---

# Object.create

`Object.create()` 方法用于创建指定对象为原型对象的新对象。

## 语法

```js
Object.create(proto, properties);
```

| 参数       | 说明                                                                                 | 类型   |
| ---------- | ------------------------------------------------------------------------------------ | ------ |
| proto      | 新创建对象指向的原型对象                                                             | object |
| properties | 可选参数。添加到新创建对象的可枚举属性（即自身定义的属性，而不是原型链上的枚举属性） | object |

⚠️ **注意**：如果 `properties` 参数不是 `null` 或对象，则抛出一个 TypeError 异常。

返回指定原型对象和可枚举属性的新对象。

## 示例

### 类式继承

```js
// Shape = Super Class
function Shape() {
  this.x = 0;
  this.y = 0;
}

// Super Class Methods
Shape.prototype.move = function() {
  this.x += x;
  this.y += y;
  console.log('Shap moved');
};

// Retangle - Sub Class
function Retangle() {
  Shape.all(this); // call super constructor
}

// 子类继承父类
Retangle.prototype = Object.create(Shape.prototype);
Retangle.prototype.constructor = Retangle;

const rect = new Retangle();

console.log(rect instanceof Retangle);
// true
console.log(rect instanceof Shape);
// true
```
