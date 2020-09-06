import React, { Component } from 'react'
import { Layout } from 'antd';
import { Menu, Dropdown, Avatar} from 'antd';
import { withRouter} from 'react-router'
import { connect } from 'react-redux'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import './DashBorad.css';
const { Header } = Layout;
class TopHeader extends Component {
    state = {
        collapsed: false,
        path:''
    };
    exit = () => {
        // console.log('11111')
        localStorage.setItem('isLogin', false)
        localStorage.setItem('users', {})
        // 重定向
        this.props.history.push('/login')
    }   
    toggle = (iscollapsed) => {
        this.props.actionCreator(iscollapsed)
        // 发布者
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    openCareme=()=>{
        // window.plus
        var cmr = window.plus.camera.getCamera();
        var res = cmr.supportedImageResolutions[0];
        var fmt = cmr.supportedImageFormats[0];
        console.log("Resolution: " + res + ", Format: " + fmt);
        cmr.captureImage(function (path) {
            alert("Capture image success: " + path);
            var absolutePath=window.plus.io.convertLocalFileSystemURL(path)
            alert('newPath:'+path)
            this.setState({
                path: absolutePath
            })
        },
            function (error) {
                alert("Capture image failed: " + error.message);
            },
            { resolution: res, format: fmt }
        );
    }
    render() {
        var roleName=JSON.parse(localStorage.getItem("users")).roleName
        var userName=JSON.parse(localStorage.getItem("users")).username
        const menu = (<Menu>
            <Menu.Item>
                <span onClick={this.openCareme}>{roleName}</span>
            </Menu.Item>
            <Menu.Item>
                <div onClick={this.exit}>退出</div>
            </Menu.Item>
        </Menu>)
      
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggle,
                    })} */}
                {
                    this.state.collapsed ? <MenuUnfoldOutlined className='triggi' onClick={()=>this.toggle(false)
                    } /> : <MenuFoldOutlined className='triggi' onClick={() =>this.toggle(true)} />
                }
                <div style={{float:'right',margin:'0px 40px'}}>
                    <span>欢迎回来 {userName}</span>
                <Dropdown overlay={menu} >
                    {/* <Avatar size={32} icon={<UserOutlined />} />
                     */}
                     <img src={this.setState.path} style={{width:'40px',height:'40px',borderRadius:"50%"}} />
                </Dropdown>
                </div>
            </Header>
        )
    }
  
}
const mapStateToprops=()=>{
return {

}
} //state 映射成属性用
const mapDispathToProps={
  actionCreator:(iscollapsed)=>{
        // ajax请求数据 动态计算action
        return {
            type: 'sideMenuShow',
            payload: iscollapsed
        }
    }

} //把方法映射成属性用
// 第一个参数是商量好的那个属性传给孩子
// 第二个参数
export default withRouter(connect(mapStateToprops,mapDispathToProps)(TopHeader))