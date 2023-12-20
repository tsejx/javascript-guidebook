---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 享元模式
order: 6
---

# 享元模式

享元模式（Flyweight Pattern）是一种结构型设计模式，旨在通过共享对象来减少内存和计算开销。该模式适用于系统中存在大量相似对象，它通过共享这些对象的相同部分，减少了实例的数量，从而降低了内存占用和提高了性能。

在享元模式中，存在两种类型的状态：

1. **内部状态（Intrinsic State）**： 内部状态是对象可共享的部分，它存储在享元对象内部并且不会随环境的改变而改变。对于所有共享对象，内部状态是一致的。
2. **外部状态（Extrinsic State）**： 外部状态是对象依赖的、随环境改变而改变的部分。它不可共享，需要在使用享元对象时由客户端传递给享元对象。

享元模式的关键是将对象的状态分为内部状态和外部状态，并尽可能共享内部状态。

假设有一个图书馆，包含了大量的书籍，我们可以使用享元模式来共享相同的书籍标题：

```typescript
// 享元工厂
class BookFactory {
  constructor() {
    this.books = {};
  }

  getBook(title) {
    if (!this.books[title]) {
      this.books[title] = new Book(title);
    }
    return this.books[title];
  }

  getTotalBooks() {
    return Object.keys(this.books).length;
  }
}

// 享元对象
class Book {
  constructor(title) {
    this.title = title;
  }

  display(author) {
    console.log(`Book: ${this.title}, Author: ${author}`);
  }
}

// 客户端
const factory = new BookFactory();

const book1 = factory.getBook("Design Patterns");
book1.display("Erich Gamma");

const book2 = factory.getBook("Design Patterns");
book2.display("Richard Helm");

console.log(`Total Books in Library: ${factory.getTotalBooks()}`);
```

在这个示例中，`BookFactory` 是享元工厂，负责创建和管理共享的 `Book` 对象。`Book` 类是享元对象，表示图书的内部状态。客户端通过 `BookFactory` 获取书籍对象，如果书籍对象已存在，则直接返回现有对象，否则创建新的对象。通过这种方式，相同标题的书籍被共享，减少了对象的数量，从而提高了系统的性能和效率。