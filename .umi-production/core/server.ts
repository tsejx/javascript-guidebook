// @ts-nocheck
// umi.server.js
import '/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/regenerator-runtime/runtime.js';
import { format } from 'url';
import renderServer from '/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/@umijs/preset-built-in/lib/plugins/features/ssr/templates/renderServer/renderServer.js';
import { stripBasename, cheerio, handleHTML } from '/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/@umijs/preset-built-in/lib/plugins/features/ssr/templates/utils.js';
import { IServerRender } from '@umijs/types';

import { ApplyPluginsType, createMemoryHistory } from '/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/@umijs/runtime';
import { plugin } from './plugin';

// 主要为后面支持按需服务端渲染，单独用 routes 会全编译
const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/src/builtins/Previewer.tsx');
        const { default: demos } = require('@@/dumi/demos');
        const { usePrefersColor } = require('dumi/theme');

        
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        }
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/@umijs/preset-dumi/lib/theme/layout').default, require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/node_modules/dumi-theme-default/src/layout.tsx').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1593015582000,
          "title": "JavaScript Guidebook - 📚 JavaScript 知识图谱：ECMAScript、DOM、BOM、HTML5、计算机网络",
          "order": 10,
          "hero": {
            "title": "JavaScript Guidebook",
            "desc": "<div class=\"markdown\"><p>📚 JavaScript 知识图谱：ECMAScript、DOM、BOM、HTML5、计算机网络</p></div>",
            "actions": [
              {
                "text": "立即开始",
                "link": "/basic-concept"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "完整体系",
              "desc": "<div class=\"markdown\"><p>根据官方文档及社区建设构建尽可能实用的知识体系，宏观掌握技术体系</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "深度分析",
              "desc": "<div class=\"markdown\"><p>尽览社区精品技术文章，将最受业界欢迎的使用方法收录其中</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "开发指南",
              "desc": "<div class=\"markdown\"><p>体系化整理，随时查阅具体技术细节，方便前端开发者日常开发</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2019-present<br />Powered by tsejx</p></div>",
          "slugs": []
        },
        "title": "JavaScript Guidebook - 📚 JavaScript 知识图谱：ECMAScript、DOM、BOM、HTML5、计算机网络"
      },
      {
        "path": "/basic-concept",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/index.md",
          "updatedTime": 1593018769000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "title": "基本语法",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "基本语法",
              "heading": "基本语法"
            }
          ]
        },
        "title": "基本语法"
      },
      {
        "path": "/basic-concept/data-types/data-types",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/data-types/data-types.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/data-types/data-types.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "数据类型和值",
            "order": 3,
            "path": "/basic-concept/data-types"
          },
          "title": "数据类型",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "数据类型",
              "heading": "数据类型"
            },
            {
              "depth": 2,
              "value": "原始数据类型",
              "heading": "原始数据类型"
            },
            {
              "depth": 3,
              "value": "空值",
              "heading": "空值"
            },
            {
              "depth": 3,
              "value": "未定义值",
              "heading": "未定义值"
            },
            {
              "depth": 3,
              "value": "布尔值",
              "heading": "布尔值"
            },
            {
              "depth": 3,
              "value": "数字",
              "heading": "数字"
            },
            {
              "depth": 4,
              "value": "进制数",
              "heading": "进制数"
            },
            {
              "depth": 4,
              "value": "浮点数",
              "heading": "浮点数"
            },
            {
              "depth": 4,
              "value": "数字的范围",
              "heading": "数字的范围"
            },
            {
              "depth": 4,
              "value": "NaN",
              "heading": "nan"
            },
            {
              "depth": 3,
              "value": "字符串",
              "heading": "字符串"
            },
            {
              "depth": 3,
              "value": "符号",
              "heading": "符号"
            },
            {
              "depth": 2,
              "value": "引用数据类型",
              "heading": "引用数据类型"
            }
          ]
        },
        "title": "数据类型"
      },
      {
        "path": "/basic-concept/data-types/type-check",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/data-types/type-check.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/data-types/type-check.md",
          "updatedTime": 1648050839000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "数据类型和值",
            "order": 3,
            "path": "/basic-concept/data-types"
          },
          "title": "类型检测",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "类型检测",
              "heading": "类型检测"
            },
            {
              "depth": 2,
              "value": "typeof",
              "heading": "typeof"
            },
            {
              "depth": 2,
              "value": "instanceof",
              "heading": "instanceof"
            },
            {
              "depth": 2,
              "value": "Object.prototype.toString",
              "heading": "objectprototypetostring"
            },
            {
              "depth": 2,
              "value": "constructor",
              "heading": "constructor"
            },
            {
              "depth": 2,
              "value": "数组检测",
              "heading": "数组检测"
            }
          ]
        },
        "title": "类型检测"
      },
      {
        "path": "/basic-concept/data-types/type-conversion",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/data-types/type-conversion.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/data-types/type-conversion.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "数据类型和值",
            "order": 3,
            "path": "/basic-concept/data-types"
          },
          "title": "类型转换",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "类型转换",
              "heading": "类型转换"
            },
            {
              "depth": 2,
              "value": "基本规则",
              "heading": "基本规则"
            },
            {
              "depth": 3,
              "value": "ToString",
              "heading": "tostring"
            },
            {
              "depth": 3,
              "value": "ToNumber",
              "heading": "tonumber"
            },
            {
              "depth": 3,
              "value": "ToBoolean",
              "heading": "toboolean"
            },
            {
              "depth": 3,
              "value": "ToPrimitive",
              "heading": "toprimitive"
            },
            {
              "depth": 2,
              "value": "显式类型转换",
              "heading": "显式类型转换"
            },
            {
              "depth": 2,
              "value": "隐式类型转换",
              "heading": "隐式类型转换"
            },
            {
              "depth": 3,
              "value": "运行环境",
              "heading": "运行环境"
            },
            {
              "depth": 3,
              "value": "运算符",
              "heading": "运算符"
            },
            {
              "depth": 4,
              "value": "加号运算符",
              "heading": "加号运算符"
            },
            {
              "depth": 4,
              "value": "相等运算符",
              "heading": "相等运算符"
            },
            {
              "depth": 4,
              "value": "关系运算符",
              "heading": "关系运算符"
            },
            {
              "depth": 2,
              "value": "经典试题",
              "heading": "经典试题"
            }
          ]
        },
        "title": "类型转换"
      },
      {
        "path": "/basic-concept/expressions/expressions/array-initializer",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/expressions/array-initializer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/expressions/array-initializer.md",
          "updatedTime": 1593018769000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "表达式",
            "order": 4,
            "path": "/basic-concept/expressions/expressions"
          },
          "title": "数组初始化表达式",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "数组初始化表达式",
              "heading": "数组初始化表达式"
            },
            {
              "depth": 2,
              "value": "逗号分隔",
              "heading": "逗号分隔"
            },
            {
              "depth": 2,
              "value": "嵌套数组",
              "heading": "嵌套数组"
            },
            {
              "depth": 2,
              "value": "可省略元素",
              "heading": "可省略元素"
            },
            {
              "depth": 2,
              "value": "索引赋值",
              "heading": "索引赋值"
            }
          ]
        },
        "title": "数组初始化表达式"
      },
      {
        "path": "/basic-concept/expressions/expressions/literal",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/expressions/literal.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/expressions/literal.md",
          "updatedTime": 1593018769000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "表达式",
            "order": 4,
            "path": "/basic-concept/expressions/expressions"
          },
          "title": "字面量",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "字面量",
              "heading": "字面量"
            }
          ]
        },
        "title": "字面量"
      },
      {
        "path": "/basic-concept/expressions/expressions/object-initializer",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/expressions/object-initializer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/expressions/object-initializer.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "表达式",
            "order": 4,
            "path": "/basic-concept/expressions/expressions"
          },
          "title": "对象初始化表达式",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "对象初始化表达式",
              "heading": "对象初始化表达式"
            }
          ]
        },
        "title": "对象初始化表达式"
      },
      {
        "path": "/basic-concept/expressions/expressions/property-accessors",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/expressions/property-accessors.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/expressions/property-accessors.md",
          "updatedTime": 1593018769000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "表达式",
            "order": 4,
            "path": "/basic-concept/expressions/expressions"
          },
          "title": "属性访问器",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "属性访问器",
              "heading": "属性访问器"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "属性访问器"
      },
      {
        "path": "/basic-concept/expressions/operators/arithmetic-operators",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/arithmetic-operators.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/arithmetic-operators.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "算术运算符",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "算术运算符",
              "heading": "算术运算符"
            },
            {
              "depth": 2,
              "value": "实践示例",
              "heading": "实践示例"
            },
            {
              "depth": 3,
              "value": "实现指数运算符",
              "heading": "实现指数运算符"
            }
          ]
        },
        "title": "算术运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/assignment-operators",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/assignment-operators.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/assignment-operators.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "赋值运算符",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "赋值运算符",
              "heading": "赋值运算符"
            }
          ]
        },
        "title": "赋值运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/bitwise-operators",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/bitwise-operators.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/bitwise-operators.md",
          "updatedTime": 1593018769000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "位运算移位运算符",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "位运算移位运算符",
              "heading": "位运算移位运算符"
            },
            {
              "depth": 2,
              "value": "位运算符",
              "heading": "位运算符"
            },
            {
              "depth": 3,
              "value": "按位与",
              "heading": "按位与"
            },
            {
              "depth": 3,
              "value": "按位或",
              "heading": "按位或"
            },
            {
              "depth": 3,
              "value": "按位异或",
              "heading": "按位异或"
            },
            {
              "depth": 3,
              "value": "按位非",
              "heading": "按位非"
            },
            {
              "depth": 3,
              "value": "左移",
              "heading": "左移"
            },
            {
              "depth": 3,
              "value": "有符号右移",
              "heading": "有符号右移"
            },
            {
              "depth": 3,
              "value": "无符号右移",
              "heading": "无符号右移"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            },
            {
              "depth": 2,
              "value": "最佳实践",
              "heading": "最佳实践"
            },
            {
              "depth": 3,
              "value": "取整",
              "heading": "取整"
            },
            {
              "depth": 3,
              "value": "值交换",
              "heading": "值交换"
            },
            {
              "depth": 3,
              "value": "十进制转二进制",
              "heading": "十进制转二进制"
            },
            {
              "depth": 3,
              "value": "颜色值转换",
              "heading": "颜色值转换"
            },
            {
              "depth": 3,
              "value": "判断正负",
              "heading": "判断正负"
            },
            {
              "depth": 3,
              "value": "判断符号是否相同",
              "heading": "判断符号是否相同"
            },
            {
              "depth": 3,
              "value": "判断奇偶",
              "heading": "判断奇偶"
            },
            {
              "depth": 3,
              "value": "判断索引是否存在",
              "heading": "判断索引是否存在"
            },
            {
              "depth": 3,
              "value": "标志位判断",
              "heading": "标志位判断"
            }
          ]
        },
        "title": "位运算移位运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/comma-operator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/comma-operator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/comma-operator.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "逗号运算符",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "逗号运算符",
              "heading": "逗号运算符"
            },
            {
              "depth": 2,
              "value": "用法",
              "heading": "用法"
            },
            {
              "depth": 3,
              "value": "用于声明多个变量",
              "heading": "用于声明多个变量"
            },
            {
              "depth": 3,
              "value": "用于赋值",
              "heading": "用于赋值"
            }
          ]
        },
        "title": "逗号运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/comparation-operators",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/comparation-operators.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/comparation-operators.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "比较运算符",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "比较运算符",
              "heading": "比较运算符"
            },
            {
              "depth": 2,
              "value": "关系运算符",
              "heading": "关系运算符"
            },
            {
              "depth": 2,
              "value": "等值运算符",
              "heading": "等值运算符"
            },
            {
              "depth": 3,
              "value": "抽象相等比较算法",
              "heading": "抽象相等比较算法"
            },
            {
              "depth": 3,
              "value": "引用数据类型间比较",
              "heading": "引用数据类型间比较"
            }
          ]
        },
        "title": "比较运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/conditional-operator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/conditional-operator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/conditional-operator.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "条件运算符",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "条件运算符",
              "heading": "条件运算符"
            }
          ]
        },
        "title": "条件运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/delete",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/delete.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/delete.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "delete",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "delete",
              "heading": "delete"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "返回值",
              "heading": "返回值"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "delete"
      },
      {
        "path": "/basic-concept/expressions/operators/detructing-assignment",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/detructing-assignment.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/detructing-assignment.md",
          "updatedTime": 1718097287000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "解构赋值",
          "order": 18,
          "slugs": [
            {
              "depth": 1,
              "value": "解构赋值",
              "heading": "解构赋值"
            },
            {
              "depth": 2,
              "value": "数组的解构赋值",
              "heading": "数组的解构赋值"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 4,
              "value": "解构不成功",
              "heading": "解构不成功"
            },
            {
              "depth": 4,
              "value": "不完全解构",
              "heading": "不完全解构"
            },
            {
              "depth": 3,
              "value": "默认值",
              "heading": "默认值"
            },
            {
              "depth": 2,
              "value": "对象的解构赋值",
              "heading": "对象的解构赋值"
            },
            {
              "depth": 2,
              "value": "字符串的解构赋值",
              "heading": "字符串的解构赋值"
            },
            {
              "depth": 2,
              "value": "数值和布尔值的解构赋值",
              "heading": "数值和布尔值的解构赋值"
            },
            {
              "depth": 2,
              "value": "函数参数的解构赋值",
              "heading": "函数参数的解构赋值"
            },
            {
              "depth": 2,
              "value": "圆括号问题",
              "heading": "圆括号问题"
            },
            {
              "depth": 3,
              "value": "不能使用圆括号的情况",
              "heading": "不能使用圆括号的情况"
            },
            {
              "depth": 4,
              "value": "变量声明语句",
              "heading": "变量声明语句"
            },
            {
              "depth": 4,
              "value": "函数参数",
              "heading": "函数参数"
            },
            {
              "depth": 4,
              "value": "赋值语句的模式",
              "heading": "赋值语句的模式"
            },
            {
              "depth": 3,
              "value": "可以使用圆括号的情况",
              "heading": "可以使用圆括号的情况"
            },
            {
              "depth": 2,
              "value": "用途",
              "heading": "用途"
            },
            {
              "depth": 3,
              "value": "交换变量的值",
              "heading": "交换变量的值"
            },
            {
              "depth": 3,
              "value": "从函数返回多个值",
              "heading": "从函数返回多个值"
            },
            {
              "depth": 3,
              "value": "函数参数的定义",
              "heading": "函数参数的定义"
            },
            {
              "depth": 3,
              "value": "提取 JSON 数据",
              "heading": "提取-json-数据"
            },
            {
              "depth": 3,
              "value": "函数参数的默认值",
              "heading": "函数参数的默认值"
            },
            {
              "depth": 3,
              "value": "遍历 Map 结构",
              "heading": "遍历-map-结构"
            },
            {
              "depth": 3,
              "value": "加入模块的指定方法",
              "heading": "加入模块的指定方法"
            }
          ]
        },
        "title": "解构赋值"
      },
      {
        "path": "/basic-concept/expressions/operators/in",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/in.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/in.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "in",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "in",
              "heading": "in"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "值为 undefined 的对象属性",
              "heading": "值为-undefined-的对象属性"
            },
            {
              "depth": 3,
              "value": "继承属性",
              "heading": "继承属性"
            }
          ]
        },
        "title": "in"
      },
      {
        "path": "/basic-concept/expressions/operators/instanceof",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/instanceof.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/instanceof.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "instanceof",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "instanceof",
              "heading": "instanceof"
            },
            {
              "depth": 2,
              "value": "检测类型",
              "heading": "检测类型"
            },
            {
              "depth": 2,
              "value": "模拟实现",
              "heading": "模拟实现"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "instanceof"
      },
      {
        "path": "/basic-concept/expressions/operators/logical-operators",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/logical-operators.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/logical-operators.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "逻辑运算符",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "逻辑运算符",
              "heading": "逻辑运算符"
            },
            {
              "depth": 2,
              "value": "逻辑与",
              "heading": "逻辑与"
            },
            {
              "depth": 2,
              "value": "逻辑或",
              "heading": "逻辑或"
            },
            {
              "depth": 2,
              "value": "逻辑非",
              "heading": "逻辑非"
            }
          ]
        },
        "title": "逻辑运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/operators-precedence",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/operators-precedence.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/operators-precedence.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "运算符优先级",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "运算符优先级",
              "heading": "运算符优先级"
            },
            {
              "depth": 2,
              "value": "结合性",
              "heading": "结合性"
            },
            {
              "depth": 2,
              "value": "汇总表",
              "heading": "汇总表"
            }
          ]
        },
        "title": "运算符优先级"
      },
      {
        "path": "/basic-concept/expressions/operators/spread-operator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/spread-operator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/spread-operator.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "扩展运算符",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "扩展运算符",
              "heading": "扩展运算符"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "函数调用",
              "heading": "函数调用"
            },
            {
              "depth": 3,
              "value": "数组字面量或字符串",
              "heading": "数组字面量或字符串"
            },
            {
              "depth": 3,
              "value": "对象字面量",
              "heading": "对象字面量"
            },
            {
              "depth": 2,
              "value": "应用",
              "heading": "应用"
            },
            {
              "depth": 3,
              "value": "函数中的应用",
              "heading": "函数中的应用"
            },
            {
              "depth": 4,
              "value": "替代数组的 apply 方法",
              "heading": "替代数组的-apply-方法"
            },
            {
              "depth": 4,
              "value": "函数的返回值",
              "heading": "函数的返回值"
            },
            {
              "depth": 3,
              "value": "数组中的应用",
              "heading": "数组中的应用"
            },
            {
              "depth": 4,
              "value": "数组的合并",
              "heading": "数组的合并"
            },
            {
              "depth": 4,
              "value": "数组的拷贝",
              "heading": "数组的拷贝"
            },
            {
              "depth": 4,
              "value": "与解构赋值结合",
              "heading": "与解构赋值结合"
            },
            {
              "depth": 3,
              "value": "字符串中的应用",
              "heading": "字符串中的应用"
            },
            {
              "depth": 3,
              "value": "实现 Iterator 接口的对象",
              "heading": "实现-iterator-接口的对象"
            },
            {
              "depth": 3,
              "value": "Map 和 Set 结构、Generator 函数",
              "heading": "map-和-set-结构、generator-函数"
            }
          ]
        },
        "title": "扩展运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/string-operator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/string-operator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/string-operator.md",
          "updatedTime": 1593018769000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "字符串运算符",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "字符串运算符",
              "heading": "字符串运算符"
            }
          ]
        },
        "title": "字符串运算符"
      },
      {
        "path": "/basic-concept/expressions/operators/the-grouping-operator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/the-grouping-operator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/the-grouping-operator.md",
          "updatedTime": 1593018769000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "分组表达式",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "分组表达式",
              "heading": "分组表达式"
            }
          ]
        },
        "title": "分组表达式"
      },
      {
        "path": "/basic-concept/expressions/operators/typeof",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/typeof.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/typeof.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "typeof",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "typeof",
              "heading": "typeof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "返回值",
              "heading": "返回值"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 4,
              "value": "Number",
              "heading": "number"
            },
            {
              "depth": 4,
              "value": "String",
              "heading": "string"
            },
            {
              "depth": 4,
              "value": "Boolean",
              "heading": "boolean"
            },
            {
              "depth": 4,
              "value": "Symbol",
              "heading": "symbol"
            },
            {
              "depth": 4,
              "value": "Undefined",
              "heading": "undefined"
            },
            {
              "depth": 4,
              "value": "Object",
              "heading": "object"
            },
            {
              "depth": 4,
              "value": "Function",
              "heading": "function"
            },
            {
              "depth": 3,
              "value": "特殊的 null",
              "heading": "特殊的-null"
            }
          ]
        },
        "title": "typeof"
      },
      {
        "path": "/basic-concept/expressions/operators/update-expressions",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/update-expressions.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/update-expressions.md",
          "updatedTime": 1638383587000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "更新表达式",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "更新表达式",
              "heading": "更新表达式"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "前自增",
              "heading": "前自增"
            },
            {
              "depth": 3,
              "value": "前自减",
              "heading": "前自减"
            },
            {
              "depth": 3,
              "value": "后自增",
              "heading": "后自增"
            },
            {
              "depth": 3,
              "value": "后自减",
              "heading": "后自减"
            },
            {
              "depth": 2,
              "value": "异同对比",
              "heading": "异同对比"
            }
          ]
        },
        "title": "更新表达式"
      },
      {
        "path": "/basic-concept/expressions/operators/void",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/expressions/operators/void.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/expressions/operators/void.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "运算符",
            "order": 5,
            "path": "/basic-concept/expressions/operators"
          },
          "title": "void",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "void",
              "heading": "void"
            },
            {
              "depth": 2,
              "value": "作用",
              "heading": "作用"
            },
            {
              "depth": 3,
              "value": "替代 undefined",
              "heading": "替代-undefined"
            },
            {
              "depth": 3,
              "value": "客户端 URL",
              "heading": "客户端-url"
            },
            {
              "depth": 3,
              "value": "阻止默认事件",
              "heading": "阻止默认事件"
            }
          ]
        },
        "title": "void"
      },
      {
        "path": "/basic-concept/lexical-grammar/lexical-grammar",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/lexical-grammar/lexical-grammar.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/lexical-grammar/lexical-grammar.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "词法语法",
            "order": 2,
            "path": "/basic-concept/lexical-grammar"
          },
          "title": "词法语法",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "词法语法",
              "heading": "词法语法"
            },
            {
              "depth": 2,
              "value": "字符集",
              "heading": "字符集"
            },
            {
              "depth": 3,
              "value": "区分大小写",
              "heading": "区分大小写"
            },
            {
              "depth": 3,
              "value": "空格、换行符和格式控制符",
              "heading": "空格、换行符和格式控制符"
            },
            {
              "depth": 4,
              "value": "空白字符",
              "heading": "空白字符"
            },
            {
              "depth": 4,
              "value": "行终止符",
              "heading": "行终止符"
            },
            {
              "depth": 3,
              "value": "Unicode 转义序列",
              "heading": "unicode-转义序列"
            },
            {
              "depth": 2,
              "value": "注释",
              "heading": "注释"
            },
            {
              "depth": 3,
              "value": "单行注释",
              "heading": "单行注释"
            },
            {
              "depth": 3,
              "value": "多行注释",
              "heading": "多行注释"
            },
            {
              "depth": 3,
              "value": "阻止执行",
              "heading": "阻止执行"
            },
            {
              "depth": 3,
              "value": "行末注释",
              "heading": "行末注释"
            },
            {
              "depth": 2,
              "value": "直接量",
              "heading": "直接量"
            },
            {
              "depth": 2,
              "value": "标识符",
              "heading": "标识符"
            },
            {
              "depth": 2,
              "value": "关键字和保留字",
              "heading": "关键字和保留字"
            },
            {
              "depth": 3,
              "value": "保留字",
              "heading": "保留字"
            },
            {
              "depth": 3,
              "value": "关键字",
              "heading": "关键字"
            },
            {
              "depth": 3,
              "value": "未来保留字",
              "heading": "未来保留字"
            },
            {
              "depth": 2,
              "value": "分号",
              "heading": "分号"
            },
            {
              "depth": 3,
              "value": "自动分号补全",
              "heading": "自动分号补全"
            }
          ]
        },
        "title": "词法语法"
      },
      {
        "path": "/basic-concept/statements-and-declarations/block",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/block.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/block.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "块语句",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "块语句",
              "heading": "块语句"
            },
            {
              "depth": 2,
              "value": "块级作用域",
              "heading": "块级作用域"
            },
            {
              "depth": 3,
              "value": "var",
              "heading": "var"
            },
            {
              "depth": 3,
              "value": "let 和 const",
              "heading": "let-和-const"
            },
            {
              "depth": 3,
              "value": "function",
              "heading": "function"
            }
          ]
        },
        "title": "块语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/declarations-and-the-variable-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/declarations-and-the-variable-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/declarations-and-the-variable-statement.md",
          "updatedTime": 1600510685000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "变量声明",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "变量声明",
              "heading": "变量声明"
            },
            {
              "depth": 2,
              "value": "变量声明",
              "heading": "变量声明-1"
            },
            {
              "depth": 3,
              "value": "var",
              "heading": "var"
            },
            {
              "depth": 3,
              "value": "let",
              "heading": "let"
            },
            {
              "depth": 3,
              "value": "暂存性死区",
              "heading": "暂存性死区"
            },
            {
              "depth": 3,
              "value": "const",
              "heading": "const"
            },
            {
              "depth": 2,
              "value": "变量作用域",
              "heading": "变量作用域"
            },
            {
              "depth": 2,
              "value": "变量的数据类型",
              "heading": "变量的数据类型"
            }
          ]
        },
        "title": "变量声明"
      },
      {
        "path": "/basic-concept/statements-and-declarations/labelled-statements",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/labelled-statements.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/labelled-statements.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "label 语句",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "label 语句",
              "heading": "label-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "标注示例",
              "heading": "标注示例"
            }
          ]
        },
        "title": "label 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-break-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-break-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-break-statement.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "break 语句",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "break 语句",
              "heading": "break-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "switch 语句",
              "heading": "switch-语句"
            }
          ]
        },
        "title": "break 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-continue-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-continue-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-continue-statement.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "continue 语句",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "continue 语句",
              "heading": "continue-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            }
          ]
        },
        "title": "continue 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-do-while-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-do-while-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-do-while-statement.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "do...while 语句",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "do...while 语句",
              "heading": "dowhile-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            }
          ]
        },
        "title": "do...while 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-for-in-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-for-in-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-for-in-statement.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "for...in 语句",
          "order": 23,
          "slugs": [
            {
              "depth": 1,
              "value": "for...in 语句",
              "heading": "forin-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "提取实例自身属性",
              "heading": "提取实例自身属性"
            }
          ]
        },
        "title": "for...in 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-for-of-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-for-of-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-for-of-statement.md",
          "updatedTime": 1600510685000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "for...of 语句",
          "order": 24,
          "slugs": [
            {
              "depth": 1,
              "value": "for...of 语句",
              "heading": "forof-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "迭代 Array",
              "heading": "迭代-array"
            },
            {
              "depth": 3,
              "value": "迭代 String",
              "heading": "迭代-string"
            },
            {
              "depth": 3,
              "value": "迭代 TypedArray",
              "heading": "迭代-typedarray"
            },
            {
              "depth": 3,
              "value": "迭代 Map",
              "heading": "迭代-map"
            },
            {
              "depth": 3,
              "value": "迭代 Set",
              "heading": "迭代-set"
            },
            {
              "depth": 3,
              "value": "迭代 arguments 对象",
              "heading": "迭代-arguments-对象"
            },
            {
              "depth": 3,
              "value": "迭代 DOM 集合",
              "heading": "迭代-dom-集合"
            },
            {
              "depth": 3,
              "value": "关闭迭代器",
              "heading": "关闭迭代器"
            },
            {
              "depth": 3,
              "value": "迭代生成器",
              "heading": "迭代生成器"
            },
            {
              "depth": 4,
              "value": "不要重用生成器",
              "heading": "不要重用生成器"
            },
            {
              "depth": 3,
              "value": "迭代其他可迭代对象",
              "heading": "迭代其他可迭代对象"
            },
            {
              "depth": 3,
              "value": "for...of 与 for...in 的区别",
              "heading": "forof-与-forin-的区别"
            }
          ]
        },
        "title": "for...of 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-for-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-for-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-for-statement.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "for 语句",
          "order": 22,
          "slugs": [
            {
              "depth": 1,
              "value": "for 语句",
              "heading": "for-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "最佳实践",
              "heading": "最佳实践"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "从尾部向前循环",
              "heading": "从尾部向前循环"
            },
            {
              "depth": 3,
              "value": "位数的整倍循环",
              "heading": "位数的整倍循环"
            },
            {
              "depth": 3,
              "value": "涉及多个变量的循环",
              "heading": "涉及多个变量的循环"
            },
            {
              "depth": 3,
              "value": "可忽略的表达式",
              "heading": "可忽略的表达式"
            }
          ]
        },
        "title": "for 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-if-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-if-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-if-statement.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "if 语句",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "if 语句",
              "heading": "if-语句"
            },
            {
              "depth": 2,
              "value": "单层条件判断",
              "heading": "单层条件判断"
            },
            {
              "depth": 2,
              "value": "多层条件判断",
              "heading": "多层条件判断"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "不建议在条件表达式中",
              "heading": "不建议在条件表达式中"
            },
            {
              "depth": 3,
              "value": "假值等效值",
              "heading": "假值等效值"
            }
          ]
        },
        "title": "if 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-return-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-return-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-return-statement.md",
          "updatedTime": 1600510685000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "return 语句",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "return 语句",
              "heading": "return-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "返回语句特点",
              "heading": "返回语句特点"
            },
            {
              "depth": 3,
              "value": "函数进程",
              "heading": "函数进程"
            },
            {
              "depth": 3,
              "value": "返回值",
              "heading": "返回值"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ]
        },
        "title": "return 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-switch-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-switch-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-switch-statement.md",
          "updatedTime": 1600510685000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "switch 语句",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "switch 语句",
              "heading": "switch-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "关键词",
              "heading": "关键词"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "switch 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-throw-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-throw-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-throw-statement.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "throw 语句",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "throw 语句",
              "heading": "throw-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "抛出一个对象",
              "heading": "抛出一个对象"
            }
          ]
        },
        "title": "throw 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-try-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-try-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-try-statement.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "try-catch 语句",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "try-catch 语句",
              "heading": "try-catch-语句"
            },
            {
              "depth": 2,
              "value": "catch",
              "heading": "catch"
            },
            {
              "depth": 2,
              "value": "finally",
              "heading": "finally"
            },
            {
              "depth": 2,
              "value": "嵌套捕获",
              "heading": "嵌套捕获"
            },
            {
              "depth": 2,
              "value": "异常标识符",
              "heading": "异常标识符"
            }
          ]
        },
        "title": "try-catch 语句"
      },
      {
        "path": "/basic-concept/statements-and-declarations/the-while-statement",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/basic-concept/statements-and-declarations/the-while-statement.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic-concept/statements-and-declarations/the-while-statement.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/basic-concept"
          },
          "group": {
            "title": "语句和声明",
            "order": 7,
            "path": "/basic-concept/statements-and-declarations"
          },
          "title": "while 语句",
          "order": 21,
          "slugs": [
            {
              "depth": 1,
              "value": "while 语句",
              "heading": "while-语句"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            }
          ]
        },
        "title": "while 语句"
      },
      {
        "path": "/browser-object-model",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/index.md",
          "updatedTime": 1648050839000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "BOM 浏览器对象模型",
            "order": 1,
            "path": "/browser-object-model"
          },
          "title": "BOM 浏览器对象模型",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "BOM 浏览器对象模型",
              "heading": "bom-浏览器对象模型"
            }
          ]
        },
        "title": "BOM 浏览器对象模型"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/application",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/application.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/application.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "文件应用",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "文件应用",
              "heading": "文件应用"
            },
            {
              "depth": 2,
              "value": "文件上传结构",
              "heading": "文件上传结构"
            },
            {
              "depth": 3,
              "value": "FormData",
              "heading": "formdata"
            },
            {
              "depth": 2,
              "value": "大文件上传",
              "heading": "大文件上传"
            },
            {
              "depth": 3,
              "value": "实现思路",
              "heading": "实现思路"
            },
            {
              "depth": 3,
              "value": "上传切片",
              "heading": "上传切片"
            },
            {
              "depth": 3,
              "value": "发送合并请求",
              "heading": "发送合并请求"
            },
            {
              "depth": 3,
              "value": "接受切片",
              "heading": "接受切片"
            },
            {
              "depth": 3,
              "value": "合并切片",
              "heading": "合并切片"
            },
            {
              "depth": 2,
              "value": "断点续传",
              "heading": "断点续传"
            },
            {
              "depth": 3,
              "value": "生成标识",
              "heading": "生成标识"
            },
            {
              "depth": 3,
              "value": "文件秒传",
              "heading": "文件秒传"
            },
            {
              "depth": 3,
              "value": "暂停上传",
              "heading": "暂停上传"
            },
            {
              "depth": 3,
              "value": "恢复上传",
              "heading": "恢复上传"
            },
            {
              "depth": 3,
              "value": "进度条改进",
              "heading": "进度条改进"
            }
          ]
        },
        "title": "文件应用"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/base64",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/base64.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/base64.md",
          "updatedTime": 1622527674000,
          "slugs": [
            {
              "depth": 1,
              "value": "Base64",
              "heading": "base64"
            },
            {
              "depth": 2,
              "value": "类型转换",
              "heading": "类型转换"
            },
            {
              "depth": 3,
              "value": "Base64 转 Blob",
              "heading": "base64-转-blob"
            },
            {
              "depth": 3,
              "value": "Base64 转 File",
              "heading": "base64-转-file"
            },
            {
              "depth": 3,
              "value": "File 转 Base64",
              "heading": "file-转-base64"
            }
          ],
          "title": "Base64",
          "nav": {
            "path": "/browser-object-model",
            "title": "BOM"
          },
          "group": {
            "path": "/browser-object-model/binary-data-and-files",
            "title": "二进制数据和文件 API"
          }
        },
        "title": "Base64"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/blob",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/blob.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/blob.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "Blob API",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Blob API",
              "heading": "blob-api"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "属性和方法",
              "heading": "属性和方法"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "与 ArrayBuffer 的关系",
              "heading": "与-arraybuffer-的关系"
            },
            {
              "depth": 2,
              "value": "应用示例",
              "heading": "应用示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "Blob URL",
              "heading": "blob-url"
            }
          ]
        },
        "title": "Blob API"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/data-transfer",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/data-transfer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/data-transfer.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "DataTransfer API",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "DataTransfer API",
              "heading": "datatransfer-api"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            }
          ]
        },
        "title": "DataTransfer API"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/file-list",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/file-list.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/file-list.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "FileList API",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "FileList API",
              "heading": "filelist-api"
            },
            {
              "depth": 2,
              "value": "应用示例",
              "heading": "应用示例"
            },
            {
              "depth": 3,
              "value": "多文件选择",
              "heading": "多文件选择"
            },
            {
              "depth": 3,
              "value": "通过迭代获取多个已选择文件",
              "heading": "通过迭代获取多个已选择文件"
            }
          ]
        },
        "title": "FileList API"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/file-reader-sync",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/file-reader-sync.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/file-reader-sync.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "FileReaderSync API",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "FileReaderSync API",
              "heading": "filereadersync-api"
            }
          ]
        },
        "title": "FileReaderSync API"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/file-reader",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/file-reader.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/file-reader.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "FileReader API",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "FileReader API",
              "heading": "filereader-api"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "属性和方法",
              "heading": "属性和方法"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "事件处理",
              "heading": "事件处理"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "应用示例",
              "heading": "应用示例"
            }
          ]
        },
        "title": "FileReader API"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/file",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/file.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/file.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "File API",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "File API",
              "heading": "file-api"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "属性和方法",
              "heading": "属性和方法"
            },
            {
              "depth": 2,
              "value": "注意事项",
              "heading": "注意事项"
            },
            {
              "depth": 2,
              "value": "实践应用",
              "heading": "实践应用"
            },
            {
              "depth": 3,
              "value": "文件上传",
              "heading": "文件上传"
            },
            {
              "depth": 3,
              "value": "视频文件",
              "heading": "视频文件"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "File API"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/form-data",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/form-data.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/form-data.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "FormData API",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "FormData API",
              "heading": "formdata-api"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "应用示例",
              "heading": "应用示例"
            }
          ]
        },
        "title": "FormData API"
      },
      {
        "path": "/browser-object-model/binary-data-and-files/url",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/binary-data-and-files/url.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/binary-data-and-files/url.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "二进制数据和文件 API",
            "order": 10,
            "path": "/browser-object-model/binary-data-and-files"
          },
          "title": "URL API",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "URL API",
              "heading": "url-api"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "静态方法",
              "heading": "静态方法"
            }
          ]
        },
        "title": "URL API"
      },
      {
        "path": "/browser-object-model/browser-working-principle/browser-architecture",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/browser-architecture.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/browser-architecture.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "浏览器架构",
          "order": 0,
          "slugs": [
            {
              "depth": 1,
              "value": "浏览器架构",
              "heading": "浏览器架构"
            },
            {
              "depth": 2,
              "value": "计算机核心元素",
              "heading": "计算机核心元素"
            },
            {
              "depth": 3,
              "value": "CPU",
              "heading": "cpu"
            },
            {
              "depth": 3,
              "value": "GPU",
              "heading": "gpu"
            },
            {
              "depth": 3,
              "value": "进程与线程",
              "heading": "进程与线程"
            },
            {
              "depth": 2,
              "value": "浏览器架构",
              "heading": "浏览器架构-1"
            },
            {
              "depth": 2,
              "value": "浏览器的多进程架构",
              "heading": "浏览器的多进程架构"
            },
            {
              "depth": 3,
              "value": "多进程架构的优点",
              "heading": "多进程架构的优点"
            },
            {
              "depth": 3,
              "value": "服务化",
              "heading": "服务化"
            },
            {
              "depth": 3,
              "value": "站点隔离",
              "heading": "站点隔离"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "浏览器架构"
      },
      {
        "path": "/browser-object-model/browser-working-principle/browser-event",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/browser-event.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/browser-event.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "浏览器事件处理",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "浏览器事件处理",
              "heading": "浏览器事件处理"
            },
            {
              "depth": 2,
              "value": "输入事件",
              "heading": "输入事件"
            },
            {
              "depth": 2,
              "value": "合成器接收输入事件",
              "heading": "合成器接收输入事件"
            },
            {
              "depth": 2,
              "value": "理解非立即可滚动区",
              "heading": "理解非立即可滚动区"
            },
            {
              "depth": 3,
              "value": "设置事件处理器时须注意",
              "heading": "设置事件处理器时须注意"
            },
            {
              "depth": 2,
              "value": "检查事件是否可撤销",
              "heading": "检查事件是否可撤销"
            },
            {
              "depth": 2,
              "value": "定位事件目标",
              "heading": "定位事件目标"
            },
            {
              "depth": 2,
              "value": "降低往主线程发送事件的频率",
              "heading": "降低往主线程发送事件的频率"
            },
            {
              "depth": 2,
              "value": "帧内事件",
              "heading": "帧内事件"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "浏览器事件处理"
      },
      {
        "path": "/browser-object-model/browser-working-principle/composite",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/composite.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/composite.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "合并",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "合并",
              "heading": "合并"
            },
            {
              "depth": 2,
              "value": "硬件加速",
              "heading": "硬件加速"
            },
            {
              "depth": 3,
              "value": "内部原理",
              "heading": "内部原理"
            },
            {
              "depth": 3,
              "value": "创建独立图层",
              "heading": "创建独立图层"
            },
            {
              "depth": 3,
              "value": "开启硬件加速",
              "heading": "开启硬件加速"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "合并"
      },
      {
        "path": "/browser-object-model/browser-working-principle/construction-of-render-tree",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/construction-of-render-tree.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/construction-of-render-tree.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "渲染树构建",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "渲染树构建",
              "heading": "渲染树构建"
            },
            {
              "depth": 2,
              "value": "构建流程",
              "heading": "构建流程"
            },
            {
              "depth": 2,
              "value": "遍历文档树",
              "heading": "遍历文档树"
            },
            {
              "depth": 3,
              "value": "非可视化元素",
              "heading": "非可视化元素"
            },
            {
              "depth": 3,
              "value": "复杂结构元素",
              "heading": "复杂结构元素"
            },
            {
              "depth": 3,
              "value": "脱离文档流",
              "heading": "脱离文档流"
            },
            {
              "depth": 2,
              "value": "样式计算",
              "heading": "样式计算"
            },
            {
              "depth": 3,
              "value": "共享样式数据",
              "heading": "共享样式数据"
            },
            {
              "depth": 3,
              "value": "对规则进行处理以简化匹配",
              "heading": "对规则进行处理以简化匹配"
            },
            {
              "depth": 3,
              "value": "层叠顺序",
              "heading": "层叠顺序"
            },
            {
              "depth": 4,
              "value": "样式表的级联顺序",
              "heading": "样式表的级联顺序"
            },
            {
              "depth": 4,
              "value": "特异性",
              "heading": "特异性"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "渲染树构建"
      },
      {
        "path": "/browser-object-model/browser-working-principle/construction-of-the-object-model",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/construction-of-the-object-model.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/construction-of-the-object-model.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "构建对象模型",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "构建对象模型",
              "heading": "构建对象模型"
            },
            {
              "depth": 2,
              "value": "文档对象模型",
              "heading": "文档对象模型"
            },
            {
              "depth": 2,
              "value": "CSS 对象模型",
              "heading": "css-对象模型"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "构建对象模型"
      },
      {
        "path": "/browser-object-model/browser-working-principle/layout",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/layout.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/layout.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "布局",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "布局",
              "heading": "布局"
            },
            {
              "depth": 2,
              "value": "脏位系统",
              "heading": "脏位系统"
            },
            {
              "depth": 2,
              "value": "布局方式",
              "heading": "布局方式"
            },
            {
              "depth": 3,
              "value": "全局布局和增量布局",
              "heading": "全局布局和增量布局"
            },
            {
              "depth": 3,
              "value": "异步布局和同步布局",
              "heading": "异步布局和同步布局"
            },
            {
              "depth": 2,
              "value": "优化方式",
              "heading": "优化方式"
            },
            {
              "depth": 3,
              "value": "浏览器的优化策略",
              "heading": "浏览器的优化策略"
            },
            {
              "depth": 3,
              "value": "减少重绘重排的优化策略",
              "heading": "减少重绘重排的优化策略"
            },
            {
              "depth": 3,
              "value": "布局处理",
              "heading": "布局处理"
            },
            {
              "depth": 3,
              "value": "宽度计算",
              "heading": "宽度计算"
            },
            {
              "depth": 3,
              "value": "换行",
              "heading": "换行"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "布局"
      },
      {
        "path": "/browser-object-model/browser-working-principle/paint",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/paint.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/paint.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "绘制",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "绘制",
              "heading": "绘制"
            },
            {
              "depth": 2,
              "value": "绘制顺序",
              "heading": "绘制顺序"
            },
            {
              "depth": 2,
              "value": "更新渲染管道",
              "heading": "更新渲染管道"
            },
            {
              "depth": 2,
              "value": "重排",
              "heading": "重排"
            },
            {
              "depth": 3,
              "value": "重排原因",
              "heading": "重排原因"
            },
            {
              "depth": 3,
              "value": "重排场景",
              "heading": "重排场景"
            },
            {
              "depth": 3,
              "value": "优化方案",
              "heading": "优化方案"
            },
            {
              "depth": 2,
              "value": "重绘",
              "heading": "重绘"
            },
            {
              "depth": 3,
              "value": "重绘属性",
              "heading": "重绘属性"
            },
            {
              "depth": 2,
              "value": "动态变化",
              "heading": "动态变化"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "绘制"
      },
      {
        "path": "/browser-object-model/browser-working-principle/script-loading-asynchronously",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/script-loading-asynchronously.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/script-loading-asynchronously.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "脚本异步加载",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "脚本异步加载",
              "heading": "脚本异步加载"
            },
            {
              "depth": 2,
              "value": "异步加载",
              "heading": "异步加载"
            },
            {
              "depth": 3,
              "value": "普通脚本",
              "heading": "普通脚本"
            },
            {
              "depth": 3,
              "value": "defer",
              "heading": "defer"
            },
            {
              "depth": 3,
              "value": "async",
              "heading": "async"
            },
            {
              "depth": 3,
              "value": "综合运用",
              "heading": "综合运用"
            },
            {
              "depth": 2,
              "value": "加载事项",
              "heading": "加载事项"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "脚本异步加载"
      },
      {
        "path": "/browser-object-model/browser-working-principle/workflow",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/browser-working-principle/workflow.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/browser-working-principle/workflow.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "浏览器工作原理",
            "order": 20,
            "path": "/browser-object-model/browser-working-principle"
          },
          "title": "渲染进程的内部机制",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "渲染进程的内部机制",
              "heading": "渲染进程的内部机制"
            },
            {
              "depth": 2,
              "value": "导航流",
              "heading": "导航流"
            },
            {
              "depth": 2,
              "value": "工作线程",
              "heading": "工作线程"
            },
            {
              "depth": 2,
              "value": "渲染引擎",
              "heading": "渲染引擎"
            },
            {
              "depth": 3,
              "value": "引擎种类",
              "heading": "引擎种类"
            },
            {
              "depth": 2,
              "value": "工作流程",
              "heading": "工作流程"
            },
            {
              "depth": 3,
              "value": "Webkit 实现",
              "heading": "webkit-实现"
            },
            {
              "depth": 3,
              "value": "Gecko 实现",
              "heading": "gecko-实现"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "渲染进程的内部机制"
      },
      {
        "path": "/browser-object-model/connectivity/beacon",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/beacon.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/beacon.md",
          "updatedTime": 1593613034000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "数据通信 API",
            "order": 11,
            "path": "/browser-object-model/connectivity"
          },
          "title": "Beacon API",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Beacon API",
              "heading": "beacon-api"
            },
            {
              "depth": 2,
              "value": "Navigator.sendBeacon",
              "heading": "navigatorsendbeacon"
            },
            {
              "depth": 2,
              "value": "WorkerNavigator.sendBeacon",
              "heading": "workernavigatorsendbeacon"
            }
          ]
        },
        "title": "Beacon API"
      },
      {
        "path": "/browser-object-model/connectivity/event-source",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/event-source.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/event-source.md",
          "updatedTime": 1593705356000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "离线与存储 API",
            "order": 12,
            "path": "/browser-object-model/connectivity"
          },
          "title": "EventSource",
          "order": 6,
          "slugs": [
            {
              "depth": 2,
              "value": "EventSource",
              "heading": "eventsource"
            },
            {
              "depth": 3,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            }
          ]
        },
        "title": "EventSource"
      },
      {
        "path": "/browser-object-model/connectivity/featch",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/featch.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/featch.md",
          "updatedTime": 1593613034000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "数据通信 API",
            "order": 11,
            "path": "/browser-object-model/connectivity"
          },
          "title": "Fetch API",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Fetch API",
              "heading": "fetch-api"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "Guard",
              "heading": "guard"
            },
            {
              "depth": 2,
              "value": "Headers",
              "heading": "headers"
            },
            {
              "depth": 2,
              "value": "Request",
              "heading": "request"
            },
            {
              "depth": 3,
              "value": "属性方法",
              "heading": "属性方法"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 2,
              "value": "Body",
              "heading": "body"
            },
            {
              "depth": 2,
              "value": "Response",
              "heading": "response"
            },
            {
              "depth": 2,
              "value": "fetch()",
              "heading": "fetch"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例-1"
            },
            {
              "depth": 3,
              "value": "mode",
              "heading": "mode"
            },
            {
              "depth": 3,
              "value": "cache",
              "heading": "cache"
            }
          ]
        },
        "title": "Fetch API"
      },
      {
        "path": "/browser-object-model/connectivity/post-message",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/post-message.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/post-message.md",
          "updatedTime": 1593613034000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "数据通信 API",
            "order": 11,
            "path": "/browser-object-model/connectivity"
          },
          "title": "PostMessage",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "PostMessage",
              "heading": "postmessage"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "发送方",
              "heading": "发送方"
            },
            {
              "depth": 2,
              "value": "监听方",
              "heading": "监听方"
            },
            {
              "depth": 2,
              "value": "安全性",
              "heading": "安全性"
            }
          ]
        },
        "title": "PostMessage"
      },
      {
        "path": "/browser-object-model/connectivity/progress-event",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/progress-event.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/progress-event.md",
          "updatedTime": 1593705356000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "数据通信 API",
            "order": 11,
            "path": "/browser-object-model/connectivity"
          },
          "title": "Progress Event",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Progress Event",
              "heading": "progress-event"
            },
            {
              "depth": 2,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 2,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Progress Event"
      },
      {
        "path": "/browser-object-model/connectivity/server-sent-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/server-sent-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/server-sent-events.md",
          "updatedTime": 1593613034000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "数据通信 API",
            "order": 11,
            "path": "/browser-object-model/connectivity"
          },
          "title": "Server-sent Events",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Server-sent Events",
              "heading": "server-sent-events"
            },
            {
              "depth": 2,
              "value": "本质",
              "heading": "本质"
            },
            {
              "depth": 2,
              "value": "特点",
              "heading": "特点"
            },
            {
              "depth": 2,
              "value": "客户端实现",
              "heading": "客户端实现"
            },
            {
              "depth": 2,
              "value": "服务器实现",
              "heading": "服务器实现"
            },
            {
              "depth": 2,
              "value": "数据格式",
              "heading": "数据格式"
            },
            {
              "depth": 2,
              "value": "data 字段",
              "heading": "data-字段"
            },
            {
              "depth": 2,
              "value": "id 字段",
              "heading": "id-字段"
            },
            {
              "depth": 2,
              "value": "event 字段",
              "heading": "event-字段"
            },
            {
              "depth": 2,
              "value": "retry 字段",
              "heading": "retry-字段"
            }
          ]
        },
        "title": "Server-sent Events"
      },
      {
        "path": "/browser-object-model/connectivity/web-real-time-communication",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/web-real-time-communication.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/web-real-time-communication.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "数据通信 API",
            "order": 11,
            "path": "/browser-object-model/connectivity"
          },
          "title": "WebRTC",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "WebRTC",
              "heading": "webrtc"
            },
            {
              "depth": 2,
              "value": "引言",
              "heading": "引言"
            },
            {
              "depth": 2,
              "value": "WebRTC 的组成",
              "heading": "webrtc-的组成"
            },
            {
              "depth": 2,
              "value": "文件共享",
              "heading": "文件共享"
            }
          ]
        },
        "title": "WebRTC"
      },
      {
        "path": "/browser-object-model/connectivity/web-socket",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/web-socket.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/web-socket.md",
          "updatedTime": 1593613034000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "数据通信 API",
            "order": 11,
            "path": "/browser-object-model/connectivity"
          },
          "title": "WebSocket",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Web Socket",
              "heading": "web-socket"
            },
            {
              "depth": 2,
              "value": "建立通信",
              "heading": "建立通信"
            },
            {
              "depth": 3,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "连接状态",
              "heading": "连接状态"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 4,
              "value": "Code 附录",
              "heading": "code-附录"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 2,
              "value": "WebSocket 协议",
              "heading": "websocket-协议"
            },
            {
              "depth": 3,
              "value": "握手请求",
              "heading": "握手请求"
            },
            {
              "depth": 2,
              "value": "相关类库",
              "heading": "相关类库"
            },
            {
              "depth": 2,
              "value": "兼容性",
              "heading": "兼容性"
            }
          ]
        },
        "title": "WebSocket"
      },
      {
        "path": "/browser-object-model/connectivity/xmlhttprequest",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/connectivity/xmlhttprequest.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/connectivity/xmlhttprequest.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "数据通信 API",
            "order": 11,
            "path": "/browser-object-model/connectivity"
          },
          "title": "XHMLHttpRequest API",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "XMLHttpRequest API",
              "heading": "xmlhttprequest-api"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "原型属性",
              "heading": "原型属性"
            },
            {
              "depth": 3,
              "value": "onreadystatechange",
              "heading": "onreadystatechange"
            },
            {
              "depth": 3,
              "value": "readyState",
              "heading": "readystate"
            },
            {
              "depth": 2,
              "value": "原型方法",
              "heading": "原型方法"
            },
            {
              "depth": 2,
              "value": "接收响应后",
              "heading": "接收响应后"
            },
            {
              "depth": 3,
              "value": "open",
              "heading": "open"
            },
            {
              "depth": 3,
              "value": "setRequestHeader",
              "heading": "setrequestheader"
            },
            {
              "depth": 3,
              "value": "overrideMimeType",
              "heading": "overridemimetype"
            },
            {
              "depth": 3,
              "value": "send",
              "heading": "send"
            },
            {
              "depth": 3,
              "value": "abort",
              "heading": "abort"
            },
            {
              "depth": 3,
              "value": "getRequestHeader",
              "heading": "getrequestheader"
            },
            {
              "depth": 3,
              "value": "getAllRequestHeaders",
              "heading": "getallrequestheaders"
            },
            {
              "depth": 2,
              "value": "原型事件",
              "heading": "原型事件"
            },
            {
              "depth": 2,
              "value": "应用示例",
              "heading": "应用示例"
            },
            {
              "depth": 3,
              "value": "上传数据",
              "heading": "上传数据"
            },
            {
              "depth": 3,
              "value": "下载数据",
              "heading": "下载数据"
            },
            {
              "depth": 3,
              "value": "传输进度",
              "heading": "传输进度"
            },
            {
              "depth": 3,
              "value": "定时轮询",
              "heading": "定时轮询"
            },
            {
              "depth": 3,
              "value": "长轮询",
              "heading": "长轮询"
            },
            {
              "depth": 3,
              "value": "长连接",
              "heading": "长连接"
            }
          ]
        },
        "title": "XHMLHttpRequest API"
      },
      {
        "path": "/browser-object-model/device/camera",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/device/camera.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/device/camera.md",
          "updatedTime": 1600511060000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "设备 API",
            "order": 15,
            "path": "/browser-object-model/device"
          },
          "title": "摄录设备",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "摄录设备",
              "heading": "摄录设备"
            },
            {
              "depth": 2,
              "value": "getUserMedia API",
              "heading": "getusermedia-api"
            },
            {
              "depth": 2,
              "value": "调用摄像头拍照实例",
              "heading": "调用摄像头拍照实例"
            }
          ]
        },
        "title": "摄录设备"
      },
      {
        "path": "/browser-object-model/device/geolocation",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/device/geolocation.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/device/geolocation.md",
          "updatedTime": 1600511060000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "设备 API",
            "order": 15,
            "path": "/browser-object-model/device"
          },
          "title": "地理定位 Geolocation API",
          "order": 1,
          "slugs": [
            {
              "depth": 2,
              "value": "地理定位 Geolocation API",
              "heading": "地理定位-geolocation-api"
            }
          ]
        },
        "title": "地理定位 Geolocation API"
      },
      {
        "path": "/browser-object-model/device/position",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/device/position.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/device/position.md",
          "updatedTime": 1600511060000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "设备 API",
            "order": 15,
            "path": "/browser-object-model/device"
          },
          "title": "位置信息 Position API",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "位置信息 Position API",
              "heading": "位置信息-position-api"
            },
            {
              "depth": 2,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            }
          ]
        },
        "title": "位置信息 Position API"
      },
      {
        "path": "/browser-object-model/integration/full-screen",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/integration/full-screen.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/integration/full-screen.md",
          "updatedTime": 1600511060000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "集成 API",
            "order": 16,
            "path": "/browser-object-model/integration"
          },
          "title": "全屏 Fullscreen API",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "全屏 Fullscreen API",
              "heading": "全屏-fullscreen-api"
            },
            {
              "depth": 2,
              "value": "激活全屏模式",
              "heading": "激活全屏模式"
            },
            {
              "depth": 3,
              "value": "显示差异",
              "heading": "显示差异"
            },
            {
              "depth": 3,
              "value": "通知",
              "heading": "通知"
            },
            {
              "depth": 2,
              "value": "退出全屏模式",
              "heading": "退出全屏模式"
            },
            {
              "depth": 2,
              "value": "其他信息",
              "heading": "其他信息"
            }
          ]
        },
        "title": "全屏 Fullscreen API"
      },
      {
        "path": "/browser-object-model/observer/intersection-observer",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/observer/intersection-observer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/observer/intersection-observer.md",
          "updatedTime": 1600511060000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "监视 API",
            "order": 16,
            "path": "/browser-object-model/observer"
          },
          "title": "IntersectionObserver API",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "IntersectionObserver API",
              "heading": "intersectionobserver-api"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "callback 参数",
              "heading": "callback-参数"
            },
            {
              "depth": 2,
              "value": "IntersectionObserverEntry 对象",
              "heading": "intersectionobserverentry-对象"
            },
            {
              "depth": 2,
              "value": "应用",
              "heading": "应用"
            },
            {
              "depth": 3,
              "value": "惰性加载",
              "heading": "惰性加载"
            },
            {
              "depth": 3,
              "value": "无限滚动",
              "heading": "无限滚动"
            },
            {
              "depth": 2,
              "value": "Option 对象",
              "heading": "option-对象"
            },
            {
              "depth": 3,
              "value": "threshold 属性",
              "heading": "threshold-属性"
            },
            {
              "depth": 3,
              "value": "root 和 rootMargin 属性",
              "heading": "root-和-rootmargin-属性"
            },
            {
              "depth": 2,
              "value": "注意点",
              "heading": "注意点"
            }
          ]
        },
        "title": "IntersectionObserver API"
      },
      {
        "path": "/browser-object-model/observer/mutation-observer",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/observer/mutation-observer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/observer/mutation-observer.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "监视 API",
            "order": 16,
            "path": "/browser-object-model/observer"
          },
          "title": "MutationObserver API",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "MutationObserver API",
              "heading": "mutationobserver-api"
            },
            {
              "depth": 2,
              "value": "接口定义",
              "heading": "接口定义"
            },
            {
              "depth": 2,
              "value": "应用实战",
              "heading": "应用实战"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "MutationObserver API"
      },
      {
        "path": "/browser-object-model/offline-and-storage/browser-cache",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/offline-and-storage/browser-cache.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/offline-and-storage/browser-cache.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "离线与存储 API",
            "order": 12,
            "path": "/browser-object-model/offline-and-storage"
          },
          "title": "浏览器缓存机制",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "浏览器缓存机制",
              "heading": "浏览器缓存机制"
            },
            {
              "depth": 2,
              "value": "浏览器缓存",
              "heading": "浏览器缓存"
            },
            {
              "depth": 2,
              "value": "代理服务器缓存",
              "heading": "代理服务器缓存"
            },
            {
              "depth": 2,
              "value": "网关缓存",
              "heading": "网关缓存"
            },
            {
              "depth": 2,
              "value": "数据库缓存",
              "heading": "数据库缓存"
            }
          ]
        },
        "title": "浏览器缓存机制"
      },
      {
        "path": "/browser-object-model/offline-and-storage/cookie",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/offline-and-storage/cookie.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/offline-and-storage/cookie.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "离线与存储 API",
            "order": 12,
            "path": "/browser-object-model/offline-and-storage"
          },
          "title": "Cookie",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Cookie",
              "heading": "cookie"
            },
            {
              "depth": 2,
              "value": "属性构成",
              "heading": "属性构成"
            },
            {
              "depth": 3,
              "value": "Name",
              "heading": "name"
            },
            {
              "depth": 3,
              "value": "Domain",
              "heading": "domain"
            },
            {
              "depth": 3,
              "value": "Path",
              "heading": "path"
            },
            {
              "depth": 3,
              "value": "Expires",
              "heading": "expires"
            },
            {
              "depth": 3,
              "value": "Max-Age",
              "heading": "max-age"
            },
            {
              "depth": 3,
              "value": "HTTPOnly",
              "heading": "httponly"
            },
            {
              "depth": 3,
              "value": "Secure",
              "heading": "secure"
            },
            {
              "depth": 3,
              "value": "SameSite",
              "heading": "samesite"
            },
            {
              "depth": 2,
              "value": "特性",
              "heading": "特性"
            },
            {
              "depth": 2,
              "value": "设置",
              "heading": "设置"
            },
            {
              "depth": 4,
              "value": "服务端设置 Cookie",
              "heading": "服务端设置-cookie"
            },
            {
              "depth": 4,
              "value": "客户端设置 Cookie",
              "heading": "客户端设置-cookie"
            },
            {
              "depth": 2,
              "value": "操作",
              "heading": "操作"
            },
            {
              "depth": 3,
              "value": "发送",
              "heading": "发送"
            },
            {
              "depth": 3,
              "value": "读取",
              "heading": "读取"
            },
            {
              "depth": 3,
              "value": "修改",
              "heading": "修改"
            },
            {
              "depth": 3,
              "value": "删除",
              "heading": "删除"
            },
            {
              "depth": 2,
              "value": "实现原理",
              "heading": "实现原理"
            },
            {
              "depth": 2,
              "value": "安全问题",
              "heading": "安全问题"
            },
            {
              "depth": 2,
              "value": "常用场景",
              "heading": "常用场景"
            },
            {
              "depth": 2,
              "value": "替代方案",
              "heading": "替代方案"
            },
            {
              "depth": 4,
              "value": "JWT",
              "heading": "jwt"
            },
            {
              "depth": 4,
              "value": "HTTP 认证",
              "heading": "http-认证"
            },
            {
              "depth": 4,
              "value": "IP 地址",
              "heading": "ip-地址"
            },
            {
              "depth": 4,
              "value": "URL 查询字符串",
              "heading": "url-查询字符串"
            },
            {
              "depth": 4,
              "value": "隐藏的表单字段",
              "heading": "隐藏的表单字段"
            },
            {
              "depth": 4,
              "value": "Window.name DOM 属性",
              "heading": "windowname-dom-属性"
            },
            {
              "depth": 4,
              "value": "广告主标识码",
              "heading": "广告主标识码"
            },
            {
              "depth": 4,
              "value": "ETag",
              "heading": "etag"
            },
            {
              "depth": 4,
              "value": "web 存储",
              "heading": "web-存储"
            },
            {
              "depth": 4,
              "value": "浏览器缓存",
              "heading": "浏览器缓存"
            },
            {
              "depth": 4,
              "value": "浏览器指纹",
              "heading": "浏览器指纹"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Cookie"
      },
      {
        "path": "/browser-object-model/offline-and-storage/http-cache",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/offline-and-storage/http-cache.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/offline-and-storage/http-cache.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "离线与存储 API",
            "order": 12,
            "path": "/browser-object-model/offline-and-storage"
          },
          "title": "HTTP Cache",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP Cache",
              "heading": "http-cache"
            },
            {
              "depth": 2,
              "value": "缓存类型",
              "heading": "缓存类型"
            },
            {
              "depth": 2,
              "value": "强缓存",
              "heading": "强缓存"
            },
            {
              "depth": 3,
              "value": "强缓存规则",
              "heading": "强缓存规则"
            },
            {
              "depth": 3,
              "value": "强缓存首部字段",
              "heading": "强缓存首部字段"
            },
            {
              "depth": 4,
              "value": "Expires",
              "heading": "expires"
            },
            {
              "depth": 4,
              "value": "Cache-Control",
              "heading": "cache-control"
            },
            {
              "depth": 2,
              "value": "协商缓存",
              "heading": "协商缓存"
            },
            {
              "depth": 3,
              "value": "协商缓存规则",
              "heading": "协商缓存规则"
            },
            {
              "depth": 3,
              "value": "协商缓存首部字段",
              "heading": "协商缓存首部字段"
            },
            {
              "depth": 4,
              "value": "Last-Modified",
              "heading": "last-modified"
            },
            {
              "depth": 4,
              "value": "If-Modified-Since",
              "heading": "if-modified-since"
            },
            {
              "depth": 4,
              "value": "If-Unmodified-Since",
              "heading": "if-unmodified-since"
            },
            {
              "depth": 4,
              "value": "ETag",
              "heading": "etag"
            },
            {
              "depth": 4,
              "value": "If-None-Match",
              "heading": "if-none-match"
            },
            {
              "depth": 4,
              "value": "If-Match",
              "heading": "if-match"
            },
            {
              "depth": 2,
              "value": "启发式缓存阶段",
              "heading": "启发式缓存阶段"
            },
            {
              "depth": 2,
              "value": "其他缓存字段",
              "heading": "其他缓存字段"
            },
            {
              "depth": 3,
              "value": "Pragma",
              "heading": "pragma"
            },
            {
              "depth": 3,
              "value": "Date",
              "heading": "date"
            },
            {
              "depth": 3,
              "value": "Age",
              "heading": "age"
            },
            {
              "depth": 3,
              "value": "Vary",
              "heading": "vary"
            },
            {
              "depth": 2,
              "value": "最佳优化策略",
              "heading": "最佳优化策略"
            },
            {
              "depth": 3,
              "value": "缓存资源类型",
              "heading": "缓存资源类型"
            },
            {
              "depth": 3,
              "value": "用户行为分析",
              "heading": "用户行为分析"
            },
            {
              "depth": 3,
              "value": "阻止浏览器缓存静态资源",
              "heading": "阻止浏览器缓存静态资源"
            },
            {
              "depth": 2,
              "value": "HTTP 缓存总结",
              "heading": "http-缓存总结"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP Cache"
      },
      {
        "path": "/browser-object-model/offline-and-storage/indexed-db",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/offline-and-storage/indexedDB.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/offline-and-storage/indexedDB.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "离线与存储 API",
            "order": 12,
            "path": "/browser-object-model/offline-and-storage"
          },
          "title": "IndexedDB",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "IndexedDB",
              "heading": "indexeddb"
            },
            {
              "depth": 2,
              "value": "离线存储",
              "heading": "离线存储"
            },
            {
              "depth": 2,
              "value": "基本概念",
              "heading": "基本概念"
            },
            {
              "depth": 3,
              "value": "Database",
              "heading": "database"
            },
            {
              "depth": 3,
              "value": "Object Store",
              "heading": "object-store"
            },
            {
              "depth": 3,
              "value": "Index",
              "heading": "index"
            },
            {
              "depth": 3,
              "value": "Transaction",
              "heading": "transaction"
            },
            {
              "depth": 3,
              "value": "Cursor",
              "heading": "cursor"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "创建数据库",
              "heading": "创建数据库"
            },
            {
              "depth": 3,
              "value": "添加数据",
              "heading": "添加数据"
            },
            {
              "depth": 3,
              "value": "获取数据",
              "heading": "获取数据"
            },
            {
              "depth": 3,
              "value": "删除数据",
              "heading": "删除数据"
            },
            {
              "depth": 3,
              "value": "更新数据",
              "heading": "更新数据"
            },
            {
              "depth": 3,
              "value": "遍历获取",
              "heading": "遍历获取"
            },
            {
              "depth": 3,
              "value": "批量删除",
              "heading": "批量删除"
            },
            {
              "depth": 2,
              "value": "第三方依赖库",
              "heading": "第三方依赖库"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "IndexedDB"
      },
      {
        "path": "/browser-object-model/offline-and-storage/service-worker",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/offline-and-storage/service-worker.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/offline-and-storage/service-worker.md",
          "updatedTime": 1600511060000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "离线与存储 API",
            "order": 12,
            "path": "/browser-object-model/offline-and-storage"
          },
          "title": "Service Worker",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Service Worker",
              "heading": "service-worker"
            },
            {
              "depth": 2,
              "value": "概述",
              "heading": "概述"
            },
            {
              "depth": 2,
              "value": "生命周期",
              "heading": "生命周期"
            },
            {
              "depth": 3,
              "value": "下载",
              "heading": "下载"
            },
            {
              "depth": 3,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 3,
              "value": "激活",
              "heading": "激活"
            },
            {
              "depth": 2,
              "value": "处理 Service Worker 内部的安装过程",
              "heading": "处理-service-worker-内部的安装过程"
            },
            {
              "depth": 2,
              "value": "缓存运行时请求",
              "heading": "缓存运行时请求"
            },
            {
              "depth": 2,
              "value": "更新 Service Worker",
              "heading": "更新-service-worker"
            },
            {
              "depth": 2,
              "value": "从缓存中删除数据",
              "heading": "从缓存中删除数据"
            },
            {
              "depth": 2,
              "value": "注意事项",
              "heading": "注意事项"
            },
            {
              "depth": 3,
              "value": "Cookie 设置",
              "heading": "cookie-设置"
            },
            {
              "depth": 3,
              "value": "HTTPS 要求",
              "heading": "https-要求"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 2,
              "value": "浏览器支持情况",
              "heading": "浏览器支持情况"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ]
        },
        "title": "Service Worker"
      },
      {
        "path": "/browser-object-model/offline-and-storage/web-storage",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/offline-and-storage/web-storage.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/offline-and-storage/web-storage.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "离线与存储 API",
            "order": 12,
            "path": "/browser-object-model/offline-and-storage"
          },
          "title": "Web Storage",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Web Storage",
              "heading": "web-storage"
            },
            {
              "depth": 2,
              "value": "缓存静态文件",
              "heading": "缓存静态文件"
            },
            {
              "depth": 2,
              "value": "Web Storage API",
              "heading": "web-storage-api"
            },
            {
              "depth": 3,
              "value": "添加键值",
              "heading": "添加键值"
            },
            {
              "depth": 3,
              "value": "获取键值",
              "heading": "获取键值"
            },
            {
              "depth": 3,
              "value": "删除键值",
              "heading": "删除键值"
            },
            {
              "depth": 3,
              "value": "清除所有键值",
              "heading": "清除所有键值"
            },
            {
              "depth": 3,
              "value": "获取键名",
              "heading": "获取键名"
            },
            {
              "depth": 3,
              "value": "获取键值数量",
              "heading": "获取键值数量"
            },
            {
              "depth": 2,
              "value": "Web Storage 事件",
              "heading": "web-storage-事件"
            },
            {
              "depth": 2,
              "value": "使用场景",
              "heading": "使用场景"
            },
            {
              "depth": 2,
              "value": "Web Storage 和 Cookie",
              "heading": "web-storage-和-cookie"
            }
          ]
        },
        "title": "Web Storage"
      },
      {
        "path": "/browser-object-model/offline-and-storage/web-workers",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/offline-and-storage/web-workers.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/offline-and-storage/web-workers.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "离线与存储 API",
            "order": 12,
            "path": "/browser-object-model/offline-and-storage"
          },
          "title": "Web Workers",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Web Workers",
              "heading": "web-workers"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "主线程",
              "heading": "主线程"
            },
            {
              "depth": 2,
              "value": "Worker 线程",
              "heading": "worker-线程"
            },
            {
              "depth": 3,
              "value": "终止",
              "heading": "终止"
            },
            {
              "depth": 3,
              "value": "加载脚本",
              "heading": "加载脚本"
            },
            {
              "depth": 3,
              "value": "错误处理",
              "heading": "错误处理"
            },
            {
              "depth": 2,
              "value": "数据通信",
              "heading": "数据通信"
            },
            {
              "depth": 2,
              "value": "同页面的 Web Worker",
              "heading": "同页面的-web-worker"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 2,
              "value": "实例：Worker 线程完成轮询",
              "heading": "实例：worker-线程完成轮询"
            },
            {
              "depth": 2,
              "value": "实例：Worker 新建 Worker",
              "heading": "实例：worker-新建-worker"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "主线程",
              "heading": "主线程-1"
            },
            {
              "depth": 3,
              "value": "Worker 线程",
              "heading": "worker-线程-1"
            }
          ]
        },
        "title": "Web Workers"
      },
      {
        "path": "/browser-object-model/performance/performance-navigation-timing",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/performance/performance-navigation-timing.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/performance/performance-navigation-timing.md",
          "updatedTime": 1600510946000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "性能 API",
            "order": 13,
            "path": "/browser-object-model/performance"
          },
          "title": "Performance Navifation API",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Performance Navifation API",
              "heading": "performance-navifation-api"
            }
          ]
        },
        "title": "Performance Navifation API"
      },
      {
        "path": "/browser-object-model/performance/performance-resource-timing",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/performance/performance-resource-timing.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/performance/performance-resource-timing.md",
          "updatedTime": 1600510946000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "性能 API",
            "order": 13,
            "path": "/browser-object-model/performance"
          },
          "title": "Performance Resource Timing API",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Performance Resource Timing API",
              "heading": "performance-resource-timing-api"
            }
          ]
        },
        "title": "Performance Resource Timing API"
      },
      {
        "path": "/browser-object-model/performance/performance",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/performance/performance.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/performance/performance.md",
          "updatedTime": 1600510946000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "性能 API",
            "order": 13,
            "path": "/browser-object-model/performance"
          },
          "title": "Performance API",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Performance API",
              "heading": "performance-api"
            }
          ]
        },
        "title": "Performance API"
      },
      {
        "path": "/browser-object-model/performance/perfromance-timeline",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/performance/perfromance-timeline.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/performance/perfromance-timeline.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "性能 API",
            "order": 13,
            "path": "/browser-object-model/performance"
          },
          "title": "性能时间线",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "性能时间线",
              "heading": "性能时间线"
            }
          ]
        },
        "title": "性能时间线"
      },
      {
        "path": "/browser-object-model/web-event/dialog",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/web-event/dialog.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/web-event/dialog.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局 API",
            "order": 2,
            "path": "/browser-object-model/web-event"
          },
          "title": "对话框 API",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "对话框 API",
              "heading": "对话框-api"
            },
            {
              "depth": 2,
              "value": "alert",
              "heading": "alert"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 4,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 4,
              "value": "换行",
              "heading": "换行"
            },
            {
              "depth": 2,
              "value": "confirm",
              "heading": "confirm"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例-1"
            },
            {
              "depth": 2,
              "value": "prompt",
              "heading": "prompt"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例-2"
            }
          ]
        },
        "title": "对话框 API"
      },
      {
        "path": "/browser-object-model/web-event/get-computed-style",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/web-event/get-computed-style.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/web-event/get-computed-style.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局 API",
            "order": 2,
            "path": "/browser-object-model/web-event"
          },
          "title": "getComputedStyle",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "getComputedStyle",
              "heading": "getcomputedstyle"
            }
          ]
        },
        "title": "getComputedStyle"
      },
      {
        "path": "/browser-object-model/web-event/lifecycle",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/web-event/lifecycle.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/web-event/lifecycle.md",
          "updatedTime": 1637579539000,
          "slugs": [
            {
              "depth": 1,
              "value": "页面生命周期方法",
              "heading": "页面生命周期方法"
            },
            {
              "depth": 2,
              "value": "readyState",
              "heading": "readystate"
            },
            {
              "depth": 2,
              "value": "readystatechange",
              "heading": "readystatechange"
            },
            {
              "depth": 2,
              "value": "DOMContentLoaded",
              "heading": "domcontentloaded"
            },
            {
              "depth": 3,
              "value": "与脚本文件的关系",
              "heading": "与脚本文件的关系"
            },
            {
              "depth": 3,
              "value": "与样式文件的关系",
              "heading": "与样式文件的关系"
            },
            {
              "depth": 3,
              "value": "浏览器内置的自动填充",
              "heading": "浏览器内置的自动填充"
            },
            {
              "depth": 2,
              "value": "window.onload",
              "heading": "windowonload"
            },
            {
              "depth": 2,
              "value": "window.onbeforeunload",
              "heading": "windowonbeforeunload"
            },
            {
              "depth": 2,
              "value": "window.onunload",
              "heading": "windowonunload"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ],
          "title": "页面生命周期方法",
          "nav": {
            "path": "/browser-object-model",
            "title": "BOM"
          },
          "group": {
            "path": "/browser-object-model/web-event",
            "title": "全局 API"
          }
        },
        "title": "页面生命周期方法"
      },
      {
        "path": "/browser-object-model/web-event/request-animation-frame",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/web-event/request-animation-frame.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/web-event/request-animation-frame.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局 API",
            "order": 2,
            "path": "/browser-object-model/web-event"
          },
          "title": "requestAnimationFrame",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "requestAnimationFrame",
              "heading": "requestanimationframe"
            },
            {
              "depth": 2,
              "value": "传统动画渲染的弊端",
              "heading": "传统动画渲染的弊端"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "requestAnimationFrame",
              "heading": "requestanimationframe-1"
            },
            {
              "depth": 3,
              "value": "cancelAnimationFrame",
              "heading": "cancelanimationframe"
            },
            {
              "depth": 2,
              "value": "优点",
              "heading": "优点"
            },
            {
              "depth": 2,
              "value": "兼容性",
              "heading": "兼容性"
            },
            {
              "depth": 2,
              "value": "传递参数",
              "heading": "传递参数"
            }
          ]
        },
        "title": "requestAnimationFrame"
      },
      {
        "path": "/browser-object-model/web-event/request-idle-callback",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/web-event/request-idle-callback.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/web-event/request-idle-callback.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局 API",
            "order": 2,
            "path": "/browser-object-model/web-event"
          },
          "title": "requestIdleCallback",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "requestIdleCallback",
              "heading": "requestidlecallback"
            },
            {
              "depth": 2,
              "value": "掉帧与时间切片",
              "heading": "掉帧与时间切片"
            }
          ]
        },
        "title": "requestIdleCallback"
      },
      {
        "path": "/browser-object-model/web-event/set-interval",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/web-event/set-interval.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/web-event/set-interval.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局 API",
            "order": 2,
            "path": "/browser-object-model/web-event"
          },
          "title": "setInterval",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "setInterval",
              "heading": "setinterval"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "注意",
              "heading": "注意"
            },
            {
              "depth": 2,
              "value": "停止间歇调用",
              "heading": "停止间歇调用"
            },
            {
              "depth": 2,
              "value": "使用方法",
              "heading": "使用方法"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            }
          ]
        },
        "title": "setInterval"
      },
      {
        "path": "/browser-object-model/web-event/set-time-out",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/web-event/set-time-out.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/web-event/set-time-out.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局 API",
            "order": 2,
            "path": "/browser-object-model/web-event"
          },
          "title": "setTimeout",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "setTimeout",
              "heading": "settimeout"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "停止超时调用",
              "heading": "停止超时调用"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "实现间歇调用",
              "heading": "实现间歇调用"
            }
          ]
        },
        "title": "setTimeout"
      },
      {
        "path": "/browser-object-model/window/history",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window/history.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window/history.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局对象",
            "order": 1,
            "path": "/browser-object-model/window"
          },
          "title": "History 对象",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "History 对象",
              "heading": "history-对象"
            },
            {
              "depth": 2,
              "value": "History 方法",
              "heading": "history-方法"
            },
            {
              "depth": 3,
              "value": "history.go",
              "heading": "historygo"
            },
            {
              "depth": 3,
              "value": "history.back",
              "heading": "historyback"
            },
            {
              "depth": 3,
              "value": "history.forward",
              "heading": "historyforward"
            },
            {
              "depth": 3,
              "value": "history.pushState",
              "heading": "historypushstate"
            },
            {
              "depth": 3,
              "value": "history.replaceState()",
              "heading": "historyreplacestate"
            },
            {
              "depth": 3,
              "value": "window.onpopstate",
              "heading": "windowonpopstate"
            },
            {
              "depth": 3,
              "value": "浏览器兼容性",
              "heading": "浏览器兼容性"
            },
            {
              "depth": 2,
              "value": "History 属性",
              "heading": "history-属性"
            },
            {
              "depth": 3,
              "value": "history.length",
              "heading": "historylength"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 3,
              "value": "后退阻断",
              "heading": "后退阻断"
            }
          ]
        },
        "title": "History 对象"
      },
      {
        "path": "/browser-object-model/window/location",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window/location.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window/location.md",
          "updatedTime": 1600511060000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局对象",
            "order": 1,
            "path": "/browser-object-model/window"
          },
          "title": "Location 对象",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Location 对象",
              "heading": "location-对象"
            },
            {
              "depth": 2,
              "value": "location.assign()",
              "heading": "locationassign"
            },
            {
              "depth": 2,
              "value": "location.replace()",
              "heading": "locationreplace"
            },
            {
              "depth": 2,
              "value": "location.reload()",
              "heading": "locationreload"
            },
            {
              "depth": 1,
              "value": "Location 对象的属性",
              "heading": "location-对象的属性"
            },
            {
              "depth": 3,
              "value": "查询字符串参数",
              "heading": "查询字符串参数"
            }
          ]
        },
        "title": "Location 对象"
      },
      {
        "path": "/browser-object-model/window/navigator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window/navigator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window/navigator.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局对象",
            "order": 1,
            "path": "/browser-object-model/window"
          },
          "title": "Navigator 对象",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Navigator 对象",
              "heading": "navigator-对象"
            },
            {
              "depth": 2,
              "value": "Navigator Geolocation API",
              "heading": "navigator-geolocation-api"
            },
            {
              "depth": 3,
              "value": "获取当前定位",
              "heading": "获取当前定位"
            },
            {
              "depth": 4,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 4,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "监视定位",
              "heading": "监视定位"
            },
            {
              "depth": 3,
              "value": "使用案例",
              "heading": "使用案例"
            },
            {
              "depth": 2,
              "value": "Navigator 对象的属性",
              "heading": "navigator-对象的属性"
            }
          ]
        },
        "title": "Navigator 对象"
      },
      {
        "path": "/browser-object-model/window/screen",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window/screen.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window/screen.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局对象",
            "order": 1,
            "path": "/browser-object-model/window"
          },
          "title": "Screen 对象",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Screen 对象",
              "heading": "screen-对象"
            },
            {
              "depth": 2,
              "value": "Screen Orientation API",
              "heading": "screen-orientation-api"
            },
            {
              "depth": 3,
              "value": "使用方法",
              "heading": "使用方法"
            },
            {
              "depth": 4,
              "value": "lockOrientation()",
              "heading": "lockorientation"
            },
            {
              "depth": 4,
              "value": "unlockOrientation()",
              "heading": "unlockorientation"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "兼容性",
              "heading": "兼容性"
            },
            {
              "depth": 2,
              "value": "Screen 对象的属性",
              "heading": "screen-对象的属性"
            }
          ]
        },
        "title": "Screen 对象"
      },
      {
        "path": "/browser-object-model/window/window",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window/window.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window/window.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "全局对象",
            "order": 1,
            "path": "/browser-object-model/window"
          },
          "title": "Window 对象",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Window 对象",
              "heading": "window-对象"
            },
            {
              "depth": 2,
              "value": "Window 对象的属性",
              "heading": "window-对象的属性"
            },
            {
              "depth": 2,
              "value": "Window 对象的方法",
              "heading": "window-对象的方法"
            },
            {
              "depth": 2,
              "value": "全局作用域",
              "heading": "全局作用域"
            }
          ]
        },
        "title": "Window 对象"
      },
      {
        "path": "/browser-object-model/window-position/document-view-and-element-view",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window-position/document-view-and-element-view.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window-position/document-view-and-element-view.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "视窗尺寸位置",
            "order": 5,
            "path": "/browser-object-model/window-position"
          },
          "title": "文档视图和元素视图",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "文档视图和元素视图",
              "heading": "文档视图和元素视图"
            },
            {
              "depth": 2,
              "value": "elementFromPoint",
              "heading": "elementfrompoint"
            },
            {
              "depth": 2,
              "value": "getClientRects() 获取元素占据页面的所有矩形区域",
              "heading": "getclientrects-获取元素占据页面的所有矩形区域"
            },
            {
              "depth": 2,
              "value": "getBoundingClientRect() 获取元素位置",
              "heading": "getboundingclientrect-获取元素位置"
            },
            {
              "depth": 2,
              "value": "scrollIntoView()",
              "heading": "scrollintoview"
            }
          ]
        },
        "title": "文档视图和元素视图"
      },
      {
        "path": "/browser-object-model/window-position/element-view-properties",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window-position/element-view-properties.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window-position/element-view-properties.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "视窗尺寸位置",
            "order": 5,
            "path": "/browser-object-model/window-position"
          },
          "title": "Element 文档元素视图属性",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Element 文档元素视图属性",
              "heading": "element-文档元素视图属性"
            },
            {
              "depth": 2,
              "value": "偏移量",
              "heading": "偏移量"
            },
            {
              "depth": 3,
              "value": "定位父级 offsetParent",
              "heading": "定位父级-offsetparent"
            },
            {
              "depth": 4,
              "value": "元素固定定位",
              "heading": "元素固定定位"
            },
            {
              "depth": 4,
              "value": "元素非固定定位，最近父元素未定位",
              "heading": "元素非固定定位，最近父元素未定位"
            },
            {
              "depth": 4,
              "value": "元素非固定定位，父元素已定位",
              "heading": "元素非固定定位，父元素已定位"
            },
            {
              "depth": 4,
              "value": "根元素",
              "heading": "根元素"
            },
            {
              "depth": 2,
              "value": "边距偏移量 offsetLeft 和 offsetTop",
              "heading": "边距偏移量-offsetleft-和-offsettop"
            },
            {
              "depth": 3,
              "value": "offsetLeft",
              "heading": "offsetleft"
            },
            {
              "depth": 3,
              "value": "offsetTop",
              "heading": "offsettop"
            },
            {
              "depth": 2,
              "value": "宽高偏移量 offsetWidth 和 offsetHeight",
              "heading": "宽高偏移量-offsetwidth-和-offsetheight"
            },
            {
              "depth": 3,
              "value": "offsetWidth",
              "heading": "offsetwidth"
            },
            {
              "depth": 3,
              "value": "offsetHeight",
              "heading": "offsetheight"
            },
            {
              "depth": 3,
              "value": "偏移量注意事项",
              "heading": "偏移量注意事项"
            },
            {
              "depth": 2,
              "value": "内容可视区",
              "heading": "内容可视区"
            },
            {
              "depth": 3,
              "value": "内容可视区宽高 clientWidth 和 clientHeight",
              "heading": "内容可视区宽高-clientwidth-和-clientheight"
            },
            {
              "depth": 3,
              "value": "内容可视区边距 clientLeft 和 clientTop",
              "heading": "内容可视区边距-clientleft-和-clienttop"
            },
            {
              "depth": 3,
              "value": "兼容性",
              "heading": "兼容性"
            },
            {
              "depth": 2,
              "value": "内容滚动区",
              "heading": "内容滚动区"
            },
            {
              "depth": 3,
              "value": "内容滚动区宽高 scrollWidth 和 scrollHeight",
              "heading": "内容滚动区宽高-scrollwidth-和-scrollheight"
            },
            {
              "depth": 3,
              "value": "内容滚动区边距 scrollLeft 和 scrollTop",
              "heading": "内容滚动区边距-scrollleft-和-scrolltop"
            }
          ]
        },
        "title": "Element 文档元素视图属性"
      },
      {
        "path": "/browser-object-model/window-position/mouse-position",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window-position/mouse-position.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window-position/mouse-position.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "视窗尺寸位置",
            "order": 5,
            "path": "/browser-object-model/window-position"
          },
          "title": "鼠标位置",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "鼠标位置",
              "heading": "鼠标位置"
            },
            {
              "depth": 2,
              "value": "clientX/clientY",
              "heading": "clientxclienty"
            },
            {
              "depth": 2,
              "value": "offsetX/offsetY",
              "heading": "offsetxoffsety"
            },
            {
              "depth": 2,
              "value": "pageX/pageY",
              "heading": "pagexpagey"
            },
            {
              "depth": 2,
              "value": "screenX/screenY",
              "heading": "screenxscreeny"
            },
            {
              "depth": 2,
              "value": "X/Y",
              "heading": "xy"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ]
        },
        "title": "鼠标位置"
      },
      {
        "path": "/browser-object-model/window-position/screen-view-properties",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window-position/screen-view-properties.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window-position/screen-view-properties.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "视窗尺寸位置",
            "order": 5,
            "path": "/browser-object-model/window-position"
          },
          "title": "Screen 对象视图属性",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Screen 对象视图属性",
              "heading": "screen-对象视图属性"
            },
            {
              "depth": 2,
              "value": "屏幕分辨率宽高",
              "heading": "屏幕分辨率宽高"
            },
            {
              "depth": 3,
              "value": "最佳实践",
              "heading": "最佳实践"
            },
            {
              "depth": 2,
              "value": "屏幕可用工作区宽高",
              "heading": "屏幕可用工作区宽高"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ]
        },
        "title": "Screen 对象视图属性"
      },
      {
        "path": "/browser-object-model/window-position/window-view-properties",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/browser-object-model/window-position/window-view-properties.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/browser-object-model/window-position/window-view-properties.md",
          "updatedTime": 1593706731000,
          "nav": {
            "title": "BOM",
            "order": 5,
            "path": "/browser-object-model"
          },
          "group": {
            "title": "视窗尺寸位置",
            "order": 5,
            "path": "/browser-object-model/window-position"
          },
          "title": "Window 对象视图属性",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Window 对象视图属性",
              "heading": "window-对象视图属性"
            },
            {
              "depth": 2,
              "value": "浏览器宽高",
              "heading": "浏览器宽高"
            },
            {
              "depth": 2,
              "value": "浏览器网页视口宽高",
              "heading": "浏览器网页视口宽高"
            },
            {
              "depth": 2,
              "value": "浏览器距屏幕边距",
              "heading": "浏览器距屏幕边距"
            },
            {
              "depth": 2,
              "value": "浏览器网页视口滚动偏移",
              "heading": "浏览器网页视口滚动偏移"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ]
        },
        "title": "Window 对象视图属性"
      },
      {
        "path": "/computer-networks",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/index.md",
          "updatedTime": 1601648011000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "计算机网络",
            "order": 1,
            "path": "/computer-networks"
          },
          "title": "计算机网络",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "计算机网络",
              "heading": "计算机网络"
            }
          ]
        },
        "title": "计算机网络"
      },
      {
        "path": "/computer-networks/computer-network-architecture/cdn",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/computer-network-architecture/cdn.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/computer-network-architecture/cdn.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "计算机网络体系",
            "order": 2,
            "path": "/computer-networks/computer-network-architecture"
          },
          "title": "CDN 内容分发网络",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "CDN 内容分发网络",
              "heading": "cdn-内容分发网络"
            },
            {
              "depth": 2,
              "value": "工作原理",
              "heading": "工作原理"
            },
            {
              "depth": 2,
              "value": "工作流程",
              "heading": "工作流程"
            },
            {
              "depth": 2,
              "value": "组成部分",
              "heading": "组成部分"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 3,
              "value": "网站加速",
              "heading": "网站加速"
            },
            {
              "depth": 3,
              "value": "超大文件下载",
              "heading": "超大文件下载"
            },
            {
              "depth": 3,
              "value": "音视频点播",
              "heading": "音视频点播"
            },
            {
              "depth": 3,
              "value": "音视频直播",
              "heading": "音视频直播"
            },
            {
              "depth": 3,
              "value": "边缘程序",
              "heading": "边缘程序"
            },
            {
              "depth": 2,
              "value": "衡量指标",
              "heading": "衡量指标"
            },
            {
              "depth": 3,
              "value": "通用指标",
              "heading": "通用指标"
            },
            {
              "depth": 3,
              "value": "加速小文件的主要指标",
              "heading": "加速小文件的主要指标"
            },
            {
              "depth": 3,
              "value": "加速大文件下载的主要指标",
              "heading": "加速大文件下载的主要指标"
            },
            {
              "depth": 3,
              "value": "加速音视频点播的主要指标",
              "heading": "加速音视频点播的主要指标"
            },
            {
              "depth": 2,
              "value": "CDN 提供商",
              "heading": "cdn-提供商"
            },
            {
              "depth": 3,
              "value": "动态 CDN",
              "heading": "动态-cdn"
            },
            {
              "depth": 3,
              "value": "刷新预热",
              "heading": "刷新预热"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "CDN 内容分发网络"
      },
      {
        "path": "/computer-networks/computer-network-architecture/computer-networks",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/computer-network-architecture/computer-networks.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/computer-network-architecture/computer-networks.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "计算机网络体系",
            "order": 2,
            "path": "/computer-networks/computer-network-architecture"
          },
          "title": "计算机网络体系",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "计算机网络体系",
              "heading": "计算机网络体系"
            },
            {
              "depth": 2,
              "value": "OSI 七层模型",
              "heading": "osi-七层模型"
            },
            {
              "depth": 2,
              "value": "TCP/IP 概念层模型",
              "heading": "tcpip-概念层模型"
            }
          ]
        },
        "title": "计算机网络体系"
      },
      {
        "path": "/computer-networks/computer-network-architecture/dns",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/computer-network-architecture/dns.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/computer-network-architecture/dns.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "计算机网络体系",
            "order": 2,
            "path": "/computer-networks/computer-network-architecture"
          },
          "title": "DNS 域名解析系统",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "DNS 域名解析系统",
              "heading": "dns-域名解析系统"
            },
            {
              "depth": 2,
              "value": "域名的分层结构",
              "heading": "域名的分层结构"
            },
            {
              "depth": 2,
              "value": "查询类型",
              "heading": "查询类型"
            },
            {
              "depth": 3,
              "value": "递归查询",
              "heading": "递归查询"
            },
            {
              "depth": 3,
              "value": "迭代查询",
              "heading": "迭代查询"
            },
            {
              "depth": 2,
              "value": "分层结构",
              "heading": "分层结构"
            },
            {
              "depth": 2,
              "value": "记录类型",
              "heading": "记录类型"
            },
            {
              "depth": 2,
              "value": "解析过程",
              "heading": "解析过程"
            },
            {
              "depth": 2,
              "value": "排查与优化",
              "heading": "排查与优化"
            },
            {
              "depth": 3,
              "value": "常见问题",
              "heading": "常见问题"
            },
            {
              "depth": 3,
              "value": "故障排查顺序",
              "heading": "故障排查顺序"
            },
            {
              "depth": 3,
              "value": "常见优化技术",
              "heading": "常见优化技术"
            },
            {
              "depth": 3,
              "value": "常见优化方法",
              "heading": "常见优化方法"
            },
            {
              "depth": 3,
              "value": "DNS 污染解决方案",
              "heading": "dns-污染解决方案"
            },
            {
              "depth": 2,
              "value": "DNS 术语",
              "heading": "dns-术语"
            },
            {
              "depth": 2,
              "value": "常用 DNS",
              "heading": "常用-dns"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "DNS 域名解析系统"
      },
      {
        "path": "/computer-networks/computer-network-architecture/hls",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/computer-network-architecture/hls.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/computer-network-architecture/hls.md",
          "updatedTime": 1633898450000,
          "slugs": [
            {
              "depth": 1,
              "value": "HLS 流媒体网络传输协议",
              "heading": "hls-流媒体网络传输协议"
            },
            {
              "depth": 2,
              "value": "实现原理",
              "heading": "实现原理"
            },
            {
              "depth": 2,
              "value": "M3U8 索引文件",
              "heading": "m3u8-索引文件"
            },
            {
              "depth": 2,
              "value": "技术架构",
              "heading": "技术架构"
            },
            {
              "depth": 3,
              "value": "Server",
              "heading": "server"
            },
            {
              "depth": 3,
              "value": "Distribution",
              "heading": "distribution"
            },
            {
              "depth": 3,
              "value": "Client",
              "heading": "client"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ],
          "title": "HLS 流媒体网络传输协议",
          "nav": {
            "path": "/computer-networks",
            "title": "计算机网络"
          },
          "group": {
            "path": "/computer-networks/computer-network-architecture",
            "title": "计算机网络体系"
          }
        },
        "title": "HLS 流媒体网络传输协议"
      },
      {
        "path": "/computer-networks/computer-network-architecture/network-layer-and-data-link-layer-protocol",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/computer-network-architecture/network-layer-and-data-link-layer-protocol.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/computer-network-architecture/network-layer-and-data-link-layer-protocol.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "计算机网络体系",
            "order": 2,
            "path": "/computer-networks/computer-network-architecture"
          },
          "title": "网络层与数据链路层协议",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "网络层与数据链路层协议",
              "heading": "网络层与数据链路层协议"
            },
            {
              "depth": 2,
              "value": "IPv4 分类地址",
              "heading": "ipv4-分类地址"
            },
            {
              "depth": 2,
              "value": "CIDR 子网掩码",
              "heading": "cidr-子网掩码"
            },
            {
              "depth": 2,
              "value": "链路层 MAC 地址",
              "heading": "链路层-mac-地址"
            },
            {
              "depth": 2,
              "value": "地址解析协议 ARP",
              "heading": "地址解析协议-arp"
            },
            {
              "depth": 2,
              "value": "NAT 地址转换",
              "heading": "nat-地址转换"
            },
            {
              "depth": 2,
              "value": "IPv6",
              "heading": "ipv6"
            },
            {
              "depth": 3,
              "value": "格式",
              "heading": "格式"
            }
          ]
        },
        "title": "网络层与数据链路层协议"
      },
      {
        "path": "/computer-networks/computer-network-architecture/transport-layer-protocol",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/computer-network-architecture/transport-layer-protocol.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/computer-network-architecture/transport-layer-protocol.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "计算机网络体系",
            "order": 2,
            "path": "/computer-networks/computer-network-architecture"
          },
          "title": "传输层协议",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "传输层协议",
              "heading": "传输层协议"
            },
            {
              "depth": 2,
              "value": "TCP",
              "heading": "tcp"
            },
            {
              "depth": 3,
              "value": "数据包结构",
              "heading": "数据包结构"
            },
            {
              "depth": 3,
              "value": "三次握手",
              "heading": "三次握手"
            },
            {
              "depth": 4,
              "value": "握手的目标",
              "heading": "握手的目标"
            },
            {
              "depth": 4,
              "value": "三次握手流程图",
              "heading": "三次握手流程图"
            },
            {
              "depth": 4,
              "value": "握手报文",
              "heading": "握手报文"
            },
            {
              "depth": 4,
              "value": "其他问题",
              "heading": "其他问题"
            },
            {
              "depth": 3,
              "value": "四次挥手",
              "heading": "四次挥手"
            },
            {
              "depth": 3,
              "value": "重传机制",
              "heading": "重传机制"
            },
            {
              "depth": 3,
              "value": "拥塞控制机制",
              "heading": "拥塞控制机制"
            },
            {
              "depth": 3,
              "value": "流量控制机制",
              "heading": "流量控制机制"
            },
            {
              "depth": 3,
              "value": "可靠传输机制",
              "heading": "可靠传输机制"
            },
            {
              "depth": 2,
              "value": "UDP",
              "heading": "udp"
            },
            {
              "depth": 3,
              "value": "特点",
              "heading": "特点"
            },
            {
              "depth": 3,
              "value": "实践",
              "heading": "实践"
            },
            {
              "depth": 2,
              "value": "数据通信形式",
              "heading": "数据通信形式"
            },
            {
              "depth": 2,
              "value": "TCP 与 UDP",
              "heading": "tcp-与-udp"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "传输层协议"
      },
      {
        "path": "/computer-networks/http/content-security-policy",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/content-security-policy.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/content-security-policy.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP CSP 内容安全策略",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP CSP 内容安全策略",
              "heading": "http-csp-内容安全策略"
            },
            {
              "depth": 2,
              "value": "指令选项",
              "heading": "指令选项"
            },
            {
              "depth": 3,
              "value": "资源加载指令",
              "heading": "资源加载指令"
            },
            {
              "depth": 3,
              "value": "default-src",
              "heading": "default-src"
            },
            {
              "depth": 3,
              "value": "其他限制",
              "heading": "其他限制"
            },
            {
              "depth": 3,
              "value": "report-uri",
              "heading": "report-uri"
            },
            {
              "depth": 2,
              "value": "选项值",
              "heading": "选项值"
            },
            {
              "depth": 2,
              "value": "script-src 的特殊值",
              "heading": "script-src-的特殊值"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP CSP 内容安全策略"
      },
      {
        "path": "/computer-networks/http/cross-origin-resource-sharing",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/cross-origin-resource-sharing.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/cross-origin-resource-sharing.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP CORS 跨域资源共享",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP CORS 跨域资源共享",
              "heading": "http-cors-跨域资源共享"
            },
            {
              "depth": 2,
              "value": "实现条件",
              "heading": "实现条件"
            },
            {
              "depth": 3,
              "value": "简单请求",
              "heading": "简单请求"
            },
            {
              "depth": 3,
              "value": "非简单请求",
              "heading": "非简单请求"
            },
            {
              "depth": 2,
              "value": "预请求 Preflight",
              "heading": "预请求-preflight"
            },
            {
              "depth": 3,
              "value": "减少预请求次数",
              "heading": "减少预请求次数"
            },
            {
              "depth": 2,
              "value": "正常请求",
              "heading": "正常请求"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 2,
              "value": "iOS WKWebview 需要 CORS",
              "heading": "ios-wkwebview-需要-cors"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP CORS 跨域资源共享"
      },
      {
        "path": "/computer-networks/http/http-connection",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http-connection.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http-connection.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP 连接",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP 连接",
              "heading": "http-连接"
            },
            {
              "depth": 2,
              "value": "持久连接",
              "heading": "持久连接"
            },
            {
              "depth": 2,
              "value": "传输编码",
              "heading": "传输编码"
            },
            {
              "depth": 2,
              "value": "分块编码传输",
              "heading": "分块编码传输"
            },
            {
              "depth": 3,
              "value": "不定长包体实现",
              "heading": "不定长包体实现"
            },
            {
              "depth": 3,
              "value": "分块编码的拖挂",
              "heading": "分块编码的拖挂"
            },
            {
              "depth": 3,
              "value": "内容编码和传输编码结合",
              "heading": "内容编码和传输编码结合"
            },
            {
              "depth": 2,
              "value": "管线化连接",
              "heading": "管线化连接"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP 连接"
      },
      {
        "path": "/computer-networks/http/http-content-negotiation",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http-content-negotiation.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http-content-negotiation.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP 内容协商",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP 内容协商",
              "heading": "http-内容协商"
            },
            {
              "depth": 2,
              "value": "基本原则",
              "heading": "基本原则"
            },
            {
              "depth": 3,
              "value": "服务端驱动型内容协商机制",
              "heading": "服务端驱动型内容协商机制"
            },
            {
              "depth": 3,
              "value": "代理驱动型内容协商机制",
              "heading": "代理驱动型内容协商机制"
            },
            {
              "depth": 2,
              "value": "常见协商要素",
              "heading": "常见协商要素"
            },
            {
              "depth": 3,
              "value": "质量因子",
              "heading": "质量因子"
            },
            {
              "depth": 3,
              "value": "媒体类型",
              "heading": "媒体类型"
            },
            {
              "depth": 3,
              "value": "编码类型",
              "heading": "编码类型"
            },
            {
              "depth": 3,
              "value": "表述语言",
              "heading": "表述语言"
            },
            {
              "depth": 2,
              "value": "资源表述头部字段",
              "heading": "资源表述头部字段"
            },
            {
              "depth": 3,
              "value": "媒体类型编码",
              "heading": "媒体类型编码"
            },
            {
              "depth": 3,
              "value": "内容编码",
              "heading": "内容编码"
            },
            {
              "depth": 3,
              "value": "表述语言",
              "heading": "表述语言-1"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP 内容协商"
      },
      {
        "path": "/computer-networks/http/http-headers",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http-headers.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http-headers.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP 首部字段",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP 首部字段",
              "heading": "http-首部字段"
            },
            {
              "depth": 2,
              "value": "报文信息",
              "heading": "报文信息"
            },
            {
              "depth": 2,
              "value": "网络连接",
              "heading": "网络连接"
            },
            {
              "depth": 3,
              "value": "Connection",
              "heading": "connection"
            },
            {
              "depth": 3,
              "value": "Keep-Alive",
              "heading": "keep-alive"
            },
            {
              "depth": 2,
              "value": "内容协商",
              "heading": "内容协商"
            },
            {
              "depth": 3,
              "value": "压缩方式",
              "heading": "压缩方式"
            },
            {
              "depth": 3,
              "value": "Content-Type",
              "heading": "content-type"
            },
            {
              "depth": 2,
              "value": "同源策略",
              "heading": "同源策略"
            },
            {
              "depth": 2,
              "value": "缓存协商",
              "heading": "缓存协商"
            },
            {
              "depth": 2,
              "value": "权限认证",
              "heading": "权限认证"
            },
            {
              "depth": 2,
              "value": "其他",
              "heading": "其他"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP 首部字段"
      },
      {
        "path": "/computer-networks/http/http-message",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http-message.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http-message.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP 报文格式",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP 报文格式",
              "heading": "http-报文格式"
            },
            {
              "depth": 2,
              "value": "请求报文",
              "heading": "请求报文"
            },
            {
              "depth": 3,
              "value": "请求行",
              "heading": "请求行"
            },
            {
              "depth": 4,
              "value": "请求方法",
              "heading": "请求方法"
            },
            {
              "depth": 4,
              "value": "GET 与 POST",
              "heading": "get-与-post"
            },
            {
              "depth": 3,
              "value": "请求头",
              "heading": "请求头"
            },
            {
              "depth": 3,
              "value": "请求体",
              "heading": "请求体"
            },
            {
              "depth": 2,
              "value": "响应报文",
              "heading": "响应报文"
            },
            {
              "depth": 3,
              "value": "状态行",
              "heading": "状态行"
            },
            {
              "depth": 3,
              "value": "响应头",
              "heading": "响应头"
            },
            {
              "depth": 3,
              "value": "响应体",
              "heading": "响应体"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP 报文格式"
      },
      {
        "path": "/computer-networks/http/http-resource-and-uris",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http-resource-and-uris.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http-resource-and-uris.md",
          "updatedTime": 1601647969000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP 资源标识",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP 资源标识",
              "heading": "http-资源标识"
            },
            {
              "depth": 2,
              "value": "统一资源标识符 URI",
              "heading": "统一资源标识符-uri"
            },
            {
              "depth": 3,
              "value": "编码方式",
              "heading": "编码方式"
            },
            {
              "depth": 3,
              "value": "方案或协议",
              "heading": "方案或协议"
            },
            {
              "depth": 3,
              "value": "主机",
              "heading": "主机"
            },
            {
              "depth": 3,
              "value": "端口",
              "heading": "端口"
            },
            {
              "depth": 3,
              "value": "路径",
              "heading": "路径"
            },
            {
              "depth": 3,
              "value": "查询",
              "heading": "查询"
            },
            {
              "depth": 3,
              "value": "片段",
              "heading": "片段"
            },
            {
              "depth": 2,
              "value": "统一资源定位符 URL",
              "heading": "统一资源定位符-url"
            },
            {
              "depth": 2,
              "value": "永久统一资源定位符 URN",
              "heading": "永久统一资源定位符-urn"
            },
            {
              "depth": 2,
              "value": "Data URI Scheme",
              "heading": "data-uri-scheme"
            },
            {
              "depth": 3,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 2,
              "value": "MIME 类型",
              "heading": "mime-类型"
            },
            {
              "depth": 3,
              "value": "独立类型",
              "heading": "独立类型"
            },
            {
              "depth": 3,
              "value": "复合类型",
              "heading": "复合类型"
            },
            {
              "depth": 3,
              "value": "MIME 嗅探",
              "heading": "mime-嗅探"
            }
          ]
        },
        "title": "HTTP 资源标识"
      },
      {
        "path": "/computer-networks/http/http-status-code",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http-status-code.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http-status-code.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP 状态码",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP 状态码",
              "heading": "http-状态码"
            },
            {
              "depth": 2,
              "value": "1xx Informational 信息化",
              "heading": "1xx-informational-信息化"
            },
            {
              "depth": 2,
              "value": "2xx Success 成功",
              "heading": "2xx-success-成功"
            },
            {
              "depth": 2,
              "value": "3xx Redirection 重定向",
              "heading": "3xx-redirection-重定向"
            },
            {
              "depth": 2,
              "value": "4xx Client Error 客户端错误",
              "heading": "4xx-client-error-客户端错误"
            },
            {
              "depth": 2,
              "value": "5xx Server Error 服务端错误",
              "heading": "5xx-server-error-服务端错误"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP 状态码"
      },
      {
        "path": "/computer-networks/http/http",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP 超文本传输协议",
              "heading": "http-超文本传输协议"
            },
            {
              "depth": 2,
              "value": "特点",
              "heading": "特点"
            },
            {
              "depth": 2,
              "value": "缺点",
              "heading": "缺点"
            },
            {
              "depth": 3,
              "value": "无状态",
              "heading": "无状态"
            },
            {
              "depth": 3,
              "value": "明文传输",
              "heading": "明文传输"
            },
            {
              "depth": 3,
              "value": "队头阻塞问题",
              "heading": "队头阻塞问题"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP"
      },
      {
        "path": "/computer-networks/http/http2",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http2.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http2.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP2",
          "order": 21,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP2",
              "heading": "http2"
            },
            {
              "depth": 2,
              "value": "旧版本问题",
              "heading": "旧版本问题"
            },
            {
              "depth": 2,
              "value": "新特性",
              "heading": "新特性"
            },
            {
              "depth": 3,
              "value": "二进制分帧",
              "heading": "二进制分帧"
            },
            {
              "depth": 4,
              "value": "数据流、消息和帧",
              "heading": "数据流、消息和帧"
            },
            {
              "depth": 3,
              "value": "标头压缩",
              "heading": "标头压缩"
            },
            {
              "depth": 4,
              "value": "HPACK 霍夫曼编码",
              "heading": "hpack-霍夫曼编码"
            },
            {
              "depth": 3,
              "value": "多路复用",
              "heading": "多路复用"
            },
            {
              "depth": 3,
              "value": "服务器推送",
              "heading": "服务器推送"
            },
            {
              "depth": 4,
              "value": "Nginx 配置实现",
              "heading": "nginx-配置实现"
            },
            {
              "depth": 4,
              "value": "服务端实现",
              "heading": "服务端实现"
            },
            {
              "depth": 4,
              "value": "缓存问题",
              "heading": "缓存问题"
            },
            {
              "depth": 3,
              "value": "安全提升",
              "heading": "安全提升"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP2"
      },
      {
        "path": "/computer-networks/http/http3",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/http3.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/http3.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTP3",
          "order": 22,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTP3",
              "heading": "http3"
            },
            {
              "depth": 2,
              "value": "HTTP 发展历史",
              "heading": "http-发展历史"
            },
            {
              "depth": 2,
              "value": "旧版本存在问题",
              "heading": "旧版本存在问题"
            },
            {
              "depth": 2,
              "value": "HTTP3 简介",
              "heading": "http3-简介"
            },
            {
              "depth": 2,
              "value": "新特性",
              "heading": "新特性"
            },
            {
              "depth": 3,
              "value": "零 RTT 建立连接",
              "heading": "零-rtt-建立连接"
            },
            {
              "depth": 3,
              "value": "连接迁移",
              "heading": "连接迁移"
            },
            {
              "depth": 3,
              "value": "队头阻塞和多路复用",
              "heading": "队头阻塞和多路复用"
            },
            {
              "depth": 3,
              "value": "拥塞控制",
              "heading": "拥塞控制"
            },
            {
              "depth": 4,
              "value": "热插拔",
              "heading": "热插拔"
            },
            {
              "depth": 4,
              "value": "前向纠错 FEC",
              "heading": "前向纠错-fec"
            },
            {
              "depth": 4,
              "value": "单调递增的 Packet Number",
              "heading": "单调递增的-packet-number"
            },
            {
              "depth": 4,
              "value": "ACK Delay",
              "heading": "ack-delay"
            },
            {
              "depth": 4,
              "value": "更多的 ACK 块",
              "heading": "更多的-ack-块"
            },
            {
              "depth": 3,
              "value": "流量控制",
              "heading": "流量控制"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTP3"
      },
      {
        "path": "/computer-networks/http/https",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/http/https.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/http/https.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "HTTP",
            "order": 3,
            "path": "/computer-networks/http"
          },
          "title": "HTTPS",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "HTTPS",
              "heading": "https"
            },
            {
              "depth": 2,
              "value": "安全问题",
              "heading": "安全问题"
            },
            {
              "depth": 3,
              "value": "窃听",
              "heading": "窃听"
            },
            {
              "depth": 3,
              "value": "伪造",
              "heading": "伪造"
            },
            {
              "depth": 3,
              "value": "否认",
              "heading": "否认"
            },
            {
              "depth": 2,
              "value": "解决方案",
              "heading": "解决方案"
            },
            {
              "depth": 3,
              "value": "对称加密",
              "heading": "对称加密"
            },
            {
              "depth": 3,
              "value": "非对称加密",
              "heading": "非对称加密"
            },
            {
              "depth": 3,
              "value": "混合加密",
              "heading": "混合加密"
            },
            {
              "depth": 3,
              "value": "中间人攻击",
              "heading": "中间人攻击"
            },
            {
              "depth": 3,
              "value": "消息鉴别码",
              "heading": "消息鉴别码"
            },
            {
              "depth": 3,
              "value": "数字签名",
              "heading": "数字签名"
            },
            {
              "depth": 3,
              "value": "数字证书",
              "heading": "数字证书"
            },
            {
              "depth": 2,
              "value": "工作流程",
              "heading": "工作流程"
            },
            {
              "depth": 2,
              "value": "相关算法",
              "heading": "相关算法"
            },
            {
              "depth": 3,
              "value": "散列函数",
              "heading": "散列函数"
            },
            {
              "depth": 3,
              "value": "对称加密",
              "heading": "对称加密-1"
            },
            {
              "depth": 3,
              "value": "非对称加密",
              "heading": "非对称加密-1"
            },
            {
              "depth": 2,
              "value": "通信协议对比",
              "heading": "通信协议对比"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTTPS"
      },
      {
        "path": "/computer-networks/web-security/csrf",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/web-security/csrf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/web-security/csrf.md",
          "updatedTime": 1637950035000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "Web 安全",
            "order": 4,
            "path": "/computer-networks/web-security"
          },
          "title": "CSRF 跨站请求伪造攻击",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "CSRF 跨站请求伪造攻击",
              "heading": "csrf-跨站请求伪造攻击"
            },
            {
              "depth": 2,
              "value": "攻击手段",
              "heading": "攻击手段"
            },
            {
              "depth": 3,
              "value": "GET 类型",
              "heading": "get-类型"
            },
            {
              "depth": 3,
              "value": "POST 类型",
              "heading": "post-类型"
            },
            {
              "depth": 3,
              "value": "链接类型",
              "heading": "链接类型"
            },
            {
              "depth": 2,
              "value": "攻击特点",
              "heading": "攻击特点"
            },
            {
              "depth": 2,
              "value": "防御策略",
              "heading": "防御策略"
            },
            {
              "depth": 3,
              "value": "防御思路",
              "heading": "防御思路"
            },
            {
              "depth": 3,
              "value": "同源检测机制",
              "heading": "同源检测机制"
            },
            {
              "depth": 4,
              "value": "Origin",
              "heading": "origin"
            },
            {
              "depth": 4,
              "value": "Referrer",
              "heading": "referrer"
            },
            {
              "depth": 3,
              "value": "Cookie 的 SameSite 属性",
              "heading": "cookie-的-samesite-属性"
            },
            {
              "depth": 3,
              "value": "CSRF Token",
              "heading": "csrf-token"
            },
            {
              "depth": 3,
              "value": "分布式校验",
              "heading": "分布式校验"
            },
            {
              "depth": 3,
              "value": "双重 Cookie 验证",
              "heading": "双重-cookie-验证"
            },
            {
              "depth": 3,
              "value": "用户操作限制",
              "heading": "用户操作限制"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "CSRF 跨站请求伪造攻击"
      },
      {
        "path": "/computer-networks/web-security/ddos",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/web-security/ddos.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/web-security/ddos.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "Web 安全",
            "order": 4,
            "path": "/computer-networks/web-security"
          },
          "title": "DDoS 攻击",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "DDoS 攻击",
              "heading": "ddos-攻击"
            },
            {
              "depth": 2,
              "value": "攻击分类",
              "heading": "攻击分类"
            },
            {
              "depth": 3,
              "value": "反射型",
              "heading": "反射型"
            },
            {
              "depth": 3,
              "value": "流量放大型",
              "heading": "流量放大型"
            },
            {
              "depth": 3,
              "value": "混合型",
              "heading": "混合型"
            },
            {
              "depth": 3,
              "value": "脉冲波型",
              "heading": "脉冲波型"
            },
            {
              "depth": 3,
              "value": "链路泛洪",
              "heading": "链路泛洪"
            },
            {
              "depth": 2,
              "value": "攻击方法",
              "heading": "攻击方法"
            },
            {
              "depth": 3,
              "value": "网络层 DDoS 攻击",
              "heading": "网络层-ddos-攻击"
            },
            {
              "depth": 4,
              "value": "SYN Flood 攻击",
              "heading": "syn-flood-攻击"
            },
            {
              "depth": 4,
              "value": "ACK Flood",
              "heading": "ack-flood"
            },
            {
              "depth": 4,
              "value": "Connection Flood",
              "heading": "connection-flood"
            },
            {
              "depth": 4,
              "value": "UDP Flood 攻击",
              "heading": "udp-flood-攻击"
            },
            {
              "depth": 4,
              "value": "ICMP Flood 攻击",
              "heading": "icmp-flood-攻击"
            },
            {
              "depth": 4,
              "value": "Smurf 攻击",
              "heading": "smurf-攻击"
            },
            {
              "depth": 3,
              "value": "应用层 DDoS 攻击",
              "heading": "应用层-ddos-攻击"
            },
            {
              "depth": 4,
              "value": "CC 攻击",
              "heading": "cc-攻击"
            },
            {
              "depth": 4,
              "value": "Slowloris 攻击",
              "heading": "slowloris-攻击"
            },
            {
              "depth": 4,
              "value": "Slow Attack",
              "heading": "slow-attack"
            },
            {
              "depth": 4,
              "value": "JavaScript DDoS",
              "heading": "javascript-ddos"
            },
            {
              "depth": 4,
              "value": "ReDoS 攻击",
              "heading": "redos-攻击"
            },
            {
              "depth": 4,
              "value": "DNS Query Flood",
              "heading": "dns-query-flood"
            },
            {
              "depth": 3,
              "value": "无线 DDoS 攻击",
              "heading": "无线-ddos-攻击"
            },
            {
              "depth": 4,
              "value": "Auth Flood 攻击",
              "heading": "auth-flood-攻击"
            },
            {
              "depth": 4,
              "value": "Deauth Flood 攻击",
              "heading": "deauth-flood-攻击"
            },
            {
              "depth": 4,
              "value": "Association Flood 攻击",
              "heading": "association-flood-攻击"
            },
            {
              "depth": 4,
              "value": "Disassociation Flood 攻击",
              "heading": "disassociation-flood-攻击"
            },
            {
              "depth": 4,
              "value": "RF Jamming 攻击",
              "heading": "rf-jamming-攻击"
            },
            {
              "depth": 2,
              "value": "判断方法",
              "heading": "判断方法"
            },
            {
              "depth": 3,
              "value": "SYN 类",
              "heading": "syn-类"
            },
            {
              "depth": 3,
              "value": "UDP 类",
              "heading": "udp-类"
            },
            {
              "depth": 3,
              "value": "CC 类",
              "heading": "cc-类"
            },
            {
              "depth": 2,
              "value": "防御策略",
              "heading": "防御策略"
            },
            {
              "depth": 3,
              "value": "网络层 DDoS 防御",
              "heading": "网络层-ddos-防御"
            },
            {
              "depth": 3,
              "value": "应用层 DDoS 防御",
              "heading": "应用层-ddos-防御"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "DDoS 攻击"
      },
      {
        "path": "/computer-networks/web-security/hijacking",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/web-security/hijacking.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/web-security/hijacking.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "Web 安全",
            "order": 4,
            "path": "/computer-networks/web-security"
          },
          "title": "流量劫持",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "流量劫持",
              "heading": "流量劫持"
            },
            {
              "depth": 2,
              "value": "DNS 劫持",
              "heading": "dns-劫持"
            },
            {
              "depth": 3,
              "value": "攻击方式",
              "heading": "攻击方式"
            },
            {
              "depth": 3,
              "value": "防御策略",
              "heading": "防御策略"
            },
            {
              "depth": 2,
              "value": "HTTP 劫持",
              "heading": "http-劫持"
            },
            {
              "depth": 3,
              "value": "防御策略",
              "heading": "防御策略-1"
            },
            {
              "depth": 4,
              "value": "Content Security Policy",
              "heading": "content-security-policy"
            },
            {
              "depth": 4,
              "value": "Subresource Integrity",
              "heading": "subresource-integrity"
            },
            {
              "depth": 2,
              "value": "CDN 劫持",
              "heading": "cdn-劫持"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "流量劫持"
      },
      {
        "path": "/computer-networks/web-security/same-origin-policy",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/web-security/same-origin-policy.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/web-security/same-origin-policy.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "Web 安全",
            "order": 4,
            "path": "/computer-networks/web-security"
          },
          "title": "同源策略",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "同源策略",
              "heading": "同源策略"
            },
            {
              "depth": 2,
              "value": "跨源网络访问",
              "heading": "跨源网络访问"
            },
            {
              "depth": 2,
              "value": "解决方案",
              "heading": "解决方案"
            },
            {
              "depth": 3,
              "value": "CORS",
              "heading": "cors"
            },
            {
              "depth": 4,
              "value": "原生实现",
              "heading": "原生实现"
            },
            {
              "depth": 4,
              "value": "第三方中间件",
              "heading": "第三方中间件"
            },
            {
              "depth": 4,
              "value": "关于 Cookie 问题",
              "heading": "关于-cookie-问题"
            },
            {
              "depth": 3,
              "value": "Node 代理",
              "heading": "node-代理"
            },
            {
              "depth": 3,
              "value": "Nginx 反向代理",
              "heading": "nginx-反向代理"
            },
            {
              "depth": 3,
              "value": "JSONP",
              "heading": "jsonp"
            },
            {
              "depth": 3,
              "value": "WebSocket",
              "heading": "websocket"
            },
            {
              "depth": 3,
              "value": "window.postMessage",
              "heading": "windowpostmessage"
            },
            {
              "depth": 3,
              "value": "document.domain + iframe",
              "heading": "documentdomain--iframe"
            },
            {
              "depth": 3,
              "value": "window.location.hash + iframe",
              "heading": "windowlocationhash--iframe"
            },
            {
              "depth": 3,
              "value": "window.name + iframe",
              "heading": "windowname--iframe"
            },
            {
              "depth": 2,
              "value": "阻止跨源访问",
              "heading": "阻止跨源访问"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "同源策略"
      },
      {
        "path": "/computer-networks/web-security/sql-injection",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/web-security/sql-injection.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/web-security/sql-injection.md",
          "updatedTime": 1634149722000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "Web 安全",
            "order": 4,
            "path": "/computer-networks/web-security"
          },
          "title": "SQL 注入攻击",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "SQL 注入攻击",
              "heading": "sql-注入攻击"
            },
            {
              "depth": 2,
              "value": "攻击方式",
              "heading": "攻击方式"
            },
            {
              "depth": 2,
              "value": "防御策略",
              "heading": "防御策略"
            },
            {
              "depth": 3,
              "value": "数据校验",
              "heading": "数据校验"
            },
            {
              "depth": 3,
              "value": "权限限制",
              "heading": "权限限制"
            },
            {
              "depth": 3,
              "value": "日志处理",
              "heading": "日志处理"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "SQL 注入攻击"
      },
      {
        "path": "/computer-networks/web-security/xss",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/computer-networks/web-security/xss.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/computer-networks/web-security/xss.md",
          "updatedTime": 1637950035000,
          "nav": {
            "title": "计算机网络",
            "order": 8,
            "path": "/computer-networks"
          },
          "group": {
            "title": "Web 安全",
            "order": 4,
            "path": "/computer-networks/web-security"
          },
          "title": "XSS 跨站脚本攻击",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "XSS 跨站脚本攻击",
              "heading": "xss-跨站脚本攻击"
            },
            {
              "depth": 2,
              "value": "攻击种类",
              "heading": "攻击种类"
            },
            {
              "depth": 3,
              "value": "反射型",
              "heading": "反射型"
            },
            {
              "depth": 3,
              "value": "存储型",
              "heading": "存储型"
            },
            {
              "depth": 3,
              "value": "DOM Based 型",
              "heading": "dom-based-型"
            },
            {
              "depth": 2,
              "value": "攻击手段",
              "heading": "攻击手段"
            },
            {
              "depth": 3,
              "value": "标签拼接漏洞",
              "heading": "标签拼接漏洞"
            },
            {
              "depth": 3,
              "value": "提前闭合标签",
              "heading": "提前闭合标签"
            },
            {
              "depth": 3,
              "value": "合法 HTML 转义漏洞",
              "heading": "合法-html-转义漏洞"
            },
            {
              "depth": 3,
              "value": "合法 JS 转义漏洞",
              "heading": "合法-js-转义漏洞"
            },
            {
              "depth": 3,
              "value": "方法总结",
              "heading": "方法总结"
            },
            {
              "depth": 2,
              "value": "防御策略",
              "heading": "防御策略"
            },
            {
              "depth": 3,
              "value": "输入过滤",
              "heading": "输入过滤"
            },
            {
              "depth": 3,
              "value": "纯前端渲染",
              "heading": "纯前端渲染"
            },
            {
              "depth": 3,
              "value": "转义 HTML",
              "heading": "转义-html"
            },
            {
              "depth": 3,
              "value": "禁止执行不可信数据",
              "heading": "禁止执行不可信数据"
            },
            {
              "depth": 3,
              "value": "內容安全策略",
              "heading": "內容安全策略"
            },
            {
              "depth": 3,
              "value": "HTTPOnly Cookie",
              "heading": "httponly-cookie"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "XSS 跨站脚本攻击"
      },
      {
        "path": "/core-modules",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/index.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "核心模块",
            "order": 1,
            "path": "/core-modules"
          },
          "title": "核心模块",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "核心模块",
              "heading": "核心模块"
            }
          ]
        },
        "title": "核心模块"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-arguments/default-parameters",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-arguments/default-parameters.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-arguments/default-parameters.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数参数",
            "order": 7,
            "path": "/core-modules/ecmascript-function-objects/function-arguments"
          },
          "title": "默认参数",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "默认参数",
              "heading": "默认参数"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "默认声明",
              "heading": "默认声明"
            },
            {
              "depth": 3,
              "value": "参数命名冲突",
              "heading": "参数命名冲突"
            },
            {
              "depth": 3,
              "value": "惰性求值",
              "heading": "惰性求值"
            },
            {
              "depth": 3,
              "value": "结合解构赋值",
              "heading": "结合解构赋值"
            },
            {
              "depth": 3,
              "value": "结合案例分析",
              "heading": "结合案例分析"
            },
            {
              "depth": 2,
              "value": "参数默认值的位置",
              "heading": "参数默认值的位置"
            },
            {
              "depth": 2,
              "value": "函数的长度属性",
              "heading": "函数的长度属性"
            },
            {
              "depth": 2,
              "value": "参数作用域",
              "heading": "参数作用域"
            },
            {
              "depth": 2,
              "value": "抛弃参数对象",
              "heading": "抛弃参数对象"
            }
          ]
        },
        "title": "默认参数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-arguments/function-parameters",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-arguments/function-parameters.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-arguments/function-parameters.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数参数",
            "order": 7,
            "path": "/core-modules/ecmascript-function-objects/function-arguments"
          },
          "title": "函数参数",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "函数参数",
              "heading": "函数参数"
            },
            {
              "depth": 2,
              "value": "arguments",
              "heading": "arguments"
            },
            {
              "depth": 3,
              "value": "同名形参",
              "heading": "同名形参"
            },
            {
              "depth": 3,
              "value": "参数数量",
              "heading": "参数数量"
            },
            {
              "depth": 3,
              "value": "同步",
              "heading": "同步"
            },
            {
              "depth": 2,
              "value": "内部属性",
              "heading": "内部属性"
            },
            {
              "depth": 3,
              "value": "callee",
              "heading": "callee"
            },
            {
              "depth": 3,
              "value": "caller",
              "heading": "caller"
            },
            {
              "depth": 4,
              "value": "函数的 caller",
              "heading": "函数的-caller"
            },
            {
              "depth": 4,
              "value": "arguments 对象的 caller",
              "heading": "arguments-对象的-caller"
            },
            {
              "depth": 2,
              "value": "参数传递",
              "heading": "参数传递"
            },
            {
              "depth": 3,
              "value": "基本类型值",
              "heading": "基本类型值"
            },
            {
              "depth": 3,
              "value": "引用类型值",
              "heading": "引用类型值"
            },
            {
              "depth": 2,
              "value": "函数重载",
              "heading": "函数重载"
            }
          ]
        },
        "title": "函数参数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-arguments/rest-parameters",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-arguments/rest-parameters.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-arguments/rest-parameters.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数参数",
            "order": 7,
            "path": "/core-modules/ecmascript-function-objects/function-arguments"
          },
          "title": "剩余参数",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "剩余参数",
              "heading": "剩余参数"
            },
            {
              "depth": 2,
              "value": "与参数对象的对比",
              "heading": "与参数对象的对比"
            },
            {
              "depth": 2,
              "value": "注意事项",
              "heading": "注意事项"
            }
          ]
        },
        "title": "剩余参数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-calls/apply-invocation-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-calls/apply-invocation-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-calls/apply-invocation-pattern.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数调用",
            "order": 8,
            "path": "/core-modules/ecmascript-function-objects/function-calls"
          },
          "title": "间接调用模式",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "间接调用模式",
              "heading": "间接调用模式"
            }
          ]
        },
        "title": "间接调用模式"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-calls/constructor-invocation-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-calls/constructor-invocation-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-calls/constructor-invocation-pattern.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数调用",
            "order": 8,
            "path": "/core-modules/ecmascript-function-objects/function-calls"
          },
          "title": "构造函数调用模式",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "构造函数调用模式",
              "heading": "构造函数调用模式"
            },
            {
              "depth": 2,
              "value": "关键字 new",
              "heading": "关键字-new"
            },
            {
              "depth": 2,
              "value": "实参表达式",
              "heading": "实参表达式"
            },
            {
              "depth": 2,
              "value": "省略圆括号",
              "heading": "省略圆括号"
            },
            {
              "depth": 2,
              "value": "调用上下文",
              "heading": "调用上下文"
            },
            {
              "depth": 2,
              "value": "构造函数的返回语句",
              "heading": "构造函数的返回语句"
            }
          ]
        },
        "title": "构造函数调用模式"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-calls/function-invocation-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-calls/function-invocation-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-calls/function-invocation-pattern.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数调用",
            "order": 8,
            "path": "/core-modules/ecmascript-function-objects/function-calls"
          },
          "title": "函数调用模式",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "函数调用模式",
              "heading": "函数调用模式"
            },
            {
              "depth": 2,
              "value": "调用母体",
              "heading": "调用母体"
            },
            {
              "depth": 2,
              "value": "重写现象",
              "heading": "重写现象"
            }
          ]
        },
        "title": "函数调用模式"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-calls/method-invocation-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-calls/method-invocation-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-calls/method-invocation-pattern.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数调用",
            "order": 8,
            "path": "/core-modules/ecmascript-function-objects/function-calls"
          },
          "title": "方法调用模式",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "方法调用模式",
              "heading": "方法调用模式"
            },
            {
              "depth": 2,
              "value": "函数作为方法调用",
              "heading": "函数作为方法调用"
            },
            {
              "depth": 2,
              "value": "对象的公共方法提取",
              "heading": "对象的公共方法提取"
            },
            {
              "depth": 2,
              "value": "隐式实参",
              "heading": "隐式实参"
            },
            {
              "depth": 2,
              "value": "函数方法中的 this",
              "heading": "函数方法中的-this"
            }
          ]
        },
        "title": "方法调用模式"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-declarations/arrow-function-definitions",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-declarations/arrow-function-definitions.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-declarations/arrow-function-definitions.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数声明",
            "order": 6,
            "path": "/core-modules/ecmascript-function-objects/function-declarations"
          },
          "title": "箭头函数",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "箭头函数",
              "heading": "箭头函数"
            },
            {
              "depth": 2,
              "value": "赋值式写法",
              "heading": "赋值式写法"
            },
            {
              "depth": 2,
              "value": "箭头函数参数",
              "heading": "箭头函数参数"
            },
            {
              "depth": 3,
              "value": "单个参数",
              "heading": "单个参数"
            },
            {
              "depth": 3,
              "value": "剩余参数",
              "heading": "剩余参数"
            },
            {
              "depth": 3,
              "value": "默认参数",
              "heading": "默认参数"
            },
            {
              "depth": 3,
              "value": "解构赋值",
              "heading": "解构赋值"
            },
            {
              "depth": 2,
              "value": "函数体",
              "heading": "函数体"
            },
            {
              "depth": 3,
              "value": "单个表达式",
              "heading": "单个表达式"
            },
            {
              "depth": 3,
              "value": "返回缺省值",
              "heading": "返回缺省值"
            },
            {
              "depth": 3,
              "value": "直接返回对象",
              "heading": "直接返回对象"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 3,
              "value": "回调函数",
              "heading": "回调函数"
            },
            {
              "depth": 2,
              "value": "注意事项",
              "heading": "注意事项"
            },
            {
              "depth": 3,
              "value": "箭头函数中的 this",
              "heading": "箭头函数中的-this"
            },
            {
              "depth": 3,
              "value": "嵌套的箭头函数",
              "heading": "嵌套的箭头函数"
            }
          ]
        },
        "title": "箭头函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-declarations/async-function-definitions",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-declarations/async-function-definitions.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-declarations/async-function-definitions.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数声明",
            "order": 6,
            "path": "/core-modules/ecmascript-function-objects/function-declarations"
          },
          "title": "异步函数",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "异步函数",
              "heading": "异步函数"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "异步函数的声明",
              "heading": "异步函数的声明"
            },
            {
              "depth": 3,
              "value": "异步函数的语句",
              "heading": "异步函数的语句"
            },
            {
              "depth": 3,
              "value": "异步语句返回值",
              "heading": "异步语句返回值"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "返回值类型",
              "heading": "返回值类型"
            },
            {
              "depth": 3,
              "value": "返回值状态变化",
              "heading": "返回值状态变化"
            },
            {
              "depth": 3,
              "value": "异步语句返回值",
              "heading": "异步语句返回值-1"
            },
            {
              "depth": 2,
              "value": "异常处理",
              "heading": "异常处理"
            },
            {
              "depth": 3,
              "value": "捕捉异常",
              "heading": "捕捉异常"
            },
            {
              "depth": 3,
              "value": "操作中断",
              "heading": "操作中断"
            },
            {
              "depth": 2,
              "value": "实现原理",
              "heading": "实现原理"
            },
            {
              "depth": 2,
              "value": "最佳实践",
              "heading": "最佳实践"
            },
            {
              "depth": 3,
              "value": "异步阻塞",
              "heading": "异步阻塞"
            },
            {
              "depth": 3,
              "value": "异步非阻塞",
              "heading": "异步非阻塞"
            },
            {
              "depth": 3,
              "value": "异步并发",
              "heading": "异步并发"
            },
            {
              "depth": 3,
              "value": "未知数量的异步并发",
              "heading": "未知数量的异步并发"
            },
            {
              "depth": 3,
              "value": "不等待结果的异步循环",
              "heading": "不等待结果的异步循环"
            },
            {
              "depth": 3,
              "value": "异步串行遍历",
              "heading": "异步串行遍历"
            },
            {
              "depth": 3,
              "value": "异步并行遍历",
              "heading": "异步并行遍历"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "异步函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-declarations/function-definitions",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-declarations/function-definitions.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-declarations/function-definitions.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数声明",
            "order": 6,
            "path": "/core-modules/ecmascript-function-objects/function-declarations"
          },
          "title": "函数声明定义",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "函数声明式定义",
              "heading": "函数声明式定义"
            },
            {
              "depth": 2,
              "value": "函数声明语句",
              "heading": "函数声明语句"
            },
            {
              "depth": 3,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "特点",
              "heading": "特点"
            },
            {
              "depth": 2,
              "value": "函数表达式",
              "heading": "函数表达式"
            },
            {
              "depth": 3,
              "value": "语法",
              "heading": "语法-1"
            },
            {
              "depth": 3,
              "value": "匿名函数",
              "heading": "匿名函数"
            },
            {
              "depth": 3,
              "value": "具名函数",
              "heading": "具名函数"
            },
            {
              "depth": 3,
              "value": "函数名称",
              "heading": "函数名称"
            },
            {
              "depth": 2,
              "value": "函数声明优先",
              "heading": "函数声明优先"
            }
          ]
        },
        "title": "函数声明定义"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-internal/function-accessor",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-internal/function-accessor.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-internal/function-accessor.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数内部",
            "order": 9,
            "path": "/core-modules/ecmascript-function-objects/function-internal"
          },
          "title": "函数存取器",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "函数存取器",
              "heading": "函数存取器"
            },
            {
              "depth": 2,
              "value": "取值函数",
              "heading": "取值函数"
            },
            {
              "depth": 3,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 4,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 4,
              "value": "删除对象的取值函数",
              "heading": "删除对象的取值函数"
            },
            {
              "depth": 4,
              "value": "在现有对象上定义取值函数",
              "heading": "在现有对象上定义取值函数"
            },
            {
              "depth": 4,
              "value": "计算属性名",
              "heading": "计算属性名"
            },
            {
              "depth": 2,
              "value": "存值函数",
              "heading": "存值函数"
            },
            {
              "depth": 3,
              "value": "语法",
              "heading": "语法-1"
            },
            {
              "depth": 3,
              "value": "描述",
              "heading": "描述-1"
            },
            {
              "depth": 3,
              "value": "示例",
              "heading": "示例-1"
            },
            {
              "depth": 4,
              "value": "基本用法",
              "heading": "基本用法-1"
            }
          ]
        },
        "title": "函数存取器"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-internal/function-prototype-object-methods",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-internal/function-prototype-object-methods.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-internal/function-prototype-object-methods.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数内部",
            "order": 9,
            "path": "/core-modules/ecmascript-function-objects/function-internal"
          },
          "title": "函数原型对象方法",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "函数原型对象方法",
              "heading": "函数原型对象方法"
            },
            {
              "depth": 2,
              "value": "Function.prototyp.apply()",
              "heading": "functionprototypapply"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "Function.prototype.call()",
              "heading": "functionprototypecall"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法-1"
            },
            {
              "depth": 2,
              "value": "参数",
              "heading": "参数-1"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例-1"
            },
            {
              "depth": 2,
              "value": "Function.prototype.bind()",
              "heading": "functionprototypebind"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法-2"
            },
            {
              "depth": 2,
              "value": "参数",
              "heading": "参数-2"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例-2"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "偏函数",
              "heading": "偏函数"
            },
            {
              "depth": 3,
              "value": "配合定时器",
              "heading": "配合定时器"
            },
            {
              "depth": 2,
              "value": "",
              "heading": ""
            }
          ]
        },
        "title": "函数原型对象方法"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-internal/function-prototype-object-properties",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-internal/function-prototype-object-properties.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-internal/function-prototype-object-properties.md",
          "updatedTime": 1593015474000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数内部",
            "order": 9,
            "path": "/core-modules/ecmascript-function-objects/function-internal"
          },
          "title": "函数原型对象属性",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "函数原型对象属性",
              "heading": "函数原型对象属性"
            },
            {
              "depth": 2,
              "value": "length 属性",
              "heading": "length-属性"
            },
            {
              "depth": 2,
              "value": "name 属性",
              "heading": "name-属性"
            }
          ]
        },
        "title": "函数原型对象属性"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/callback-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/callback-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/callback-function.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "回调函数",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "回调函数",
              "heading": "回调函数"
            },
            {
              "depth": 2,
              "value": "函数特点",
              "heading": "函数特点"
            },
            {
              "depth": 3,
              "value": "不会立即执行",
              "heading": "不会立即执行"
            },
            {
              "depth": 3,
              "value": "是个闭包",
              "heading": "是个闭包"
            },
            {
              "depth": 3,
              "value": "执行前类型判断",
              "heading": "执行前类型判断"
            },
            {
              "depth": 3,
              "value": "this 的使用",
              "heading": "this-的使用"
            },
            {
              "depth": 3,
              "value": "允许传递多个回调函数",
              "heading": "允许传递多个回调函数"
            },
            {
              "depth": 3,
              "value": "函数嵌套",
              "heading": "函数嵌套"
            },
            {
              "depth": 2,
              "value": "优点和使用场景",
              "heading": "优点和使用场景"
            }
          ]
        },
        "title": "回调函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/cascade-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/cascade-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/cascade-function.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "级联函数",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "级联函数",
              "heading": "级联函数"
            },
            {
              "depth": 2,
              "value": "实现方法",
              "heading": "实现方法"
            }
          ]
        },
        "title": "级联函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/class-structure-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/class-structure-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/class-structure-function.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "类构造函数",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "类构造函数",
              "heading": "类构造函数"
            },
            {
              "depth": 2,
              "value": "ES5 中近类的结构",
              "heading": "es5-中近类的结构"
            },
            {
              "depth": 2,
              "value": "ES6 class 类",
              "heading": "es6-class-类"
            },
            {
              "depth": 3,
              "value": "类声明",
              "heading": "类声明"
            },
            {
              "depth": 3,
              "value": "表现形式",
              "heading": "表现形式"
            },
            {
              "depth": 3,
              "value": "类和普通函数的共性",
              "heading": "类和普通函数的共性"
            },
            {
              "depth": 3,
              "value": "函数存取器",
              "heading": "函数存取器"
            },
            {
              "depth": 3,
              "value": "可计算成员名称",
              "heading": "可计算成员名称"
            },
            {
              "depth": 3,
              "value": "生成器方法",
              "heading": "生成器方法"
            },
            {
              "depth": 3,
              "value": "静态成员",
              "heading": "静态成员"
            },
            {
              "depth": 3,
              "value": "继承与派生类",
              "heading": "继承与派生类"
            },
            {
              "depth": 3,
              "value": "类方法遮蔽",
              "heading": "类方法遮蔽"
            },
            {
              "depth": 3,
              "value": "静态成员继承",
              "heading": "静态成员继承"
            },
            {
              "depth": 3,
              "value": "派生自表达式的类",
              "heading": "派生自表达式的类"
            }
          ]
        },
        "title": "类构造函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/debounce",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/debounce.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/debounce.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "函数防抖",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "函数防抖",
              "heading": "函数防抖"
            },
            {
              "depth": 2,
              "value": "实现原理",
              "heading": "实现原理"
            },
            {
              "depth": 2,
              "value": "代码实现",
              "heading": "代码实现"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 2,
              "value": "应用实践",
              "heading": "应用实践"
            },
            {
              "depth": 3,
              "value": "注册实时验证",
              "heading": "注册实时验证"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "函数防抖"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/function-currying",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/function-currying.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/function-currying.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "函数柯里化",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "函数柯里化",
              "heading": "函数柯里化"
            },
            {
              "depth": 2,
              "value": "代码实现",
              "heading": "代码实现"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "反柯里化",
              "heading": "反柯里化"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "函数柯里化"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/hight-order-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/hight-order-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/hight-order-function.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "高阶函数",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "高阶函数",
              "heading": "高阶函数"
            },
            {
              "depth": 2,
              "value": "作为参数传递",
              "heading": "作为参数传递"
            },
            {
              "depth": 3,
              "value": "回调函数",
              "heading": "回调函数"
            },
            {
              "depth": 3,
              "value": "数组排序",
              "heading": "数组排序"
            },
            {
              "depth": 2,
              "value": "作为返回值输出",
              "heading": "作为返回值输出"
            },
            {
              "depth": 2,
              "value": "AOP 面向切面编程",
              "heading": "aop-面向切面编程"
            },
            {
              "depth": 2,
              "value": "其他应用",
              "heading": "其他应用"
            }
          ]
        },
        "title": "高阶函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/lazy-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/lazy-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/lazy-function.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "惰性函数",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "惰性函数",
              "heading": "惰性函数"
            },
            {
              "depth": 2,
              "value": "解决问题",
              "heading": "解决问题"
            },
            {
              "depth": 2,
              "value": "函数重写",
              "heading": "函数重写"
            },
            {
              "depth": 2,
              "value": "惰性载入",
              "heading": "惰性载入"
            },
            {
              "depth": 3,
              "value": "在函数被调用时处理函数",
              "heading": "在函数被调用时处理函数"
            },
            {
              "depth": 3,
              "value": "声明函数时指定适当的函数",
              "heading": "声明函数时指定适当的函数"
            }
          ]
        },
        "title": "惰性函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/memorize-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/memorize-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/memorize-function.md",
          "updatedTime": 1600510834000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "函数记忆",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "函数记忆",
              "heading": "函数记忆"
            }
          ]
        },
        "title": "函数记忆"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/partial-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/partial-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/partial-function.md",
          "updatedTime": 1600510834000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "偏函数",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "偏函数",
              "heading": "偏函数"
            },
            {
              "depth": 2,
              "value": "实际应用",
              "heading": "实际应用"
            },
            {
              "depth": 2,
              "value": "实现偏函数",
              "heading": "实现偏函数"
            }
          ]
        },
        "title": "偏函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/sleep-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/sleep-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/sleep-function.md",
          "updatedTime": 1600510834000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "函数睡眠",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "函数睡眠",
              "heading": "函数睡眠"
            },
            {
              "depth": 2,
              "value": "代码实现",
              "heading": "代码实现"
            },
            {
              "depth": 3,
              "value": "回调函数实现",
              "heading": "回调函数实现"
            },
            {
              "depth": 3,
              "value": "Promise 实现",
              "heading": "promise-实现"
            },
            {
              "depth": 3,
              "value": "Generator 实现",
              "heading": "generator-实现"
            },
            {
              "depth": 3,
              "value": "Async/Await 实现",
              "heading": "asyncawait-实现"
            },
            {
              "depth": 3,
              "value": "使用 node-sleep",
              "heading": "使用-node-sleep"
            }
          ]
        },
        "title": "函数睡眠"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/structure-function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/structure-function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/structure-function.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "构造函数",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 2,
              "value": "特点",
              "heading": "特点"
            },
            {
              "depth": 2,
              "value": "缺点",
              "heading": "缺点"
            },
            {
              "depth": 2,
              "value": "作用",
              "heading": "作用"
            },
            {
              "depth": 2,
              "value": "与普通函数对比",
              "heading": "与普通函数对比"
            }
          ]
        },
        "title": "构造函数"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types/throttle",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/ecmascript-function-objects/function-types/throttle.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/ecmascript-function-objects/function-types/throttle.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "函数类型",
            "order": 10,
            "path": "/core-modules/ecmascript-function-objects/function-types"
          },
          "title": "函数节流",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "函数节流",
              "heading": "函数节流"
            },
            {
              "depth": 2,
              "value": "目的",
              "heading": "目的"
            },
            {
              "depth": 2,
              "value": "代码实现",
              "heading": "代码实现"
            },
            {
              "depth": 2,
              "value": "应用实践",
              "heading": "应用实践"
            },
            {
              "depth": 3,
              "value": "原生实现应用",
              "heading": "原生实现应用"
            },
            {
              "depth": 3,
              "value": "React 应用",
              "heading": "react-应用"
            },
            {
              "depth": 3,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 2,
              "value": "应用实践",
              "heading": "应用实践-1"
            },
            {
              "depth": 3,
              "value": "页面滚动事件",
              "heading": "页面滚动事件"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "函数节流"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/compilation/blocks-as-scopes",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/compilation/blocks-as-scopes.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/compilation/blocks-as-scopes.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "编译阶段",
            "order": 2,
            "path": "/core-modules/executable-code-and-execution-contexts/compilation"
          },
          "title": "块作用域",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "块作用域",
              "heading": "块作用域"
            },
            {
              "depth": 2,
              "value": "声明关键字",
              "heading": "声明关键字"
            },
            {
              "depth": 3,
              "value": "var",
              "heading": "var"
            },
            {
              "depth": 3,
              "value": "let",
              "heading": "let"
            },
            {
              "depth": 3,
              "value": "const",
              "heading": "const"
            },
            {
              "depth": 2,
              "value": "暂时性死区",
              "heading": "暂时性死区"
            },
            {
              "depth": 2,
              "value": "显式块级作用域",
              "heading": "显式块级作用域"
            }
          ]
        },
        "title": "块作用域"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/compilation/closures",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/compilation/closures.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/compilation/closures.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "编译阶段",
            "order": 2,
            "path": "/core-modules/executable-code-and-execution-contexts/compilation"
          },
          "title": "闭包",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "闭包",
              "heading": "闭包"
            },
            {
              "depth": 2,
              "value": "定义",
              "heading": "定义"
            },
            {
              "depth": 2,
              "value": "执行过程分析",
              "heading": "执行过程分析"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 2,
              "value": "优缺点",
              "heading": "优缺点"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "闭包"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/compilation/compilation",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/compilation/compilation.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/compilation/compilation.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "编译阶段",
            "order": 2,
            "path": "/core-modules/executable-code-and-execution-contexts/compilation"
          },
          "title": "编译阶段",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "编译阶段",
              "heading": "编译阶段"
            },
            {
              "depth": 2,
              "value": "编译原理",
              "heading": "编译原理"
            },
            {
              "depth": 3,
              "value": "分词和词法分析",
              "heading": "分词和词法分析"
            },
            {
              "depth": 3,
              "value": "解析和语法分析",
              "heading": "解析和语法分析"
            },
            {
              "depth": 3,
              "value": "代码生成",
              "heading": "代码生成"
            },
            {
              "depth": 2,
              "value": "编译过程",
              "heading": "编译过程"
            },
            {
              "depth": 3,
              "value": "编译过程详解",
              "heading": "编译过程详解"
            }
          ]
        },
        "title": "编译阶段"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/compilation/function-as-scopes",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/compilation/function-as-scopes.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/compilation/function-as-scopes.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "编译阶段",
            "order": 2,
            "path": "/core-modules/executable-code-and-execution-contexts/compilation"
          },
          "title": "函数作用域",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "函数作用域",
              "heading": "函数作用域"
            },
            {
              "depth": 2,
              "value": "隐藏内部实现",
              "heading": "隐藏内部实现"
            },
            {
              "depth": 2,
              "value": "规避命名冲突",
              "heading": "规避命名冲突"
            },
            {
              "depth": 3,
              "value": "全局命名空间",
              "heading": "全局命名空间"
            },
            {
              "depth": 3,
              "value": "模块管理",
              "heading": "模块管理"
            },
            {
              "depth": 2,
              "value": "匿名和具名函数表达式",
              "heading": "匿名和具名函数表达式"
            },
            {
              "depth": 2,
              "value": "立即执行函数表达式 IIFE",
              "heading": "立即执行函数表达式-iife"
            }
          ]
        },
        "title": "函数作用域"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/compilation/hoisting",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/compilation/hoisting.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/compilation/hoisting.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "编译阶段",
            "order": 2,
            "path": "/core-modules/executable-code-and-execution-contexts/compilation"
          },
          "title": "声明提升",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "声明提升",
              "heading": "声明提升"
            },
            {
              "depth": 2,
              "value": "变量声明提升",
              "heading": "变量声明提升"
            },
            {
              "depth": 2,
              "value": "函数声明提升",
              "heading": "函数声明提升"
            },
            {
              "depth": 2,
              "value": "函数覆盖",
              "heading": "函数覆盖"
            },
            {
              "depth": 3,
              "value": "重复声明无效",
              "heading": "重复声明无效"
            },
            {
              "depth": 3,
              "value": "函数声明优先",
              "heading": "函数声明优先"
            },
            {
              "depth": 3,
              "value": "函数声明覆盖",
              "heading": "函数声明覆盖"
            }
          ]
        },
        "title": "声明提升"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/compilation/lexical-scope",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/compilation/lexical-scope.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/compilation/lexical-scope.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "编译阶段",
            "order": 2,
            "path": "/core-modules/executable-code-and-execution-contexts/compilation"
          },
          "title": "词法作用域",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "作用域",
              "heading": "作用域"
            },
            {
              "depth": 2,
              "value": "词法作用域/静态作用域",
              "heading": "词法作用域静态作用域"
            },
            {
              "depth": 3,
              "value": "查找",
              "heading": "查找"
            },
            {
              "depth": 3,
              "value": "遮蔽",
              "heading": "遮蔽"
            },
            {
              "depth": 2,
              "value": "动态作用域",
              "heading": "动态作用域"
            }
          ]
        },
        "title": "词法作用域"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/concurrency-model/concurrency-model",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/concurrency-model/concurrency-model.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/concurrency-model/concurrency-model.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "并发模型",
            "order": 5,
            "path": "/core-modules/executable-code-and-execution-contexts/concurrency-model"
          },
          "title": "并发模型",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "并发模型",
              "heading": "并发模型"
            },
            {
              "depth": 2,
              "value": "名词解释",
              "heading": "名词解释"
            },
            {
              "depth": 2,
              "value": "运行环境",
              "heading": "运行环境"
            },
            {
              "depth": 3,
              "value": "浏览器线程",
              "heading": "浏览器线程"
            },
            {
              "depth": 3,
              "value": "内核引擎",
              "heading": "内核引擎"
            },
            {
              "depth": 2,
              "value": "单线程",
              "heading": "单线程"
            },
            {
              "depth": 2,
              "value": "任务队列",
              "heading": "任务队列"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "并发模型"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/concurrency-model/event-loop",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/concurrency-model/event-loop.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/concurrency-model/event-loop.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "并发模型",
            "order": 5,
            "path": "/core-modules/executable-code-and-execution-contexts/concurrency-model"
          },
          "title": "事件循环",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "事件循环",
              "heading": "事件循环"
            },
            {
              "depth": 2,
              "value": "浏览器环境",
              "heading": "浏览器环境"
            },
            {
              "depth": 2,
              "value": "Node 环境",
              "heading": "node-环境"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "事件循环"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/concurrency-model/timers-mechanism",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/concurrency-model/timers-mechanism.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/concurrency-model/timers-mechanism.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "并发模型",
            "order": 5,
            "path": "/core-modules/executable-code-and-execution-contexts/concurrency-model"
          },
          "title": "定时器机制",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "定时器机制",
              "heading": "定时器机制"
            },
            {
              "depth": 2,
              "value": "事件排队",
              "heading": "事件排队"
            },
            {
              "depth": 2,
              "value": "先进先出原则",
              "heading": "先进先出原则"
            },
            {
              "depth": 2,
              "value": "间歇调用定时器调用被废弃",
              "heading": "间歇调用定时器调用被废弃"
            },
            {
              "depth": 2,
              "value": "定时器无法保证准时执行回调函数",
              "heading": "定时器无法保证准时执行回调函数"
            },
            {
              "depth": 2,
              "value": "间歇调用定时器的连续执行",
              "heading": "间歇调用定时器的连续执行"
            },
            {
              "depth": 2,
              "value": "超时调用定时器按固定间隔触发周期性定时器",
              "heading": "超时调用定时器按固定间隔触发周期性定时器"
            }
          ]
        },
        "title": "定时器机制"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/execution/execution-context-stack",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/execution/execution-context-stack.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/execution/execution-context-stack.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "执行阶段",
            "order": 3,
            "path": "/core-modules/executable-code-and-execution-contexts/execution"
          },
          "title": "执行上下文",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "执行上下文栈",
              "heading": "执行上下文栈"
            },
            {
              "depth": 2,
              "value": "可执行代码",
              "heading": "可执行代码"
            },
            {
              "depth": 2,
              "value": "栈堆实现分析",
              "heading": "栈堆实现分析"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "执行上下文"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/execution/scope-chain",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/execution/scope-chain.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/execution/scope-chain.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "执行阶段",
            "order": 3,
            "path": "/core-modules/executable-code-and-execution-contexts/execution"
          },
          "title": "作用域链",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "作用域链",
              "heading": "作用域链"
            },
            {
              "depth": 2,
              "value": "函数的创建",
              "heading": "函数的创建"
            },
            {
              "depth": 2,
              "value": "函数的激活",
              "heading": "函数的激活"
            },
            {
              "depth": 2,
              "value": "示例分析",
              "heading": "示例分析"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "作用域链"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/execution/this",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/execution/this.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/execution/this.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "执行阶段",
            "order": 3,
            "path": "/core-modules/executable-code-and-execution-contexts/execution"
          },
          "title": "当前执行上下文 this",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "当前执行上下文 this",
              "heading": "当前执行上下文-this"
            },
            {
              "depth": 2,
              "value": "调用位置",
              "heading": "调用位置"
            },
            {
              "depth": 2,
              "value": "绑定规则",
              "heading": "绑定规则"
            },
            {
              "depth": 3,
              "value": "默认绑定",
              "heading": "默认绑定"
            },
            {
              "depth": 3,
              "value": "隐式绑定",
              "heading": "隐式绑定"
            },
            {
              "depth": 4,
              "value": "隐式丢失",
              "heading": "隐式丢失"
            },
            {
              "depth": 3,
              "value": "显式绑定",
              "heading": "显式绑定"
            },
            {
              "depth": 4,
              "value": "硬绑定",
              "heading": "硬绑定"
            },
            {
              "depth": 4,
              "value": "内置函数",
              "heading": "内置函数"
            },
            {
              "depth": 3,
              "value": "构造调用绑定",
              "heading": "构造调用绑定"
            },
            {
              "depth": 2,
              "value": "优先级",
              "heading": "优先级"
            },
            {
              "depth": 3,
              "value": "隐式绑定和显式绑定",
              "heading": "隐式绑定和显式绑定"
            },
            {
              "depth": 3,
              "value": "构造调用绑定和隐式绑定",
              "heading": "构造调用绑定和隐式绑定"
            },
            {
              "depth": 2,
              "value": "绑定例外",
              "heading": "绑定例外"
            },
            {
              "depth": 3,
              "value": "忽略指向",
              "heading": "忽略指向"
            },
            {
              "depth": 3,
              "value": "软绑定",
              "heading": "软绑定"
            },
            {
              "depth": 3,
              "value": "指向变更",
              "heading": "指向变更"
            },
            {
              "depth": 3,
              "value": "箭头函数",
              "heading": "箭头函数"
            },
            {
              "depth": 2,
              "value": "应用场景总结",
              "heading": "应用场景总结"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "当前执行上下文 this"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/execution/variable-object",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/execution/variable-object.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/execution/variable-object.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "执行阶段",
            "order": 3,
            "path": "/core-modules/executable-code-and-execution-contexts/execution"
          },
          "title": "变量对象",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "变量对象",
              "heading": "变量对象"
            },
            {
              "depth": 2,
              "value": "全局执行上下文",
              "heading": "全局执行上下文"
            },
            {
              "depth": 2,
              "value": "函数执行上下文",
              "heading": "函数执行上下文"
            },
            {
              "depth": 2,
              "value": "执行过程",
              "heading": "执行过程"
            },
            {
              "depth": 3,
              "value": "进入执行上下文阶段的变量对象",
              "heading": "进入执行上下文阶段的变量对象"
            },
            {
              "depth": 3,
              "value": "代码执行阶段的变量对象",
              "heading": "代码执行阶段的变量对象"
            },
            {
              "depth": 2,
              "value": "变量对象和活动对象",
              "heading": "变量对象和活动对象"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "变量对象"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/memory-management/garbage-collection",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/memory-management/garbage-collection.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/memory-management/garbage-collection.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "内存管理",
            "order": 4,
            "path": "/core-modules/executable-code-and-execution-contexts/memory-management"
          },
          "title": "垃圾回收",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "垃圾回收",
              "heading": "垃圾回收"
            },
            {
              "depth": 2,
              "value": "原理",
              "heading": "原理"
            },
            {
              "depth": 3,
              "value": "引用计数法",
              "heading": "引用计数法"
            },
            {
              "depth": 3,
              "value": "标记清除法",
              "heading": "标记清除法"
            },
            {
              "depth": 2,
              "value": "堆栈溢出",
              "heading": "堆栈溢出"
            },
            {
              "depth": 2,
              "value": "内存泄漏",
              "heading": "内存泄漏"
            },
            {
              "depth": 3,
              "value": "全局变量",
              "heading": "全局变量"
            },
            {
              "depth": 3,
              "value": "分离的 DOM 引用",
              "heading": "分离的-dom-引用"
            },
            {
              "depth": 3,
              "value": "闭包",
              "heading": "闭包"
            },
            {
              "depth": 3,
              "value": "定时器",
              "heading": "定时器"
            },
            {
              "depth": 3,
              "value": "控制台打印",
              "heading": "控制台打印"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "垃圾回收"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/memory-management/memory-life-cycle",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/memory-management/memory-life-cycle.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/memory-management/memory-life-cycle.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "内存管理",
            "order": 4,
            "path": "/core-modules/executable-code-and-execution-contexts/memory-management"
          },
          "title": "内存生命周期",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "内存生命周期",
              "heading": "内存生命周期"
            },
            {
              "depth": 2,
              "value": "内存分配",
              "heading": "内存分配"
            },
            {
              "depth": 3,
              "value": "值的初始化",
              "heading": "值的初始化"
            },
            {
              "depth": 3,
              "value": "函数调用分配",
              "heading": "函数调用分配"
            },
            {
              "depth": 2,
              "value": "内存使用",
              "heading": "内存使用"
            },
            {
              "depth": 2,
              "value": "内存回收",
              "heading": "内存回收"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "内存生命周期"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/memory-management/memory-model",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/executable-code-and-execution-contexts/memory-management/memory-model.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/executable-code-and-execution-contexts/memory-management/memory-model.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "内存管理",
            "order": 4,
            "path": "/core-modules/executable-code-and-execution-contexts/memory-management"
          },
          "title": "内存模型",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "内存模型",
              "heading": "内存模型"
            },
            {
              "depth": 2,
              "value": "栈数据结构",
              "heading": "栈数据结构"
            },
            {
              "depth": 2,
              "value": "堆数据结构",
              "heading": "堆数据结构"
            },
            {
              "depth": 2,
              "value": "队列数据结构",
              "heading": "队列数据结构"
            },
            {
              "depth": 2,
              "value": "变量对象与基础数据类型",
              "heading": "变量对象与基础数据类型"
            },
            {
              "depth": 2,
              "value": "引用数据类型与堆内存",
              "heading": "引用数据类型与堆内存"
            },
            {
              "depth": 2,
              "value": "数据拷贝",
              "heading": "数据拷贝"
            },
            {
              "depth": 3,
              "value": "基本数据类型",
              "heading": "基本数据类型"
            },
            {
              "depth": 3,
              "value": "引用数据类型",
              "heading": "引用数据类型"
            },
            {
              "depth": 2,
              "value": "归纳总结",
              "heading": "归纳总结"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "内存模型"
      },
      {
        "path": "/core-modules/modularization/compound",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/modularization/compound.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/modularization/compound.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "模块化",
            "order": 11,
            "path": "/core-modules/modularization"
          },
          "title": "模块导入/导出的复合写法",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "模块导入/导出的复合写法",
              "heading": "模块导入导出的复合写法"
            },
            {
              "depth": 2,
              "value": "模块整体转发",
              "heading": "模块整体转发"
            },
            {
              "depth": 2,
              "value": "模块部分接口转发",
              "heading": "模块部分接口转发"
            },
            {
              "depth": 2,
              "value": "模块部分重命名转发",
              "heading": "模块部分重命名转发"
            },
            {
              "depth": 2,
              "value": "默认模块转发",
              "heading": "默认模块转发"
            },
            {
              "depth": 2,
              "value": "命名模块改默认模块",
              "heading": "命名模块改默认模块"
            },
            {
              "depth": 2,
              "value": "默认模块改命名模块",
              "heading": "默认模块改命名模块"
            },
            {
              "depth": 2,
              "value": "无对应写法场景",
              "heading": "无对应写法场景"
            }
          ]
        },
        "title": "模块导入/导出的复合写法"
      },
      {
        "path": "/core-modules/modularization/cross-module-constant",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/modularization/cross-module-constant.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/modularization/cross-module-constant.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "模块化",
            "order": 11,
            "path": "/core-modules/modularization"
          },
          "title": "跨模块常量",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "跨模块常量",
              "heading": "跨模块常量"
            }
          ]
        },
        "title": "跨模块常量"
      },
      {
        "path": "/core-modules/modularization/dynamic-import",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/modularization/dynamic-import.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/modularization/dynamic-import.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "模块化",
            "order": 10,
            "path": "/core-modules/modularization"
          },
          "title": "动态加载",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "动态加载",
              "heading": "动态加载"
            },
            {
              "depth": 2,
              "value": "适用场景",
              "heading": "适用场景"
            },
            {
              "depth": 3,
              "value": "按需加载",
              "heading": "按需加载"
            },
            {
              "depth": 3,
              "value": "条件加载",
              "heading": "条件加载"
            },
            {
              "depth": 3,
              "value": "动态的模块路径",
              "heading": "动态的模块路径"
            },
            {
              "depth": 2,
              "value": "注意事项",
              "heading": "注意事项"
            },
            {
              "depth": 3,
              "value": "解构赋值输出模块导入",
              "heading": "解构赋值输出模块导入"
            },
            {
              "depth": 3,
              "value": "默认模块导入",
              "heading": "默认模块导入"
            },
            {
              "depth": 3,
              "value": "命名模块导入",
              "heading": "命名模块导入"
            },
            {
              "depth": 3,
              "value": "并发加载多个模块",
              "heading": "并发加载多个模块"
            },
            {
              "depth": 3,
              "value": "异步函数的模块导入",
              "heading": "异步函数的模块导入"
            }
          ]
        },
        "title": "动态加载"
      },
      {
        "path": "/core-modules/modularization/export",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/modularization/export.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/modularization/export.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "模块化",
            "order": 11,
            "path": "/core-modules/modularization"
          },
          "title": "模块导出 export",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "模块导出 export",
              "heading": "模块导出-export"
            },
            {
              "depth": 2,
              "value": "导出方式",
              "heading": "导出方式"
            },
            {
              "depth": 3,
              "value": "命名导出",
              "heading": "命名导出"
            },
            {
              "depth": 3,
              "value": "默认导出",
              "heading": "默认导出"
            },
            {
              "depth": 2,
              "value": "特性规范",
              "heading": "特性规范"
            },
            {
              "depth": 3,
              "value": "对应关系",
              "heading": "对应关系"
            },
            {
              "depth": 3,
              "value": "模块顶层输出",
              "heading": "模块顶层输出"
            }
          ]
        },
        "title": "模块导出 export"
      },
      {
        "path": "/core-modules/modularization/import",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/modularization/import.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/modularization/import.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "模块化",
            "order": 11,
            "path": "/core-modules/modularization"
          },
          "title": "模块导入 import",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "模块导入 import",
              "heading": "模块导入-import"
            },
            {
              "depth": 2,
              "value": "导入方式",
              "heading": "导入方式"
            },
            {
              "depth": 3,
              "value": "命名导入",
              "heading": "命名导入"
            },
            {
              "depth": 3,
              "value": "命名空间导入",
              "heading": "命名空间导入"
            },
            {
              "depth": 3,
              "value": "默认导入",
              "heading": "默认导入"
            },
            {
              "depth": 3,
              "value": "空的导入",
              "heading": "空的导入"
            },
            {
              "depth": 2,
              "value": "特性规范",
              "heading": "特性规范"
            },
            {
              "depth": 3,
              "value": "只读性",
              "heading": "只读性"
            },
            {
              "depth": 3,
              "value": "输入路径",
              "heading": "输入路径"
            },
            {
              "depth": 3,
              "value": "模块提升",
              "heading": "模块提升"
            },
            {
              "depth": 3,
              "value": "静态执行",
              "heading": "静态执行"
            },
            {
              "depth": 3,
              "value": "重复加载",
              "heading": "重复加载"
            },
            {
              "depth": 2,
              "value": "模块化隔离",
              "heading": "模块化隔离"
            }
          ]
        },
        "title": "模块导入 import"
      },
      {
        "path": "/core-modules/modularization/modularization",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/modularization/modularization.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/modularization/modularization.md",
          "updatedTime": 1600510979000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "模块化",
            "order": 11,
            "path": "/core-modules/modularization"
          },
          "title": "模块化",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "模块化",
              "heading": "模块化"
            },
            {
              "depth": 2,
              "value": "模块化趋势",
              "heading": "模块化趋势"
            },
            {
              "depth": 3,
              "value": "痛点",
              "heading": "痛点"
            },
            {
              "depth": 3,
              "value": "优势",
              "heading": "优势"
            },
            {
              "depth": 2,
              "value": "模块化进化史",
              "heading": "模块化进化史"
            },
            {
              "depth": 3,
              "value": "全局模式",
              "heading": "全局模式"
            },
            {
              "depth": 3,
              "value": "单例模式",
              "heading": "单例模式"
            },
            {
              "depth": 3,
              "value": "IIFE 模式",
              "heading": "iife-模式"
            },
            {
              "depth": 3,
              "value": "IIFE 模式增强",
              "heading": "iife-模式增强"
            },
            {
              "depth": 2,
              "value": "模块化方案",
              "heading": "模块化方案"
            },
            {
              "depth": 3,
              "value": "CommonJS",
              "heading": "commonjs"
            },
            {
              "depth": 3,
              "value": "AMD",
              "heading": "amd"
            },
            {
              "depth": 3,
              "value": "CMD",
              "heading": "cmd"
            },
            {
              "depth": 3,
              "value": "ES6 Module",
              "heading": "es6-module"
            },
            {
              "depth": 2,
              "value": "严格模式",
              "heading": "严格模式"
            },
            {
              "depth": 2,
              "value": "模块化与组合化",
              "heading": "模块化与组合化"
            }
          ]
        },
        "title": "模块化"
      },
      {
        "path": "/core-modules/modularization/module-inheritance",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/core-modules/modularization/module-inheritance.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/core-modules/modularization/module-inheritance.md",
          "updatedTime": 1599114194000,
          "nav": {
            "title": "核心模块",
            "order": 3,
            "path": "/core-modules"
          },
          "group": {
            "title": "模块化",
            "order": 11,
            "path": "/core-modules/modularization"
          },
          "title": "模块继承",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "模块继承",
              "heading": "模块继承"
            }
          ]
        },
        "title": "模块继承"
      },
      {
        "path": "/design-patterns/design-principles-and-ideas",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/design-principles-and-ideas.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/design-principles-and-ideas.md",
          "updatedTime": 1702920170000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "设计思想与原则",
            "order": 2,
            "path": "/design-patterns"
          },
          "title": "设计思想与原则",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "设计思想与原则",
              "heading": "设计思想与原则"
            },
            {
              "depth": 3,
              "value": "单一职责原则",
              "heading": "单一职责原则"
            },
            {
              "depth": 3,
              "value": "开放封闭原则",
              "heading": "开放封闭原则"
            },
            {
              "depth": 3,
              "value": "里式替换原则",
              "heading": "里式替换原则"
            },
            {
              "depth": 3,
              "value": "接口隔离原则",
              "heading": "接口隔离原则"
            },
            {
              "depth": 3,
              "value": "依赖反转原则",
              "heading": "依赖反转原则"
            }
          ]
        },
        "title": "设计思想与原则"
      },
      {
        "path": "/design-patterns",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/index.md",
          "updatedTime": 1702920170000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "设计模式",
            "order": 1,
            "path": "/design-patterns"
          },
          "title": "设计模式",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "设计模式",
              "heading": "设计模式"
            }
          ]
        },
        "title": "设计模式"
      },
      {
        "path": "/design-patterns/architectural/dependency-injection",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/architectural/dependency-injection.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/architectural/dependency-injection.md",
          "updatedTime": 1702920170000,
          "slugs": [],
          "title": "Dependency-injection",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          },
          "group": {
            "path": "/design-patterns/architectural",
            "title": "Architectural"
          }
        },
        "title": "Dependency-injection"
      },
      {
        "path": "/design-patterns/architectural/model-view-controller",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/architectural/model-view-controller.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/architectural/model-view-controller.md",
          "updatedTime": 1702920170000,
          "slugs": [],
          "title": "Model-view-controller",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          },
          "group": {
            "path": "/design-patterns/architectural",
            "title": "Architectural"
          }
        },
        "title": "Model-view-controller"
      },
      {
        "path": "/design-patterns/architectural/model-view-viewmodel",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/architectural/model-view-viewmodel.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/architectural/model-view-viewmodel.md",
          "updatedTime": 1702920170000,
          "slugs": [],
          "title": "Model-view-viewmodel",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          },
          "group": {
            "path": "/design-patterns/architectural",
            "title": "Architectural"
          }
        },
        "title": "Model-view-viewmodel"
      },
      {
        "path": "/design-patterns/architectural/service-locator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/architectural/service-locator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/architectural/service-locator.md",
          "updatedTime": 1702920170000,
          "slugs": [],
          "title": "Service-locator",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          },
          "group": {
            "path": "/design-patterns/architectural",
            "title": "Architectural"
          }
        },
        "title": "Service-locator"
      },
      {
        "path": "/design-patterns/behavioral/chain-of-responsibility",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/chain-of-responsibility.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/chain-of-responsibility.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "职责链模式",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "职责链模式",
              "heading": "职责链模式"
            }
          ]
        },
        "title": "职责链模式"
      },
      {
        "path": "/design-patterns/behavioral/command",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/command.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/command.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "命令模式",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "命令模式",
              "heading": "命令模式"
            }
          ]
        },
        "title": "命令模式"
      },
      {
        "path": "/design-patterns/behavioral/interpreter",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/interpreter.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/interpreter.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "解释器模式",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "解释器模式",
              "heading": "解释器模式"
            }
          ]
        },
        "title": "解释器模式"
      },
      {
        "path": "/design-patterns/behavioral/iterator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/iterator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/iterator.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "迭代器模式",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "迭代器模式",
              "heading": "迭代器模式"
            }
          ]
        },
        "title": "迭代器模式"
      },
      {
        "path": "/design-patterns/behavioral/mediator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/mediator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/mediator.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "中介者模式",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "中介者模式",
              "heading": "中介者模式"
            }
          ]
        },
        "title": "中介者模式"
      },
      {
        "path": "/design-patterns/behavioral/memento",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/memento.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/memento.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "备忘录模式",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "备忘录模式",
              "heading": "备忘录模式"
            }
          ]
        },
        "title": "备忘录模式"
      },
      {
        "path": "/design-patterns/behavioral/observer",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/observer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/observer.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "观察者模式",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "观察者模式",
              "heading": "观察者模式"
            },
            {
              "depth": 2,
              "value": "概述",
              "heading": "概述"
            },
            {
              "depth": 2,
              "value": "结构",
              "heading": "结构"
            },
            {
              "depth": 2,
              "value": "代码实现",
              "heading": "代码实现"
            },
            {
              "depth": 2,
              "value": "订阅发布模式",
              "heading": "订阅发布模式"
            }
          ]
        },
        "title": "观察者模式"
      },
      {
        "path": "/design-patterns/behavioral/state",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/state.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/state.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "状态模式",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "状态模式",
              "heading": "状态模式"
            },
            {
              "depth": 2,
              "value": "概述",
              "heading": "概述"
            },
            {
              "depth": 3,
              "value": "结构",
              "heading": "结构"
            }
          ]
        },
        "title": "状态模式"
      },
      {
        "path": "/design-patterns/behavioral/strategy",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/strategy.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/strategy.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "策略模式",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "策略模式",
              "heading": "策略模式"
            },
            {
              "depth": 2,
              "value": "概述",
              "heading": "概述"
            },
            {
              "depth": 2,
              "value": "结构",
              "heading": "结构"
            }
          ]
        },
        "title": "策略模式"
      },
      {
        "path": "/design-patterns/behavioral/template-method",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/template-method.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/template-method.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "模版方法模式",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "模版方法模式",
              "heading": "模版方法模式"
            },
            {
              "depth": 2,
              "value": "概述",
              "heading": "概述"
            },
            {
              "depth": 2,
              "value": "结构",
              "heading": "结构"
            }
          ]
        },
        "title": "模版方法模式"
      },
      {
        "path": "/design-patterns/behavioral/visitor",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/behavioral/visitor.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/behavioral/visitor.md",
          "updatedTime": 1756315563000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "行为型",
            "order": 4,
            "path": "/design-patterns/behavioral"
          },
          "title": "访问者模式",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "访问者模式",
              "heading": "访问者模式"
            }
          ]
        },
        "title": "访问者模式"
      },
      {
        "path": "/design-patterns/creational/abstract-factory",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/creational/abstract-factory.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/creational/abstract-factory.md",
          "updatedTime": 1703005365000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "创建型",
            "order": 2,
            "path": "/design-patterns/creational"
          },
          "title": "抽象工厂模式",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "抽象工厂模式",
              "heading": "抽象工厂模式"
            }
          ]
        },
        "title": "抽象工厂模式"
      },
      {
        "path": "/design-patterns/creational/factory-method",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/creational/factory-method.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/creational/factory-method.md",
          "updatedTime": 1703005365000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "创建型",
            "order": 2,
            "path": "/design-patterns/creational"
          },
          "title": "工厂方法模式",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "工厂方法模式",
              "heading": "工厂方法模式"
            }
          ]
        },
        "title": "工厂方法模式"
      },
      {
        "path": "/design-patterns/creational/prototype",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/creational/prototype.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/creational/prototype.md",
          "updatedTime": 1703005365000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "创建型",
            "order": 2,
            "path": "/design-patterns/creational"
          },
          "title": "原型模式",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "原型模式",
              "heading": "原型模式"
            }
          ]
        },
        "title": "原型模式"
      },
      {
        "path": "/design-patterns/creational/singleton",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/creational/singleton.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/creational/singleton.md",
          "updatedTime": 1703005365000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "创建型",
            "order": 2,
            "path": "/design-patterns/creational"
          },
          "title": "单例模式",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "单例模式",
              "heading": "单例模式"
            }
          ]
        },
        "title": "单例模式"
      },
      {
        "path": "/design-patterns/structual/adapter",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/structual/adapter.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/structual/adapter.md",
          "updatedTime": 1703090530000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "结构型",
            "order": 3,
            "path": "/design-patterns/structual"
          },
          "title": "适配器模式",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "适配器模式",
              "heading": "适配器模式"
            },
            {
              "depth": 2,
              "value": "类适配器",
              "heading": "类适配器"
            },
            {
              "depth": 2,
              "value": "对象适配器",
              "heading": "对象适配器"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            }
          ]
        },
        "title": "适配器模式"
      },
      {
        "path": "/design-patterns/structual/bridge",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/structual/bridge.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/structual/bridge.md",
          "updatedTime": 1703090530000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "结构型",
            "order": 3,
            "path": "/design-patterns/structual"
          },
          "title": "桥接模式",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "桥接模式",
              "heading": "桥接模式"
            }
          ]
        },
        "title": "桥接模式"
      },
      {
        "path": "/design-patterns/structual/composite",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/structual/composite.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/structual/composite.md",
          "updatedTime": 1703090530000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "结构型",
            "order": 3,
            "path": "/design-patterns/structual"
          },
          "title": "组合模式",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "组合模式",
              "heading": "组合模式"
            }
          ]
        },
        "title": "组合模式"
      },
      {
        "path": "/design-patterns/structual/decorator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/structual/decorator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/structual/decorator.md",
          "updatedTime": 1703090530000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "结构型",
            "order": 3,
            "path": "/design-patterns/structual"
          },
          "title": "装饰者模式",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "装饰者模式",
              "heading": "装饰者模式"
            }
          ]
        },
        "title": "装饰者模式"
      },
      {
        "path": "/design-patterns/structual/facade",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/structual/facade.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/structual/facade.md",
          "updatedTime": 1703090530000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "结构型",
            "order": 3,
            "path": "/design-patterns/structual"
          },
          "title": "外观模式",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "外观模式",
              "heading": "外观模式"
            }
          ]
        },
        "title": "外观模式"
      },
      {
        "path": "/design-patterns/structual/flyweight",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/structual/flyweight.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/structual/flyweight.md",
          "updatedTime": 1703090530000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "结构型",
            "order": 3,
            "path": "/design-patterns/structual"
          },
          "title": "享元模式",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "享元模式",
              "heading": "享元模式"
            }
          ]
        },
        "title": "享元模式"
      },
      {
        "path": "/design-patterns/structual/proxy",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/design-patterns/structual/proxy.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/structual/proxy.md",
          "updatedTime": 1703090530000,
          "nav": {
            "title": "设计模式",
            "order": 10,
            "path": "/design-patterns"
          },
          "group": {
            "title": "结构型",
            "order": 3,
            "path": "/design-patterns/structual"
          },
          "title": "代理模式",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "代理模式",
              "heading": "代理模式"
            }
          ]
        },
        "title": "代理模式"
      },
      {
        "path": "/document-object-model",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/index.md",
          "updatedTime": 1648050839000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "DOM 文档对象模型",
            "order": 1,
            "path": "/document-object-model"
          },
          "title": "DOM 文档对象模型",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "DOM 文档对象模型",
              "heading": "dom-文档对象模型"
            }
          ]
        },
        "title": "DOM 文档对象模型"
      },
      {
        "path": "/document-object-model/cssom/css-style-declaration",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/cssom/css-style-declaration.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/cssom/css-style-declaration.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "CSSOM",
            "order": 7,
            "path": "/document-object-model/cssom"
          },
          "title": "CSSStyleDeclaration",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "CSSStyleDeclaration",
              "heading": "cssstyledeclaration"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "CSSStyleDeclaration"
      },
      {
        "path": "/document-object-model/cssom/css-style-sheet",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/cssom/css-style-sheet.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/cssom/css-style-sheet.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "CSSOM",
            "order": 7,
            "path": "/document-object-model/cssom"
          },
          "title": "CSSstyleSheet",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "CSSstyleSheet",
              "heading": "cssstylesheet"
            }
          ]
        },
        "title": "CSSstyleSheet"
      },
      {
        "path": "/document-object-model/document/document-fragment",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/document/document-fragment.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/document/document-fragment.md",
          "updatedTime": 1622527333000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Document",
            "order": 5,
            "path": "/document-object-model/document"
          },
          "title": "DocumentFragment",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "DocumentFragment",
              "heading": "documentfragment"
            }
          ]
        },
        "title": "DocumentFragment"
      },
      {
        "path": "/document-object-model/document/document-methods",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/document/document-methods.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/document/document-methods.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Document",
            "order": 5,
            "path": "/document-object-model/document"
          },
          "title": "Document 方法",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Document 方法",
              "heading": "document-方法"
            },
            {
              "depth": 2,
              "value": "修改文档",
              "heading": "修改文档"
            },
            {
              "depth": 3,
              "value": "open",
              "heading": "open"
            },
            {
              "depth": 3,
              "value": "write",
              "heading": "write"
            },
            {
              "depth": 3,
              "value": "writeIn",
              "heading": "writein"
            },
            {
              "depth": 3,
              "value": "close",
              "heading": "close"
            },
            {
              "depth": 3,
              "value": "hasFocus",
              "heading": "hasfocus"
            },
            {
              "depth": 3,
              "value": "elementFromPoint",
              "heading": "elementfrompoint"
            },
            {
              "depth": 3,
              "value": "adoptNode",
              "heading": "adoptnode"
            },
            {
              "depth": 3,
              "value": "importNode",
              "heading": "importnode"
            },
            {
              "depth": 2,
              "value": "查找节点",
              "heading": "查找节点"
            },
            {
              "depth": 3,
              "value": "getElementById",
              "heading": "getelementbyid"
            },
            {
              "depth": 3,
              "value": "getElementsByName",
              "heading": "getelementsbyname"
            },
            {
              "depth": 3,
              "value": "getElementsByTagName",
              "heading": "getelementsbytagname"
            },
            {
              "depth": 3,
              "value": "getElementByClassName",
              "heading": "getelementbyclassname"
            },
            {
              "depth": 3,
              "value": "querySelector",
              "heading": "queryselector"
            },
            {
              "depth": 3,
              "value": "querySelectorAll",
              "heading": "queryselectorall"
            },
            {
              "depth": 2,
              "value": "创建节点",
              "heading": "创建节点"
            },
            {
              "depth": 3,
              "value": "createElement",
              "heading": "createelement"
            },
            {
              "depth": 3,
              "value": "createAttribute",
              "heading": "createattribute"
            },
            {
              "depth": 3,
              "value": "createDocumentFragment",
              "heading": "createdocumentfragment"
            },
            {
              "depth": 2,
              "value": "文档对象方法总结",
              "heading": "文档对象方法总结"
            }
          ]
        },
        "title": "Document 方法"
      },
      {
        "path": "/document-object-model/document/document-properties",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/document/document-properties.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/document/document-properties.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Document",
            "order": 5,
            "path": "/document-object-model/document"
          },
          "title": "Document 属性",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Document 属性",
              "heading": "document-属性"
            },
            {
              "depth": 2,
              "value": "文档类型定义 doctype",
              "heading": "文档类型定义-doctype"
            },
            {
              "depth": 2,
              "value": "文档字符集 characterSet",
              "heading": "文档字符集-characterset"
            },
            {
              "depth": 2,
              "value": "文档标题 title",
              "heading": "文档标题-title"
            },
            {
              "depth": 2,
              "value": "文档加载状态 raedyState",
              "heading": "文档加载状态-raedystate"
            },
            {
              "depth": 2,
              "value": "标识节点指针",
              "heading": "标识节点指针"
            },
            {
              "depth": 3,
              "value": "当前文档直接子节点 documentElement",
              "heading": "当前文档直接子节点-documentelement"
            },
            {
              "depth": 3,
              "value": "当前文档主体节点 body",
              "heading": "当前文档主体节点-body"
            },
            {
              "depth": 3,
              "value": "当前文档头部节点 head",
              "heading": "当前文档头部节点-head"
            },
            {
              "depth": 3,
              "value": "当前页面焦点元素 activeElement",
              "heading": "当前页面焦点元素-activeelement"
            },
            {
              "depth": 2,
              "value": "文档元素集合",
              "heading": "文档元素集合"
            },
            {
              "depth": 3,
              "value": "当前页面所有标签列表 all",
              "heading": "当前页面所有标签列表-all"
            },
            {
              "depth": 3,
              "value": "当前页面超链接元素列表 links",
              "heading": "当前页面超链接元素列表-links"
            },
            {
              "depth": 3,
              "value": "当前页面样式表列表 styleSheets",
              "heading": "当前页面样式表列表-stylesheets"
            },
            {
              "depth": 3,
              "value": "当前页面脚本标签列表 scripts",
              "heading": "当前页面脚本标签列表-scripts"
            },
            {
              "depth": 3,
              "value": "当前页面图片标签列表 images",
              "heading": "当前页面图片标签列表-images"
            },
            {
              "depth": 3,
              "value": "当前页面锚点元素列表 anchors",
              "heading": "当前页面锚点元素列表-anchors"
            },
            {
              "depth": 3,
              "value": "当前页面表单元素列表 forms",
              "heading": "当前页面表单元素列表-forms"
            },
            {
              "depth": 2,
              "value": "文档位置信息",
              "heading": "文档位置信息"
            },
            {
              "depth": 3,
              "value": "文档网址 documentURI",
              "heading": "文档网址-documenturi"
            },
            {
              "depth": 3,
              "value": "文档地址 URL",
              "heading": "文档地址-url"
            },
            {
              "depth": 3,
              "value": "文档域名 domain",
              "heading": "文档域名-domain"
            },
            {
              "depth": 3,
              "value": "文档访问来源 referrer",
              "heading": "文档访问来源-referrer"
            },
            {
              "depth": 3,
              "value": "文档定位 location",
              "heading": "文档定位-location"
            },
            {
              "depth": 2,
              "value": "网络通讯相关",
              "heading": "网络通讯相关"
            },
            {
              "depth": 3,
              "value": "缓存字段",
              "heading": "缓存字段"
            },
            {
              "depth": 3,
              "value": "强缓存字段",
              "heading": "强缓存字段"
            },
            {
              "depth": 2,
              "value": "其他属性",
              "heading": "其他属性"
            }
          ]
        },
        "title": "Document 属性"
      },
      {
        "path": "/document-object-model/document/document",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/document/document.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/document/document.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Document",
            "order": 5,
            "path": "/document-object-model/document"
          },
          "title": "Document",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Document",
              "heading": "document"
            }
          ]
        },
        "title": "Document"
      },
      {
        "path": "/document-object-model/dom/audio-context",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dom/audio-context.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dom/audio-context.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "文档对象模型",
            "order": 3,
            "path": "/document-object-model/dom"
          },
          "title": "AudioContext",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "AudioContext",
              "heading": "audiocontext"
            }
          ]
        },
        "title": "AudioContext"
      },
      {
        "path": "/document-object-model/dom/dom-rect",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dom/dom-rect.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dom/dom-rect.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "文档对象模型",
            "order": 3,
            "path": "/document-object-model/dom"
          },
          "title": "DOMRect",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "DOMRect",
              "heading": "domrect"
            },
            {
              "depth": 2,
              "value": "接口属性",
              "heading": "接口属性"
            },
            {
              "depth": 3,
              "value": "DOMRect.x",
              "heading": "domrectx"
            },
            {
              "depth": 3,
              "value": "DOMRect.y",
              "heading": "domrecty"
            },
            {
              "depth": 3,
              "value": "DOMRect.width",
              "heading": "domrectwidth"
            },
            {
              "depth": 3,
              "value": "DOMRect.height",
              "heading": "domrectheight"
            },
            {
              "depth": 3,
              "value": "DOMRect.top",
              "heading": "domrecttop"
            },
            {
              "depth": 3,
              "value": "DOMRect.right",
              "heading": "domrectright"
            },
            {
              "depth": 3,
              "value": "DOMRect.bottom",
              "heading": "domrectbottom"
            },
            {
              "depth": 3,
              "value": "DOMRect.left",
              "heading": "domrectleft"
            }
          ]
        },
        "title": "DOMRect"
      },
      {
        "path": "/document-object-model/dom/dom",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dom/dom.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dom/dom.md",
          "updatedTime": 1593015506000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "文档对象模型",
            "order": 1,
            "path": "/document-object-model/dom"
          },
          "title": "文档对象模型",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "文档对象模型",
              "heading": "文档对象模型"
            },
            {
              "depth": 2,
              "value": "DOM 级别",
              "heading": "dom-级别"
            },
            {
              "depth": 3,
              "value": "DOM0",
              "heading": "dom0"
            },
            {
              "depth": 3,
              "value": "DHTML",
              "heading": "dhtml"
            },
            {
              "depth": 3,
              "value": "DOM1",
              "heading": "dom1"
            },
            {
              "depth": 3,
              "value": "DOM2",
              "heading": "dom2"
            },
            {
              "depth": 3,
              "value": "DOM3",
              "heading": "dom3"
            },
            {
              "depth": 2,
              "value": "文档类型",
              "heading": "文档类型"
            },
            {
              "depth": 3,
              "value": "GML",
              "heading": "gml"
            },
            {
              "depth": 3,
              "value": "SGML",
              "heading": "sgml"
            },
            {
              "depth": 3,
              "value": "HTML",
              "heading": "html"
            },
            {
              "depth": 3,
              "value": "XML",
              "heading": "xml"
            },
            {
              "depth": 3,
              "value": "XHTML",
              "heading": "xhtml"
            }
          ]
        },
        "title": "文档对象模型"
      },
      {
        "path": "/document-object-model/dom/event-target",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dom/event-target.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dom/event-target.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "文档对象模型",
            "order": 3,
            "path": "/document-object-model/dom"
          },
          "title": "EventTarget",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "EventTarget",
              "heading": "eventtarget"
            },
            {
              "depth": 2,
              "value": "原型方法",
              "heading": "原型方法"
            },
            {
              "depth": 2,
              "value": "简单实现",
              "heading": "简单实现"
            }
          ]
        },
        "title": "EventTarget"
      },
      {
        "path": "/document-object-model/dom/global-attributes",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dom/global-attributes.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dom/global-attributes.md",
          "updatedTime": 1622527674000,
          "slugs": [
            {
              "depth": 1,
              "value": "全局属性",
              "heading": "全局属性"
            }
          ],
          "title": "全局属性",
          "nav": {
            "path": "/document-object-model",
            "title": "DOM"
          },
          "group": {
            "path": "/document-object-model/dom",
            "title": "文档对象模型"
          }
        },
        "title": "全局属性"
      },
      {
        "path": "/document-object-model/dom/hierarchy-of-nodes",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dom/hierarchy-of-nodes.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dom/hierarchy-of-nodes.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "文档对象模型",
            "order": 1,
            "path": "/document-object-model/dom"
          },
          "title": "节点层次",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "节点层次",
              "heading": "节点层次"
            },
            {
              "depth": 2,
              "value": "DOM 节点类型",
              "heading": "dom-节点类型"
            }
          ]
        },
        "title": "节点层次"
      },
      {
        "path": "/document-object-model/dom/video-context",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dom/video-context.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dom/video-context.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "文档对象模型",
            "order": 3,
            "path": "/document-object-model/dom"
          },
          "title": "VideoContext",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "VideoContext",
              "heading": "videocontext"
            }
          ]
        },
        "title": "VideoContext"
      },
      {
        "path": "/document-object-model/dynamic-collection/dom-token-list",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dynamic-collection/dom-token-list.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dynamic-collection/dom-token-list.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "动态集合",
            "order": 7,
            "path": "/document-object-model/dynamic-collection"
          },
          "title": "DOMTokenList",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "DOMTokenList",
              "heading": "domtokenlist"
            },
            {
              "depth": 2,
              "value": "接口方法",
              "heading": "接口方法"
            },
            {
              "depth": 3,
              "value": "item",
              "heading": "item"
            },
            {
              "depth": 3,
              "value": "contains",
              "heading": "contains"
            },
            {
              "depth": 3,
              "value": "add",
              "heading": "add"
            },
            {
              "depth": 3,
              "value": "remove",
              "heading": "remove"
            },
            {
              "depth": 3,
              "value": "replace",
              "heading": "replace"
            },
            {
              "depth": 3,
              "value": "supports",
              "heading": "supports"
            },
            {
              "depth": 3,
              "value": "toggle",
              "heading": "toggle"
            },
            {
              "depth": 3,
              "value": "entries",
              "heading": "entries"
            },
            {
              "depth": 3,
              "value": "forEach",
              "heading": "foreach"
            },
            {
              "depth": 3,
              "value": "keys",
              "heading": "keys"
            },
            {
              "depth": 3,
              "value": "values",
              "heading": "values"
            }
          ]
        },
        "title": "DOMTokenList"
      },
      {
        "path": "/document-object-model/dynamic-collection/html-collection",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dynamic-collection/html-collection.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dynamic-collection/html-collection.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "动态集合",
            "order": 7,
            "path": "/document-object-model/dynamic-collection"
          },
          "title": "HTMLCollection",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "HTMLCollection",
              "heading": "htmlcollection"
            }
          ]
        },
        "title": "HTMLCollection"
      },
      {
        "path": "/document-object-model/dynamic-collection/named-node-map",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dynamic-collection/named-node-map.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dynamic-collection/named-node-map.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "动态集合",
            "order": 7,
            "path": "/document-object-model/dynamic-collection"
          },
          "title": "NamedNodeMap",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "NamedNodeMap",
              "heading": "namednodemap"
            },
            {
              "depth": 2,
              "value": "接口方法",
              "heading": "接口方法"
            },
            {
              "depth": 3,
              "value": "getNamedItem",
              "heading": "getnameditem"
            },
            {
              "depth": 3,
              "value": "setNamedItem",
              "heading": "setnameditem"
            },
            {
              "depth": 3,
              "value": "removeNamedItem",
              "heading": "removenameditem"
            },
            {
              "depth": 3,
              "value": "item",
              "heading": "item"
            },
            {
              "depth": 3,
              "value": "getNamedItemNS",
              "heading": "getnameditemns"
            },
            {
              "depth": 3,
              "value": "setNamedItemNS",
              "heading": "setnameditemns"
            },
            {
              "depth": 3,
              "value": "removeNamedItemNS",
              "heading": "removenameditemns"
            }
          ]
        },
        "title": "NamedNodeMap"
      },
      {
        "path": "/document-object-model/dynamic-collection/node-list",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/dynamic-collection/node-list.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/dynamic-collection/node-list.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "动态集合",
            "order": 7,
            "path": "/document-object-model/dynamic-collection"
          },
          "title": "NodeList",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "NodeList",
              "heading": "nodelist"
            }
          ]
        },
        "title": "NodeList"
      },
      {
        "path": "/document-object-model/element/element-methods",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/element-methods.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/element-methods.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "Element 方法",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Element 方法",
              "heading": "element-方法"
            },
            {
              "depth": 2,
              "value": "位置方法",
              "heading": "位置方法"
            },
            {
              "depth": 3,
              "value": "getBoundingClientRect",
              "heading": "getboundingclientrect"
            },
            {
              "depth": 3,
              "value": "getClientRects",
              "heading": "getclientrects"
            },
            {
              "depth": 3,
              "value": "computedStyleMap",
              "heading": "computedstylemap"
            },
            {
              "depth": 2,
              "value": "样式方法",
              "heading": "样式方法"
            },
            {
              "depth": 3,
              "value": "matches",
              "heading": "matches"
            },
            {
              "depth": 3,
              "value": "animate",
              "heading": "animate"
            },
            {
              "depth": 3,
              "value": "getAnimations",
              "heading": "getanimations"
            },
            {
              "depth": 2,
              "value": "属性方法",
              "heading": "属性方法"
            },
            {
              "depth": 3,
              "value": "getAttribute",
              "heading": "getattribute"
            },
            {
              "depth": 3,
              "value": "setAttribute",
              "heading": "setattribute"
            },
            {
              "depth": 3,
              "value": "hasAttribute",
              "heading": "hasattribute"
            },
            {
              "depth": 3,
              "value": "removeAttribute",
              "heading": "removeattribute"
            },
            {
              "depth": 2,
              "value": "滚动方法",
              "heading": "滚动方法"
            },
            {
              "depth": 3,
              "value": "scroll",
              "heading": "scroll"
            },
            {
              "depth": 3,
              "value": "scrollBy",
              "heading": "scrollby"
            },
            {
              "depth": 3,
              "value": "scrollIntoView",
              "heading": "scrollintoview"
            },
            {
              "depth": 3,
              "value": "scrollTo",
              "heading": "scrollto"
            },
            {
              "depth": 2,
              "value": "requestFullscreen",
              "heading": "requestfullscreen"
            },
            {
              "depth": 2,
              "value": "事件对象",
              "heading": "事件对象"
            }
          ]
        },
        "title": "Element 方法"
      },
      {
        "path": "/document-object-model/element/element-properties",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/element-properties.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/element-properties.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "Element 属性",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Element 属性",
              "heading": "element-属性"
            },
            {
              "depth": 2,
              "value": "元素信息",
              "heading": "元素信息"
            },
            {
              "depth": 3,
              "value": "tagName",
              "heading": "tagname"
            },
            {
              "depth": 3,
              "value": "attributes",
              "heading": "attributes"
            },
            {
              "depth": 3,
              "value": "id",
              "heading": "id"
            },
            {
              "depth": 3,
              "value": "style",
              "heading": "style"
            },
            {
              "depth": 3,
              "value": "className",
              "heading": "classname"
            },
            {
              "depth": 3,
              "value": "classList",
              "heading": "classlist"
            },
            {
              "depth": 3,
              "value": "dataset",
              "heading": "dataset"
            },
            {
              "depth": 3,
              "value": "innerHTML",
              "heading": "innerhtml"
            },
            {
              "depth": 3,
              "value": "outerHTML",
              "heading": "outerhtml"
            },
            {
              "depth": 2,
              "value": "坐标尺寸型属性",
              "heading": "坐标尺寸型属性"
            },
            {
              "depth": 3,
              "value": "clientWidth",
              "heading": "clientwidth"
            },
            {
              "depth": 3,
              "value": "clientHeight",
              "heading": "clientheight"
            },
            {
              "depth": 3,
              "value": "clientLeft",
              "heading": "clientleft"
            },
            {
              "depth": 3,
              "value": "clientTop",
              "heading": "clienttop"
            },
            {
              "depth": 3,
              "value": "scrollWidth",
              "heading": "scrollwidth"
            },
            {
              "depth": 3,
              "value": "scrollHeight",
              "heading": "scrollheight"
            },
            {
              "depth": 3,
              "value": "scrollLeft",
              "heading": "scrollleft"
            },
            {
              "depth": 3,
              "value": "scrollTop",
              "heading": "scrolltop"
            },
            {
              "depth": 3,
              "value": "offsetHeight",
              "heading": "offsetheight"
            },
            {
              "depth": 3,
              "value": "offsetWidth",
              "heading": "offsetwidth"
            },
            {
              "depth": 3,
              "value": "offsetLeft",
              "heading": "offsetleft"
            },
            {
              "depth": 3,
              "value": "offsetTop",
              "heading": "offsettop"
            },
            {
              "depth": 2,
              "value": "关系型属性",
              "heading": "关系型属性"
            },
            {
              "depth": 3,
              "value": "offsetParent",
              "heading": "offsetparent"
            },
            {
              "depth": 3,
              "value": "previousElementSibling",
              "heading": "previouselementsibling"
            },
            {
              "depth": 3,
              "value": "nextElementSibling",
              "heading": "nextelementsibling"
            },
            {
              "depth": 3,
              "value": "children",
              "heading": "children"
            },
            {
              "depth": 3,
              "value": "childElementCount",
              "heading": "childelementcount"
            },
            {
              "depth": 3,
              "value": "firstElementChild",
              "heading": "firstelementchild"
            },
            {
              "depth": 3,
              "value": "lastElementChild",
              "heading": "lastelementchild"
            }
          ]
        },
        "title": "Element 属性"
      },
      {
        "path": "/document-object-model/element/element",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/element.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/element.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "Element",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Element",
              "heading": "element"
            }
          ]
        },
        "title": "Element"
      },
      {
        "path": "/document-object-model/element/html-audio-element",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/html-audio-element.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/html-audio-element.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "HTMLAudioElement",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "HTMLAudioElement",
              "heading": "htmlaudioelement"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "事件",
              "heading": "事件"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "HTMLAudioElement"
      },
      {
        "path": "/document-object-model/element/html-element",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/html-element.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/html-element.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "HTMLElement",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "HTMLElement",
              "heading": "htmlelement"
            },
            {
              "depth": 2,
              "value": "HTML 元素",
              "heading": "html-元素"
            }
          ]
        },
        "title": "HTMLElement"
      },
      {
        "path": "/document-object-model/element/html-iframe-element",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/html-iframe-element.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/html-iframe-element.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "HTMLIFrameElement",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "HTMLIFrameElement",
              "heading": "htmliframeelement"
            },
            {
              "depth": 2,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "沙箱模式",
              "heading": "沙箱模式"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 3,
              "value": "导航方法",
              "heading": "导航方法"
            },
            {
              "depth": 3,
              "value": "管理方法",
              "heading": "管理方法"
            },
            {
              "depth": 3,
              "value": "音频相关方法",
              "heading": "音频相关方法"
            },
            {
              "depth": 3,
              "value": "搜索方法",
              "heading": "搜索方法"
            },
            {
              "depth": 3,
              "value": "事件相关方法",
              "heading": "事件相关方法"
            },
            {
              "depth": 3,
              "value": "工具方法",
              "heading": "工具方法"
            }
          ]
        },
        "title": "HTMLIFrameElement"
      },
      {
        "path": "/document-object-model/element/html-image-element",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/html-image-element.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/html-image-element.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "HTMLImageElement",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "HTMLImageElement",
              "heading": "htmlimageelement"
            },
            {
              "depth": 2,
              "value": "最佳实践",
              "heading": "最佳实践"
            },
            {
              "depth": 3,
              "value": "修改 Image 实例的宽高",
              "heading": "修改-image-实例的宽高"
            }
          ]
        },
        "title": "HTMLImageElement"
      },
      {
        "path": "/document-object-model/element/html-media-element",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/html-media-element.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/html-media-element.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "HTMLMediaElement",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "HTMLMediaElement",
              "heading": "htmlmediaelement"
            },
            {
              "depth": 2,
              "value": "特性",
              "heading": "特性"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "参考资料：",
              "heading": "参考资料："
            }
          ]
        },
        "title": "HTMLMediaElement"
      },
      {
        "path": "/document-object-model/element/html-text-area-element",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/html-text-area-element.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/html-text-area-element.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "HTMLTextAreaElement",
          "order": 30,
          "slugs": [
            {
              "depth": 1,
              "value": "HTMLTextAreaElement",
              "heading": "htmltextareaelement"
            }
          ]
        },
        "title": "HTMLTextAreaElement"
      },
      {
        "path": "/document-object-model/element/html-video-element",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/element/html-video-element.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/element/html-video-element.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Element",
            "order": 6,
            "path": "/document-object-model/element"
          },
          "title": "HTMLVideoElement",
          "order": 18,
          "slugs": [
            {
              "depth": 1,
              "value": "HTMLVideoElement",
              "heading": "htmlvideoelement"
            },
            {
              "depth": 2,
              "value": "可选属性",
              "heading": "可选属性"
            },
            {
              "depth": 2,
              "value": "Video 对象",
              "heading": "video-对象"
            },
            {
              "depth": 2,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "加载过程",
              "heading": "加载过程"
            }
          ]
        },
        "title": "HTMLVideoElement"
      },
      {
        "path": "/document-object-model/events/event-delegation",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-delegation.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-delegation.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "DOM 事件流",
            "order": 20,
            "path": "/document-object-model/events"
          },
          "title": "事件委托",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "事件委托",
              "heading": "事件委托"
            },
            {
              "depth": 2,
              "value": "优点",
              "heading": "优点"
            },
            {
              "depth": 3,
              "value": "减少内存消耗",
              "heading": "减少内存消耗"
            },
            {
              "depth": 3,
              "value": "动态绑定事件",
              "heading": "动态绑定事件"
            },
            {
              "depth": 3,
              "value": "事件绑定解决方案",
              "heading": "事件绑定解决方案"
            },
            {
              "depth": 2,
              "value": "缺点",
              "heading": "缺点"
            },
            {
              "depth": 2,
              "value": "优化手段",
              "heading": "优化手段"
            },
            {
              "depth": 2,
              "value": "最佳实践",
              "heading": "最佳实践"
            },
            {
              "depth": 3,
              "value": "查找列表中子项的索引",
              "heading": "查找列表中子项的索引"
            }
          ]
        },
        "title": "事件委托"
      },
      {
        "path": "/document-object-model/events/event-flow",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-flow.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-flow.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "DOM 事件流",
            "order": 20,
            "path": "/document-object-model/events"
          },
          "title": "事件流",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "事件流",
              "heading": "事件流"
            },
            {
              "depth": 2,
              "value": "事件冒泡",
              "heading": "事件冒泡"
            },
            {
              "depth": 2,
              "value": "事件捕获",
              "heading": "事件捕获"
            },
            {
              "depth": 2,
              "value": "DOM 事件流",
              "heading": "dom-事件流"
            },
            {
              "depth": 2,
              "value": "最佳实践",
              "heading": "最佳实践"
            },
            {
              "depth": 3,
              "value": "弹窗点击空白关闭",
              "heading": "弹窗点击空白关闭"
            }
          ]
        },
        "title": "事件流"
      },
      {
        "path": "/document-object-model/events/event-handlers-or-listener",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-handlers-or-listener.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-handlers-or-listener.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "DOM 事件流",
            "order": 20,
            "path": "/document-object-model/events"
          },
          "title": "事件处理程序",
          "order": 2,
          "slugs": [
            {
              "depth": 2,
              "value": "事件处理程序",
              "heading": "事件处理程序"
            },
            {
              "depth": 3,
              "value": "HTML 事件处理程序",
              "heading": "html-事件处理程序"
            },
            {
              "depth": 3,
              "value": "DOM0 级事件处理程序",
              "heading": "dom0-级事件处理程序"
            },
            {
              "depth": 3,
              "value": "DOM2 级事件处理程序",
              "heading": "dom2-级事件处理程序"
            },
            {
              "depth": 4,
              "value": "参数传递",
              "heading": "参数传递"
            },
            {
              "depth": 4,
              "value": "注销事件绑定",
              "heading": "注销事件绑定"
            },
            {
              "depth": 3,
              "value": "IE 事件处理程序",
              "heading": "ie-事件处理程序"
            },
            {
              "depth": 3,
              "value": "跨浏览器的事件处理程序",
              "heading": "跨浏览器的事件处理程序"
            },
            {
              "depth": 3,
              "value": "总结",
              "heading": "总结"
            }
          ]
        },
        "title": "事件处理程序"
      },
      {
        "path": "/document-object-model/events/the-event-object",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/the-event-object.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/the-event-object.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "DOM 事件流",
            "order": 20,
            "path": "/document-object-model/events"
          },
          "title": "事件对象",
          "order": 3,
          "slugs": [
            {
              "depth": 2,
              "value": "事件对象",
              "heading": "事件对象"
            },
            {
              "depth": 3,
              "value": "DOM 中的事件对象",
              "heading": "dom-中的事件对象"
            },
            {
              "depth": 4,
              "value": "事件处理程序内部 this 指向",
              "heading": "事件处理程序内部-this-指向"
            },
            {
              "depth": 4,
              "value": "单函数处理多事件",
              "heading": "单函数处理多事件"
            },
            {
              "depth": 4,
              "value": "阻止浏览器默认行为",
              "heading": "阻止浏览器默认行为"
            },
            {
              "depth": 4,
              "value": "阻止事件冒泡",
              "heading": "阻止事件冒泡"
            },
            {
              "depth": 3,
              "value": "跨浏览器的事件对象",
              "heading": "跨浏览器的事件对象"
            }
          ]
        },
        "title": "事件对象"
      },
      {
        "path": "/document-object-model/events/event-types/clipboard-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/clipboard-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/clipboard-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "剪贴板事件",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "剪贴板事件",
              "heading": "剪贴板事件"
            }
          ]
        },
        "title": "剪贴板事件"
      },
      {
        "path": "/document-object-model/events/event-types/css-animation-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/css-animation-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/css-animation-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "CSS 动画事件",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "CSS 动画事件",
              "heading": "css-动画事件"
            }
          ]
        },
        "title": "CSS 动画事件"
      },
      {
        "path": "/document-object-model/events/event-types/css-transition-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/css-transition-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/css-transition-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "CSS 过渡事件",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "CSS 过渡事件",
              "heading": "css-过渡事件"
            }
          ]
        },
        "title": "CSS 过渡事件"
      },
      {
        "path": "/document-object-model/events/event-types/custom-event",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/custom-event.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/custom-event.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "自定义事件 CustomEvent",
          "order": 50,
          "slugs": [
            {
              "depth": 1,
              "value": "自定义事件 CustomEvent",
              "heading": "自定义事件-customevent"
            }
          ]
        },
        "title": "自定义事件 CustomEvent"
      },
      {
        "path": "/document-object-model/events/event-types/drag-and-drop-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/drag-and-drop-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/drag-and-drop-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "拖拽事件",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "拖拽事件",
              "heading": "拖拽事件"
            },
            {
              "depth": 2,
              "value": "实践应用",
              "heading": "实践应用"
            },
            {
              "depth": 3,
              "value": "常见业务场景",
              "heading": "常见业务场景"
            },
            {
              "depth": 2,
              "value": "拖放的流程",
              "heading": "拖放的流程"
            },
            {
              "depth": 3,
              "value": "定义可拖动元素",
              "heading": "定义可拖动元素"
            },
            {
              "depth": 3,
              "value": "拖动事件",
              "heading": "拖动事件"
            },
            {
              "depth": 3,
              "value": "释放事件",
              "heading": "释放事件"
            },
            {
              "depth": 1,
              "value": "DataTransfer 对象",
              "heading": "datatransfer-对象"
            },
            {
              "depth": 2,
              "value": "兼容性",
              "heading": "兼容性"
            },
            {
              "depth": 2,
              "value": "社区类库",
              "heading": "社区类库"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "拖拽事件"
      },
      {
        "path": "/document-object-model/events/event-types/event-types",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/event-types.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/event-types.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "事件类型",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "事件类型",
              "heading": "事件类型"
            },
            {
              "depth": 2,
              "value": "资源事件",
              "heading": "资源事件"
            },
            {
              "depth": 2,
              "value": "网络事件",
              "heading": "网络事件"
            },
            {
              "depth": 2,
              "value": "Websocket 事件",
              "heading": "websocket-事件"
            },
            {
              "depth": 2,
              "value": "会话历史事件",
              "heading": "会话历史事件"
            },
            {
              "depth": 2,
              "value": "CSS 动画事件",
              "heading": "css-动画事件"
            },
            {
              "depth": 2,
              "value": "CSS 过渡事件",
              "heading": "css-过渡事件"
            },
            {
              "depth": 2,
              "value": "表单事件",
              "heading": "表单事件"
            },
            {
              "depth": 2,
              "value": "视图事件",
              "heading": "视图事件"
            },
            {
              "depth": 2,
              "value": "剪贴板事件",
              "heading": "剪贴板事件"
            },
            {
              "depth": 2,
              "value": "键盘事件",
              "heading": "键盘事件"
            },
            {
              "depth": 2,
              "value": "鼠标事件",
              "heading": "鼠标事件"
            },
            {
              "depth": 2,
              "value": "拖拽事件",
              "heading": "拖拽事件"
            },
            {
              "depth": 2,
              "value": "媒体事件",
              "heading": "媒体事件"
            },
            {
              "depth": 2,
              "value": "进度事件",
              "heading": "进度事件"
            }
          ]
        },
        "title": "事件类型"
      },
      {
        "path": "/document-object-model/events/event-types/focus-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/focus-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/focus-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "焦点事件",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "焦点事件",
              "heading": "焦点事件"
            }
          ]
        },
        "title": "焦点事件"
      },
      {
        "path": "/document-object-model/events/event-types/form-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/form-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/form-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "表单事件",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "表单事件",
              "heading": "表单事件"
            }
          ]
        },
        "title": "表单事件"
      },
      {
        "path": "/document-object-model/events/event-types/keyboard-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/keyboard-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/keyboard-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "键盘事件",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "键盘事件",
              "heading": "键盘事件"
            },
            {
              "depth": 2,
              "value": "键码",
              "heading": "键码"
            },
            {
              "depth": 2,
              "value": "字符编码",
              "heading": "字符编码"
            },
            {
              "depth": 2,
              "value": "textInput 事件",
              "heading": "textinput-事件"
            },
            {
              "depth": 2,
              "value": "设备中的键盘事件",
              "heading": "设备中的键盘事件"
            }
          ]
        },
        "title": "键盘事件"
      },
      {
        "path": "/document-object-model/events/event-types/media-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/media-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/media-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "媒体事件",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "媒体事件",
              "heading": "媒体事件"
            }
          ]
        },
        "title": "媒体事件"
      },
      {
        "path": "/document-object-model/events/event-types/mouse-event",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/mouse-event.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/mouse-event.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "鼠标事件 MouseEvent",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "鼠标事件 MouseEvent",
              "heading": "鼠标事件-mouseevent"
            },
            {
              "depth": 2,
              "value": "客户区坐标位置",
              "heading": "客户区坐标位置"
            },
            {
              "depth": 2,
              "value": "页面坐标位置",
              "heading": "页面坐标位置"
            },
            {
              "depth": 2,
              "value": "屏幕坐标位置",
              "heading": "屏幕坐标位置"
            },
            {
              "depth": 2,
              "value": "修改键",
              "heading": "修改键"
            },
            {
              "depth": 2,
              "value": "相关元素",
              "heading": "相关元素"
            },
            {
              "depth": 2,
              "value": "鼠标按钮",
              "heading": "鼠标按钮"
            },
            {
              "depth": 2,
              "value": "鼠标滚轮事件",
              "heading": "鼠标滚轮事件"
            },
            {
              "depth": 3,
              "value": "IE/Chrome",
              "heading": "iechrome"
            },
            {
              "depth": 3,
              "value": "Firefox",
              "heading": "firefox"
            },
            {
              "depth": 2,
              "value": "触摸设备",
              "heading": "触摸设备"
            },
            {
              "depth": 2,
              "value": "无障碍性问题",
              "heading": "无障碍性问题"
            }
          ]
        },
        "title": "鼠标事件 MouseEvent"
      },
      {
        "path": "/document-object-model/events/event-types/network-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/network-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/network-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "网络事件",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "网络事件",
              "heading": "网络事件"
            }
          ]
        },
        "title": "网络事件"
      },
      {
        "path": "/document-object-model/events/event-types/pointer-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/pointer-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/pointer-events.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "指针事件",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "指针事件",
              "heading": "指针事件"
            }
          ]
        },
        "title": "指针事件"
      },
      {
        "path": "/document-object-model/events/event-types/printing-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/printing-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/printing-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "打印事件",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "打印事件",
              "heading": "打印事件"
            }
          ]
        },
        "title": "打印事件"
      },
      {
        "path": "/document-object-model/events/event-types/progress-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/progress-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/progress-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "进度条事件",
          "order": 18,
          "slugs": [
            {
              "depth": 1,
              "value": "进度条事件",
              "heading": "进度条事件"
            }
          ]
        },
        "title": "进度条事件"
      },
      {
        "path": "/document-object-model/events/event-types/resource-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/resource-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/resource-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "资源事件",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "资源事件",
              "heading": "资源事件"
            }
          ]
        },
        "title": "资源事件"
      },
      {
        "path": "/document-object-model/events/event-types/session-history-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/session-history-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/session-history-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "会话历史事件",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "会话历史事件",
              "heading": "会话历史事件"
            }
          ]
        },
        "title": "会话历史事件"
      },
      {
        "path": "/document-object-model/events/event-types/storage-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/storage-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/storage-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "存储事件",
          "order": 19,
          "slugs": [
            {
              "depth": 1,
              "value": "存储事件",
              "heading": "存储事件"
            }
          ]
        },
        "title": "存储事件"
      },
      {
        "path": "/document-object-model/events/event-types/text-composition-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/text-composition-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/text-composition-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "文本写作事件",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "文本写作事件",
              "heading": "文本写作事件"
            }
          ]
        },
        "title": "文本写作事件"
      },
      {
        "path": "/document-object-model/events/event-types/the-orientationchange-event",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/the-orientationchange-event.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/the-orientationchange-event.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "设备事件",
          "order": 99,
          "slugs": [
            {
              "depth": 1,
              "value": "设备事件",
              "heading": "设备事件"
            },
            {
              "depth": 2,
              "value": "orientationchange 事件",
              "heading": "orientationchange-事件"
            },
            {
              "depth": 2,
              "value": "MozOrientation 事件",
              "heading": "mozorientation-事件"
            },
            {
              "depth": 2,
              "value": "deviceorientation 事件",
              "heading": "deviceorientation-事件"
            }
          ]
        },
        "title": "设备事件"
      },
      {
        "path": "/document-object-model/events/event-types/touch-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/touch-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/touch-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "触控事件",
          "order": 50,
          "slugs": [
            {
              "depth": 1,
              "value": "触控事件",
              "heading": "触控事件"
            },
            {
              "depth": 2,
              "value": "定义",
              "heading": "定义"
            },
            {
              "depth": 2,
              "value": "接口",
              "heading": "接口"
            },
            {
              "depth": 2,
              "value": "触控事件类型",
              "heading": "触控事件类型"
            },
            {
              "depth": 2,
              "value": "接口对象",
              "heading": "接口对象"
            },
            {
              "depth": 2,
              "value": "应用实例",
              "heading": "应用实例"
            },
            {
              "depth": 3,
              "value": "手势事件",
              "heading": "手势事件"
            },
            {
              "depth": 3,
              "value": "移动端延迟问题",
              "heading": "移动端延迟问题"
            }
          ]
        },
        "title": "触控事件"
      },
      {
        "path": "/document-object-model/events/event-types/ui-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/ui-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/ui-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "用户界面事件",
          "order": 100,
          "slugs": [
            {
              "depth": 1,
              "value": "用户界面事件",
              "heading": "用户界面事件"
            },
            {
              "depth": 2,
              "value": "load 事件",
              "heading": "load-事件"
            },
            {
              "depth": 2,
              "value": "unload 事件",
              "heading": "unload-事件"
            },
            {
              "depth": 2,
              "value": "resize 事件",
              "heading": "resize-事件"
            },
            {
              "depth": 2,
              "value": "scroll 事件",
              "heading": "scroll-事件"
            }
          ]
        },
        "title": "用户界面事件"
      },
      {
        "path": "/document-object-model/events/event-types/uncategorized-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/uncategorized-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/uncategorized-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "未分类事件",
          "order": 22,
          "slugs": [
            {
              "depth": 1,
              "value": "未分类事件",
              "heading": "未分类事件"
            }
          ]
        },
        "title": "未分类事件"
      },
      {
        "path": "/document-object-model/events/event-types/update-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/update-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/update-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "更新事件",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "更新事件",
              "heading": "更新事件"
            }
          ]
        },
        "title": "更新事件"
      },
      {
        "path": "/document-object-model/events/event-types/value-change-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/value-change-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/value-change-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "值变化事件",
          "order": 21,
          "slugs": [
            {
              "depth": 1,
              "value": "值变化事件",
              "heading": "值变化事件"
            }
          ]
        },
        "title": "值变化事件"
      },
      {
        "path": "/document-object-model/events/event-types/view-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/view-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/view-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "视图事件",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "视图事件",
              "heading": "视图事件"
            }
          ]
        },
        "title": "视图事件"
      },
      {
        "path": "/document-object-model/events/event-types/websocket-events",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/events/event-types/websocket-events.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/events/event-types/websocket-events.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "事件类型",
            "order": 21,
            "path": "/document-object-model/events/event-types"
          },
          "title": "WebSocket 事件",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "WebSocket 事件",
              "heading": "websocket-事件"
            }
          ]
        },
        "title": "WebSocket 事件"
      },
      {
        "path": "/document-object-model/multimedia/audio-buffer",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/multimedia/audio-buffer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/multimedia/audio-buffer.md",
          "updatedTime": 1622527674000,
          "slugs": [
            {
              "depth": 1,
              "value": "AudioBuffer",
              "heading": "audiobuffer"
            }
          ],
          "title": "AudioBuffer",
          "nav": {
            "path": "/document-object-model",
            "title": "DOM"
          },
          "group": {
            "path": "/document-object-model/multimedia",
            "title": "Multimedia"
          }
        },
        "title": "AudioBuffer"
      },
      {
        "path": "/document-object-model/multimedia/audio-node",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/multimedia/audio-node.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/multimedia/audio-node.md",
          "updatedTime": 1633898450000,
          "slugs": [
            {
              "depth": 1,
              "value": "AudioNode",
              "heading": "audionode"
            },
            {
              "depth": 2,
              "value": "AudioContext",
              "heading": "audiocontext"
            },
            {
              "depth": 2,
              "value": "音频转换成 Buffer 格式",
              "heading": "音频转换成-buffer-格式"
            },
            {
              "depth": 2,
              "value": "AudioNode",
              "heading": "audionode-1"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 3,
              "value": "AudioBufferSourceNode",
              "heading": "audiobuffersourcenode"
            },
            {
              "depth": 3,
              "value": "AudioDestinationNode",
              "heading": "audiodestinationnode"
            },
            {
              "depth": 3,
              "value": "GainNode",
              "heading": "gainnode"
            },
            {
              "depth": 3,
              "value": "BiquadFilterNode",
              "heading": "biquadfilternode"
            },
            {
              "depth": 2,
              "value": "多个音频源",
              "heading": "多个音频源"
            },
            {
              "depth": 2,
              "value": "多个音频处理模块",
              "heading": "多个音频处理模块"
            }
          ],
          "title": "AudioNode",
          "nav": {
            "path": "/document-object-model",
            "title": "DOM"
          },
          "group": {
            "path": "/document-object-model/multimedia",
            "title": "Multimedia"
          }
        },
        "title": "AudioNode"
      },
      {
        "path": "/document-object-model/multimedia/audio-track",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/multimedia/audio-track.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/multimedia/audio-track.md",
          "updatedTime": 1622527674000,
          "slugs": [
            {
              "depth": 1,
              "value": "AudioTrack",
              "heading": "audiotrack"
            }
          ],
          "title": "AudioTrack",
          "nav": {
            "path": "/document-object-model",
            "title": "DOM"
          },
          "group": {
            "path": "/document-object-model/multimedia",
            "title": "Multimedia"
          }
        },
        "title": "AudioTrack"
      },
      {
        "path": "/document-object-model/node/node-methods",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/node/node-methods.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/node/node-methods.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Node",
            "order": 4,
            "path": "/document-object-model/node"
          },
          "title": "Node 方法",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Node 方法",
              "heading": "node-方法"
            },
            {
              "depth": 2,
              "value": "增删改型方法",
              "heading": "增删改型方法"
            },
            {
              "depth": 3,
              "value": "insertBefore",
              "heading": "insertbefore"
            },
            {
              "depth": 3,
              "value": "appendChild",
              "heading": "appendchild"
            },
            {
              "depth": 3,
              "value": "replaceChild",
              "heading": "replacechild"
            },
            {
              "depth": 3,
              "value": "removeChild",
              "heading": "removechild"
            },
            {
              "depth": 3,
              "value": "cloneNode()",
              "heading": "clonenode"
            },
            {
              "depth": 2,
              "value": "判定型方法",
              "heading": "判定型方法"
            },
            {
              "depth": 3,
              "value": "hasChildNodes",
              "heading": "haschildnodes"
            },
            {
              "depth": 3,
              "value": "isEqualNode",
              "heading": "isequalnode"
            },
            {
              "depth": 3,
              "value": "compareDocumentPosition",
              "heading": "comparedocumentposition"
            },
            {
              "depth": 3,
              "value": "normalize",
              "heading": "normalize"
            },
            {
              "depth": 2,
              "value": "ChildNode 方法",
              "heading": "childnode-方法"
            },
            {
              "depth": 3,
              "value": "ChildNode.remove",
              "heading": "childnoderemove"
            },
            {
              "depth": 3,
              "value": "ChildNode.before",
              "heading": "childnodebefore"
            },
            {
              "depth": 3,
              "value": "ChildNode.after",
              "heading": "childnodeafter"
            },
            {
              "depth": 3,
              "value": "ChildNode.replaceWith",
              "heading": "childnodereplacewith"
            }
          ]
        },
        "title": "Node 方法"
      },
      {
        "path": "/document-object-model/node/node-properties",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/node/node-properties.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/node/node-properties.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Node",
            "order": 4,
            "path": "/document-object-model/node"
          },
          "title": "Node 属性",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Node 属性",
              "heading": "node-属性"
            },
            {
              "depth": 2,
              "value": "节点类型",
              "heading": "节点类型"
            },
            {
              "depth": 3,
              "value": "常用节点类型",
              "heading": "常用节点类型"
            },
            {
              "depth": 3,
              "value": "废弃节点类型",
              "heading": "废弃节点类型"
            },
            {
              "depth": 3,
              "value": "节点类型判断",
              "heading": "节点类型判断"
            },
            {
              "depth": 2,
              "value": "节点信息",
              "heading": "节点信息"
            },
            {
              "depth": 3,
              "value": "Node.baseURI",
              "heading": "nodebaseuri"
            },
            {
              "depth": 3,
              "value": "Node.nodeName",
              "heading": "nodenodename"
            },
            {
              "depth": 3,
              "value": "Node.nodeValue",
              "heading": "nodenodevalue"
            },
            {
              "depth": 3,
              "value": "Node.textContent",
              "heading": "nodetextcontent"
            },
            {
              "depth": 2,
              "value": "节点关系",
              "heading": "节点关系"
            },
            {
              "depth": 3,
              "value": "Node.ownerDocument",
              "heading": "nodeownerdocument"
            },
            {
              "depth": 3,
              "value": "Node.paretnNode",
              "heading": "nodeparetnnode"
            },
            {
              "depth": 3,
              "value": "Node.parentElement",
              "heading": "nodeparentelement"
            },
            {
              "depth": 3,
              "value": "Node.previousSibling",
              "heading": "nodeprevioussibling"
            },
            {
              "depth": 3,
              "value": "Node.previousElementSibiling",
              "heading": "nodepreviouselementsibiling"
            },
            {
              "depth": 3,
              "value": "Node.nextSibiling",
              "heading": "nodenextsibiling"
            },
            {
              "depth": 3,
              "value": "Node.nextElementSibiling",
              "heading": "nodenextelementsibiling"
            },
            {
              "depth": 3,
              "value": "Node.firstChild",
              "heading": "nodefirstchild"
            },
            {
              "depth": 3,
              "value": "Node.firstElementChild",
              "heading": "nodefirstelementchild"
            },
            {
              "depth": 3,
              "value": "Node.lastChild",
              "heading": "nodelastchild"
            },
            {
              "depth": 3,
              "value": "Node.lastElementChild",
              "heading": "nodelastelementchild"
            },
            {
              "depth": 3,
              "value": "Node.childNodes",
              "heading": "nodechildnodes"
            },
            {
              "depth": 3,
              "value": "Node.children",
              "heading": "nodechildren"
            },
            {
              "depth": 3,
              "value": "Node.childElementCount",
              "heading": "nodechildelementcount"
            }
          ]
        },
        "title": "Node 属性"
      },
      {
        "path": "/document-object-model/node/node",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/document-object-model/node/node.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/document-object-model/node/node.md",
          "updatedTime": 1600510647000,
          "nav": {
            "title": "DOM",
            "order": 6,
            "path": "/document-object-model"
          },
          "group": {
            "title": "Node",
            "order": 4,
            "path": "/document-object-model/node"
          },
          "title": "Node",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Node",
              "heading": "node"
            }
          ]
        },
        "title": "Node"
      },
      {
        "path": "/object-oriented-programming",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/index.md",
          "updatedTime": 1600511039000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "面向对象编程",
            "order": 1,
            "path": "/object-oriented-programming"
          },
          "title": "目录",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "面向对象编程",
              "heading": "面向对象编程"
            }
          ]
        },
        "title": "目录"
      },
      {
        "path": "/object-oriented-programming/object-oriented-programming",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-oriented-programming.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-oriented-programming.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "面向对象编程",
            "order": 1,
            "path": "/object-oriented-programming"
          },
          "title": "简介",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "面向对象编程",
              "heading": "面向对象编程"
            },
            {
              "depth": 2,
              "value": "名词解释",
              "heading": "名词解释"
            },
            {
              "depth": 2,
              "value": "不同语言间的对比",
              "heading": "不同语言间的对比"
            }
          ]
        },
        "title": "简介"
      },
      {
        "path": "/object-oriented-programming/class-definitions/class-basic",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/class-definitions/class-basic.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/class-definitions/class-basic.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "类",
            "order": 5,
            "path": "/object-oriented-programming/class-definitions"
          },
          "title": "类的基本语法",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "类的基本语法",
              "heading": "类的基本语法"
            },
            {
              "depth": 2,
              "value": "基本写法",
              "heading": "基本写法"
            },
            {
              "depth": 2,
              "value": "表现形式",
              "heading": "表现形式"
            },
            {
              "depth": 3,
              "value": "类的声明式",
              "heading": "类的声明式"
            },
            {
              "depth": 3,
              "value": "类的表达式",
              "heading": "类的表达式"
            },
            {
              "depth": 2,
              "value": "类的组成",
              "heading": "类的组成"
            },
            {
              "depth": 3,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 3,
              "value": "实例对象",
              "heading": "实例对象"
            },
            {
              "depth": 3,
              "value": "访问器属性",
              "heading": "访问器属性"
            },
            {
              "depth": 3,
              "value": "属性表达式",
              "heading": "属性表达式"
            },
            {
              "depth": 3,
              "value": "生成器方法",
              "heading": "生成器方法"
            },
            {
              "depth": 2,
              "value": "运行环境的指向",
              "heading": "运行环境的指向"
            }
          ]
        },
        "title": "类的基本语法"
      },
      {
        "path": "/object-oriented-programming/class-definitions/class-extends",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/class-definitions/class-extends.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/class-definitions/class-extends.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "类",
            "order": 5,
            "path": "/object-oriented-programming/class-definitions"
          },
          "title": "类的继承",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "类的继承",
              "heading": "类的继承"
            },
            {
              "depth": 2,
              "value": "使用方法",
              "heading": "使用方法"
            },
            {
              "depth": 2,
              "value": "访问父类",
              "heading": "访问父类"
            },
            {
              "depth": 2,
              "value": "super",
              "heading": "super"
            },
            {
              "depth": 3,
              "value": "普通方法",
              "heading": "普通方法"
            },
            {
              "depth": 3,
              "value": "静态方法",
              "heading": "静态方法"
            },
            {
              "depth": 2,
              "value": "类的原型对象",
              "heading": "类的原型对象"
            },
            {
              "depth": 2,
              "value": "内置对象的继承",
              "heading": "内置对象的继承"
            }
          ]
        },
        "title": "类的继承"
      },
      {
        "path": "/object-oriented-programming/class-definitions/class-private-member",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/class-definitions/class-private-member.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/class-definitions/class-private-member.md",
          "updatedTime": 1601324131000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "类",
            "order": 5,
            "path": "/object-oriented-programming/class-definitions"
          },
          "title": "私有成员",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "私有成员",
              "heading": "私有成员"
            },
            {
              "depth": 2,
              "value": "私有方法",
              "heading": "私有方法"
            },
            {
              "depth": 3,
              "value": "命名区别",
              "heading": "命名区别"
            },
            {
              "depth": 3,
              "value": "Symbol 值命名",
              "heading": "symbol-值命名"
            },
            {
              "depth": 3,
              "value": "引用外部方法",
              "heading": "引用外部方法"
            },
            {
              "depth": 2,
              "value": "私有属性",
              "heading": "私有属性"
            }
          ]
        },
        "title": "私有成员"
      },
      {
        "path": "/object-oriented-programming/class-definitions/class-static-member",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/class-definitions/class-static-member.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/class-definitions/class-static-member.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "类",
            "order": 5,
            "path": "/object-oriented-programming/class-definitions"
          },
          "title": "静态成员",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "静态成员",
              "heading": "静态成员"
            },
            {
              "depth": 2,
              "value": "静态方法",
              "heading": "静态方法"
            },
            {
              "depth": 3,
              "value": "动态作用域",
              "heading": "动态作用域"
            },
            {
              "depth": 3,
              "value": "子类继承",
              "heading": "子类继承"
            },
            {
              "depth": 2,
              "value": "静态属性",
              "heading": "静态属性"
            }
          ]
        },
        "title": "静态成员"
      },
      {
        "path": "/object-oriented-programming/inheritance/combination-inheritance",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/inheritance/combination-inheritance.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/inheritance/combination-inheritance.md",
          "updatedTime": 1600511039000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "继承",
            "order": 4,
            "path": "/object-oriented-programming/inheritance"
          },
          "title": "组合继承",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "组合继承",
              "heading": "组合继承"
            },
            {
              "depth": 2,
              "value": "缺陷",
              "heading": "缺陷"
            },
            {
              "depth": 2,
              "value": "组合继承优化",
              "heading": "组合继承优化"
            }
          ]
        },
        "title": "组合继承"
      },
      {
        "path": "/object-oriented-programming/inheritance/constructor-stealing",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/inheritance/constructor-stealing.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/inheritance/constructor-stealing.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "继承",
            "order": 4,
            "path": "/object-oriented-programming/inheritance"
          },
          "title": "借用构造函数",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "借用构造函数",
              "heading": "借用构造函数"
            },
            {
              "depth": 2,
              "value": "传递参数",
              "heading": "传递参数"
            },
            {
              "depth": 2,
              "value": "缺陷",
              "heading": "缺陷"
            }
          ]
        },
        "title": "借用构造函数"
      },
      {
        "path": "/object-oriented-programming/inheritance/parasitic-combination-inheritance",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/inheritance/parasitic-combination-inheritance.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/inheritance/parasitic-combination-inheritance.md",
          "updatedTime": 1600511039000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "继承",
            "order": 4,
            "path": "/object-oriented-programming/inheritance"
          },
          "title": "寄生组合式继承",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "寄生组合式继承",
              "heading": "寄生组合式继承"
            }
          ]
        },
        "title": "寄生组合式继承"
      },
      {
        "path": "/object-oriented-programming/inheritance/parasitic-inheritance",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/inheritance/parasitic-inheritance.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/inheritance/parasitic-inheritance.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "继承",
            "order": 4,
            "path": "/object-oriented-programming/inheritance"
          },
          "title": "寄生式继承",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "寄生式继承",
              "heading": "寄生式继承"
            }
          ]
        },
        "title": "寄生式继承"
      },
      {
        "path": "/object-oriented-programming/inheritance/prototypal-inheritance",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/inheritance/prototypal-inheritance.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/inheritance/prototypal-inheritance.md",
          "updatedTime": 1600511039000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "继承",
            "order": 4,
            "path": "/object-oriented-programming/inheritance"
          },
          "title": "原型式继承",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "原型式继承",
              "heading": "原型式继承"
            },
            {
              "depth": 2,
              "value": "模式缺陷",
              "heading": "模式缺陷"
            }
          ]
        },
        "title": "原型式继承"
      },
      {
        "path": "/object-oriented-programming/inheritance/prototype-chain",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/inheritance/prototype-chain.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/inheritance/prototype-chain.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "继承",
            "order": 4,
            "path": "/object-oriented-programming/inheritance"
          },
          "title": "原型链",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "原型链",
              "heading": "原型链"
            },
            {
              "depth": 2,
              "value": "显式原型",
              "heading": "显式原型"
            },
            {
              "depth": 2,
              "value": "隐式原型",
              "heading": "隐式原型"
            },
            {
              "depth": 2,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 2,
              "value": "原型对象的指向",
              "heading": "原型对象的指向"
            },
            {
              "depth": 3,
              "value": "字面量方式",
              "heading": "字面量方式"
            },
            {
              "depth": 3,
              "value": "构造器方式",
              "heading": "构造器方式"
            },
            {
              "depth": 3,
              "value": "Object.create 方式",
              "heading": "objectcreate-方式"
            },
            {
              "depth": 2,
              "value": "原型对象与实例",
              "heading": "原型对象与实例"
            }
          ]
        },
        "title": "原型链"
      },
      {
        "path": "/object-oriented-programming/object-creation/combination-constructor-and-prototype-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-creation/combination-constructor-and-prototype-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-creation/combination-constructor-and-prototype-pattern.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "创建对象",
            "order": 3,
            "path": "/object-oriented-programming/object-creation"
          },
          "title": "组合使用构造函数模式和原型模式",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "组合使用构造函数模式和原型模式",
              "heading": "组合使用构造函数模式和原型模式"
            }
          ]
        },
        "title": "组合使用构造函数模式和原型模式"
      },
      {
        "path": "/object-oriented-programming/object-creation/durable-constructor-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-creation/durable-constructor-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-creation/durable-constructor-pattern.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "创建对象",
            "order": 3,
            "path": "/object-oriented-programming/object-creation"
          },
          "title": "稳妥构造函数模式",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "稳妥构造函数模式",
              "heading": "稳妥构造函数模式"
            }
          ]
        },
        "title": "稳妥构造函数模式"
      },
      {
        "path": "/object-oriented-programming/object-creation/dynamic-prototype-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-creation/dynamic-prototype-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-creation/dynamic-prototype-pattern.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "创建对象",
            "order": 3,
            "path": "/object-oriented-programming/object-creation"
          },
          "title": "动态原型模式",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "动态原型模式",
              "heading": "动态原型模式"
            }
          ]
        },
        "title": "动态原型模式"
      },
      {
        "path": "/object-oriented-programming/object-creation/parastic-constructor-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-creation/parastic-constructor-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-creation/parastic-constructor-pattern.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "创建对象",
            "order": 3,
            "path": "/object-oriented-programming/object-creation"
          },
          "title": "寄生构造函数模式",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "寄生构造函数模式",
              "heading": "寄生构造函数模式"
            }
          ]
        },
        "title": "寄生构造函数模式"
      },
      {
        "path": "/object-oriented-programming/object-creation/the-constructor-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-creation/the-constructor-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-creation/the-constructor-pattern.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "创建对象",
            "order": 3,
            "path": "/object-oriented-programming/object-creation"
          },
          "title": "构造函数模式",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "构造函数模式",
              "heading": "构造函数模式"
            },
            {
              "depth": 2,
              "value": "将构造函数当作函数",
              "heading": "将构造函数当作函数"
            },
            {
              "depth": 2,
              "value": "构造函数的问题",
              "heading": "构造函数的问题"
            },
            {
              "depth": 2,
              "value": "ES6 模块实现",
              "heading": "es6-模块实现"
            }
          ]
        },
        "title": "构造函数模式"
      },
      {
        "path": "/object-oriented-programming/object-creation/the-factory-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-creation/the-factory-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-creation/the-factory-pattern.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "创建对象",
            "order": 3,
            "path": "/object-oriented-programming/object-creation"
          },
          "title": "工厂模式",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "工厂模式",
              "heading": "工厂模式"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 3,
              "value": "ES5 实现工厂模式",
              "heading": "es5-实现工厂模式"
            },
            {
              "depth": 3,
              "value": "ES6 实现工厂模式",
              "heading": "es6-实现工厂模式"
            }
          ]
        },
        "title": "工厂模式"
      },
      {
        "path": "/object-oriented-programming/object-creation/the-prototype-pattern",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-creation/the-prototype-pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-creation/the-prototype-pattern.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "创建对象",
            "order": 3,
            "path": "/object-oriented-programming/object-creation"
          },
          "title": "原型模式",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "原型模式",
              "heading": "原型模式"
            },
            {
              "depth": 2,
              "value": "理解原型对象",
              "heading": "理解原型对象"
            },
            {
              "depth": 2,
              "value": "原型与实例属性检测",
              "heading": "原型与实例属性检测"
            },
            {
              "depth": 2,
              "value": "更简单的原型语法",
              "heading": "更简单的原型语法"
            },
            {
              "depth": 2,
              "value": "原型的动态性",
              "heading": "原型的动态性"
            },
            {
              "depth": 2,
              "value": "原型对象的原型",
              "heading": "原型对象的原型"
            },
            {
              "depth": 2,
              "value": "原型对象的问题",
              "heading": "原型对象的问题"
            }
          ]
        },
        "title": "原型模式"
      },
      {
        "path": "/object-oriented-programming/object-understand/attributes-object",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-understand/attributes-object.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-understand/attributes-object.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "理解对象",
            "order": 2,
            "path": "/object-oriented-programming/object-understand"
          },
          "title": "对象属性描述符",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "对象属性描述符",
              "heading": "对象属性描述符"
            },
            {
              "depth": 2,
              "value": "数据属性",
              "heading": "数据属性"
            },
            {
              "depth": 3,
              "value": "可写性",
              "heading": "可写性"
            },
            {
              "depth": 3,
              "value": "可配置性",
              "heading": "可配置性"
            },
            {
              "depth": 3,
              "value": "可枚举性",
              "heading": "可枚举性"
            },
            {
              "depth": 2,
              "value": "访问器属性",
              "heading": "访问器属性"
            },
            {
              "depth": 3,
              "value": "Getter",
              "heading": "getter"
            },
            {
              "depth": 3,
              "value": "Setter",
              "heading": "setter"
            }
          ]
        },
        "title": "对象属性描述符"
      },
      {
        "path": "/object-oriented-programming/object-understand/manipulating-property",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-understand/manipulating-property.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-understand/manipulating-property.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "理解对象",
            "order": 2,
            "path": "/object-oriented-programming/object-understand"
          },
          "title": "属性操作",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "属性操作",
              "heading": "属性操作"
            },
            {
              "depth": 2,
              "value": "属性查询",
              "heading": "属性查询"
            },
            {
              "depth": 3,
              "value": "点运算符",
              "heading": "点运算符"
            },
            {
              "depth": 3,
              "value": "方括号运算符",
              "heading": "方括号运算符"
            },
            {
              "depth": 4,
              "value": "可计算属性名",
              "heading": "可计算属性名"
            },
            {
              "depth": 4,
              "value": "属性查询错误",
              "heading": "属性查询错误"
            },
            {
              "depth": 2,
              "value": "属性设置",
              "heading": "属性设置"
            },
            {
              "depth": 3,
              "value": "赋值检测",
              "heading": "赋值检测"
            },
            {
              "depth": 3,
              "value": "原始类型",
              "heading": "原始类型"
            },
            {
              "depth": 2,
              "value": "属性删除",
              "heading": "属性删除"
            },
            {
              "depth": 2,
              "value": "属性继承",
              "heading": "属性继承"
            },
            {
              "depth": 3,
              "value": "判断方法",
              "heading": "判断方法"
            }
          ]
        },
        "title": "属性操作"
      },
      {
        "path": "/object-oriented-programming/object-understand/the-object-status",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-understand/the-object-status.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-understand/the-object-status.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "理解对象",
            "order": 2,
            "path": "/object-oriented-programming/object-understand"
          },
          "title": "对象状态",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "对象状态",
              "heading": "对象状态"
            },
            {
              "depth": 2,
              "value": "扩展特性",
              "heading": "扩展特性"
            },
            {
              "depth": 2,
              "value": "密封特性",
              "heading": "密封特性"
            },
            {
              "depth": 2,
              "value": "冻结特性",
              "heading": "冻结特性"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ]
        },
        "title": "对象状态"
      },
      {
        "path": "/object-oriented-programming/object-understand/the-object-type",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/object-oriented-programming/object-understand/the-object-type.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/object-oriented-programming/object-understand/the-object-type.md",
          "updatedTime": 1599139025000,
          "nav": {
            "title": "OOP",
            "order": 4,
            "path": "/object-oriented-programming"
          },
          "group": {
            "title": "理解对象",
            "order": 2,
            "path": "/object-oriented-programming/object-understand"
          },
          "title": "对象类型",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "对象类型",
              "heading": "对象类型"
            },
            {
              "depth": 2,
              "value": "对象创建",
              "heading": "对象创建"
            },
            {
              "depth": 3,
              "value": "对象字面量",
              "heading": "对象字面量"
            },
            {
              "depth": 3,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 4,
              "value": "参数为对象",
              "heading": "参数为对象"
            },
            {
              "depth": 4,
              "value": "参数为原始类型",
              "heading": "参数为原始类型"
            },
            {
              "depth": 3,
              "value": "Object.create",
              "heading": "objectcreate"
            },
            {
              "depth": 2,
              "value": "对象组成",
              "heading": "对象组成"
            },
            {
              "depth": 3,
              "value": "键名",
              "heading": "键名"
            },
            {
              "depth": 3,
              "value": "属性值",
              "heading": "属性值"
            },
            {
              "depth": 2,
              "value": "引用对象",
              "heading": "引用对象"
            }
          ]
        },
        "title": "对象类型"
      },
      {
        "path": "/standard-built-in-objects",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/index.md",
          "updatedTime": 1593015454000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "标准内置对象",
            "order": 1,
            "path": "/standard-built-in-objects"
          },
          "title": "标准内置对象",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "标准内置对象",
              "heading": "标准内置对象"
            }
          ]
        },
        "title": "标准内置对象"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/generator-async",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/generator/generator-async.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/generator/generator-async.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Generator 函数的异步应用",
          "order": 31,
          "slugs": [
            {
              "depth": 1,
              "value": "Generator 函数的异步应用",
              "heading": "generator-函数的异步应用"
            },
            {
              "depth": 2,
              "value": "基本概念",
              "heading": "基本概念"
            },
            {
              "depth": 3,
              "value": "异步",
              "heading": "异步"
            },
            {
              "depth": 3,
              "value": "回调函数",
              "heading": "回调函数"
            },
            {
              "depth": 3,
              "value": "Promise",
              "heading": "promise"
            },
            {
              "depth": 2,
              "value": "Generator 函数",
              "heading": "generator-函数"
            },
            {
              "depth": 3,
              "value": "协程",
              "heading": "协程"
            },
            {
              "depth": 3,
              "value": "协程的 Generator 函数实现",
              "heading": "协程的-generator-函数实现"
            },
            {
              "depth": 3,
              "value": "Generator 函数的数据交换和错误处理",
              "heading": "generator-函数的数据交换和错误处理"
            },
            {
              "depth": 3,
              "value": "异步任务的封装",
              "heading": "异步任务的封装"
            },
            {
              "depth": 2,
              "value": "Thunk 函数",
              "heading": "thunk-函数"
            },
            {
              "depth": 3,
              "value": "参数的求值策略",
              "heading": "参数的求值策略"
            },
            {
              "depth": 3,
              "value": "Thunk 函数的含义",
              "heading": "thunk-函数的含义"
            },
            {
              "depth": 3,
              "value": "JavaScript 语言的 Thunk 函数",
              "heading": "javascript-语言的-thunk-函数"
            },
            {
              "depth": 3,
              "value": "Thunkify 模块",
              "heading": "thunkify-模块"
            },
            {
              "depth": 3,
              "value": "Generator 函数的流程管理",
              "heading": "generator-函数的流程管理"
            },
            {
              "depth": 3,
              "value": "Thunk 函数的自动流程管理",
              "heading": "thunk-函数的自动流程管理"
            },
            {
              "depth": 2,
              "value": "co 模块",
              "heading": "co-模块"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "co 模块的原理",
              "heading": "co-模块的原理"
            },
            {
              "depth": 3,
              "value": "基于 Promise 对象的自动执行",
              "heading": "基于-promise-对象的自动执行"
            }
          ]
        },
        "title": "Generator 函数的异步应用"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/generator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/generator/generator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/generator/generator.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Generator",
          "order": 30,
          "slugs": [
            {
              "depth": 1,
              "value": "Generator",
              "heading": "generator"
            },
            {
              "depth": 2,
              "value": "状态机",
              "heading": "状态机"
            },
            {
              "depth": 3,
              "value": "函数特征",
              "heading": "函数特征"
            },
            {
              "depth": 3,
              "value": "调用方法",
              "heading": "调用方法"
            },
            {
              "depth": 2,
              "value": "yield 表达式",
              "heading": "yield-表达式"
            },
            {
              "depth": 3,
              "value": "yield 与 return",
              "heading": "yield-与-return"
            },
            {
              "depth": 3,
              "value": "暂缓执行函数",
              "heading": "暂缓执行函数"
            },
            {
              "depth": 3,
              "value": "表达式规范",
              "heading": "表达式规范"
            },
            {
              "depth": 3,
              "value": "嵌套表达式",
              "heading": "嵌套表达式"
            },
            {
              "depth": 2,
              "value": "原型方法",
              "heading": "原型方法"
            },
            {
              "depth": 2,
              "value": "作为对象的函数",
              "heading": "作为对象的函数"
            },
            {
              "depth": 2,
              "value": "判断方法",
              "heading": "判断方法"
            }
          ]
        },
        "title": "Generator"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/next",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/generator/prototype/next.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/generator/prototype/next.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Generator.prototype.next",
          "order": 32,
          "slugs": [
            {
              "depth": 1,
              "value": "Generator.prototype.next",
              "heading": "generatorprototypenext"
            }
          ]
        },
        "title": "Generator.prototype.next"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/return",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/generator/prototype/return.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/generator/prototype/return.md",
          "updatedTime": 1622527674000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Generator.prototype.return",
          "order": 33,
          "slugs": [
            {
              "depth": 1,
              "value": "Generator.prototype.return",
              "heading": "generatorprototypereturn"
            }
          ]
        },
        "title": "Generator.prototype.return"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/throw",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/generator/prototype/throw.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/generator/prototype/throw.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Generator.prototype.throw",
          "order": 34,
          "slugs": [
            {
              "depth": 1,
              "value": "Generator.prototype.throw",
              "heading": "generatorprototypethrow"
            },
            {
              "depth": 2,
              "value": "可接收参数",
              "heading": "可接收参数"
            },
            {
              "depth": 2,
              "value": "外部捕获",
              "heading": "外部捕获"
            },
            {
              "depth": 2,
              "value": "中断执行",
              "heading": "中断执行"
            },
            {
              "depth": 2,
              "value": "内部捕获的前提条件",
              "heading": "内部捕获的前提条件"
            },
            {
              "depth": 2,
              "value": "附带执行",
              "heading": "附带执行"
            },
            {
              "depth": 2,
              "value": "独立状态",
              "heading": "独立状态"
            },
            {
              "depth": 2,
              "value": "总结归纳",
              "heading": "总结归纳"
            }
          ]
        },
        "title": "Generator.prototype.throw"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/iterator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/iterator/iterator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/iterator/iterator.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Iterator",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Iterator",
              "heading": "iterator"
            },
            {
              "depth": 2,
              "value": "迭代器",
              "heading": "迭代器"
            },
            {
              "depth": 2,
              "value": "迭代器协议",
              "heading": "迭代器协议"
            },
            {
              "depth": 2,
              "value": "可迭代对象",
              "heading": "可迭代对象"
            },
            {
              "depth": 3,
              "value": "内置可迭代对象",
              "heading": "内置可迭代对象"
            },
            {
              "depth": 3,
              "value": "自定义可迭代对象",
              "heading": "自定义可迭代对象"
            },
            {
              "depth": 3,
              "value": "接受可迭代对象的内置 API",
              "heading": "接受可迭代对象的内置-api"
            },
            {
              "depth": 2,
              "value": "for...of 循环",
              "heading": "forof-循环"
            }
          ]
        },
        "title": "Iterator"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/promise-standard",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/promise-standard.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/promise-standard.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise/A+ 规范",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise/A+ 规范",
              "heading": "promisea-规范"
            },
            {
              "depth": 2,
              "value": "规范术语",
              "heading": "规范术语"
            },
            {
              "depth": 2,
              "value": "术语",
              "heading": "术语"
            },
            {
              "depth": 2,
              "value": "状态",
              "heading": "状态"
            },
            {
              "depth": 3,
              "value": "等待态（Pending）",
              "heading": "等待态（pending）"
            },
            {
              "depth": 3,
              "value": "执行态（Fulfilled）",
              "heading": "执行态（fulfilled）"
            },
            {
              "depth": 3,
              "value": "拒绝态（Rejected）",
              "heading": "拒绝态（rejected）"
            },
            {
              "depth": 2,
              "value": "Then 方法",
              "heading": "then-方法"
            },
            {
              "depth": 3,
              "value": "参数可选",
              "heading": "参数可选"
            },
            {
              "depth": 3,
              "value": "onFulfilled 特性",
              "heading": "onfulfilled-特性"
            },
            {
              "depth": 3,
              "value": "onRejected 特性",
              "heading": "onrejected-特性"
            },
            {
              "depth": 3,
              "value": "调用时机",
              "heading": "调用时机"
            },
            {
              "depth": 3,
              "value": "调用要求",
              "heading": "调用要求"
            },
            {
              "depth": 3,
              "value": "多次调用",
              "heading": "多次调用"
            },
            {
              "depth": 3,
              "value": "返回",
              "heading": "返回"
            },
            {
              "depth": 2,
              "value": "解决过程",
              "heading": "解决过程"
            },
            {
              "depth": 3,
              "value": "x 与 Promise 相等",
              "heading": "x-与-promise-相等"
            },
            {
              "depth": 3,
              "value": "x 为 Promise",
              "heading": "x-为-promise"
            },
            {
              "depth": 3,
              "value": "x 为对象或函数",
              "heading": "x-为对象或函数"
            },
            {
              "depth": 2,
              "value": "注释",
              "heading": "注释"
            },
            {
              "depth": 3,
              "value": "注 1",
              "heading": "注-1"
            },
            {
              "depth": 3,
              "value": "注 2",
              "heading": "注-2"
            },
            {
              "depth": 3,
              "value": "注 3",
              "heading": "注-3"
            },
            {
              "depth": 3,
              "value": "注 4",
              "heading": "注-4"
            },
            {
              "depth": 3,
              "value": "注 5",
              "heading": "注-5"
            },
            {
              "depth": 3,
              "value": "注 6",
              "heading": "注-6"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise/A+ 规范"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/promise",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/promise.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/promise.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise",
              "heading": "promise"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "工作流",
              "heading": "工作流"
            },
            {
              "depth": 2,
              "value": "状态",
              "heading": "状态"
            },
            {
              "depth": 2,
              "value": "静态方法",
              "heading": "静态方法"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "最佳实践",
              "heading": "最佳实践"
            },
            {
              "depth": 3,
              "value": "多任务串行",
              "heading": "多任务串行"
            },
            {
              "depth": 3,
              "value": "同步并发",
              "heading": "同步并发"
            },
            {
              "depth": 3,
              "value": "异步并发",
              "heading": "异步并发"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/all-settled",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/all-settled.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/all-settled.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.allSettled",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.allSettled",
              "heading": "promiseallsettled"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法描述",
              "heading": "方法描述"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "异步并发",
              "heading": "异步并发"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise.allSettled"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/all",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/all.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/all.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.all",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.all",
              "heading": "promiseall"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "快速返回否决行为",
              "heading": "快速返回否决行为"
            },
            {
              "depth": 3,
              "value": "完成时回调 Hack",
              "heading": "完成时回调-hack"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise.all"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/any",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/any.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/any.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.any",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.any",
              "heading": "promiseany"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基础使用",
              "heading": "基础使用"
            },
            {
              "depth": 3,
              "value": "传入空的可迭代对象",
              "heading": "传入空的可迭代对象"
            },
            {
              "depth": 3,
              "value": "传入不包含实例参数",
              "heading": "传入不包含实例参数"
            },
            {
              "depth": 3,
              "value": "从最快的服务器检索资源",
              "heading": "从最快的服务器检索资源"
            },
            {
              "depth": 3,
              "value": "显示第一张已加载的图片",
              "heading": "显示第一张已加载的图片"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise.any"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/race",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/race.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/race.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.race",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.race",
              "heading": "promiserace"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise.race"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/reject",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/reject.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/reject.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.reject",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.reject",
              "heading": "promisereject"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "方法描述",
              "heading": "方法描述"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            }
          ]
        },
        "title": "Promise.reject"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/resolve",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/resolve.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/constructor/resolve.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.resolve",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.resolve",
              "heading": "promiseresolve"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "Promise 实例",
              "heading": "promise-实例"
            },
            {
              "depth": 3,
              "value": "Thenable 对象",
              "heading": "thenable-对象"
            },
            {
              "depth": 3,
              "value": "非 Thenable 对象",
              "heading": "非-thenable-对象"
            },
            {
              "depth": 3,
              "value": "不带参数",
              "heading": "不带参数"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "数组作参数",
              "heading": "数组作参数"
            },
            {
              "depth": 3,
              "value": "Promise 作为参数",
              "heading": "promise-作为参数"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise.resolve"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/catch",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/prototype/catch.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/prototype/catch.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.prototype.catch",
          "order": 21,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.prototype.catch",
              "heading": "promiseprototypecatch"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "函数中抛出错误",
              "heading": "函数中抛出错误"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise.prototype.catch"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/finally",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/prototype/finally.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/prototype/finally.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.prototype.finally",
          "order": 22,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.prototype.finally",
              "heading": "promiseprototypefinally"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Promise.prototype.finally"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/then",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/control-abstraction-objects/promise/prototype/then.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/control-abstraction-objects/promise/prototype/then.md",
          "updatedTime": 1648370441000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "控制抽象对象",
            "path": "/standard-built-in-objects/control-abstraction-objects/",
            "order": 15
          },
          "title": "Promise.prototype.then",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "Promise.prototype.then",
              "heading": "promiseprototypethen"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "链式调用",
              "heading": "链式调用"
            },
            {
              "depth": 3,
              "value": "参数传递",
              "heading": "参数传递"
            }
          ]
        },
        "title": "Promise.prototype.then"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/boolean",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/boolean.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/boolean.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "其他基础对象",
            "order": 7,
            "path": "/standard-built-in-objects/fundamental-objects"
          },
          "title": "Boolean",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Boolean 对象",
              "heading": "boolean-对象"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Boolean"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/error",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/error.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/error.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "其他基础对象",
            "order": 7,
            "path": "/standard-built-in-objects/fundamental-objects"
          },
          "title": "Error",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Error 对象",
              "heading": "error-对象"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "类型",
              "heading": "类型"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Error"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/function/apply",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/function/apply.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/function/apply.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Function",
            "order": 5,
            "path": "/standard-built-in-objects/fundamental-objects/function"
          },
          "title": "Function.prototype.apply",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Function.prototype.apply",
              "heading": "functionprototypeapply"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "数组元素添加",
              "heading": "数组元素添加"
            },
            {
              "depth": 3,
              "value": "内置函数使用",
              "heading": "内置函数使用"
            },
            {
              "depth": 2,
              "value": "兼容实现",
              "heading": "兼容实现"
            }
          ]
        },
        "title": "Function.prototype.apply"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/function/bind",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/function/bind.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/function/bind.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Function",
            "order": 5,
            "path": "/standard-built-in-objects/fundamental-objects/function"
          },
          "title": "Function.prototype.bind",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Function.prototype.bind",
              "heading": "functionprototypebind"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "创建绑定函数",
              "heading": "创建绑定函数"
            },
            {
              "depth": 3,
              "value": "偏函数",
              "heading": "偏函数"
            },
            {
              "depth": 3,
              "value": "配合定时器",
              "heading": "配合定时器"
            },
            {
              "depth": 2,
              "value": "兼容实现",
              "heading": "兼容实现"
            }
          ]
        },
        "title": "Function.prototype.bind"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/function/call",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/function/call.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/function/call.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Function",
            "order": 5,
            "path": "/standard-built-in-objects/fundamental-objects/function"
          },
          "title": "Function.prototype.call",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Function.prototype.call",
              "heading": "functionprototypecall"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 2,
              "value": "兼容实现",
              "heading": "兼容实现"
            }
          ]
        },
        "title": "Function.prototype.call"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/function/function",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/function/function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/function/function.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Function",
            "order": 5,
            "path": "/standard-built-in-objects/fundamental-objects/function"
          },
          "title": "Function",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Function",
              "heading": "function"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "基本示例",
              "heading": "基本示例"
            },
            {
              "depth": 3,
              "value": "函数声明",
              "heading": "函数声明"
            },
            {
              "depth": 3,
              "value": "函数表达式",
              "heading": "函数表达式"
            },
            {
              "depth": 3,
              "value": "全局作用域",
              "heading": "全局作用域"
            }
          ]
        },
        "title": "Function"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/assign",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/assign.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/assign.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.assign",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.assign",
              "heading": "objectassign"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.assign"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/create",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/create.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/create.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.create",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.create",
              "heading": "objectcreate"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "类式继承",
              "heading": "类式继承"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.create"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/define-properties",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/defineProperties.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/defineProperties.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.defineProperties",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.defineProperties",
              "heading": "objectdefineproperties"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.defineProperties"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/define-property",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/defineProperty.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/defineProperty.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.defineProperty",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.defineProperty",
              "heading": "objectdefineproperty"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "对象属性劫持",
              "heading": "对象属性劫持"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.defineProperty"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/entries",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/entries.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/entries.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.entries",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.entries",
              "heading": "objectentries"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.entries"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/freeze",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/freeze.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/freeze.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.freeze",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.freeze",
              "heading": "objectfreeze"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.freeze"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/from-entries",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/fromEntries.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/fromEntries.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.fromEntries",
          "order": 25,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.fromEntries",
              "heading": "objectfromentries"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "转换 Map 为 Object",
              "heading": "转换-map-为-object"
            },
            {
              "depth": 3,
              "value": "转换 Array 为 Object",
              "heading": "转换-array-为-object"
            },
            {
              "depth": 3,
              "value": "其他转换",
              "heading": "其他转换"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.fromEntries"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/get-own-property-descriptor",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/getOwnPropertyDescriptor.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/getOwnPropertyDescriptor.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.getOwnPropertyDescriptor",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.getOwnPropertyDescriptor",
              "heading": "objectgetownpropertydescriptor"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.getOwnPropertyDescriptor"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/get-own-property-descriptors",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/getOwnPropertyDescriptors.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/getOwnPropertyDescriptors.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.getOwnPropertyDescriptors",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.getOwnPropertyDescriptors",
              "heading": "objectgetownpropertydescriptors"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.getOwnPropertyDescriptors"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/get-own-property-names",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/getOwnPropertyNames.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/getOwnPropertyNames.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.getOwnPropertyNames",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.getOwnPropertyNames",
              "heading": "objectgetownpropertynames"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "数组",
              "heading": "数组"
            },
            {
              "depth": 3,
              "value": "类数组",
              "heading": "类数组"
            },
            {
              "depth": 3,
              "value": "不可枚举属性",
              "heading": "不可枚举属性"
            },
            {
              "depth": 3,
              "value": "仅获取自有 Property",
              "heading": "仅获取自有-property"
            },
            {
              "depth": 3,
              "value": "只获取不可枚举 Property",
              "heading": "只获取不可枚举-property"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.getOwnPropertyNames"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/get-own-property-symbols",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/getOwnPropertySymbols.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/getOwnPropertySymbols.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.getOwnPropertySymbols",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.getOwnPropertySymbols",
              "heading": "objectgetownpropertysymbols"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.getOwnPropertySymbols"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/get-prototype-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/getPrototypeOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/getPrototypeOf.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.getPrototypeOf",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.getPrototypeOf",
              "heading": "objectgetprototypeof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本示例",
              "heading": "基本示例"
            },
            {
              "depth": 3,
              "value": "标准内置对象",
              "heading": "标准内置对象"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.getPrototypeOf"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/has-own-property",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/hasOwnProperty.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/hasOwnProperty.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.prototype.hasOwnProperty",
          "order": 21,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.prototype.hasOwnProperty",
              "heading": "objectprototypehasownproperty"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "自有属性与继承属性",
              "heading": "自有属性与继承属性"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.prototype.hasOwnProperty"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/is",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/is.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/is.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.is",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.is",
              "heading": "objectis"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.is"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/is-extensible",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/isExtensible.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/isExtensible.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.isExtensible",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.isExtensible",
              "heading": "objectisextensible"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.isExtensible"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/is-frozen",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/isFrozen.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/isFrozen.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.isFrozen",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.isFrozen",
              "heading": "objectisfrozen"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码",
              "heading": "代码"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.isFrozen"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/is-prototype-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/isPrototypeOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/isPrototypeOf.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.prototype.isPrototypeOf",
          "order": 22,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.prototype.isPrototypeOf",
              "heading": "objectprototypeisprototypeof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.prototype.isPrototypeOf"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/is-sealed",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/isSealed.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/isSealed.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.isSealed",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.isSealed",
              "heading": "objectissealed"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.isSealed"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/keys",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/keys.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/keys.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.keys",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.keys",
              "heading": "objectkeys"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "数组",
              "heading": "数组"
            },
            {
              "depth": 3,
              "value": "类数组",
              "heading": "类数组"
            },
            {
              "depth": 3,
              "value": "不可枚举属性",
              "heading": "不可枚举属性"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.keys"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/object",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/object.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/object.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Object",
              "heading": "object"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性-1"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法-1"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Object"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/prevent-extensions",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/preventExtensions.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/preventExtensions.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.preventExtensions",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.preventExtensions",
              "heading": "objectpreventextensions"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.preventExtensions"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/property-is-enumerable",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/propertyIsEnumerable.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/propertyIsEnumerable.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.prototype.prototypeIsEnumerable",
          "order": 23,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.prototype.prototypeIsEnumerable",
              "heading": "objectprototypeprototypeisenumerable"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "自有属性与继承属性",
              "heading": "自有属性与继承属性"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.prototype.prototypeIsEnumerable"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/seal",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/seal.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/seal.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.seal",
          "order": 18,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.seal",
              "heading": "objectseal"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.seal"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/set-prototype-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/setPrototypeOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/setPrototypeOf.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.setPrototypeOf",
          "order": 19,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.setPrototypeOf",
              "heading": "objectsetprototypeof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.setPrototypeOf"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/to-string",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/toString.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/toString.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.prototype.toString",
          "order": 24,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.prototype.toString",
              "heading": "objectprototypetostring"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "检测对象类型",
              "heading": "检测对象类型"
            }
          ]
        },
        "title": "Object.prototype.toString"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object/values",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/object/values.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/object/values.md",
          "updatedTime": 1648574332000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Object",
            "order": 4,
            "path": "/standard-built-in-objects/fundamental-objects/object"
          },
          "title": "Object.values",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "Object.values",
              "heading": "objectvalues"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Object.values"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/description",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/description.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/description.md",
          "updatedTime": 1702650951000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.prototype.description",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.prototype.description",
              "heading": "symbolprototypedescription"
            },
            {
              "depth": 2,
              "value": "属性说明",
              "heading": "属性说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Symbol.prototype.description"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/has-instance",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/hasInstance.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/hasInstance.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.hasInstance",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.hasInstance",
              "heading": "symbolhasinstance"
            }
          ]
        },
        "title": "Symbol.hasInstance"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/is-concat-spreadable",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/isConcatSpreadable.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/isConcatSpreadable.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.isConcatSpreadable",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.isConcatSpreadable",
              "heading": "symbolisconcatspreadable"
            }
          ]
        },
        "title": "Symbol.isConcatSpreadable"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/iterator",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/iterator.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/iterator.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.iterator",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.iterator",
              "heading": "symboliterator"
            }
          ]
        },
        "title": "Symbol.iterator"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/match",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/match.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/match.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.match",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.match",
              "heading": "symbolmatch"
            }
          ]
        },
        "title": "Symbol.match"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/replace",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/replace.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/replace.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.replace",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.replace",
              "heading": "symbolreplace"
            }
          ]
        },
        "title": "Symbol.replace"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/search",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/search.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/search.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.search",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.search",
              "heading": "symbolsearch"
            }
          ]
        },
        "title": "Symbol.search"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/species",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/species.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/species.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.species",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.species",
              "heading": "symbolspecies"
            }
          ]
        },
        "title": "Symbol.species"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/split",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/split.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/split.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.split",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.split",
              "heading": "symbolsplit"
            }
          ]
        },
        "title": "Symbol.split"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/symbol",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/symbol.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/symbol.md",
          "updatedTime": 1702650951000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol",
              "heading": "symbol"
            },
            {
              "depth": 2,
              "value": "类型声明",
              "heading": "类型声明"
            },
            {
              "depth": 2,
              "value": "类型特性",
              "heading": "类型特性"
            },
            {
              "depth": 3,
              "value": "类型检测",
              "heading": "类型检测"
            },
            {
              "depth": 3,
              "value": "无法实例化",
              "heading": "无法实例化"
            },
            {
              "depth": 3,
              "value": "原型检测",
              "heading": "原型检测"
            },
            {
              "depth": 3,
              "value": "实例描述",
              "heading": "实例描述"
            },
            {
              "depth": 3,
              "value": "相同描述",
              "heading": "相同描述"
            },
            {
              "depth": 3,
              "value": "类型运算与转换",
              "heading": "类型运算与转换"
            },
            {
              "depth": 3,
              "value": "对象属性名",
              "heading": "对象属性名"
            },
            {
              "depth": 3,
              "value": "不可枚举",
              "heading": "不可枚举"
            },
            {
              "depth": 2,
              "value": "静态方法",
              "heading": "静态方法"
            },
            {
              "depth": 3,
              "value": "Symbol.for()",
              "heading": "symbolfor"
            },
            {
              "depth": 3,
              "value": "Symbol.keyFor()",
              "heading": "symbolkeyfor"
            },
            {
              "depth": 2,
              "value": "内置值",
              "heading": "内置值"
            },
            {
              "depth": 2,
              "value": "手写实现",
              "heading": "手写实现"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Symbol"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/to-primitive",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/toPrimitive.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/toPrimitive.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.toPrimitive",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.toPrimitive",
              "heading": "symboltoprimitive"
            }
          ]
        },
        "title": "Symbol.toPrimitive"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/to-string-tag",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/toStringTag.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/toStringTag.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.toStringTag",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.toStringTag",
              "heading": "symboltostringtag"
            }
          ]
        },
        "title": "Symbol.toStringTag"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol/unscopables",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/fundamental-objects/symbol/unscopables.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/fundamental-objects/symbol/unscopables.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Symbol",
            "order": 6,
            "path": "/standard-built-in-objects/fundamental-objects/symbol"
          },
          "title": "Symbol.unscopables",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "Symbol.unscopables",
              "heading": "symbolunscopables"
            }
          ]
        },
        "title": "Symbol.unscopables"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/array-detection",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/array-detection.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/array-detection.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "数组检测",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "数组检测",
              "heading": "数组检测"
            },
            {
              "depth": 2,
              "value": "typeof 操作符",
              "heading": "typeof-操作符"
            },
            {
              "depth": 2,
              "value": "instanceof 操作符",
              "heading": "instanceof-操作符"
            },
            {
              "depth": 2,
              "value": "数组对象的构造函数",
              "heading": "数组对象的构造函数"
            },
            {
              "depth": 2,
              "value": "Array.isArray()",
              "heading": "arrayisarray"
            },
            {
              "depth": 2,
              "value": "Object.prototype.toString（通用方法）",
              "heading": "objectprototypetostring（通用方法）"
            }
          ]
        },
        "title": "数组检测"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/array",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/array.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/array.md",
          "updatedTime": 1726107214000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Array 对象",
              "heading": "array-对象"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性-1"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法-1"
            },
            {
              "depth": 4,
              "value": "Mutator 突变方法",
              "heading": "mutator-突变方法"
            },
            {
              "depth": 4,
              "value": "Accessor 访问方法",
              "heading": "accessor-访问方法"
            },
            {
              "depth": 4,
              "value": "Iteration 迭代方法",
              "heading": "iteration-迭代方法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "创建数组",
              "heading": "创建数组"
            },
            {
              "depth": 3,
              "value": "稀疏数组",
              "heading": "稀疏数组"
            },
            {
              "depth": 3,
              "value": "数组长度",
              "heading": "数组长度"
            },
            {
              "depth": 3,
              "value": "数组遍历",
              "heading": "数组遍历"
            },
            {
              "depth": 3,
              "value": "数组乱序",
              "heading": "数组乱序"
            }
          ]
        },
        "title": "Array"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/from",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/constructor/from.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/constructor/from.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.from",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.from()",
              "heading": "arrayfrom"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "转换字符串",
              "heading": "转换字符串"
            },
            {
              "depth": 3,
              "value": "Array from a Set",
              "heading": "array-from-a-set"
            },
            {
              "depth": 3,
              "value": "Array from a Map",
              "heading": "array-from-a-map"
            },
            {
              "depth": 3,
              "value": "转换类数组",
              "heading": "转换类数组"
            },
            {
              "depth": 3,
              "value": "使用箭头函数",
              "heading": "使用箭头函数"
            },
            {
              "depth": 3,
              "value": "数组去重合并",
              "heading": "数组去重合并"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.from"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/is-array",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/constructor/isArray.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/constructor/isArray.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.isArray",
          "order": 4,
          "slugs": [
            {
              "depth": 2,
              "value": "Array.isArray()",
              "heading": "arrayisarray"
            },
            {
              "depth": 3,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.isArray"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/constructor/of.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/constructor/of.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.of",
          "order": 5,
          "slugs": [
            {
              "depth": 2,
              "value": "Array.of()",
              "heading": "arrayof"
            },
            {
              "depth": 3,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.of"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/concat",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/concat.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/concat.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.concat",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.concat()",
              "heading": "arrayprototypeconcat"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "连接两个数组",
              "heading": "连接两个数组"
            },
            {
              "depth": 3,
              "value": "连接三个数组",
              "heading": "连接三个数组"
            },
            {
              "depth": 3,
              "value": "将值连接到数组",
              "heading": "将值连接到数组"
            },
            {
              "depth": 3,
              "value": "合并嵌套数组",
              "heading": "合并嵌套数组"
            },
            {
              "depth": 3,
              "value": "将对象合并为数组",
              "heading": "将对象合并为数组"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.concat"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/copy-within",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/copyWithin.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/copyWithin.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.copyWithin",
          "order": 18,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.copyWithin()",
              "heading": "arrayprototypecopywithin"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.copyWithin"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/flat",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/flat.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/flat.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.flat",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.flat()",
              "heading": "arrayprototypeflat"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "扁平化嵌套数组",
              "heading": "扁平化嵌套数组"
            },
            {
              "depth": 3,
              "value": "扁平化与数组空项",
              "heading": "扁平化与数组空项"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.flat"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/flat-map",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/flatMap.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/flatMap.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.flatMap",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.flatMap()",
              "heading": "arrayprototypeflatmap"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.flatMap"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/includes",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/includes.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/includes.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.includes",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.includes()",
              "heading": "arrayprototypeincludes"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "参数值为 NaN",
              "heading": "参数值为-nan"
            },
            {
              "depth": 3,
              "value": "开始索引超限",
              "heading": "开始索引超限"
            },
            {
              "depth": 3,
              "value": "开始索引为负值",
              "heading": "开始索引为负值"
            },
            {
              "depth": 3,
              "value": "类数组通用方法",
              "heading": "类数组通用方法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.includes"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/index-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/indexOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/indexOf.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.indexOf",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.indexOf()",
              "heading": "arrayprototypeindexof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "找出指定元素出现的所有位置",
              "heading": "找出指定元素出现的所有位置"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.indexOf"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/join",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/join.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/join.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.join",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.join()",
              "heading": "arrayprototypejoin"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "类数组对象",
              "heading": "类数组对象"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.join"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/last-index-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/lastIndexOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/lastIndexOf.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.lastIndexOf",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.lastIndexOf()",
              "heading": "arrayprototypelastindexof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "查找所有元素",
              "heading": "查找所有元素"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.lastIndexOf"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/slice",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/slice.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/accessor-methods/slice.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.slice",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.slice()",
              "heading": "arrayprototypeslice"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "截取数组成员",
              "heading": "截取数组成员"
            },
            {
              "depth": 3,
              "value": "类数组对象",
              "heading": "类数组对象"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.slice"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/entries",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/entries.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/entries.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.entries",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.entries()",
              "heading": "arrayprototypeentries"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "二维数组排序",
              "heading": "二维数组排序"
            },
            {
              "depth": 3,
              "value": "使用 for-of 循环",
              "heading": "使用-for-of-循环"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.entries"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/every",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/every.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/every.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.every",
          "order": 21,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.every()",
              "heading": "arrayprototypeevery"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.every"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/filter",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/filter.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/filter.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.filter",
          "order": 22,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.filter()",
              "heading": "arrayprototypefilter"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "排除偶数保留奇数",
              "heading": "排除偶数保留奇数"
            },
            {
              "depth": 3,
              "value": "清除数组空字符",
              "heading": "清除数组空字符"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.filter"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/find",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/find.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/find.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.find",
          "order": 23,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.find()",
              "heading": "arrayprototypefind"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "用对象的属性查找数组里的对象",
              "heading": "用对象的属性查找数组里的对象"
            },
            {
              "depth": 3,
              "value": "寻找数组中的质数",
              "heading": "寻找数组中的质数"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.find"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/find-index",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/findIndex.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/findIndex.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.findIndex",
          "order": 24,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.findIndex()",
              "heading": "arrayprototypefindindex"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "查找质数",
              "heading": "查找质数"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.findIndex"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/for-each",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/forEach.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/forEach.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.forEach",
          "order": 25,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.forEach()",
              "heading": "arrayprototypeforeach"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.forEach"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/keys",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/keys.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/keys.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.keys",
          "order": 26,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.keys()",
              "heading": "arrayprototypekeys"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.keys"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/map",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/map.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/map.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.map",
          "order": 27,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.map()",
              "heading": "arrayprototypemap"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "格式化对象数组",
              "heading": "格式化对象数组"
            },
            {
              "depth": 3,
              "value": "回调函数参数",
              "heading": "回调函数参数"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.map"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/reduce",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/reduce.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/reduce.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.reduce",
          "order": 28,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.reduce",
              "heading": "arrayprototypereduce"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "聚合为数字",
              "heading": "聚合为数字"
            },
            {
              "depth": 3,
              "value": "聚合为字符串",
              "heading": "聚合为字符串"
            },
            {
              "depth": 3,
              "value": "聚合为对象",
              "heading": "聚合为对象"
            },
            {
              "depth": 3,
              "value": "初始值的必要性",
              "heading": "初始值的必要性"
            },
            {
              "depth": 3,
              "value": "数组求和、求积和最大值",
              "heading": "数组求和、求积和最大值"
            },
            {
              "depth": 3,
              "value": "数组元素",
              "heading": "数组元素"
            },
            {
              "depth": 3,
              "value": "二维数组扁平化",
              "heading": "二维数组扁平化"
            },
            {
              "depth": 3,
              "value": "计算数组成员次数",
              "heading": "计算数组成员次数"
            },
            {
              "depth": 3,
              "value": "单次遍历多次计算",
              "heading": "单次遍历多次计算"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.reduce"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/reduce-right",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/reduceRight.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/reduceRight.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.reduceRight",
          "order": 29,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.reduceRight",
              "heading": "arrayprototypereduceright"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "数组求和",
              "heading": "数组求和"
            },
            {
              "depth": 3,
              "value": "二维数组扁平化",
              "heading": "二维数组扁平化"
            },
            {
              "depth": 3,
              "value": "reduce 和 reduceRight 区别",
              "heading": "reduce-和-reduceright-区别"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.reduceRight"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/some",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/some.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/iteration-methods/some.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.some",
          "order": 30,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.some()",
              "heading": "arrayprototypesome"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.some"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/fill",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/fill.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/fill.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.fill",
          "order": 40,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.fill()",
              "heading": "arrayprototypefill"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.fill"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/pop",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/pop.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/pop.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.pop",
          "order": 41,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.pop()",
              "heading": "arrayprototypepop"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "在空数组中调用",
              "heading": "在空数组中调用"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.pop"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/push",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/push.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/push.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.push",
          "order": 42,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.push()",
              "heading": "arrayprototypepush"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "合并数组",
              "heading": "合并数组"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.push"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/reverse",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/reverse.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/reverse.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.reverse",
          "order": 43,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.reverse()",
              "heading": "arrayprototypereverse"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "空数组",
              "heading": "空数组"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.reverse"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/shift",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/shift.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/shift.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.shift",
          "order": 44,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.shift()",
              "heading": "arrayprototypeshift"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "空数组调用",
              "heading": "空数组调用"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.shift"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/sort",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/sort.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/sort.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.sort",
          "order": 45,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.sort()",
              "heading": "arrayprototypesort"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "数字排序",
              "heading": "数字排序"
            },
            {
              "depth": 3,
              "value": "对象属性排序",
              "heading": "对象属性排序"
            },
            {
              "depth": 3,
              "value": "undefined 排序",
              "heading": "undefined-排序"
            },
            {
              "depth": 3,
              "value": "大小写排序",
              "heading": "大小写排序"
            },
            {
              "depth": 3,
              "value": "升降序",
              "heading": "升降序"
            },
            {
              "depth": 3,
              "value": "对非 ASCII 字符排序",
              "heading": "对非-ascii-字符排序"
            },
            {
              "depth": 3,
              "value": "使用映射改善排序",
              "heading": "使用映射改善排序"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.sort"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/splice",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/splice.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/splice.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.splice",
          "order": 46,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.splice()",
              "heading": "arrayprototypesplice"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.splice"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/unshift",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/unshift.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/array/prototype/mutator-methods/unshift.md",
          "updatedTime": 1648400747000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Array.prototype.unshift",
          "order": 47,
          "slugs": [
            {
              "depth": 1,
              "value": "Array.prototype.unshift()",
              "heading": "arrayprototypeunshift"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Array.prototype.unshift"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/typed-array",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/indexed-collections/typed-array/typed-array.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/indexed-collections/typed-array/typed-array.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Array",
            "path": "/standard-built-in-objects/indexed-collections/array/",
            "order": 11
          },
          "title": "Typed Array",
          "order": 100,
          "slugs": [
            {
              "depth": 1,
              "value": "Typed Array",
              "heading": "typed-array"
            },
            {
              "depth": 2,
              "value": "缓冲和视图：类型数组架构",
              "heading": "缓冲和视图：类型数组架构"
            },
            {
              "depth": 3,
              "value": "数组缓冲",
              "heading": "数组缓冲"
            },
            {
              "depth": 3,
              "value": "类型化数组视图",
              "heading": "类型化数组视图"
            },
            {
              "depth": 3,
              "value": "数据视图",
              "heading": "数据视图"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "使用视图和缓冲",
              "heading": "使用视图和缓冲"
            },
            {
              "depth": 3,
              "value": "同一数据的多个视图",
              "heading": "同一数据的多个视图"
            }
          ]
        },
        "title": "Typed Array"
      },
      {
        "path": "/standard-built-in-objects/keyed-collections/map",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/keyed-collections/map/map.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/keyed-collections/map/map.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "键值集合",
            "path": "/standard-built-in-objects/keyed-collections/",
            "order": 13
          },
          "title": "Map",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Map",
              "heading": "map"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "原型属性",
              "heading": "原型属性"
            },
            {
              "depth": 3,
              "value": "size",
              "heading": "size"
            },
            {
              "depth": 2,
              "value": "原型方法",
              "heading": "原型方法"
            },
            {
              "depth": 3,
              "value": "set(key, value)",
              "heading": "setkey-value"
            },
            {
              "depth": 3,
              "value": "get(key)",
              "heading": "getkey"
            },
            {
              "depth": 3,
              "value": "has(key)",
              "heading": "haskey"
            },
            {
              "depth": 3,
              "value": "delete(key)",
              "heading": "deletekey"
            },
            {
              "depth": 3,
              "value": "clear()",
              "heading": "clear"
            },
            {
              "depth": 3,
              "value": "forEach",
              "heading": "foreach"
            },
            {
              "depth": 3,
              "value": "keys",
              "heading": "keys"
            },
            {
              "depth": 3,
              "value": "values",
              "heading": "values"
            },
            {
              "depth": 3,
              "value": "entries",
              "heading": "entries"
            },
            {
              "depth": 3,
              "value": "MapIterator.next",
              "heading": "mapiteratornext"
            },
            {
              "depth": 2,
              "value": "特性",
              "heading": "特性"
            },
            {
              "depth": 3,
              "value": "内存地址绑定",
              "heading": "内存地址绑定"
            },
            {
              "depth": 3,
              "value": "以基本类型值作为键名",
              "heading": "以基本类型值作为键名"
            },
            {
              "depth": 3,
              "value": "以 Set 或 Map 作为键名",
              "heading": "以-set-或-map-作为键名"
            },
            {
              "depth": 3,
              "value": "以 NaN 作键名",
              "heading": "以-nan-作键名"
            },
            {
              "depth": 2,
              "value": "实践应用",
              "heading": "实践应用"
            },
            {
              "depth": 3,
              "value": "实例对象合并",
              "heading": "实例对象合并"
            },
            {
              "depth": 3,
              "value": "Map 转为数组",
              "heading": "map-转为数组"
            },
            {
              "depth": 3,
              "value": "数组转为 Map",
              "heading": "数组转为-map"
            },
            {
              "depth": 3,
              "value": "Map 转为对象",
              "heading": "map-转为对象"
            },
            {
              "depth": 3,
              "value": "对象转为 Map",
              "heading": "对象转为-map"
            },
            {
              "depth": 3,
              "value": "Map 转为 JSON",
              "heading": "map-转为-json"
            },
            {
              "depth": 3,
              "value": "JSON 转为 Map",
              "heading": "json-转为-map"
            },
            {
              "depth": 3,
              "value": "替代 if-else",
              "heading": "替代-if-else"
            }
          ]
        },
        "title": "Map"
      },
      {
        "path": "/standard-built-in-objects/keyed-collections/set",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/keyed-collections/set/set.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/keyed-collections/set/set.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "键值集合",
            "path": "/standard-built-in-objects/keyed-collections/",
            "order": 13
          },
          "title": "Set",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Set",
              "heading": "set"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 4,
              "value": "操作方法",
              "heading": "操作方法"
            },
            {
              "depth": 4,
              "value": "遍历方法",
              "heading": "遍历方法"
            },
            {
              "depth": 5,
              "value": "Set.prototype.keys()",
              "heading": "setprototypekeys"
            },
            {
              "depth": 4,
              "value": "Set.prototype.values()",
              "heading": "setprototypevalues"
            },
            {
              "depth": 4,
              "value": "Set.prototype.entries()",
              "heading": "setprototypeentries"
            },
            {
              "depth": 4,
              "value": "Set.prototype.forEach()",
              "heading": "setprototypeforeach"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "内部判断机制",
              "heading": "内部判断机制"
            },
            {
              "depth": 3,
              "value": "数组类型转换",
              "heading": "数组类型转换"
            },
            {
              "depth": 3,
              "value": "数组去重",
              "heading": "数组去重"
            },
            {
              "depth": 3,
              "value": "扩展运算的应用",
              "heading": "扩展运算的应用"
            },
            {
              "depth": 3,
              "value": "并集、交集和差集的实现",
              "heading": "并集、交集和差集的实现"
            },
            {
              "depth": 3,
              "value": "结构变动",
              "heading": "结构变动"
            }
          ]
        },
        "title": "Set"
      },
      {
        "path": "/standard-built-in-objects/keyed-collections/weak-map",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/keyed-collections/weak-map/weak-map.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/keyed-collections/weak-map/weak-map.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "键值集合",
            "path": "/standard-built-in-objects/keyed-collections/",
            "order": 13
          },
          "title": "WeakMap",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "WeakMap",
              "heading": "weakmap"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "特征",
              "heading": "特征"
            },
            {
              "depth": 3,
              "value": "对象键名",
              "heading": "对象键名"
            },
            {
              "depth": 3,
              "value": "弱引用对象",
              "heading": "弱引用对象"
            },
            {
              "depth": 2,
              "value": "实例方法",
              "heading": "实例方法"
            },
            {
              "depth": 2,
              "value": "使用示例",
              "heading": "使用示例"
            }
          ]
        },
        "title": "WeakMap"
      },
      {
        "path": "/standard-built-in-objects/keyed-collections/weak-set",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/keyed-collections/weak-set/weak-set.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/keyed-collections/weak-set/weak-set.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "键值集合",
            "path": "/standard-built-in-objects/keyed-collections/",
            "order": 13
          },
          "title": "WeakSet",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "WeakSet",
              "heading": "weakset"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "实例属性和方法",
              "heading": "实例属性和方法"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "WeakSet"
      },
      {
        "path": "/standard-built-in-objects/numbers-and-dates/date",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/numbers-and-dates/date/date.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/numbers-and-dates/date/date.md",
          "updatedTime": 1645451273000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "数字和日期",
            "path": "/standard-built-in-objects/numbers-and-dates/",
            "order": 8
          },
          "title": "Date",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Date 对象",
              "heading": "date-对象"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "不带 new 调用",
              "heading": "不带-new-调用"
            },
            {
              "depth": 3,
              "value": "带 new 调用",
              "heading": "带-new-调用"
            },
            {
              "depth": 3,
              "value": "数字参数",
              "heading": "数字参数"
            },
            {
              "depth": 3,
              "value": "字符串参数",
              "heading": "字符串参数"
            },
            {
              "depth": 3,
              "value": "Date.UTC",
              "heading": "dateutc"
            },
            {
              "depth": 2,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 3,
              "value": "获取指定时间",
              "heading": "获取指定时间"
            },
            {
              "depth": 3,
              "value": "获取指定时间值",
              "heading": "获取指定时间值"
            },
            {
              "depth": 3,
              "value": "设置指定时间值",
              "heading": "设置指定时间值"
            },
            {
              "depth": 2,
              "value": "应用示例",
              "heading": "应用示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "格式化时间戳",
              "heading": "格式化时间戳"
            }
          ]
        },
        "title": "Date"
      },
      {
        "path": "/standard-built-in-objects/numbers-and-dates/math",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/numbers-and-dates/math/math.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/numbers-and-dates/math/math.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "数字和日期",
            "path": "/standard-built-in-objects/numbers-and-dates/",
            "order": 8
          },
          "title": "Math",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Math 对象",
              "heading": "math-对象"
            },
            {
              "depth": 2,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "对数",
              "heading": "对数"
            },
            {
              "depth": 3,
              "value": "圆周率",
              "heading": "圆周率"
            },
            {
              "depth": 3,
              "value": "平方根",
              "heading": "平方根"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 3,
              "value": "最值",
              "heading": "最值"
            },
            {
              "depth": 3,
              "value": "舍入",
              "heading": "舍入"
            },
            {
              "depth": 3,
              "value": "随机数",
              "heading": "随机数"
            },
            {
              "depth": 3,
              "value": "绝对值",
              "heading": "绝对值"
            },
            {
              "depth": 3,
              "value": "乘方开方",
              "heading": "乘方开方"
            },
            {
              "depth": 3,
              "value": "三角函数",
              "heading": "三角函数"
            }
          ]
        },
        "title": "Math"
      },
      {
        "path": "/standard-built-in-objects/numbers-and-dates/number",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/numbers-and-dates/number/number.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/numbers-and-dates/number/number.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "数字和日期",
            "path": "/standard-built-in-objects/numbers-and-dates/",
            "order": 8
          },
          "title": "Number",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Number 对象",
              "heading": "number-对象"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Number"
      },
      {
        "path": "/standard-built-in-objects/reflection/proxy",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/proxy.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/proxy.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy",
              "heading": "proxy"
            },
            {
              "depth": 2,
              "value": "基本使用",
              "heading": "基本使用"
            },
            {
              "depth": 2,
              "value": "代理的引用上下文问题",
              "heading": "代理的引用上下文问题"
            },
            {
              "depth": 2,
              "value": "嵌套支持",
              "heading": "嵌套支持"
            },
            {
              "depth": 2,
              "value": "Proxy 与 Object.defineProperty",
              "heading": "proxy-与-objectdefineproperty"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 3,
              "value": "管道",
              "heading": "管道"
            },
            {
              "depth": 3,
              "value": "运算符重载",
              "heading": "运算符重载"
            },
            {
              "depth": 3,
              "value": "通过属性查找数组中的特定对象",
              "heading": "通过属性查找数组中的特定对象"
            },
            {
              "depth": 3,
              "value": "扩展构造函数",
              "heading": "扩展构造函数"
            },
            {
              "depth": 3,
              "value": "副作用",
              "heading": "副作用"
            },
            {
              "depth": 3,
              "value": "缓存",
              "heading": "缓存"
            },
            {
              "depth": 3,
              "value": "Cookie 对象",
              "heading": "cookie-对象"
            },
            {
              "depth": 3,
              "value": "日志和统计",
              "heading": "日志和统计"
            },
            {
              "depth": 3,
              "value": "动态代理",
              "heading": "动态代理"
            }
          ]
        },
        "title": "Proxy"
      },
      {
        "path": "/standard-built-in-objects/reflection/apply",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/apply.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/apply.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.apply",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.apply",
              "heading": "proxy---handlerapply"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "算术运算",
              "heading": "算术运算"
            }
          ]
        },
        "title": "Proxy - handler.apply"
      },
      {
        "path": "/standard-built-in-objects/reflection/construct",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/construct.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/construct.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.construct",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.construct",
              "heading": "proxy---handlerconstruct"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - handler.construct"
      },
      {
        "path": "/standard-built-in-objects/reflection/define-property",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/defineProperty.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/defineProperty.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.defineProperty",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.defineProperty",
              "heading": "proxy---handlerdefineproperty"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - handler.defineProperty"
      },
      {
        "path": "/standard-built-in-objects/reflection/delete-property",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/deleteProperty.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/deleteProperty.md",
          "updatedTime": 1610784862000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.deleteProperty",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.deleteProperty",
              "heading": "proxy---handlerdeleteproperty"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - handler.deleteProperty"
      },
      {
        "path": "/standard-built-in-objects/reflection/get",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/get.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/get.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.get",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.get",
              "heading": "proxy---handlerget"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "数组读取负数的索引",
              "heading": "数组读取负数的索引"
            },
            {
              "depth": 3,
              "value": "链式操作",
              "heading": "链式操作"
            },
            {
              "depth": 3,
              "value": "生成 DOM 节点",
              "heading": "生成-dom-节点"
            }
          ]
        },
        "title": "Proxy - handler.get"
      },
      {
        "path": "/standard-built-in-objects/reflection/get-own-property-descriptor",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/getOwnPropertyDescriptor.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/getOwnPropertyDescriptor.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.getOwnPropertyDescriptor",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.getOwnPropertyDescriptor",
              "heading": "proxy---handlergetownpropertydescriptor"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - handler.getOwnPropertyDescriptor"
      },
      {
        "path": "/standard-built-in-objects/reflection/get-prototype-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/getPrototypeOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/getPrototypeOf.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.getPrototypeOf",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.getPrototypeOf",
              "heading": "proxy---handlergetprototypeof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - handler.getPrototypeOf"
      },
      {
        "path": "/standard-built-in-objects/reflection/has",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/has.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/has.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.has",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.has",
              "heading": "proxy---handlerhas"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "隐藏某些属性不被发现",
              "heading": "隐藏某些属性不被发现"
            }
          ]
        },
        "title": "Proxy - handler.has"
      },
      {
        "path": "/standard-built-in-objects/reflection/is-extensible",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/isExtensible.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/isExtensible.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.isExtensions",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.isExtensions",
              "heading": "proxy---handlerisextensions"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - handler.isExtensions"
      },
      {
        "path": "/standard-built-in-objects/reflection/own-keys",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/ownKeys.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/ownKeys.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.ownKeys",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.ownKeys",
              "heading": "proxy---handlerownkeys"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "循环",
              "heading": "循环"
            }
          ]
        },
        "title": "Proxy - handler.ownKeys"
      },
      {
        "path": "/standard-built-in-objects/reflection/prevent-extensions",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/preventExtensions.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/preventExtensions.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.preventExtensions",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.preventExtensions",
              "heading": "proxy---handlerpreventextensions"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - handler.preventExtensions"
      },
      {
        "path": "/standard-built-in-objects/reflection/revocable",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/revocable.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/revocable.md",
          "updatedTime": 1591800323000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - revocable",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - revocable",
              "heading": "proxy---revocable"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - revocable"
      },
      {
        "path": "/standard-built-in-objects/reflection/set",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/set.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/set.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.set",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.set",
              "heading": "proxy---handlerset"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "返回值",
              "heading": "返回值"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "数据校验",
              "heading": "数据校验"
            },
            {
              "depth": 3,
              "value": "禁止读写内部属性",
              "heading": "禁止读写内部属性"
            }
          ]
        },
        "title": "Proxy - handler.set"
      },
      {
        "path": "/standard-built-in-objects/reflection/set-prototype-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/proxy/handler/setPrototypeOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/proxy/handler/setPrototypeOf.md",
          "updatedTime": 1637579539000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Proxy - handler.setPrototypeOf",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "Proxy - handler.setPrototypeOf",
              "heading": "proxy---handlersetprototypeof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "拦截",
              "heading": "拦截"
            },
            {
              "depth": 3,
              "value": "约束",
              "heading": "约束"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Proxy - handler.setPrototypeOf"
      },
      {
        "path": "/standard-built-in-objects/reflection/reflect",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/reflection/reflect/reflect.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/reflection/reflect/reflect.md",
          "updatedTime": 1591885410000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "Reflection",
            "path": "/standard-built-in-objects/reflection/",
            "order": 16
          },
          "title": "Reflect",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "Reflect",
              "heading": "reflect"
            },
            {
              "depth": 2,
              "value": "静态方法",
              "heading": "静态方法"
            },
            {
              "depth": 2,
              "value": "与传统方法的对比优势",
              "heading": "与传统方法的对比优势"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "观察者模式",
              "heading": "观察者模式"
            },
            {
              "depth": 3,
              "value": "获取设置反射属性",
              "heading": "获取设置反射属性"
            }
          ]
        },
        "title": "Reflect"
      },
      {
        "path": "/standard-built-in-objects/structured-data/array-buffer",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/structured-data/array-buffer/array-buffer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/structured-data/array-buffer/array-buffer.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "结构化数据",
            "path": "/standard-built-in-objects/structured-data/",
            "order": 14
          },
          "title": "ArrayBuffer",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "ArrayBuffer 对象",
              "heading": "arraybuffer-对象"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "静态属性和方法",
              "heading": "静态属性和方法"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "原型属性和方法",
              "heading": "原型属性和方法"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性-1"
            },
            {
              "depth": 3,
              "value": "方法",
              "heading": "方法-1"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "视图生成",
              "heading": "视图生成"
            },
            {
              "depth": 3,
              "value": "通过 TypeArray 对 ArrayBuffer 进行写操作",
              "heading": "通过-typearray-对-arraybuffer-进行写操作"
            },
            {
              "depth": 3,
              "value": "通过 DataView 对 ArrayBuffr 进行写操作",
              "heading": "通过-dataview-对-arraybuffr-进行写操作"
            }
          ]
        },
        "title": "ArrayBuffer"
      },
      {
        "path": "/standard-built-in-objects/structured-data/json-parse",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/structured-data/json/json-parse.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/structured-data/json/json-parse.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "结构化数据",
            "path": "/standard-built-in-objects/structured-data/",
            "order": 14
          },
          "title": "JSON.parse",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "JSON.parse()",
              "heading": "jsonparse"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "参数 reviver",
              "heading": "参数-reviver"
            },
            {
              "depth": 3,
              "value": "不允许以逗号作为结尾",
              "heading": "不允许以逗号作为结尾"
            }
          ]
        },
        "title": "JSON.parse"
      },
      {
        "path": "/standard-built-in-objects/structured-data/json-stringify",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/structured-data/json/json-stringify.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/structured-data/json/json-stringify.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "结构化数据",
            "path": "/standard-built-in-objects/structured-data/",
            "order": 14
          },
          "title": "JSON.stringify",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "JSON.stringify()",
              "heading": "jsonstringify"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "返回值",
              "heading": "返回值"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "replacer 参数",
              "heading": "replacer-参数"
            },
            {
              "depth": 4,
              "value": "例子（当参数为 Function）",
              "heading": "例子（当参数为-function）"
            },
            {
              "depth": 4,
              "value": "例子（当参数为 Array）",
              "heading": "例子（当参数为-array）"
            },
            {
              "depth": 3,
              "value": "space 参数",
              "heading": "space-参数"
            },
            {
              "depth": 3,
              "value": "toJSON 方法",
              "heading": "tojson-方法"
            }
          ]
        },
        "title": "JSON.stringify"
      },
      {
        "path": "/standard-built-in-objects/structured-data/json",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/structured-data/json/json.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/structured-data/json/json.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "结构化数据",
            "path": "/standard-built-in-objects/structured-data/",
            "order": 14
          },
          "title": "JSON",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "JSON",
              "heading": "json"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "JSON 键值对",
              "heading": "json-键值对"
            },
            {
              "depth": 3,
              "value": "JSON 对象",
              "heading": "json-对象"
            },
            {
              "depth": 3,
              "value": "JSON 数组",
              "heading": "json-数组"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            },
            {
              "depth": 2,
              "value": "JSON 文件",
              "heading": "json-文件"
            }
          ]
        },
        "title": "JSON"
      },
      {
        "path": "/standard-built-in-objects/text-processing/regexp/regexp-rule",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/regexp/regexp-rule.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/regexp/regexp-rule.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "RegExp",
            "path": "/standard-built-in-objects/text-processing/regexp/",
            "order": 10
          },
          "title": "RegExp 语法",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "RegExp 语法",
              "heading": "regexp-语法"
            },
            {
              "depth": 2,
              "value": "元字符",
              "heading": "元字符"
            },
            {
              "depth": 2,
              "value": "字符类别",
              "heading": "字符类别"
            },
            {
              "depth": 3,
              "value": "字符组简记",
              "heading": "字符组简记"
            },
            {
              "depth": 3,
              "value": "任意字符",
              "heading": "任意字符"
            },
            {
              "depth": 3,
              "value": "转义字符",
              "heading": "转义字符"
            },
            {
              "depth": 3,
              "value": "双重转义",
              "heading": "双重转义"
            },
            {
              "depth": 2,
              "value": "字符集合",
              "heading": "字符集合"
            },
            {
              "depth": 3,
              "value": "范围",
              "heading": "范围"
            },
            {
              "depth": 3,
              "value": "排除",
              "heading": "排除"
            },
            {
              "depth": 2,
              "value": "数量词",
              "heading": "数量词"
            },
            {
              "depth": 3,
              "value": "选择",
              "heading": "选择"
            },
            {
              "depth": 3,
              "value": "贪婪模式",
              "heading": "贪婪模式"
            },
            {
              "depth": 3,
              "value": "懒惰模式",
              "heading": "懒惰模式"
            },
            {
              "depth": 2,
              "value": "分组与反向引用",
              "heading": "分组与反向引用"
            },
            {
              "depth": 3,
              "value": "分组",
              "heading": "分组"
            },
            {
              "depth": 3,
              "value": "捕获",
              "heading": "捕获"
            },
            {
              "depth": 3,
              "value": "反向引用",
              "heading": "反向引用"
            },
            {
              "depth": 3,
              "value": "非捕获",
              "heading": "非捕获"
            },
            {
              "depth": 2,
              "value": "断言",
              "heading": "断言"
            },
            {
              "depth": 3,
              "value": "单词边界",
              "heading": "单词边界"
            },
            {
              "depth": 3,
              "value": "起始结束",
              "heading": "起始结束"
            },
            {
              "depth": 3,
              "value": "环视",
              "heading": "环视"
            },
            {
              "depth": 2,
              "value": "匹配模式",
              "heading": "匹配模式"
            },
            {
              "depth": 3,
              "value": "不区分大小写模式",
              "heading": "不区分大小写模式"
            },
            {
              "depth": 3,
              "value": "多行模式",
              "heading": "多行模式"
            },
            {
              "depth": 3,
              "value": "全局模式",
              "heading": "全局模式"
            },
            {
              "depth": 2,
              "value": "优先级",
              "heading": "优先级"
            },
            {
              "depth": 2,
              "value": "局限性",
              "heading": "局限性"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "RegExp 语法"
      },
      {
        "path": "/standard-built-in-objects/text-processing/regexp/regexp",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/regexp/regexp.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/regexp/regexp.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "RegExp",
            "path": "/standard-built-in-objects/text-processing/regexp/",
            "order": 10
          },
          "title": "RegExp",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "RegExp 对象",
              "heading": "regexp-对象"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "文本规则",
              "heading": "文本规则"
            },
            {
              "depth": 3,
              "value": "匹配模式",
              "heading": "匹配模式"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 3,
              "value": "原型属性",
              "heading": "原型属性"
            },
            {
              "depth": 3,
              "value": "原型方法",
              "heading": "原型方法"
            },
            {
              "depth": 2,
              "value": "构造函数",
              "heading": "构造函数"
            },
            {
              "depth": 3,
              "value": "属性",
              "heading": "属性"
            }
          ]
        },
        "title": "RegExp"
      },
      {
        "path": "/standard-built-in-objects/text-processing/regexp/exec",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/regexp/prototype/exec.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/regexp/prototype/exec.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "RegExp",
            "path": "/standard-built-in-objects/text-processing/regexp/",
            "order": 10
          },
          "title": "RegExp.prototype.exec",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "RegExp.prototype.exec()",
              "heading": "regexpprototypeexec"
            },
            {
              "depth": 2,
              "value": "语法　　",
              "heading": "语法"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 3,
              "value": "返回值",
              "heading": "返回值"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "RegExp.prototype.exec"
      },
      {
        "path": "/standard-built-in-objects/text-processing/regexp/test",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/regexp/prototype/test.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/regexp/prototype/test.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "RegExp",
            "path": "/standard-built-in-objects/text-processing/regexp/",
            "order": 10
          },
          "title": "RegExp.prototype.test",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "RegExp.prototype.test()",
              "heading": "regexpprototypetest"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "描述",
              "heading": "描述"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "当设置全局标志的正则使用 test()",
              "heading": "当设置全局标志的正则使用-test"
            }
          ]
        },
        "title": "RegExp.prototype.test"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/string",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/string.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/string.md",
          "updatedTime": 1591630810000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "String 对象",
              "heading": "string-对象"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 3,
              "value": "模板字面量",
              "heading": "模板字面量"
            },
            {
              "depth": 3,
              "value": "转义字符",
              "heading": "转义字符"
            },
            {
              "depth": 2,
              "value": "原型对象",
              "heading": "原型对象"
            },
            {
              "depth": 3,
              "value": "原型属性",
              "heading": "原型属性"
            },
            {
              "depth": 3,
              "value": "原型方法",
              "heading": "原型方法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "从字符串中获取单个字符",
              "heading": "从字符串中获取单个字符"
            },
            {
              "depth": 3,
              "value": "长字符串",
              "heading": "长字符串"
            }
          ]
        },
        "title": "String"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/char-at",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/charAt.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/charAt.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.charAt",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.charAt()",
              "heading": "stringprototypecharat"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.charAt"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/char-code-at",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/charCodeAt.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/charCodeAt.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.charCodeAt",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.charCodeAt()",
              "heading": "stringprototypecharcodeat"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.charCodeAt"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/code-point-at",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/codePointAt.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/codePointAt.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.codePointAt",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.codePointAt()",
              "heading": "stringprototypecodepointat"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.codePointAt"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/concat",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/concat.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/concat.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.concat",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.concat()",
              "heading": "stringprototypeconcat"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.concat"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/ends-with",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/endsWith.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/endsWith.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.endsWith",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.endsWith()",
              "heading": "stringprototypeendswith"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.endsWith"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/includes",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/includes.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/includes.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.includes",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.includes()",
              "heading": "stringprototypeincludes"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.includes"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/index-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/indexOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/indexOf.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.indexOf",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.indexOf()",
              "heading": "stringprototypeindexof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "区分大小写",
              "heading": "区分大小写"
            },
            {
              "depth": 3,
              "value": "统计字符串中字母数量",
              "heading": "统计字符串中字母数量"
            },
            {
              "depth": 3,
              "value": "检测字符是否存在",
              "heading": "检测字符是否存在"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.indexOf"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/last-index-of",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/lastIndexOf.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/lastIndexOf.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.lastIndexOf",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.lastIndexOf()",
              "heading": "stringprototypelastindexof"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "区分大小写",
              "heading": "区分大小写"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.lastIndexOf"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/locale-compare",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/localeCompare.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/localeCompare.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.localeCompare",
          "order": 18,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.localCompare()",
              "heading": "stringprototypelocalcompare"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "检查浏览器对扩展参数的支持",
              "heading": "检查浏览器对扩展参数的支持"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.localeCompare"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/match",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/match.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/match.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.match",
          "order": 19,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.match()",
              "heading": "stringprototypematch"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "全局模式和不区分大小写模式",
              "heading": "全局模式和不区分大小写模式"
            },
            {
              "depth": 3,
              "value": "不传参数",
              "heading": "不传参数"
            },
            {
              "depth": 3,
              "value": "判断是否是微信浏览器",
              "heading": "判断是否是微信浏览器"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.match"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/match-all",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/matchAll.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/matchAll.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.matchAll",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.matchAll()",
              "heading": "stringprototypematchall"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "获取字符串所有匹配项",
              "heading": "获取字符串所有匹配项"
            },
            {
              "depth": 3,
              "value": "捕获组的最佳途径",
              "heading": "捕获组的最佳途径"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.matchAll"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/normalize",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/normalize.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/normalize.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.normalize",
          "order": 22,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.normalize()",
              "heading": "stringprototypenormalize"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.normalize"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/pad-end",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/padEnd.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/padEnd.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.padEnd",
          "order": 23,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.padEnd()",
              "heading": "stringprototypepadend"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.padEnd"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/pad-start",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/padStart.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/padStart.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.padStart",
          "order": 24,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.padStart()",
              "heading": "stringprototypepadstart"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.padStart"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/repeat",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/repeat.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/repeat.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.repeat",
          "order": 25,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.repeat()",
              "heading": "stringprototyperepeat"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.repeat"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/replace",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/replace.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/replace.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.replace",
          "order": 26,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.replace()",
              "heading": "stringprototypereplace"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "全局模式和区分大小写模式",
              "heading": "全局模式和区分大小写模式"
            },
            {
              "depth": 3,
              "value": "单词互换",
              "heading": "单词互换"
            },
            {
              "depth": 3,
              "value": "使用行内函数来修改匹配到的字符",
              "heading": "使用行内函数来修改匹配到的字符"
            },
            {
              "depth": 3,
              "value": "将华氏温度转换为对等的摄氏温度",
              "heading": "将华氏温度转换为对等的摄氏温度"
            },
            {
              "depth": 3,
              "value": "转义用户输入特殊字符",
              "heading": "转义用户输入特殊字符"
            },
            {
              "depth": 3,
              "value": "转换驼峰命名",
              "heading": "转换驼峰命名"
            },
            {
              "depth": 3,
              "value": "数值千位隔断",
              "heading": "数值千位隔断"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.replace"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/replace-all",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/replaceAll.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/replaceAll.md",
          "updatedTime": 1648409393000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.replaceAll",
          "order": 27,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.replaceAll()",
              "heading": "stringprototypereplaceall"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.replaceAll"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/search",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/search.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/search.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.search",
          "order": 28,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.search()",
              "heading": "stringprototypesearch"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.search"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/slice",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/slice.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/slice.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.slice",
          "order": 29,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.slice()",
              "heading": "stringprototypeslice"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.slice"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/split",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/split.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/split.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.split",
          "order": 30,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.split()",
              "heading": "stringprototypesplit"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "移除字符串中的空格",
              "heading": "移除字符串中的空格"
            },
            {
              "depth": 3,
              "value": "限制返回值中分割元素数量",
              "heading": "限制返回值中分割元素数量"
            },
            {
              "depth": 3,
              "value": "捕获括号（Capturing parentheses）",
              "heading": "捕获括号（capturing-parentheses）"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.split"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/starts-with",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/startsWith.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/startsWith.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.startsWith",
          "order": 31,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.startsWith()",
              "heading": "stringprototypestartswith"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.startsWith"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/substr",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/substr.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/substr.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.substr",
          "order": 32,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.substr()",
              "heading": "stringprototypesubstr"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.substr"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/substring",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/substring.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/substring.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.substring",
          "order": 33,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.substring()",
              "heading": "stringprototypesubstring"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "运用 length 属性来使用 substring()",
              "heading": "运用-length-属性来使用-substring"
            },
            {
              "depth": 3,
              "value": "删除字符末尾子字符",
              "heading": "删除字符末尾子字符"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.substring"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/to-lower-case",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/toLowerCase.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/toLowerCase.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.toLowerCase",
          "order": 40,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.toLowerCase()",
              "heading": "stringprototypetolowercase"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.toLowerCase"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/to-upper-case",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/toUpperCase.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/toUpperCase.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.toUpperCase",
          "order": 41,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.toUpperCase()",
              "heading": "stringprototypetouppercase"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "方法说明",
              "heading": "方法说明"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.toUpperCase"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/trim",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/trim.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/trim.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.trim",
          "order": 42,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.trim()",
              "heading": "stringprototypetrim"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "兼容性代码",
              "heading": "兼容性代码"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.trim"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/trim-end",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/trimEnd.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/trimEnd.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.trimEnd",
          "order": 43,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.trimEnd()",
              "heading": "stringprototypetrimend"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.trimEnd"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/trim-start",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/prototype/trimStart.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/prototype/trimStart.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.prototype.trimStart",
          "order": 44,
          "slugs": [
            {
              "depth": 1,
              "value": "String.prototype.trimStart()",
              "heading": "stringprototypetrimstart"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.prototype.trimStart"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/from-char-code",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/static/fromCharCode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/static/fromCharCode.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.fromCharCode",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "String.fromCharCode",
              "heading": "stringfromcharcode"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "代码示例",
              "heading": "代码示例"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.fromCharCode"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/from-code-point",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/static/fromCodePoint.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/static/fromCodePoint.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.fromCodePoint",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "String.fromCodePoint",
              "heading": "stringfromcodepoint"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.fromCodePoint"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/raw",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/text-processing/string/static/raw.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/text-processing/string/static/raw.md",
          "updatedTime": 1648408463000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "String",
            "path": "/standard-built-in-objects/text-processing/string/",
            "order": 9
          },
          "title": "String.raw",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "String.raw",
              "heading": "stringraw"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "String.raw"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/decode-uri",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/decodeURI.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/decodeURI.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "decodeURI",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "decodeURI",
              "heading": "decodeuri"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "decodeURI"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/decode-uricomponent",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/decodeURIComponent.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/decodeURIComponent.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "decodeURIComponent",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "decodeURIComponent",
              "heading": "decodeuricomponent"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "decodeURIComponent"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/encode-uri",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/encodeURI.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/encodeURI.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "encodeURI",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "encodeURI",
              "heading": "encodeuri"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "encodeURI"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/encode-uricomponent",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/encodeURIComponent.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/encodeURIComponent.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "encodeURIComponent",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "encodeURIComponent",
              "heading": "encodeuricomponent"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "代码示例",
              "heading": "代码示例"
            }
          ]
        },
        "title": "encodeURIComponent"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/eval",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/eval.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/eval.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "eval",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "eval",
              "heading": "eval"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "eval"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/is-finite",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/isFinite.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/isFinite.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "isFinite",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "isFinite",
              "heading": "isfinite"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "isFinite"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/is-na-n",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/isNaN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/isNaN.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "isNaN",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "isNaN",
              "heading": "isnan"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "isNaN"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/parse-float",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/parseFloat.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/parseFloat.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "parseFloat",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "parseFloat",
              "heading": "parsefloat"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "parseFloat"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties/parse-int",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/function-properties/parseInt.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/function-properties/parseInt.md",
          "updatedTime": 1600510711000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 函数属性",
            "order": 3,
            "path": "/standard-built-in-objects/the-global-object/function-properties"
          },
          "title": "parseInt",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "parseInt",
              "heading": "parseint"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "parseInt"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/value-properties/na-n",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/value-properties/NaN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/value-properties/NaN.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 值属性",
            "order": 2,
            "path": "/standard-built-in-objects/the-global-object/value-properties"
          },
          "title": "NaN",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "NaN",
              "heading": "nan"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 3,
              "value": "值校验",
              "heading": "值校验"
            }
          ]
        },
        "title": "NaN"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/value-properties/infinity",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/value-properties/infinity.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/value-properties/infinity.md",
          "updatedTime": 1633898450000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 值属性",
            "order": 2,
            "path": "/standard-built-in-objects/the-global-object/value-properties"
          },
          "title": "Infinity",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Infinity",
              "heading": "infinity"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            }
          ]
        },
        "title": "Infinity"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/value-properties/undefined",
        "component": require('/Users/mrsingsing/mrsingsing/JavaScript-GuideBook/docs/standard-built-in-objects/the-global-object/value-properties/undefined.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/standard-built-in-objects/the-global-object/value-properties/undefined.md",
          "updatedTime": 1593014419000,
          "nav": {
            "title": "内置对象",
            "order": 2,
            "path": "/standard-built-in-objects"
          },
          "group": {
            "title": "全局对象 - 值属性",
            "order": 2,
            "path": "/standard-built-in-objects/the-global-object/value-properties"
          },
          "title": "undefined",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "undefined",
              "heading": "undefined"
            },
            {
              "depth": 2,
              "value": "说明",
              "heading": "说明"
            }
          ]
        },
        "title": "undefined"
      },
      {
        "path": "/basic-concept/data-types",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/basic-concept/data-types/data-types"
      },
      {
        "path": "/basic-concept/expressions/expressions",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/basic-concept/expressions/expressions/literal"
      },
      {
        "path": "/basic-concept/expressions/operators",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/basic-concept/expressions/operators/in"
      },
      {
        "path": "/basic-concept/lexical-grammar",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/basic-concept/lexical-grammar/lexical-grammar"
      },
      {
        "path": "/basic-concept/statements-and-declarations",
        "meta": {
          "order": 7
        },
        "exact": true,
        "redirect": "/basic-concept/statements-and-declarations/block"
      },
      {
        "path": "/browser-object-model/binary-data-and-files",
        "meta": {
          "order": 10
        },
        "exact": true,
        "redirect": "/browser-object-model/binary-data-and-files/application"
      },
      {
        "path": "/browser-object-model/browser-working-principle",
        "meta": {
          "order": 20
        },
        "exact": true,
        "redirect": "/browser-object-model/browser-working-principle/browser-architecture"
      },
      {
        "path": "/browser-object-model/connectivity",
        "meta": {
          "order": 11
        },
        "exact": true,
        "redirect": "/browser-object-model/connectivity/post-message"
      },
      {
        "path": "/browser-object-model/device",
        "meta": {
          "order": 15
        },
        "exact": true,
        "redirect": "/browser-object-model/device/geolocation"
      },
      {
        "path": "/browser-object-model/integration",
        "meta": {
          "order": 16
        },
        "exact": true,
        "redirect": "/browser-object-model/integration/full-screen"
      },
      {
        "path": "/browser-object-model/observer",
        "meta": {
          "order": 16
        },
        "exact": true,
        "redirect": "/browser-object-model/observer/intersection-observer"
      },
      {
        "path": "/browser-object-model/offline-and-storage",
        "meta": {
          "order": 12
        },
        "exact": true,
        "redirect": "/browser-object-model/offline-and-storage/browser-cache"
      },
      {
        "path": "/browser-object-model/performance",
        "meta": {
          "order": 13
        },
        "exact": true,
        "redirect": "/browser-object-model/performance/performance"
      },
      {
        "path": "/browser-object-model/web-event",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/browser-object-model/web-event/set-time-out"
      },
      {
        "path": "/browser-object-model/window",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/browser-object-model/window/window"
      },
      {
        "path": "/browser-object-model/window-position",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/browser-object-model/window-position/window-view-properties"
      },
      {
        "path": "/computer-networks/computer-network-architecture",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/computer-networks/computer-network-architecture/computer-networks"
      },
      {
        "path": "/computer-networks/http",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/computer-networks/http/http"
      },
      {
        "path": "/computer-networks/web-security",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/computer-networks/web-security/same-origin-policy"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-arguments",
        "meta": {
          "order": 7
        },
        "exact": true,
        "redirect": "/core-modules/ecmascript-function-objects/function-arguments/function-parameters"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-calls",
        "meta": {
          "order": 8
        },
        "exact": true,
        "redirect": "/core-modules/ecmascript-function-objects/function-calls/method-invocation-pattern"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-declarations",
        "meta": {
          "order": 6
        },
        "exact": true,
        "redirect": "/core-modules/ecmascript-function-objects/function-declarations/function-definitions"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-internal",
        "meta": {
          "order": 9
        },
        "exact": true,
        "redirect": "/core-modules/ecmascript-function-objects/function-internal/function-accessor"
      },
      {
        "path": "/core-modules/ecmascript-function-objects/function-types",
        "meta": {
          "order": 10
        },
        "exact": true,
        "redirect": "/core-modules/ecmascript-function-objects/function-types/structure-function"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/compilation",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/core-modules/executable-code-and-execution-contexts/compilation/compilation"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/concurrency-model",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/core-modules/executable-code-and-execution-contexts/concurrency-model/concurrency-model"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/execution",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/core-modules/executable-code-and-execution-contexts/execution/execution-context-stack"
      },
      {
        "path": "/core-modules/executable-code-and-execution-contexts/memory-management",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/core-modules/executable-code-and-execution-contexts/memory-management/memory-model"
      },
      {
        "path": "/core-modules/modularization",
        "meta": {
          "order": 11
        },
        "exact": true,
        "redirect": "/core-modules/modularization/modularization"
      },
      {
        "path": "/design-patterns/architectural",
        "meta": {},
        "exact": true,
        "redirect": "/design-patterns/architectural/dependency-injection"
      },
      {
        "path": "/design-patterns/behavioral",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/design-patterns/behavioral/chain-of-responsibility"
      },
      {
        "path": "/design-patterns/creational",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/design-patterns/creational/factory-method"
      },
      {
        "path": "/design-patterns/structual",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/design-patterns/structual/adapter"
      },
      {
        "path": "/document-object-model/cssom",
        "meta": {
          "order": 7
        },
        "exact": true,
        "redirect": "/document-object-model/cssom/css-style-sheet"
      },
      {
        "path": "/document-object-model/document",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/document-object-model/document/document"
      },
      {
        "path": "/document-object-model/dom",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/document-object-model/dom/dom"
      },
      {
        "path": "/document-object-model/dynamic-collection",
        "meta": {
          "order": 7
        },
        "exact": true,
        "redirect": "/document-object-model/dynamic-collection/node-list"
      },
      {
        "path": "/document-object-model/element",
        "meta": {
          "order": 6
        },
        "exact": true,
        "redirect": "/document-object-model/element/element"
      },
      {
        "path": "/document-object-model/events",
        "meta": {
          "order": 20
        },
        "exact": true,
        "redirect": "/document-object-model/events/event-flow"
      },
      {
        "path": "/document-object-model/events/event-types",
        "meta": {
          "order": 21
        },
        "exact": true,
        "redirect": "/document-object-model/events/event-types/event-types"
      },
      {
        "path": "/document-object-model/multimedia",
        "meta": {},
        "exact": true,
        "redirect": "/document-object-model/multimedia/audio-buffer"
      },
      {
        "path": "/document-object-model/node",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/document-object-model/node/node"
      },
      {
        "path": "/object-oriented-programming/class-definitions",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/object-oriented-programming/class-definitions/class-basic"
      },
      {
        "path": "/object-oriented-programming/inheritance",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/object-oriented-programming/inheritance/prototype-chain"
      },
      {
        "path": "/object-oriented-programming/object-creation",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/object-oriented-programming/object-creation/the-factory-pattern"
      },
      {
        "path": "/object-oriented-programming/object-understand",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/object-oriented-programming/object-understand/the-object-type"
      },
      {
        "path": "/standard-built-in-objects/control-abstraction-objects/",
        "meta": {
          "order": 15
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/control-abstraction-objects/iterator"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects",
        "meta": {
          "order": 7
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/fundamental-objects/boolean"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/function",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/fundamental-objects/function/function"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/object",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/fundamental-objects/object/object"
      },
      {
        "path": "/standard-built-in-objects/fundamental-objects/symbol",
        "meta": {
          "order": 6
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/fundamental-objects/symbol/symbol"
      },
      {
        "path": "/standard-built-in-objects/indexed-collections/array/",
        "meta": {
          "order": 11
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/indexed-collections/array/array"
      },
      {
        "path": "/standard-built-in-objects/keyed-collections/",
        "meta": {
          "order": 13
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/keyed-collections/map"
      },
      {
        "path": "/standard-built-in-objects/numbers-and-dates/",
        "meta": {
          "order": 8
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/numbers-and-dates/date"
      },
      {
        "path": "/standard-built-in-objects/reflection/",
        "meta": {
          "order": 16
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/reflection/proxy"
      },
      {
        "path": "/standard-built-in-objects/structured-data/",
        "meta": {
          "order": 14
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/structured-data/array-buffer"
      },
      {
        "path": "/standard-built-in-objects/text-processing/regexp/",
        "meta": {
          "order": 10
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/text-processing/regexp/regexp"
      },
      {
        "path": "/standard-built-in-objects/text-processing/string/",
        "meta": {
          "order": 9
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/text-processing/string/string"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/function-properties",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/the-global-object/function-properties/eval"
      },
      {
        "path": "/standard-built-in-objects/the-global-object/value-properties",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/standard-built-in-objects/the-global-object/value-properties/infinity"
      }
    ],
    "title": "JavaScript Guidebook",
    "component": (props) => props.children
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

// origin require module
// https://github.com/webpack/webpack/issues/4175#issuecomment-342931035
const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

/**
 * server render function
 * @param params
 */
const render: IServerRender = async (params) => {
  let error;
  const {
    origin = '',
    path,
    htmlTemplate = '',
    mountElementId = 'root',
    context = {},
    mode = 'string',
    basename = '/javascript-guidebook/',
    staticMarkup = false,
    forceInitial = false,
    getInitialPropsCtx,
  } = params;
  let manifest = params.manifest;
  const env = 'production';

  let html = htmlTemplate || "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta\n      name=\"viewport\"\n      content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\"\n    />\n    <link rel=\"shortcut icon\" type=\"image/x-icon\" href=\"./favicon.ico\" />\n    <link rel=\"stylesheet\" href=\"/javascript-guidebook/umi.css\" />\n    <script>\n      window.routerBase = \"/javascript-guidebook/\";\n    </script>\n    <script>\n      //! umi version: 3.1.4\n    </script>\n    <script>\n      !(function () {\n        var e = localStorage.getItem(\"dumi:prefers-color\"),\n          t = window.matchMedia(\"(prefers-color-scheme: dark)\").matches,\n          r = [\"light\", \"dark\", \"auto\"];\n        document.documentElement.setAttribute(\n          \"data-prefers-color\",\n          e === r[2] ? (t ? r[1] : r[0]) : r.includes(e) ? e : r[0]\n        );\n      })();\n    </script>\n    <title>JavaScript Guidebook</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n\n    <script src=\"/javascript-guidebook/umi.js\"></script>\n  </body>\n</html>\n";
  let rootContainer = '';
  try {
    // handle basename
    const location = stripBasename(basename, `${origin}${path}`);
    const { pathname } = location;
    // server history
    const history = createMemoryHistory({
      initialEntries: [format(location)],
    });
    // for renderServer
    const opts = {
      path,
      history,
      pathname,
      getInitialPropsCtx,
      basename,
      context,
      mode,
      plugin,
      staticMarkup,
      routes,
      isServer: process.env.__IS_SERVER,
    }
    const dynamicImport =  false;
    if (dynamicImport && !manifest) {
      try {
        // prerender not work because the manifest generation behind of the prerender
        manifest = requireFunc(`./`);
      } catch (_) {}
    }

    // beforeRenderServer hook, for polyfill global.*
    await plugin.applyPlugins({
      key: 'ssr.beforeRenderServer',
      type: ApplyPluginsType.event,
      args: {
        env,
        path,
        context,
        history,
        mode,
        location,
      },
      async: true,
    });

    // renderServer get rootContainer
    const { pageHTML, pageInitialProps, routesMatched } = await renderServer(opts);
    rootContainer = pageHTML;
    if (html) {
      // plugin for modify html template
      html = await plugin.applyPlugins({
        key: 'ssr.modifyServerHTML',
        type: ApplyPluginsType.modify,
        initialValue: html,
        args: {
          context,
          cheerio,
          routesMatched,
          dynamicImport,
          manifest
        },
        async: true,
      });
      html = await handleHTML({ html, rootContainer, pageInitialProps, mountElementId, mode, forceInitial, routesMatched, dynamicImport, manifest });
    }
  } catch (e) {
    // downgrade into csr
    error = e;
  }
  return {
    rootContainer,
    error,
    html,
  }
}

export default render;
