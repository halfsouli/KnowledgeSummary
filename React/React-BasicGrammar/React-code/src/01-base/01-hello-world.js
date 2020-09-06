    //定义第一个组件
    import React from 'react'
    import { Component} from 'react'
    // 1-class 类式组件
    // 继承组件类
    class Hello extends Component {
        render() {
            //将来 生命周期
            return (
                <div>111111
                <ul>
                    <li>1111</li>
                    <li>2222</li>
                        <Child1/>
                        <Child2/>
                        <Child3/>
                </ul>
                </div>
            )
        }
    }
    //Component ===>React.Component  下面的 可以直接被引入
    class Child1 extends Component{
        render(){
            return <div>child1</div>
        }
    }
    // 2-function 函数式组件  
    // 并不是后面要讲的Hooks
    // React16.8 之前， 函数式组件不支持状态
    // React16.8 之后， React Hooks 支持状态和属性

    function Child2(){
        return  (<div>child2
            <span>22222</span>
        </div>)
        
    }

    const Child3=()=><div>child3</div>

    export default Hello