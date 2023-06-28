Webpack 是一个模块打包工具，可以将多个模块打包成一个或多个文件，以便在浏览器中使用。Webpack 可以处理各种类型的文件，包括 JavaScript、CSS、图片等，并可以处理模块之间的依赖关系。

## 1. Webpack 的一些说明：

1. 安装 webpack
```js
yarn add webpack webpack-cli webpack-dev-server@3.11.2 webpack-merge -D
```

2. webpack 相关插件
```js
yarn add html-webpack-plugin -D                 # 简化 HTML 文件创建以服务捆绑包的插件, 将js文件自动引进 html 文件中
yarn add html-webpack-externals-plugin          #将 JavaScript 和 CSS 文件以外部文件的形式引入，常用于 CDN 加速和缓存。

yarn add css-minimizer-webpack-plugin -D        # 这个插件优化和压缩css
yarn add mini-css-extract-plugin -D             # 抽离css文件, 将css取到单独的文件中，为每个包含css的js件创建一个css文件。
yarn add postcss-flexbugs-fixes -D              # 用于修复一些和 flex 布局相关的 bug

yarn add terser-webpack-plugin -D               # 这个插件使用 terser 压缩 JavaScript
yarn add compression-webpack-plugin -D          # 静态资源压缩, 使用Content-Encoding为它们提供服务

yarn add chalk@4.1.2 -D                         # 终端字符串样式个性化自定义
yarn add copy-webpack-plugin -D                 # 将已存在的单个文件或整个目录复制到生成目录
yarn add error-overlay-webpack-plugin -D        # 这个插件将在你的应用程序中定位显示出错信息
yarn add webpack-bundle-analyzer -D             # 使用交互式可缩放树形地图可视化 webpack 输出文件的大小
yarn add webpackbar -D                          # 优雅的 Webpack 进度条和分析器
```

3. js处理loader
```js
yarn add babel-loader -D
```


3. 样式处理loader
```js
yarn add style-loader -D        # 将结果以style标签的方式插入DOM树中。style-loader将css-loader打包好的 CSS 代码以<style>标签的形式插入到 HTML 文件中
yarn add css-loader -D          # 主要是解析css文件中的@import和url语句，处理css-modules，并将结果作为一个js模块返回
yarn add less less-loader -D    # less预处理器处理
yarn add postcss-loader -D      # 进一步处理css文件，比如添加浏览器前缀，压缩 CSS 等
yarn add postcss-preset-env -D  # 最新的 CSS 语法转换为目标环境的浏览器能够理解的 CSS 语法，目的是使开发者不用考虑浏览器兼容问题。
yarn add autoprefixer  -D       # PostCSS 处理浏览器兼容问题
```

4. 文件处理loader
```js
yarn add file-loader -D        # 将文件扩展名为.json的文件转换为JSON
yarn add url-loader -D          # 将图像文件转换为base64编码的图像数据，并在页面加载时显示在页面上
```

webpack已经弃用，已默认内置资源模块
```js
module.exports = {
  output: {
    // ...
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  // other...
  module: {
    rules: [
      // other...
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: []
}
```


## 2. webpack 相关优化策略

`使用新增cache属性，缓存进行优化（推荐）:`
在webpack5之前，一般会使用cache-loader将编译结构写入磁盘缓存，或者使用babel-loader?cacheDirectory=true，设置babel编译的结果写进磁盘缓存。

webpack5新增的cache属性，会默认开启磁盘缓存，默认将编译结果缓存在 node_modules/.cache/webpack目录下。

当设置 cache.type: "filesystem" 时，webpack 会在内部以分层方式启用文件系统缓存和内存缓存。 从缓存读取时，会先查看内存缓存，如果内存缓存未找到，则降级到文件系统缓存。 写入缓存将同时写入内存缓存和文件系统缓存。

文件系统缓存不会直接将对磁盘写入的请求进行序列化。它将等到编译过程完成且编译器处于空闲状态才会执行。 如此处理的原因是序列化和磁盘写入会占用资源，并且我们不想额外延迟编译过程。


`externals（推荐）:`
提取项目依赖 对第三方包进行公共包CDN引用，降低包大小配置 

最大的几个文件都是一些公共依赖包，那么只要把这些依赖提取出来，就可以解决 chunk-vendors.js 过大的问题
可以使用 `externals` 来提取这些依赖包，告诉 webpack 这些依赖是外部环境提供的，在打包时可以忽略它们，就不会再打到 chunk-vendors.js 中

webpack.config.js:
```js
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
    // ...
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts',
        jquery: 'jquery',
        lodash: 'lodash',
    },
    // ...
    plugins: [
        new HtmlWebpackExternalsPlugin({
        externals: [
            {
                module: 'jquery', // Vue, VueRouter, axios, echarts
                entry: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js',
                global: 'jQuery' // 
            },
            {
                module: 'lodash',
                entry: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js',
                global: '_'
            }
        ]
        })
    ]
}
```
在这个例子中，我们将 jQuery 和 Lodash 引入到 HTML 中，使用的是各自的 cdn 资源。其中，module 表示引入的模块名，entry 表示引入的 url 地址，global 表示在全局环境下该模块对应的变量名。

使用 externals 后，包体积压缩50%、打包速度提升26%


### resolve优化
1. resolve.alias
使用别名缩短引用模块路径，降低文件解析成本。
```js
module.exports = {
    resolve: {
        alias: {
          '@': path.resolve('src'), // @ 代表 src 路径
        },
    }
}
```
3. resolve.extensions
列表值尽量少
频率高的文件类型的后缀写在前面
源码中的导入语句尽可能的写上文件后缀，如require(./data)要写成require(./data.json)
```js
module.exports = {
...
    resolve:{
        extensions: ['.js', '.jsx'],
    }
}
```

### module优化
`include` 和 `exclude`：排除不需要处理loader文件（exclude优先include）
`cache-loader`（推荐）：对loader解析过的文件进行缓存，默认保存在 node_modueles/.cache/cache-loader 目录下（与cache结合使用减少10%左右速度）
```js
rules: [
      {
        test: /.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
],

```

### optimization优化
1. `terser-webpack-plugin`
去除uglifyjs-webpack-plugin改用`terser-webpack-plugin`做代码压缩（uglifyjs-webpack-plugin社区已失去维护，都是2年前的代码，虽然也已支持多进程，但实测效果明显不如terser-webpack-plugin）

2. `css-minimizer-webpack-plugin`（推荐）：
对进行css压缩

3. `splitChunks代码分割` （推荐）: 
主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的js文件）

4. `runtimeChunk`：创建一个额外的文件或chunk，减少 entry chunk 体积，提高性能。


```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 这个插件优化和压缩css
const TerserPlugin = require('terser-webpack-plugin'); // 这个插件使用 terser 来缩小/最小化你的 JavaScript

module.exports = {
  ...
  optimization: {
        minimize: true,
        // 允许你通过提供一个或多个定制过的 TerserPlugin 实例， 覆盖默认压缩工具(minimizer)
        minimizer: [
            new TerserPlugin({
                extractComments: false, // 删除注释
                terserOptions: {
                    compress: {pure_funcs: ['console.log', 'console.warn']}
                }
            }),
            new CssMinimizerPlugin()
        ],
        // 对于动态导入模块，请在 SplitChunksPlugin 页面中查看配置其行为的可用选项。
        splitChunks: {
            automaticNameDelimiter: '-', // 生成名称的分隔符
            chunks: 'all', // all-所有模块生效，async-抽取异步模块，initial:同步模块生效
            // minSize: 100000, //  todo, 后续还有性能问题再拆, 生成 chunk 的最小体积（以 bytes 为单位）。
            // maxSize: 40000, // todo, 后续还有性能问题再拆, 生成 chunk 的最大体积（以 bytes 为单位）。
            cacheGroups: {
                commons: {
                    test: /[/\]node_modules[/\]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                // 抽离自定义工具库
                utilCommon: {
                    name: 'common',
                    minSize: 0, // 将引用模块分离成新代码文件的最小体积
                    minChunks: 2, // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                    priority: -20 // 优先级
                }
            }
        },
        runtimeChunk: true
    }
  ...
};
```
### plugin优化

1. `eslint-webpack-plugin`：
eslint-loader替代方案，可以配置自动fix，和多核编译
```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintPlugin()],
  // ...
};
```

2. `mini-css-extract-plugin` (推荐) ：
mini-css-extract-plugin 是一个用于将 CSS 提取成独立文件的 Webpack 插件。
使用它可以单独将 CSS 文件从 Javascript 中分离出来，以便浏览器可以并行下载 CSS，从而提升页面加载速度。
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ...
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
};
```

3. 组件库的按需引入(`babel-plugin-import`)
为什么没有使用 externals 的方式处理组件库呢？
`externals缺点`： 直接在html内引入的，失去了按需引入的功能，只能引入组件库完整的js和css
`组件库按需引入的原理`：最终只引入指定组件和对应的样式

babel-plugin-import 是一个 Babel 插件，能够帮助 Ant Design 实现按需加载组件。

以下是使用 babel-plugin-import 配置的示例代码：
```js
// .babelrc
{
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
    }]
  ]
}
```
在上面的示例中，我们使用 babel-plugin-import 配置加载 antd 库的 es 模块，并按需加载组件，而不是引入整个库。
这样可以有效减少所需加载的文件大小。

. 减小三方依赖的体积

继续分析打包文件，项目中使用了 momentjs，发现打包后有很多没有用到的语言包

```js
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

new MomentLocalesPlugin({localesToKeep: ['zh-cn']})
```
减小三方依赖体积后，包体积压缩82%、打包速度提升59%

4. `HappyPack `多线程打包 (已经不推荐了，推荐使用`thread-loader`)
由于运行在 Node.js 之上的 webpack 是单线程模型的，我们需要 webpack 能同一时间处理多个任务，发挥多核 CPU 电脑的威力

HappyPack 就能实现多线程打包，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，来提升打包速度

```js
const HappyPack = require('happypack');
const os = require('os');
// 开辟一个线程池，拿到系统CPU的核数，happypack 将编译工作利用所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    // ...
    plugins: [
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool
        })
    ]
}
```

`thread-loader`:
注意：thread-loader不可以和 mini-css-extract-plugin 结合使用
原理：与HappyPack类似，每次webpack解析一个模块，thread-loader会将它及它的依赖分配给worker进程中
```js
rules: [ 
    { 
        test: /\.js[x]?$/, //对所有js后缀的文件进行编译 
        include: path.resolve('src'), //表示在src目录下的.js文件都要进行一下使用的loader 
        use: [ 'babel-loader', { 
            loader: 'thread-loader', 
            options: { workers: 3, }, 
        }, // 'happypack/loader', ]
    }
]
```

5. Gzip压缩
线上的项目，一般都会结合构建工具 webpack 插件或服务端配置 nginx，来实现 http 传输的 gzip 压缩
目的就是把服务端响应文件的体积尽量减小，优化返回速度

html、js、css资源，使用 gzip 后通常可以将体积压缩70%以上.
这里介绍下使用 webpack 进行 gzip 压缩的方式，使用 `compression-webpack-plugin` 插件
```js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    //...
    plugins: [
        new CompressionPlugin({
            test: /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
            threshold: 1024, //文件大小大于这个值时启用压缩
            deleteOriginalAssets: false //压缩后保留原文件
        })
    ]
}
```

6. DllPlugin 动态链接库 || hard-source-webpack-plugin `(已经不推荐，webpack5有cache，或者external)`
DllPlugin 与 externals 的作用相似，都是将依赖抽离出去，节约打包时间。
区别是 DllPlugin 是将依赖单独打包，这样以后每次只构建业务代码，而 externals 是将依赖转化为 CDN 的方式引入
当公司没有很好的 CDN 资源或不支持 CDN 时，就可以考虑使用 DllPlugin ，替换掉 externals

1）创建 dll.config.js 配置文件
2）package.json 配置脚本
```js
"build:dll": "webpack --config ./dll.config.js",
```
3）使用 DllReferencePlugin 将打包生成的dll文件，引用到需要的预编译的依赖上来
并通过 html-webpack-tags-plugin 在打包时自动插入dll文件

先运行 npm run build:dll 打包生成依赖文件，以后只用运行 npm run build 构建业务代码即可

`webpack5`现在默认支持缓存，我们只需要以下配置即可：
```js
module.exports = {
  //...
  cache: {
   // 默认type是memory也就是缓存放到内存中
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  //...
};
```

7. Module Federation(模块联邦)
`Module Federation` 是一种新的技术，用于在 Webpack 打包过程中实现模块共享。它可以让不同的应用程序共享各自的模块，这些模块可以在运行时跨越不同的应用程序边界并进行交互，从而构建出更为复杂且灵活的应用程序。

以下是 Module Federation 的使用示例：

假设我们有两个独立的 React 应用程序 App1 和 App2，它们需要共享 App2 中的某些模块。要实现这一目的，需要进行以下配置：

在 App2 中添加 Webpack 插件 module-federation-plugin，如下所示：
```js
plugins: [
  new ModuleFederationPlugin({
    name: "App2",
    filename: "remoteEntry.js",
    exposes: {
      "./Button": "./src/components/Button",
      "./Alert": "./src/components/Alert",
    }
  }),
],
```

在上面的示例中，我们使用 ModuleFederationPlugin 插件配置了 name、filename、exposes 等选项。其中，exposes 选项指定了需要共享的模块以及其相对路径。

在 App1 中，添加 Webpack 插件 module-federation-plugin，并配置 App2 的远程服务。示例代码如下：
```
plugins: [
  new ModuleFederationPlugin({
    name: "App1",
    remotes: {
      "App2": "App2@http://localhost:3001/remoteEntry.js"
    }
  })
],
```

在上面的示例中，我们使用 ModuleFederationPlugin 插件配置了 name 和 remotes 等选项。其中，remotes 选项指示 App1 应用应该使用来自 App2 的远程模块，并指定 App2 的入口点 URL。

这样，当 App1 被加载时，它将下载远程 App2 的代码，根据实际需要使用 App2 暴露的共享组件，从而实现两个应用程序之间的模块共享。

需要注意的是，通过 Module Federation 实现模块共享需要进行一定的配置和管理。同时，由于模块共享可能会导致代码耦合性增加，因此在使用 Module Federation 时应该谨慎考虑其适用性，以及如何管理共享模块的版本、安全性和兼容性等问题。

8. webpack.DefinePlugin
`DefinePlugin` 是 Webpack 内置的插件之一，它允许在代码中创建全局常量，这些常量可以在编译时进行定义，从而可以在应用程序的任何地方使用这些常量。这些常量是不可改变的，而且在生产构建中也会被混淆和压缩，从而减小了应用程序的体积。

`DefinePlugin` 的基本语法如下：
```js
new webpack.DefinePlugin({
  key1: 'value1',
  key2: JSON.stringify('value2'),
  key3: JSON.stringify(process.env.NODE_ENV)
})
```

其中，每个属性的值都会被当做代码片段来处理。如果这个值不是字符串，Webpack 会尝试将其转化为字符串。如果希望值保持为字符串，可以使用 JSON.stringify 来进行处理。
在上面的示例中，key1 的值是一个字符串，key2 是一个被转化为字符串的值，key3 是 process.env.NODE_ENV 的值，也被转化为了一个字符串。在使用 DefinePlugin 时，要注意使用这些被定义的数值时的上下文。

使用 DefinePlugin 可以减小应用程序的体积，同时也可以在代码中创建一些常量以便进行调试和打印一些信息。例如，可以定义一个名为 __DEV__ 的常量来检查是否在开发环境中运行代码：
```js
new webpack.DefinePlugin({
  __DEV__: JSON.stringify(process.env.NODE_ENV === 'dev')
})
```

在代码中就可以这样使用：
```js
if (__DEV__) {
  console.log('Running in development mode.')
}
```

则只有在开发环境中才会输出 "Running in development mode."。