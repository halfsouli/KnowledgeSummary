# React 基础教程和实战
<a name="SL7hu"></a>
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25e2d59e76234f2d82345da450c9ad84~tplv-k3u1fbpfcp-zoom-1.image)
<a name="zlP6z"></a>
# 环境搭建
```javascript
npm install -g create-react-app //安装工具
create-react-app + 项目名称 //创建项目
npm start //启动项目
```
<a name="Pco1C"></a>
# 设计思想
 在React的官方博客中明确阐述了 React 不是一个 MVC 框架，而是一个用于构建组件化 UI 的库，是一个前端界面开发工具。所以顶多算是 MVC 中的 V（view）。React 并没有重复造轮子，而是有很多颠覆性的创新，具体的特性如下：

- 声明式的直观的编码方式
- 简化可复用的组件
<a name="D7C76"></a>
# JSX写法
JSX就是 Javascript 和 XML 结合的一种格式。React 发明了 JSX，利用 HTML 语法来创建虚拟 DOM。当遇到<，JSX 就当 HTML 解析，遇到{就当 JavaScript 解析。
```javascript
import './css/index.css'
class App extends Component {
 //将来 生命周期
    render() {
        var myname = 'anna' //不是状态
        var stylyobj = {
            background: 'red',
            fontSize: '30px'
        } 
        return (
            <div>
                {10 + 20}--{myname}
                {10 > 20 ? 1 : 0}
                <div style={stylyobj}>111111</div>
                <div style={{ background: 'yellow' }}>111111</div>
                // 16版本之前 class 不支持  必须写成className
                // 16版本之后 class支持 ，但是会报警告
                <div className='active' >33333</div>
                <div id='box' >33333</div>
            </div>
        )
    }
}
```
<a name="tPq6l"></a>
# 组件写法
<a name="Sbgv2"></a>
##  1、class 类式组件
```javascript
import React from 'react'
import { Component} from 'react'
class Hello extends React.Component {
//将来 生命周期
    render() {        
        return (
            <div>111111
              <ul>
                  <li>1111</li>
                  <li>2222</li>
                    <Child1/>
                    <Child2/>
                    <Child3/>
              </ul>
            </div>
        )
    }
}
//Component ===>React.Component  下面的 可以直接被引入
class Child1 extends Component{
    render(){
        return <div>child1</div>
    }
}
```
<a name="80d7b2cf"></a>
##  2、function 函数式组件
**React16.8 之前， 函数式组件不支持状态**<br />**React16.8 之后， React Hooks 支持状态和属性**
```javascript
function Child2(){
    return  (<div>child2
        <span>22222</span>
    </div>)
   
}
const Child3=()=><div>child3</div>
export default Hello
```
<a name="nIf9z"></a>
# 事件的四种写法
**写法一：** **代码量少**的情况，可直接在标签里面写
```javascript
// 获取到输入框的value值
	 <input type = 'text' ref = 'mytext' />
			<button onClick={() => {
				console.log('onclick', this.refs.mytext)
			}}>add</button>
```
**写法二**：**方便传参**，改变this执行 
```javascript
{/* 注意这里不能加小括号 触发的时候会自动调用 。如果加小括号 ，= 函数返回值再调用*/}
<button onClick={this.handleAdd2.bind(this)}>add2</button>
	//写在 render 外面
  handleAdd2(){
        console.log('click22222', this.refs.mytext.value)
    }
```
**写法三：箭头函数** 无法传参，但是毕竟方便
```javascript
<button onClick={this.handleAdd3}>add3</button>
handleAdd3=()=>{
        console.log(this.refs.mytext.value)
    }
```
**写法四：组合写法**
```javascript
<button onClick={() => {
                    this.handleAdd3('aaa','bbbb')
                }}>add4</button>
handleAdd3=(x,y)=>{
        console.log(x,y,'click22222', this.refs.mytext.value)
    }
```
**输入框改变获取输入框的值：**
```javascript
				<div>
                <input type="test" onChange={(evt)=>{
                console.log(evt.target.value)
            }}/>
```
**赋值给输入框**
```javascript
value={this.state.mytext}
```
<a name="uofxY"></a>
# 改变this指向
<a name="36LHs"></a>
## bind call apply区别
**call：**可以传入多个参数,改变this指向后立刻调用函数  <br />**apply：**可以传入数组 ，改变this指向后立刻调用函数  <br />**bind：**改变this指向后,可以传入多个参数，返回的是函数 不会立即调用
```javascript
var obj1={
    name:'obj1',
    getName(){
        console.log(this.name)
    }
}
var obj2 = {
    name: 'obj2',
    getName() {
        console.log(this.name)
    }
}
// obj1.getName()//obj1

// 改变this指向，立即指向方法
// obj1.getName.call(obj2,'aaa','bbbb','cccc')//obj2
//obj1.getName.apply(obj2,['aaa','bbb','ccc'])//obj2

// 改变this指向，但是需要手动执行方法
//obj1.getName.bind(obj2,'aaa','bbb','ccc')()
```
<a name="qhM1t"></a>
# 初始化状态和修改状态
React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。
React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。
<a name="1dLc2"></a>
## 状态的两种写法（state）
第一种完整写法：
```javascript
export default class App extends Component {
    constructor() {
    super()
    this.state = {
         myname:'4567'
    }
  }
    render() {
        return (
            <div>
                {this.state.myname}
            </div>
        )
    }
}
```
第二种简写：这个写法 state 也是定义在了 constructor 中 
```javascript
export default class App extends Component {
    state = {
        myname:'4567'
    }
    render() {
        return (
            <div>
                {this.state.myname}
            </div>
        )
    }
}
```
<a name="GWkST"></a>
## 修改状态（setState）
<a name="oB9yn"></a>
### 同步过程
```javascript
<button onClick={this.handkeClick}>click</button>
   //直接修改状态
    handkeClick=()=>{
        this.setState({
            myname:'xiaoming',
            myage:'18'
        })
    }
```
<a name="d8upQ"></a>
### 异步过程
**第一种写法：**<br />**接收两个参数：**<br />第一个参数是对象，修改的状态值<br />第二个参数 能够等待dom树更新完之后执行
```javascript

 this.setState({
             myname:'xiaoming'
         },()=>{
             console.log('1',this.state.myname)
         })
之后发生什么？
//1.虚拟dom创建
//2.diff对比
```
**第二种写法：**<br />可以获取到上个状态值(prevState) 必须有返回值
```javascript
//1. 简写
this.setState((prevState)=>({
            count: prevState.count+1
        }))
// 2. 完整写法
this.setState((prevState)=>{{
            count: prevState.count+1
        }})
```
**setState 何时同步，何时异步，为什么会这样, React 如何去控制同步异步?**<br />想了解的可以看这篇[React 中setState更新state何时同步何时异步？](https://www.jianshu.com/p/799b8a14ef96)
<a name="4AFlz"></a>
# 遍历
**写法一：**
```javascript
{  this.state.datalist.map(item => <li key={item}>{item}</li>) }
```
**写法二：**
```javascript
 var newlist = this.state.datalist.map(item => <li key={item}>{item}</li>)
 {newlist} //使用变量
```
<a name="f188d5c8"></a>

<a name="170e705c"></a>
# 通信
<a name="aeec5ca3"></a>
## 父传子 通过属性（props）
**父：**
```javascript
//需要 {} 包住才是 js  不然是字符串
<Navbar mytitle='home' myshow={false}></Navbar>
```
子：可以直接通过this.props.属性名获取
```javascript
{this.props.mytitle}
```
<a name="454b79b1"></a>
### 属性简写:
```javascript
var obj={
            mytitle:'测试',
            myshow:false
        }
  <Navbar {...obj}></Navbar>
```
<a name="ee9446f9"></a>
### 属性验证
Navbar.propTypes 可以访问到
```javascript
    import MyPropTypes from 'prop-types'; //提供验证数据类型的方法,必须交给MyPropTypes模块方法进行处理验证
    class Navbar extends Component {
      static propTypes = {
        myshow: MyPropTypes.bool,
      };
    }
```
<a name="25778dca"></a>
### 默认属性
```javascript
static defaultProps = {
        myshow: true
    }
```
<a name="9xOGy"></a>
## 子传父 通过事件
**父：传了一个回调函数过去**
```javascript
<Navbar onEvent={() => {
	this.setState({
		isShow: !this.state.isShow
	})
}}></Navbar>
```
**子 :收到这个回调函数之后 直接调用**
```javascript
<button onClick={this.handleClick}>hide/show</button>
handleClick = () => {
	this.props.onEvent()
}
```
<a name="on3de"></a>
## Ref
**Ref** 你可以用来绑定到 render() 输出的任何组件上。<br />这个特殊的属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。<br />**父组件**：可一获取到Input组件的实例，并且对他内部的状态值进行修改
```javascript
<Input ref='mytext' />
	<button onClick={
		this.handleClick
	}>add</button>

handleClick = () => {
	console.log(this.refs.mytext.state.mytext)// 拿到值    
	this.refs.mytext.reset() // 清空输入框
}
```
**子组件**：
```javascript
class Input extends Component {
	state = {
		mytext: ''
	}
	reset = () => {
		this.setState({
			mytext: ''
		})
	}
<div>
	<div>others input</div>
	<input value={this.state.mytext} type='text' style={{ background: 'yellow' }} onChange={(ev) => {
		this.setState({
			mytext: ev.target.value
		})
```
<a name="JcwTb"></a>
## 发布订阅模式
**自己写一个发布订阅模式来传递信息**<br />**事件总线:**用来观察订阅者和发布者，如果发现发布者发送了信息，将信息立刻发送给订阅者
```javascript
	const EventChannel = {
		list: [],
		subscribe(callback) {
			this.list.push(callback)
		},
		dispatch(data) {
			this.list.forEach(item => {
				item(data)
			})
		}
	}
```
**订阅者**：把自身的回调存储在事件总线,事件总线遍历调用 发布者调用发布方法可以传入发布者自身的参数  订阅者即可获取到
```javascript
	class Child3 extends Component {
	// 创建成功 ，dom挂载完成
	componentDidMount() {
		observer.subscribe((data) => {
			console.log('child3定义的callback', data)
		})
		// console.log('componentDidMount', '调用订阅方法', observer.subscribe())
	}
	render() {
		return <div style={{ background: 'blue' }}>我是微信用户</div>
	}
}
class Child3 extends Component {
	// 创建成功 ，dom挂载完成
	componentDidMount() {
		observer.subscribe((data) => {
			console.log('child3定义的callback', data)
		})
		// console.log('componentDidMount', '调用订阅方法', observer.subscribe())
	}
	render() {
		return <div style={{ background: 'blue' }}>我是微信用户</div>
	}
}
```
**发布者:**调用事件总线的发布方法 <br />**发布方法**：把订阅者的回调遍历出来 然后调用 遍历中间可以传入自己的参数  
```javascript
class Child2 extends Component {
    render() {
        return <div style={{ background: 'red' }}>公众号发布者
        <button onClick={this.handleClick}>发布</button>
        </div>
    }
    handleClick=()=>{
        EventChannel.dispatch('child2的问候')
    }
}
```
<a name="DPS16"></a>
## context 通信
**基地:**提供自己的状态  以及修改状态的方法<br />基地代码：
```javascript
export default class App extends Component {
        state = {
            text: '私人服务'
        }
        changeState=(data)=>{
            this.setState({
                text: data
            })
        }
    render() {
        return (
            <GlobalContext.Provider value={{
                sms: '短信服务',
                call: '电话服务',
                text: this.state.text,
                changeState:this.changeState
            }}>
                <div>
                    <Child1></Child1>
                </div>
            </GlobalContext.Provider >
        )
    }
}
```
**通信者:**调用基地修改的方法，传入自己的信息
```javascript
class Child2 extends Component {
    render() {
        return <GlobalContext.Consumer>
            {context => (
                <div style={{ background: 'blue' }}>child2--{context.call}
                    <button onClick={() => this.handClick(context)}>child2通信</button>
                </div>
            )
            }
        </GlobalContext.Consumer>
    }
    handClick = (context) => {
        context.changeState('来自child2的问候')
        console.log(context)
    }
}
```
**其他通信者**:一旦状态改变了 ，可以马上获取到
```javascript
class Child1 extends Component {
    render() {
        return <GlobalContext.Consumer>
            {context => (
                <div style={{ background: 'yellow' }}>child1--{context.text}</div>
            )
            }
        </GlobalContext.Consumer>
    }
}
```
<a name="176808a1"></a>
# 生命周期
一个组件会按照顺序依次经历以下的三个阶段：初始化阶段、运行中阶段、销毁阶段<br />其中的三个生命周期即将被废弃，不建议使用，增加了两个新的生命周期替代~
<a name="p25Ir"></a>
## 初始化阶段
<a name="8hiAa"></a>
### componentWillMount  
render 之前最后一次修改状态的机会，在渲染前调用,在客户端也在服务端，<br />即将被废弃，不建议使用，17版本之后必须加上 UNSAFE_ 才可以工作（UNSAFE_componentWillMount），<br />**废弃理由：**<br />在 ssr 中这个方法将会被多次调用，所以会重复触发多遍，同时在这里如果绑定事件，将无法解绑，导致内存泄漏，变得不够安全高效逐步废弃
```javascript
UNSAFE_componentWillMount(){
        console.log('componentWillMount','ajax',)
    }
```
<a name="umtY9"></a>
### render 
只能访问 this.props 和 this.state，不允许修改状态和 dom，在生命周期中会被多次调用。
<a name="jiCTz"></a>
### componentDidMount
成功 render 并渲染完成真实 dom 之后触发，可以修改 dom, 一般请求数据会写在这个生命周期
```javascript
 componentDidMount() {
        console.log('componentDidMount', 'ajax 绑定')
        fetch("/test.json").then(res=>res.json()).then(res=>{
            console.log(res.data)
            this.setState({
                list: res.data.films
            })
        })
    }
```
<a name="M4PZM"></a>
## 运行中阶段
<a name="7PnI0"></a>
### componentWillReceiveProps  
父组件修改属性触发（子组件使用） 会走多次 可以在这里获取到id <br />即将被废弃，不建议使用，17版本之后必须加上 UNSAFE_ 才可以工作（UNSAFE_componentWillReceiveProps）<br />**废弃理由：**<br />外部组件多次频繁更新传入多次不同的props，会导致不必要的异步请求<br />这个生命周期有新的生命周期替换—— **getDerivedStateFromProps **  可以看后面的介绍~
```javascript
   // 会走多次 可以在这里获取到id  更新  mount 只会走一次
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        console.log('获取到ajax数据', nextProps.myname)
    }
```
<a name="eY75v"></a>
### shouldComponentUpdate 
**返回 false 会阻止 render 调用 **<br />可以做性能调优函数 可以获取到新的状态和老的状态然后对比状态，如果状态没有改变不重新渲染
```javascript
  shouldComponentUpdate(nextProps, nextState) {
        // 性能调优函数 //新的状态和老的状态
        console.log('shouldComponentUpdate',this.state.myname,nextState.myname)
        if (this.state.myname !== nextState.myname){
            return true //返回 true 会自动渲染 这个是手动自己去对比 dom 是否发生改变再去调用 render
          // react有自动优化能力 —— PureComponent(看后面~)  
        }
            return false   //false 不会重新渲染
    }
```
<a name="sjYyL"></a>
### componentWillUpdate  
不允许修改属性和状态，会被触发多次，即将被废<br />**废弃理由：**<br />更新前记录 DOM 状态，可能会做一些处理，与 componentDidUpdate 相隔时间如果太长，会导致状态不可信，有新的生命周期—— **getSnapshotBeforeUpdate 替换**
```javascript
UNSAFE_componentWillUpdate(){
        console.log('componentWillUpdate')
    }
```
<a name="2crpe"></a>
### render 
只能访问 this.props 和 this.state，不允许修改状态和 dom，在生命周期中会被多次调用
<a name="doIBa"></a>
### componentDidUpdate 
在组件完成更新后立即调用，在初始化时不会被调用，可以修改dom<br />

<a name="L875x"></a>
## 销毁阶段
<a name="WPius"></a>
### componentWillUnmount 
在组件从 DOM 中移除之前立刻被调用,在删除组件之前进行清理操作，比如计时器和事件监听器。
<a name="honHK"></a>
## 新增加的两个生命周期
<a name="TpOyh"></a>
### getDerivedStateFromProps  
**同步作用:**<br />1.可以改老状态  <br />2.不管是初始化 或者更新  都可以拿到父组件属性
```javascript
componentWillReceiveProps(nextProps) //改变才会获取到属性
// 里面不能用this 必须用static  
  static getDerivedStateFromProps(nextprops, state) {  
  //初始化属性 和更新属性都可以获取到
        document.title = nextprops.mytitle
        console.log(nextprops, state)
        return null //状态不改变
        return {
             myname: state.myname.substring(0, 1).toUpperCase()
         } //返回一个新的状态  可以在次修改状态
    }
```
**异步作用：**<br />在getDerivedStateFromProps 中不可以做ajax请求，必须和其他生命周期配合使用
```javascript
componentDidMount() {
        console.log('发ajax', this.state.myid)
    }
    // componentWillReceiveProps() {
    //     console.log('发ajax')
    // }
    static getDerivedStateFromProps(nextprops, state) {
        console.log('getDerivedStateFromProps','获取到id值', nextprops.id)
        return {
            myid:  nextprops.id
        }
    }
```
<a name="1Vqxg"></a>
### getSnapshotBeforeUpdate 
**可以在更新之前获取到状态**
```javascript
   //data 接收到了getSnapshotBeforeUpdate的返回值
    componentDidUpdate(prevProps, prevState,data) {
        console.log('componentDidUpdate', data)
    }
    // 在render 生命之后  在已经更新完之前 可以准确获取 返回之后的状态  
    // componentDidUpdate第三个参数可以获取到这个值
    getSnapshotBeforeUpdate = (prevProps, prevState) => {
        console.log('getSnapshotBeforeUpdate','获取滚动条的位置')
        return {
            y:100
        }
    }
```
<a name="R9k1l"></a>
# React 中性能优化的方案
<a name="zgizB"></a>
## 1、shouldComponentUpdate 
**手动控制**组件自身或者子组件是否需要更新，尤其子组件非常多的情况，不适合这个方案
<a name="WiOZW"></a>
## 2、PureComponent  
PureComponent 是 React 提供的**自动优化** ，会帮你比较新的 props 跟 旧的 props ，<br />取决于值是否相等（值相等，或者对象含有相同的属性、且属性值相等），决定 shouldComponentUpdate 返回true 或者 false，从而决定要不要呼叫 render function<br />**优点：**可以减少重复生命周期的执行 会自动对比虚拟dom等<br />**缺点：**如果你的state 或者 props '永远都会变'，那 PureComponent 并不会更加快，因为 shallowEqual 也需要花时间，组件如果需要实时更新 可以用 shouldComponentUpdate  
```javascript
import React, { Component, PureComponent } from 'react'
export default class App extends PureComponent {}
```
<a name="IclMG"></a>
# 插槽 
this.props.children  获取到的是内容数组<br />**Child 组件:**
```javascript
const Child = (props)=>{
    return <div>
        child--{props.children}
    </div>
}
```
**使用这个组件：**
```javascript
export default function App() {
    return (
        <div>
             {/* 插槽 */}
            <Child>
                <li>11111</li>
                <li>222222</li>
            </Child>
        </div>
    )
}
```
<a name="V18Af"></a>
# 路由
**安装:**
```typescript
 cnpm i  --save  react-router-dom
```
HashRouter模式下 多次点相同路径会被警告 <br />**解决方案**： 换成history模式  ： BrowserRouter<br />**写法：**<br />**react-router-dom 4.5 版本写法一致:**
```typescript
// 
import {
HashRouter as Router, //路由外层需要包裹的组件  hash模式
// BrowserRouter(后端配置 history 模式)
Route ,//每个路由组件都需要此组件
}from 'react-router-dom'
import React from 'react'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
// class BlogRouter extends Comment{
// }
```
** 函数式组件写法：**
```typescript
const BlogRouter=()=>(
    <Router>
    <Route path='/home' component={Home}/>
    <Route path='/login' component={Login}/>
    </Router>
)
export default BlogRouter
app.js
import BlogRouter from './router'
class App extends Component{
  render(){
    return(
      <div>
        <BlogRouter/>
      </div>
    )
  }
}
export default App;
```
<a name="eEkJp"></a>
### 嵌套路由
**嵌套路由两种写法：**<br />1.在父组件中直接写：
```typescript
import { Route} from 'react-router-dom'
import Right from './Right'
import Role from './Role'
export default class Manage extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>权限列表</li>
                    <li>角色列表</li>
                    <Route path='/right-manage/right' component={Right} />
                    <Route path='/right-manage/roles' component={Role} />
                </ul>
            </div>
        )
    }
}
```
2. 在路由中写：
```typescript
import Manage from '../views/rightmanage/Manage'
import Right from '../views/rightmanage/Right'
import Role from '../views/rightmanage/Role'
 <Route path='/right-manage' render={()=>
            (<Manage>
                    <Switch>
                <Route path='/right-manage/rights' component={Right} />
                <Route path='/right-manage/roles' component={Role} />
                <Redirect from='/right-manage' to='/right-manage/roles' />
                    </Switch>
            </Manage>)
    }/>

```
** 在父组件中留坑：**
```javascript
{this.props.children}
```
<a name="xZocg"></a>
### 路由重定向 
** 一定要包 Switch ** 一旦匹配上就不会再继续匹配 会直接跳出
```javascript
import {
    Route,
    Redirect,//重定向
    Switch//匹配到第一个符合条件路径的组件，就停止了
} from 'react-router-dom'
export default class DashBorad extends Component {
    render() {
        return (
            <div>
                <div>顶部导航栏</div>
                <Switch>                  
                    {/* 重定向 */}
                    <Redirect from='/' to='/home' exact />
                    <Route path='*' component={Notfind} />
                </Switch>
            </div>
        )
    }
}
```
<a name="4YHWH"></a>
### 跳转页面
**路由渲染跳转：**
```javascript
<Route path='/artic-manege/preview/:myid' component={Prebiew} />
```
**编程式跳转页面:**
```javascript
this.props.history.push(`/artic-manege/preview/${id}`)
```
**获取到传递的值：**
```javascript
this.props.match.params.myid
```
<a name="iJQtP"></a>
# 高阶组件(withRouter)
高阶组件，获取低阶组件，生成高阶组件 **可以实现路由包裹跳转清空**等<br />有些组件没有被 router 包围，会获取不到会有 this.props ，可以用高阶组件进行包裹，然后获取其this.props 
```javascript
import {withRouter} from 'react-router' //路由
//获取到 this.props 跳转至 home
this.props.history.push('/home')
export default withRouter(SideMenu)
```
<a name="r7YSF"></a>
# 获取不到 this.props 解决方案
除了用高阶组件的方法，还可以用**父组件传递this.props给子组件**<br />**父组件：**
```javascript
annahistory={this.props.history}
```
**子组件：**
```javascript
this.props.kerwinhitory.push(obj.key)
```
<a name="aQA0s"></a>
# Redux
Redux 主要用作应用状态的管理，即 Redux 用一个单独的常量状态树（对象）保持这一整个应用的状态，这个对象不能直接被改变。如果一些数据变化了，一个新的对象就会被创建（使用 action 和 reducers ）<br />Redux 的工作流程：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50a1d30830e247e48922ae69520d3874~tplv-k3u1fbpfcp-zoom-1.image)
<a name="Hk8Ei"></a>
## 同步写法
**store.js 文件：**
```javascript

import {createStore} from 'redux'//createStore 方法创建一个store回想
// 创建一个reducer ，
//'修改状态'（接收老状态，修改的值，深复制之后，再返回一个新的状态）
const reducer=(prevState={
    // 设置一个初始值
    iscollapsed:false
},action)=>{
    console.log(action)
    // 深复制一份新的把action里面获取的值 返回出去
    var newstate={...prevState}
    newstate.iscollapsed=payload  
    return newstate
}//只要状态已返回，会自动更新
const store=createStore(reducer)
export default store
```
**发布者（发布自己的状态）**
```javascript
store.dispatch({
            type:'mysideMenuCollapsed',
            payload: iscollapsed
        });//store 在action里面可以获取到发布者的值
```
**订阅者（做出改变者，要获取新的状态）**
```javascript
componentDidMount() {
        // 订阅  注意一定要取消订阅
       this.unscribe= store.subscribe(()=>{
           //store.getState() 这个可以获取到新的状态
            console.log('有人通知我更新了',store.getState())
            this.setState({
                collapsed: store.getState().iscollapsed
            })
        })
    }
     componentWillUnmount(){
    // 取消订阅
    this.unscribe()
   }
```
<a name="l8UFX"></a>
## 异步写法 
**异步 action 中间件**
<a name="pTCxn"></a>
### 1、redux-Thunk
redux-thunk可以在actionCreator中返回一个函数，将函数执行，并传入dispatch和getState两个参数给这个函数，我们可以在任意时候dispatch<br />**store.js:**
```javascript
import { createStore ,applyMiddleware} from 'redux'//createStore 方法创建一个store回想
import reduxThunk from 'redux-thunk'
// 创建一个reducer ，
//'修改状态'（接收老状态，修改的值，深复制之后，再返回一个新的状态）
const reducer = (prevState = {
    // 设置一个初始值
    roleList:[]//角色侧边导航数据
}, action) => {
    // 深复制
    let { type, payload } = action
    switch (type) {
        case 'setRoleList':
            var newstate = { ...prevState }
            newstate.roleList= payload  
            return newstate
            default :
            return prevState
    }
}//只要状态已返回，会自动更新
// 默认 action 只能是普通对象{type:''}
// 创建store 顺便应用中间件thunk 如果action是函数,我来处理
const store = createStore(reducer,applyMiddleware(reduxThunk))
export default store
```
**订阅者和发布者案例：**<br />**role.js：**
```javascript
actionCreater = () => {
        // middleware  解决异步处理redux-thunk redux-promise
        return (dispatch) => {
            axios.get("http://localhost:8000/roles").then(res => {
                console.log(res.data)
                // 自己决定什么时候发送
                dispatch({
                    type: 'setRoleList',
                    payload: res.data
                })
            })
        }
    }
    componentDidMount() {
        if (store.getState().roleList.length == 0) {
            //发ajax
            store.dispatch(this.actionCreater())
        } else {
            console.log('使用缓存', store.getState().roleList)
            this.setState({
                datalist: store.getState().roleList
            })
        }
        //数据改变了 订阅获取到新的数据
        this.unscribe = store.subscribe(() => {
            console.log("请求数据结束", store.getState().roleList)
            this.setState({
                datalist: store.getState().roleList
            })
        })
    }
    componentWillUnmount() {
        // 取消订阅
        this.unscribe()
    }
```
<a name="VSLpy"></a>
### 2、redux-promise
redux-promise可以在actionCreator中返回一个promise对象，他会等待成功后将成功后的结果派发出去<br />**store.js**
```javascript
import reduxPromise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'//createStore 方法创建一个store回想
const reducer = (prevState = {
    // 设置一个初始值
    rightList: [],//角色侧边导航数据
}, action) => {
    console.log(action)
    // 深复制
    let { type, payload } = action
    switch (type) {
        case 'setRightsList':
            var newstate = { ...prevState }
            newstate.rightList = payload  
            return newstate
        default:
            return prevState
    }
}//只要状态已返回，会自动更新
const store = createStore(reducer, applyMiddleware(reduxPromise))
export default store
```
**订阅者和发布者案例：**<br />**role.js：**
```javascript
actionCreater = () => {
        // 返回一个promise对象
        return axios.get("http://localhost:8000/rights").then(res => {
            return {
                type: 'setRightsList',
                payload: res.data
            }
        })
    }
    componentDidMount() {
        if (store.getState().rightList.length == 0) {
            //发ajax
            store.dispatch(this.actionCreater()).then(data=>{
                this.setState({
                    datalist: store.getState().rightList
                })
            })
        } else {
            console.log('使用缓存', store.getState().rightList)
            this.setState({
                datalist: store.getState().rightList
            })
        }
    }
```
<a name="TSmKe"></a>
## 核心API-Reducer
Reducer保证是纯函数<br />**纯函数**<br />1.对外界没有副作用的函数<br />2.同样的输入,得到同样的输出
```javascript
var myname='anna'
function test(myname){
myname='xiaoming'
}
test(myname)
```
**非纯函数:**
```javascript
var myname='anna'
function test(){
myname='xiaoming'
}
test()
```
**拆分**<br />可以将 Reduer 按照业务模块去拆分<br />**store.js**
```javascript
import { createStore, applyMiddleware ,combineReducers} from 'redux'//createStore 方法创建一个store回想
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import collapseReducer from './reducers/collapseReducer'
import rightListReducer from './reducers/rightListReducer'
import roleListReducer from './reducers/roleListReducer'
const reducer = combineReducers({
    iscollapsed: collapseReducer,
    roleList: roleListReducer,
    rightList: rightListReducer
})
const store = createStore(reducer, applyMiddleware(reduxThunk, reduxPromise))
export default store
collapseReducer
const collapseReducer = (prevState = false, action) => {
    let { type, payload } = action
    switch (type) {
        case 'sideMenuShow':
            return payload
        default:
            return prevState
    }
}
export default collapseReducer
```
**roleListReducer.js**
```javascript
const roleListReducer = (prevState =[], action) => {
    let { type, payload } = action
    switch (type) {
        case 'setRoleList':
            var newstate = { ...prevState }
            newstate = payload
            return newstate
        default:
            return prevState
    }
}//只要状态已返回，会自动更新
export default roleListReducer
```
<a name="X3AFa"></a>
# React-Redux
**同步写法**<br />**app.js**
```javascript

import { Provider } from  'react-redux'
import store  from './redux/store
<Provider  store={store}>
        <BlogRouter/>
      </Provider >
```
**发布者**<br />把方法映射成属性用<br />第一个参数是商量好的那个属性传给孩子<br />第二个参数把方法映射成属性用
```javascript
import { connect } from 'react-redux'
const mapStateToprops=()=>{
return {
}
} //state 映射成属性用
const mapDispathToProps={
  actionCreator:(iscollapsed)=>{
        return {
            type: 'sideMenuShow',
            payload: iscollapsed
        }
    }
} 
export default withRouter(connect(mapStateToprops,mapDispathToProps)(TopHeader))
```
**订阅者接收**
```javascript
import { connect } from 'react-redux'
const mapStateTopprops=(state)=>{
    return {
        iscollapsed:state.iscollapsed
    }//约定isCollapsed 属性
}
export default withRouter(connect(mapStateTopprops)(SideMenu))
```
**异步**
```javascript
if (this.props.datalist.length == 0) {
     //直接调用改方法 会把状态传递给redux
           this.props.setList()
        }  
//订阅者 state 中可以获取到redux中的状态
const mapStateToprops = (state) => {
    return {
        datalist:state.rightList
    }
} //state 映射成属性用
//会自动传递给redux
const mapDispathToProps = {
    setList : () => {
        // 返回一个promise对象
        return axios.get("http://localhost:8000/rights").then(res => {
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
```
<a name="ZOwGF"></a>
# Redux和React-Redux关系
<a name="dZEVe"></a>
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7bedb95775e4bb5acc3876549ebc995~tplv-k3u1fbpfcp-zoom-1.image)
<a name="6ciW5"></a>
# mobx
Mobx是一个功能强大，上手非常容易的状态管理工具。
<a name="prynJ"></a>
## 1、box方法
只能观察 简单数据类型
```javascript
store.js
import { observable } from 'mobx'
const store = observable.box(true)  
export default store
// 传播者
import store from '../../mobx/store'
 store.set(false)
 // 接收者
 import store from '../../mobx/store'
import {  autorun } from 'mobx'
  autorun(() => {
            console.log(store.get())
        })
```
<a name="o9V77"></a>
## 2、map方法 
观察复杂数据类型
```javascript
const store = observable.map({
isshow:true,
list:[],
roleList:[],
rightList:[]
})
 store.set('isshow',false)
```
**mobx 优点：**

1. mobox写法上更偏向于oop
1. mobox 对一份数据直接进行修改操作，不需要始终返回一个新的数据
1. mobox 并非单一的 store。可以多 store
1. redux 默认以 javaScript 原生对象形式存储数据，而 mobx 可以用来观察对象

**mobx 缺点**：<br />mobx提供的约定及模板代码很少，代码编写很自由，如果不做一些约定，比较容易导致团队代码风格不统一<br />相关中间件很少，逻辑层业务整合式问题<br />**遇到的bug**<br />**第一个bug:**<br />**
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/099487924c3243eda96a8579e8eaaabf~tplv-k3u1fbpfcp-zoom-1.image)
**<br />**解决方案：**<br />取消观察
```javascript
this.cancel = autorun(() => {
            this.setState({
                code: store.get('isshow')
            }
 //取消观察
        componentWillUnmount() {
        this.cancel()//取消观察
    }
```
**第二个bug:**<br />**
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66b5fa3b96bc4cab833c9b01e4fe9bf2~tplv-k3u1fbpfcp-zoom-1.image)**<br />**解决方案：**<br />网速很慢的时候数据没有回来 ajax请求的数据没有回来
```javascript
componentWillUnmount() {
        this.setState=()=>{}
        console.log('列表销毁','取消ajax')
    }
```
<a name="jkeam"></a>
# React Hooks
_Hook_ 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
<a name="9UtLA"></a>
## useState写法
```javascript
import React,{useState}from 'react'
export default function App() {
    const [name, setName] = useState('anna')//初始值[状态，改变状态的方法]
    const [age, setAge] = useState('12')//初始值[状态，改变状态的方法]
    return (
        <div>
            app-{name}-{age}
            <button onClick={()=>{
                setName('xiaoming')
                setAge('18')
            }}>click</button>
        </div>
    )
}
```
<a name="XdIVM"></a>
## 获取ref
```javascript
import React, { useState, useRef }from 'react'
const mytext = useRef(null)
<input type='text' onChange={(ev)=>{
                settext(ev.target.value)
            }}  ref={mytext}/>
```
<a name="9XoHU"></a>
## 点击事件
```javascript
<button onClick={() => handleDeleClick(index)}>dele</button>
 const handleDeleClick=(index)=>{
        console.log(index)
        var newlist=[...list]
        newlist.splice(index,1)
        setlist(newlist)
    }
```
<a name="H3N5W"></a>
## 替代复杂的生命周期(useEffect)
**格式: useEffect(处理函数，[依赖]）**<br />如果依赖传的是一个空数组，相当于 componentWillMount ， 挂载前，只执行一次<br />如果第二个参数不传，代表任何状态改变，都会重新执行
```javascript
    useEffect(()=>{
    },[])
```
** 更新： [依赖] 只有依赖改变的时候 才会执行一次**
```javascript
   // age 更新会重新执行
    useEffect(()=>{
        console.log('创建或更新')
    },[age])
```
**创建/销毁**  
```javascript
   useEffect(() => {
        var id=setInterval(() => {
            console.log(111)
        }, 1000);
        console.log('创建')
        return () => {
            // cleanu
            clearInterval(id)
            console.log('销毁')
        }
    }, [])
```
 
<a name="NZLRK"></a>
## 获取props
```javascript
export default function Prebiew(props) {}
```
<a name="nQ0GY"></a>
## useCallback 提高运行效率
防止因为组件重新渲染，导致方法被重新创建，提高性能
```javascript
const test=useCallback(
        () => {
            console.log(text)
        },
        [text]
    )//闭包,缓存函数，提高性能
    test()
```
<a name="7zeNJ"></a>
## useReducer和useContext
在 hooks 中提供了的 useReducer 功能，可以增强 ReducerDemo 函数提供类似 Redux 的功能，引入 useReducer 后，useReducer 接受一个 reducer 函数作为参数，reducer 接受两个参数一个是 state 另一个是 action 。然后返回一个状态 count 和 dispath，count 是返回状态中的值，而 dispatch 是一个可以发布事件来更新 state 的<br />**reducer.js**
```javascript
const reducer = (prevstate, action) => {
    let { type, payload } = action
    switch (type){
        case "Change_text":
            // 深复制
        return {
            ...prevstate, text: payload
        }
         case "Change_list":
            // 深复制
        return {
            ...prevstate, list: payload
        }
    }
    return prevstate
}
export default reducer

```
**index.js （GlobalContext ）**
```javascript
index.js （GlobalContext ）
import React from 'react'
const GlobalContext = React.createContext()
export default GlobalContext
```
**app.js**
```javascript
import GlobalContext from './store/index'
import reducer from './store/reducer'
import React ,{useReducer,useContext}from 'react'
 const App=() =>{
    // 表示reducer 传入初始值  代表reducer管理这些状态
     const [state, dispatch] = useReducer(reducer, {
         isShow: true,
         list: [],
         text: "我是公共的状态"
     })  //[公共的状态，改变公共状态的方法]
    return <GlobalContext.Provider value={{
            state,
            dispatch
        }}> 
            <Child1/>
        </GlobalContext.Provider>
} 
//获取到app传来的信息 state可以直接获取到 dispatch 可以进行修改状态
const Child1=()=>{
    let { state, dispatch } = useContext(GlobalContext) //不需要consumer
    // console.log(useContext(GlobalContext))
    return <div>
    //同步：
        child1-{state.text}<button   onClick={()=>{
            dispatch({type:'Change_text',
            payload:'child1111111'
        })
        }}>click</button>
    </div>
   // 异端:
        axios.get("http://localhost:8000/users").then(res=>{
            console.log(res.data)
                dispatch({
                    type: 'Change_list',
                    payload: res.data
                })
            })
}
```


<a name="x8rUP"></a>
## 自定义Hooks
** 当我们想在两个函数之间共享逻辑时，可以把它提取到第三个函数中**<br />**必须以'use'开头吗？**<br />必须如此。这个约定非常重要，不遵循的话，由于无法判断某个函数是否包含其内部  Hook 的调用，React 将无法自动检测你的Hooks 是否违反了Hook的规则
```javascript
//为preview 组件提供数据
const usePrebiewDate = (props)=>{
    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')
    const [category, setcategory] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/articles/${props.match.params.myid}`).then(res => {
            console.log(res.data)
            let { title, category, content } = res.data
            settitle(title);
            setcontent(content);
            setcategory(category);
        })
        return () => {
        }
    }, [props])
    return {
        title,
        content,
        category
    }
}
   let { title, content, category}= usePrebiewDate(props)
```
<a name="TenyR"></a>
# 实战 
文章管理的后台管理系统——[地址](https://github.com/halfsouli/KnowledgeSummary/tree/master/React/React-BasicGrammar/React-demo-one)<br />
关于项目一些逻辑会后续再更新~ 以上内容如果存在一些疑问的地方可以联系我~ 看到会及时回复
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/579e9e8962504935a6f47a30edaf3735~tplv-k3u1fbpfcp-zoom-1.image)
<a name="KR2yE"></a>
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfa19a0ea8684b5d9909c874136f7a75~tplv-k3u1fbpfcp-zoom-1.image)
<a name="0Yp31"></a>
# 参考文章
[React 中setState更新state何时同步何时异步？](https://www.jianshu.com/p/799b8a14ef96)<br />[全面掌握 React — useReducer](https://www.jianshu.com/p/14e429e29798)<br />
<br />
<br />

