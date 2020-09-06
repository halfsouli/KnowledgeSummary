// hook写法
import React, { useState, useEffect } from 'react'
import { PageHeader } from 'antd';
import axios from 'axios'
import store from '../../mobx/store'
//为preview 组件提供数据
const usePrebiewDate = (props)=>{
    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')
    const [category, setcategory] = useState([])
    useEffect(() => {
        axios.get(`articles/${props.match.params.myid}`).then(res => {
            console.log(res.data)
            let { title, category, content } = res.data
            settitle(title);
            setcontent(content);
            setcategory(category);
        })
        return () => {

        }
    }, [props])
    return {
        title,
        content,
        category
    }
}



export default function Prebiew(props) {
    let { title, content, category}= usePrebiewDate(props)
    return (        
        <div>         <PageHeader
            className="site-page-header"
            onBack={() => {
                props.history.goBack()
            }}
            title={title}
            subTitle={category}
        />
        
            <div style={{ padding: '24px' }} dangerouslySetInnerHTML={{ __html:content }}>
            </div>
        </div>
    )
}



// import React, { Component } from 'react'
// import { PageHeader } from 'antd';
// import axios from 'axios'
// import store from '../../mobx/store'
// export default class Prebiew extends Component {
//     state = {
//         title: '',
//         category: [],
//         content: '',
//     }
//     componentDidMount() {
//         console.log('love')
//         // 设置store的中布尔值
//         store.set('isshow',false)
//         console.log( this.props.match.params.myid)
//         axios.get(`/articles/${this.props.match.params.myid}`).then(res => {
//             console.log(res.data)
//             let { title, category, content}=res.data
//             this.setState({
//                 title,
//                 category,
//                 content
//             })
//         })

//     }
//     componentWillUnmount() {
//         console.log('leave')
//         store.set('isshow',true)
//     }

//     render() {
//         return (
//             <div>
//                 <PageHeader
//                     className="site-page-header"
//                     onBack={() => {
//                         this.props.history.goBack()
//                     }}
//                     title={this.state.title}
//                     subTitle={this.state.category.join('/')}
//                 />
//                 {/* 设置一个html代码片段 */}
//                 <div style={{ padding: '24px' }} dangerouslySetInnerHTML={{ __html: this.state.content}}>
//                 </div>
//             </div>
//         )
//     }
// }
