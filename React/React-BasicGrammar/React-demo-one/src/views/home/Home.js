import React, { Component } from 'react'
import axios  from  'axios'
import { Button } from 'antd';
import {observable,autorun} from 'mobx'
import echarts from 'echarts'
import _ from 'lodash'//是一个一致性、模块化、高性能的 JavaScript 实用工具库
const store=observable.box(true) //可观察的对象
// 观察对象改变之后。这个方法就会被执行
autorun(()=>{
    console.log('ppppppppp')
})
// setTimeout(()=>{
//     store.set(false)
// },2000)
// setTimeout(() => {
//     store.set(true)
// }, 5000)
export default class Home extends Component {
    state={
        word:'11111',
        articles:''
    }
    globalEcharts=null
    render() {
        return (
            <div>
                <Button onClick={this.handleLine.bind(this)}>柱状图</Button>
                <Button onClick={this.handlePieEchart}>饼状图</Button>
                <div ref="mychart" style={{width:"100%",height:"400px"}}></div>
            </div>
        )
    }
    initEchart(articles){
        console.log(this.refs.mychart.clientWidth);
            // 基于准备好的dom，初始化echarts实例
            this.globalEcharts = echarts.init(this.refs.mychart);
            // 指定图表的配置项和数据

            //做数据处理
            //1.自己写方法来处理map，数组去重
            //2.lodash 高性能的js处理方法
        this.handleLine()
        
    }
    componentDidMount() {
        axios.get("/articles").then(res=>{
            console.log(res.data)
            this.setState({
                articles:res.data
            })
            this.initEchart()
        })
       
        window.onresize=()=>{
            this.globalEcharts.resize()
        }
        // axios.get('/myname/ajax/mostExpected?ci=1&limit=10&offset=0&token=&optimus_uuid=B9BA30204E3D11EA99290F4E22C608ED4828A377D64844CAAC587D1CD61A8E95&optimus_risk_level=71&optimus_code=10').then(res=>{
        //     console.log(res.data,'1111111')
        // })
    }
    componentWillUnmount() {
        window.onresize =null
    }
    handleLine=()=>{
        this.globalEcharts.clear()
        let newobj = _.groupBy(this.state.articles, "author")
        console.log(Object.keys(newobj), 11111)
        var option = {
            title: {
                text: '各用户发布文章统计'
            },
            tooltip: {},
            legend: {
                data: ['文章量']
            },
            xAxis: {
                data: Object.keys(newobj)
            },
            yAxis: {
                minInterval: 1
            },
            series: [{
                name: '文章量',
                type: 'bar',
                data: Object.values(newobj).map(item => item.length),
                itemStyle: {
                    color: function (params) {
                        var colorList = ['#c23531', '#2f4554', '#61a0a8']
                        return colorList[params.dataIndex]
                    }
                }
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.globalEcharts.setOption(option);
    }
    handlePieEchart = () =>{
        this.globalEcharts.clear()
        let newobj = _.groupBy(this.state.articles, "author")
        let newarr=[]
        for(let i in newobj){
            console.log(i.newobj)
            newarr.push({
                name:i,
                value: newobj[i].length
            })
        }
        console.log(newarr)
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    name: '作者文章统计',
                    type: 'pie',
                    radius: '55%',
                    data: newarr,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        this.globalEcharts.setOption(option);
    }
     
}
