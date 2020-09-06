import React, { Component } from 'react'

class App extends Component {
    state={
        datalist:['1111','2222']
    }
    render() {
        return (
            <div>
                {/* react 没有指令 v-model */}
                <input type='text' ref='mytext' />
                {/* 1.获取到输入框值1 */}
                <button onClick={() => {
                    console.log('onclick',this.refs.mytext.value)
                }}>add1</button>
                {/* 注意这里不能加小括号 触发的时候会自动调用 。如果加小括号 ，= 函数返回值再调用*/}
                {/* 只能用bind  其他两个会自动执行 */}
                <button onClick={this.handleAdd2.bind(this,'aaaaa','bbbb')}>add2</button>
                <button onClick={this.handleAdd3}>add3</button>
                <button onClick={() => {
                    this.handleAdd3()
                }}>add4</button>
                {
                    this.state.datalist.map(item => <li key={item}>{item}</li>)
                }


            </div>
        )
    }
    // app上的方法 可以直接用this.handleAdd2获取到
    handleAdd2(x,y){
        console.log(x,y)
        console.log('click22222', this.refs.mytext.value)
    }
    handleAdd3=()=>{
        this.setState =({
         datalist: ['22222','33333']
     })
        console.log(this.state.datalist)
    }
}
// js改变this  指向
// bind call apply
var obj1={
    name:'obj1',
    getName(){
        console.log(this.name)
    }
}
var obj2 = {
    name: 'obj2',
    getName() {
        console.log(this.name)
    }
}
// obj1.getName()//obj1
// 改变this指向，立即指向方法

// obj1.getName.call(obj2,'aaa','bbbb','cccc')//obj2
//obj1.getName.apply(obj2,['aaa','bbb','ccc'])//obj2

// 改变this指向，但是需要手动执行方法
// obj1.getName.bind(obj2,'aaa','bbb','ccc')()//


class Test{
    // constructor(){
    //     //super 没有继承
    //     this.name='kerwin'
    //     this.age=100
    // }
    //抄袭java 语法糖
    name='kerwin'
    age=100
    // getName(){
    //     console.log(this.name)
    // }
    getName=()=>{
        console.log(this.name)
    }
}
var obj=new Test()
// obj.getName()

export default App