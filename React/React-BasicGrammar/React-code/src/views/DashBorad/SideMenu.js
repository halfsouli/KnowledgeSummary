import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom' //声明式导航
import meuns from '../../router/menu'
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router' //路由
import { connect } from 'react-redux'
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component {
    state = {
        theme: 'dark',
        current: '1',
    };
    render() {
        var pathname = this.props.location.pathname
        var openKeys = ["/" + pathname.split('/')[1]]
        var selectedKeys = [pathname]
        // console.log(pathname)
        return (
            <Sider trigger={null} collapsible collapsed={this.props.iscollapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline"
                    onClick={this.handleClick}
                    defaultOpenKeys={openKeys}
                    selectedKeys={selectedKeys}
                >
                    {/* defaultSelectedKeys={selectedKeys}只有组件创建第一次才会生效  更新不生效 */}
                    {this.renderItem(meuns)}
                </Menu>
            </Sider>
        )
    }
    handleClick = (obj) => {
        // console.log(111)
        // console.log(this.props.history)
        // 跳转路由 父亲是被路由包裹的 父组件dashborad 传过来的history属性
        this.props.history.push(obj.key)
    }
    renderItem = (meuns) => {
        console.log(meuns)
        var roleType = JSON.parse(localStorage.getItem("users")).roleType
        return meuns.map(items => {
            if (items.children) {
                // 如果权限大于登录角色权限 则返回null  下面的不会再指向
                if (items.permission > roleType) {
                    return null
                }
                return (
                    <SubMenu
                        key={items.path}
                        title={
                            <span>
                                <items.icon />
                                <span >{items.title}</span>
                            </span>
                        }
                    >
                        {
                            this.renderItem(items.children)
                        }
                    </SubMenu>
                )
            } else {
                if (items.permission > roleType) {
                    return null
                }
                return (
                    <Menu.Item key={items.path} >
                        <items.icon />
                        <span>{items.title}</span>
                    </Menu.Item>
                )
            }
        }

        )
    }
}
const mapStateTopprops=(state)=>{
    return {
        iscollapsed:state.iscollapsed
    }//约定isCollapsed 属性
}
export default withRouter(connect(mapStateTopprops)(SideMenu))
// withRouter 高阶组件，获取低阶组件，生成高阶组件 会有this.props 下面等属性