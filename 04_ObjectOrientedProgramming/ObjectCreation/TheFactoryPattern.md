## 工厂模式

工厂模式是用来创建对象的一种最常用的设计模式。工厂模式不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。

工厂模式根据抽象程度的不同可以分为三种：

- 简单工厂：通过第三方的类完成松耦合的任务。

- 复杂工厂：通过把实例化的任务交给子类来完成的，用以到达松耦合的目的。

- 超级工厂：通过 `eval()` 来完成智能工厂。

工厂的目的：在于判断接口最终用哪个类实例化（故与接口密不可分）。

使用工厂最终达到的效果是：多态，和类与类之间的松耦合。

```js
function createPerson(name, age, job){
    let person = new Object();
    person.name = name;
    person.age = age;
    person.job = job;
    person.sayNam = function(){
        alert(`I'm ${name}`);
    };
    return person;
}

const person1 = createPerson('Ben', 21, 'student');
const person2 = createPerson('Gray', 25, 'Doctor');
```

函数 `createPerson()` 能够根据接受的参数来构建一个包含所有必要信息的 Person 对象。可以无数次调用这个函数，而每次它都会返回一个包含三个属性一个方法的对象。工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。

