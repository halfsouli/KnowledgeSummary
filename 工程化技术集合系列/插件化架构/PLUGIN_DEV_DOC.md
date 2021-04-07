# 插件开发文档

## 一、项目介绍

本项目汇总了 EFT 常用安全插件，采用插件化架构设计，通过 `PluginManager` 核心插件来管理所有子插件。

目前插件中主要分成两类子插件：

- 内部开发的插件：如“waterMark”等，插件业务逻辑由内部开发的插件；

- 集成第三方的插件：如“devtoolsDetector”等，这些插件通常是集成自第三方成熟插件。

## 二、项目使用

在使用 `eft-security-library` 插件时，较为简单，这里以 `watermark` 子插件的最简单示例展示：

```html
<div id="App"></div>
```

```js
const testWaterMarkPlugin = () => {
    const watermarkOptions = {
        text: "哈哈，你好",
        color: "red",
        container: "#App",
    };
    /*
        还可以写成
        EftSecurityLibrary.options = { Watermark: watermarkOptions };
        EftSecurityLibrary.init();
    */
    EftSecurityLibrary.init({ Watermark: watermarkOptions });
    const eftSecurity = new EftSecurityLibrary();
    const { Watermark } = eftSecurity.pluginMap;
    Watermark.render();
};
testWaterMarkPlugin();
```

## 三、子插件开发规范

本项目使用 lerna 进行插件管理，因此这里使用 lerna 初始化插件，约定使用 `@eft-security-library` 作为命名空间。

在开发子插件时，需要先创建子插件，这里以 `pluginName` 为例执行如下命令：

```bash
$ lerna create @eft-security-library/pluginName
```

这时会自动创建 `packages/pluginName` 目录，其中目录包括：

```bash
- pluginName
  - __test__
    - pluginName.test.js
  - lib
    - pluginName.js
  - package.json
  - README.md
```

接下来将 js 文件改成 ts 文件，包括 `pluginName.test.js` 、 `pluginName.js` 和 `packages/pluginName` 目录下的 `package.json` 中 `"main": "lib/pluginName.js",` 改成 ts 文件。

然后进入 `pluginName.ts` 开发插件业务。

> 后面会分别介绍两种插件业务开发方式。

最后一步，按照约定的数据格式，导出插件：

```ts
interface PluginItem {
    name: string;     // 插件名称，用来保存和获取插件。 
    useClass?: any;   // 插件初始化方式 - 插件为 Class
    useValue?: any;   // 插件初始化方式 - 插件为 Object
    useFactory?: any; // 插件初始化方式 - 插件为 Function
}
```

### 1. 内部开发的插件

> 参考本项目“waterMark”插件。

继续上一步，这里以创建插件 `WatermarkPlugin` 为例：

```ts
// packages/watermarkPlugin/lib/watermarkPlugin.ts

class WatermarkPlugin {
    constructor() {
        // ...
    }
}

export const Watermark = {
    name: 'Watermark',
    useClass: WatermarkPlugin
}
```

### 2. 集成第三方的插件

> 参考本项目“devtoolsDetector”插件。

继续上一步，这里以创建插件 `devtoolsDetector` 为例：

```ts
// packages/devtoolsDetector/lib/devtoolsDetector.ts

import * as DevtoolsDetectorPlugin from 'devtools-detector';

export const DevtoolsDetector = {
    name: 'DevtoolsDetector',
    useValue: DevtoolsDetectorPlugin
}
```

### 3. 新开发的插件安装已有插件作为依赖

现在我们来添加依赖包，在 lerna 项目里，你可以分别给每个模块单独添加依赖包，也可以同时给部分或全部模块添加依赖包，还可以把管理的某些模块作为依赖添加给其他模块。

添加依赖的命令是 `add`。基本命令格式如下：

```shell
$ lerna add [@version] [--dev] [--exact]
--dev` 和 `--exact` 等同于 `npm install` 里的 `--dev` 和 `--exact
```

当我们执行此命令后，将会执行下面那2个动作：

1. 在每一个符合要求的模块里安装指明的依赖包，类似于在指定模块文件夹中执行 `npm install <package>`。
2. 更新每个安装了该依赖包的模块中的 `package.json` 中的依赖包信息

举个 🌰 ：

```shell
# 在 lerna-core 这个模块里安装 word-wrap 依赖
$ lerna add word-wrap --scope @runningcodertest/lerna-core

# 在 lerna-core 这个模块里安装 word-wrap 依赖，并作为 devDependencies
$ lerna add word-wrap --scope @runningcodertest/lerna-core --dev

# 在 lerna-core 这个模块里安装 word-wrap 依赖
$ lerna add word-wrap --scope @runningcodertest/lerna-core

# 在所有模块中安装 @runningcodertest/lerna-core 这个依赖除了 lerna-core 自己
$ lerna add @runningcodertest/lerna-core

# 在所有模块里安装 word-wrap 依赖
$ lerna add word-wrap
```

**@runningcodertest/lerna-core** 的值可以从 `package.json` 的 `name` 字段获取。