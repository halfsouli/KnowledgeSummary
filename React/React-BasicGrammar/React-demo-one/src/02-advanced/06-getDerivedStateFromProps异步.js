import React, { Component } from 'react'
class List extends Component {
    state = {
        myid: '222'
    }
    componentDidMount() {
        console.log('发ajax', this.state.myid)
    }
    // componentWillReceiveProps() {
    //     console.log('发ajax')
    // }
    static getDerivedStateFromProps(nextprops, state) {
        // return null
        console.log('getDerivedStateFromProps','获取到id值', nextprops.id)
        return {
            myid:  nextprops.id
            // myid: '/maizuo/'+nextprops
        }
    }
    render() {
        return (
            <div>
                {this.state.myid}
            </div>
        )
    }
    componentDidUpdate() {
        console.log('componentDidUpdate',"发ajax", this.state.myid)
    }
}
export default class App extends Component {
    state = {
        id: 0,
        name:'1111'
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.id}
                    <li onClick={() => {
                        this.setState({
                            id: 8,
                            name: '2222'
                        })
                    }} >
                        衣服
                    </li>
                    <li onClick={() => {
                        this.setState({
                            id: 1
                        })
                    }}>
                        帽子
                    </li>
                    <li onClick={() => {
                        this.setState({
                            id: 2
                        })
                    }}>
                        裤子
                    </li>
                </ul>
                <List id={this.state.id} name={this.state.name}></List>
            </div>
        )
    }
}
