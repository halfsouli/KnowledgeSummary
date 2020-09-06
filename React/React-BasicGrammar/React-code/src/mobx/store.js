import { observable, autorun } from 'mobx'
// const store = observable.box(true) 
const store = observable.map({
    isshow: true,
    list: [],
    roleList: [],
    rightList: []
})
export default store