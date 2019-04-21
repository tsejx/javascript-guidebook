const objectOrientedProgamming = [
  {
    title: '基本概念',
    link: '',
    children: [{ title: '面向对象编程', link: 'object-oriented-programming' }],
  },
  {
    title: '理解对象',
    link: 'object-understand',
    children: [
      { title: '对象类型', link: 'the-object-type' },
      { title: '属性操作', link: 'manipulating-property' },
      { title: '对象属性描述符', link: 'attributes-object' },
      { title: '对象状态', link: 'the-object-status' },
    ],
  },
  {
    title: '创建对象',
    link: 'object-creation',
    children: [
      { title: '工厂模式', link: 'the-factory-pattern' },
      { title: '构造函数模式', link: 'the-constructor-pattern' },
      { title: '原型模式', link: 'the-prototype-pattern' },
      {
        title: '组合使用构造函数模式和原型模式',
        link: 'combination-constructor-and-prototype-pattern',
      },
      { title: '动态原型模式', link: 'dynamic-prototype-pattern' },
      { title: '寄生构造函数模式', link: 'parastic-constructor-pattern' },
      { title: '稳妥构造函数模式', link: 'durable-constructor-pattern' },
    ],
  },
  {
    title: '继承',
    link: 'inheritance',
    children: [
      { title: '原型链', link: 'prototype-chain' },
      { title: '借用构造函数', link: 'constructor-stealing' },
      { title: '组合继承', link: 'combination-inheritance' },
      { title: '原型式继承', link: 'prototypal-inheritance' },
      { title: '寄生式继承', link: 'parasitic-inheritance' },
      { title: '寄生组合式继承', link: 'parasitic-combination-inheritance' },
    ],
  },
  {
    title: '类的定义',
    link: 'class-definitions',
    children: [
      { title: '类的基本语法', link: 'class-basic' },
      { title: '类的继承', link: 'class-extends' },
      { title: '私有成员', link: 'class-private-member' },
      { title: '静态成员', link: 'class-static-member' },
    ],
  },
];

module.exports = {
  objectOrientedProgamming,
};
