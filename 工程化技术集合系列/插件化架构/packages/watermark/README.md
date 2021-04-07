# 水印插件

支持在指定元素节点中添加和删除水印，通过设置水印参数，实现定制化水印效果。

## 一、快速上手

### 1. 使用单层水印

指定 `#App` 容器中设置水印：

1. 定义容器：
```html
<div id="App"></div>
```

2. 使用水印插件
```js
// 1. 设置水印配置
const watermarkOptions = {
    text: "Hello Eft-Security-Library",
    color: "red",
    angle: -45,
    container: "#App"
};

// 2. 初始化插件
const eftSecurity = new EftSecurityLibrary({ Watermark: watermarkOptions });

// 3. 获取插件
const { Watermark } = eftSecurity.pluginMap;

// 4. 挂载水印
Watermark.mount();
```

### 2. 使用多层水印

当需要多层水印（即在不同容器生成不同样式的水印），可以在 `mount(option)` 中传入 `option` 水印配置。

这里指定 `#App` 这层容器设置水印文本为 `Hello Eft-Security-Library`，并指定 `#App2` 这层容器设置水印文本为 `Hello pingan8787`：

1. 定义容器：
```html
<div id="App"></div>
<div id="App2"></div>
```

2. 使用水印插件

```js
// 1. 设置水印配置
const watermarkOptions = {
    text: "Hello Eft-Security-Library",
    color: "red",
    angle: -45,
    container: "#App"
};

// 2. 初始化插件
const eftSecurity = new EftSecurityLibrary({ Watermark: watermarkOptions });

// 3. 获取插件
const { Watermark } = eftSecurity.pluginMap;

// 4. 挂载水印（第一层水印）
Watermark.mount();

// 5. 挂载水印（第二层水印）
const watermarkOptions2 = {
    text: "Hello pingan8787",
    color: "red",
    container: "#App2",
    y: 50,
    color: '#000'
};

Watermark.mount(watermarkOptions2);
```

## 二、参数介绍

```ts
interface WatermarkOptions{
    width?: number;
    height?: number;
    text?: string;
    container?: string | HTMLElement;
    x?: number;
    y?: number;
    font?: string;
    color?: string; 
    fontSize?: number;
    alpha?: number;
    angle?: number;
    rectCenterPoint?: string;
    zIndex?: number;
    textAlign?: "center" | "end" | "left" | "right" | "start";
    textBaseline?: "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";
}
```