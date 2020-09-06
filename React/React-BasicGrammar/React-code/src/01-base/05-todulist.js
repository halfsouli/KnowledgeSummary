import React, { Component } from 'react'

export default class Todulist extends Component {
    state = {
        datalist: ['1111', '222', '3333'],
        mytext: ''
    }
    render() {
        return (
            <div>
                <input  value={this.state.mytext} type="test" onChange={(evt) => {
                    this.setState({
                        mytext: evt.target.value
                    })
                    // console.log(evt.target.value)
                }} ref='values' />
                <button onClick={this.handleAdd}>add</button>
                <ul>
                    {
                        this.state.datalist.map((item,index) => <li key={item}>{item}
                            <button onClick={() => this.handleDeleClick(index)}>delete</button>
                        </li>)
                    }
                </ul>
            </div>
        )
    }
    handleAdd = () => {
        this.setState({
            datalist: [...this.state.datalist, this.state.mytext],
            mytext:''
        })
        // this.refs.values.value=''
        // console.log(this.state.mytext, this.refs.values.value)
    }
    handleDeleClick = (index) => {
        // 引用赋值 ，浅赋值
        // let newlist = this.state.datalist
        // 深复制
        // let newlist=this.state.datalist.slice()
        let newlist = [...this.state.datalist]
       
        newlist.splice(index,1)
         // 注意 返回的是删除的项  原数组改变 所以赋值原数组
        console.log(newlist)
        // console.log(newlist.splice(index, 1))
        this.setState({
            // datalist: [...this.state.datalist].splice(index,2)
            datalist: newlist
        })
    }
}
