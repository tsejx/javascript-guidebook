# JSON 

**JSON（JavaScript Object Notation）**是一种轻量级的数据交格式。它是基于ECMAScript的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得JSON成为理想的数据交换语言。易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。

## 语法

JSON的语法可以表示以下三种类型的值

 - 简单值：使用与JavaScript相同的语法，可以在JSON中表示字符串、数值、布尔值和null。**但JSON不支持JavaScript中的特殊值`undefined`**
 - 对象：每个键值对对中的值可以是简单值，也可以是复杂数据类型。
 - 数组：数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值。数组的值也可以是任意类型——简单值，对象或数组。

### 对象

**JSON字面量**

```javascript
let person = {
    "name": "xianyu",
    "age": 24,
    "love": 'Online Game'
}
```

从上我们可以看出这就是用字面量表示的一个对象，而这个格式就是JSON格式的，因为本身JSON就是JavaScript语法集的一种，所以JSON字面量就是用JSON格式的JavaScript对象字面量。

JSON 放到JavaScript中执行是合法代码，是JavaScript对象字面量，但是JavaScript对象字面量不一定是JSON。

```javascript
let person = {
    "name": "xianyu",
    "age": 24,
    "love": "Online Game"
}

// 和

let person = {
    name: 'xiangyu',
    age: 24,
    love: 'Online Game',
    skill: function (){
        alert('basketball')
    }
}
```

**与JavaScript对象的差异**

```javascript
// JavaScript
let person = {
    "name": "Nicholas",
    "age": 29
}

// JSON
{
    "name": "Nicholas",
    "age": 29
}
```

 - JSON中没有变量的概念（不用声明变量）
 - JSON没有末尾的的分号（因为不是JavaScript语句，所以不需要分号）
 - JSON对象的属性必须加双引号
 
JSON属性的值可以是简单值，也可以是复杂类型值，因此可以像下面这样在对象中嵌入对象：

```javascript
{
    "name": "Nicolas",
    "age": 29,
    "school": {
        "name": "Merrimack College",
        "location": "North Andover, MA"
    }
}
```

[注意] 同一对象中绝对不应该出现两个同名属性。


### 数组

JSON数组采用的就是JavaScript中的数组字面量形式。例如，下面是JavaScript中的数组字面量：

```javascript
let values = [25, "hi", true];
```

JSON数组也没有变量和分号。把数组和对象结合起来，可以构成更复杂的数据集合。

```javascript
[
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        edition: 3,
        year: 2011
    },
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        edition: 3,
        year: 2009
    },
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        edition: 3,
        year: 2008
    }
]
```

## 解析与序列化


### 序列化选项

> `JSON.stringify(value[, replacer [, space]])`

**参数**

- **`value`**

将要序列化成 一个JSON 字符串的值。

- **`replacer`**（可选）

如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为null或者未提供，则对象所有的属性都会被序列化；关于该参数更详细的解释和示例，请参考使用原生的 JSON 对象一文。

- **`space`**（可选）

指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；如果该参数没有提供（或者为null）将没有空格。

**返回值**

一个表示给定值的JSON字符串

**描述**

- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- `undefined`、任意的函数以及 `Symbol`值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成`null`（出现在数组中时）。
- 所有以 `Symbol` 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
- 不可枚举的属性会被忽略。

```javascript
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'

JSON.stringify({x: 5, y: 6});              
// "{"x":5,"y":6}"

JSON.stringify([new Number(1), new String("false"), new Boolean(false)]); 
// '[1,"false",false]'

JSON.stringify({x: undefined, y: Object, z: Symbol("")}); 
// '{}'

JSON.stringify([undefined, Object, Symbol("")]);          
// '[null,null,null]' 

JSON.stringify({[Symbol("foo")]: "foo"});                 
// '{}'

JSON.stringify({[Symbol.for("foo")]: "foo"}, [Symbol.for("foo")]);
// '{}'

JSON.stringify(
    {[Symbol.for("foo")]: "foo"}, 
    function (k, v) {
        if (typeof k === "symbol"){
            return "a symbol";
        }
    }
);


// undefined 

// 不可枚举的属性默认会被忽略：
JSON.stringify( 
    Object.create(
        null, 
        { 
            x: { value: 'x', enumerable: false }, 
            y: { value: 'y', enumerable: true } 
        }
    )
);

// "{"y":"y"}"

```

**参数`replacer`替换（过滤）函数**

replacer参数可以是一个函数或者一个数组。作为函数，它有两个参数，键(key)值(value)都会被序列化。

 - 如果返回一个`Number`，转换成相应的字符串被添加入JSON字符串。
 - 如果返回一个`String`，该字符串作为属性值被添加入JSON。
 - 如果返回一个`Boolean`，`true`或者`false`被作为属性值被添加入JSON字符串。
 - 如果返回任何其他对象，该对象递归地序列化成JSON字符串，对每个属性调用 `replacer` 方法。除非该对象是一个函数，这种情况将不会被序列化成JSON字符串。
 - 如果返回 `undefined`，该属性值不会在JSON字符串中输出。

注意：不能用 `replacer` 方法，从数组中移除值（`values`）如若返回 `undefined` 或者一个函数，将会被 `null` 取代。

**例子(functon)**

```javascript
function replacer(key, value) {
    if (typeof value === 'string') {
        return undefined;
    }
    return value;
}

var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString = JSON.stringify(foo, replacer);
// {"week":45,"month":7}
```

**例子(array)**

如果replacer是一个数组，数组的值代表将被序列化成JSON字符串的属性名。

```javascript
JSON.stringify(foo, ['week', 'month']);
// '{"week": 45,"month":7}', 只保留“week”和“month”属性值
```

**`space`参数**

`space`参数用来控制结果字符串里面的间距。如果一个数字，则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；如果是一个字符串，则每一级别会比上一级别多缩进用该字符串（或该字符串的前十个字符）。

```javascript
JSON.stringify({a: 2}, null, " "); // '{\n "a": 2\n}'
```

使用制表符(`\t`)来缩进：

```javascript
JSON.stringify({uno: 1, dos: 2}, null, '\t')
//'{            \
//    "uno": 1, \
//    "dos": 2  \
//}'
```

**toJSON方法**

如果一个被序列化的对象拥有 `toJSON` 方法，那么该 `toJSON` 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 `toJSON` 方法后的返回值会被序列化，例如：

```javascript
var obj = {
    foo: 'foo',
    toJSON: function (){
        return 'bar';
    }
};

JSON.stringify(obj); // '"bar"'
JSON.stringify({x: obj}); // '{"x": "bar"}'
```
 
### 解析选项

> `JSON.parse(text [, reviver])`

**参数**

- **`text`**

要被解析成 JavaScript 值的字符串

- **`reviver`**（可选）

如果是一个函数，则规定了原始值如何被解析改造，在被返回之前

**返回值**

`Object` 对应给定的JSON文本

**使用`JSON.parse()`**

```javascript
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
JSON.parse('1');               //  1
```

**参数`reviver`还原函数**

如果指定了 `reviver` 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回（返回值）。更具体点讲就是：解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 `reviver` 函数，在调用过程中，当前属性所属的对象会作为 `this` 值，当前属性名和属性值会分别作为第一个和第二个参数传入 `reviver` 中。如果 `reviver` 返回 `undefined`，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值。

当遍历到最顶层的值（解析值）时，传入 `reviver` 函数的参数会是空字符串 ""（因为此时已经没有真正的属性）和当前的解析值（有可能已经被修改过了），当前的 `this` 值会是 {"": 修改过的解析值}，在编写 `reviver` 函数时，要注意到这个特例。（这个函数的遍历顺序依照：从最内层开始，按照层级顺序，依次向外遍历）

```javascript
JSON.parse('{"p": 5}', function (k, v) {
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
});                            // { p: 10 }

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});

// 1
// 2
// 4
// 6
// 5
// 3 
// ""
```



