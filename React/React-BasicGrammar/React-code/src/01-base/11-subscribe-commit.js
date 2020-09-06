import React, { Component } from 'react'
// 新建一个对象
const observer={
    list:[],
subscribe( callback){
    this.list.push(callback)
},
dispatch(data){
    this.list.forEach(item=>{
        item(data)
    })
}
}
class Child1 extends Component{
    // 创建成功 ，dom挂载完成
    componentDidMount(){
        observer.subscribe((data)=>{
            console.log('child1定义的callback', data)
        })
        // console.log('componentDidMount', '调用订阅方法', observer.subscribe())
    }
  render()
{
    return<div style={{background:'yellow'}}>我是微信用户</div>
}}
class Child2 extends Component {
    
    render() {
        return <div style={{ background: 'red' }}>公众号发布者
        <button onClick={this.handleClick}>发布</button>
        </div>
    }
    handleClick=()=>{
        observer.dispatch('child2的问候')
    }
}
class Child3 extends Component {
    // 创建成功 ，dom挂载完成
    componentDidMount() {
        observer.subscribe((data) => {
            console.log('child3定义的callback', data)
        })
        // console.log('componentDidMount', '调用订阅方法', observer.subscribe())
    }
    render() {
        return <div style={{ background: 'blue' }}>我是微信用户</div>
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Child1></Child1>
                <Child2></Child2>
                <Child3></Child3>
            </div>
        )
    }
}
