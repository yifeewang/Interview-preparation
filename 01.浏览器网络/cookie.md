`Cookie` 是一种用于在客户端（通常是浏览器）和服务器之间存储数据的机制。
它们由名称-值对组成，还可以包含一些可选的属性。以下是常用的 Cookie 属性：

`名称（Name）`: Cookie 的名称用于标识和检索 cookie。名称是区分大小写的。
`值（Value）`: Cookie 的值是存储的数据。可以是字符串或其他格式的数据。值也是区分大小写的。
`域（Domain）`: Cookie 的域属性指定了可以访问该 cookie 的域名。只有与该域匹配的网站才能访问该 cookie。
`路径（Path）`: Cookie 的路径属性指定了可以访问该 cookie 的路径。只有与该路径匹配的网页才能访问该 cookie。
`过期时间（Expires）或最大时长（Max-Age）`: 通过设置过期时间或最大时长，可以确定 cookie 的有效期。在过期时间之后，浏览器会自动删除该 cookie。
`安全标记（Secure）`: 如果设置了安全标记，浏览器只会在使用安全连接（HTTPS）时发送该 cookie。这有助于保护敏感信息。
`HTTPOnly（HttpOnly）`: 如果设置了 HTTPOnly 属性，JavaScript 将无法访问该 cookie。这可以防止某些类型的跨站点脚本攻击。

在 JavaScript 中，可以使用 document.cookie 属性来设置和读取 Cookie。下面是一些示例代码:
```js
// 设置一个名为 "username" 的 cookie，有效期为 7 天，适用于整个域名
document.cookie = "username=John Doe; expires=Sun, 26 Jun 2023 12:00:00 UTC; path=/; domain=.example.com";

// 读取名为 "username" 的 cookie
const cookies = document.cookie;
console.log(cookies);

// 删除名为 "username" 的 cookie，将过期时间设置为过去的时间
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.example.com";
```


请注意，使用 document.cookie 设置和读取 cookie 时，需要注意设置正确的格式和对应的属性。另外，Cookie 的存储容量是有限的，通常限制在几KB或更小，因此需要注意不要存储过大的数据或过多的 cookie。