---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: break 语句
order: 5
---

# break 语句

**break 语句**用于立即退出最内层的循环或 `switch` 语句。

## 语法

```js
break [labelname];
```

### 参数

| 参数        | 描述                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------- |
| `labelname` | 与语句标签相关联的标识符。如果 `break` 语句不在一个循环或 `switch` 语句中，则该项是必须的。 |

- `break` 语句包含一个可选的标签，可允许程序摆脱一个被标记的语句。`break` 语句需要内嵌在引用的标签中。被标记的语句可以是任何块语句；不一定是循环语句。
- 当 `break` 语句和标签一块使用时，程序将跳转到这个标签所标识的语句块结束，或者直接终止这个闭合语句的执行。

## 示例

### 代码示例

```js
var num = 0;
for (var i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  num++;
}
console.log(num); // 4
```

### switch 语句

```js
var str = 'string', variable;

swtich (str) {
    case 'number':
    	variable = 'number';
    	break;
    case 'string':
    	variable = 'string';
    	break;
    case 'boolean':
    	variable ='boolean'
}
```
