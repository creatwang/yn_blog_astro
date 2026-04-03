---
title: 'Electron 19'
---



# Electron 19



## 一、Electron 初探

### 1.1 常见的桌面GUI工具介绍

| 名称     | 语音   | 优点                     | 缺点                     |
| -------- | ------ | ------------------------ | ------------------------ |
| QT       | C++    | 跨平台、性能好、生态好   | 依赖多，程序包大         |
| PyQT     | Python | 底层集成度高、易上手     | 授权问题                 |
| WPF      | C#     | 类库丰富、扩展灵活       | 只支持Windows，程序包大  |
| WinForm  | C#     | 性能好，组件丰富，易上手 | 只支持Windows，UI差      |
| Swing    | Java   | 基于AWT，组件丰富        | 性能差，UI一般           |
| NW.js    | JS     | 跨平台性好，界面美观     | 底层交互差、性能差，包大 |
| Electron | JS     | 相比NW发展更好           | 底层交互差、性能差，包大 |
| CEF      | C++    | 性能好，灵活集成，UI美观 | 占用资源多，包大         |
| flutter  | dart   |                          |                          |

- 底层依赖 + 调用：CEF、QT、Swing
- UI美观：Electron（NW.js）、PyQT
- 跨平台：Swing（JAVA）、PyQT（Python、C++）、Electron（前端）

技术是为业务服务的，选择合适的最重要！

### 1.2、Electron 的优势

1.
可跨平台：同⼀套代码可以构建出能在：Windows、macOS、Linux 上运⾏的应⽤程序。
2.
上⼿容易：使⽤ Web 技术就可以轻松完成开发桌⾯应⽤程序。
3.
底层权限：允许应⽤程序访问⽂件系统、操作系统等底层功能，从⽽实现复杂的系统交互。
4. 社区⽀持：拥有⼀个庞⼤且活跃的社区，开发者可以轻松找到⽂档、教程和开源库。

### 1.3、技术架构

Chromium+nodejs+NativeApi

### 1.4 桌面端设计与开发要点

1、UX/UI设计概念

**UX设计：**UX（User Experience）即用户体验，其核心是用户，体验指用户在使用产品以及与产品发生交互时出现的主观感受和需求满足。

**UI设计：**UI（User Interface）使用者界面，可以说是 UX 设计的一部分，其中重要的**图形化或者可视化**部分，都是由 UI 设计来完成的。

2、核心原则

简单易用。

3、通用原则

交互简单：上手就会，一看就懂

风格统一：菜单、导航、按钮反馈、颜色、预知提示

认知一致：名词、友好提示、划分信息、突出展示

4、桌面端设计

保持与PC端统一的风格设计与交互设计。

加入定制的菜单与专业操控设计。

减少资源加载。

### 1.5 初始化项目

1、Electron 官网

https://www.electronjs.org/

2、初始化一个项目

> 初始化⼀个包，并提填写好 `package.json` 中的必要命令

```bash
felixlu electron $ npm init -y
```

3、配置启动脚本

在 package.json 里配置 npm 脚本：

```json
{
  "name": "test",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
 package.json
中的必要信息及启动命令。
    "start": "electron ." //start
命令⽤于启动整个应⽤
  },
  "license": "ISC",
 }
  "author": "tianyu", //
为后续能顺利打包，此处要写明作者。
  "de
```



4、安装` electron` 作为开发依赖

~~~shell
npm i electron -D
~~~



5、在`main.js` 中编写代码，创建⼀个基本窗⼝

~~~js
/*
  main.js
运⾏在应⽤的主进程上，⽆法访问
Web
相关
API
，主要负责：控制⽣命周期、显示界⾯、
控制渲染进程等其他操作。
*/
 const { app, BrowserWindow } = require('electron')
// 主进程
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800, // 窗⼝宽度
    height: 600, // 窗⼝⾼度
    autoHideMenuBar: true, // ⾃动隐藏菜单栏
    alwaysOnTop: true, // 置顶
    x: 0, // 窗⼝位置x坐标
    y: 0 // 窗⼝位置y坐标
  })
 //加载一个本地页面
  win.loadFile('index.html')
}

// 当app准备好后，执⾏createWindow创建窗⼝
app.on('ready',()=>{
 createWindow()
 })
// on监听和app.whenReady().then(createWindow) 是一样的
~~~



- 在项目根目录下创建文件 `index.html` 之后 `npm start` 启动

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Electron Demo</title>
</head>
<body>
  hello Electron
</body>
</html>
```





### 1.6、加载本地页面

修改`mian.js`  加载本地⻚⾯

~~~js
// 加载⼀个本地⻚⾯
win.loadFile('./pages/index.html')
~~~

此时开发者⼯具会报出⼀个安全警告，需要修改`index.html` ，配置 `CSP(Content Security-Policy)`

~~~js
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; st
 yle-src 'self' 'unsafe-inline'; img-src 'self' data:;">
// 或者
// 暂时关闭安全警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
~~~

上述配置的说明

1、`default-src 'self'`

`default-src` ：配置加载策略，适⽤于所有未在其它指令中明确指定的资源类型。
`self` ：仅允许从同源的资源加载，禁⽌从不受信任的外部来源加载，提⾼安全性。

2、`style-src 'self' 'unsafe-inline' `

`style-src`  ：指定样式表（CSS）的加载策略。
`self` ：仅允许从同源的资源加载，禁⽌从不受信任的外部来源加载，提⾼安全性。
`unsafe-inline` ：允许在HTML⽂档内使⽤内联样式。

3、`img-src 'self' data`:

`img-src` ：指定图像资源的加载策略。
`self` ：表示仅允许从同源加载图像。
`data`: ：允许使⽤ `data: URI` 来嵌⼊图像。这种URI模式允许将图像数据直接嵌⼊到HTML或CSS中，⽽不是通过外部链接引⽤。
关于 `CSP` 的详细说明请参考：`MDN-Content-Security-Policy`、`Electron Security`

### 1.7、完善窗口行为

1、Windows 和 Linux 平台窗⼝特点是：关闭所有窗⼝时退出应⽤。

~~~js
// 当所有窗⼝都关闭时
app.on('window-all-closed', () => {
 // 如果所处平台不是 mac(darwin)，则退出应⽤。
if (process.platform !== 'darwin') app.quit()
 })
~~~

2、mac 应⽤即使在没有打开任何窗⼝的情况下也继续运⾏，并且在没有窗⼝可⽤的情况下激活
应⽤时会打开新的窗⼝。

~~~js
// 当app准备好后，执⾏createWindow创建窗⼝
app.on('ready',()=>{
 createWindow()
 // 当应⽤被激活时
app.on('activate', () => {
 //如果当前应⽤没有窗⼝，则创建⼀个新的窗⼝
	})
})
~~~



3、整体配置

~~~js
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    useContentSize: true,
    autoHideMenuBar: true, // 隐藏菜单栏
    simpleFullscreen: true,
    // resizable: false,//可否缩放,会让放大后的窗口不能恢复
    // resizable: process.platform === 'darwin', //可否调整大小
    minimizable: true, // 可否最小化
    maximizable: true, // 可否最大化
    closable: true, // 展示关闭按钮
    fullscreen: false, // MAC下是否可以全屏
    skipTaskbar: false, // 在任务栏中显示窗口
    acceptFirstMouse: true, // 是否允许单击页面来激活窗口
    transparent: false,
    movable: true, // 可否移动
    allowRunningInsecureContent: true, // 允许一个 https 页面运行 http url 里的资源
    // 网页功能设置
    webPreferences: {
      devTools: true, // 是否打开调试模式
      webSecurity: false, // 禁用安全策略
      allowDisplayingInsecureContent: true, // 允许一个使用 https的界面来展示由 http URLs 传过来的资源
      allowRunningInsecureContent: true, // 允许一个 https 页面运行 http url 里的资源
      nodeIntegration: true, // 5.x以上版本，默认无法在渲染进程引入node模块，需要这里设置为true  //是否集成node，默认false
      enableRemoteModule: true // 打开remote模块
    },
    backgroundColor: '#fff',
    title: ''
    // icon: path.join(__dirname, 'icon.ico')
    // icon: ''
  });
  mainWindow.loadFile('index.html');
  // 监听导航完成，防止 HTML 的 <title> 覆盖它
  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault(); // 阻止 Electron 自动根据 HTML 更新标题
  });
}

// 核心代码：将菜单设置为 null
// Menu.setApplicationMenu(null)
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  // 在 Windows 和 Linux 上，通常直接退出
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
~~~



### 1.8、配置自动重启

1、安装 `nodemon`

~~~shell
npm i nodemon -D
~~~



2、修改 `package.json` 命令

~~~json
"scripts": {
 "start": "nodemon --exec electron ."
 },
~~~

3、配置 nodemon.json 规则

~~~json
}
 "ignore": [
 "node_modules",
 "dist"
 ],
 "restartable": "r",
 "watch": ["*.*"],
 "ext": "html,js,css"
}
~~~

配置好以后，当代码修改后，应⽤就会⾃动重启了。



## 二、Electron 核心概念

Electron 应⽤的结构与上图⾮常相似，在 Electron 中主要控制两类进程：主进程、渲染器进程。

### 2.1 Electron 主进程与渲染进程

**主进程：**启动项目时运行的 `main.js` 脚本就是我们说的主进程，每个 Electron 应⽤都有⼀个单⼀的主进程，作为应⽤程序的⼊⼝点。 主进程在 Node.js 环境中运⾏。

**它具有 require 模块和使⽤所有 Node.js API 的能⼒**，主进程的核⼼就是：**使用BrowserWindow来创建管理串口的**。**主进程只有一个**。



**渲染进程：**每个 `BrowserWindow` 实例都对应⼀个单独的渲染器进程，运⾏在渲染器进程中的代码，**必须遵**
**守⽹⻚标准**，这也就意味着: 渲染进程无权直接访问 `require` 或使用任何 `nodejs` 的 `api`



### 2.3 渲染脚本

预加载（Preload）脚本是**运⾏在渲染进程**中的， 但它是在⽹⻚内容**加载之前**执⾏的，这意味着它
具有⽐普通渲染器代码**更⾼的权限**，可以访问 `Node.js` 的 `API`，同时⼜可以与⽹⻚内容进⾏安全
的交互。
简单说：它是 `Node.js` 和 `Web API` 的**桥梁**，`Preload` 脚本可以安全地将**部分 `Node.js` 功能暴露**
给⽹⻚，从⽽减少安全⻛险。

需求：点击按钮后，在⻚⾯呈现当前的 Node 版本。

1、创建预加载脚本 `preload.js` 内容如下：

~~~js
// preload-js/index.js

 //  暴露数据给渲染进程
contextBridge.exposeInMainWorld('myAPI',{
 n:666,
 version:process.version
 })

// 创建 Vue实例
const { createApp } = require('vue')
window.addEventListener('load', () => {
  const app = createApp({
    data() {
      return {
        electronVersion: process.versions.electron,
        nodeVersion: process.versions.node,
        chromeVersion: process.versions.chrome
      }
    }
  })
  app.mount('#root')
})
~~~



2、主线程中引入js

~~~js
const win = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      // 在启动应用时在渲染进程里预加载 js
      preload: path.resolve(__dirname, './preload-js/index.js')
    }
  })
~~~



3、在渲染进程中进行使用, 预加载脚本中暴露的对象会放到 `windows` 全局对象中

~~~js
btn.addEventListener('click',()=>{
    //myApi 直接在全局中取就可以了
 console.log(myAPI.version)
 document.body.innerHTML += `<h2>${myAPI.version}</h2>`
 })
~~~



4、整体结构

![1726990583274](/src/assets/imgs/electron/1726990583274.png)

## 三、进程通信（IPC）

值得注意的是：上⽂中的 preload.js ，**⽆法使⽤全部** Node 的 API ，⽐如：不能使⽤ Node 中的 fs
模块，但主进程（ main.js ）是可以的，这时就需要**进程通讯**了，要**让** preload.js **通知** main.js 去调⽤ fs 模块**去**⼲活。



**重点**：关于Electron 进程通信，我们要知道：
●IPC 全称为：`InterProcess Communication` ，即：进程通信。
●IPC 是`Electron` 中最为核⼼的内容，它是从UI 调⽤原⽣API 的唯⼀⽅法！
● `Electron` 中，主要使⽤ `ipcMain` 和 `ipcRenderer` 来定义“通道”，进⾏进程通信。



### 3.1、渲染进程➡主进程(单向)

概述：在渲染器进程中 `ipcRenderer.send` 发送消息，在主进程中使⽤ `ipcMain.on` 接收消息。
常⽤于：**web中调用主进程API**，例如下⾯的这个需求：

1.
⻚⾯中添加相关元素，`render.js` 中添加对应脚本

~~~html
<input id="content" type="text"><br><br>
 <button id="btn">
在⽤户的D盘创建⼀个hello.txt
</button>
<script type="text/javascript" src="./render.js"></script>
~~~

~~~js

// render.js 就是引入html页面的js
 btn.addEventListener('click',()=>{
 console.log(content.value)
 // 调用
 myAPI.saveFile(content.value)
 })
~~~

2.`preload.js` 中使⽤`ipcRenderer.send('信道',参数)` 发送消息，与主进程通信。

~~~js
const {contextBridge,ipcRenderer} = require('electron')
//暴露给渲染进程
contextBridge.exposeInMainWorld('myAPI',{
 saveFile(str){
 // 渲染进程给主进程发送⼀个消息
  ipcRenderer.send('create-file',str) }
})
~~~

3、主进程中，在加载⻚⾯之前，使⽤`ipcMain.on('信道',回调)` 配置对应回调函数，接收消息。

~~~js
// ⽤于创建窗⼝ main.js
function createWindow() {
 // 主进程注册对应回调
 ipcMain.on('create-file',createFile)
 // 加载⼀个本地⻚⾯
 win.loadFile(path.resolve(__dirname,'./pages/index.html'))
}
 //创建⽂件
function createFile(event,data){
 fs.writeFileSync('D:/hello.txt',data)
}
~~~





### 3.2、渲染进程➡主进程(双向)

概述：渲染进程通过 `ipcRenderer.invoke` 发送消息，主进程使⽤ `ipcMain.handle` 接收并处理消
息。

备注：`ipcRender.invoke` 的永远返回的是 `Promise` 实例。

常用于渲染进程调用主进程方法并等待结果，并呈现到页面上



需求：页面点击按钮，读取d盘种 hello.txt中的内容

1.
⻚⾯中添加相关元素， `render.js`  中添加对应脚本

~~~html
<button id="btn">读取⽤户D 盘的  hello.txt</button>
<script>
const btn = document.getElementById('btn')
 btn.addEventListener('click',async()=>{
 let data = await myApi.readFile();
 document.body.innerHTML += `<h2>${data}</h2>`
 })
</script>
~~~



2. `preload.js` 中使⽤ `ipcRenderer.invoke(信道, 参数)` 发送消息与主进程进行通信

~~~js
const {contextBridge,ipcRenderer} = require('electron')
// 暴露全局对象
 contextBridge.exposeInMainWorld('myAPI',{
     readFile (path){
     	return ipcRenderer.invoke('read-file')
     }
 })
~~~

  3. 主进程中 `main.js`，在加载⻚⾯之前，使⽤ `ipcMain.handle(信道, 回调)` 接收消息，并配置回调函数。

~~~js
 //
⽤于创建窗⼝
function createWindow() {
 /**********/
 //  主进程注册对应回调
ipcMain.handle('read-file',readFile)
 //  加载⼀个本地⻚⾯
JavaScript
 win.loadFile(path.resolve(__dirname,'./pages/index.html'))
 }
 // 读取⽂件
function readFile(event,path){
 return fs.readFileSync(path).toString()
}

~~~



### 3.3、主进程➡渲染进程(单向)

概述：主进程使⽤`win.webContents.send` ，发送消息，渲染进程通过 `ipcRenderer.on`处理消息

常用于：从主进程发送消息给渲染进程，例如下面这个需求

需求：应用加载6秒之后，给渲染进程发送一个消息，内容是 “你好啊”

1.
⻚⾯中添加相关元素，`render.js` 中添加对应脚本

~~~js

window.onload = ()=>{
 myAPI.getMessage(logMessage)
}
function logMessage(event,str){
 console.log(event,str)
}
~~~



2. `preload.js` 中使用 `ipcRenderer.on(信道，回调)` 接受信息，并配置回调函数

~~~js
const {contextBridge,ipcRenderer} = require('electron')
 contextBridge.exposeInMainWorld('myAPI',{
 /*******/
     getMessage: (callback) => {
         //添加回调函数
     	return ipcRenderer.on('message', callback);
     }
 })
~~~



3. 主进程中，在合适的时候，使⽤ `win.webContents.send(信道，数据)` 发送消息。

~~~js
//  ⽤于创建窗⼝
function createWindow() {
 /**********/
 // 加载⼀个本地⻚⾯
win.loadFile(path.resolve(__dirname,'./pages/index.html'))
 // 创建⼀个定时器
setTimeout(() => {
    win.webContents.send('message','你好啊！')
 }, 6000);

}
~~~





### 3.4、渲染进程➡渲染进程

> 不能直接传，需要一个中间人就是主进程，官方是有进程的

~~~js

~~~



### 3.4、通过 webPreferences/nodeIntegration

```js
const createWindows = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 400,
      webPreferences: {
         //集成node
        nodeIntegration: true,
         //关闭上下文隔离， 这种情况很危险，一般不会采用
        contextIsolation: false
      }
    })
}
```





### 3.5 主进程事件生命周期

> main process modules/app/event：https://www.electronjs.org/zh/docs/latest/api/app

```js
//所有窗口关闭调用
app.on('window-all-closed', () => {
  console.log('window-all-closed')
  // 对于 MacOS 系统 -> 关闭窗口时，不会直接退出应用，还会挂在到任务栏中
  //platform平台，darwin就是mac系统的名字就像win32一样
  if (process.platform !== 'darwin') {
      //彻底退出
    app.quit()
  }
})

app.on('quit', () => {
  console.log('quit')
})

app.whenReady().then(() => {
  createWindow()
  // 在MacOS下，当全部窗口关闭，点击 dock 图标，窗口再次打开。
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
```





## 四、主进程

> Electron API （Electron API 有两种）

- Main Process （主进进程）
- Renderer Process（渲染进程）

### 4.1 App

#### 4.1.1 事件

##### 4.1.1.1 before-quit

> 在应用程序关闭窗口之前触发。

```js
app.on('before-quit', (e) => {
  console.log('App is quiting')
  e.preventDefault()
})
```

##### 4.1.1.2 browser-window-blur

> 在 browserWindow 失去焦点时发出

```js
app.on('browser-window-blur', (e) => {
  console.log('App unfocused')
})
```

##### 4.1.1.3 browser-window-focus

> 在 browserWindow 获得焦点时发出

```js
app.on('browser-window-focus', (e) => {
  console.log('App focused')
})
```

#### 4.1.2 方法

##### 4.1.2.1 app.quit()

```js
app.on('browser-window-blur', (e) => {
  setTimeout(() => {
    app.quit()
  }, 3000)
})

app.on('browser-window-blur', (e) => {
  setTimeout(app.quit, 3000)
})
```

##### 4.1.2.2 app.getPath(name)

```js
// 也可以是 app.on('ready')
app.whenReady().then(() => {
  console.log(app.getPath('desktop')) 桌面
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  console.log(app.getPath('userData')) // 应用程序数据

  createWindow()
})
```

### 4.2 BrowserWindow

> electron.BrowserWindow: 创建和控制浏览器窗口

#### 4.2.1 实例方法

win.loadURL(url[, options]): 和 loadFile 互斥

```js
mainWindow.loadURL('https://www.baidu.com')
```

#### 4.2.2 优雅的显示窗口

- 使用ready-to-show事件

```js
let mainWindow = new BrowserWindow({ show: false })
mainWindow.once('ready-to-show', () => {
  mainWindow.show()
})
```

- 设置 backgroundColor

```js
let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
```

#### 4.2.3 父子窗口

- 窗口定义

```js
secondaryWindow = new BrowserWindow({
  width: 600,
  height: 600,
  webPreferences: { nodeIntegration: true }
})

secondaryWindow.loadFile('index.html')

secondaryWindow.on('closed',  () => {
   mainWindow = null
})
```

- 窗口关系

```js
secondaryWindow = new BrowserWindow({
  parent: mainWindon, // 定义父窗口
  modal: true // 锁定在主窗口
})
```

- 子窗口显示和隐藏

```js
secondaryWindow = new BrowserWindow({
  show: false
})

setTimeout(() => {
  secondaryWindow.show()
  setTimeout(() => {
    secondaryWindow.hide()
  }, 3000)
}, 2000)
```

#### 4.2.4 无边框窗口

> Frameless Window

```js
mainWindow = new BrowserWindow({
  frame: false
})
```

让页面可拖拽

```html
<body style="user-select: none; -webkit-app-region:drag;">
```

no-drag 修复下面控件的bug

```html
<input style="-webkit-app-region: no-drag;" type="range" name="range" min="0" max="10">
```

显示红绿灯

```js
mainWindow = new BrowserWindow({
  titleBarStyle: 'hidden' // or hiddenInset 距离红绿灯更近
})
```

#### 4.2.5 属性与方法

##### 4.2.5.1 minWidth && minHeight

```js
mainWindow = new BrowserWindow({
  minWidth: 300,
  minHeight: 300
})
```

更多详见：https://electronjs.org/docs/api/browser-window#new-browserwindowoptions

##### 4.2.5.2 窗口焦点事件

```js
secWindow = new BrowserWindow({
  width: 400, height: 300,
  webPreferences: { nodeIntegration: true },
})

mainWindow.on('focus', () => {
  console.log('mainWindow focused')
})

secWindow.on('focus', () => {
  console.log('secWindow focused')
})

app.on('browser-window-focus', () => {
  console.log('App focused')
})
```

##### 4.2.5.3 静态方法

- getAllWindows()

```js
let allWindows = BrowserWindow.getAllWindows()
console.log(allWindows)
```

更多详见: https://electronjs.org/docs/api/browser-window#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95

##### 4.2.5.4 实例方法

- maximize()

```
secWindow.on('closed', () => {
  mainWindow.maximize()
})
```

更多详见：https://electronjs.org/docs/api/browser-window#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95

#### 4.2.6 state

> electron-win-state 保存窗口的状态
> `npm install electron-win-state`

#### 4.2.7 webContents

> webContents 是 EventEmitter 的实例， 负责渲染和控制网页, 是 BrowserWindow 对象的一个属性。

```
let wc = mainWindow.webContents
console.log(wc)
```

##### 4.2.7.1 方法 getAllWebContents(）*

- 返回 WebContents[] - 所有 WebContents 实例的数组。 包含所有Windows，webviews，opened devtools 和 devtools 扩展背景页的 web 内容

```
const {app, BrowserWindow, webContents} = require('electron')
console.log(webContents.getAllWebContents())
```

##### 4.2.7.2 实例事件

- did-finish-load
- dom-ready

```html
<div>
   <img src="https://placekitten.com/500/500" alt="">
</div>
<script>
let wc = mainWindow.webContents
wc.on('did-finish-load', () => {
  console.log('Conent fully loaded')
})
wc.on('dom-ready', () => {
  console.log('DOM Ready')
})
</script>
```

- new-window

```html
<div>
  <a target="_blank" href="https://placekitten.com/500/500"><h3>Kitten</h3></a>
</div>

<script>
wc.on('new-window', (e, url) => {
  e.preventDefault()
  console.log('DOM Ready')
})
</script>
```

- context-menu : 右键上下文信息

```js
wc.on('context-menu', (e, params) => {
  console.log(`Context menu opened on: ${params.mediaType} at x:${params.x}, y:${params.y}`)
})

wc.on('context-menu', (e, params) => {
  console.log(`User seleted text: ${params.selectionText}`)
  console.log(`Selection can be copied: ${params.editFlags.canCopy}`)
})
```

##### 4.2.7.3 实例方法

- executeJavaScript()

```js
wc.on('context-menu', (e, params) => {
  wc.executeJavaScript(`alert('${params.selectionText}')`)
})
```

### 4.3 dialog - 对话框

> 显示用于打开和保存文件、警报等的本机系统对话框

```js
const {app, BrowserWindow, dialog} = require('electron')

mainWindow.webContents.on('did-finish-load', () => {
  dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
  }).then((result)=> {
    console.log(result.filepaths)
  })
})
```

```js
dialog.showSaveDialog({}).then(result => {
  console.log(result.filePath)
})
```

```js
const answers = ['Yes', 'No', 'Maybe']
dialog.showMessageBox({
  title: 'Message Box',
  message: 'Please select an option',
  detail: 'Message details.',
  buttons: answers
}).then(({response}) => {
  console.log(`User selected: ${answers[response]}`)
})
```

### 4.4 快捷键+系统快捷键

> **快捷键**：定义键盘快捷键。
> **系统快捷键**：在应用程序没有键盘焦点时，监听键盘事件。

快捷键可以包含多个功能键和一个键码的字符串，由符号+结合，用来定义你应用中的键盘快捷键

示例：

+ CommandOrControl+A
+ CommandOrControl+Shift+Z

快捷方式使用 register 方法在 globalShortcut 模块中注册。

globalShortcut 模块可以在操作系统中注册/注销全局快捷键, 以便可以为操作定制各种快捷键。

注意: 快捷方式是全局的; 即使应用程序没有键盘焦点, 它也仍然在持续监听键盘事件。 在应用程序模块发出 ready 事件之前, 不应使用此模块。

```js
const {app, BrowserWindow, globalShortcut} = require('electron')

globalShortcut.register('G', () => {
  console.log('User pressed G')
})
```

```js
globalShortcut.register('CommandOrControl+Y', () => {
  console.log('User pressed G with a combination key')
  globalShortcut.unregister('CommandOrControl+Y')
})
```

### 4.5 Menu

#### 4.5.1 index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>

    <textarea name="name" rows="8" cols="80"></textarea>

    <!-- All of the Node.js APIs are available in this renderer process. -->
    We are using Node.js <strong><script>document.write( process.versions.node)</script></strong>,
    and Electron <strong><script>document.write( process.versions.electron )</script></strong>.

    <script>
      // You can also require other files to run in this process
      require('./renderer.js')
    </script>
  </body>
</html>
```

#### 4.5.2 main.js

```js
// Modules
const {app, BrowserWindow, Menu, MenuItem} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let mainMenu = Menu.buildFromTemplate( require('./mainMenu') )


// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  Menu.setApplicationMenu(mainMenu)

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// 13.Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

```

#### 4.5.3 mainMenu.js

```js
module.exports = [
  {
    label: '13.Electron',
    submenu: [
      { label: 'Item 1'},
      { label: 'Item 2', submenu: [ { label: 'Sub Item 1'} ]},
      { label: 'Item 3'},
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo'},
      { role: 'redo'},
      { role: 'copy'},
      { role: 'paste'},
    ]
  },
  {
    label: 'Actions',
    submenu: [
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      },
      {
        role: 'toggleFullScreen'
      },
      {
        label: 'Greet',
        click: () => { console.log('Hello from Main Menu') },
        accelerator: 'Shift+Alt+G'
      }
    ]
  }
]
```

### 4.6 Context Menus

#### 4.6.1 index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>

    <textarea name="name" rows="8" cols="80"></textarea>

    <!-- All of the Node.js APIs are available in this renderer process. -->
    We are using Node.js <strong><script>document.write( process.versions.node)</script></strong>,
    and Electron <strong><script>document.write( process.versions.electron )</script></strong>.

    <script>
      // You can also require other files to run in this process
      require('./renderer.js')
    </script>
  </body>
</html>
```

#### 4.6.2 main.js

```js
// Modules
const {app, BrowserWindow, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let contextMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'editMenu' }
])

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('context-menu', e => {
    contextMenu.popup()
  })

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// 13.Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
```

### 4.7 Tray (托盘)

#### 4.7.1 main.js

```js
// Modules
const {app, BrowserWindow, Tray, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray

let trayMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'quit' }
])

function createTray() {

  tray = new Tray('trayTemplate@2x.png')
  tray.setToolTip('Tray details')

  tray.on('click', e => {

    if (e.shiftKey) {
      app.quit()
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })

  tray.setContextMenu(trayMenu)
}

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  createTray()

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// 13.Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
```

## 五、渲染进程

### 5.1 clipboard

> 在系统剪贴板上进行复制和粘贴操作。
>
> 在主进程（main process）和渲染进程（renderer process）上均可用。

#### 5.1.1 `readText()`

返回字符串 - 剪贴板中的内容为纯文本。

```js
const { clipboard } = require('electron')

clipboard.writeText('千锋教育HTML5大前端!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

#### 5.1.2 `writeText(text)`

将文本作为纯文本写进剪贴板。

### 5.2 contextBridge

> 创建一个安全的、双向的、跨越隔离情境的同步桥梁。
>
> 只在渲染进程（renderer pocess）中可用。

### 5.3 desktopCapturer

>使用 navigator.mediaDevices.getUserMedia API 访问可用于从桌面捕获音频和视频的媒体源信息。
>
>只在主进程（main process）可用。

下面的例子显示了如何从一个标题为Electron的桌面窗口捕捉图像：

- 在主进程里

```js
// ./controller/getSource.js
const { desktopCapturer, ipcMain } = require('electron')

const getSource = (mainWindow) => {
  ipcMain.handle('desktop-capturer', async (event) => {
    desktopCapturer.getSources({
      types: ['window', 'screen'],
      thumbnailSize: {
        width: 1728,
        height: 1117
      }
    }).then(async sources => {
      for (const source of sources) {
        if (source.name === 'Entire Screen') {
          mainWindow.webContents.send('SET_SOURCE', source)
          return
        }
      }
    })
  })
}

module.exports = getSource

// ./main.js
getSource(win)
```

- 在预处理JS里

```js
// ./preload-js/setSource.js
const { ipcRenderer } = require('electron')

const setSource = () => {
  return new Promise((resolve) => {
    ipcRenderer.on('SET_SOURCE', async (event, source) => {
      let str = source.thumbnail.crop({ x: 0, y: 30, width: 1200, height: 1170 })
      resolve(str.toDataURL())
    })
  })
}

const invokeCaptureEvent = async () => {
  const result = await ipcRenderer.invoke('desktop-capturer')
  return result
}

module.exports = {
  setSource,
  invokeCaptureEvent
}

// ./preload-js/index.js
const { setSource, invokeCaptureEvent } = require('./setSource')
contextBridge.exposeInMainWorld('myAPI', {
  setSource,
  invokeCaptureEvent
})
```

- 在渲染进程页面里

```js
const app = Vue.createApp({
  template: `
    <div>
      <button @click="captureDesk">抓取桌面</button>
    </div>
    <div>
      <img :src="imgSrc" alt="" />
    </div>
  `,

  data() {
    return {
      imgSrc: ''
    }
  },

  methods: {
    async captureDesk() {
      const result = await myAPI.invokeCaptureEvent()
    }
  },

  async beforeCreate() {
    let imgDataUrl = await myAPI.setSource()
    this.imgSrc = imgDataUrl
  },
})

app.mount('#root')
```

### 5.4 ipcRenderer

>从一个渲染器进程到主进程的异步通信。
>
>只在渲染进程（renderer pocess）中可用。

### 5.5 nativeImage

>使用PNG或JPG文件创建托盘、停靠区和应用程序图标。
>
>在主进程（main process）和渲染进程（renderer process）上均可用。

在Electron中，对于接受图像的API，你可以传递文件路径或NativeImage实例。当传递null时，将使用一个空的图像。

例如，在创建一个托盘或设置一个窗口的图标时，你可以把图像文件路径作为一个字符串传递。

```js
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

或者从剪贴板上读取图像，返回一个NativeImage。

```js
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

#### 5.5.1 支持的格式

目前支持PNG和JPEG图像格式。建议使用PNG，因为它支持透明度和无损压缩。

在Windows上，你也可以从文件路径加载ICO图标。为了获得最佳的视觉质量，建议至少包括以下尺寸的文件。

- Small icon
  - 16x16 (100% DPI scale)
  - 20x20 (125% DPI scale)
  - 24x24 (150% DPI scale)
  - 32x32 (200% DPI scale)
- Large icon
  - 32x32 (100% DPI scale)
  - 40x40 (125% DPI scale)
  - 48x48 (150% DPI scale)
  - 64x64 (200% DPI scale)
  - 256x256

#### 5.5.2 高分辨率图像

在支持高DPI的平台上，如苹果Retina显示器，你可以在图像的基本文件名后附加@2x来标记它为高分辨率的图像。

例如，如果icon.png是一个具有标准分辨率的普通图像，那么icon@2x.png，将被视为具有双倍DPI密度的高分辨率图像。

如果你想同时支持不同DPI密度的显示器，你可以把不同尺寸的图像放在同一个文件夹里，使用不带DPI后缀的文件名。例如：

```js
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```js
const { Tray } = require('electron')
const appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

还支持以下DPI的后缀：

```js
@1x
@1.25x
@1.33x
@1.4x
@1.5x
@1.8x
@2x
@2.5x
@3x
@4x
@5x
```

#### 5.5.3 方法

- ### `nativeImage.createEmpty()`

- ### `nativeImage.createFromPath(path)`

返回 `NativeImage`

从位于路径的文件中创建一个新的NativeImage实例。如果路径不存在，不能被读取，或者不是一个有效的图像，该方法将返回一个空图像。

```js
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

- ### `nativeImage.createFromDataURL(dataURL)`

#### 5.5.4 Class: NativeImage

自然地包裹图像，如托盘、停靠区和应用程序图标。


在主进程（main process）和渲染进程（renderer process）上均可用。

实例方法：

- #### `image.toPNG([options])`

- #### `image.toJPEG(quality)`

- #### `image.toDataURL([options])`

- #### `image.getSize([scaleFactor])`

- #### `image.crop(rect)`



## 六、打包

使⽤ electron-builder  打包应⽤

安装  `electron-builder ` 打包

~~~shell
npm install electron-builder -D
~~~

 在 `package.json`中进⾏相关配置，具体配置如下：

~~~json
{
  "scripts": {
    "build": "electron-builder"
  },
  "build" : {
    //唯一标识符
    "appId" : "com.yanan.store",
    "win" : {
      "icon" : "./logo.ico", //应用图标
      "target" : [
        {
          "target": "nsis", // 使用指定 NSIS 作为an'zhuagn
          "arch": ["x64"] // 生成 64位安装包
        }
      ]
    },
    "nsis": {
      "noeClick": false, // 设置为 false 使安装程序显示安装向导界面，而不是一键安装
      "preMachine": true, // 允许每台机器安装一次，而不是每个用户都安装
      "allowToChangeInstallationDirectory": true // 允许用户在安装过程中选择安装目录
    }
  }
}
~~~



## 七、uniapp 打包exe

> 理论上所有的前端资源都可以使用electron打包

- taskkill /F /IM MyApp.exe /T

  > 杀死electron线程

  - **`/F` (Force)**: 强制终止进程。如果程序卡死（Not Responding），必须加这个参数才能杀掉。
  - **`/IM` (Image Name)**: 指定要关闭的进程名称（即你的文件名 `MyApp.exe`）。
  - **`/T` (Tree)**: **非常重要**。Electron 运行原理是多进程架构（一个主进程 + 多个渲染进程 + GPU 进程）。如果不带 `/T`，可能只杀了主窗口，后台的子进程依然在运行，导致你无法重新打包或资源被占用。

**核心步骤**

1. **环境配置**
   安装Electron及打包工具electron-packager，推荐使用国内镜像源加速下载：

   ```shell
   npm install electron electron-packager -g
   npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
   ```

2. **UniApp项目调整**
   修改`manifest.json`中的H5配置：

- 运行基础路径设为`./`（避免静态资源加载失败）相当于webpack 或者 publicPath路径一样

  > 这个要看你项目的情况 还有可能是base字段

- 禁用HTTPS协议（不影响后端HTTPS请求）

3. **生成H5资源**
   在HBuilderX中执行：右键项目 → **发行** → **网站-H5**，生成 `dist/build/h5` 文件夹。
4. 添加main.js和package.json

~~~javascript
// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: true },
    icon: path.join(__dirname, 'icon.ico')
  });
  mainWindow.loadFile('index.html');
}
app.on('ready', createWindow);
~~~

~~~json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": { "start": "electron ." }
}
~~~

5. 打包

> 注意：这里electron-packager执行的时候会去github上拿一些打包需要的资源，如果一直卡这不动就说名网络请求有问题

~~~bash
electron-packager . MyApp --win --out ./dist --arch=x64 --electron-version=25.0.0 --overwrite
~~~





## electron-vite 第三方框架