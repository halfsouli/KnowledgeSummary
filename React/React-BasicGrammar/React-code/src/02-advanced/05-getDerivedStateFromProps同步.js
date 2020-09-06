import React, { Component } from 'react'
class Title extends Component{
    state={
        myname:'kerwin'
    }
   
// componentWillMount() { //问题  会重复执行多次
//     document.title=this.props.mytitle
// }
// componentWillReceiveProps(nextProps){
//     document.title = nextProps.mytitle
// }
 // 1.可以改老状态 
//  2.初始化 或者更新  都可以拿到父组件更新的属性
        // 必须static 不能用this 返回 会把状态改成返回值
        // 如果对状态不满意  可以进行修改
    // static getDerivedStateFromProps(nextprops, state) {
    //     // return null
    //     console.log( nextprops, state)
    //     return {
    //         myname: state.myname.substring(0,1).toUpperCase()
    //         // myid: '/maizuo/'+nextprops
    //     }
    // }
    // 父传子会更新  每次点完也会执行
    static getDerivedStateFromProps(nextprops, state) {
        document.title = nextprops.mytitle
        console.log(nextprops, state)
        return null
        // console.log(nextprops, state)
        // return {
        //     myname: state.myname.substring(0, 1).toUpperCase()
        //     // myid: '/maizuo/'+nextprops
        // }
    }
render(){
return <div>{this.state.myname}</div>
}

}
export default class App extends Component {
    state = {
        text:'默认'
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.id}
                    <li onClick={() => {
                        this.setState({
                            text: '11111',
                        })
                    }} >
                        111111
                    </li>
                    <li onClick={() => {
                        this.setState({
                            text: '222222'
                        })
                    }}>
                        2222222
                    </li>
                    <li onClick={() => {
                        this.setState({
                            text: '33333'
                        })
                    }}>
                        333333
                    </li>
                </ul>
               <Title mytitle={this.state.text}/> 
            </div>
        )
    }
}
