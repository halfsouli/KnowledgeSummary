# Lerna 使用教程

### 什么是 Lerna

> A tool for managing JavaScript projects with multiple packages.

Lerna 是一个管理多个 node 模块的工具，是 Babel 自己用来维护自己的 [Monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) 并开源出的一个项目。Lerna 现在已经被很多著名的项目组织使用，如：[Babel](https://github.com/babel/babel/tree/master/packages), [React](https://github.com/facebook/react/tree/master/packages), [Angular](https://github.com/angular/angular/tree/master/modules), [Ember](https://github.com/emberjs/ember.js/tree/master/packages), [Meteor](https://github.com/meteor/meteor/tree/devel/packages), [Jest](https://github.com/facebook/jest/tree/master/packages) 。

### Monorepo vs Multirepo

Monorepo 的全称是 monolithic repository，即单体式仓库，与之对应的是 Multirepo(multiple repository)，这里的“单”和“多”是指每个仓库中所管理的模块数量。

Multirepo 是比较传统的做法，即每一个模块都单独用一个仓库来进行管理，典型案例有 [webpack](https://github.com/webpack/webpack)，优缺点总结如下：

优点：

- 各模块管理自由度较高，可自行选择构建工具，依赖管理，单元测试等配套设施
- 各模块仓库体积一般不会太大

缺点：

- issue 管理混乱，在实际使用中会发现 core repo 中经常会出现对一些针对 module 提出的问题，需要做 issue 迁移或关联
- changlog 无法关联，无法很好的自动关联各个 module 与 core repo 之间的变动联系
- 版本更新繁琐，如果 core repo 的版本发生了变化，需要对所有的 module 进行依赖 core repo 的更新
- 测试复杂，对多个相关联 module 测试繁琐

Monorep 是把所有相关的 module 都放在一个仓库里进行管理，每个 module 独立发布，典型案例有 [babel](https://github.com/babel/babel/tree/master/packages)，优缺点总结如下：

优点：

- 管理简便，issue 和 PR 都放在一个仓库中进行维护
- changelog 维护简便，所有changelog 都基于同一份 commit 列表
- 版本更新简便，core repo 以及各模块版本发生变更后可以很简便的同步更新其余所有对其有依赖的 module

缺点：

- 仓库体积增长迅速，随着 module 的增多，仓库的体积会变得十分庞大
- 自由度较低，高度的统一导致各个模块的自由度较低，且对统一的配套工具（构建，测试）等要求较高，要能适配各个 module 的要求

### Lerna 可以帮我做什么

Lerna 可以通过 git 和 npm 来帮助我们优化管理 Monorepo 的工作流，同时也可以减少开发和构建环境中对大量依赖包复制的时间和空间需求

一个基本的 Lerna 仓库结构如下：

```
my-lerna-repo/
    ┣━ packages/
    ┃     ┣━ package-1/
    ┃     ┃      ┣━ ...
    ┃     ┃      ┗━ package.json
    ┃     ┗━ package-2/
    ┃            ┣━ ...
    ┃            ┗━ package.json
    ┣━ ...
    ┣━ lerna.json
    ┗━ package.json
```

### 开始使用

#### 初始化

首先我们先创建一个 Lerna 项目

如果你的 `npm >= 5.2`，可以直接通过 `npx` 执行 lerna 的相关命令，你也可以全局安装 lerna 后再执行相关命令

```shell
$ mkdir lerna-repo && cd $_
$ npx lerna init
```

或

```shell
$ npm i -g lerna
$ mkdir lerna-repo && cd $_
$ lerna init
```

`lerna init` 命令会创建一个用来配置的`lerna,json` 文件以及用于存放所有 module 的 `packages` 文件夹，如下:

```
lerna-repo/
    ┣━ packages/
    ┣━ lerna.json
    ┗━ package.json
```

Lerna 提供两种不同的方式来管理你的项目：`Fixed` 或 `Independent`，默认采用 `Fixed` 模式，如果你想采用 `Independent` 模式，只需在执行 `init` 命令的时候加上 `--independent` 或 `-i` 参数即可。

#### Fixed/Locked 模式（默认）

固定模式下 Lerna 项目在单一版本线上运行。版本号保存在项目根目录下 `lerna.json` 文件中的 `version` 下。当你运行 `lerna publish` 时，如果一个模块自上次发布版本以后有更新，则它将更新到你将要发布的新版本。这意味着你在需要发布新版本时只需发布一个统一的版本即可。

#### Independent 模式（–independent）

独立模式下 Lerna 允许维护人员独立地的迭代各个包版本。每次发布时，你都会收到每个发生更改的包的提示，同时来指定它是 `patch`，`minor`，`major` 还是自定义类型的迭代。

> 在独立模式下，`lerna.json` 文件中 `version` 属性的值将被忽略。

### 创建模块

Lerna 提供了两种创建或导入模块的方式，分别是 `create`，`import`。

#### create

创建一个 lerna 管理的模块。基本命令格式如下：

```shell
$ lerna create  [loc]
```

`name` 是模块的名称（必填项，可包含作用域，如 `@uedlinker/module-a`），必须唯一且可以发布（npm 仓库中无重名已发布包）

`loc` 是自定义的包路径（选填）, 会根据你在 `lerna.json` 文件中的 `packages` 的值去匹配，默认采用该数组的第一个路径，指定其他路径时只要写明路径中的唯一值即可，例如想选择 `/user/lerna-repo/modules` 这个路径，只需要执行如下命令即可

```shell
$ lerna create package-a modules
```

命令执行完后，lerna 会帮我们在指定位置创建模块的文件夹，同时会默认在该文件夹下执行 `npm init` 的命令，在终端上根据根据提示填写所有信息后会帮我们创建对应的 `package.json` 文件，大致的结构如下

```
lerna-repo/
    ┣━ packages/
    ┃     ┗━ package-a/
    ┃            ┣━ ...
    ┃            ┗━ package.json
    ┣━ lerna.json
    ┗━ package.json
```

#### import

导入一个已存在的模块，同时保留之前的提交记录，方便将其他正在维护的项目合并到一起。基本命令格式如下：

```shell
$ lerna import 
```

`dir` 是本项目外的包含 npm 包的 git 仓库路径（相对于本项目根路径的相对路径）

执行后会将该模块整体复制到指定的依赖包存放路径下，同时会把该模块之前所有提交记录合并到当前项目提交记录中

这里我们先创建 1 个核心模块以及 2 个依赖核心模块的`模块-a`和`模块-b`

```shell
$ lerna create @runningcodertest/lerna-core
$ lerna create @runningcodertest/lerna-moduel-a
$ lerna create @runningcodertest/lerna-module-b
```

#### 查看模块列表

创建完毕之后，我们可以通过 `list` 命令来查看和确认现在管理的包是否符合我们的预期，执行如下命令：

```shell
$ lerna list
```

可以看到我们之前创建的三个包现在都被 lerna 管理起来了。

### 添加依赖包

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

### 安装依赖包

lerna 通过 `bootstrap` 命令来快速安装所有模块所需的依赖包。基本命令如下：

```shell
$ lerna bootstrap
```

当执行完上面的命令后，会发生以下的行为：

1. 在各个模块中执行 `npm install` 安装所有依赖
2. 将所有相互依赖的 Lerna 模块 链接在一起
3. 在安装好依赖的所有模块中执行 `npm run prepublish`
4. 在安装好依赖的所有模块中执行 `npm run prepare`

### 清理依赖包

可以通过 `clean` 命令来快速删除所有模块中的 `node_modules` 文件夹。基本命令如下：

```shell
$ lerna clean
```

### 版本迭代

lerna 通过 `version` 命令来为各个模块进行版本迭代。基本命令如下：

```shell
$ lerna version [major | minor | patch | premajor | preminor | prepatch | prerelease]
```

如果不选择此次迭代类型，则会进入交互式的提示流程来确定此次迭代类型

举个 🌰 ：

```shell
$ lerna version 1.0.1 # 按照指定版本进行迭代
$ lerna version patch # 根据 semver 迭代版本号最后一位
$ lerna version       # 进入交互流程选择迭代类型 
```

**注意：** 如果你的 lerna 项目中各个模块版本不是按照同一个版本号维护（即创建时选择 `independent` 模式），那么会分别对各个包进行版本迭代

当执行此命令时，会发生如下行为：

1. 标记每一个从上次打过 tag 发布后产生更新的包
2. 提示选择此次迭代的新版本号
3. 修改 `package.json` 中的 `version` 值来反映此次更新
4. 提交记录此次更新并打 tag
5. 推送到远端仓库

> 小技巧：
>
> 你可以在执行此命令的时候加上 `——no-push` 来阻止默认的推送行为，在你检查确认没有错误后再执行 `git push` 推送

#### –conventional-changelog

```shell
$ lerna version --conventional-commits
```

`version` 支持根据符合规范的提交记录在每个模块中自动创建和更新 `CHANGELOG.md` 文件，同时还会根据提交记录来确定此次迭代的类型。只需要在执行命令的时候带上 `--conventional-changelog` 参数即可。

#### –changelog-preset

```shell
$ lerna version --conventional-commits --changelog-preset angular-bitbucket
```

changelog 默认的预设是 `angular`，你可以通过这个参数来选择你想要的预设创建和更新 `CHANGELOG.md`

预设的名字在解析的时候会被增添 `conventional-changelog-` 前缀，如果你设置的是 `angular`，那么实际加载预设的时候会去找 `conventional-changelog-angular` 这个包，如果是带域的包，则需要按照 `@scope/name` 的规则去指明，最后会被解析成 `@scope/conventional-changelog-name`。

> 小技巧：
>
> 上述 2 个参数也可以直接写在 `lerna.json` 文件中，这样每次执行 `lerna version` 命令的时候就会默认采用上面的 2 个参数
>
> ```shell
> "command": {
> "version": {
>  "conventionalCommits": true,
>  "changelogPreset": "angular"
> }
> }
> ```

### 发版

在一切准备就绪后，我们可以通过 `publish` 命令实现一键发布多个模块。基本命令如下：

```shell
$ lerna publish
```

当执行此命令时，会发生如下行为：

1. 发布自上次发布以来更新的包(在底层执行了 `lerna version`，2.x 版本遗留的行为)
2. 发布当前提交中打了 tag 的包
3. 发布在之前的提交中更新的未经版本化的 “canary” 版本的软件包（及其依赖项）

**注意：** Lerna 不会发布在 `package.json` 中将 `private` 属性设置为 `true` 的模块，如果要发布带域的包，你还需要在 ‘package.json’ 中设置如下内容：

```json
"publishConfig": {
   "access": "public"
}
```

由于我们之前已执行过 `lerna version` 命令，这里如果直接执行 `lerna publish` 会提示没有发现有更新的包需要更新，我们可以通过从远端的 git 仓库来发布：

```shell
$ lerna publish lerna publish from-git
```

### 参考资源

- [手摸手教你玩转 Lerna](https://blog.runningcoder.me/2018/08/17/learning-lerna/)
- [Github - qshell](https://github.com/qiniu/qshell)
- [使用 qshell 同步目录](https://developer.qiniu.com/kodo/kb/1685/using-qshell-synchronize-directories)