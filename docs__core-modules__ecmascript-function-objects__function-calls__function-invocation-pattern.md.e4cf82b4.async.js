(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[136],{"8k0c":function(e,n,a){"use strict";a.r(n);var t=a("q1tI"),c=a.n(t),l=(a("B2uJ"),a("+su7"),a("qOys")),i=a.n(l);a("5Yjd");n["default"]=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"markdown"},c.a.createElement("h1",{id:"\u51fd\u6570\u8c03\u7528\u6a21\u5f0f-function-invocation-pattern"},c.a.createElement("a",{"aria-hidden":"true",href:"#\u51fd\u6570\u8c03\u7528\u6a21\u5f0f-function-invocation-pattern"},c.a.createElement("span",{className:"icon icon-link"})),"\u51fd\u6570\u8c03\u7528\u6a21\u5f0f Function Invocation Pattern"),c.a.createElement("p",null,"\u5f53\u4e00\u4e2a\u51fd\u6570\u5e76\u975e\u4e00\u4e2a\u5bf9\u8c61\u7684\u5c5e\u6027\u65f6\uff0c\u90a3\u4e48\u5b83\u5c31\u662f\u88ab\u5f53\u505a\u4e00\u4e2a\u51fd\u6570\u6765\u8c03\u7528\u7684\u3002\u5bf9\u4e8e\u666e\u901a\u7684\u51fd\u6570\u8c03\u7528\u6765\u8bf4\uff0c\u51fd\u6570\u7684\u8fd4\u56de\u503c\u5c31\u662f\u8c03\u7528\u8868\u8fbe\u5f0f\u7684\u503c\u3002"),c.a.createElement(i.a,{code:"function add ( x, y ){\n    return x + y;\n}\n\nvar sum = add( 3, 4);\n\nconsole.log( sum ) // 7\n",lang:"javascript"}),c.a.createElement("h2",{id:"\u8c03\u7528\u6bcd\u4f53"},c.a.createElement("a",{"aria-hidden":"true",href:"#\u8c03\u7528\u6bcd\u4f53"},c.a.createElement("span",{className:"icon icon-link"})),"\u8c03\u7528\u6bcd\u4f53"),c.a.createElement("p",null,"\u4f7f\u7528\u51fd\u6570\u8c03\u7528\u6a21\u5f0f\u8c03\u7528\u51fd\u6570\u65f6\uff0c\u975e\u4e25\u683c\u6a21\u5f0f\u4e0b\uff0c",c.a.createElement("code",null,"this")," \u88ab\u7ed1\u5b9a\u5230\u5168\u5c40\u5bf9\u8c61\uff1b\u5728\u4e25\u683c\u6a21\u5f0f\u4e0b\uff0c",c.a.createElement("code",null,"this")," \u662f ",c.a.createElement("code",null,"undefined"),"\u3002"),c.a.createElement(i.a,{code:"function add( x, y){\n    console.log( this ); // window\n}\nadd();\n\nfunction add(x,y){\n    'use strict';\n    console.log(this); // undefined\n}\nadd();\n",lang:"javascript"}),c.a.createElement("p",null,"\ud83d\udca1\u56e0\u6b64\uff0c",c.a.createElement("code",null,"this ")," \u53ef\u4ee5\u7528\u6765\u5224\u65ad\u5f53\u524d\u662f\u5426\u662f\u4e25\u683c\u6a21\u5f0f"),c.a.createElement(i.a,{code:"var strict = (function(){ return !this; }());\n",lang:"javascript"}),c.a.createElement("h2",{id:"\u91cd\u5199\u73b0\u8c61"},c.a.createElement("a",{"aria-hidden":"true",href:"#\u91cd\u5199\u73b0\u8c61"},c.a.createElement("span",{className:"icon icon-link"})),"\u91cd\u5199\u73b0\u8c61"),c.a.createElement("p",null,"\u56e0\u4e3a\u51fd\u6570\u8c03\u7528\u6a21\u5f0f\u7684\u51fd\u6570\u4e2d\u7684 ",c.a.createElement("code",null,"this")," \u7ed1\u5b9a\u5230\u5168\u5c40\u5bf9\u8c61\uff0c\u6240\u4ee5\u4f1a\u53d1\u751f\u5168\u5c40\u5c5e\u6027\u88ab\u91cd\u5199\u7684\u73b0\u8c61\u3002"),c.a.createElement(i.a,{code:"var a = 0;\n\nfunction fn(){\n    this.a = 1;\n}\n\nfn();\n\nconsole.log(this, this.a, a); // window 1 1\n",lang:"javascript"}),c.a.createElement("h3",{id:""},c.a.createElement("a",{"aria-hidden":"true",href:"#"},c.a.createElement("span",{className:"icon icon-link"})))))}}}]);