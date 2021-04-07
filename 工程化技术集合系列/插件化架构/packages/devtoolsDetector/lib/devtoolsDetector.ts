/*
* 插件名称：浏览器防调试插件
* 插件类型：第三方插件
* 插件文档：https://github.com/AEPKILL/devtools-detector
* 使用示例：
    // 1.1 add listener
    addListener((isOpen) => {
      if (isOpen) {
        location.href = 'https://www.exexm.com/';
      }
    });
    // 1.2 launch detect
    launch();
*/

import * as DevtoolsDetectorPlugin from 'devtools-detector';

export const DevtoolsDetector = {
    name: 'DevtoolsDetector',
    useValue: DevtoolsDetectorPlugin
}