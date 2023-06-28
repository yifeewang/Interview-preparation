##  Babel
Babel 是一个工具链，主要用于将 ECMAScript 2015+ 代码转换为当前和旧版浏览器或环境中的向后兼容版本的 JavaScript。Babel 可以在构建过程中将源代码转换为目标代码，也可以在运行时实时转换代码。以下是 Babel 的一些说明：

Babel 可以转译多种 JavaScript 语法和特性，包括 ES6/ES2015、ES7/ES2016、ES8/ES2017、ES9/ES2018 等。

Babel 的转译规则是可配置的，可以使用预设集合或插件来指定转译规则。

Babel 可以与 Webpack、Rollup、Gulp 等构建工具集成使用，以便在项目构建过程中对代码进行转译。

Babel 可以实时转译代码，以便在开发过程中使用最新的 JavaScript 特性，而无需担心它们是否受到浏览器支持的限制。

Babel 可以使用 polyfill 来模拟新特性，以便在旧版本浏览器或环境中使用新特性。

Babel 还支持 TypeScript 转译，可以将 TypeScript 代码转译为 JavaScript 代码，以便在浏览器或 Node.js 等环境中运行。


### 安装 babel 及相关预设
```js
yarn add @babel/core  -D.                       # Babel 的核心功能
yarn add @babel/cli  -D                         # 一个能够从终端（命令行）使用的工具
yarn add @babel/preset-env  -D                  # 根据 browserslist 中浏览器设定，进行 polyfill
yarn add @babel/preset-react -D                 # 预设集合: 转译jsx
yarn add @babel/plugin-transform-runtime  -D    # 按需转换api
yarn add @babel/runtime-corejs3 -D              # corejs: false 只对ES语法进行了转换, corejs：2 沙盒环境，不污染全局空间, 无法实例方法, corejs: 3 沙盒环境，不污染全局空间, 可以实例方法
```

### babelrc 配置
根目录创建 .babelrc
```js
module.exports = {
    // 预设集合 (presets) 执行顺序: 从后往前。
    presets: [
        [
            '@babel/preset-env', // 根据 browserslist 中浏览器设定，进行 polyfill
            {
                /**
                 * useBuiltIns功能说明: '@babel/preset-env'如何进行 polyfills
                 * useBuiltIns配置说明如下:
                 * false: 只做了语法转换
                 * entry: 引入了所有的es扩展包 (不用的也会打包进来)
                 * usage: 自动检测代码中用到的功能自动引入模块
                 */
                useBuiltIns: 'usage',
                corejs: 3
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    // 插件集合 (plugins) 执行顺序: 从前往后。
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                absoluteRuntime: false,
                /**
                 * corejs配置说明如下:
                 * corejs: false 只对ES语法进行了转换
                 * corejs：2 沙盒环境，不污染全局空间, 无法实例方法
                 * corejs: 3 沙盒环境，不污染全局空间, 可以实例方法
                 */
                corejs: 3,
                helpers: true,
                regenerator: true,
                useESModules: false
            }
        ]
    ]
};
```


## react 配置 babel
React组件大多是由ES6语法编写。ES6是对语法的一次很好的改进，但老版本浏览器往往不能解析新的ES6语法。
webpack并不知道如何将ES6语法转换为ES5，不过webpack可以使用loader来完成。即webpack加载器将一些东西作为输入，并将其转换为其他东西输出。webpack中的babel-loader便担任着将ES6语法转换为浏览器所能理解语法的工作。
`babel-preset-env` 负责将ES6语法转换成ES5
`babel-preset-react` 负责将JSX语法转化为JavaScript安装依赖：

```js
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

不要忘记配置Babel。在工程根目录下创建.babelrc文件，配置如下：
```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

现在，我们需要编写一个简短的webpack配置文件。

创建webpack.config.js文件，配置如下：
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```