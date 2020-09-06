import React, { Component } from 'react'
import './css/index.css'
export default class App extends Component {
    state = {
        isHide: true,
        isCreate: true
    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        isHide: !this.state.isHide
                    })
                }}>show/hide</button>
                <div className={this.state.isHide ? 'hide' : ''}>11111</div>
                <button onClick={() => {
                    this.setState({
                        isCreate: !this.state.isCreate
                    })
                }}>create/delete</button>
                <div>{
                    this.state.isCreate ? <div>2222222</div> : <div>333333333</div>
                }</div>

            </div>

        )
    }
}
