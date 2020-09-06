import React, { Component } from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
// import { Route} from 'react-router-dom'
// import Right from './Right'
// import Role from './Role'
export default class Manage extends Component {
    callback = (key) => {
        // console.log(key,this.props);
        this.props.history.push(key)
    }
    render() {
        // console.log(this.props.location.pathname)
        return (
            <div>
                <Tabs activeKey={this.props.location.pathname} onChange={this.callback}>
                    <TabPane tab="角色列表" key="/right-manage/roles">
    </TabPane>
                    <TabPane tab="权限列表" key="/right-manage/rights">
                      
    </TabPane>
                </Tabs>,
                {this.props.children}
            </div>
        )
    }
}
