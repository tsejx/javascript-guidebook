# instanceof

`instanceof` 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。

## 语法

```javascript
object instanceof constructor
```

### 参数

 - `object`
     - 要检测的对象
 - `constructor`
     - 构造函数


## 示例

### 标准示例

`instanceof` 运算符用来检测 `constructor.prototype` 是否存在于参数 `object` 的原型链上。

```javascript
function Car(){}
function Transportation(){}

var benz = new Men()

benz instanceof Car;     // return true,因为Object.getPrototypeOf(benz) === Car.prototype
benz instanceof Transportation;    // return false,Transportation.prototype不在benz的原型链上

benz instancof Object;   // return true,因为 Object.prototype.isPrototypeOf(benz)返回true
Car.prototype instanceof Object;    // return true

Car.prototype = {};
var benz2 = new Car();

benz2 instanceof Car;    // return true
benz instanceof Car;     // return false,Car.prototype指向了一个空对象，这个空对象不在benz的原型链上

Transportation.prototype = new Car();     // 继承
var benz3 = new Transportation();
benz3 instanceof Transportation;           // return true
benz3 instanceof Car;            // return true
```
