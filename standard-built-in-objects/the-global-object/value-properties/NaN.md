# NaN

全局属性 **`NaN`** 的值表示不是一个数字（Not-A-Number）。

| 属性特性       | 布尔值  |
| -------------- | ------- |
| `writable`     | `false` |
| `enumerable`   | `false` |
| `configurable` | `false` |

## 语法

```javascript
NaN
```

### 说明

- `NaN` 是一个全局对象的属性。
- `NaN` 属性的初始值就是 `NaN`，和 `Number.NaN` 的值一样。在现代浏览器中（ES5中）， `NaN` 属性是一个不可配置（non-configurable），不可写（non-writable）的属性。但在ES3中，这个属性的值是可以被更改的，但是也应该避免覆盖。
- 编码中很少直接使用到 `NaN`。通常都是在计算失败时，作为 `Math` 的某个方法的返回值出现的（例如：`Math.sqrt(-1)`）或者尝试将一个字符串解析成数字但失败了的时候（例如：`parseInt("blabla")`）。
- 返回 `NaN` 的情况总结
  - 无穷大除以无穷大
  - 给任意负数做开放运算
  - 算术运算符与不是数字或无法转换为数字的操作数一起使用
  - 字符串解析为数字

## 示例

### 判断值是否为 `NaN`

不可使用等号运算符来判断一个值是否为 `NaN`。必须采用 `Number.isNaN()` 或 `isNaN()` （任意字符串使用都会返回 `true`） 函数进行判断。

- 在执行自比较中，`NaN` 是唯一与自身不全等的值

```javascript
NaN === NaN;		 //	return false
Number.NaN === NaN;	 //	 return false
isNaN(NaN);			//	return true;
isNaN(Number.NaN);	//	return true;
```

```javascript
function valueIsNaN(v) { 
    return v !== v;
}
valueIsNaN(1);          // false
valueIsNaN(NaN);        // true
valueIsNaN(Number.NaN); // true
```

- 使用 `isNaN()` 前先检查一下这个值是否是数字类型，即可避免隐式类型转换的问题

```javascript
function detectIsNaN(value) {
    return typeof value === 'number' && isNaN(value)
}
```

### 返回 **`NaN`** 情况总结

```javascript
Infinity / Infinity;		// 无穷大除以无穷大
Math.sqrt(-1);				// 给任意负数做开方运算
'a' - 1;					// 算术运算符与不是数字或无法转换为数字的操作数一起使用
'a' * 1;
'a' / 1;
parseInt('a');				// 字符串解析成数字
parseFloat('a');
```

