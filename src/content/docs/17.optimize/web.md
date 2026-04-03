---
title: '🚀 前端性能优化与技术方案手册 (2025版)'
---

# 🚀 前端性能优化与技术方案手册 (2025版)

## 一、 网站性能与首屏渲染 (FP/LCP/FCP)

1. **分包与加载策略**
   - **动态懒加载**：使用 `import()` 异步引入非首屏模块（如路由懒加载）。
   - **Tree Shaking**：基于 ESM 静态分析，剔除未引用的死代码（Dead Code）。
2. **渲染模式与推送**
   - **服务端渲染 (SSR/SSG)**：提前生成 HTML，解决白屏问题，提升 SEO。
   - **服务器推送 (H2 Push)**：在浏览器请求 HTML 时主动推送核心 JS/CSS。
   - **资源预拉取 (Preload)**：强制浏览器提前下载首屏关键资源。
3. **缓存与传输**
   - **缓存策略**：合理配置 `Cache-Control`（**强缓存**）与 `Etag`（**协商缓存**）。
   - **CDN 加速**：利用内容分发网络减少物理距离带来的延迟。
4. **渲染性能优化**
   - **轻量化占位 (LCP)**：首屏优先加载 1kb 低质量占位图（LQIP），减少布局偏移。
   - **Hydration（水和）**：分段加载动态代码，实现从静态 HTML 到动态交互的渐进式转换。
5. **持续监控**：借助浏览器 Lighthouse查看 LCP 指标，根据建议进行微调。



### 1.1、强缓存和协商缓存

现代 Web 开发中，`ETag` (`If-None-Match`) 通常优先于时间 (`If-Modified-Since`) 使用，因为时间戳可能存在以下限制：

1、if-modified-since

核心机制一：使用时间戳 (`Last-Modified`) 服务器记录并检查资源的最后修改时间

- **首次请求**：当客户端第一次请求某个数据（例如一个 JSON 接口 `/api/data`）时，服务器在响应头中加入 `Last-Modified`，

- **提取客户端时间**：从请求头中获取 `If-Modified-Since` 的值（客户端缓存的时间）。
- **查询服务器时间**：从数据库中查询该资源的 `updated_at` 字段（服务器的最新时间）。
- **比较判断**：
  - 如果服务器的 `updated_at` **晚于**客户端的时间，说明数据有更新

- 响应

  ~~~shell
  # 服务器的响应头
  HTTP/1.1 200 OK
  Last-Modified: Sat, 29 Oct 2022 19:43:31 GMT
  Content-Type: application/json
  ~~~

- 前端携带

  ~~~shell
  # 浏览器发送的请求头
  If-Modified-Since: Sat, 29 Oct 2022 19:43:31 GMT
  ~~~

  

2、If-None-Match

核心机制二：使用实体标签 (`ETag`) `ETag` 是一种更精确的机制，它通常是文件内容的哈希值（内容的指纹）。只要内容有任何一个字节的变化，哈希值就会改变。

1. **生成 ETag**：后台在生成数据（例如将数据序列化为 JSON 字符串）后，计算其内容的哈希值（如 MD5、SHA1 等）。这个哈希值就是 ETag。

2. **处理 GET 请求**：当客户端发起 GET 请求并带上 `If-None-Match` 请求头时，后台执行以下逻辑：

   - **提取客户端 ETag**：从请求头中获取 `If-None-Match` 的值（客户端缓存的哈希值）。

   - **计算当前 ETag**：计算当前最新的数据内容的哈希值（或者从缓存中直接获取已有的版本号/哈希值）。

   - 这里的缓存指的是后端的缓存，从后端缓存中直接获取（最推荐）

     这是最高效的方式。为了避免每次请求都重新计算数据哈希值的性能开销，后台会将数据本身和其对应的 ETag（哈希值或版本号）一起存储在服务器端的缓存中（例如 Redis、Memcached 或应用的内存缓存）。

**在 Node.js (Express) 中的简化示例：**

大多数现代 Web 框架和服务器（如 Nginx、Express、Django）都内置了处理这些缓存头的中间件或功能，开发者只需要确保数据库中有正确的时间戳或能方便计算哈希值即可。

- 响应

  ~~~shell
  # 服务器的响应头
  HTTP/1.1 200 OK
  ETag: "abcdef123456789"
  Content-Type: application/json
  ...
  ~~~

- 前端携带

  ~~~shell
  # 浏览器发送的请求头
  If-None-Match: "5f8a9e4c-1a2b"
  ~~~





## 二、 JavaScript 运行性能优化

1. **多线程与离线化**
   - **Web Worker**：将密集型计算任务（如加密、数据分析）移出主线程。
   - **PWA**：利用 Service Worker 实现离线缓存与秒开体验。
2. **高性能计算**
   - **WebAssembly (WASM)**：适用于视频编辑、3D 渲染等对计算性能要求极高的场景。
3. **动画与执行时机**
   - **requestAnimationFrame (rAF)**：保证动画执行频率与屏幕刷新率一致（通常 60Hz）。
4. **脚本解析控制**
   - **Async/Defer**：控制脚本下载与执行的时机，防止 JS 阻塞 DOM 解析。
5. **长列表渲染**
   - **虚拟列表**：只渲染视口内的 DOM 节点，解决超长列表导致的内存崩坏。
   - **分段渲染**：配合 `requestIdleCallback` 在浏览器空闲时分批渲染组件。

## 三、 CSS 与样式隔离方案

1. **架构模式**
   - **原子化 CSS**：如 Tailwind CSS，减少重复代码，提升样式复用。
   - **CSS Modules**：通过 JS 模块化方案生成唯一类名，解决全局命名冲突。
2. **物理与逻辑隔离**
   - **命名约束 (BEM)**：通过规范限制样式作用域，index。
   - **Shadow DOM**：实现真正意义上的样式物理隔离，内部样式不外溢。
   - **::part 伪元素**：允许外部在受控范围内修改 Shadow DOM 内部样式。



## 四、 静态资源加载优化

1. **网络预处理和服务器推送**
   - **域名预解析 (dns-prefetch)**：提前解析第三方域名 IP。
   - **Preload & Prefetch**：Preload 用于当前页面必用资源，Prefetch 用于预测未来跳转页面的资源。
   - http2 push服务器推送
2. **图片优化**
   - **响应式图片**：根据屏幕 DPR 使用 2 倍图或 3 倍图。
   - **懒加载**：使用原生 `loading="lazy"` 或 IntersectionObserver 实现图片按需加载。
3. **分发策略**
   - **CDN 托管**：将静态资源部署至边缘节点，降低网络抖动影响。
4. 二倍图



### 4.2、http2	

1. h2是基于2进制字节码传输，h1是文本传输，会更快，会将传输的信息，分割为更小的消息(一些**头部信息**)，采用**二进制格式对它们编码**，这些帧对应着特定数据流中的消息，他们都在一个**TCP连接内复用**。

   > 2进制解析更高效 

2. 多路复用，通过一个tcp链接并行传输多个请求和响应，大大提高并发量

   > 可以实现多路复用的原因，在HTTP/2中，流是一个单独的请求/响应的序列。每个流都有**唯一的标识符**，所以多个流可以在同一个连接上并行进行，互不干扰
   >
   > 
   >
   > 帧：每一帧都包含几个字段，有**length、type、flags、stream identifier、frame playload**等，其中type 代表帧的类型，在 HTTP/2 的标准中定义了 10 种不同的类型，包括上面所说的 HEADERS frame 和 DATA frame。此外还有： `PRIORITY`（设置流的优先级） `RST_STREAM`（终止流） `SETTINGS`（设置此连接的参数） `PUSH_PROMISE`（服务器推送） `PING`（测量 RTT） `GOAWAY`（终止连接） `WINDOW_UPDATE`（流量控制） `CONTINUATION`（继续传输头部数据）
   >
   > 
   >
   > h1没有，是串行的没有标识，就只能等待之后在处理

   还有h1没有并发，并发是浏览器允许的

3. 请求头压缩，减少体积

   > 消息头中携带cookie每次都需要重复传输几百到几千的字节，使用了HPACK算法来压缩头字段，这种压缩格式对传输的头字段进行编码，减少了头字段的大小
   >
   > 重点：，在两端维护了索引表，用于记录出现过的头字段，后面在传输过程中就可以传输已经记录过的头字段的索引号，对端收到数据后就可以通过索引号找到对应的值。

4. 服务器推送(重点)

   > 在HTTP/2中，服务器可以对一个客户端的请求发送多个响应。如果一个请求是由你的主页发送的，服务器可能会响应主页内容、logo以及样式表，因为服务端知道客户端会用到这些东西。这样不但减轻了数据传送冗余步骤，也加快了页面响应的速度，提高了用户体验
   >
   > 服务端根据客户端的请求，提前返回多个响应，**推送额外**的资源给客户端



6. 

   





# 🚀前端业务方案

## 一、无感刷新token



###### 方法一：

请求前，通过拦截器判断后端返回的超时字段，前端判断有没有超时，超时的话重新请求下token，拿到新的请求之后在发送请求

> 缺点：后端要多一个token超时的字段，系统时间不准确的话无法刷新token

###### 方法二：

不在请求前拦截，而是拦截返回后的数据。先发起请求，接口返回过期后，先刷新`token`，再进行一次重试。

> 缺点：因为是拿到请求后，发送的请求，会耗费流量



## 二、心跳机制

> 简单来说用来检测网络断掉的情况，或者服务器down的情况，因为这两种情况并不会触发onclose()事件
>
> **如果长时间未收到心跳消息，可以认为连接已断开**

- 有两种方式，一个是服务器发送心跳(对后端服务器要求比较高)，一个是客户端发送心跳

现代浏览器以chrome浏览器举例，只要服务器发送ping消息，浏览器会自动返回一个pong消息。反之也一样。这就是浏览器自带的心跳机制。具体实现因后端socket框架而异，可能后端的socket框架没这功能。建议是按照标准执行，也只是建议，不遵守的多了。可以看看这个对ping和pong的说明。[![img](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3f843e8626a3844c624fb596dddd9674.svg)datatracker.ietf.org](https://link.juejin.cn/?target=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc6455%23section-5.5.2)

~~~js
 // 开启心跳
  const start = () => {
    clearTimeout(timeoutObj);
    // serverTimeoutObj && clearTimeout(serverTimeoutObj);
    timeoutObj = setTimeout(function () {
      if (websocketRef.current?.readyState === 1) {
        //连接正常
        sendMessage('hello');
      }
    }, timeout);
  };
  const reset = () => {
    // 重置心跳 清除时间
    clearTimeout(timeoutObj);
    // 重启心跳
    start();
  };
  
  ws.onopen = (event) => {
      onOpenRef.current?.(event, ws);
      reconnectTimesRef.current = 0;
      start(); // 开启心跳
      setReadyState(ws.readyState || ReadyState.Open);
    };
    ws.onmessage = (message: WebSocketEventMap['message']) => {
      const { data } = message;
     
      if (data === '收到，hello') {
        reset();
        return;
      }
      if (JSON.parse(data).status === 408) {
        reconnect();
        return;
      }
      onMessageRef.current?.(message, ws);
      setLatestMessage(message);
    };
 const connect = () => {
    reconnectTimesRef.current = 0;
    connectWs();
  };

~~~



## 三、点9文件图制作

> 介绍，是可以拉伸的一种图片类型，通常用来做按钮的边框背景图，是png类型的，.9文件就是，png类型的图片**名字**后面加个.9

- 使用android studio 生成.9文件, 将png 图片放到 android/app/src/main/res/drawable文件夹下，右键Create 9-patch file创建

注意这几个点就可以了

1. 划线自己研究把
2. 只需要一个选项 画完线选中show patches,会显示线交接的颜色
3. 粉色拉伸区域
4. 白色内容区域
5. 绿色不拉伸区域



# 🚀 首屏加载慢



## 一、 渲染与部署架构 (Architecture)

解决应用“在哪里渲染”以及“如何分发”的核心问题。

| 技术项                                                | 核心描述                                                     | 适用场景                                   |
| :---------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------- |
| **SSR (服务端渲染)**                                  | 服务器生成 HTML 直接返回浏览器，加快首屏展示。               | SEO 需求高、首屏性能敏感的应用。           |
| **SSG (静态生成)**                                    | 构建时生成纯静态 HTML 文件，部署至 CDN。                     | 文档、博客、活动页等内容变动频率低的页面。 |
| **模块联邦 (MF)**                                     | 多个独立构建的应用在**运行时**共享代码，无需 NPM 安装。      | 大型微前端项目、跨团队组件库共享。         |
| **CDN (分发网络)**                                    | 将静态资源缓存至全球边缘节点，就近接入。                     | 所有静态资源（JS, CSS, 图片）的分发基石。  |
| 路由懒加载                                            |                                                              |                                            |
| 公共依赖分包 (SplitChunks / ManualChunks组件库懒加载) | unplugin-vue-components，通常框架会有继承的插件，底层就是**按需引入** element/button，这个插件就是帮忙改了下import 路径而已 | 禁止全量打到主包                           |

------



## 二、策略优化 构建产物治理 (Bundle Governance)

通过打包工具（Vite/Webpack）深度精简代码体积。

- **Tree Shaking**：基于 ESM 静态分析，自动剔除未被使用的“死代码”。

  为什么“只靠按需引入”也不完美？

  如果你手动进行按需引入，开发体验会极其糟糕：

  javascript

  ```javascript
  // 如果没有插件，你得手动写成这样，非常痛苦
  import ElButton from 'element-plus/es/components/button'
  import 'element-plus/es/components/button/style/css'
  import ElInput from 'element-plus/es/components/input'
  // ...
  ```

  而且，如果你在一个组件内部引入了某个工具类函数，但只用了其中一个方法，这时候依然需要 **Tree Shaking** 来剔除该文件中剩余的其他方法。

  

- **使用 CDN 引入大库**：

> 将 `echarts`, `xlsx` 等不常变动的重型库设为 `external`，通过 CDN 的 `<script>` 标签引入，不占用 `index.js` 体积。
>
> 防止第三方库全部塞进主包（vendor.js），利用浏览器缓存。
>
> 它的核心底层原理是：**告诉构建工具（Vite/Webpack）：“在打包时跳过这些库，不要把它们的代码塞进我的代码包里，运行的时候我会从别的地方**



## 三、 ManualChunks

它的核心作用是：**打破默认的打包逻辑，由开发者手动指定哪些模块应该被合并在一起，生成独立的 JS 文件。**

① 实现“长效缓存” (Long-term Caching)

你可以把**从不改动**的第三方库（如 `vue`、`pinia`、`axios`）拆分到一个独立包中。

- **结果**：你发布新版本时，业务代码包变了，但 `vendor.js` 没变，浏览器直接读取本地缓存，实现**秒开**。

② 防止“重复打包”

当多个懒加载路由共用一个大型库（如 `Echarts`）时，`manualChunks` 可以强制将其提取为一个独立文件，避免每个路由包里都包含一份 `Echarts`。

③ 细粒度控制

你可以根据功能模块拆分。例如将所有“办公文档相关”的库（`xlsx`、`pdf.js`）打包在一起，只有用户进入办公模块时才下载这部分“重资产”。

```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 vue 全家桶打入一个名为 'vue-vendor' 的包
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // 将 UI 库打入一个包
          'ui-vendor': ['element-plus', '@element-plus/icons-vue'],
        }
      }
    }
  }
}
```



## 四、静态资源优化

- **SVG Sprite Maker**：将零散 SVG 自动编译为单张雪碧图，减少请求数，并生成 **TypeScript Enum** 代码提高开发调用效率figma有对应的插件。
- 放入cdn,避免build的时候占用过多的内存

------

## 五、离线与持久化缓存 (Caching)

通常解决“二次访问”与“弱网环境”下的体验问题。

也可以将cache storeage利用起来开发时做缓存

- **PWA 缓存 (Progressive Web App)**：
  - 通过 **Service Worker** 拦截网络请求。
  - 利用 **Cache Storage** 存储关键资源，实现应用在离线状态下的秒开体验。

------

## 💡 总结：优化优先级建议

1. **第一阶段 (收益最高)**：路由懒加载 + 开启 Gzip/Brotli 压缩 + CDN 分发。
2. **第二阶段 (产物精简)**：ManualChunks 分包 + 按需引入组件 + Tree Shaking。
3. **第三阶段 (极致体验)**：Preload 关键资源 + PWA 离线缓存。
4. **第四阶段 (架构升级)**：根据业务复杂度选择 SSR/SSG 或模块联邦。
