---
nav:
  title: BOM
  order: 5
group:
  title: 离线与存储 API
  order: 12
title: IndexedDB
order: 7
---

# IndexedDB

indexedDB 的整体架构，是由一系列的单独概念串联而成，去不概念如下列表。

- IndexedDBRequest
- IndexedDBFactory
- IndexedDBDatabase
- IndexedDBObjectStore
- IndexedDBIndex
- IndexedDBKeyRange
- IndexedDBCursor
- IndexedDBTransaction

整体逻辑图如下：

```jsx | inline
import React from 'react';
import img from '../../assets/indexeddb/overview.png';

export default () => <img alt="IndexedDB逻辑图" src={img} width={540} />;
```

下文主要介绍了 indexedDB 的基本概念，以及在实际应用中的实操代码。

- indexedDB 基础概念。在 indexedDB 里面会根据索引 index 来进行整体数据结构的划分。
- indexedDB 数据库的更新是一个非常蛋疼的事情，因为，Web 的灵活性，你既需要做好向上版本的更新，也需要完善向下版本的容错性。
- indexedDB 高效索引机制，在内部，indexedDB 已经提供了 index、cursor 等高效的索引机制，推荐不要直接将所有数据都取回来，再进行筛选，而是直接利用 cursor 进行。
- 最后推荐几个常用库

## 离线存储

IndexedDB 可以存储非常多类型的数据，比如 `Object`、`File`、`Blob` 等，里面的存储结构是根据 Database 来进行存储的。每个 DB 里面可以有不同的 Object Stores。具体结构如下图：

```jsx | inline
import React from 'react';
import img from '../../assets/indexeddb/indexeddb-structure.png';

export default () => <img alt="IndexedDB结构图" src={img} width={540} />;
```

并且，我们可以给 `key` 设定相关特定的值，然后在索引的时候，可以直接通过 `key` 得到具体的内容。使用 IndexDB 需要注意，其遵循的是 **同域原则**。

## 基本概念

在 indexDB 中，有几个基本的操作对象：

### Database

`Database` 通过 `open` 方法直接打开，可以得到一个实例的 DB。每个页面可以创建多个 DB，不过一般都是一个。

```js
idb.open(name, version, upgradeCallback);
```

### Object Store

`Object Store` 这个就是 DB 里面具体存储的对象。这个可以对应于 SQL 里面的 Table（表）内容。其存储的结构为：

```jsx | inline
import React from 'react';
import img from '../../assets/indexeddb/object-store-example.png';

export default () => <img alt="" src={img} width={540} />;
```

### Index

`index` 有点类似于外链，它本身是一种 Object Store，主要是用来在本体的 Store 中，索引另外 Object Store 里面的数据。需要区别的是，`key` 和 `index` 是不一样的。

可以参考：[DEMO1](https://mdn.github.io/indexeddb-examples/idbindex/)、[DEMO2](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex)

如下图表示：

```jsx | inline
import React from 'react';
import img from '../../assets/indexeddb/indexeddb-index.png';

export default () => <img alt="" src={img} width={540} />;
```

```js
// 创建 index
const myIndex = objectStore.index('lName');
```

### Transaction

`transaction` 事务其实就是一系列 CRUD 的集合内容。如果其中一个环节失败了，那么整个事务的处理都会被取消。例如：

```js
var trans1 = db.transaction('foo', 'readwrite');
var trans2 = db.transaction('foo', 'readwrite');
var objectStore2 = trans2.objectStore('foo');
var objectStore1 = trans1.objectStore('foo');
objectStore2.put('2', 'key');
objectStore1.put('1', 'key');
```

### Cursor

`cursor` 主要是用来遍历 DB 里面的数据内容。主要是通过 `openCursor` 来进行控制。

```js
function displayData() {
  var transaction = db.transaction(['rushAlbumList'], 'readonly');
  var objectStore = transaction.objectStore('rushAlbumList');

  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      var listItem = document.createElement('li');
      listItem.innerHTML = cursor.value.albumTitle + ', ' + cursor.value.year;
      list.appendChild(listItem);

      cursor.continue();
    } else {
      console.log('Entries all displayed.');
    }
  };
}
```

## 基本用法

### 创建数据库

```js
const createUpdateStore = function (name, version = 1) {
  const request = window.indexdDB.open(name, version);

  request.onsuccess = function (event) {
    console.log('open success');
  };

  request.onerror = function (event) {
    console.log('open fail');
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(name)) {
      // 创建仓库对象（创建表格）
      // 这里我将主键设为 ID
      const objectStore = db.createObjectStore(name, {
        keyPath: 'id',
        autoIncrement: true,
      });
    }
  };
};
```

### 添加数据

```js
const addDataStore = function (storeName, data, verson) {
  return new Promise((resolve, reject) => {
    let databaseName = storeName;
    let databaseVersion = verson || 1;
    let db;
    let request = indexedDB.open(databaseName, databaseVersion);

    request.onsuccess = function (event) {
      db = event.target.result;
      db = event.target.result;
      // 将数据保存到新建的对象仓库
      let objectStore = db.transaction(databaseName, 'readwrite').objectStore(databaseName);
      if (uf.utils.typeof(data, 'array')) {
        data.forEach(function (dataItem) {
          // 添加一条数据
          objectStore.add(dataItem);
        });
        resolve();
      } else {
        // 添加一条数据
        objectStore.add(data);
        resolve();
      }
    };

    request.error = function () {
      reject();
    };

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        // 创建仓库对象（创建表格）
        // 这里我将主键设置为id
        let objectStore = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };
  });
};
```

### 获取数据

```js
let getStoreData = function (name, key = 1) {
  console.log('getStoreData');
  return new Promise((resolve, reject) => {
    let request = indexedDB.open(name);
    request.onsuccess = function (event) {
      let db = event.target.result;
      let req;
      try {
        req = db.transaction(name, 'readwrite').objectStore(name).get(key); // 这里的“1”也是主键的键值
      } catch (e) {
        reject('用户失败');
      }
      if (!req) {
        return;
      }
      req.onsuccess = function () {
        resolve(req.result);
      };
      req.onerror = function () {
        reject('获取失败');
      };
    };
    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      if (!db.objectStoreNames.contains(name)) {
        // 创建仓库对象（创建表格）
        // 这里我将主键设置为id
        let objectStore = db.createObjectStore(name, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };
  });
};
```

### 删除数据

```js
const delectStoreData = function (name, key) {
  console.log('delectStoreData');
  return new Promise((resolve, reject) => {
    let databaseName = name;
    let db;
    let request = window.indexedDB.open(databaseName);
    request.onsuccess = function (event) {
      db = event.target.result;
      // 这里指定的是主键的键值
      let req = db.transaction(databaseName, 'readwrite').objectStore(databaseName).delete(key);

      req.onsuccess = function () {
        resolve('删除成功');
      };

      req.onerror = function () {
        reject('删除失败');
      };
    };
  });
};
```

### 更新数据

```js
const updateStoreData = function (storeName, newData, key) {
  console.log('updateStoreData');
  return new Promise((resolve, reject) => {
    let request = window.indexedDB.open(storeName);
    let db;
    request.onsuccess = function (event) {
      db = event.target.result;
      let transaction = db.transaction(storeName, 'readwrite');
      let store = transaction.objectStore(storeName);
      let storeData = store.get(key);

      storeData.onsuccess = function (e) {
        let data = e.target.result || {};
        for (a in newData) {
          data[a] = newData[a];
        }
        store.put(data);
        resolve();
      };
    };
    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        // 创建仓库对象（创建表格）
        // 这里我将主键设置为id
        let objectStore = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };
  });
};
```

### 遍历获取

```js
const storeDataList = function (storeName) {
  console.log('storeDataList');
  return new Promise((resolve, reject) => {
    let request = window.indexedDB.open(storeName);
    let db;
    request.onsuccess = function (event) {
      db = event.target.result;
      let transaction = db.transaction(storeName);
      let store = transaction.objectStore(storeName);
      // 打开游标
      let cursor = store.openCursor();
      let dataList = new Array();
      cursor.onsuccess = function (e) {
        var cursorVal = e.target.result;
        if (cursorVal) {
          dataList.push(cursorVal.value);
          cursorVal.continue();
        } else {
          // 遍历结束
          resolve(dataList);
        }
      };
    };
    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        // 创建仓库对象（创建表格）
        // 这里我将主键设置为id
        let objectStore = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };
  });
};
```

### 批量删除

```js
const batchDelete = function (storeName, keys) {
  console.log('batchDelete');
  let allKeys = keys.map((item) => {
    item = +item;
    return delectStoreData(storeName, item);
  });
  return allKeys;
  /* Promise.all(allKeys).then(data => {
      console.log(data);
      resolve(data);
  });*/
};
```

## 第三方依赖库

如果碰到前端频繁存储操作或者大文件缓存的需求，可以考虑使用 IndexedDB，当然项目中推荐直接使用第三方库：

| 名称                                               | 说明                                                                                                                                                   |
| :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [zangodb](https://github.com/erikolson186/zangodb) | ZangoDB 是一个类似 MongoDB 的 HTML5 IndexedDB 接口库，支持 MongoDB 的大多数常见功能包括 filer、sorting、updating 和 aggregation，可在 Web 浏览器中使用 |
| [dexie.js](https://dexie.org/)                     | IndexedDB 的简约包装器                                                                                                                                 |

## 参考资料

- [IndexedDB 打造靠谱 Web 离线数据库](https://juejin.cn/post/6844903608480169991)
- [打造前端离线日志 IndexedDB](https://juejin.im/post/5c91b3c86fb9a070cf6bcab2)
