## 函数防抖

函数防抖：在频繁触发的情况下，只有足够的空闲时间，才执行代码一次，如果没有执行完就清除掉，重新执行逻辑

生活中的实例：如果有人进电梯（触发事件），那电梯将在10秒钟后出发（执行事件监听器），这时如果又有人进电梯了（在10秒内再次触发该事件），我们又得等10秒再出发（重新计时）。

函数防抖规定函数再次执行需要满足两个条件：

1. 必须要等待一段时间
2. 在条件1等待的时间内不再被触发，一旦在条件1等待的时间内再次被触发，等待时间就要重新开始计算

### 函数防抖的应用场景

函数防抖应用场景：连续事件的响应只需执行一次回调

- 每次 resize/scroll 触发统计事件
- 判断 `scroll` 是否滑到底部，`滚动事件` + `函数防抖`
- 对于文本输入框连续输入进行服务端验证时，用函数防抖能有效减少请求次数
- 给提交按钮添加函数防抖防止表单多次提交

> 总的来说，适合多次事件一次响应的情况

### 函数防抖的实现和实践

当事件触发之后，必须等待某一个时间（N）之后，回调函数才会执行，假若再等待的时间内，事件又触发了则重新再等待时间 N，知道事件 N 内事件不被触发，那么最后一次触发过了事件 N 后，执行函数。

函数防抖简单实现：

```js
/**
* 防抖函数
* @param func {Function}	实际要执行的函数
* @param delay {Number}		延迟时间，单位是毫秒（ms）
* @return {Function}
*/

function debounce(fn, delay = 1000) {
    let timer;
    
    // 返回一个函数，这个函数会在一个时间区间结束后的delay毫秒执行func函数
    return function (){
        // 保存函数调用时的上下文和参数，传递给func
        const context = this;
        const args = arguments;
        
        // 函数被调用，清除定时器
        clearTimout(timer)
        
        // 当返回的函数被最后一个调用后（也就是用户停止了某个连续的操作）
        // 再过delay毫秒就执行func
        timer = setTimeout(function(){
            fn.apply(context, args);
        }, delay)
    }
}
```

### 函数防抖的应用

注册实时验证

这里以用户注册时验证用户名是否被占用为例，如今很多网站为了提高用户体验，不会再输入框失去焦点的时候再去判断用户名是否被占用，而是在输入的时候就在判断这个用户名是否已被注册：

```js
$('input.user-name').on('input', function(){
    $.ajax({
        url: `https://just.com/check`,
        method: 'post',
        data: {
            username: $(this).val(),
        },
        success(data) {
            if (data.isRegistered) {
                $('.tips').text('该用户名已被注册！')
            } else {
                $('.tips').text('恭喜！该用户名还未被注册！');
            }
        },
        error(error) {
            console.log(error);
        }
    })
})
```

很明显，这样的做法不好的是当用户输入第一个字符的时候，就开始请求判断了，不仅对服务器的压力增大了，对用户体验也未必比原来的好。而理想的做法应该是这样的，当用户输入第一个字符后的一段时间内如果还有字符输入的话，那就暂时不去请求判断用户名是否被占用。在这里引入函数防抖就能很好地解决这个问题：

```js
$('input.user-name').on('input', debounce(function () {
    $.ajax({
        url: `https://just.com/check`,
        method: 'post',
        data: {
            username: $(this).val(),
        },
        success(data) {
            if (data.isRegistered) {
                $('.tips').text('该用户名已被注册！');
            } else {
                $('.tips').text('恭喜！该用户名还未被注册！');
            }
        },
        error(error) {
            console.log(error);
        },
    });
}));
```

其实函数防抖的原理也非常地简单，通过闭包保存一个标记来保存 `setTimeout` 返回的值，每当用户输入的时候把前一个 `setTimeout` clear 掉，然后又创建一个新的 `setTimeout`，这样就能保证输入字符后的 `interval` 间隔内如果还有字符输入的话，就不会执行 `fn` 函数了。

```js
function debounce(fn, interval = 300) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}
```

