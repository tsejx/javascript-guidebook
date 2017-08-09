# 前端基础进阶（十五）：详解 ES6 Modules

Tags:JavaScriptAdvanced

---
本文章出自：[前端基础进阶（十五）：详解 ES6 Modules][1]

作者：波同学

![ES6MODULES][2]

对于新人朋友来说，想要自己去搞定一个ES6开发环境并不是一件容易的事情，因为构建工具的学习本身又是一个非常大的方向，我们需要花费不少的时间才能掌握它。

好在慢慢的开始有大神提供了一些非常简单易懂，学习成本非常低的解决方案来帮助大家学习。`create-react-app`就是这些解决方案中，个人认为最简单易懂的一种方式。

所以在学习ES6 modules之前，先跟大家介绍一下`create-react-app`的安装与使用。

> 尽管`create-react-app`的目的是用于开发react程序，但是我们仅仅只用来学习ES6是再合适不过了。当然你也可以借助`vue-cli`来学习，同样十分简单。

## 1、确保自己的本地环境已经安装了node与npm

通常安装的方式就是去node的官方网站下载安装，在安装node的时候，npm也会一起被安装。

下载地址： [http://nodejs.cn/download/][3]

## 2、安装一个好用的命令行工具

在windows环境下，系统默认的cmd非常难用，所以我个人比较推荐大家使用git.bash 或者 cmder。

git 下载地址： [https://git-scm.com/downloads][4]
在git安装目录下会有一个bash工具，找到安装目录直接使用即可。

cmder下载地址： [http://cmder.net/][5]

在mac上就方便很多了，你可以直接使用系统自带的terminal工具，就非常好用。但是一般我推荐大家使用iterm2，并安装oh my zsh插件。具体的配置大家可以自己去折腾，网上的教程应该足够帮助你搞定这一切了。

* iterm2 下载地址 [http://www.iterm2.com/downloads.html][6]
* oh my zsh 主题选择 [https://github.com/robbyrussell/oh-my-zsh/wiki/External-themes][7]

![此处输入图片的描述][8]

另外还强烈推荐一款超高颜值的终端工具 `hyperTerm`。

这款工具的特色就是颜值高，第一感觉就是惊艳，大家不妨一试。

![此处输入图片的描述][9]

* hyperTerm 下载地址 [https://hyper.is/][10]

## 3、安装create-react-app

在命令行工具中使用查看版本的方式确保node与npm都安装好之后，我们就可以安装create-react-app了。

```javascript
> node -v 
// 输出node版本号

> npm -v
// 输出npm版本号
```

使用npm全局安装create-react-app

```javascript
> npm install create-react-app -g
```

然后我们就可以使用`create-react-app`来创建我们的第一个项目。

找到一个你要存放项目的根目录，假设叫做develop，运行以下指令。

```javascript
> create-react-app es6app
```

create-react-app会自动帮助我们在develop目录下创建一个叫做es6app的文件夹，这就是我们新创建的项目。

当项目创建完成之后，在命令行工具中，我们会看到如图所示的提示。这些提示告诉了我们如何运行项目`npm start` ，如何打包项目`npm run build`等，这里我就不再赘述。

![此处输入图片的描述][11]

项目创建完毕之后，进入该文件夹。

```javascript
> cd es6app

// 查看文件夹里的内容
> ls
```

我们会发现里面有一个叫做package.json的文件，这个文件里包含了项目所需要的所有依赖。当我们第一次运行项目之前，还需要安装该文件里的依赖包。

```javascript
> npm install
```

安装完毕之后，我们就可以启动该项目了。

```javascript
> npm start
```

![项目启动之后][12]

一般来说，启动之后会自动在浏览器中打开。


![项目首次启动的页面][13]

> `create-react-app`已经自动帮助我们实现了热更新，因此当我们修改代码时，浏览器会自动更新。当然，如果我们仅仅只是修改页面样式时，热更新将会非常方便，但是如果你正在进行单页面的组件开发，可能热更新能够提供的帮助非常有限。

## 4、认识项目

只要我们按照构建工具的规则进行开发，那么构建工具会自动帮助我们将代码进行整合，因此在该项目中开发时，我们并不需要自己来使用script或者link标签来引入js与css，所以认识create-react-app的规则就变得很重要。

初次创建的项目下，会有3个文件夹。

* node_modules
项目依赖包存放位置。当我们运行`npm install`安装`package.json`中的依赖包时，该文件夹会自动创建，所有的依赖包会安装到该文件夹里。

* public
主要的作用是html入口文件的存放。当然我们也可以存放其他公用的静态资源，如图片，css等。其中的`index.html`就是我们项目的入口html文件

* src
组件的存放目录。在create-react-app创建的项目中，每一个单独的文件都可以被看成一个单独的模块，单独的image，单独的css，单独js等，而所有的组件都存放于src目录中，其中`index.js`则是js的入口文件。虽然我们并没有在`index.html`中使用script标签引入他，但是他的作用就和此一样。

当然，如果我们要进一步进行react的学习，那么肯定需要了解多一点的规则，但是在学习react之前，我们还是先把ES6 modules的知识搞定在说吧，所以，接下来你要做的事情就是，删掉src目录里的除了index.js之外的所有文件，并清空index.js，我们从0开始学习ES6 modules。

为了确保程序仍然能够正常运行，我们在index.js中随便写点代码测试一下

```javascript
const app = document.querySelector('#root')
app.innerHTML = '啊，全部被清空啦，准备工作终于做完了，可以开始学习ES6啦'
```

![一切正常，程序变得普通了，我们更容易理解][14]

那么我们就可以在这个环境下学习ES6的所有知识了，当然也包括ES6 modules。

# ES6 modules

## 1. 引入模块

首先在`src`目录下创建一个`test.js`，在`test.js`中我们随便干点什么简单的事情即可。

```javascript
// src/test.js
console.log('your first module');
```

在index.js中通过import引入test.js，这是我们要学会的第一个语法

```javascript
// src/index.js
import test from './test'

console.log(test);
```

* `import`表示引入一个模块，
* test 我们暂时理解为引入模块的名字，
* from表示从哪里引入
* `./test`为`./test.js`的简写，表示将要引入模块的路径

![结果是test中的代码执行，index.js中模块test为一个空对象][15]

引入这个动作执行时，`test.js`中的代码也执行了。由于在test.js中并没有对外暴露任何接口，因此`index.js`中的`test`为一个空对象，那么对外暴露接口的方式，则是我们要学习的第二个语法。

## 2. 对外提供接口

ES6 modules使用`export`关键字对外提供接口，在我们刚才创建的`test.js`中，我们添加如下代码

```javascript
// test.js
const num = 20;
const arr = [1, 2, 3, 4];
const obj = {
    a: 0,
    b: function() {}
}
const foo = () => {
    const a = 0;
    const b = 20;
    return a + b;
}

export default {
    num,
    arr,
    obj,
    foo
}
```

![运行结果][16]

在`test.js`中，我们使用`export default`对包暴露了一个对象。他的意思就是当我们使用`import test from './test'`时，这个test对象就默认等于`export default`暴露的对象。

我们还可以在test.js中，仅仅通过`export`暴露几个方法与属性，我们来看看index.js中test会变成什么样子。

```javascript
// src/test.js
export const bar = () => {}
export const zcar = 12345;
```

保存运行后，我们发现，index.js中的test对象并没有变化，因为它仅仅等于`export default`抛出的对象，因此，为了获得模块`test.js`暴露的所有接口，我们得通过如下的方式。

```javascript
// src/index.js
import * as test from './test';
```

其中的` * `表示所有，这是比较常用的通配符，as表示别名，`* as test`的意思是将test.js暴露的所有接口组成的对象，命名为test。那么我们在index.js中log出test，结果就如下。


![看到结果，我们就很容易清楚的知道export与export default的区别与作用了，并且如何使用他们就变得很简单了][17]
如果大家还记得前面一篇文章里，我所讲的ES6解析结构的语法，那么对于如下的用法相信就不难理解。

```javascript
// src/index.js
import test, { bar, zcar } from './test';

console.log(test);
console.log('bar:', bar);
console.log('zcar:', zcar);
```

test，仍然表示为`export default`暴露的对象，而` { bar, zcar }`则表示利用解析结构的语法，从整个返回对象中去取得对应的接口。输出结果也就很清晰了。

![result][18]

这种方式还是比较常见，比如我们在使用react时，常常这样使用：

```javascript
import React, { Component } from 'react'
```

它其实暗示了React的封装方式，也暗示了我们应该如何去封装我们的模块。

> 这里我们能够直接引入react的原因，是因为我们将它安装到了文件夹node_modules中，该文件夹中安装的所有模块都可以这样直接引用。例如我们安装一个jquery。

```javascript
// 安装jquery
> npm install jquery
```

然后在其他模块中就可以直接引入

```javascript
import $ from 'jquery'
```

这样，我们可以和往常一样使用jquery。
通过这样方式，我们还可以扩展更多的库，这就使得我们这个开发环境不仅仅能够用于react的开发，怎么用，完全取决与你自己。

OK，ES6 模块的基础语法大概就这些吧，他告诉了我们在ES6中，一个模块应该如何对外暴露接口与如何引入其他模块暴露的接口，这个知识点在实际开发中非常常用，因此虽然简单，但是不得不掌握，这也是大家进一步学习react或者vue的基础，主要的难点大概在于本地开发环境的折腾，如果你是初次折腾这些，可能会遇到一些小问题，所以一定要有一点耐心。

> 通常来说，一个知识点，在完全理解之前还是有点难度的，但是理解之后就变得非常简单，所以如果你在学习这个知识点时感觉有点困难，也不要过于担心，多多动手尝试，并在实践中运用起来，相信很快就能掌握。



  [1]: http://www.jianshu.com/p/b7db6224a4aa
  [2]: http://upload-images.jianshu.io/upload_images/599584-15a83b1f35a8974c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [3]: http://nodejs.cn/download/
  [4]: https://git-scm.com/downloads
  [5]: http://cmder.net/
  [6]: http://www.iterm2.com/downloads.html
  [7]: https://github.com/robbyrussell/oh-my-zsh/wiki/External-themes
  [8]: http://upload-images.jianshu.io/upload_images/599584-76079222df7b34f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [9]: http://upload-images.jianshu.io/upload_images/599584-6e8534894dfb4e4d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [10]: https://hyper.is/
  [11]: http://upload-images.jianshu.io/upload_images/599584-368f0d2ad8cafb5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [12]: http://upload-images.jianshu.io/upload_images/599584-105e41643f770f96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [13]: http://upload-images.jianshu.io/upload_images/599584-f91ae7637fa70ed9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [14]: http://upload-images.jianshu.io/upload_images/599584-2524e23338728b89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [15]: http://upload-images.jianshu.io/upload_images/599584-258a86fe0e06b5f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [16]: http://upload-images.jianshu.io/upload_images/599584-783481a63855b461.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [17]: http://upload-images.jianshu.io/upload_images/599584-682a3aa05a20aad6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [18]: http://upload-images.jianshu.io/upload_images/599584-5f1b2cb69be63173.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240