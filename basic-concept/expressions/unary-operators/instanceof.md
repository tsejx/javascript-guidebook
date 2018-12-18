## instanceof

`instanceof` 运算符用于测试构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。

```js
object instanceof constructor
```

### 检测类型

`instanceof` 可以检测某个对象是不是另一个对象的实例。

```js
const Person = function(){}
const student = new Person()

console.log(student instanceof Person)	// true
```

`instanceof` 可以检测父类型。

```js
function Person(){}
function Student(){}

const p = new Person()

// 继承原型
Student.prototype = p

const s = new Student()

console.log(s instanceof Student)	// true
console.log(s instanceof Person)	// true
```

### 检测实例

查看对象B的 `prototype` 指向的对象是否在对象A的 `[[prototype]]` 链上。如果在，则返回 `true`，如果不在则返回 `false`。不过有一个特殊的情况，当对象B的 `prototype` 为 `null` 将会报错（类似于空指针异常）。

函数模拟 `A instanceof B`：

```js
function _instanceof(A, B) {
    var O = B.prototype;// 取B的显示原型
    A = A.__proto__;// 取A的隐式原型
    while (true) {
        //Object.prototype.__proto__ === null
        if (A === null)
            return false;
        if (O === A)// 这里重点：当 O 严格等于 A 时，返回 true
            return true;
        A = A.__proto__;
    }
}
```

### 示例

```js
null instanceof Object
```

---

**参考资料：**

* [JS魔法堂：再识 instanceof](https://juejin.im/entry/5804640d0bd1d0005813083e)
* [instanceof 原理](https://juejin.im/post/5b7f64be51882542c83476f0)