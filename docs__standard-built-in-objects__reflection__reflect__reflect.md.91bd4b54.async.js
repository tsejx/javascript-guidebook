(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[367],{KHv7:function(e,t,l){"use strict";l.r(t);var n=l("q1tI"),a=l.n(n),r=(l("B2uJ"),l("+su7"),l("qOys")),c=l.n(r);l("5Yjd");t["default"]=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("h1",{id:"reflect"},a.a.createElement("a",{"aria-hidden":"true",href:"#reflect"},a.a.createElement("span",{className:"icon icon-link"})),"Reflect"),a.a.createElement("p",null,"Reflect \u662f\u4e00\u4e2a\u5185\u7f6e\u7684\u5bf9\u8c61\uff0c\u5b83\u63d0\u4f9b\u62e6\u622a JavaScript \u64cd\u4f5c\u7684\u65b9\u6cd5\u3002\u8fd9\u4e9b\u65b9\u6cd5\u4e0e\u5904\u7406\u5668\u5bf9\u8c61\u7684\u65b9\u6cd5\u76f8\u540c\u3002Reflect \u4e0d\u662f\u4e00\u4e2a\u51fd\u6570\u5bf9\u8c61\uff0c\u56e0\u6b64\u5b83\u4e0d\u662f\u4e0d\u53ef\u6784\u9020\u7684\u3002"),a.a.createElement("p",null,"\u8bbe\u8ba1\u76ee\u7684\uff1a"),a.a.createElement("ol",null,a.a.createElement("li",null,a.a.createElement("p",null,"\u5c06 Object \u5bf9\u8c61\u7684\u4e00\u4e9b\u660e\u663e\u5c5e\u4e8e\u8bed\u8a00\u5185\u90e8\u7684\u65b9\u6cd5\uff08\u6bd4\u5982 ",a.a.createElement("code",null,"Object.defineProperty"),"\uff09\uff0c\u653e\u5230 Reflect \u5bf9\u8c61\u4e0a\u3002\u73b0\u9636\u6bb5\uff0c\u67d0\u4e9b\u65b9\u6cd5\u540c\u65f6\u5728 Object \u548c Reflect \u5bf9\u8c61\u4e0a\u90e8\u7f72\uff0c\u672a\u6765\u7684\u65b0\u65b9\u6cd5\u5c06\u53ea\u90e8\u7f72\u5728 Reflect \u5bf9\u8c61\u4e0a\u3002\u4e5f\u5c31\u662f\u8bf4\uff0c\u4ece Reflect \u5bf9\u8c61\u4e0a\u53ef\u4ee5\u62ff\u5230\u8bed\u8a00\u5185\u90e8\u7684\u65b9\u6cd5\u3002")),a.a.createElement("li",null,a.a.createElement("p",null,"\u4fee\u6539\u67d0\u4e9b Object \u65b9\u6cd5\u7684\u8fd4\u56de\u7ed3\u679c\uff0c\u8ba9\u5176\u53d8\u5f97\u66f4\u5408\u7406\u3002\u6bd4\u5982\uff0c",a.a.createElement("code",null,"Object.defineProperty(obj, name, desc)")," \u5728\u65e0\u6cd5\u5b9a\u4e49\u5c5e\u6027\u65f6\uff0c\u4f1a\u629b\u51fa\u4e00\u4e2a\u9519\u8bef\uff0c\u800c ",a.a.createElement("code",null,"Reflect.defineProperty(obj, name, desc)")," \u5219\u4f1a\u8fd4\u56de ",a.a.createElement("code",null,"false"),"\u3002")),a.a.createElement("li",null,a.a.createElement("p",null,"\u8ba9 Object \u7684 ",a.a.createElement("strong",null,"\u547d\u4ee4\u5f0f\u64cd\u4f5c")," \u90fd\u53d8\u6210 ",a.a.createElement("strong",null,"\u51fd\u6570\u884c\u4e3a"),"\u3002\u6bd4\u5982 ",a.a.createElement("code",null,"name in obj")," \u548c ",a.a.createElement("code",null,"delete obj[name]"),"\uff0c\u800c ",a.a.createElement("code",null,"Relfect.has(obj, name)")," \u548c ",a.a.createElement("code",null,"Reflect.deleteProperty(obj, name)")," \u8ba9\u5b83\u4eec\u53d8\u6210\u4e86\u51fd\u6570\u884c\u4e3a")),a.a.createElement("li",null,a.a.createElement("p",null,"Reflect \u5bf9\u8c61\u7684\u65b9\u6cd5\u4e0e Proxy \u5bf9\u8c61\u7684\u65b9\u6cd5\u4e00\u4e00\u5bf9\u5e94\uff0c\u53ea\u8981\u662f Proxy \u5bf9\u8c61\u7684\u65b9\u6cd5\uff0c\u5c31\u80fd\u5728 Reflect \u5bf9\u8c61\u4e0a\u627e\u5230\u5bf9\u5e94\u7684\u65b9\u6cd5\u3002\u8fd9\u5c31\u8ba9 Proxy \u5bf9\u8c61\u53ef\u4ee5\u65b9\u4fbf\u5730\u8c03\u7528\u5bf9\u5e94\u7684 Reflect \u65b9\u6cd5\uff0c\u5b8c\u6210\u9ed8\u8ba4\u884c\u4e3a\uff0c\u4f5c\u4e3a\u4fee\u6539\u884c\u4e3a\u7684\u57fa\u7840\u3002\u4e5f\u5c31\u662f\u8bf4\uff0c\u4e0d\u7ba1 Proxy \u600e\u4e48\u4fee\u6539\u9ed8\u8ba4\u884c\u4e3a\uff0c\u4f60\u603b\u53ef\u4ee5\u5728 Reflect \u4e0a\u83b7\u53d6\u9ed8\u8ba4\u884c\u4e3a\u3002"))),a.a.createElement(c.a,{code:"Proxy(target, {\n  set: function(target, name, value, receiver) {\n    const success = Reflect.set(target, name, value, receiver);\n\n    if (success) {\n      console.log('property ' + name + ' on ' + target + ' set to ' + value);\n    }\n\n    return successs;\n  },\n});\n",lang:"js"}),a.a.createElement("p",null,"\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0cProxy \u65b9\u6cd5\u62e6\u622a ",a.a.createElement("code",null,"target")," \u5bf9\u8c61\u7684\u5c5e\u6027\u8d4b\u503c\u884c\u4e3a\u3002\u5b83\u91c7\u7528 ",a.a.createElement("code",null,"Reflect.set")," \u65b9\u6cd5\u5c06\u503c\u8d4b\u503c\u7ed9\u5bf9\u8c61\u7684\u5c5e\u6027\uff0c\u786e\u4fdd\u5b8c\u6210\u539f\u6709\u7684\u884c\u4e3a\uff0c\u7136\u540e\u518d\u90e8\u7f72\u989d\u5916\u7684\u529f\u80fd\u3002"),a.a.createElement(c.a,{code:"const proxy = new Proxy(obj, {\n  get(target, name) {\n    console.log('get', target, name);\n    return Reflect.get(target, name);\n  },\n  deleteProperty(target, name) {\n    console.log('delete' + name);\n    return Reflect.deleteProperty(target, name);\n  },\n  has(target, name) {\n    console.log('has' + name);\n    return Reflect.has(target, name);\n  },\n});\n",lang:"js"}),a.a.createElement("p",null,"\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c\u6bcf\u4e00\u4e2a Proxy \u5bf9\u8c61\u7684\u62e6\u622a\u64cd\u4f5c\uff08",a.a.createElement("code",null,"get"),"\u3001",a.a.createElement("code",null,"delete"),"\u3001",a.a.createElement("code",null,"has"),"\uff09\uff0c\u5185\u90e8\u90fd\u8c03\u7528\u5bf9\u5e94\u7684 Reflect \u65b9\u6cd5\uff0c\u4fdd\u8bc1\u539f\u751f\u884c\u4e3a\u80fd\u591f\u6b63\u5e38\u6267\u884c\u3002\u6dfb\u52a0\u7684\u5de5\u4f5c\uff0c\u5c31\u662f\u5c06\u6bcf\u4e00\u4e2a\u64cd\u4f5c\u8f93\u51fa\u4e00\u884c\u65e5\u5fd7\u3002"),a.a.createElement("p",null,"\u6709\u4e86 Reflect \u5bf9\u8c61\u4ee5\u540e\uff0c\u5f88\u591a\u64cd\u4f5c\u4f1a\u66f4\u6613\u8bfb\u3002"),a.a.createElement(c.a,{code:"// \u8001\u5199\u6cd5\nFunction.prototype.apply.call(Math.floor, undefined, [1.75]);\n// 1\n\n// \u65b0\u5199\u6cd5\nReflect.apply(Math.floor, undefined, [1.75]);\n// 1\n",lang:"js"}),a.a.createElement("p",null,"\u4e0e\u5927\u591a\u6570\u5168\u5c40\u5bf9\u8c61\u4e0d\u540c\uff0cReflect \u6ca1\u6709\u6784\u9020\u51fd\u6570\uff0c\u4f60\u4e0d\u80fd\u5c06\u5176\u4e0e\u4e00\u4e2a ",a.a.createElement("code",null,"new")," \u8fd0\u7b97\u7b26\u4e00\u8d77\u4f7f\u7528\uff0c\u6216\u8005 Reflect \u5bf9\u8c61\u4f5c\u4e3a\u4e00\u4e2a\u51fd\u6570\u6765\u8c03\u7528\u3002Reflect \u7684\u6240\u6709\u5c5e\u6027\u548c\u65b9\u6cd5\u90fd\u662f\u9759\u6001\u7684\uff08\u5c31\u50cf Math \u5bf9\u8c61\uff09\u3002"),a.a.createElement("h2",{id:"\u9759\u6001\u65b9\u6cd5"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u9759\u6001\u65b9\u6cd5"},a.a.createElement("span",{className:"icon icon-link"})),"\u9759\u6001\u65b9\u6cd5"),a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u9759\u6001\u65b9\u6cd5"),a.a.createElement("th",null,"\u8bf4\u660e"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.apply")),a.a.createElement("td",null,"\u5bf9\u51fd\u6570\u8fdb\u884c\u8c03\u7528\u64cd\u4f5c\uff0c\u540c\u65f6\u4f20\u5165\u4e00\u4e2a\u6570\u7ec4\u4f5c\u4e3a\u8c03\u7528\u53c2\u6570\uff0c\u4e0e ",a.a.createElement("code",null,"Function.prototype.apply")," \u529f\u80fd\u7c7b\u4f3c")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.construct")),a.a.createElement("td",null,"\u5bf9\u6784\u9020\u51fd\u6570\u8fdb\u884c ",a.a.createElement("code",null,"new")," \u64cd\u4f5c\uff0c\u76f8\u5f53\u4e8e\u6267\u884c ",a.a.createElement("code",null,"new target(...args)"))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.defineProperty")),a.a.createElement("td",null,"\u548c ",a.a.createElement("code",null,"Object.defineProperty")," \u7c7b\u4f3c")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.deleteProperty")),a.a.createElement("td",null,"\u4f5c\u4e3a\u51fd\u6570\u7684 ",a.a.createElement("code",null,"delete")," \u64cd\u4f5c\u7b26\uff0c\u76f8\u5f53\u4e8e\u6267\u884c ",a.a.createElement("code",null,"delete target[name]"))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.get")),a.a.createElement("td",null,"\u83b7\u53d6\u5bf9\u8c61\u5c5e\u6027\u503c")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.getOwnPropertyDescriptor")),a.a.createElement("td",null,"\u7c7b\u4f3c\u4e8e ",a.a.createElement("code",null,"Object.getOwnPropertyDescriptor"))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.getPrototypeOf")),a.a.createElement("td",null,"\u7c7b\u4f3c\u4e8e ",a.a.createElement("code",null,"Object.getPrototypeOf"))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.has")),a.a.createElement("td",null,"\u5224\u65ad\u5bf9\u8c61\u662f\u5426\u5b58\u5728\u67d0\u4e2a\u5c5e\u6027\uff0c\u548c ",a.a.createElement("code",null,"in")," \u8fd0\u7b97\u7b26\u7684\u529f\u80fd\u5b8c\u5168\u76f8\u540c")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.isExtensible")),a.a.createElement("td",null,"\u7c7b\u4f3c\u4e8e ",a.a.createElement("code",null,"Object.isExtensible"))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.ownKeys")),a.a.createElement("td",null,"\u8fd4\u56de\u4e00\u4e2a\u5305\u542b\u6240\u6709\u81ea\u8eab\u5c5e\u6027\uff08\u4e0d\u5305\u542b\u7ee7\u627f\u5c5e\u6027\uff09\u7684\u6570\u7ec4")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.preventExtensions")),a.a.createElement("td",null,"\u7c7b\u4f3c\u4e8e ",a.a.createElement("code",null,"Object.preventExtensions"))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.set")),a.a.createElement("td",null,"\u5c06\u503c\u5206\u914d\u7ed9\u5c5e\u6027\u7684\u51fd\u6570\uff0c\u8fd4\u56de Boolean\uff0c\u5982\u679c\u6210\u529f\uff0c\u5219\u8fd4\u56de ",a.a.createElement("code",null,"true"))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"Reflect.setPrototypeOf")),a.a.createElement("td",null,"\u7c7b\u4f3c\u4e8e ",a.a.createElement("code",null,"Object.setPrototyeOf"))))),a.a.createElement("h2",{id:"\u4e0e\u4f20\u7edf\u65b9\u6cd5\u7684\u5bf9\u6bd4\u4f18\u52bf"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u4e0e\u4f20\u7edf\u65b9\u6cd5\u7684\u5bf9\u6bd4\u4f18\u52bf"},a.a.createElement("span",{className:"icon icon-link"})),"\u4e0e\u4f20\u7edf\u65b9\u6cd5\u7684\u5bf9\u6bd4\u4f18\u52bf"),a.a.createElement("p",null,"Reflect \u64cd\u4f5c\u5bf9\u8c61\u66f4\u52a0\u7b26\u5408\u9762\u5411\u5bf9\u8c61\uff0c\u64cd\u4f5c\u5bf9\u8c61\u7684\u65b9\u6cd5\u5168\u90e8\u90fd\u6302\u5728 Reflect\u3002"),a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null),a.a.createElement("th",null,"Reflect \u64cd\u4f5c\u5bf9\u8c61"),a.a.createElement("th",null,"\u8001\u65b9\u6cd5\u64cd\u4f5c\u5bf9\u8c61"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"\u9762\u5411\u5bf9\u8c61"),a.a.createElement("td",null,"\u5168\u90e8\u6302\u5728 ",a.a.createElement("code",null,"Reflect")," \u5bf9\u8c61\u4e0a\uff0c\u66f4\u52a0\u7b26\u5408\u9762\u5411\u5bf9\u8c61"),a.a.createElement("td",null,"\u5404\u79cd\u6307\u4ee4\u65b9\u6cd5\uff0c",a.a.createElement("code",null,"="),"\u3001",a.a.createElement("code",null,"in"),"\u3001",a.a.createElement("code",null,"delete"))),a.a.createElement("tr",null,a.a.createElement("td",null,"\u51fd\u6570\u5f0f"),a.a.createElement("td",null,"\u6240\u6709\u65b9\u6cd5\u90fd\u662f\u51fd\u6570"),a.a.createElement("td",null,"\u547d\u4ee4\u5f0f\u3001\u8d4b\u503c\u3001\u51fd\u6570\u6df7\u7528")),a.a.createElement("tr",null,a.a.createElement("td",null,"\u89c4\u8303\u62a5\u9519"),a.a.createElement("td",null,a.a.createElement("code",null,"defineProperty")," \u65e0\u6548\u8fd4\u56de ",a.a.createElement("code",null,"false"),"\uff0c\u540e\u9762\u51e0\u4e2a\u65b9\u6cd5\u53c2\u6570\u975e\u6cd5\u62a5\u9519"),a.a.createElement("td",null,a.a.createElement("code",null,"defineProperty")," \u65e0\u6548\u62a5\u9519\uff0c\u540e\u9762\u51e0\u4e2a\u65b9\u6cd5\u53c2\u6570\u975e\u6cd5\u4e0d\u62a5\u9519")),a.a.createElement("tr",null,a.a.createElement("td",null,"\u65b9\u6cd5\u6269\u5c55"),a.a.createElement("td",null,"\u53c2\u6570 ",a.a.createElement("code",null,"receiver")," \u6307\u5b9a ",a.a.createElement("code",null,"this")," \u6307\u5411"),a.a.createElement("td",null,"\u4e0d\u80fd")))),a.a.createElement("h2",{id:"\u793a\u4f8b"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u793a\u4f8b"},a.a.createElement("span",{className:"icon icon-link"})),"\u793a\u4f8b"),a.a.createElement("h3",{id:"\u89c2\u5bdf\u8005\u6a21\u5f0f"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u89c2\u5bdf\u8005\u6a21\u5f0f"},a.a.createElement("span",{className:"icon icon-link"})),"\u89c2\u5bdf\u8005\u6a21\u5f0f"),a.a.createElement("p",null,"\u89c2\u5bdf\u8005\u6a21\u5f0f\uff08Observer mode\uff09\u6307\u7684\u662f\u51fd\u6570\u81ea\u52a8\u89c2\u5bdf\u6570\u636e\u5bf9\u8c61\uff0c\u4e00\u65e6\u5bf9\u8c61\u6709\u53d8\u5316\uff0c\u51fd\u6570\u5c31\u4f1a\u81ea\u52a8\u6267\u884c\u3002"),a.a.createElement(c.a,{code:"const person = observerable({\n  name: 'Zhange San',\n  age: 47,\n});\n\nfunction print() {\n  console.log(`${person.name}, ${person.age}`);\n}\n\nobserve(print);\n\nperson.name = 'Li Si';\n// Li Si, 47\n",lang:"js"}),a.a.createElement("p",null,"\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c\u6570\u636e\u5bf9\u8c61 ",a.a.createElement("code",null,"person")," \u662f\u89c2\u5bdf\u76ee\u6807\uff0c\u51fd\u6570 ",a.a.createElement("code",null,"print")," \u662f\u89c2\u5bdf\u8005\u3002\u4e00\u65e6\u6570\u636e\u5bf9\u8c61\u53d1\u751f\u53d8\u5316\uff0c",a.a.createElement("code",null,"print")," \u5c31\u4f1a\u81ea\u52a8\u6267\u884c\u3002"),a.a.createElement("p",null,"\u4e0b\u9762\uff0c\u4f7f\u7528 Proxy \u5199\u4e00\u4e2a\u89c2\u5bdf\u8005\u6a21\u5f0f\u7684\u6700\u7b80\u5355\u5b9e\u73b0\uff0c\u5373\u5b9e\u73b0 ",a.a.createElement("code",null,"observeable")," \u548c ",a.a.createElement("code",null,"observe")," \u8fd9\u4e24\u4e2a\u51fd\u6570\u3002\u601d\u8def\u662f ",a.a.createElement("code",null,"observable")," \u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u539f\u59cb\u5bf9\u8c61\u7684 Proxy \u5bf9\u8c61\uff0c\u62e6\u622a\u8d4b\u503c\u64cd\u4f5c\uff0c\u89e6\u53d1\u5145\u5f53\u89c2\u5bdf\u8005\u7684\u5404\u4e2a\u51fd\u6570\u3002"),a.a.createElement(c.a,{code:"const queuedObservers = new Set();\n\nconst observe = fn => queuedObservers.add(fn);\n\nconst observable = obj => new Proxy(obj, { set });\n\nfunction set(target, key, value, receiver) {\n  const result = Reflect.set(target, key, value, receiver);\n\n  queuedObservers.forEach(observer => observer());\n\n  return result;\n}\n",lang:"js"}),a.a.createElement("h3",{id:"\u83b7\u53d6\u8bbe\u7f6e\u53cd\u5c04\u5c5e\u6027"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u83b7\u53d6\u8bbe\u7f6e\u53cd\u5c04\u5c5e\u6027"},a.a.createElement("span",{className:"icon icon-link"})),"\u83b7\u53d6\u8bbe\u7f6e\u53cd\u5c04\u5c5e\u6027"),a.a.createElement(c.a,{code:"const Ironman = {\n  firstName: 'Tony',\n  lastName: 'Stark',\n  get fullName() {\n    return `${this.firstName} ${this.lastName}`;\n  },\n};\n\n// \u83b7\u53d6\u81ea\u8eab\u5c5e\u6027\uff0c\u65b0\u8001\u65b9\u6cd5\u90fd\u53ef\u4ee5\u5b9e\u73b0\nReflect.get(Ironman, 'firstName');\n// Tony\nReflect.get(Ironman, 'lastName');\n// Tony\nReflect.get(Ironman, 'fullName');\n// Tony Stark\n\nconst Spiderman = {\n  firstName: 'Peter',\n  lastName: 'Parker',\n};\n\n// \u83b7\u53d6\u53cd\u5c04\u5c5e\u6027\uff0c\u53ea\u6709 Reflect \u53ef\u4ee5\u5b9e\u73b0\nReflect.get(Ironman, 'fullName', Spiderman);\n// Peter Parker\n",lang:"js"})))}}}]);