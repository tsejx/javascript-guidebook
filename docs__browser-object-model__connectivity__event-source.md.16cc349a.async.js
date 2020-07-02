(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[62],{Ksp6:function(e,t,l){"use strict";l.r(t);var n=l("q1tI"),a=l.n(n),r=(l("B2uJ"),l("+su7"),l("qOys")),c=l.n(r);l("5Yjd");t["default"]=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("h2",{id:"eventsource"},a.a.createElement("a",{"aria-hidden":"true",href:"#eventsource"},a.a.createElement("span",{className:"icon icon-link"})),"EventSource"),a.a.createElement("p",null,"EventSource \u5bf9\u8c61\u63a5\u53e3\u7528\u4e8e\u63a5\u6536\u670d\u52a1\u5668\u53d1\u9001\u7684\u4e8b\u4ef6\u3002\u5b83\u901a\u8fc7 HTTP \u8fde\u63a5\u5230\u670d\u52a1\u5668\uff0c\u5df2 ",a.a.createElement("code",null,"text/event-stream")," \u683c\u5f0f\u63a5\u6536\u4e8b\u4ef6\uff0c\u4e0d\u5173\u95ed\u8fde\u63a5\u3002"),a.a.createElement("p",null,"EventSource \u5bf9\u8c61\u4e3b\u8981\u7528\u4e8e Server-Sent Events\uff08\u7b80\u79f0 SSE\uff09\u7684\u6280\u672f\u3002\u8fd9\u662f\u4e00\u79cd\u80fd\u8ba9\u6d4f\u89c8\u5668\u901a\u8fc7 HTTP \u8fde\u63a5\u81ea\u52a8\u6536\u5230\u670d\u52a1\u5668\u7aef\u66f4\u65b0\u7684\u6280\u672f\u3002"),a.a.createElement("p",null,"\u8fd9\u4e2a\u6280\u672f\u7684\u4f5c\u7528\u662f\u53ef\u4ee5\u5b8c\u6210\u4ece\u670d\u52a1\u5668\u7aef\u5230\u5ba2\u6237\u7aef\uff08\u6d4f\u89c8\u5668\uff09\u5355\u5411\u7684\u6d88\u606f\u4f20\u9012\u3002\u56e0\u6b64\u6211\u4eec\u53ef\u4ee5\u7528\u8fd9\u4e2a\u6765\u505a\u63a8\u9001\u3002\u4e0d\u8fc7\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0cIE \u5e76\u4e0d\u652f\u6301\u8fd9\u9879\u6280\u672f\u3002"),a.a.createElement("p",null,"W3C \u5173\u4e8e Server-Sent Events \u90e8\u5206\u7684\u63cf\u8ff0 ",a.a.createElement("a",{href:"https://www.w3.org/TR/eventsource/",target:"_blank",rel:"noopener noreferrer"},"W3C Server-Sent Events",a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",className:"__dumi-default-external-link-icon"},a.a.createElement("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),a.a.createElement("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})))),a.a.createElement("h3",{id:"\u6784\u9020\u51fd\u6570"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u6784\u9020\u51fd\u6570"},a.a.createElement("span",{className:"icon icon-link"})),"\u6784\u9020\u51fd\u6570"),a.a.createElement(c.a,{code:"const eventSource = new EventSource();\n",lang:"js"}),a.a.createElement("h3",{id:"\u5c5e\u6027"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u5c5e\u6027"},a.a.createElement("span",{className:"icon icon-link"})),"\u5c5e\u6027"),a.a.createElement("p",null,"\u6b64\u63a5\u53e3\u4ece\u5176\u7236\u63a5\u53e3 EventTarget \u7ee7\u627f\u5c5e\u6027\u3002"),a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u8bf4\u660e"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"EventSource.onerror")),a.a.createElement("td",null,"\u5f53\u53d1\u751f\u9519\u8bef\u65f6\u88ab\u8c03\u7528\uff0c\u5e76\u4e14\u5728\u6b64\u5bf9\u8c61\u4e0a\u6d3e\u53d1 ",a.a.createElement("code",null,"error")," \u4e8b\u4ef6")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"EventSource.onmessage")),a.a.createElement("td",null,"\u670d\u52a1\u5668\u7aef\u53d1\u9001\u7ed9\u5ba2\u6237\u7aef\u4e00\u6761\u6d88\u606f\u65f6\u89e6\u53d1")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"EventSource.onopen")),a.a.createElement("td",null,"SSE \u8fde\u63a5\u521a\u6253\u5f00\u65f6\u89e6\u53d1")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"EventSource.readyState")),a.a.createElement("td",null,"\u8868\u793a\u8fde\u63a5\u72b6\u6001\uff08",a.a.createElement("code",null,"CONNECTING")," \u3001",a.a.createElement("code",null,"OPEN")," \u548c ",a.a.createElement("code",null,"CLOSED"),"\uff09")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"EventSource.url")),a.a.createElement("td",null,"\u4ee3\u8868\u6e90\u5934\u7684 URL")))),a.a.createElement("h3",{id:"\u65b9\u6cd5"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u65b9\u6cd5"},a.a.createElement("span",{className:"icon icon-link"})),"\u65b9\u6cd5"),a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u65b9\u6cd5"),a.a.createElement("th",null,"\u8bf4\u660e"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("code",null,"EventSource.close()")),a.a.createElement("td",null,"\u5982\u679c\u5b58\u5728\uff0c\u5219\u5173\u95ed\u8fde\u63a5\uff0c"))))))}}}]);