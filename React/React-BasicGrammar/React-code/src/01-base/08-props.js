import React, { Component } from 'react'
import MyPropTypes from 'prop-types' //提供验证数据类型的方法
class Navbar extends Component {
    static  propTypes = {
    myshow: MyPropTypes.bool
}
// 默认属性
    static defaultProps = {
        myshow: true
    }
    render() {
        return <div>
            <button>right</button>
            Navbar-{this.props.mytitle}
            
            {
                this.props.myshow?<button>left</button>:null
                }
        </div>
    }
}
// 必须交给MyPropTypes模块方法进行处理验证
// Navbar.propTypes={
//     myshow: MyPropTypes.bool
// }
console.log(MyPropTypes)
export default class App extends Component {
    render() {
        var obj={
            mytitle:'测试',
            myshow:false
        }
        return (
            <div>
                <Navbar mytitle='home' myshow={false}></Navbar>
                <Navbar mytitle='list' myshow={true}></Navbar>
                <Navbar mytitle='shopcar' myshow={true}></Navbar>
                <Navbar {...obj}></Navbar>
            </div>
        )   
    }
}
// ?属性验证
class Test{
    static a='类属性'
  a='对象属性' //等价于上面的写法，类属性
}
Test.a='类属性'
console.log(Test.a)//类属性
console.log(new Test().a)//对象属性  在对象定义的方法 必须创建实例之后才可以获取到该对象属性