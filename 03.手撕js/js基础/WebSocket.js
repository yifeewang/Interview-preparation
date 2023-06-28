// WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议，它通过建立长连接，实现了客户端和服务器之间的双向通信。
// 相较于传统的 HTTP 请求，WebSocket 更加高效，能够实时地向客户端推送数据，因此在实时通讯、在线游戏、即时消息等场景中广泛应用。

// WebSocket 的使用大致包括以下几个步骤：

// 1. 创建 WebSocket 连接

// 我们可以通过 new WebSocket() 构造函数来创建一个 WebSocket 连接。例如：

const ws = new WebSocket('ws://localhost:8080');

// 这里的参数指定了 WebSocket 服务器的地址，协议可以是 ws 或 wss。

// 2. 监听 WebSocket 事件

// 在 WebSocket 中，我们可以通过监听一些事件来实现数据交换和状态处理。

// 常见的事件包括：

// open：当 WebSocket 连接建立时触发。
// message：当接收到服务器发送的数据时触发。
// close：当 WebSocket 连接关闭时触发。
// error：当 WebSocket 连接发生错误时触发。

// 例如，我们可以通过监听 open 事件来获取 WebSocket 连接的状态：
ws.addEventListener('open', function(event) {
  console.log('WebSocket 连接已建立');
});


// 3. 发送和接收消息

// 我们可以通过 WebSocket 连接的 send() 方法来向服务器发送消息。例如：
const message = {
  type: 'chat',
  content: 'Hello world!'
};
ws.send(JSON.stringify(message));

// 这里我们将一个 JavaScript 对象转换成 JSON 字符串，并通过 send() 方法将其发送给服务器。
// 服务器发送的消息会触发 WebSocket 连接的 message 事件，我们可以通过监听该事件来接收服务器发送的数据。
ws.addEventListener('message', function(event) {
  console.log('接收到来自服务器的消息：', event.data);
});

// 接收到的数据通常是字符串或二进制数据。


// 4. 下面是一个简单的 WebSocket 示例：
const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open', function(event) {
  console.log('WebSocket 连接已建立');
});

ws.addEventListener('message', function(event) {
  console.log('接收到来自服务器的消息：', event.data);
});

ws.addEventListener('close', function(event) {
  console.log('WebSocket 连接已关闭');
});

ws.addEventListener('error', function(event) {
  console.error('WebSocket 连接错误：', event);
});

const message = {
  type: 'chat',
  content: 'Hello world!'
};

ws.send(JSON.stringify(message));

// 在上面的示例中，我们创建了一个 WebSocket 连接并监听了其各种事件。
// 我们还向服务器发送了一条消息，该消息将触发服务器的 message 事件并进行处理。
// 总的来说，WebSocket 是一种非常强大的协议，它的实现方式简单直接，可以帮助我们轻松地实现双向通信和实时数据推送功能。