import React, { Component } from 'react'
class Show extends Component{
    render(){
        return (
            <div>
                显示区
                <ul className='display'>
                        <li>
                            <p>测试内容</p>
                            <p>时间</p>
                        <p><button>回复</button><button>删除</button></p>
                        </li>

                </ul>
            </div>
        )
    }
}
class Commit extends Component {
    state={
        word:''
    }
    render() {
        return (
            <div className='commit'>
                提交区
                <textarea onChange={(evt)=>{
                    this.setState({
                        word: evt.target.value
                    })
                }} className='eara' ></textarea>
                <button onClick={()=>this.handClick()}>提交内容</button>
            </div>
        )
    }
    handClick(){
        // console.log(this.state.word,new Date())
        fetch(`http://localhost:1911/users/liuadd?question=${this.state.word}&time=${new Date()}`).then(res => {
            return res.json()
        }).then(res => { 
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log('ajax异步请求')
        // fetch('http://localhost:1911/users/liuadd?name=1111').then(res => {
        //     return res.json()
        // }).then(res => { 
        //     console.log(res.data)
        // }).catch(err => {
        //     console.log(err)
        // })
    }
    
}


export default class App extends Component {
    render() {
        return (
            <div className='bigbox'>
                <Commit/>
                <Show/>
            </div>
        )
    }
}
