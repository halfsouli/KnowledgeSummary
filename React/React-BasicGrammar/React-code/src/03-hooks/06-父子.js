//父子通信，靠属性
// 父 子 属性
// 子->父 属性 callback(属性传过去一个回调函数)
import React, { useState } from 'react'

const Navbar = (props)=>{
    return <div>
        Navbar-{props.myname}
        <button onClick={()=>{
            props.onEvent()
        }}>click</button>
    </div>
}
const Sidebar = () => {
    return <div>
        Sidebar
        <ul>
            <li>333</li>
            <li>222</li>
            <li>111</li>
        </ul>
    </div>
}

const Child = (props)=>{
    return <div>
        child--{props.children}
    </div>
}
export default function App() {
    const [show,setshow]=useState(false)
    return (
        <div>
            <Navbar myname='测试抽屉'  onEvent={()=>{
                setshow(!show)
            }}/>
            {
                show ? <Sidebar />:null
            }
             {/* 插槽 */}
            <Child>
                <li>11111</li>
                <li>222222</li>
            </Child>
        </div>
    )
}
