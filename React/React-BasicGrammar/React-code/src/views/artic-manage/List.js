import React, { Component } from 'react'
import axios from 'axios'
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined,LaptopOutlined  } from '@ant-design/icons';
export default class List extends Component {
    state={
        datalist:['1111','2222','33333'],
        columns: [{ title: '文章标题', dataIndex: 'title', key: 'title' },
            {
                title: '文章作者',
                dataIndex: 'author',
                key: 'author'
            },{
                title: '文章类别',
                dataIndex: 'category',
                key: 'category',
            render:(item)=><div>{item.join("/")}</div>
            }, {
                title: '操作', dataIndex: '', key: 'x',
                render: (item) =>
                  
                  <div> 
                        <Button shape="circle" disabled={item.default} onClick={() => this.handlePreviewClick(item.id)} icon={<LaptopOutlined />}/>
                      <Button type="primary" shape="circle" disabled={item.default} onClick={() => this.handleUpdateClick(item.id)} icon={<EditOutlined />} />
                    &nbsp;
                        <Button type="danger" shape="circle" disabled={item.default} onClick={() => this.handleDelClick(item.id)} icon={<DeleteOutlined />} />
                    </div>

            }],
        datalist: [],
    }
    componentDidMount() {
        var username=JSON.parse(localStorage.getItem('users')).username
        axios.get(`/articles?author=${username}`).then(res=>{
            this.setState({
                datalist:res.data
            })
        })
    }
    // 删除函数
    handleDelClick=(id)=>{
        axios.delete(`articles/${id}`).then(res=>{
            // 同步修改datalist状态
            this.setState({
                datalist:this.state.datalist.filter(item=>item.id!==id)
            })
        })
    }
    // 更新
    handleUpdateClick=(id)=>{
        this.props.history.push(`/artic-manege/updata/${id}`)
    }
    render() {
        return (
            <div>
                <Button onClick={this.changePage}>添加文章</Button>
                <Table columns={this.state.columns}
                    dataSource={this.state.datalist}
                    rowKey={item => item.id}
                ></Table>
            </div>
        )
    }
    // 跳转到create路由
    changePage=()=>{
        this.props.history.push("/artic-manege/create")
    }
    handlePreviewClick = (id)=>{
        this.props.history.push(`/artic-manege/preview/${id}`)
    }
    componentWillUnmount() {
        this.setState=()=>{console.log('setstate,被hack了')}
        console.log('列表销毁','取消ajax')
    }
    
}
