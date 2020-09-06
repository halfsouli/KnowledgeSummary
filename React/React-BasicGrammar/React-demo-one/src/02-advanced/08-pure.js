import React, { Component, PureComponent } from 'react'

export default class App extends PureComponent {
    state = {
        myname: 'kerwin'
    }
    UNSAFE_componentWillUpdate() {
        console.log('componentWillUpdate')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     // 性能调优函数 //新的状态和老的状态
    //     console.log('shouldComponentUpdate', this.state.myname, nextState.myname)
    //     if (this.state.myname !== nextState.myname) {
    //         return true
    //     }
    //     return false
    // }
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }




    render() {
        console.log('render')
        return (
            <div>
                {this.state.myname}
                <button onClick={() => {
                    this.setState({
                        myname: 'xiaoming'
                    })//setState 开启更新  虚拟dom 创建 diff  补丁更新
                }}>click</button>
            </div>
        )
    }
}
