## 鼠标位置

MouseEvent 接口指用户与指针设备（如鼠标）交互时发生的事件。使用此接口的常见

| 属性    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| clientX | 设置或获取当事件被触发时鼠标指针相对于**浏览器页面（或客户区）**的水平坐标。 |
| clientY | 设置或获取当事件被触发时鼠标指针向对于**浏览器页面（或客户区）**的垂直坐标。 |
| screenX | 设置或获取当事件被触发时鼠标指针相对于**屏幕的水平坐标**。   |
| screenY | 设置或获取当事件被触发时鼠标指针相对于**屏幕的垂直坐标**。   |
| offsetX | 设置或获取鼠标指针位置相对于**触发事件的对象的横坐标**。     |
| offsetY | 设置或获取鼠标指针位置相对于**触发事件的对象的纵坐标**。     |
| X       | 事件发生的位置的**横坐标**, 它相对于用 CSS 动态定位的最内层包容元素。 |
| Y       | 事件发生的位置的**纵坐标**, 它相对于用 CSS 动态定位的最内层包容元素。 |
| pageX   | 鼠标指针的位置，相对于文档的左边缘。                         |
| pageY   | 鼠标指针的位置，相对于文档的上边缘。                         |
| layerX  | 鼠标相比较于当前坐标系的位置。                               |
| layerY  | 鼠标相比较于当前坐标系的位置。                               |

### clientX/clientY

MousEvent.clientX 和 MousEvent.clientY  设置或获取鼠标指针位置相对于**窗口客户区域**的横纵坐标，其中客户区域不包括窗口自身的控件和滚动条。

![clientX/clientY](../../../Image/05/59af321c-d367-4231-91e2-b66a0a564110.png)

### offsetX/offsetY

MousEvent.offsetX 和 MousEvent.offsetY 设置或获取鼠标指针位置相对于**触发事件的对象**的横纵坐标。

![offsetX/offsetY](../../../Image/05/3a9f7653-6440-4f65-849f-d12c6fa8b550.png)

### pageX/pageY

MousEvent.pageX 和 MousEvent.pageY 相对于整个**网页**左上角坐标。

![pageX/pageY](../../../Image/05/3fe172e4-ccb4-49b5-a3f4-4141b946e606.png)

### screenX/screenY

MousEvent.screenX 和 MousEvent.screenY 设置或获取获取鼠标指针位置相对于**用户屏幕**的横纵坐标。

![screenX/screenY](../../../Image/05/3706b32b-38a8-4420-9aff-7037bca86643.png)

### X/Y

MouseEvent.X 和 MouseEvent.Y 设置或获取鼠标指针位置相对于**父文档**的横纵坐标。

![event.x/event.y](../../../Image/05/c944fe6c-b840-4cb6-9e20-478333287fc3.png)