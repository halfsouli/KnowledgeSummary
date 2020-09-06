import React, { Component } from 'react'


class Child extends Component {
    componentDidMount(){
        console.log('获取到ajax数据',this.props.myname)
    }
    // 会走多次 可以在这里获取到id  更新  mount 只会走一次
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
        console.log('获取到ajax数据', nextProps.myname)
    }
    render() {
        return (
            <div>
                child 组件-{this.props.myname}
            </div>
        )
    }
  }


export default class App extends Component {
    state={
        myname:'4567'
    }
    render() {
        return (
            <div>
                {this.state.myname}
                <button onClick={()=>{
                    this.setState({
                        myname:'4321'
                    })
                }}>click</button>
                <Child myname={this.state.myname}></Child>
            </div>
        )
    }
}
