---
title: 'nuxt服务端执行流程'
---

# nuxt服务端执行流程

> nextjs，区分的是纯服务端组件和客户端组件， nuxt则更加灵活，组件中的js在服务端和客户端都会执行，根据位置，生命周期，代码，来决定混合的状态





## 一、按“代码所在位置”区分

### 1) `<script setup>` 顶层代码

- SSR 会执行
- 客户端 hydration 也会接管这份状态
- 所以这里写 `window/document/localStorage` 容易炸（除非加 `import.meta.client`）

### 2) `onMounted / onBeforeUnmount`

- 只在客户端执行
- 适合 DOM 操作、事件监听、浏览器 API

### 3) `onServerPrefetch`

- 只在服务端执行
- 常用于 SSR 前预取数据

### 4) `import.meta.server` 分支

- 只服务端

if (import.meta.server) { ... }

### 5) `import.meta.client` 分支

- 只客户端

if (import.meta.client) { ... }

### 6) `ClientOnly` 包裹的模板区域

- SSR 不渲染内部内容
- 只在客户端渲染该子树

### 7) `.client.vue` / `.server.vue`

- 文件级硬限制：
  - `.client.vue` 只客户端
  - `.server.vue` 只服务端.server.vue 如果这样写就是纯服务端组件了，不会在客户端运行这份组件代码

------

## 二、按“生命周期”区分（Vue/Nuxt 常用）

### 只在客户端

- `onMounted`
- `onBeforeUnmount` / `onUnmounted`
- `onActivated` / `onDeactivated`（依赖 keep-alive）

### 只在服务端（Nuxt/Vue SSR）

- `onServerPrefetch`

### 同构都可能参与（重点）

- `setup` 函数本身（含 `<script setup>` 顶层逻辑）
- `watch` / `computed` / `ref` 的定义本身（定义会发生在 setup 执行时）
  - 但回调是否触发，取决于依赖是否变化和执行环境

------

## 三、你可以用这套“速判规则”

1. 要碰 DOM / 浏览器对象 → 放 `onMounted` 或 `import.meta.client`
2. 要保证首屏 HTML 已有数据 → `useFetch({ server: true })` / `onServerPrefetch`
3. 不想 SSR 渲染这块 UI → `ClientOnly` / `.client.vue`
4. 纯计算/状态初始化 → 可放 setup 顶层（同构）

------

一句话：
“位置”决定代码在哪端可执行，“生命周期”决定代码在该端的哪个阶段执行。



------

## 3) 统一刷新入口（`refresh` 作为唯一重拉动作）

~~~vue
<script setup lang="ts">

const { data, pending, error, refresh } = await useFetch('/api/user/info', {
  key: 'user-info',
  server: true,
})

*// 团队约定：禁止直接再调同接口，统一走 refresh*
async function onRetry() {
  await refresh()
}

</script>
~~~



要点：

- “再请求一次”统一从 `refresh()` 走，行为可约束、可审查
- 比到处散落 `$fetch('/api/user/info')` 更可控



# 第一节 Node服务器端渲染(SSR)



## 一、单页应用程序（SPA）

> ◼ 单页应用程序 (SPA) 全称是：`Single-page application`，SPA应用是在客户端呈现的（术语称：CRS）

- 整个应用程序的内容都是通过 Javascript 动态加载，包括应用程序的逻辑、UI 以及与服务器通信相关的所有数据。
- 构建 SPA 应用常见的库和框架有： React、AngularJS、Vue.js 等。



### 1、SPA优点

1. 加载速度快

   > SPA应用程序只需要在第一次请求时加载页面，页面切换不需重新加载，而传统的Web应用程序必须在每次请求时都得加
   > 载页面，需要花费更多时间。因此，SPA页面加载速度要比传统 Web 应用程序更快。

2. 更好的用户体验

   > 由于页面是由js加载生成的，切换的时候不需要发送请求，没有重新加载，从而体验更加流畅
   >
   > 可轻松构建web应用



### 2、缺点

1. SPA应用默认只返回一个空HTML页面，不利于SEO （search engine optimization )
2. 首屏加载的资源过大时，一样会影响首屏的渲染



## 二、搜索引擎的优化（SEO）

> seo，需要获取到完整的html页面，这样的话spa应用在这方面并没有优势

1. 语义化标签

   > 多使用语义化标签，但是不能过多使用h标签，**过多的h标签并不会全部解析**

2.  meta标签优化：设置 description keywords 等

   ~~~html
   <title>Nuxt3中文文档</title>
   <meta name="description" content="由Nuxt3对赌学习群产出的中文文档">
   ~~~

3. title标签

4. robots.txt : 规定哪些页面不允许爬取

5. sitemap.xml站点地图：在站点列出所有的网页，确保爬虫不会漏掉某些网页

   > [更多查看：](https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata)



## 三、SSG静态站点生成

> 静态站点生成(SSG) 全称是：Static Site Generate，是预先生成好的静态网站。

- 一些插件会将spa页面进行编译，生成静态页面，但是这样的话会让页面失去更多的交互性

- 如果网站的内容需要更新了，那必须得重新再次构建和部署。

- 优点
  - 访问速度非常快，因为每个页面都是在构建阶段就已经提前生成好了。
  - 直接给浏览器返回静态的HTML，也有利于SEO
  - SSG应用依然保留了SPA应用的特性，比如：前端路由、响应式数据、虚拟DOM等
- SSG的缺点：
  - 页面都是静态，不利于展示实时性的内容，实时性的更适合SSR。
  - 如果站点内容更新了，那必须得重新再次构建和部署。

## 四、SSR服务器渲染

>  通过后台服务处理请求，拼接好html字符串根据不同的请求返回不同的html

- 常见的解决方案：模板引擎配合后台，或者一些前后端分离的主流框架，nuxtjs，nextjs
- 使用场景
  1. saas网站
  2. 门户网站、商务网站
  3. 静态网站
  4. crm、采购、后台管理

- ssr优点
  1. 更改快的首屏加载
  2. 更好的seo
  3. ssr 在 `Hydration` 水和之后，依然可以保留 web 应用的交互性，例如：前端路由、响应式数据、虚拟DOM等
- 缺点
  1. 每次进行切换的时候都会向服务器发送请求，**消耗更多的服务器资源**成本过高
  2. 增加了一定的开发成本，用户需要关心哪些代码是运行在**服务器端**，哪些代码是运行在**浏览器端**。
  3. SSR 配置站点的缓存通常会比SPA站点要复杂一点



# 第二节、vue3 SSR原理

> Vue除了支持开发SPA应用之外，其实也是支持开发SSR应用的。

- vue中可以使用 express 服务

- 在官方文档中、并不建议自己手动搭建，可以使用更成熟的框架或者插件，这里只做了解

- 总的来说一共四步

  1. createSSRApp 创建应用，注意：**跨请求状态污染**

  2. 搭建服务，通过@vue/server-renderer 包中的 renderToString 来进行渲染

  3. renderToString 渲染将app生成html字符串响应浏览器

  4. 水和过程，通过 createApp 创建客户端app，进行挂载dom上，之后将js打包通过script标签引入到html中

     > 就是将客户端的js放到html中，让应用具有交互的能力





## 一、创建 SSR 应用过程

> 在Vue中创建SSR应用，需要调用createSSRApp函数，而不是createApp



### 1. 创建 SSR APP

> 返回一个函数，这样可以避免请求状态污染

~~~js
import { createSSRApp } from "vue";
import App from "./App.vue";
// 返回一个函数，目的是每次请求页面都返回一个新的app，避免多个用户使用同一个app实例
export default function createApp() {
  // 创建app
  const app = createSSRApp(App);
  return app;
}
~~~



### 2、请求状态污染

- 在SPA中，是一种单例模式，因为全部是js在跑逻辑，所以一套js下来可以共用同一个一个App对象实例 或 一个Router对象实例 或 一个Store对象实例

  > 简单理解，spa在没有懒加载的情况下，一次请求一整个应用都下来了，所以是单例的

- 在 SSR 环境下，App应用模块通常只在服务器启动时初始化一次。同一个应用模块会在多个服务器请求之间被复用

  > 相同的html会被多个请求获取，但是html不是整个应用，时候如果app 、router、store还是单例的话，状态会影响到其他用户

  - 我们把这种情况称为：跨请求状态污染。

- SSR的解决方案：
  1. 在每个请求中为整个应用创建一个全新的实例，包括后面的 router 和全局 store等实例
  2. 在创建App 或 路由 或 Store对象时都是使用一个**函数来创建**，保证每个请求都会创建一个**全新的实例**
  3. 这样也会有缺点：需要消耗更多的服务器的资源。

### 3、express创建服务

- 需要在 html模板上**添加具有id的元素**，<u>用于客户端app挂载</u>
- 打包之后需要启动服务

~~~js
import express from "express";
//到入createSSRApp 创建的 app
import createApp from "../app";
import { renderToString } from "@vue/server-renderer";

import createRouter from "../router/index";
//在ssr下需要使用内存路由
import { createMemoryHistory } from "vue-router";

import { createPinia } from "pinia";

let server = express();
server.use(express.static("build"));
server.get("/*", async (req, res) => {
  let app = createApp(); // 每次请求创建一个新的 app 实例
  // 安装路由
  const router = createRouter(createMemoryHistory());
  app.use(router);
  await router.push(req.url || "/"); // 跳转首页
  await router.isReady(); // 在客户端 和服务端我们都需要 等待路由器 先解析 异步路由组件
  // 安装pina
  const pinia = createPinia();
  app.use(pinia);
//创建app实例, 这里renderToString是异步的需要等待
  const appContent = await renderToString(app);
  console.log(appContent);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="data:;base64,=">
        <title>Document</title>
      </head>
      <body>
        <h1> Vue + Server Side Render</h1>
        <div id="app">${appContent}</div>
		<-- 将打包好的客户端js进行水和-->
        <script src="/client/client_bundle.js"></script>
      </body>
    </html>
  `);
});
server.listen(3000, () => {
  console.log("Node Server Start On 3000");
});

~~~



### 4、创建 Client app

- 指定要挂在的元素，一定要挂载
- 之后单独打包，生成的js要引入到响应的js模板

~~~js
import { createApp } from "vue";
import App from "../App.vue";
import { createWebHistory } from "vue-router";
import createRouter from "../router";
import { createPinia } from "pinia";
let app = createApp(App);

// 安装路由
const router = createRouter(createWebHistory());
app.use(router);

// 安装pina
const pinia = createPinia();
app.use(pinia);

// 在客户端 和服务端我们都需要 等待路由器 先解析 异步路由组件
router.isReady().then(() => {
  app.mount("#app");
});


~~~



### 5、配置文件

1. 基本配置

   ~~~js
   let path = require("path");
   let nodeExternals = require("webpack-node-externals");
   let { DefinePlugin } = require("webpack");
   let { VueLoaderPlugin } = require("vue-loader/dist/index");
   module.exports = {
     //作用打包的js不会丑化代码，方便阅读
     mode: "development",
     module: {
       rules: [
         {
           test: /\.js$/,
           use: [
             {loader: "babel-loader",options: {presets: ["@babel/preset-env"]},
             },
           ],
         },
         {
           test: /\.vue$/,
           loader: "vue-loader",
         },
       ],
     },
     plugins: [
       new VueLoaderPlugin(),
       // 定义两个环境变量，关闭option api 和 pro 调试的提示
       new DefinePlugin({
         __VUE_OPTIONS_API__: false,
         __VUE_PROD_DEVTOOLS__: false,
       }),
     ],
     resolve: {
       extensions: [".js", ".json", ".wasm", ".jsx", ".jsx", "vue"],
     },
   };
   ~~~





2. server端配置

   > webpack-node-externals 会返回一个函数，针对与服务器打包的工具
   >
   > 配置在mode同级结构下，配置选项externals：[]

   ~~~js
   let path = require("path");
   let nodeExternals = require("webpack-node-externals");
   let baseConfig = require("./base.config");
   let { merge } = require("webpack-merge");
   module.exports = merge(baseConfig, {
     //target 设置为 node，webpack 将在类 Node.js 环境编译代码。(使用 Node.js 的 require 加载 chunk，而不加载任何内置模块，如 fs 或 path)。
     target: "node",
     entry: "./src/server/index.js",
     output: {
       filename: "server_bundle.js",
       path: path.resolve(__dirname, "../build/server"),
     },
     //帮忙忽略node_modules中的js文件，注意options选项和mode同级别的
     externals: [nodeExternals()],
   });

   ~~~

3. 客户端配置

   ~~~js
   let path = require("path");
   let baseConfig = require("./base.config");
   let { merge } = require("webpack-merge");
   module.exports = merge(baseConfig, {
     target: "web", // 构建目标环境
     entry: "./src/client/index.js",
     output: {
       filename: "client_bundle.js",
       path: path.resolve(__dirname, "../build/client"),
     },
   });

   ~~~









# 第三节、Nuxt3

> **Nuxt 是一个 直观的 Web 框架**，可以用来快速构建下一个 Vue.js 应用程序，如支持 **CSR 、SSR、SSG 渲染模式的应用等**

- 特点

  1. 支持数据双向绑定 和 组件化（ `Nuxt` 选择了`Vue.js` ）。

  2. 兼容旧版浏览器，支持最新的 `JavaScript` 语法转译（ `Nuxt`使用esbuild ）。

  3. `Nuxt` 支持 `webpack5` 和 `Vite`

  4. 应用程序支持开发环境服务器，也支持服务器端渲染 或 API接口开发。

  5. `Nuxt` 使用 `h3`来实现部署可移植性（h3是一个极小的高性能的http框架）

     > 支持在 `Serverless`、`Workers` 和 `Node.js` 环境中运行

  6. 服务器引擎

     - 在开发环境中，它使用 `Rollup` 和 `Node.js` 。

     - 在生产环境中，使用 `Nitro` 将您的应用程序和服务器构建到一个通用 `.output` 目录中。

       > Nitro服务引擎提供了扩平台部署的支持，包括 Node、Deno、Serverless、Workers等平台上部署。
       >
       > Nitro 可以从相同的代码库生成适合不同宿主提供商的不同输出格式。
       >
       > 使用内置的预置，你可以很容易地配置 Nitro 来调整它的输出格式几乎没有额外的代码或配置



- Nuxt 发展史
  - Nuxt.js 诞生于 2016 年 10 月 25号，由 Sebastien Chopin 创建，主要是基于Vue2 、Webpack2 、Node 和 Express。
  - 在2018 年 1 月 9 日， Sebastien Chopin 正式宣布，发布 Nuxt.js 1.0 版本。重要的变化是放弃了对 node < 8 的支持
  - 2018 年 9 月 21 日， ， Sebastien Chopin 正式宣布，发布 Nuxt.js 2.0 版本。
    ✓ 开始使用 Webpack 4 及其技术栈， 其它的并没有做出重大更改。
  - 2021年8月12日至今，Nuxt.js 最新的版本为：Nuxt.js 2.15.8
  - Nuxt3版本：经过 16 个月的工作，Nuxt 3 beta 于 2021 年 10 月 12 日发布，引入了基于 Vue 3、Vite 和 Nitro( 服务引擎 ) 。
  - 六个月后， 2022 年 4 月 20 日，Pooya Parsa 宣布 Nuxt 3 的第一个候选版本，代号为“Mount Hope”
  - 在**2022年11月16号**， Pooya Parsa 再次宣布 Nuxt3 发布为第一个正式稳定版本。



## 一、nuxt3的特性

> `Nuxt3` 是基于 `Vue3 + Vue Router + Vite` 等技术栈，全程 `Vue3+Vite` 开发体验（`Fast`）

1. 使用的vue技术栈

2. 自动导包

   - ~会自动导入**辅助函数(宏函数)**、组合 `API`和 `Vue API` ，无需手动导入

   - **基于规范**的目录结构，Nuxt 还可以对自己的组件、 插件使用自动导入。

3. 约定式路由（目录结构即路由）

   > `Nuxt` 路由基于`vue-router`，在 `pages/` 目录中创建的每个页面，都会根据目录结构和文件名来自动生成路由

4. 渲染模式：`Nuxt` 支持多种渲染模式（`SSR`、`CSR`、`SSG`等）

   > 利于搜索引擎优化：服务器端渲染模式，不但可以提高首屏渲染速度，还利于`SEO`

5. 服务器引擎

   - 在开发环境中，它使用 `Rollup` 和 `Node.js` 。

   - 在生产环境中，使用 `Nitro` 将您的应用程序和服务器构建到一个通用`.output`目录中。

     > **`Nitro`**服务引擎提供了**跨平台**部署的支持，包括 **`Node、Deno、Serverless、Workers`等平台上部署**





## 二、搭建nuxt3

> node版本最好是16以上的版本

- `npx nuxi init hello-nuxt`

  > 通常会报 raw.githubusercontent.com，域名访问失败的错误

  - 修改host文件，可以解析域名的ip

    > Mac：/etc/hosts
    > Win：c:/Windows/System32/drivers/etc/hosts

    ~~~
    185.199.108.113
    185.199.109.113
  185.199.110.113
    185.199.111.113
    ~~~

  - 之后载重新执行创建命令



### 1、目录结构

~~~js
assets				#资源目录
components			#组件目录
composables			#组合API目录
ayout				#布局目录
pages				#定义页面文件夹，路由会根据该页面目录结构和文件名自动生成，不能随便的定义
	>index.vue		#项目的首页
plugins				#插件目录
pub1ic				#静态资源目录，不参与打包，src属性,背景图片可以直接通过`/imageName.png`读取静态资源
app.vue				#整个应用程序的入口文件
app.config.ts		#应用程序的配置
nuxt.config.js		#可定制Nuxt框架的配置，比如：css、ssr、vite、app、modules等
package-1ock.json	#项目依赖库版本的锁定
package.json		#项目的描述文件
README.md			#项目简介
tsconfig.json		#Typescript的配置文件
~~~



#### 1.1、页面结构规则

1. pages：index.vue  ---->   "/"
2. pages：detail/index.vue  ---->   "/detail"
3. pages：detail/bar.vue  ---->   "/detail/bar"
4. pages：detail/bar/index.vue  ---->   "/detail/bar"
5. pages：detail/bar/item.vue  ---->   "/detail/bar/item"





### 2、 入口文件 App.js

> Nuxt 会将此文件视为入口点，并为应用程序的每个路由呈现其内容，

- 定义页面布局 Layout 或 自定义布局，如：NuxtLayout
- 定义路由的占位，如：NuxtPage
- 编写全局样式
- 全局监听路由 等等



### 3、Nuxt 配置

> nuxt3 使用的是ts作为配置文件，通过宏函数 `defineNuxtConfig` `option`选项来配置项目， 使用`defineNuxtConfig` 会有**更好的配置选项提示**

- [更多配置查看官方文档]( https://nuxt.com/docs/api/configuration/nuxt-config)：

  ~~~typescript
  // https://nuxt.com/docs/api/configuration/nuxt-config
  export default defineNuxtConfig({
    //1、定义运行时的环境
    runtimeConfig: {
      //驼峰标记，会在服务端获取，可以在process.server线程 通过useRunTimeConfig().appKey获取
      //.env 文件配置的变量，会覆盖掉配置选项里面的配置
      //这里定义的环境变量，不会放到process.env变量中
      appKey: "zhangsan",
      //在服务端和客户端都可以获取
      public: {
        baseUrl: "http:yanan.wang"
      }
    },

    //定义应用的配置, 这里的变量都会打包到项目里面去，这些是不会覆盖的，并且兼容 server和client都可以获取的
    //区别，runtimeconfig 配置的是运行时的变量，不会提前加载，没有热模块替换，只支持基本数据类型
    //appconfig的变量会被打包，但不是环境变量，都是响应式的
      //useAppConfig() 获取
    //  app.config：定义公共变量，比如：在构建时确定的公共token、网站配置。
    appConfig: {
      title: "网站的title",
      theme: {
        primary: "重要的"
      },

    },
    //app配置，给所有页面seo优化，mate name = keywords and description
    //也可以使用 useHead({}) 配置，具体使用看文档
    app: {
      head: {
        title: "zhangsan 网站",
        meta: [
          {
            name: "keywords",
            content: "关键字"
          },
          {
            name: "description",
            content: "这里时网站的藐视"
          }
        ],
        style: [
              // <style type="text/css">:root { color: red }</style>
              { children: ':root { color: red }'}
         ],
        link: [
          {
            rel: "shortcut icon",
            href: "favicon.ico",
            type: "image/x-icon",
          },
        ],
        script: [
          {
            src: "http://codercba.com",
          },
        ],

      }
    },
    //默认就是true
    ssr: true,
    router: {
      //配置路由的模式
      options: {
        //只能在spa使用，hashmode模式
        hashMode: true
      }
    },
    //默认已经配好了
   /*  alias: {
      "~~": "/<rootDir>",
      "@@": "/<rootDir>",
      "~": "/<rootDir>",
      "@": "/<rootDir>",
      "assets": "/<rootDir>/assets",
      "public": "/<rootDir>/public"
    } */
   /*
    //配置Nuxt扩展，比如@nuxt/pinia，@nuxt/image
    modules:[],
    //定义路由规则，更改路由渲染模式或分配基于路由缓存策略
    routeRules: {},
    //指定打包工具
    builder: "vite" */
  })

  //使用方法
  const runtimeConfig = useRuntimeConfig();
  if (process.server) {
      //运行载服务端
    console.log(runtimeConfig.appKey);
    console.log(runtimeConfig.public.baseURL);
  }
  if (process.client) {
      //运行在客户端
    // console.log(runtimeConfig.appKey); // not
    console.log(runtimeConfig.public.baseURL);
  }
  ~~~



- .env 文件

  > 优先级要高于 `runtimeConfig`

  ~~~~shell
  #nuxt 通过dotenv插件进行读取，可以在process.env中进行获取
  PORT = 9090
  #这里会用dotenv这个库来读取变量，修改端口号
  NUXT_PUBLIC_BASE_URL = "http://yanan.wang"
  #NUXT_PUBLICE_***定义的变量，可以在客户端 和服务端 都可以获取
  NUXT_APP_KEY = "ZHANGSAN"
  #NUXT_APP_*** 定义的变量只能在服务端获取
  ~~~~



- `app.config.ts`

  > Nuxt 3提供了一个app.config配置文件公开应用程序中的响应性配置，能够在生命周期内的运行时更新它，或者使用nuxt插件并使用HMR(热模块替换)编辑它。

  - 同 `nuxt.config.ts` 中的 `appConfig` 配置作用相同

  ~~~
  export default defineAppConfig({
    foo: 'bar'
  })
  ~~~




#### 3.1环境配置，

> nuxt 会通过 `process.dev` 变量控制是否在开发环境，反之就是false



### 4、nuxt资源

- `nuxt` 项目的 `public` 目录是静态资源目录，可以直接通过 `/` 进行获取

  > 例如：img的 src 属性，或者 css背景的 url() 都可以开头使用 `/` 写入

- 手动创建的 assets 目录就需要使用 `~ or @` 符号在根目录导入了

  > 也支持背景色 url函数 ， `assets:  @/assets/imageName.png, bgc: url(@/assets/imageName.png)`

- 支持 `import` 模块的方式导入，和base64



#### 4.1.字体图标

1. al字体图标库，下载

2. 找到 `iconfont.css` 和 `iconfont.ttf` 进行配置，其他文件都不需要

   ```css
   @font-face {
     font-family: "iconfont"; /* Project id  */
     src: url('./iconfont.ttf?t=1680068030973') format('truetype');
   }
   ```



### 5、全局css、scss

> 配置 `css` 有两种方式，一个是在 `app` 实例中设置在不指定 `scope` 的情况下设置，一个就是在 `nuxt.config.ts` 文件配置

~~~shell
npm install sass --save-dev
~~~



#### 5.1. css配置

- app.vue 设置

  ~~~less
  //这里是app的style
  <style>
  .index {
    color: red;
  }
  </style>
  ~~~

- `nuxt.config.ts` 中配置css选项

  > 常用，配置全局的css，和一些css变量

  ~~~js
  export default defineNuxtConfig({
      //nuxtjs推荐使用 ~ 符号
      css: ["~/assets/css/index.css"]
  })
  ~~~



#### 5.2. scss配置

> 直接 `npm install sass` 之后就可以直接使用了



- `scss` **推荐导入使用 `@use` 语法**，这样导入的有点是**性能快**，有自己的**命名空间**，防止引入多个变量文件的时候会有**冲突**

  ~~~html
  <style lang="scss" scoped>
  //这里需要添加 as 起个别名，不需要明明空间的时候可以 as *
  @use "@/assets/scss/index.scss" as main;
  .box {
    @include main.box
  }
  </style>
  ~~~

- 自动导入到**scss相关模块**的**首行**添加导入语句

  - 命名空间**不**可以和**局部**引入的 **@use** 重复，否则会冲突报错

  ~~~js
  export default defineNuxtConfig({
      vite: {
          css: {
              preprocessorOptions: {
                  scss: {
                      //自定导入scss相关模块的首行添加额外的数据
                      additionalData: '@use "@/assets/scss/index.scss" as vb;'
                  }
              }
          }
      },
      css: ["~/assets/css/index.css"],
  })
  ~~~





## 三、Nuxt3 内置组件

- `SEO`组件： `Html`、`Body`、`Head`、`Title`、`Meta`、`Style`、`Link`、`NoScript`、`Base`

-  `NuxtLayout`：是 `Nuxt` 自带的页面**布局组件**

- `ClientOnly`：该组件中的**默认插槽**的内容只在**客户端渲染**

  > 就是通过js渲染的，不是在服务器端渲染好的

  - `fallback`：fallback 有两种使用的方法，一种是**属性写法**，一种**插槽写法**

    > 和Suspaces 性质相同，会在客户端没有完全渲染元素之前进行显示

    ~~~html
     <div class="container">
        <!-- loading... 只会在默认插槽没有渲染完成的时候显示 -->
        <ClientOnly fallback="loading...">
            <div class="info">
              默认插槽放入的元素只会在客户端使用js加载
            </div>
        </ClientOnly>
        <!-- 第二种写法，插槽效果同上-->
        <ClientOnly fallback="loading...">
            <div class="info">
              默认插槽放入的元素只会在客户端使用js加载
            </div>
            <!-- 会在页面渲染完成前前显示 注意：插槽名只能作用在 template元素上-->
            <template #fallback>
              zhnagsan
            </template>
        </ClientOnly>
      </div>
    ~~~




# 第四节、Nuxt 路由

## 一、文件系统路由

> 页面路由也称为**文件系统路由器（`file system router`）**，路由是Nuxt的核心功能之一

- `Nuxt` 项目中的页面是在 `pages` 目录创建的，**必须在`pages`**下面创建，否则不会声明路由
- `Nuxt`会根据该 `pages` 的**目录结构**和其文件名来**自动生成对应的路由**
- 命令创建页面
  - `npx nuxi add page home`
  - ` npx nuxi add page detail/[id]`
  - `npx nuxi add page user-[role]/[id]`



## 二、路由组件

### 1、NuxtLink

- `NuxtLink`：是 Nuxt 自带的**页面导航**组件

  > 是 `Vue Router<RouterLink>`组件 和 `HTML<a>`标签的**封装扩展**，添加了一些其它功能。

  - `a`标签也会导航页面，，`NuxtLink`可以**防止整页刷新**。当然，手动输入URL后，点击 刷新浏览器也可导航，这会导致整个页面刷新

- `NuxtLink` 组件属性

  - `to`：支持路由**路径**、**路由对象**、**`URL`**

    ~~~typescript
     <NuxtLink
            :to="{
              path: '/category',
              query: {
                id: 100,
              },
            }"
          >
    ~~~



  - `href`：to的别名

  - `replace`：默认为false，是否替换当前路由

  - `activeClass`：激活链接的类名

  - `target`：和a标签的target一样，指定何种方式显示新页面

  - 等等.



### 2、NuxtPage组件

> `NuxtPage`：是 `Nuxt` 自带的页面**占位组件**

- 需要**显示**位于目录中的**顶级**或**嵌套页面** `pages/`

  > 是对 `router-view` 的封装

- 当路由被修改的时候，失效的情况下重启下应用



## 三、Api 路由

> Nuxt3除了可以通过`<NuxtLink>`内置组件来实现导航，同时也支持编程导航：navigateTo



### 1、navigateTo

> **既**可以运行在**服务器端**也可以运行在**客户端**



- 优点：稳定，c端，r端都可以用

- 参数：**参数一**是`path`对象或者字符串默认是 `“/”`， **参数二**是 `option` 对象

- **注意**：官方文档没有写 `option` 对象可以传 `state`  对象，但事实上可以的，通过 ` history.state` 进行获取

  > 但是**不会像 route.state 一直保存**

  ~~~js
  //完整写法
  await navigateTo({
  	path: "/app",
      query: {
          name: "zhagnsan"
      },

  }, {
    replace?: boolean
    //修改重定向的状态码
    redirectCode?: number
    //当设置为true时，允许导航到外部URL。否则会报错
    external?: boolean
  })

  //state 获取使用history.state
  function btn() {
    return navigateTo({
      path: "/about",
      query: {
        name: "zhangsan"
      },
      state: {adress: "天津曲艺协会"}
    })
  }



  // 简写
  await navigateTo('/search')
  ~~~



- 当在方法中使用的时候，**官方推荐**返回这个函数，或者使用 `await`

  > 可能是后台路由跳转需要等待，后台渲染完成之后在进行跳转。

  - `await` 可以在顶层作用域使用

  ~~~js
  function toProfile() {
  	return navigateTo("/profile")
  }

  async function toHome() {
  	await navigateTo("/home")
  }
  ~~~



### 2、useRouter

> `nuxt3`中提供了 `useRouter hooks` 和`vue3` 中的使用相同

- `router.push()/.replace` 虽然也能跳转，但是nuxt官方还是推荐使用，navigateTo() 用于**跳转和替换页面**
- 虽然支持路由导航，但是官方还是**推荐**使用**路由中间件**的方式进行路由拦截

- 当前版本的主要作用应该还是动态添加路由

  > 技巧：`router.addRoute()` 将路由细节添加到路由数组中，它在构建Nuxt插件时很有用，而 `router.push()` 则会立即触发一个新的导航，它在`Nuxt Page`组件，`Vue`组件中很有用。

- 不知道是否会等待服务端渲染完成在跳转(个人觉得应该是可以的)



### 3、路径参数

> nuxt3 中的路径参数是在文件命名配置的，需要遵行命名规范

1. `nuxt3` 路径参数 和 `index.vue` 文件可以同时存在

2. 规范：该命名规范，**可用**于 `pages` 路径下的**文件**和**文件夹**

   1. detail[id]
   2. detail-[id]
   3. [id]



- 获取路径参数

  > hooks只能在顶层作用域使用

  ~~~js
  useRoute().params.id
  ~~~



- 获取普通路由的查询对象

  ~~~
  useRoute().query
  ~~~







## 四、错误页面

### 1、noFount页面

> nuxt中，对于noFount 的解决方案，也是根据特定的命名规范

- 定义 `[...slug].vue` 文件

  > 名字随便，但是 [...pagename] 不能省略

- `nuxt` 会分析**该文件**存放的**路由位置**，来**决定后续路由是否有匹配**的页面，**没有匹配**就会**跳转**到**该路由下的 `[...slug].vue` 页面**。

- 通常放在 `pages` 路径下直接覆盖全路径

- 路径参数对象 `params` 会获取到**数组形式的访问路径**



### 2、自定义错误页面

- **当前项目**路径下，并非是pages 路径要注意创建 error.vue

  > 这个组件会接收一个 error 对象，包含当前项目发生的错误信息，和错误码....

  ~~~typescript
  <template>
    <div>
      Error Page {{ error }}
      <div>
        <button @click="goHome">Home</button>
      </div>
    </div>
  </template>

  <script lang="ts" setup>
  const props = defineProps({
    error: Object,
  });

  function goHome() {
     //清除错误重定向到主页
    clearError({ redirect: "/" });
  }
  </script>
  <style scoped></style>
  ~~~



## 五、路由中间件

> Nuxt 提供了一个可定制的 路由中间件，用来监听路由的导航，包括：局部和全局监听（**支持服务器和客户端执行**）

- 参数：`to`,  `from`

  > 路由对象

- **支持服务器端和客户端**

- 返回值

  - 返回 `“ ”`， `null`,  或者没有返回值的时候会自动放行
  - 和 `vue` 不同的是，这里的转发是，要 `return navigateTo()` 方法

- 在 middleware 定义的路由中间件，在页面上使用时会通过**异步导入自动加载**



### 1、局部中间件

> 定义在**当前页面**中，设置元数据

- 只会拦截当前路由，**优先级**根据 `middleware` 数组中的函数**顺序前后决定**

  > 可以同时写多个路由。

  ~~~js
  definePageMeta({
    // 路由中间件( 监听路由 )
    middleware: [
      // 第一个中间件
      function (to, from) {
        console.log("index 第一个中间件");
        // 如果返回的是 "" null, 或 没有返回语句,name就会执行下一个中间件
        // 如果返回的是 navigateTo, 直接导航到新的页面
        // return navigateTo("/detail02");
      },

      // function (to, from) {
      //   console.log("index 第三个中间件");
      // },
        //开始录屏
    ],fsa
  });
  ~~~
~~~



### 2、命名中间件

> 定义在 `middleware` 文件夹下可以让多个页面进行复用这个中间件

- 文件名称就是这个中间件的名字

  ~~~js
  //middleware/home.ts
  export default defineNuxtRouteMiddleware((to, from) => {
    console.log("home.ts 第二个中间件");
  });
~~~

- 在页面中使用

  ~~~js
  definePageMeta({
    // 路由中间件( 监听路由 )
    middleware: ["home", (to, from) => {}],
  });
  ~~~



### 3、全局中间件

> 定义在 `middleware` 文件夹下的 `.global` 结尾 命名的中间件文件

- 会拦截所有的路由，**优先级别最高**

  ~~~js
  // 这个优先级别是比较高的
  export default defineNuxtRouteMiddleware((to, from) => {
    const isLogin = false;
    console.log("index 第三个中间件 auth.global.ts");
    console.log(to);
    // if (!isLogin && to.fullPath !== "/login") {
    //   return navigateTo("/login");
    // }
  });

  ~~~



### 4、路由验证

- 需要返回布尔值类型没有返回值会报错：找不到该路由，不能返回状态码对象(不确定)

~~~js
 definePageMeta({
  //返回当前路由
  validate: route => {
    console.log("home", route)
    return true
  }
 })
~~~



# 五、布局 NuxtLayout

> 布局组件的作用：可以理解为，`thymeleaf`引擎终端中的 `th:include`,  将共有的页面进行抽取

- 可以当作一个更强大的自定义插槽组件

  1. 支持作用域插槽、具名插槽、默认插槽，语法同vue一致

  2. 当作一个插槽组件的基础上，附加了**页面可以选择不同的插槽组件**来**通过包裹优化自己的页面**

     > 普通插槽组件，是页面包插槽，这个相当于是**插槽包裹页面**



- `layouts` 目录下的文件会**通过异步导入自动加载**

  > 不支持文件夹下建index.vue的方式



- `NuxtLayout` 组件的name属性，会根据**文件名称自动生成**

  > 命名规范：文件命名存在大写字母的情况下，在**使用的时候使用驼峰表示法**  `someLayout` 变成`some-layout`



### 1、使用

-  当不指定name的时候使用的是**默认布局** `deault.vue`

  ~~~typescript
  <template>
    <NuxtLayout :name="custom">
      <NuxtPage />
    </NuxtLayout>
  </template>
  ~~~



- 切换布局

  > 注意：这里如果需要切换布局组件的话，就**不要指定`name`属性**

  ~~~typescript
    <NuxtLayout name="custom">
     {/*不要指定默认属性，否则切换失败*/}
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  {/*方式1*/}
  function trigger() {
    setPageLayout("custom")
  }
  {/*方式2*/}
  definePageMeta({
    layout: "custom",
  });
  ~~~







# 六、渲染模式

- 配置那些文件是 `ssr` 那些是 `ssg`，那些需要`csr`
- `swr`的作用：根据指定的间隔时间，多次生成静态页面进行更新。目前**还在beta版本**

~~~js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  routeRules: {
    "/": { ssr: true }, // ssr
    "/category": { ssr: false }, // spa 应用
    // 3.0.0-12rc -> NetLify
    "/cart": { static: true }, // 只会在构建时生成一次静态页面
    "/profile": { swr: true }, // 只会生成多次静态页面( 会自动重新验证页面时候需要重新生成 )
  },
});

~~~



# 七、插件

> Nuxt自动读取您的`plugins`目录中的文件，并在创建vue实例的时候进行加载。

- 自动加载规则：只会加载 `plugins` 目录中的**一级目录下的文件**， **或者**文件夹**下**的 `index` 命名的文件
- 插件注册令：
  1. 为插件文件命名的时候可以**添加个数字前缀**，`nuxt`会根据**前缀的大小**进行**按顺序加载**
  2. 为插件文件命名的时候可以添加个`.server` 或者 `.client` 后缀名，**表示要在那个端运行这个插件**
- 插件中可使用组合文件
- 作用：
  1. 官方推荐使用插件来监听整个应用的伤命周期
  2. 在应用上下文环境中注入一些变量值
  3. 获取vue实例



## 一、插件的使用

> 插件有两种创建方式

- 本质都是想获取 `nuxtApp` 实例，之后做点事情

  > **重点**就是**在什么时机**进行获取 `nuxtApp` 实例。

1. 在 app.vue 文件中通过 `useNuxtApp()` 的 `hooks` ，获取`nuxtApp` 实例进行插件的注入

   > 获取nuxtApp的时机就是，创建 ~ 根组件运行js的时候进行获取

2. 推荐方式：(优先级高一点)在` plugins`文件夹下的ts文件中通过 `defineNuxtPlugin()` 创建的插件，会在创建`Vue`实例的时候获取到 `nuxtApp` 实例

   ~~~js
   export default defineNuxtPlugin( nuxtApp => {})
   ~~~



## 二、nuxtApp实例

> 它提供了一种访问 `Nuxt` 的**共享运行时上下文**的方法，它在客户端和服务器端都可用。 它帮助你**访问Vue应用**实例，**运行时钩子**， **运行时配置变量和内部状态**，如 `ssrContext` 和 `payload`.



### 1、provide 方法

> 将值和方法通过 `provide`方法**注入**到当前**应用运行时上下文**中，使值和方法在你的Nuxt应用程序中**跨**所有**组合**和**组件**可用。

- 参数：`name`, `value`

  ~~~js
  const nuxtApp = useNuxtApp()
  nuxtApp.provide('hello', (name) => `Hello ${name}!`)
  ~~~

- 使用：会在name的前面添加一个 `$` 符号

  ~~~js
  // Prints "Hello name!"
  console.log(nuxtApp.$hello('name'))
  ~~~



### 2、hooks 方法

> 将特定的方法，**钩入到生命周期函数中**。

- 参数： `name`, `value`

- 使用：`name` 指定的生命周期钩子名称，需要执行的函数

  ~~~js
  export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:start', () => {
      /* your code goes here */
    })
    nuxtApp.hook('vue:error', (..._args) => {
      console.log('vue:error')
      // if (process.client) {
      //   console.log(..._args)
      // }
    })
  })
  ~~~



### 3、vueApp 属性

> 这个属性就是 `vue` 的实例了

- 可以创建全局组件，指令 `directive()`，或者 `use` 一些插件 例如 pinia，vuex...



### 4、ssrContext 属性

> `ssrContext` 是在服务器端呈现过程中生成的，它只在服务器端可用。

- 服务端上下文，提供3个公开的属性

1. `url (string)` - 当前请求url。

2. `event (unjs/h3 request event)` - 访问当前请求的req和res对象。

3. `payload (object) - NuxtApp`有效载荷对象。

   > `payload`将数据和状态变量从服务器端**公开到客户端**，并使它们在`window.__NUXT__`对象中可用，可以从浏览器访问。



### 5、payload 属性

> 会携带 nuxtApp 荷载的数据

- `data`属性：当使用 `useFetch` 通过服务器请求数据的时候，会在服务器的 `payload` 属性中去拿

  > 该数据被缓存，并帮助您防止在多次发出相同请求的情况下获取相同的数据。

- `state`属性：当使用 `useState `的时候，也是在 `payload` 中获取的

- 当从 [ssrcontext](https://nuxt.com.cn/docs/api/composables/use-nuxt-app#ssrcontext) 访问相同的 `payload.data` 时，你也可以在服务器端访问相同的值



# 八、App Lifecycle Hooks

> `created` 和 `beforeCreated hooks`会服务端执行， `setup` 也会**在服务端执行**因为是服务端渲染



- `nuxt3` 推荐我们在**插件中使用** hooks 方法来钩入生命周期函数

- 使用场景：可以做页面跳转的动画

- **注意(重要)**：如果使用 `options Api` 的情况下，**不要**在 `created` 和 `beforeCreated` 钩子函数中**初始化**一些**需要组件销毁“时”清理**的一些方法。

  > 由于时服务端渲染，组件会在后台创建好之后才返回页面，因此 `created` 和 `beforeCreated`  会在server 端执行，而method 方法都是在 client 端执行的，这样就造成了服务端创建的方法一致不会取消
  >
  > 例：定时器

  - `setup` **不需要担心**这个问题因为 `setup`和 `method`不一样，`setup` 定义的函数，会在服务端定义直接和`client` 端水和

    > 其实就是相当与 `setup` 函数中定义的**方法**都是在 `created` 钩子中**创建**的



- 测试 `useFetch` 添加 `await` 是否有效

  > 测试都是一样的效果，不用夹await

- 测试发生错误之后会调用app:error

  > 很重要，参数会打印错误栈，否则不知道是哪发生了错误

- 没有state



| Hook                     | Arguments        | Environment      | Description                                                  |
| ------------------------ | ---------------- | ---------------- | ------------------------------------------------------------ |
| `app:created`            | `vueApp`         | Server & Clients | 初始化vueApp实例前调用                                       |
| `app:error`              | `err`            | Server & Client  | **重要**：发生错误的时候进行调用：可以做后台的错误打印       |
| `vue:setup`              | -                | Server & Client  | setup 函数会在后端执行，因为是后端先进行渲染，因此要注意的是。 |
| `app:rendered`           | `renderContext`  | Server           | ssr后台渲染完成的时候调用                                    |
| `app:beforeMount`        | `vueApp`         | Client           | vue实例客户端挂在前调用，                                    |
| `app:mounted`            | `vueApp`         | Client           | vue实例在客户端挂在后                                        |
| `link:prefetch`          | `to`             | Client           | 预获取url前，浏览器重新发送url前会调用，**注意**： `NuxtLink` 不会重新触发请求，这个时候就**不会调用**，手动输入url 回车的时候才会调用 |
| `page:start`             | `pageComponent?` | Client           | 页面开始加载                                                 |
| `page:finish`            | `pageComponent?` | Client           | 页面加载完成的时候                                           |
| `page:transition:finish` | `pageComponent?` | Client           | 页面你动画完成的时候                                         |



# 九、网络请求

> Nuxt3 中的网络请求是是基于 fetch 的。



- `useLazyFetch(url, opts)`:用于获取任意URL数据，**不会阻止页面导航**

  > 本质和 `useFetch` 的 `lazy` 属性设置为 `true` 一样

- `useFetch(url: opts)` 特点

  1. **阻止页面的响应**

  2. 是一个跨端请求库，既可以在服务端请求也可以在客户端请求

  3. 会自动解析响应和对数据进行字符串化，返回的数据是响应式的。

     > 智能的推断 API 响应类型

  4. `setup` 中用`useFetch `获取数据，会减去客户端重复发起的请求

     > 对于 $fetch 方法的封装，$fetch 会在客户端发送一次请求，server 也会发送一次

  5. `option` 支持响应式数据

- **注意点**：

  - `useFetch` 会阻止页面的响应，需要等待请求结束，将数据组装到 `html` 之后才会响应

    > 官方示例上使用的 `await`，经过测试**不使用** `await` 效果也是**相同**的，可以当做**规范。**

  - **非**顶层作用域生命的 `useFetch` 不会运行在服务端，**会在 `client` 发送请求**

  -  由于 `NuxtLink` 进行**跳转回来**的时候，由于nuxt 的优化，不会向服务器发送请求，这个时候请求也是**在`client` 发送的**



## 和$fetch区别

erver:false 情况2次请求的问题

> 其实就是判断一下请求只在服务端发送就好, userFetch（server：true）基本等同于下面代码

~~~js
if (import.meta.server) {
  await $fetch(...)
}
~~~





## 1) key + 复用语义（同 key 复用）

~~~javascript
const route = useRoute()
const fetchKey = computed(() => `cate-list:${route.fullPath}`)
const { data, pending, error } = await useFetch('/api/cate/list', {
  key: fetchKey,          *// 同 key 复用同一份状态*
  query: { id: route.query.id },
  server: true,
})
~~~



要点：

- 同页面里多个地方如果都用同一个 key，请求/状态更容易复用
- key 变化才会视为另一份数据

------

## 2) 触发时机可控（`immediate/watch/server`）

~~~javascript
const keyword = ref('')
const cateId = ref('')
const { data, pending, error, execute } = await useFetch('/api/goods/list', {
  server: true,               *// SSR 首屏可执行*
  immediate: false,           *// 默认不自动请求*
  watch: false,               *// 不因依赖变化自动重拉*
  query: computed(() => ({
​    keyword: keyword.value,
​    cate_id: cateId.value,
  })),

})

*// 你手动控制何时发请求*

async function onSearchClick() {
  await execute()
}
~~~



要点：

- `immediate: false` + `watch: false`，彻底避免“顺手改个 ref 就自动重拉”
- 请求时机全由你控制（`execute()`）



## 使用



- `option` 对象

  > `option`选项 都**”支持“响应式的数据**，当响应式数据发生改变的时候就会**重新发送请求**

  ~~~js
  {
      method: //请求方式,默认get请求
      query: //查询字符串
      params: //query的别名
      body: //post 请求的请求体
      headers: //对象类型，设置请求头
      baseURL: Base URL for the request.
  }
  ~~~



- `refresh`

  > pending 是响应的状态，成功 `true`， 失败-等待 `false`

  ~~~typescript
  const { data, refresh, pending } = await useFetch<IResultData>(
    BASE_URL + "/goods",
    {
      method: "POST",
      body: {
        count,
      },
    }
  );
  ~~~



- 修改 `option` 对象

  > 可以代替 refresh() 方法

  ~~~js
  function refreshPage() {
    count.value++; // 同上图，修改响应式参数的时候会自动从新发起网络请求
  }
  ~~~



- 拦截器

  > 和 `axios` 的区别，想要修改返回 `data` 的值，**需要重写 `_data`**

  ~~~js
  const { data, pending, error, refresh } = await useFetch('/api/auth/login', {
    onRequest({ request, options }) {
      // Set the request headers
      options.headers = options.headers || {}
      options.headers.authorization = '...'
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {

      //注意：这里 的返回值并不能决定，结构出来 data对象的值，
      //如果需要修改data的值需要重写 _data变量
      return response._data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    }

  ~~~





# 十、componets

> `components/`目录是您放置所有Vue组件的地方, Nuxt**自动导入**你的`components`目录中的任何组件

- 全局组件就不介绍了用的很少，用的时候直接去看官方文档

- 如果是一个**嵌套**的目录结构，会将**文件名+目录名**当作组件的名字

  ~~~typescript
  | components/
  --| base/
  ----| foo/
  ------| Button.vue
  //使用
  <BaseFooButton />
  ~~~

- 可以**手动关闭**这种嵌套目录结构的导入方式

  > 建议关闭这种方式，之后手动导入，否则嵌套越深的话，组件名字越长

  ~~~typescript
  //配置文件
  export default defineNuxtConfig({
    components: [
      {
        path: '~/components/',
  +     pathPrefix: false,
      },
    ],
  });

  //  在 .vue 文件中 在 #components 中进行导入，未测试尝试一下
  <script setup>
    import { NuxtLink, LazyMountainsList } from '#components'
    const show = ref(false)
  </script>
  ~~~



## 三、client 组件

> 如果你的组件**不需要seo优化**的话，可以采用方式在组件名的后**添加 `.client`后缀**

~~~typescript
//路径
| components/
--| Comments.client.vue

//.vue 文件
<template>
  <div>
    <!-- this component will only be rendered on client side -->
    <Comments />
  </div>
</template>

~~~





## 一、动态组件

> 使用Vue `<component :is="someComputedComponent">`语法，那么你将需要使用Vue提供的`resolveComponent`辅助方法。



~~~typescript
<template>
  <component :is="clickable ? MyButton : 'div'" />
</template>
<script setup>
const MyButton = resolveComponent('MyButton')
</script>
~~~



## 二、懒加载组件

> 如果不总是需要该组件，这尤其有用。通过使用`Lazy`前缀，你可以延迟加载组件代码，直到**合适的时刻**，这有助于优化你的JavaScript包大小。

~~~typescript
<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
~~~







# 十一、utils 和 composables

> 在指定文件夹下**顶层目录**创建的文件会自动扫描，创建完记得手动执行 `npm run prepare` 生成类型文件

- **顶层文件**声明的方法会**自动导入**到项目中

~~~js
export default function () {
  return useState('foo', () => 'bar')
}
~~~



# 十二、Server Api

> 用于直接请求数据库数据

1. 在server文件夹下直接创建ts文件

   > 通常会在 serve/api文件下创建

2. nuxt3 会根据文件夹名称和文件名称自动生成请求url

   > http://localhost/文件夹/文件名

3. **后缀**：如果是`.get`  `.post`  `.put`  `.delete` 后缀结尾的，会自动识别为响应的请求

~~~js
export default defineEventHandler((event) => {
  return {
    api: 'works'
  }
})
~~~



## 一、嵌套路由

~~~js
import { createRouter, defineEventHandler, useBase } from 'h3'
const router = createRouter()
router.get('/test', defineEventHandler(() => 'Hello World'))
export default useBase('/api/hello', router.handler)
~~~



## 二、Server Middleware

~~~js
//在server/middlewa 文件夹下创建
export default defineEventHandler((event) => {
  console.log('New request: ' + event.node.req.url)
})
~~~



## 三、配置响应状态码和抛出错误

~~~js
export default defineEventHandler((event) => {
  const id = parseInt(event.context.params.id) as number
  if (!Number.isInteger(id)) {

  //使用createError方法创建错误
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be an integer',
    })
  }
  return 'All good'
})


export default defineEventHandler((event) => {
   //设置响应 状态码
  setResponseStatus(event, 202)
})
~~~



## 四、文件下载

> 响应流的方式，目前是一个实现特性 23年4月2日晚八点43

~~~js
import fs from 'node:fs'
import { sendStream } from 'h3'
export default defineEventHandler((event) => {
  return sendStream(event, fs.createReadStream('/path/to/file'))
})
~~~







## 五、常用工具方法

~~~js
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const method = getMethod(event);
  const body = await readBody(event);
  const bodyRaw = await readRawBody(event);
  //前端使用 useCookie()
  const cookies = parseCookies(event)

  console.log(query);
  console.log(method);
  console.log(body);
  console.log(bodyRaw);
  // 连接数据库 ...
  // mock
  return {
    code: 200,
    data: {
      name: "liujun",
      age: 18,
      token: "aabbcc",
    },
  };
});

~~~





# 十三、状态管理

> nuxt中有自己的状态管理 `useState`。

- `useState` 只能用在 `setup` 函数 和 `Lifecycle Hooks` 中
- `useState` 不支持`classes`, `functions or symbols`类型，因为这些类型不支持序列化



## 一、集成pinia

1. 安装集成nuxt3的pinia中间件，帮助创建pinia示例

   ~~~shell
   npm install @pinia/nuxt –-save
   ~~~



2. 安装pinia，但是要注意，有遇到pinia安装失败，可以添加 `--legacy-peer-deps` 告诉 `NPM` 忽略对等依赖并继续安装。

   > 使用 yarn 则不会有这种情况

   ~~~shell
    npm install pinia  --legacy-peer-deps
   ~~~

3. 在`nuxt.config.ts`文件中添加 `module` 配置

   ~~~js
   export default defineNuxtConfig({
     // 这里是配置Nuxt3的扩展的库
     modules: ["@pinia/nuxt"],
   });
   ~~~

4. 不用手动创建 pinia 示例和在vue示例注册了直接创建store使用

   ~~~js
   import { defineStore } from "pinia";

   export interface IState {
     counter: number;
     homeInfo: any;
   }

   export const useHomeStore = defineStore("home", {
     state: (): IState => {
       return {
         counter: 0,
         homeInfo: {},
       };
     }
   });

   ~~~





# 十四、第三方框架部署



# 十五、项目部署

> nuxt3 运行的是 .output/server/index.mjs 文件

1. 安装nodejs

   > yum 默认不会安装npm的

   ```
   yum install nodejs npm
   ```

2. 由于node 运行项目的时候不会运行在后台，当关闭命令的时候就已经停掉了

   > 因此我们需要使用pm2 ，来帮助项目管理node进程，让它运行在后台

   - pm2 是一个守护进程管理器，它将帮助和管理你的在线应用程序

   - 负责管理 Python、Node 并能让程序一直保持后台运行

     > npm install -g pm2 #下载pm2 版本是(5.2.2)
     >
     > pm2 list #查看管理的进程
     >
     > pm2 start ./.output/server/index.mjs	--name 应用的名字

   - 这样的话当前应用的进程会一直在后台运行



## pm2

1. 基本命令
   - 启动：`PORT=8080 pm2 start  ./.output/server/index.mjs	--name oppo-web `
   - 停止: `pm2 stop 进程的id 或者是 name`
   - 删除：`pm2 delete all|id|name`
   - 查看守护的进程：pm2 lisi



### 负载均衡

> 会让请求在不同的进程请求资源，分担进程的压力，提高响应速度，减少服务器的压力

- 使用场景： 当用户过多的时候，服务器承受不住压力，项目会有down 的可能，这样采用负载均衡就会起到有效的作用

1. `mode`：`pm2`启动项目的运行模式

   - `fork`：表示单例，最基本的运行模式

     > 当前进程挂掉了，整个应用也就挂掉了，这个时候就需要创建多个实例，进行负载均衡

   - `cluster`: `cpu` 有多少核就会启动多少个进程，也可以手动指定

2. 生成配置文件

   - `pm2 init simple` #会生成 `ecosystem.config.js`
   - 这样的话就直接运行 `pm2 start ecosystem.config.js` 就可以了

   ~~~js
   module.exports = {
    apps: [
    	{
           name: "oppo-web",
           script: "./.output/server/index.mjs",
           //表示要启动多少个进行，"max" | number，一般使用max
           instances: max,
           //执行模式，cluster集群, 实现负载均衡
           exec_mode: "cluster",
           env: {
               PORT: 8080
           }
    	}
    ]
   }
   ~~~



3. 一种集群部署的方式





​

# 十六、配置代理



## 一、nitro配置

~~~js
nitro: {
        devProxy: {
            "/api": {
                target: 'http://127.0.0.1:9090/',
                prependPath: true,
                changeOrigin: true,
            }

        }
    }

~~~



## 二、vite配置

~~~

~~~



# 十七、Seo-Kit

> seo工具包

为 Nuxt 配置 SEO 是一项艰巨的工作;它需要安装许多模块，单独配置它们，然后找出所有元标记。
如果有更简单的方法呢？
介绍Nuxt SEO Kit，Nuxt 3的多合一SEO模块。将我所有的SEO模块和最佳实践合二为一，这是改善应用程序SEO的最简单，最快捷的方法。

### 1、Seo-Kit集成的工具

📖 nuxt-simple-sitemap - sitemap.xml Support
🤖 nuxt-simple-robots - 管理网站爬行
🔎 nuxt-schema-org - 为SEO生成 Schema.org JSON-LD
△ nuxt-unhead - 实验性SEO元功能
🖼️ nuxt-og-image - 生成动态社交分享图像
✅ nuxt-link-checker - 检查断开的链接



🤖 搜索引擎可见性已解决
使用机器人规则（机器人.txt、HTTP 标头、元标记）抓取正确的内容
让搜索引擎找到您的内容（站点地图.xml）
富媒体搜索结果的结构化数据 （Schema.org）
自动规范网址
🔗 增强的社交分享
生成动态或静态屏幕社交分享图像
自动打开图和推特元标记
😌 在问题成为问题之前发现问题
自动正确处理尾随斜杠
发现断开的链接
✨ 还有更多
运行时配置模板令牌
使用路由规则管理自定义配置
使用定义页面元作为标题、描述和图像
`<Breadcrumbs/>`- 使用零配置生成符合 Schema.org 标准的痕迹导航
更多即将推出！



### 2、Usage

> 为了使配置能够访问Nuxt应用程序，模块和服务器，应在运行时配置中提供配置。
> 这也允许您轻松覆盖不同环境的配置。

- **使用**：配置好下面的信息之后，通过`<SeoKit />` 组件将配置的源信息**引入**到页面上

  > 只会给添加 `<SeoKit />` 组件的页面引入元数据
  >
  > 通常在 app.js中体检

- **注意**：要在设置其他源标签**之前**引入该组件，否则会**覆盖**



~~~js
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
        //配置站点url，会根据这个url生成 sitemap.xml
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
        //就是title
      siteName: 'Awesome Site',
        //
      siteDescription: 'Welcome to my awesome site!',
      language: 'en', // prefer more explicit language codes like `en-AU` over `en`
          //配置页面title和站点名称的分隔符默认 -
      titleSeparator: '|'
     }
   },
  app: {
    head: {
        //自定义title模板
      titleTemplate: '%pageTitle %titleSeparator %siteName'
    }
  }
})
//<title>About | shop-ljm</title>
~~~

​



### 3、Schema.org

> 需要了解下

1. 选择 `Schema.org` 身份
2. 使用 `Unlighthouse` 扫描您的网站以验证任何 `SEO` 问题



### 4、生成默认的 OG Images

> 注意：不能和 `<SeoKit />` 一起使用，不生效

~~~js
export default function(title, desc, keys, image) {
    //默认生成og标签，但是只能自定义个别属性，需要自定义使用useSeoMeta
  defineOgImageStatic({
    title: title.value ?? title,
    description: desc.value ?? desc,
    keywords: keys.value ?? keys,
    image: image.value ?? image,
    "twitter:image:src": image.value ?? image,
    "twitter:image": image.value ?? image,
    "twitter:description": desc.value ?? desc,
    "twitter:title": title.value ?? title,
  })
  useSeoMeta({
    title: title.value ?? title,
    description: desc.value ?? desc,
    keywords: keys.value ?? keys,
    ogImage: image.value ?? image,
    "twitter:image:src": image.value ?? image,
    "twitter:image": image.value ?? image,
    "twitter:description": desc.value ?? desc,
    "twitter:title": title.value ?? title,
  })
}

~~~





# 十八、缓存

和nextjs区别

先说客户端缓存

**Next.js**：只要你使用 `<Link>` 组件，Next.js 会**自动**在浏览器内存里缓存已访问过的路由段（Route Segments）和数据。当你点击“后退”或“前进”时，页面是瞬出的，完全不发请求。

通过 router.refresh() 清理缓存

next.js 是**“全自动且激进”**的，Nuxt 3 是**“手动且克制”**的。

1. 缓存层级：默认 vs 手动

- **Next.js (App Router)**:
  - **默认全缓存**：你在服务器组件里写个普通的 `fetch`，Next.js 会自动把结果存到服务器硬盘上。
  - **持久化**：即使服务器重启，只要缓存没过期，它就不再请求接口。
  - **代价**：经常出现“后端数据变了，页面怎么刷都不变”的尴尬，必须手动调 `revalidateTag`。

nuxt配置的方式默认是在内存中默认不做持久化，也可以在fs设置

客户端内存缓存

**`useFetch` 或 `useAsyncData`**。它们默认的行为其实**不是“服务器缓存”**，而是**“数据传递”**,设置key之后又在内置路由切换的时候会保留数据但是刷新之后就没有了

~~~js
<script setup>
const productId = ref(1)
// 使用动态 Key
// 只要 productId 变了，Nuxt 会检查内存里有没有这个 key
// 如果有（比如之前点过商品 1），直接从内存拿，不发网络请求
const { data, refresh } = await useFetch(() => `/api/product/${productId.value}`, {
  key: `product-detail-${productId.value}`, // 手动指定唯一 Key

  // 配合这个配置可以实现：即使路由跳走了再回来，只要内存还在就用旧的
  getCachedData(key) { //
    const nuxtApp = useNuxtApp()
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
})

const nextProduct = () => productId.value++
</script>

<template>
  <div>
    <p>当前商品：{{ data?.title }}</p>
    <button @click="nextProduct">下一个（如果是点过的会秒开）</button>
    <button @click="refresh">强制刷新（无视缓存重新请求）</button>
  </div>
</template>

~~~





服务器内存缓存有2种方式，都是在服务端使用useState管理

1. 使用defineCachedEventHandler

~~~js
// server/api/test.get.ts
export default defineCachedEventHandler(async (event) => {
  console.log('这个逻辑 10 秒内只会在服务器运行一次');
  return { time: new Date().toLocaleString() };
}, {
  maxAge: 10 // 缓存 10 秒
})
~~~

2. 使用 routeRules



# 问题

1. useFetch 看不到请求结果

   > 使用nuxt开发工具模块即可，后台的请求都会看的件，异步请求在浏览器看

2. nuxtjs部署配置https和域名

   > 有待测试

3. sitemap.xml

   > 有待测试

4. NuxtChild

5. useRouer...hooks 提示报错的情况下，删除类型文件，重新生成下

6. 动态路由是否可以是seo

7. 动态路由是否可以多个文件夹实现(不是很重要)

8. 复习js和正则

9. nuxt欢迎页取消(解决不了)

   > 打包之后就没有了

10. .env环境

    > 解决通过 process.dev判断是否在开发环境，服务端客户端都能获取

11. axios模块和useFetch 的区别，

    > 在nuxtjs中没有, uselazyFetch 因此需要axios，nuxt3中有了lazy就不需要了

    1. 既可以在服务端发送请求也可以在客户端发送

12. 首页加载慢，白屏

    > nuxt解决此问题

13. 测试路由跳转是否可以使用state参数

14. element plus

15. socket.io

    > 支持3，导入对应的模块

16. 指令

17. https

    > 配置文件 server 中的 https选项

18. 跨域问题解决

19. navtive ui

20. 测试服务端渲染echart

21. nuxt中plugin的特点

    1. ssrContext中payload

    2. payload

       > 是否在useFetche前就获取了data

22. pinia在客户端和服务端都是能获取的













