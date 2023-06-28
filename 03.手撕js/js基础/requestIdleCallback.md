`requestIdleCallback` 是 JavaScript 环境提供的一个 API，用于在浏览器空闲时间执行任务，以避免阻塞主线程执行。
使用 requestIdleCallback API，可以将任务划分为小块，分配到多个空闲的帧中执行，以保证主线程的流畅和交互的即时性，避免发生卡顿或无响应现象。

`该 API 的具体用法：`
```js
function doSomeWork() {
    // 执行一些计算密集型或者时间较长的任务
}
  
function performIdleWork(timeRemaining) {
    while (timeRemaining > 0) {
        调用 doSomeWork() 函数执行任务
        doSomeWork();

        获取下一个空闲帧的 timeRemaining
        timeRemaining = window.requestIdleCallback
                        ? window.requestIdleCallback(performIdleWork).timeRemaining()
                        : 0;
    }
}
// 向 requestIdleCallback 提交任务
window.requestIdleCallback
    ? window.requestIdleCallback(performIdleWork)
    : doSomeWork(); 如果浏览器不支持 requestIdleCallback，则直接执行任务

```

在上述示例中，我们将任务分成多个小块执行，并通过 requestIdleCallback 提交任务。
通过不断地检查当前空闲时间剩余的时间，我们可以在尽可能长的时间内执行任务，从而提升执行效率和响应速度。

需要注意的是，在代码运行时，浏览器可能会在任何时刻中断执行并不再请求回调
例如，当用户进行了一些交互或者当前浏览器标签失去了焦点，因此在使用 requestIdleCallback 时，需要根据实际情况设计任务的优先级和适当的超时机制，以保证任务的完整和准确性。

例子2
```js
const data = Array.from({ length: 1000 }, (_, i) => i);

function doWorkChunk(chunks) {
  let chunk;
  while ((chunk = chunks.shift())) {
    const result = chunk.map((item) => item * item);
    console.log(result);
  }

  if (chunks.length > 0) {
    requestIdleCallback(() => doWorkChunk(chunks));
  }
}

function doWork() {
  const CHUNK_SIZE = 50;
  const chunks = [];

  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    chunks.push(data.slice(i, i + CHUNK_SIZE));
  }

  doWorkChunk(chunks);
}
```