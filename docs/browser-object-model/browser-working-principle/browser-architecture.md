---
nav:
  title: BOM
  order: 5
group:
  title: 浏览器工作原理
  order: 20
title: 浏览器架构
order: 0
---

# 浏览器架构

## 计算机核心元素

为了了解浏览器运行的环境，我们需要了解几个计算机部件以及它们的作用。

### CPU

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/central-processing-unit.png';

export default () => <img alt="CPU（Central Processing Unit）" src={img} width={520} />;
```

第一个需要了解的计算机部件是 **中央处理器（Central Processing Unit）**，或简称为 **CPU**。CPU 可以看作是计算机的大脑。一个 CPU 核心如图中的办公人员，可以逐一解决很多不同任务。它可以在解决从数学到艺术一切任务的同时还知道如何响应客户要求。过去 CPU 大多是单芯片的，一个核心就像存在于同芯片的另一个 CPU。随着现代硬件发展，你经常会有不止一个内核，为你的手机和笔记本电脑提供更多的计算能力。

### GPU

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/graphics-processing-unit.png';

export default () => <img alt="GPU（Graphics Processingg Unit）" src={img} width={520} />;
```

**图形处理器**（**Graphics Processing Unit**，简称为 GPU）是计算机的另一部件。与 CPU 不同，GPU 擅长同时处理跨内核的简单任务。顾名思义，它最初是为解决图形而开发的。这就是为什么在图形环境中 **使用 GPU** 或 **GPU 支持** 都与快速渲染和顺滑交互有关。近年来随着 GPU 加速计算的普及，仅靠 GPU 一己之力也使得越来越多的计算成为可能。

当你在电脑或手机上启动应用时，是 CPU 和 GPU 为应用供能。通常情况下应用是通过操作系统提供的机制在 CPU 和 GPU 上运行。

<br />

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/three-layer-computer-architecture.png';

export default () => <img alt="GPU（Graphics Processingg Unit）" src={img} width={520} />;
```

### 进程与线程

在深入学习浏览器架构之前需要了解的另一对理论是 **进程与线程**。

- **进程（Process）** 是程序的一次执行过程，是一个动态概念，是程序在执行过程中分配和管理资源的基本单位，可以被描述为是一个应用的执行程序
- **线程（Thread）** 是 CPU 调度和分派的基本单位，它可与同属一个进程的其他的线程共享进程所拥有的全部资源，存在于进程并执行程序任意部分

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/process-and-thread.png';

export default () => <img alt="GPU（Graphics Processingg Unit）" src={img} width={520} />;
```

简单地说，进程可以理解成正在执行的应用程序，而线程可以理解为成我们应用程序中的代码的执行器。而他们的关系可想而知，线程是跑在进程里面的，一个进程里面可能有一个或者多个线程，而一个线程，只能隶属于一个进程。

大家都知道，浏览器属于一个应用程序，而应用程序的一次执行，可以理解为计算机启动了一个进程，进程启动后，CPU 会给该进程分配相应的内存空间，当我们的进程得到了内存之后，就可以使用线程进行资源调度，进而完成我们应用程序的功能。

启动应用时会创建一个进程。程序也许会创建一个或多个线程来帮助它工作，这是可选的。操作系统为进程提供了一个可以使用的 **一块** 内存，所有应用程序状态都保存在该私有内存空间中。关闭应用程序时，相应的进程也会消失，操作系统会释放内存。

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/process-memory-and-storage-data.svg';

export default () => <img alt="多个标签页各自的渲染进程" src={img} width={520} />;
```

在应用程序中，为了满足功能的需要，启动的进程会创建另外的新的进程来处理其他任务，这些创建出来的新的进程拥有全新的独立的内存空间，不能与原来的进程内向内存，如果这些进程之间需要通信，可以通过 **IPC 机制（Inter Process Communication）** 来进行。许多应用都是这样设计的，所以如果一个工作进程失去响应，该进程就可以在不停止应用程序不同部分的其他进程运行的情况下重新启动。

```jsx | inline
import React from 'react';
import svg from '../../assets/browser-working-principle/inter-process-communication.svg';

export default () => <img alt="工作进程与 IPC" src={svg} width={520} />;
```

## 浏览器架构

> 那么如何通过进程和线程构建 Web 浏览器呢？

它可能由一个拥有很多线程的进程，或是一些通过 IPC 通信的不同线程的进程。

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/multi-process-and-ipc-process.png';

export default () => <img alt="不同浏览器架构的进程/线程示意图" src={img} width={720} />;
```

这里需要注意的重要一点是，这些不同的架构是实现细节。关于如何构建 Web 浏览器并不存在标准规范。每个浏览器的构建方法可能都迥然不同。

在本系列中，我们使用下图所示的 Chrome 近期架构进行阐述。

顶部是浏览器进程，它与处理应用其它模块任务的进程进行协调。对于渲染进程来说，创建了多个渲染进程并分配给了每个标签页。直到最近，Chrome 在可能的情况下给每个标签页分配一个进程。而现在它试图给每个站点分配一个进程，包括 iframe（参见站点隔离）。

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/chrome-multi-process.png';

export default () => <img alt="Chrome的多进程架构示意图" src={img} width={520} />;
```

## 浏览器的多进程架构

假如我们去开发一个浏览器，它的架构可以是一个单进程多线程的应用程序，也可以是一个使用 IPC 通信的多进程应用程序。

不同的浏览器使用不同的架构，下面主要以 Chrome 为例，介绍浏览器的多进程架构。

在 Chrome 中，主要的进程有 4 个：

- **浏览器进程 （Browser Process）**：负责浏览器的 Tab 的前进、后退、地址栏、书签栏的工作和处理浏览器的一些不可见的底层操作，比如网络请求和文件访问。
- **渲染进程 （Renderer Process）**：负责一个 Tab 内的显示相关的工作，也称渲染引擎。
- **插件进程 （Plugin Process）**：负责控制网页使用到的插件
- **GPU 进程 （GPU Process）**：负责处理整个应用程序的 GPU 任务

<br />

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/different-process-refer-to-different-part-of-ui.png';

export default () => <img alt="不同进程指向浏览器 UI 的不同部分" src={img} width={520} />;
```

### 多进程架构的优点

前文中提到了 Chrome 使用多个渲染进程。最简单的情况下，你可以想象每个标签页都有自己的渲染进程。假设你打开了三个标签页，每个标签页都拥有自己独立的渲染进程。如果某个标签页失去响应，你可以关掉这个标签页，此时其它标签页依然运行着，可以正常使用。如果所有标签页都运行在同一进程上，那么当某个失去响应，所有标签页都会失去响应。这样的体验很糟糕。

```jsx | inline
import React from 'react';
import svg from '../../assets/browser-working-principle/renderer-process-in-each-tab.svg';

export default () => <img alt="如图所示每个标签页上运行的渲染进程" src={svg} width={520} />;
```

把浏览器工作分成多个进程的另一好处是 **安全性** 与 **沙箱化**。由于操作系统提供了限制进程权限的方法，浏览器就可以用沙箱保护某些特定功能的进程。例如，Chrome 浏览器限制处理任意用户输入的进程（如渲染器进程）对任意文件的访问。

由于进程有自己的私有内存空间，所以它们通常包含公共基础设施的拷贝（如 V8，它是 Chrome 的 JavaScript 引擎）。这意味着使用了更多的内存，如果它们是同一进程中的线程，就无法共享这些拷贝。为了节省内存，Chrome 对可加速的内存数量进行了限制。具体限制数值依设备可提供的内存与 CPU 能力而定，但是当 Chrome 运行时达到限制时，会开始在同一站点的不同标签页上运行同一进程。

### 服务化

同样的方法也适用于浏览器进程。Chrome 正在经历架构变革，它转变为将浏览器程序的每一模块作为一个服务来运行，从而可以轻松实现进程的拆解或聚合。

通常观点是当 Chrome 运行在强力硬件上时，它会将每个服务分解到不同进程中，从而提升稳定性，但是如果 Chrome 运行在资源有限的设备上时，它会将服务聚合到一个进程中从而节省了内存占用。在这一架构变革实现前，类似的整合进程以减少内存使用的方法已经在 Android 类平台上使用。

```jsx | inline
import React from 'react';
import svg from '../../assets/browser-working-principle/chrome-service.svg';

export default () => <img alt="工作进程与 IPC" src={svg} width={520} />;
```

### 站点隔离

站点隔离 是近期引入到 Chrome 中的一个功能，它为每个 `iframe` 运行一个单独的渲染进程。我们已经讨论了许久每个标签页的渲染进程，它允许跨站点 `iframe` 运行在一个单独的渲染进程，在不同站点中共享内存。运行 `a.com` 与 `b.com` 在同一渲染进程中看起来还 OK。

同源策略 是 web 的核心安全模型。同源策略确保站点在未得到其它站点许可的情况下不能获取其数据。安全攻击的一个主要目标就是绕过同源策略。进程隔离是分离站点的最高效的手段。随着 [Meltdown and Spectre](https://developers.google.com/web/updates/2018/02/meltdown-spectre) 的出现，使用进程来分离站点愈发势在必行。Chrome 67 版本后，桌面版 Chrome 都默认开启了站点隔离，每个标签页的 `iframe` 都有一个单独的渲染进程。

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/site-isolation.png';

export default () => <img alt="站点隔离示意图" src={img} width={520} />;
```

启用站点隔离是多年来工程人员努力的结果。站点隔离并不只是分配不同的渲染进程这么简单。它从根本上改变了 `iframe` 的通信方式。在一个页面上打开开发者工具，让 `iframe` 在不同的进程上运行，这意味着开发者工具必须在幕后工作，以使它看起来无缝。即使运行一个简单的 `Ctrl + F` 来查找页面中的一个单词，也意味着在不同的渲染器进程中进行搜索。

## 参考资料

- [📝 原文 Inside look at modern web browser（Part 1）](https://developers.google.com/web/updates/2018/09/inside-browser-part1#browser-architecture)
- [📝 现代浏览器内部揭秘 Part 1](https://github.com/xitu/gold-miner/blob/master/TODO1/inside-look-at-modern-web-browser-part1.md)
- [📝 精读 - 浏览器渲染原理](https://juejin.im/post/6844904175067725838)
- [📝 扩展：Making the world's information safely accessible](https://safebrowsing.google.com/)
- [📝 扩展：Cross-Origin Read Blocking for Web Developers](https://www.chromium.org/Home/chromium-security/corb-for-developers)
- [📝 扩展：Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api)
