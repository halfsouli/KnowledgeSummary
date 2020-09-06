import React, { Component } from 'react'
import { Table, Tag } from 'antd';
import axios from 'axios'
import { connect } from 'react-redux';
 class Right extends Component {
    state = {
        columns: [{
            title: '#',
            dataIndex: 'id', //对应原始数据中属性值
            key: 'id',
        }, {
            title: '权限名称',
            dataIndex: 'title', //对应原始数据中属性值
            key: 'title',
        },
        {
            title: '权限等级',
            dataIndex: 'grade',
            key: 'grade',
            render: item => {
                var arr = ['green', 'orange', 'red']
                return <Tag color={arr[item - 1]}>{item}</Tag>
            }
        },
        ],
    }
   
    componentDidMount() {
        if (this.props.datalist.length == 0) {
           this.props.setList()
        } 
    }

    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.props.datalist} pagination={{ pageSize: 5 }} />
        )
    }
}
const mapStateToprops = (state) => {
    return {
        datalist:state.rightList
    }
} //state 映射成属性用
const mapDispathToProps = {
    setList : () => {
        // 返回一个promise对象
        return axios.get("/rights").then(res => {
            // 自己决定什么时候发送
            return {
                type: 'setRightsList',
                payload: res.data
            }
        })
    }
  }

// } //把方法映射成属性用
export default connect(mapStateToprops,mapDispathToProps)(Right)
