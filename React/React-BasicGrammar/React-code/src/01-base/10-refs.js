import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div>
               <Input ref='mytext'/>
               <button onClick={
                    this.handleClick
               }>add</button>
            </div>
        )
    }
    handleClick=()=>{
        // 拿着值
        console.log(this.refs.mytext.state.mytext)
        // 清空输入框
        this.refs.mytext.reset()
    }
}
class Input extends Component {
    state={
        mytext:''
    }
    reset=()=>{
        this.setState({
            mytext:''
        })
    }
    render() {
        return (
            <div>
                <div>others input</div>
                <input   value={this.state.mytext} type='text' style={{ background: 'yellow' }}  onChange={(ev)=> {
                    this.setState({
                        mytext: ev.target.value
                    })
                }}/>
            </div>
        )
    }
}