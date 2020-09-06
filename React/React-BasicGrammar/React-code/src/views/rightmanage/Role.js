import React, { Component } from 'react'
import axios from 'axios'
import { Table, Button, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
class Role extends Component {
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'title' },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: () => <div> <Button type="primary" shape="circle" disabled icon={<SearchOutlined />} /></div>,
            },
        ],
    }
    componentDidMount() {
        if (this.props.datalist.length == 0) {
            //发ajax
            this.props.actionCreater()
        } 
    }

    render() {
        return (
            <Table
                columns={this.state.columns}
                dataSource={this.props.datalist}
                rowKey={item => {
                    // console.log(item)
                    return item.id
                }}//设置key值
                // 展开
                expandable={{
                    expandedRowRender: record => {
                        return <div style={{ margin: 0 }}>

                            {
                                record.roleRight.map(item =>
                                    <div key={item.category}>
                                        <h4>{item.category}</h4>
                                        {item.list.map(data =>
                                            <Tag color='green' key={data}>{data}</Tag>
                                        )}</div>
                                )
                            }
                        </div>
                    },
                    // rowExpandable: record => true
                }}
            />
        )
    }
}
const mapStateToprops = (state) => {
    return {
        datalist: state.roleList
    }
} //state 映射成属性用
//会自动传递给redux
const mapDispathToProps = {
    actionCreater : () => {
        // middleware  解决异步处理redux-thunk redux-promise
        return (dispatch) => {
            axios.get("/roles").then(res => {
                // 自己决定什么时候发送
                dispatch({
                    type: 'setRoleList',
                    payload: res.data
                })
            })
        }
    }
}
export default connect(mapStateToprops, mapDispathToProps)(Role)