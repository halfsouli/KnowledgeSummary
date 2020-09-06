//16.2 版本之前 -老的生命周期
// 16.2 版本之后-删了之前三个生命周期 ，换成了 新的生命周期  ?
import React, { Component } from 'react'

export default class App extends Component {
    state={
        list:[]
    }
    //beforeMount
    UNSAFE_componentWillMount(){
        console.log('componentWillMount','ajax',)
    }
    //mounted
    componentDidMount() {
        console.log('componentDidMount', 'ajax 绑定')
        fetch("/test.json").then(res=>res.json()).then(res=>{
            console.log(res.data)
            this.setState({
                list: res.data.films
            })
        })
    }
    render() {
        console.log('render')
        return (
            <div>
                {
                    this.state.list.map(item=>
                        <li key={item.filmId}>
                            <img src={item.poster}/>
                            {item.name}
                        </li>
                        )
                }
            </div>
        )
    }
}
