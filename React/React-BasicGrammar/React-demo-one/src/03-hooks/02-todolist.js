
import React, { useState, useRef }from 'react'

export default function Todolist() {
    const [text, settext] = useState("")
    const [list, setlist] = useState([])
    const mytext = useRef(null)
    const handleDeleClick=(index)=>{
        console.log(index)
        var newlist=[...list]
        newlist.splice(index,1)
        setlist(newlist)
    }
    console.log('111')
    return (
        <div>
            <input type='text' onChange={(ev)=>{
                settext(ev.target.value)
            }}  ref={mytext} value={text}/>
            {text}
            <button onClick={()=>{
                setlist([...list,text])//添加数组
                settext('')
                // console.log(mytext.current.value)
            }}>add</button>
            {
                list.map((item, index) => <li key={item}>{item}<button onClick={() => handleDeleClick(index)}>dele</button></li>)
            }
        </div>
    )
}
