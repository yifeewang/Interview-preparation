## 1. 生命周期
>   cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效
>   localStorage：除非被手动清除，否则将会永久保存。
>   sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

## 2. 存放数据大小
>   cookie：4KB左右
>   localStorage和sessionStorage：可以保存5MB的信息。

## 3. http请求
>   cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
>   localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

## 4. 易用性
>   cookie：需要程序员自己封装，原生的 Cookie API 不友好
>   localStorage和sessionStorage：原生 API 可以接受，亦可再次封装来对Object和Array有更好的支持

## 5. 应用场景
从安全性来说，因为每次http请求都会携带cookie信息，这样无形中浪费了带宽，所以cookie应该尽可能少的使用，另外cookie还需要指定作用域，不可以跨域调用（当前页面只能读取页面所在域的 cookie，即 document.cookie ），限制比较多。但是用来识别用户登录来说，cookie还是比storage更好用的。其他情况下，可以使用storage，就用storage。

storage在存储数据的大小上面秒杀了cookie，现在基本上很少使用cookie了。

localStorage和sessionStorage唯一的差别一个是永久保存在浏览器里面，一个是关闭网页就清除了信息。localStorage可以用来夸页面传递参数，sessionStorage用来保存一些临时的数据，防止用户刷新页面之后丢失了一些参数。

## 6. 使用方法
### Cookie 的使用方法：

`设置 Cookie`：可以使用 `document.cookie` 来设置 Cookie。例如，`document.cookie = "username=John Doe"` 会创建一个名为 username，值为 John Doe 的 Cookie。

`读取 Cookie`：可以使用 document.cookie 来读取所有的 Cookie。它会返回一个字符串，其中包含了所有的 Cookie，每个 Cookie 之间用分号和空格隔开。例如，`var x = document.cookie` 会将所有的 Cookie 赋值给变量 x。

### localStorage 和 sessionStorage 的使用方法类似，它们都具有相同的操作方法，例如 setItem、getItem 和 removeItem 等 1。

`设置数据`：可以使用 setItem 方法来存储数据。例如，`localStorage.setItem("key", "value")` 会在 localStorage 中创建一个名为 key，值为 value 的数据。

`读取数据`：可以使用 getItem 方法来读取数据。例如，`var value = localStorage.getItem("key")` 会从 localStorage 中读取名为 key 的数据，并将其赋值给变量 value。

`删除数据`：可以使用 removeItem 方法来删除数据。例如，`localStorage.removeItem("key")` 会从 localStorage 中删除名为 key 的数据。
清除所有数据：可以使用 clear 方法来清除所有的数据。例如，localStorage.clear() 会清除 localStorage 中的所有数据。