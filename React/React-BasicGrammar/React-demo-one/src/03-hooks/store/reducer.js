// 必须是传函数
// 接收老状态
const reducer = (prevstate, action) => {
    console.log(prevstate, action)
    let { type, payload } = action
    switch (type){
        case "Change_text":
            // 深复制
        return {
            ...prevstate, text: payload
        }
        case "Change_list":
            // 深复制
            return {
                ...prevstate, list: payload
            }
    }
    return prevstate
}

export default reducer