import React, { Component } from 'react'
import axios from 'axios'
import { Table, Switch, Button, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;
export default class User extends Component {

    swichonChange = (checked, item) => {
       
        axios.put(`/users/${item.id}`,{
            ...item, roleState: checked
        }).then(res => {
            // console.log(res.data)
            // // this.setState({
            // //     datalist: res.data
            // // })
        })
    }
    componentDidMount() {
        axios.get("/users").then(res => {
            this.setState({
                datalist: res.data
            })
        })
    }
    state = {
        formdata: null,
        roleType: 1,//记录选中roleType值
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '用户状态', dataIndex: 'roleState', key: 'title',
                render: (data, item) => {
                    // console.log(item)
                    return <Switch defaultChecked={data} disabled={item.default} onChange={(checked) => this.swichonChange(checked, item)} />
                }
            },
            {
                title: '操作', dataIndex: '', key: 'x',
                render: (item) =>
                    <div> <Button type="primary" shape="circle" disabled={item.default} onClick={() => this.handleUpdateClick(item.id)} icon={<EditOutlined />} />
                    &nbsp;
                        <Button type="danger" shape="circle" disabled={item.default} onClick={() => this.handleDelClick(item.id)} icon={<DeleteOutlined />} />
                    </div>

            },
        ],
        datalist: [],
        visible: false,
        visibleUpdata: false,


    }
    // 更新按钮
    handleUpdateClick = (id) => {
        // model 动态创建的--所以直接拿ref拿不到，
        // 1.model提前创建出来，然后影藏，需要的时候再显示
        // 2.设置一个状态，让状态更新，渲染from表单时候传入
        // 异步更新 还没有创建出来 
        var formdata = this.state.datalist.filter(item => item.id === id)
        // console.log(formdata[0])
        this.setState({
            formdata: formdata[0] , //初始化生效的时候赋值
            visibleUpdata: true,
            roleType: formdata[0].roleType
        })
        let { username, password, roleName } = formdata[0]
        this.refs.updateform && this.refs.updateform.setFieldsValue({
            username,
            password,
            roleName,
        })

    }
    // 删除处理
    handleDelClick = (id) => {
        axios.delete(`/users/${id}`).then(res => {
            this.setState({
                datalist: this.state.datalist.filter(item => item.id !== id) //让视图改变
            })
        })
        console.log(id)
    }
    // 添加用户
    handleAdd = () => {
        this.setState({
            visible: true,
        });
    }
    // 点击ok处理
    handleOk = () => {
        console.log(2222)
        // console.log('ok', this.refs.addform);
        // 从ref中直接获取到原生的校验方法
        this.refs.addform.validateFields().then(values => {
            this.refs.addform.resetFields() //重置 让
            console.log({ ...values, roleType: this.state.roleType, roleState: false })
            axios.post("/users", { ...values, roleType: this.state.roleType, roleState: false }).then(res => {
                console.log(res.data)
                // 重新设置datalist,隐藏对话框
                this.setState({
                    datalist: [...this.state.datalist, res.data],
                    visible: false,
                })
            })
        }).catch(info => {
            console.log('validate Failed:', info);
        })
    }
    // 更新处理
    handleUpdataOk = () => {
        console.log(1111)
        console.log(this.state.formdata)
        this.refs.updateform.validateFields().then(value=>{
            console.log(value,this.state.roleType)
            axios.put(`/users/${this.state.formdata.id}`, {
                ...this.state.formdata,
                ...value, roleType: this.state.roleType,
            }).then(res=>{
                var newlist=this.state.datalist.map(item=>{
                    if(item.id===this.state.formdata.id){
                        return res.data
                    }else{
                        return item
                    }
                })
                console.log(res.data)
                this.setState({
                    visibleUpdata: false,
                    datalist: newlist
                })
            })
        })
        
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.handleAdd}>添加用户</Button>
                <Modal
                    title="添加用户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                >
                    <Form
                        ref='addform'
                        layout="vertical"
                        name="form_in_modal"
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the username of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the password of collection!' }]}
                        >
                            <Input type='password' />
                        </Form.Item>
                        <Form.Item
                            name="roleName"
                            label="角色"
                            rules={[{ required: true, message: 'Please input the roleName of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="请选择一个角色"
                                optionFilterProp="children"
                                onChange={this.onChange}
                            // onFocus={this.onFocus}
                            // onBlur={this.onBlur}
                            // onSearch={this.onSearch}
                            // filterOption={(input, option) =>
                            //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            // }
                            >
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="管理员">管理员</Option>
                                <Option value="小编">小编</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* 更新状态框 */}
                <Modal
                    title="更新用户"
                    visible={this.state.visibleUpdata}
                    onOk={this.handleUpdataOk}
                    onCancel={() => {
                        this.setState({
                            visibleUpdata: false,
                        });
                    }}
                >
                    <Form
                        ref='updateform'
                        layout="vertical"
                        name="form_in_modal1"
                        initialValues={this.state.formdata}
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the username of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the password of collection!' }]}
                        >
                            <Input type='password' />
                        </Form.Item>
                        <Form.Item
                            name="roleName"
                            label="角色"
                            rules={[{ required: true, message: 'Please input the roleName of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="请选择一个角色"
                                optionFilterProp="children"
                                onChange={this.onChange}
                            >
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="管理员">管理员</Option>
                                <Option value="小编">小编</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>


                <Table columns={this.state.columns}
                    dataSource={this.state.datalist}
                    rowKey={item => item.id}
                ></Table>
            </div >
        )
    }
    onChange = (data) => {
        // console.log(data,'根据不同的角色名字，设置好对应的值')
        var arr = ["小编", '管理员', "超级管理员"]
        var roleType = arr.indexOf(data) + 1 //按照顺序得到对应的数字 arr.indexOf(data)  返回的是下标
        // console.log(roleType)
        this.setState({
            roleType
        }) //roleType字段的计算
    }

}
