import React, { Component } from 'react'
import './create.css'
import axios from 'axios'
import { PageHeader, Steps, Button, message, Form, Input, Cascader } from 'antd';
import RichEditor from './RichEditor'
const { Step } = Steps;
export default class Create extends Component {
    state = {
        current: 0,
        category: [],
        articlefrom: {},
        content: ''
    }
    componentDidMount() {
        axios.get("/categories").then(res => {
            console.log(res.data)
            this.setState({
                category: res.data
            })
        })
        axios.get(`/articles/${this.props.match.params.myid}`).then(res => {
            console.log(res.data)
            let { title, category, content } = res.data
            console.log(content)
            this.setState({
                articlefrom: {
                    title: title,
                    category: category
                },
                // 同步content。为了传给Rich
                content: content
            })
            this.refs.updateform.setFieldsValue({
                title, category
            })
        })

    }

    // antd 24栅格
    render() {
        const layout = {
            labelCol: { span: 4 },//laybel 宽度占几分
            wrapperCol: { span: 20 },//内容占几份
        }
        const steps = [
            {
                title: '基本信息',
            },
            {
                title: '文章内容',
            },
            {
                title: '提交文章',
            },
        ]
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        this.props.history.goBack()
                    }}
                    title="更新文章"
                    subTitle="八仙过海,各显其能"
                />
                {/* 步骤条 */}
                <Steps current={this.state.current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                {/* 步骤图对应的内容 */}
                <div className="steps-content" style={{ display: this.state.current === 0 ? 'block' : 'none' }}>
                    <Form
                        {...layout}
                        ref='updateform'
                        // layout="vertical"
                        name="form_in_modal2"
                        initialValues={this.state.articlefrom}
                    >
                        <Form.Item
                            name="title"
                            label="文章标题"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="文章分类"
                            rules={[{ required: true, message: 'Please input the category of collection!' }]}
                        >
                            <Cascader options={this.state.category}
                                fieldNames={{ label: 'title' }} placeholder="Please select" />
                        </Form.Item>
                    </Form>
                </div>
                <div className="steps-content" style={{ display: this.state.current === 1 ? 'block' : 'none', height: '500px', overflow: 'auto' }}>
                    {
                        this.state.content ? <RichEditor getContent={this.getContent} content={this.state.content}></RichEditor> : null
                    }

                </div>
                <div className="steps-content" style={{ display: this.state.current === 2 ? 'block' : 'none' }}>
                </div>
                <div className="steps-action">
                    {this.state.current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {this.state.current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')} onClick={this.handleSubmit}>
                            更新
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        )

    }
    getContent = (content) => {
        // console.log(content,'父组件')
        this.setState({
            content
        })
    }
    next() {

        if (this.state.current === 0) {
            // 触发表单校验
            this.refs.updateform.validateFields().then(values => {
                this.setState({
                    current: this.state.current + 1,
                    articleform: values
                })

            })
            return
        }
        this.setState({
            current: this.state.current + 1
        })
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    handleSubmit = () => {
        let { username, roleType } = JSON.parse(localStorage.getItem('users'))
        // console.log(this.state.articleform,this.state.content)
        axios.put(`articles/${this.props.match.params.myid}`, {
            ...this.state.articleform,
            content: this.state.content,
            author: username,
            roleType: roleType
        }).then(res => {
            message.success("您更新成功了！")
            // console.log(res.data)
            // 跳转到list页面
            this.props.history.push('/artic-manege/list')
        })
    }
}

