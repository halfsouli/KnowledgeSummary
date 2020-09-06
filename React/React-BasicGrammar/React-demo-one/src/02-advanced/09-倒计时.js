import React, { Component } from 'react'

export default class App extends Component {
    state={
        number:100
    }
    render() {
        return (
            <div>
            {this.state.number}           
            </div>
        )
    }
    // scu 内部 一直在对比（shallow equal ，return true）
    componentDidMount() {
        setInterval(()=>{
            this.setState({
                number:this.state.number-1
            })
        })
    }
    
}
