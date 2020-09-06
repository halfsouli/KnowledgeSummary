//just Component 万物皆组件，把所有路由模块，重定向都做成了组件
// react-router-dom 4.5 版本写法一致
import {
    BrowserRouter as Router, //路由外层需要包裹的组件  hash模式
    // BrowserRouter(后端配置 history 模式)
    Route,//每个路由组件都需要此组件
    Switch,//匹配到第一个符合条件路径的组件，就停止了
    Redirect
} from 'react-router-dom'
import React from 'react'
import Login from '../views/login/Login'
import DashBorad from '../views/DashBorad/DashBorad'

// class BlogRouter extends Comment{

// }
// 函数式组件
const BlogRouter = () => (
    <Router>
        <Switch>    
            <Route path='/login' component={Login} />
            {/* {
                localStorage.getItem('isLogin')==='true' ? <Route path='/' component={DashBorad} /> :<Redirect  to='/login' />
            } */}
            <Route path='/' render={() =>
                (localStorage.getItem('isLogin') === 'true' ? <DashBorad></DashBorad> : <Redirect to='/login' />)}/>
        </Switch>
    </Router>
)
export default BlogRouter