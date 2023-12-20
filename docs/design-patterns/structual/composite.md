---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 组合模式
order: 3
---

# 组合模式

组合模式（Composite Pattern）是一种结构型设计模式，它允许你将对象组合成树形结构以表示"部分-整体"的层次结构。组合模式使得客户端对单个对象和组合对象的使用具有一致性。

在组合模式中，有两种关键角色：

1. **组件（Component）**： 定义了树形结构中所有具体对象和组合对象的共同接口。
2. **叶子（Leaf）**： 实现了组件接口的叶子对象，它是树中的叶子节点，没有子节点。
3.** 合成（Composite）**： 实现了组件接口的组合对象，它具有叶子和其他组合对象作为子节点，可以递归地组合成更复杂的树形结构。

假设我们要构建一个文件系统的树形结构：

```typescript
// 组件接口
class FileSystemComponent {
  constructor(name) {
    this.name = name;
  }

  // 公共接口方法
  display() {}
}

// 叶子对象
class File extends FileSystemComponent {
  display() {
    console.log(`File: ${this.name}`);
  }
}

// 组合对象
class Directory extends FileSystemComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  // 添加子节点
  add(component) {
    this.children.push(component);
  }

  // 移除子节点
  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  display() {
    console.log(`Directory: ${this.name}`);
    this.children.forEach(child => {
      child.display();
    });
  }
}

// 客户端代码
const file1 = new File("document.txt");
const file2 = new File("image.jpg");

const directory1 = new Directory("Documents");
directory1.add(file1);
directory1.add(file2);

const file3 = new File("video.mp4");

const directory2 = new Directory("Media");
directory2.add(file3);

const rootDirectory = new Directory("Root");
rootDirectory.add(directory1);
rootDirectory.add(directory2);

// 显示整个文件系统结构
rootDirectory.display();

```

在这个例子中，`FileSystemComponent` 是组件接口，`File` 是叶子对象，`Directory` 是组合对象。`Directory` 可以包含叶子对象（File）和其他组合对象（Directory），从而构建了一个树形结构。客户端代码可以通过调用 `display` 方法遍历整个文件系统结构，而不需要关心是文件还是目录，实现了对整体和部分的一致性访问。

