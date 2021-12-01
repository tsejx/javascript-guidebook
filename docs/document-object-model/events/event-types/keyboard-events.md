---
nav:
  title: DOM
  order: 6
group:
  title: 事件类型
  order: 21
title: 键盘事件
order: 14
---

# 键盘事件

用户在使用键盘时会触发键盘事件。

键盘事件：

- `keydown`：当用户按下键盘上的任意时触发，而且如果按住不放的话，会重复触发此事件
- `keypress`：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件
- `keyup`：当用户释放键盘上的键时触发

文本事件：

- `textInput`：在文本插入文本框之前会触发 `textInput` 事件

程序：

当用户按下一个键盘上的字符键：`keydown` -> `keypress` -> `keyup`

当用户按下一个键盘上的非字符键：`keydown` -> `keyup`

## 键码

在发生 `keydown` 和 `keyup` 事件时，`event` 对象的 `keycode` 属性中会包含一个代码，与键盘上一个特定的键对应。对数字字母字符键，`keycode` 属性的值与 ASCII 码对应小写字母或数字的编码相同。

| 键                       | 键码 | 键                      | 键码 |
| ------------------------ | ---- | ----------------------- | ---- |
| 退格（Backspace）        | 8    | 数字小键盘 9            | 105  |
| 制表（Tab）              | 9    | 数字小键盘+             | 107  |
| 回车（Enter）            | 13   | 数字小键盘及大键盘上的- | 109  |
| 上档（Shift）            | 16   | 数字小键盘.             | 110  |
| 控制（Ctrl）             | 17   | 数字小键盘/             | 111  |
| Alt                      | 18   | F1                      | 112  |
| 暂停/中断（Pause/Break） | 19   | F2                      | 113  |
| 大写（Caps Lock）        | 20   | F3                      | 114  |
| 退出（Esc）              | 27   | F4                      | 115  |
| 上翻页（Page Up）        | 33   | F5                      | 116  |
| 下翻页（Page Down）      | 34   | F6                      | 117  |
| 结尾（End）              | 35   | F7                      | 118  |
| 开头（Home）             | 36   | F8                      | 119  |
| 左箭头（Left Arrow）     | 37   | F9                      | 120  |
| 上箭头（Up Arrow）       | 38   | F10                     | 121  |
| 右箭头（Right Arrow）    | 39   | F11                     | 122  |
| 下箭头（Down Arrow）     | 40   | F12                     | 123  |
| 插入（Ins）              | 45   | 数字锁                  | 144  |
| 删除（Del）              | 46   | 滚动锁                  | 145  |
| 左 Windows 键            | 91   | 分号（E/Safari/Chrome） | 186  |
| 右 Windows 键            | 91   | 分号（Opera/Firefox）   | 59   |
| 上下文菜单键             | 93   | 小于                    | 188  |
| 数字小键盘 0             | 96   | 大于                    | 190  |
| 数字小键盘 1             | 97   | 正斜杠                  | 191  |
| 数字小键盘 2             | 98   | 沉音符                  | 192  |
| 数字小键盘 3             | 99   | 等于                    | 61   |
| 数字小键盘 4             | 100  | 左方括号                | 219  |
| 数字小键盘 5             | 101  | 反斜杠                  | 220  |
| 数字小键盘 6             | 102  | 右方括号                | 221  |
| 数字小键盘 7             | 103  | 单引号                  | 222  |
| 数字小键盘 8             | 104  |                         |      |

## 字符编码

`charCode` 这个属性只有在发生 `keypress` 事件才包含值，而且这个值是按下的那个键所代表字符的 ASCⅡ 编码，此时的 `keyCode` 通常等于 0 或者也可能等于所按键的键码。

```js
const EventUtil = {
  // 省略的代码
  getCharCode: function(event) {
    if (typeof event.charCode == 'number') {
      return event.charCode;
    } else {
      return event.keyCode;
    }
  },
};
```

这个方法首先检测 `charCode` 属性是否包含数值（在不支持这个属性的浏览器中，值为 `undefined`），如果是，则返回改值。否则，就返回 `keyCode` 属性值。

## textInput 事件

当用户在可编辑区域中输入字符时，就会触发这个事件。这个用于替代 `keypress` 的 `textInput` 事件的行为稍有不同。区别之一就是任何可以获得焦点的元素都可以触发 `keypress` 事件，但只有可编辑区域才能触发 `textInput` 事件。区别之二是 `textInput` 事件只会在用户按下能够输入实际字符的键时才会被触发，而 `keypress` 事件则在按下那些能够影响文本显示的键时也会触发（例如退格键）。

由于 `textInput` 事件主要考虑的是字符，因此它的 `event` 对象中还包含一个 `deta` 属性，这个属性的值就是用户输入的字符（而非字符编码）。换句话说，用户在没有按上档键的情况下按下了 S 键，`data` 的值就是 `"s"`，而如果在按住上档键时按下该键，`data` 的值就是 `"S"`。

## 设备中的键盘事件

任天堂 Wii 会在用户按下 Wii 遥控器上的按键时触发键盘事件。尽管没有办法访问 Wii 遥控器中的所有按键，但还是有一些键可以触发键盘事件。

当用户按下十字键盘（键码为 175 ～ 178）、减号（170）、加号（174）、1（172）或 2（173）键时就会触发键盘事件。但没有办法得知用户是否按下了电源开关、A、B 或主页键。

iOS 版 Safari 和 Android 版 Webkit 在使用屏幕键盘时会触发键盘事件。

删除

Backspace 和 Delete

```js
const keycode = e.keycode;

if (keycode === 46 || keycode === 8) {
}
```

兼容 ctrl 和 command

```js
if (!e.altKey && !e.shiftKey && e.keyCode === 75 && (e.metaKey || e.ctrlKey)) {
  console.log('ctrl+k 或者 command+k ');
}
```
