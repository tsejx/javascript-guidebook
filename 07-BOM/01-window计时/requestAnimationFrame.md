# requestAnimationFrame

　　计时器一直是Javascript动画的核心技术。而编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化

　　大多数电脑显示器的刷新频率是60Hz，大概相当于每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是1000ms/60，约等于16.6ms

　　而 `setTimeout`和`setInterval`的问题是，它们都不精确。它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行

　　`requestAnimationFrame` 采用**系统时间间隔**，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果


## 特点

　　【1】`requestAnimationFrame` 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率

　　【2】在隐藏或不可见的元素中，`requestAnimationFrame` 将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量

　　【3】`requestAnimationFrame` 是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

## 使用

　　`requestAnimationFrame` 的用法与 `setTimeout` 和 `setInterval` 很相似，只是不需要设置时间间隔而已。`requestAnimationFrame` 使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。它返回一个整数，表示定时器的编号，这个值可以传递给 `cancelAnimationFrame` 用于取消这个函数的执行

```javascript
let requestID = requestAnimationFrame(callback);
```

```javascript
// 控制台输出1和0
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
console.log(timer); // 1
```
　　`cancelAnimationFrame` 方法用于取消定时器

```javascript
//控制台什么都不输出
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
cancelAnimationFrame(timer);
```

　　也可以直接使用返回值进行取消

```javascript
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
cancelAnimationFrame(1);
```

## 兼容
　　IE9-浏览器不支持该方法，可以使用setTimeout来兼容

【简单兼容】

```javascript
if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };    
}
```

【严格兼容】

```javascript
if(!window.requestAnimationFrame){
    var lastTime = 0;
    window.requestAnimationFrame = function(callback){
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0,16.7-(currTime - lastTime));
        var id  = window.setTimeout(function(){
            callback(currTime + timeToCall);
        },timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
}
```

```javascript
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}
```

### 应用

　　现在分别使用 `setInterval` 、`setTimeout` 和 `requestAnimationFrame` 这三个方法制作一个简单的进制度效果

【1】`setInterval`

```html
<div id="myDiv" style="background-color: lightblue;width: 0;height: 20px;line-height: 20px;">0%</div>
<button id="btn">run</button>
<script>
var timer;
btn.onclick = function(){
    clearInterval(timer);
    myDiv.style.width = '0';
    timer = setInterval(function(){
        if(parseInt(myDiv.style.width) < 500){
            myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
            myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';    
        }else{
            clearInterval(timer);
        }        
    },16);
}
</script>
```

【2】`setTimeout`

```html
<div id="myDiv" style="background-color: lightblue;width: 0;height: 20px;line-height: 20px;">0%</div>
<button id="btn">run</button>
<script>
var timer;
btn.onclick = function(){
    clearTimeout(timer);
    myDiv.style.width = '0';
    timer = setTimeout(function fn(){
        if(parseInt(myDiv.style.width) < 500){
            myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
            myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';
            timer = setTimeout(fn,16);
        }else{
            clearTimeout(timer);
        }    
    },16);
}
</script>
```

【3】`requestAnimationFrame`

```html
<div id="myDiv" style="background-color: lightblue;width: 0;height: 20px;line-height: 20px;">0%</div>
<button id="btn">run</button>
<script>
var timer;
btn.onclick = function(){
    myDiv.style.width = '0';
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        if(parseInt(myDiv.style.width) < 500){
            myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
            myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
}
</script>
```