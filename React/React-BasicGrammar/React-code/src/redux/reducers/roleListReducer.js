const roleListReducer = (prevState =[], action) => {
    let { type, payload } = action
    switch (type) {
        case 'setRoleList':
            var newstate = { ...prevState }
            newstate = payload
            return newstate
        default:
            return prevState
    }

}//只要状态已返回，会自动更新
export default roleListReducer