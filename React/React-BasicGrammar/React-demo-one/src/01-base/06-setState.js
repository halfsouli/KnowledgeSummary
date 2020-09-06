import React, { Component } from 'react'

export default class App extends Component {
    state={
        myname:'kerwin',
        count:1
    }
    render() {
        return (
            <div>
                {/* {this.state.myname}
                <button onClick={this.handClick1}>add1</button>
                <button onClick={this.handClick2}>add2</button> */}
                {this.state.count}
                <button onClick={this.handClickadd}>addcount1</button>
            </div>
        )
    }
    handClickadd = () => {
        // this.setState({  
        //     count:this.state.count+1
        // })
        // this.setState({
        //     count: this.state.count + 1
        // })
        // 队列
        this.setState((prevState)=>({
            count: prevState.count+1
        }))
        this.setState((prevState) =>({
            count: prevState.count + 1
        }))
      }
    handClick1=()=>{
         this.setState({
             myname:'xiaoming'
         },()=>{
             console.log('1',this.state.myname)
         })//之后发生什么？
        //  1.虚拟dom创建
        //  2.diff对比
        console.log('2',this.state.myname)
    }
    handClick2 = () => {
        // 接收一个回调函数作为参数
        this.setState((prevState)=>({myname:'xiaoming'}))
    }
}
