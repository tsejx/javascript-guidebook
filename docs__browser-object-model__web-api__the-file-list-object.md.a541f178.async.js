(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[96],{"3zS8":function(e,n,t){"use strict";t.r(n);var l=t("q1tI"),i=t.n(l),a=(t("B2uJ"),t("+su7"),t("qOys")),c=t.n(a);t("5Yjd");n["default"]=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"markdown"},i.a.createElement("h2",{id:"filelist\u5bf9\u8c61"},i.a.createElement("a",{"aria-hidden":"true",href:"#filelist\u5bf9\u8c61"},i.a.createElement("span",{className:"icon icon-link"})),"FileList\u5bf9\u8c61"),i.a.createElement("p",null,"FileList \u662f File \u5bf9\u8c61\u7684\u7c7b\u6570\u7ec4\u5e8f\u5217\uff08\u8003\u8651 ",i.a.createElement("code",null,"<input type='file' multiple>")," \u6216\u8005\u4ece\u684c\u9762\u62d6\u52a8\u76ee\u5f55\u6216\u6587\u4ef6\uff09\uff0c\u901a\u5e38\u6765\u81ea\u4e8e\u4e00\u4e2a HTML input \u5143\u7d20\u7684 ",i.a.createElement("code",null,"files")," \u5c5e\u6027\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u8fd9\u4e2a\u5bf9\u8c61\u8bbf\u95ee\u5230\u7528\u6237\u6240\u9009\u62e9\u7684\u6587\u4ef6\u3002\u8be5\u7c7b\u578b\u7684\u5bf9\u8c61\u8fd8\u80fd\u662f\u6765\u81ea\u7528\u6237\u7684\u62d6\u653e\u64cd\u4f5c\u3002"),i.a.createElement("h3",{id:"\u65b9\u6cd5"},i.a.createElement("a",{"aria-hidden":"true",href:"#\u65b9\u6cd5"},i.a.createElement("span",{className:"icon icon-link"})),"\u65b9\u6cd5"),i.a.createElement("p",null,"\u4f7f\u7528 ",i.a.createElement("code",null,"File.item(index)")," \u65b9\u6cd5\uff0c\u53ef\u4ee5\u6839\u636e\u7ed9\u5b9a\u7684\u7d22\u5f15\u503c\uff0c\u8fd4\u56de FileList \u5bf9\u8c61\u4e2d\u5bf9\u5e94\u7684 File \u5bf9\u8c61\u3002"),i.a.createElement(c.a,{code:"File.item(index);\n",lang:"js"}),i.a.createElement("p",null,i.a.createElement("strong",null,"\u53c2\u6570"),"\uff1a",i.a.createElement("code",null,"index")," \u4e3a File \u5bf9\u8c61\u5728 FileList \u5bf9\u8c61\u4e2d\u7684\u7d22\u5f15\u503c\uff0c\u4ece0\u5f00\u59cb\u3002"),i.a.createElement("p",null,i.a.createElement("strong",null,"\u8fd4\u56de\u503c"),"\uff1a\u6240\u8bf7\u6c42\u7684 File \u5bf9\u8c61\u3002"),i.a.createElement("h3",{id:"\u793a\u4f8b"},i.a.createElement("a",{"aria-hidden":"true",href:"#\u793a\u4f8b"},i.a.createElement("span",{className:"icon icon-link"})),"\u793a\u4f8b"),i.a.createElement("h4",{id:"\u4f7f\u7528\u8868\u5355\u8f93\u5165\u8fdb\u884c\u9009\u62e9"},i.a.createElement("a",{"aria-hidden":"true",href:"#\u4f7f\u7528\u8868\u5355\u8f93\u5165\u8fdb\u884c\u9009\u62e9"},i.a.createElement("span",{className:"icon icon-link"})),"\u4f7f\u7528\u8868\u5355\u8f93\u5165\u8fdb\u884c\u9009\u62e9"),i.a.createElement("p",null,"\u8981\u52a0\u8f7d\u6587\u4ef6\uff0c\u6700\u76f4\u63a5\u7684\u65b9\u6cd5\u5c31\u662f\u4f7f\u7528\u6807\u51c6\xa0",i.a.createElement("code",null,'<input type="file">'),"\xa0\u5143\u7d20\u3002JavaScript \u4f1a\u8fd4\u56de\u9009\u5b9a\u7684\xa0",i.a.createElement("code",null,"File"),"\xa0\u5bf9\u8c61\u7684\u5217\u8868\u4f5c\u4e3a\xa0",i.a.createElement("code",null,"FileList"),"\u3002"),i.a.createElement(c.a,{code:"<input type=\"file\" id=\"files\" name=\"files[]\" multiple />\n<output id=\"list\"></output>\n\n<script dangerouslySetInnerHTML={{ __html: `\n    function handleFilesSelect(e) {\n        const files = e.target.files;   // FileList object\n\n        // files is a FileList of File objects.List some properties\n        let output = [];\n        for (let i = 0, f; f = files[i]; i++){\n            output.push('<li><strong>', escape(f.name), '</strong>(', f.type || 'n/a', ')-', f.size, ' bytes,last modified\uff1a', f.lastModifiedData.toLocaleDateString(), '</li>');\n        }\n        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>'\n    }\n\n    document.getElementById('files').addEventListener('change', handleFileSelect, false);\n` }} />\n",lang:"html"}),i.a.createElement("h4",{id:"\u901a\u8fc7\u8fed\u4ee3\u83b7\u53d6\u591a\u4e2a\u5df2\u9009\u62e9\u6587\u4ef6"},i.a.createElement("a",{"aria-hidden":"true",href:"#\u901a\u8fc7\u8fed\u4ee3\u83b7\u53d6\u591a\u4e2a\u5df2\u9009\u62e9\u6587\u4ef6"},i.a.createElement("span",{className:"icon icon-link"})),"\u901a\u8fc7\u8fed\u4ee3\u83b7\u53d6\u591a\u4e2a\u5df2\u9009\u62e9\u6587\u4ef6"),i.a.createElement(c.a,{code:'// fileInput\u662f\u4e00\u4e2aHTML input \u5143\u7d20\uff1a<input type="file" id="myfileinput" multiple />\nconst fileInput = document.getElementById("myfileinput");\n\n// files \u662f\u4e00\u4e2a FileList\u5bf9\u8c61\uff08\u7c7b\u4f3c\u4e8eNodeList\u5bf9\u8c61\uff09\nconst files = fileInput.files;\nlet file;\n\n// \u904d\u5386\u6240\u6709\u6587\u4ef6\nfor(let i = 0; i < files.length; i++){\n    // \u53d6\u5f97\u4e00\u4e2a\u6587\u4ef6\n    file = files.item(i);\n    // \u8fd9\u6837\u4e5f\u884c\n    file = files[i];\n    // \u53d6\u5f97\u6587\u4ef6\u540d\n    console.log(file.name);\n}\n',lang:"js"})))}}}]);