import React, { Component } from 'react'

export default class App extends Component {
    constructor(){
        super()
        this.state={
            myname: 'anna',
            myage: '20',
            datalist:['111','22222']
        }
    }
    // state = {
    //     myname: 'kerwin',
    //     myage: '20',
    //     // datalist: ['111', '2222', '3333']
    // }
    render() {
        // var newlist = this.state.datalist.map(item => <li key={item}>{item}</li>)
        return (
            <div>
                
                app-{this.state.myname}-{this.state.myage}
                <input type='text' ref='mytext'/>
                <button onClick={() => {
                    this.handkeClick()
                }}>click</button>
                {/* {newlist} */}
                {
                    this.state.datalist.map(item => <li key={item}>{item}</li>)
                }
            </div>
        )
    }
    //直接修改状态
    handkeClick = () => {
        // this.state.myage = 18
        this.setState({
            myname: 'xiaoming',
            myage: '20000',
            datalist: [...this.state.datalist, this.refs.mytext.value]
        })
        console.log(this.state.myage, this.refs.mytext.value)
    }
}
// var arr = ['111', '222', '333']
// var newarr = arr.map(item => `<li>${item}</li>`)
// console.log(newarr)