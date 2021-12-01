---
nav:
  title: BOM
  order: 5
group:
  title: 二进制数据和文件 API
  order: 10
title: FileReaderSync API
order: 7
---

# FileReaderSync API

FileReaderSync 接口允许以 **同步** 的方式读取 [File](./file) 或 [Blob](./blob) 对象中的内容。

> 该接口只在 Workers 里可用，因为在主线程里进行同步 I/O 操作可能会阻塞用户界面。
