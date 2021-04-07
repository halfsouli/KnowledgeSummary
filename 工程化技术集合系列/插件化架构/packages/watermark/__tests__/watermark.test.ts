'use strict';

const watermark = require('../lib/watermark');

describe('@eft-security-library/watermark', () => {
    const hello = () => ('hello world');
    it('第一个单元测试', () => {
        expect(hello()).toBe('hello world');
    });
});
