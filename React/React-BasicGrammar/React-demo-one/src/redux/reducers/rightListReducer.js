import { fromJS } from 'immutable'
const rightListReducer = (prevState = [], action) => {
    let { type, payload } = action
    switch (type) {
        case 'setRightsList':
            var newstate = fromJS(prevState)
            return newstate.concat(payload).toJS()
        default:
            return prevState
    }
}
export default rightListReducer