# Function.prototype.call

`Function.prototype.call` 方法用于指定函数调用指向的 `this` 指针，并分别提供参数作为指定函数的参数。

## 语法

```js
Function.prototype.apply(thisArg, ...args)
```

| 参数    | 说明                                     | 类型 |
| ------- | ---------------------------------------- | ---- |
| thisArg | 可选参数。调用函数时指向的 `this` 指针。 |     |
| args    | 可选参数。调用函数参数列表。             |     |

## 示例

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```