# break 语句

**break 语句**用于在循环中精确地控制代码的执行，在执行该语句时退出循环，强制继续执行当前循环后面的语句。



## 语法

```javascript
break [label];
```

### 参数

| 参数    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| `label` | 与语句标签相关联的标识符。如果 break 语句不在一个循环或 `switch` 语句中，则该项是必须的。 |

- `break` 语句包含一个可选的标签，可允许程序摆脱一个被标记的语句。`break` 语句需要内嵌在引用的标签中。被标记的语句可以是任何块语句；不一定是循环语句。

## 示例

### 标准示例

```javascript
var num = 0;
for (var i = 1; i < 10; i++) {
    if ( i % 5 == 0){
        break;
    }
    num++;
}
console.log(num);	// 4
```

### switch 语句

```javascript
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

