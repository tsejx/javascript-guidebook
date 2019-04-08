const basicConcept = [
  {
    title: '词法语法',
    link: 'lexical-grammar',
    children: [{ title: '词法语法', link: 'lexical-grammar' }],
  },
  {
    title: '数据类型和值',
    link: 'data-types',
    children: [{ title: '数据类型和值', link: 'data-types' }],
  },
  {
    title: '主要表达式',
    link: 'expressions/primary-expression',
    children: [
      { title: 'this', link: 'this' },
      { title: '字面量引用', link: 'literal' },
      { title: '数组初始化', link: 'array-initializer' },
      { title: '对象初始化', link: 'object-initializer' },
      { title: '属性访问器', link: 'property-accessors' },
      { title: '分组表达式', link: 'the-grouping-operator' },
    ],
  },
  {
    title: '其他表达式',
    link: 'expressions',
    children: [{ title: '更新表达式', link: 'update-expressions' }],
  },
  {
    title: '一元运算符',
    link: 'expressions/unary-operators',
    children: [
      { title: 'in', link: 'in' },
      { title: 'instanceof', link: 'instanceof' },
      { title: 'delete', link: 'delete' },
      { title: 'typeof', link: 'typeof' },
      { title: 'void', link: 'void' },
      { title: '字符串运算符', link: 'string-operator' },
    ],
  },
  {
    title: '其他运算符',
    link: 'expressions',
    children: [
      { title: '算术运算符', link: 'arithmetic-operators' },
      { title: '赋值运算符', link: 'assignment-operators' },
      { title: '按位运算符', link: 'bitwise-operators' },
      { title: '逗号运算符', link: 'comma-operator' },
      { title: '比较运算符', link: 'comparation-operators' },
      { title: '条件运算符', link: 'conditional-operator' },
      { title: '逻辑运算符', link: 'logical-operators' },
      { title: '扩展运算符', link: 'spread-operator' },
      { title: '解构赋值', link: 'detructing-assignment' },
      { title: '运算符优先级', link: 'operators-precedence' },
    ],
  },
  {
    title: '语句和声明',
    link: 'statements-and-declarations',
    children: [
      { title: '块语句', link: 'block' },
      { title: '声明和变量语句', link: 'declarations-and-the-variable-statement' },
      { title: 'if 语句', link: 'the-if-statement' },
      { title: 'continue 语句', link: 'the-continue-statement' },
      { title: 'break 语句', link: 'the-break-statement' },
      { title: 'return 语句', link: 'the-return-statement' },
      { title: 'switch 语句', link: 'the-switch-statement' },
      { title: 'label 语句', link: 'labelled-statements' },
      { title: 'throw 语句', link: 'the-throw-statement' },
      { title: 'try-catch 语句', link: 'the-try-statement' },
    ],
  },
  {
    title: '迭代语句',
    link: 'statements-and-declarations/iteration-statement',
    children: [
      { title: 'do-while 语句', link: 'the-do-while-statement' },
      { title: 'while 语句', link: 'the-while-statement' },
      { title: 'for 语句', link: 'the-for-statement' },
      { title: 'for-in 语句', link: 'the-for-in-statement' },
      { title: 'for-of 语句', link: 'the-for-of-statement' },
    ],
  },
];

module.exports = {
  basicConcept,
};
