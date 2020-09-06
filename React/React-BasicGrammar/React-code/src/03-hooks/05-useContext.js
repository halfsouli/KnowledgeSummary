import React ,{useState,useReducer,useContext}from 'react'
import GlobalContext from './store/index' 
import reducer from './store/reducer'
import axios from 'axios'
const Child1=()=>{
    let { state, dispatch } = useContext(GlobalContext) //不需要
    return <div>
        child1-{state.text}<button onClick={()=>{
            dispatch({type:'Change_text',
            payload:'child1111111'
        })
        }}>click</button>
    </div>
}
const Child2= () => {
    let { state, dispatch } = useContext(GlobalContext) 
    return <div>
        child2-{state.text}<button onClick={()=>{
            axios.get("users").then(res=>{
            console.log(res.data)
                dispatch({
                    type: 'Change_list',
                    payload: res.data
                })
            })
        }}>click</button>
        {
            state.list.map(item =>
                <li key={item.id}>{item.username}</li>
            )
        }
    </div>
    
}

 const App=() =>{
     //表示reducer 传入初始值  代表reducer管理这些状态  返回的是新状态
     const [state, dispatch] = useReducer(reducer, {
         isShow: true,
         list: [],
         text: "我是公共的状态"
     })  //[公共的状态，改变公共状态的方法]
    return <GlobalContext.Provider value={{
            state,
            dispatch//对象简写
        }}> 
            <Child1/>
            <Child2/>
        </GlobalContext.Provider>
    
} 
export default App