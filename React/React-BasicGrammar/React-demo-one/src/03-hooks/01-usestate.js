// rcc=>
import React,{useState}from 'react'

export default function App() {
    const [name, setName] = useState('kerwin')//初始值[状态，改变状态的方法]
    const [age, setAge] = useState('12')//初始值[状态，改变状态的方法]
    return (
        <div>
            app-{name}-{age}
            <button onClick={()=>{
                setName('xiaoming')
                setAge('18')
            }}>click</button>
        </div>
    )
}
