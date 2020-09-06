const collapseReducer = (prevState = false, action) => {
    let { type, payload } = action
    switch (type) {
        case 'sideMenuShow':
            return payload
        default:
            return prevState
    }

}
export default collapseReducer