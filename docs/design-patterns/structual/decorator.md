---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 装饰者模式
order: 4
---

# 装饰者模式

**装饰模式（Decorator Pattern）**：动态地给一个对象增加一些额外的职责（Responsibility），就增加对象功能来说，装饰模式比生成子类实现更为灵活。其别名也可以称为包装器（Wrapper），与适配器模式的别名相同，但它们适用于不同的场合。根据翻译的不同，装饰模式也有人称之为 **油漆工模式**，它是一种对象结构型模式。ES7 的装饰器语法以及 React 中的高阶组件（HoC）都是这一模式的实现，`react-redux` 的 `connect()` 也运用了装饰器模式。

## 模式结构

装饰模式包含如下角色：

- Component（抽象构件）：它是具体构件和抽象装饰类的共同父类，声明了在具体构件中实现的业务方法，它的引入可以使客户端以一致的方式处理未被装饰的对象以及装饰之后的对象，实现客户端的透明操作。
- ConcreteComponent（具体构件）：它是抽象构件类的子类，用于定义具体的构件对象，实现了在抽象构件中声明的方法，装饰器可以给它增加额外的职责（方法）。
- Decorator（抽象装饰类）：它也是抽象构件类的子类，用于给具体构件增加职责，但是具体职责在其子类中实现。它维护一个指向抽象构件对象的引用，通过该引用可以调用装饰之前构件对象的方法，并通过其子类扩展该方法，以达到装饰的目的。
- ConcreteDecorator（具体装饰类）：它是抽象装饰类的子类，负责向构件添加新的职责。每一个具体装饰类都定义了一些新的行为，它可以调用在抽象装饰类中定义的方法，并可以增加新的方法用以扩充对象的行为。

## 模式分析

- 与继承关系相比，关联关系的主要优势在于不会破坏类的封装性，而且继承是一种耦合度较大的静态关系，无法在程序运行时动态扩展。在软件开发阶段，关联关系虽然不会比继承关系减少编码量，但是到了软件维护阶段，由于关联关系使系统具有较好的松耦合性，因此使得系统更加容易维护。当然，关联关系的缺点是比继承关系要创建更多的对象。
- 使用装饰模式来实现扩展比继承更加灵活，它以对客户透明的方式动态地给一个对象附加更多的责任。装饰模式可以在不需要创造更多子类的情况下，将对象的功能加以扩展。

## 优点和缺点

装饰模式的优点:

- 装饰模式与继承关系的目的都是要扩展对象的功能，但是装饰模式可以提供比继承更多的灵活性。
- 可以通过一种动态的方式来扩展一个对象的功能，通过配置文件可以在运行时选择不同的装饰器，从而实现不同的行为。
- 通过使用不同的具体装饰类以及这些装饰类的排列组合，可以创造出很多不同行为的组合。可以使用多个具体装饰类来装饰同一对象，得到功能更为强大的对象。
- 具体构件类与具体装饰类可以独立变化，用户可以根据需要增加新的具体构件类和具体装饰类，在使用时再对其进行组合，原有代码无须改变，符合“开闭原则”

装饰模式的缺点:

- 使用装饰模式进行系统设计时将产生很多小对象，这些对象的区别在于它们之间相互连接的方式有所不同，而不是它们的类或者属性值有所不同，同时还将产生很多具体装饰类。这些装饰类和小对象的产生将增加系统的复杂度，加大学习与理解的难度。
- 这种比继承更加灵活机动的特性，也同时意味着装饰模式比继承更加易于出错，排错也很困难，对于多次装饰的对象，调试时寻找错误可能需要逐级排查，较为烦琐。

## 代码实现

AOP 是一种可以通过预编译方式和运行期动态代理实现在不修改源代码的情况下给程序动态统一添加功能的一种技术。

AOP 实际是 GoF 设计模式的延续，设计模式孜孜不倦追求的是调用者和被调用者之间的解耦，提高代码的灵活性和可扩展性，AOP 可以说也是这种目标的一种实现。

AOP （面向切面编程）装饰函数：

```js
Function.prototype.before = function (fn) {
  const self = this;

  return function () {
    fn.apply(new self(), arguments);

    return self.apply(new self(), arguments);
  };
};

Function.prototype.after = function (fn) {
  const self = this;

  return function () {
    self.apply(new self(), arguments);

    return fn.apply(new self(), arguments);
  };
};
```

⚠️ **注意**：装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。

## 实践应用

### 表单提交前验证

插件式表单验证，在提交前校验参数：

```js
Function.prototype.before = function (fn) {
  const self = this;

  return function () {
    // before 返回 false 的情况直接 return 不再执行后续的原函数
    if (fn.apply(this, arguments) === false) {
      return;
    }

    return self.apply(this, arguments);
  };
};

const params = {
  username: 'mrsingsing',
  password: '',
};

const validate = function () {
  if (params.username === '') {
    console.log('用户名无效');
    return false;
  }
  if (params.password === '') {
    console.log('密码无效');
    return false;
  }
};

let submit = function () {
  const params = {
    username: 'mrsingsing',
    password: '',
  };
};

submit = submit.before(validate);
// 密码无效
```

### 单次访问装饰器

```js
const onceDecorator = function (fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('`fn` must be a function');
  }

  // 函数执行上下文
  const context = this;
  // Promise 是否被 fulfilled
  let isPromiseFulfilled = false;
  // 函数是否已被调用过
  let isFuncInvoked = false;

  const invokeFunc = (funcArgs, resolve, reject) => {
    fn.call(context, funcArgs).then(
      () => {
        isPromiseFulfilled = true;
        resolve();
      },
      () => {
        isPromiseFulfilled = false;
        isFuncInvoked = false;
        reject();
      }
    );
  };

  return function (...args) {
    return new Promise((resolve, reject) => {
      if (!isPromiseFulfilled && !isFuncInvoked) {
        invokeFunc(args, resolve, reject);
        isFuncInvoked = true;
      }
    });
  };
};

export default onceDecorator;
```

因为装饰的可能是函数，也可能是对象的方法，所以提供了两个工具函数 `decoratorFunction` 和 `decoratorMethod`，具体实现如下：

```js
/**
 * 装饰函数
 * @param {*} func 被装饰的函数
 * @param {*} decorator 装饰器
 */
const decorateFunction = (func, decorator) => {
  return decorator(func);
};

/**
 * 装饰方法
 * @param {*} func 被装饰的方法
 * @param {*} decorator 装饰器
 * @param {*} context 上下文
 */
const decorateMethod = (func, decorator, context) => {
  return decorator.bind(context)(func);
};
```

实际应用场景：

- Redux 中间件
- Vuex 中间件
- Express 和 Koa 洋葱模型（中间件）

---

**参考资料：**

- [我是如何在项目中使用装饰器模式的](https://www.jianshu.com/p/d9085f84a1c0)
