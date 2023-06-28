
1. html-webpack-plugin

利用该插件的 `templateParameters` 属性，可以将不同资源添加不同域名前缀，从而`分发到不同域名cdn`

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      cssPrefix: 'https://cdn2.example.com/',
      jsPrefix: 'https://cdn3.example.com/',
      cdn: 'https://cdn1.example.com/',
      templateParameters: (compilation, assets, assetTags, options) => ({
        htmlWebpackPlugin: {
          files: {
            css: `${options.cssPrefix}${assets.css}`,
            js: `${options.jsPrefix}${assets.js}`,
          }
        }
      })
    })
  ]
};
```

2. 上述方法貌似不太行？ 下面：

在项目部署时，为了提高访问速度和安全性，通常会将静态资源（如 CSS、JS、图片等）托管到 CDN 上，并且为其添加域名前缀，例如 https://cdn.example.com/static。这样可以避免浏览器在请求静态资源时将 Cookie、Session ID 等信息发送给服务器，降低了请求头的大小，提升了访问速度和安全性。
在使用 webpack 打包项目时，我们可以通过一些插件和配置来自动生成域名前缀，并将其添加到打包后的文件的 URL 中。具体来说，常用的方法有以下几种：

使用 output.publicPath 配置：output.publicPath 是 webpack 的一个出口配置项，用于指定 webpack 构建时生成的静态文件 URL 的前缀路径。例如：
```js
   module.exports = {
     // 其他配置项
     output: {
       publicPath: 'https://cdn.example.com/static/'
     }
   }
```
配置了 publicPath 后，webpack 会自动将输出的 JS、CSS、图片等资源文件的 URL 前缀添加上 https://cdn.example.com/static/。

使用 html-webpack-plugin 插件：html-webpack-plugin 可以自动生成 HTML 文件，并把打包生成的 JS、CSS 文件自动引入到 HTML 页面中。在使用该插件时，可以通过配置 publicPath 选项来指定 CDN 的前缀路径，例如：
```js
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     // 其他配置项
     plugins: [
       new HtmlWebpackPlugin({
         template: 'index.html',
         publicPath: 'https://cdn.example.com/static/'
       })
     ]
   }
```

使用 mini-css-extract-plugin 插件：mini-css-extract-plugin 用于将 CSS 文件提取为独立的文件，可以通过 publicPath 选项来指定 CSS 文件中 URL 资源的前缀路径。例如：
```js
   const MiniCssExtractPlugin = require('mini-css-extract-plugin');

   module.exports = {
     // 其他配置项
     module: {
       rules: [
         {
           test: /\.css$/i,
           use: [
             {
               loader: MiniCssExtractPlugin.loader,
               options: {
                 publicPath: 'https://cdn.example.com/static/'
               }
             },
             'css-loader'
           ]
         }
       ]
     },
     plugins: [
       new MiniCssExtractPlugin({
         filename: '[name].css'
       })
     ]
   }
```
通过以上的配置，webpack 就可以自动生成带有 CDN 前缀的静态资源 URL，提升了项目打包后的访问效率。