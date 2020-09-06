import React, { Component } from 'react'

export default class App extends Component {
    state = {
        isShow: true
    }
    render() {
        return (
            <div>
                app
                <Navbar onEvent={() => {
                    console.log('app 组件的回调函数')
                    this.setState({
                        isShow: !this.state.isShow
                    })
                }}></Navbar>
                {/* <button onClick={()=>{
                    isShow:!
                }}></button> */}
                {
                    this.state.isShow ?
                        <Sliderbar></Sliderbar> : ''
                }

            </div>
        )
    }
}
class Sliderbar extends Component {
    render() {
        return (
            <div style={{ background: 'yellow' }}>
                App
                <ul>
                    <li>1111</li>
                    <li>1111</li>
                    <li>1111</li>
                </ul>
            </div>
        )
    }
    componentWillUnmount() {
        console.log('componentWillUnmount','clearInterval','window.onscoll=null')
    }
    
}
class Navbar extends Component {
    render() {
        return (
            <div style={{ background: 'red' }}>
                Navbar
                <button onClick={this.handleClick}>hide/show</button>

            </div>
        )
    }
    handleClick = () => {
        this.props.onEvent()
        // console.log(this.props.)
    }
    
}