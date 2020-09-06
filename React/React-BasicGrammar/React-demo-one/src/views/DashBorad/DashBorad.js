import React, { Component } from 'react'
import Manage from '../rightmanage/Manage'
import Right from '../rightmanage/Right'
import Role from '../rightmanage/Role'
import Notfind from '../error/Error'
import Home from '../home/Home'
import User from '../usermanage/User'
import './DashBorad.css';
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'

import {
    Route,
    Redirect,//重定向
    Switch//匹配到第一个符合条件路径的组件，就停止了
} from 'react-router-dom'
import List from '../artic-manage/List'
import Prebiew from '../artic-manage/Prebiew'
import { Layout } from 'antd';
import Create from '../artic-manage/Create'
import Updata from '../artic-manage/Updata'
import store from '../../mobx/store'
import {  autorun } from 'mobx'
const {  Content } = Layout;
export default class DashBorad extends Component {
    state={
        code:''
    }
    componentDidMount() {
        this.cancel=autorun(() => {
            this.setState({
                code: store.get('isshow')
            })
            // console.log(store.get())
        })
    }
    componentWillUnmount() {
        this.cancel()//取消观察
    }
    
    render() {
        var roleType = JSON.parse(localStorage.getItem("users")).roleType
        return (
            <Layout style={{height:'100%'}}>
                <SideMenu kerwinhitory={this.props.history}></SideMenu>
                <Layout className="site-layout">
                   {
                        this.state.code ? <TopHeader></TopHeader>:null
                   } 
                    
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 'auto',
                        }}
                    >
                        <Switch>
                            {/* 首页 */}
                            <Route path='/home' component={Home} />
                            {/* 用户管理-用户列表 */}
                            {
                                roleType === 3 ? <Route path='/user-manage/users' component={User} />:null
                            }
                            
                            {/* 文章管理 */}
                            <Route path='/artic-manege/list' component={List} />
                            <Route path='/artic-manege/preview/:myid' component={Prebiew} />
                            <Route path='/artic-manege/create' component={Create} />
                            <Route path='/artic-manege/updata/:myid' component={Updata} />

                            {/* 权限管理 */}
                            {
                                roleType === 3 ? <Route path='/right-manage' render={(props) =>
                                    (<Manage {...props} name='kerwin'>
                                        <Switch>
                                            <Route path='/right-manage/rights' component={Right} />
                                            <Route path='/right-manage/roles' component={Role} />
                                            <Redirect from='/right-manage' to='/right-manage/roles' />
                                        </Switch>
                                    </Manage>)
                                } />:null
                            }   

                            {/* 重定向 */}
                            <Redirect from='/' to='/home' exact />
                            <Route path='*' component={Notfind} />

                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
