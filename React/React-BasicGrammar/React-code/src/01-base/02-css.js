import React, { Component } from 'react'
import './css/index.css'
    class App extends Component {
        render() {
            var myname = 'kerwin' //不是状态
            var stylyobj = {
                background: 'red',
                fontSize: '30px'
            }
            //将来 生命周期
            return (
                <div>
                    {10 + 20}--{myname}
                    {10 > 20 ? 1 : 0}
                    {/* 多行注释   */}
                    <div style={stylyobj}>111111</div>
                    <div style={{ background: 'yellow' }}>111111</div>
                    <div className='active' >33333</div>
                    <div id='box' >33333</div>
                </div>
            )
        }
    }
    // 16版本之前 class 不支持  必须写成className
    // 16版本之后 class支持 ，但是会报警告
export default App