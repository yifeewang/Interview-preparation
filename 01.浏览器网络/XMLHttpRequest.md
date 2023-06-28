# XMLHttpRequest
是一种浏览器内置的对象，它提供了在浏览器和服务器之间发送HTTP请求和接收HTTP响应的能力，以此实现动态加载数据和更新内容的功能。
以下是XMLHttpRequest的用法：

## 1. Ajax GET请求：

1. 创建XMLHttpRequest对象：
```js
const xhr = new XMLHttpRequest();
```

2. 指定GET请求的URL及参数：
```js
const url = "http://example.com/getData?id=123";
```

3. 发送GET请求：
```js
xhr.open("GET", url, true); // true表示使用异步请求
xhr.send();
```

4. 监听状态变化、处理响应：
```js
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
    }
};
```

## 2. Ajax POST请求：

1. 创建XMLHttpRequest对象：
```js
const xhr = new XMLHttpRequest();
```


2. 指定POST请求的URL：
```js
const url = "http://example.com/submitData";
```

3. 准备POST请求的数据：
```js
const data = {
    name: "John Doe",
    age: 30
};
const dataToSend = JSON.stringify(data);
```

4. 发送POST请求：
```js
xhr.open("POST", url, true); // true表示使用异步请求
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // 设置请求头
xhr.send(dataToSend);
```

5. 监听状态变化、处理响应：
```js
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
    }
};
```

需要注意的是，`GET请求的参数需要添加到URL之后`，而`POST请求的数据需要通过send()方法发送`。另外，`POST请求还需要设置请求头指定发送的数据类型`。同时，Ajax请求可能会涉及到跨域问题，需要进行相应的处理。

## 3. 跨域问题处理
当 Ajax 请求的目标地址不是当前网页的原始服务器时，即发生跨域请求。为了保证安全性，浏览器一般会禁止此类请求。为了解决跨域问题，可以采取以下几种方式：

1. JSONP：
利用 `<script>` 标签不受跨域限制的特性进行跨域请求，并借助 JSONP 服务端的回调函数机制实现数据传递。
```js
function jsonp(url, callback) {
    const script = document.createElement("script");
    script.setAttribute("src", `${url}&callback=${callback}`);
    document.body.appendChild(script);
}
jsonp("http://example.com/data", "handleResponse");
function handleResponse(data) {
    console.log(data);
}
```

2. 跨域资源共享（CORS）：
在服务端设置合适的响应头，以允许指定的客户端跨域访问本网站的资源。
```js
// 设置允许所有站点跨域访问
res.setHeader("Access-Control-Allow-Origin", "*");
// 设置允许通过的请求头
res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
// 设置允许通过的请求方法
res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
```

3. 代理：
前端通过 Ajax 请求本地服务器，将请求发送至服务端，服务器代理请求并返回数据。
```js
// Ajax 请求本地服务器
const xhr = new XMLHttpRequest();
xhr.open("GET", "/getData");
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 &amp;&amp; xhr.status === 200) {
        console.log(xhr.responseText);
    }
};
xhr.send();
// 本地服务器代理请求并返回数据
app.get("/getData", function(req, res) {
    axios.get("http://example.com/data").then(response =&gt; {
        res.send(response.data);
    });
});
```

综上，跨域问题可以通过 JSONP、CORS 和代理等方式解决。需要根据具体情况选择最合适的方案。