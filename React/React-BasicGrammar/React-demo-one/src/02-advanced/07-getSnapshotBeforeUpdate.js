import React, { Component } from 'react'

export default class App extends Component {
    state={
        mytext:'kerwin'
    }
    render() {
        console.log('render')
        return (
            <div>
            {this.state.mytext}
            <button onClick={()=>{
                this.setState({
                    mytext:'xiaoming'
                })
            }}></button>    
            </div>
        )
    }
    // componentWillUpdate(){
    //     console.log('componentWillUpdate','记录dom状态不可信，隔着didudast事件间隔太远')
    // }

    //data 接收到了getSnapshotBeforeUpdate的返回值
    componentDidUpdate(prevProps, prevState,data) {
        console.log('componentDidUpdate', data)
    }
    // 在render 生命之后  在已经更新完之前 可以准确获取打 返回之后 
    // componentDidUpdate第三个参数可以获取到这个值
    getSnapshotBeforeUpdate = (prevProps, prevState) => {
        console.log('getSnapshotBeforeUpdate','获取滚动条的位置')
        return {
            y:100
        }
    }
    
    
}
