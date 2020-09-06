import React, { Component } from 'react'
class Child extends Component{
    render(){
        return(<div>
            Child
            {/* 第一个标签  */}
            {this.props.children[0]}
            {this.props.children[1]}
        </div>)
    }
}
export default class App extends Component {
    render() {
        return (
            <div>
                <Child >
                <div>1111</div>
                <div>22222222</div>
                </Child>
            </div>
        )
    }
}
