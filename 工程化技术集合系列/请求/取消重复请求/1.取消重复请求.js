// 一.如何取消请求

// 1.调用 XMLHttpRequest 对象上的 abort 方法来取消请求
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://developer.mozilla.org/", true);
xhr.send();
setTimeout(() => xhr.abort(), 300);

// 2.对于 Axios 来说，我们可以通过 Axios 内部提供的 CancelToken 来取消请求
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.post('/user/12345', {
  name: 'semlinker'
}, {
  cancelToken: source.token
})

source.cancel('Operation canceled by the user.'); // 取消请求，参数是可选的

// 3.调用 CancelToken 的构造函数来创建 CancelToken
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

cancel(); // 取消请求

// 二、如何判断重复请求
import qs from 'qs'

const pendingRequest = new Map();
// GET -> params；POST -> data
const requestKey = [method, url, qs.stringify(params), qs.stringify(data)].join('&'); //请求生成唯一的id。然后进行对比
const cancelToken = new CancelToken(function executor(cancel) {
  if(!pendingRequest.has(requestKey)){
    pendingRequest.set(requestKey, cancel);
  }
})
// 三、如何取消重复请求
// 方案:1.自己封装请求
//      2.请求拦截器/响应拦截器做处理

// 辅助函数：
// 1.generateReqKey：用于根据当前请求的信息，生成请求 Key；
function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
}
// 2.addPendingRequest：用于把当前请求信息添加到pendingRequest对象中；
const pendingRequest = new Map();
function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
       pendingRequest.set(requestKey, cancel);
    }
  });
}
// 3.removePendingRequest：检查是否存在重复请求，若存在则取消已发的请求。
function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
     const cancelToken = pendingRequest.get(requestKey);
     cancelToken(requestKey);
     pendingRequest.delete(requestKey);
  }
}

// 流程：
// 1. 设置请求拦截器
axios.interceptors.request.use(
  function (config) {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    return config;
  },
  (error) => {
     return Promise.reject(error);
  }
);
// 2.设置响应拦截器
axios.interceptors.response.use(
  (response) => {
     removePendingRequest(response.config); // 从pendingRequest对象中移除请求
     return response;
   },
   (error) => {
      removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
      if (axios.isCancel(error)) {
        console.log("已取消的重复请求：" + error.message);
      } else {
        // 添加异常处理
      }
      return Promise.reject(error);
   }
);