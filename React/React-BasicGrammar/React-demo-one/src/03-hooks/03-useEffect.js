import React, { useState,useEffect}from 'react'

const Child=()=>{
    useEffect(() => {
        var id=setInterval(() => {
            console.log(111)
        }, 1000);
        console.log('创建')
        return () => {
            // cleanu
            clearInterval(id)
            console.log('销毁')
        }
    }, [ ])
    return <div>
        Child
    </div>
}
const App=()=>{
const [text, settext] = useState('1111')
const [age, setage] = useState('100')
    //useEffect(处理函数，[依赖]}) 副作用
    // 传空数组，相当于cdm
    // [text] 只有text改变的时候 才会执行一次
    // 第二个参数不穿 代表任何状态改变，都会重新执行
    useEffect(()=>{
        console.log('创建或更新')
        // window.onscroll=
    },[age])
    return <div>
        app-{text}<button onClick={()=>{
            settext('22222')
        }}>click-text</button>
        {age}
        <button onClick={()=>{
            setage('18')
        }} >click-age</button>
        {
            age === '100' ? <Child />:null
        }
   
    </div>
}


export default App
