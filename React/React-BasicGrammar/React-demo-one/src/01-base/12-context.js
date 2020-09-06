import React, { Component } from 'react'
const GlobalContext = React.createContext()//创建
class Child1 extends Component {
    // 创建成功 ，dom挂载完成
    render() {
        return <GlobalContext.Consumer>
            {context => (
                <div style={{ background: 'yellow' }}>child1--{context.text}</div>
            )
            }
        </GlobalContext.Consumer>
    }
}
class Child2 extends Component {

    // 创建成功 ，dom挂载完成
    render() {
        return <GlobalContext.Consumer>
            {context => (
                <div style={{ background: 'blue' }}>child2--{context.call}
                    <button onClick={() => this.handClick(context)}>child2通信</button>
                </div>
            )
            }
        </GlobalContext.Consumer>
    }
    handClick = (context) => {
        context.changeState('来自child2的问候')
        console.log(context)
    }
}
class Child3 extends Component {
    // 创建成功 ，dom挂载完成
    render() {
        return <div style={{ background: 'pink' }}>child3</div>
    }
}
export default class App extends Component {
        state = {
            text: '私人服务'
        }
        changeState=(data)=>{
            this.setState({
                text: data
            })
        }
    render() {
        return (
            <GlobalContext.Provider value={{
                sms: '短信服务',
                call: '电话服务',
                text: this.state.text,
                changeState:this.changeState
            }}>
                <div>
                    <Child1></Child1>
                    <Child2></Child2>
                    <Child3></Child3>
                </div>
            </GlobalContext.Provider >
        )
    }
}
