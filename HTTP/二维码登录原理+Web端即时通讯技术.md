# 二维码登录原理+Web端即时通讯技术

<a name="EV0fM"></a>
## 前言
上周在写项目过程中遇到需要实现二维码的登录功能，将这个过程细节记录下来<br />二维码的登录过程,主要难点在于用户扫码了浏览器展示的二维码，但是浏览器本身是无法知道的，需要服务端告知信息。<br />涉及到 web 端即时通讯技术这方面，查阅了非常多的文章，但是信息都比较的零散，所以我围绕实现二维码登录这个功能系统将即时通讯技术整理了一遍。<br />

[![dankhF.jpg](https://s1.ax1x.com/2020/08/22/dankhF.jpg)](https://imgchr.com/i/dankhF)
<a name="1M310"></a>
## 二维码实现原理
<a name="w2JPe"></a>
## [![danFtU.png](https://s1.ax1x.com/2020/08/22/danFtU.png)](https://imgchr.com/i/danFtU)
<a name="qnJjV"></a>
### 实现流程
**①** 客户端向服务端请求二维码资源<br />   **②**服务端接收请求之后，生成 appid（唯一）, 设置过期时间，生成二维码，将二维码 url 和状态等资源返回给客户端

- 客户端在接收到服务端响应之后，记录 appid，并且根据返回的二维码url进行展示页面上

**③** **客户端和服务端保持通信，以便获取二维码的状态和登录结果，和保持服务端通讯实现方案有：定时轮询、长轮询、长连接、WebSocket**

- 等待用户扫码

**④** 用户扫码二维码<br />  **⑤**获取到二维码里面的参数appid(二维码扫码出来是一串字符串)<br /> **⑥**将携带获取到的参数发送请求给服务端<br /> **⑦** 服务端判断是否过期，以及登录的状态，将信息传递给客户端，客户端根据信息做出相应判断，如果登录成功，则记录用户信息，跳转下个页面

<a name="koqYg"></a>
### 实现细节
<a name="yabv7"></a>
#### 如何设置二维码的过期时间
**服务端去设置**<br />1.生成二维码并把值设置为中转地址（某随机字符串，如 www.a.com/qr/1d3bf5d8 ）<br />2.在redis中放入 key: 1d3bf5d8, value: 真实二维码跳转地址，expire: 你想要的过期时间<br />用户扫码后，进入中转地址，在 redis 中检查是否存在这个 key ，如果存在则 redirect 到 value，不存在则跳转到统一的过期页面。
<a name="NKbkJ"></a>
#### 二维码的安全性

- **强制 HTTPS 协议**
- **短期令牌**
- **数据签名**
- **数据加密**

<a name="iJuyc"></a>
## Web端即时通讯技术
   
<a name="LsKj3"></a>
### 介绍
 <br>**指的是服务器端可以即时地将数据的更新或变化反应到客户端**，例如二维码是否被扫码，以及二维码的状态反应给客户端，都是通过这个技术实现的，但是在 Web 中，由于浏览器的限制，实现即时通讯需要借助一些方法。这种限制出现的主要原因是，一般的 Web 通信都是浏览器先发送请求到服务器，服务器再进行响应完成数据的现实更新。

<a name="LsKj3"></a>
### 主要的四种实现方式

- **定时轮询( Polling )**
- **长轮询( Long-Polling )**
- **长连接( Server-Sent Events )**
- **websocket**
<a name="mRBwr"></a>
### <br />
<a name="PR6Dr"></a>
### 定时轮询
<a name="SCGq4"></a>
#### 原理
设定一个定时器，客户端以**一定的时间间隔向服务端发出请求**，**不管服务端是否返回响应,到时间就发送下一个请求**<br />
<a name="XS4Fv"></a>
#### 代码
```javascript
	function  Polling() {
    fetch(url).then(data => {
        // somthing
    }).catch(err => {
        console.log(err);
    });
}
setInterval(Polling(),5000) // 到了5秒之后，不管服务器有没有返回数据就直接再次调用请求
```
<a name="e9Oqd"></a>
#### 优点
比较简单，易于理解，实现起来也没有什么技术难点

<a name="0g8LH"></a>
#### 缺点
请求中有大半是无用的，浪费带宽和服务器资源

解释：<br />客户端以固定的频率想服务器发出请求，可能服务器端并没有更新，返回的是个空的信息，等服务器端更新的时候，有可能客户端并没有请求，而且只有最后一次请求才能获得最新数据，这样多次请求不仅浪费了资源，而且并不是实际上的实时更新,不间断请求，请求中很大部分是无用的，浪费带宽。
<a name="7zKoL"></a>
#### 应用
小型简单应用<br />

<a name="fPKPP"></a>
### 长轮询
<a name="LFFt3"></a>
#### 原理
轮询就是在发送第一次请求的时候，如果返回数据了那么就**在成功的回调里面再次发起这个请求**，就像递归一样，调用本方法。如果时间太久，**失败了，同样的在失败回调里再次请求**，长轮询也**需要后台配合和约定**，如果没有数据的时候就不用返回。<br />

<a name="X25Ol"></a>
#### 代码
```javascript
		 function  LongPolling() {
			fetch(url).then(data => {
					LongPolling(); //返回数据之后,再次发起请求
			}).catch(err => {
					LongPolling();
					console.log(err);//失败之后也重新调用
			});
	}
```
<a name="YH30D"></a>
#### 优点
和短轮询比起来，明显减少了很多不必要的http请求次数，相比之下节约了资源

<a name="sS2xU"></a>
#### 缺点
连接挂起也会导致资源的浪费<br />

<a name="h7okz"></a>
### 短轮询和长轮询对比
**相同点** 都是基于HTTP连接，都将重复发送相同请求<br />**不同点**

|  | **长轮询** | **定时轮询** |
| --- | --- | --- |
| **请求发送频率** | 浏览器端收到HTTP响应后立即重复发起相同HTTP请求； | 在自己定义的时间后，立即重新发起相同的HTTP请求，不管服务器是否返回响应 |
| **服务器端处理机制** | 有数据时立即响应，无数据时等待数据或直到超时 | 无论是否有数据都立即响应 |
| **特点** | 获取数据比较实时，服务器端需要较多资源以维持众多长轮询。 | 获取数据不实时，通过浏览器端脚本即可实现 |


<a name="jFGoc"></a>
### 长连接
长连接(SSE)是 HTML5 新增的功能，全称为 Server-Sent Events

网上说http分为**长连接和短连接**，其实**本质上是说的 TCP 连接**。**TCP 连接是一个双向的通道**，**它是可以保持一段时间不关闭的**，因此TCP连接才有真正的长连接和短连接这一说法。需要强调的是 **HTTP 协议是基于请求/响应模式的，因此只要服务端给了响应，本次 HTTP 连接就结束了**，或者更准确的说，是本次 HTTP 请求就结束了，根本没有长连接这一说。那么自然也就没有短连接这一说了。

<a name="nN6fe"></a>
#### 原理（AJAX）
页面加载后向后台发送一个 Ajax 请求，作为长连接的发起。当后端收到请求后，延时处理20s后再回应前端页面。前台收到后端响应后就立即发起下一次请求，这样无限循环下去，**为了在客户端和服务器间保持正常的“心跳”，一般建议在10～20秒左右**。就完成了长连接的基本功能，等到服务器获取到数据之后，立即跳出这个20s定时，响应浏览器。

<a name="aCow5"></a>
#### 代码(以Nodejs为例)
**前端代码：**
```javascript
	function longLink(){
              $ajax.post(url, {
                data: data,
                "token": token
           }, function (res) {
               longLink();
                if(res.code == 0){
                   //判断是否携带了信息
                     if(res.data){
                 }
             }
						})
					}
         longLink();
```
**nodejs代码：**
```javascript
router.post('/longLink', function (req, res) {
        var data = req.body.data;
        var curRes = res;

        //20秒定时链接 并告知浏览器无 openid
        var longLinkTimeCtl = setTimeout(function(){
            curRes.send({
                code: 0,
                detail:{
                    withData: false
                }
            });  
            //解绑 防止多次绑定
            global.event_getData.removeListener('getData', getDataCallback);
        }, 20000);

        // 接到 获取openid的事件后 打断20秒定时 立即响应浏览器，并携带openid
        var getDataCallback = function(data){
            clearTimeout(longLinkTimeCtl);
            
            if(data.xxx){
                var xxx= data.xxx;

                curRes.send({
                    code: 0,
                    detail:{
                        withData: true,
                        data:{
                            xxx: xxx
                        }
                    }
                });
            }
            //解绑 防止多次绑定
            global.event_getData.removeListener('getData', getDataCallback);
        }
        global.event_getData.on('getData', getDataCallback);
    });
```
<a name="chZ4f"></a>
#### 优点

- 减少 CPU 及内存的使用，因为不需要经常的建立及关闭连接
- 减少网络的堵塞，因为减少了 TCP 请求
- 减少后续请求的响应时间，因为此时不需要建立 TCP，也不需要 TCP 握手等过程
<a name="ClML6"></a>
#### 缺点
可能会损害服务器的整体性能
<a name="iaorq"></a>
### 长连接和短连接对比
**相同点**都是基于 TCP 连接，并无本质不同；由HTTP请求头 Connection: keep-alive 控制是否长/短连接。<br /><br />**不同点**

|  | **长连接** | **短连接** |
| --- | --- | --- |
| **使用次数** | 重用多次 | 只用一次 |
| **关闭时机** | 关闭时机：超时后才关闭该TCP连接，由Keep-Alive: timeout=20控制超时时间（秒） | 1、使用次数：仅使用一次；<br />2、关闭时机：一次HTTP请求响应后立即关闭该TCP连接。 |

<a name="yyFtT"></a>
### WebSocket
WebSocket 是一种**网络传输协议**，可在**单个 TCP 连接上进行全双工通信**，位于 OSI 模型的应用层。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，**允许服务端主动向客户端推送数据**。在 WebSocket API 中，浏览器和服务器**只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输**。

浏览器发起请求，服务器发现发送的是 WebSocket 的请求，在服务器和浏览器之间建立一个外部 socket  连接，这个 socket 连接，就允许浏览器和服务器相互发送消息，如果服务器和浏览器没有断开，这个连接就不会断开<br />

<a name="pKALz"></a>
#### 如何实现 WebSocket 连接
小 demo 为例：客户端发送消息后，WebSocket 将消息转为大写返回<br />[![danikT.png](https://s1.ax1x.com/2020/08/22/danikT.png)](https://imgchr.com/i/danikT)<br />**前端代码：**
```javascript
<body>
  <h1>Echo Test</h1>
  <input type="text" id="sendTxt" />
  <button id="sendBtn">发送</button>
  <div id="recv">
  </div>
<script type="text/javascript">
  var websocket = new WebSocket("ws://localhost:8001/"); //注意这里已经不是 http 协议了 ws是WebSocket 的缩写
  //websocket 打开
  websocket.onopen = function () {
    console.log("websocket open"); //
    document.getElementById("recv").innerHTML = "Connected";
  }
  //websocket 关闭
  websocket.onclose = function () {
    console.log("websocket close");
  }
  websocket.onmessage = function (e) {  //接收到数据
    console.log(e.data);
    document.getElementById("recv").innerHTML = e.data;
  }
  //发送消息
  document.getElementById("sendBtn").onclick = function () {
    var txt = document.getElementById("sendTxt").value;
    websocket.send(txt);
  }
</script>
```
**搭建 WebSocket Server：**<br />**安装：**
```javascript
npm install nodejs-websocket
```
创建 wsServer.js 之后，node wsServer.js 运行 这个时候前端页面可以正常连接了
```javascript
var ws = require('nodejs-websocket');

var PORT = 8001;//注意前端要请求一样的端口

// Scream server example: "hi" -> "HI!!!"
var server = ws
  .createServer(function (conn) { //创建 server
    console.log('New connection');
    conn.on('text', function (str) { //如果有收到消息
      console.log('Received ' + str); 
      conn.sendText(str.toUpperCase() + '!!!'); //将消息转为大写发送出去
    });
    conn.on('close', function (code, reason) { //连接关闭
      console.log('Connection closed');
    });
    conn.on('error', function (err) {
      console.log('handle err');
      console.log(err);
    });
  })
  .listen(PORT);

console.log('websocket server listening on port' + PORT);
```
<a name="LzO1e"></a>
#### 聊天室demo [![dan900.png](https://s1.ax1x.com/2020/08/22/dan900.png)](https://imgchr.com/i/dan900)
<br />代码比较多，感兴趣的可以在[聊天室完整源码](https://gitee.com/halfsouli/chat-room)这里去下载<br />如果小伙伴还想更深层次的了解  来转场阿宝哥的[你不知道的 WebSocket](https://juejin.im/post/6854573221241421838#heading-27)~
<a name="Sj38f"></a>
#### Socket.IO
Socket.IO 是一个**跨浏览器支持 WebSocket 的实时通讯的JS**，是**基于 WebSocke 协议的一套成熟的解决方案**，包括了客户端的 js 和服务器端的 nodejs，它的目标是**构建可以在不同浏览器和移动设备上使用的实时应用。<br />**<br />**对比WebSocket优点：**

- Socket.IO 可以直接发送对象，websocket 中需要将对象变为字符串之后，发送过去，客户端还要再处理
- Socket.IO 可以自定义事情
- Socket.IO 封装了 Websocket、基于 Node 的 JavaScript 框架，包含 client 的 JavaScript 和 server 的 Node。其**屏蔽了所有底层细节，让顶层调用非常简单**。
- Socket.IO **不仅支持 WebSocket，还支持许多种轮询机制以及其他实时通信方式**，并封装了通用的接口。这些方式包含 Adobe Flash Socket、Ajax 长轮询、Ajax multipart streaming 、持久 Iframe、JSONP 轮询等。换句话说，当Socket.IO 检测到当前环境不支持 WebSocket 时，**能够自动地选择最佳的方式来实现网络的实时通信**。


<br />**常用的场景：**

- 实时分析：将数据推送到客户端，客户端表现为实时计数器、图表、日志客户。
- 实时通讯：聊天应用
- 二进制流传输：Socket.IO 支持任何形式的二进制文件传输，例如图片、视频、音频等。
- 文档合并：允许多个用户同时编辑一个文档，并能够看到每个用户做出的修改。


<br />**安装：**<br />**需要在客户端和服务器同时引入**
```javascript
npm intall socket.io
```
**cdn：**
```javascript
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
```
**聊天室demo代码：**<br />**nodejs：**
```javascript
var app = require("http").createServer()
var io = require("socket.io")(app)

var PORT = 3000
var clientCount = 0

app.listen(PORT)

io.on("connection", function (socket) {
  clientCount++
  socket.nickname = 'user' + clientCount //给进来的人自动给个名称
  io.emit("enter", socket.nickname + " come in")
  socket.on("message", function (str) { //监听相同事件
    io.emit("message", socket.nickname + " says:" + str) //发送信息
  })
  socket.on("disconnect", function () {
    io.emit("leave", socket.nickname + " left")
  })
})
console.log("websocket server listening on port" + PORT)
```
**前端：**
```javascript
 <body>
    <h1>Chat Room</h1>
    <input type="text" id="sendTxt" />
    <button id="sendBtn">发送</button>

    <script>
      var socket = io("ws://localhost:3000/");

      function showMessage(str, type) {
        var div = document.createElement("div");
        div.innerHTML = str;
        if (type == 'enter') {
          div.style.color = "cornflowerblue";
        } else if (type == "leave") {
          div.style.color = "rosybrown";
        }
        document.body.appendChild(div);
      }

      document.getElementById("sendBtn").onclick = function () {
        var txt = document.getElementById("sendTxt").value;
        if (txt) {
          socket.emit("message", txt);
        }
      }

      socket.on("enter", function (data) {
        showMessage(data, "enter");
      })

      socket.on("message", function (data) {
        showMessage(data, "message");
      })

      socket.on("leave", function (data) {
        showMessage(data, "leave");
      })
    </script>
  </body>
```
<a name="TwNqQ"></a>
## 二维码登录代码实现
两个例子的实现方式<br />1.长轮询实现二维码登录<br />2.WebSocket 实现二维码登录

<a name="eHMmk"></a>
#### 长轮询实现二维码登录
先向服务端发送请求。获取到二维码的状态之后，开启长轮询,获取服务端发送的消息，如果接收到服务端的登录成功消息之后，记录用户信息，跳转系统，写了个小 demo 有兴趣的可以点击[长轮询实现二维码登录demo](https://gitee.com/halfsouli/qr_code)

<a name="rxE2N"></a>
#### WebSocket实现二维码登录
对 WebSocket 实现过程有兴趣的可以看这篇，比较详细 [websocket实现二维码登录](https://www.cnblogs.com/bndong/p/12607579.html)
<a name="RjHdj"></a>
## 叨叨时间
由于大学计算机基础就没有学好，所以花了很多时间去理解服务端和客户端通讯这块，现在只能记得大学时候老师让画的七层模型的那几个名字。对网络协议基本处于一问三不知状态，也不知道当初是怎么通过考试<br />![danC7V.gif](https://s1.ax1x.com/2020/08/22/danC7V.gif)<br />下次准备把网络协议这块知识好好补一下了，喜欢的点击赞吧₍₍Ϡ(੭•̀ω•́)੭✧⃛~
<a name="7Fijb"></a>
## 参考文章
[轮询、长轮询、长连接、websocket](https://www.cnblogs.com/huchong/p/8595644.html)<br />[长连接](https://www.cnblogs.com/webARM/p/4104173.html)<br />[websocket实现二维码登录](https://www.cnblogs.com/bndong/p/12607579.html)<br />[Socket.io](https://www.jianshu.com/p/4e80b931cdea)<br />[你不知道的 WebSocket](https://juejin.im/post/6854573221241421838#heading-27)
