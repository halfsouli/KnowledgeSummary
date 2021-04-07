const TextOperationPlugin = {
    copy() {
        console.log('禁止复制')
    },

    paste() {
        console.log('禁止粘贴')
    },

    cut() {
        console.log('禁止剪切')
    }
}

export const TextOperation = {
    name: 'TextOperation',
    useValue: TextOperationPlugin
}