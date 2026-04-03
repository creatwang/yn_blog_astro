---
title: '云开发核心技术'
---

# 云开发核心技术

- ##### 开通云开发

  > 设置 – 环境名称 – 创建环境

  - 一个环境对应一整套独立的云开发资源，包括数据库、存储空间、云函数等资源。
  - 环境相互独立
  - 同常会有两套，生产/开发，**同**测试服务器和上线服务器



- ##### 云数据库：

  1. 提供在小程序端**直接**对数据库进行增删改查的能力；
     数据库是**类似于MongoDB的**文档存储的数据库，操作非常方便；



- ##### 云存储：

  可以在小程序端**直接上传、下载、删除文件；**
  **自带CDN**，提高文件访问速度；
  可以获取**临时链接**，支持在小程序外访问；



- ##### 云函数：

  提供了**在服务器代码的执行能力**；
  包含微信**天然的私有鉴权**；
  更大权限的操作数据库等；
  进行云调用、HTTP请求等操作；



# 项目初始化

- 在小程序端开始使用云能力前，需**先调用** `wx.cloud.init` 方法完成云能力**初始化**

  | 字段      | 数据类型       | 必填 | 默认值       | 说明                                                         |
  | --------- | -------------- | ---- | ------------ | ------------------------------------------------------------ |
  | env       | String\|Object | 否   | 默认选中环境 | env 参数**决定**接下来小程序发起的云开发调用(wx.cloud.xxx)<br>会默认**请求到哪个云环境的资源**<br>(相当于要配置使用哪个数据库) |
  | traceUser | Boolean        | 否   | false        | 会在`云开发>运营分析>用户访问` 下可以查看用户的访问量        |



- 初始化示例，通常在`onLaunch` 声明周期中确认环境

  ~~~js
        wx.cloud.init({
          //环境id
          env: `cloud1-5gq90yl1e17197f6`,
          traceUser: true,
        });
  ~~~

- 可以手动导入数据

  > 注意格式，必须全部是对象格式，不能是集合的格式，对象之间不能有逗号





# 云数据库

> 操作数据和存储方式更像是 `Mongodb`，`Api` 也很像，用来**存放 `json` 格式的数据的**

- 云数据库 `Api` 和 云函数访问数据的区别，

  > 云数据库查询的数据一次最多只能返回 `20` 条，云函数返回 `100` 条





### 条件collection Api

#### `doc`

> 获取集合中指定记录的引用。方法接受一个 id 参数，指定需**引用的记录的 _id**。

- 通常获取到指定的某一条数据之后，**进行`crud`操作**



#### 过滤 `field`

> 用来简化查询字段的，相当于mongo中 ，find() 方法的第二个参数，只不过这里是boolean类型，mongo中是 0|1

~~~js
    douyu.where({
      hn: /^\d{2}\D/ig
    }).field({
      nickname: true,
      avatar: true
    }).get().then(res => console.log(res))
~~~



#### `where`

> 进行条件判断，需要搭配查询比较操作符来使用



- **注意**：`where` 调用之后还是要**调用 `get` 进行查询**

- ##### 查询逻辑操作符

  > 也是要通过 `command` 对象获取该指令方法

| fn    | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| `and` | 并：数组类型，可写多个条件                                   |
| `or`  | 与：数组类型，可写多个条件                                   |
| `not` | 非：对象类型**可搭配**其他逻辑指令使用，包括 `and, or, nor, not` |
| `nor` | 都不：参数数据类型，表示都不匹配的数据                       |



- 可以使用**正则**表达式来进行**模糊查询**

  ~~~js
      const cmd = db.command
  	douyu.where({
        nickname: /.周淑怡/ig,
        progress: cmd.gt(30)
      }).get().then(res => console.log(res))
    },
  ~~~



####  `limit` 、`skip`

> 分页

- `skip`: `number`类型，作用**跳过**几条数据
- `limit`: `number`类型，**每页**显示多个条

~~~js
    douyu.skip(0).limit(8).field({
      nickname: true,
      avatar: true,
      _id:false
    }).get().then(res => console.log(res))
~~~





####  `orderBy`

> 排序查询

- 可以使用 "**点表示法**" 连接嵌套字段，比如 `style.color` 表示字段
- 目前是有问题不能排序

~~~js

~~~



#### `command`

> 对象类型，工具类，包含操作数据库的一些指令函数

- ##### 查询·比较操作函数

| fn           | 描述                                     |
| ------------ | ---------------------------------------- |
| `eq()`       | 相等                                     |
| `neq()`      | 不相等                                   |
| `lt()/lte()` | 小于/小于等于                            |
| `gt()/gte()` | 大于/大于等于                            |
| `in()`       | 包含：**数组**类型                       |
| `nin()`      | 不包含：**数组**类型                     |
| `exists()`   | 筛选某个**存在**的字段\|**不存在**的字段 |



- ##### 更新数组操作符

  > splice 相似，还会有其他方法，具体看文档

  - 这些指令函数，用来操作字段为数组的数据



### 添加数据

- `collection.add()`
- **注意**：添加之后会**自动添加 `_id` 和 `_openid**`
- **注意**：`api` 的 `options` **要在`data` 选项中声明要添加的数据**
- **_openid** 用来记录那个用户修改了或者查看了数据

~~~js
    list.add({
      //保存的数据
      data: {
        name: "zhangsan",
        addr: "天津曲艺协会"
      },
      success: res => console.log(res)
    })
~~~



### 修改数据

- `update`：更新（增加）某一个字段

  > 会将**输入的字段**进行更新，其他字段保持不变

  ~~~js
  douyu.doc("6842667962ff81da0e709a7b5aac73a7").update({
        data: {
          nickname: "lisi"
        },
        success: (res) => {
          console.log(res);
        }
      })
  ~~~



- `set`: 使用新对象替换原来对象

  > 会将**整条数据**进行替换

  ~~~js
  douyu.doc("6842667962ff81da0e709a7b5aac73a7").set({
        data: {
          name: "zhangsan"
        },
        success: (res) => {
          console.log(res);
        }
      })
  ~~~



### 删除数据

~~~
 douyu.doc("6842667962ff81da0e709a7b5aac73a7").remove().then(res => console.log(res))
~~~





# 云存储

> 云存储用于将文件存储到云端

- 存放**非结构化数据**存储，如视频和图片；
- 云存储提供高可用、高稳定、强安全的云端存储服务，可在控制台进行可视化管理



### 上传文件

- `wx.cloud.uploadFile()`
- 相同的文件不会重复上传
- 参数
  - `cloudPath`：**必填**，云存储保存的文件名和 `path`
  - `filePath`：**必填**：上传的文件地址

~~~js
  updateFile() {

    wx.chooseMedia({
      camera: "image",
    }).then(res => {
	//上传文件的接口Api
      wx.cloud.uploadFile({
        //必填，云存储保存的文件名和path
        cloudPath: "image/avatar.jpg",
        //必填：上传的文件地址
        filePath: res.tempFiles[0].tempFilePath
          //返回fileID：运存储地址
      }).then(res => console.log(res.fileID))

    })
  }
~~~



### 下载文件

> 默认下载到临时缓存文件中，tmp

- 需要通过`getFileSystemManager`，文件管理器 `saveFile`方法 进行保存
- `wx.saveImageToPhotosAlbum(Object object)`，也可以将 tempFile 保存到相册

~~~js
  down() {
    wx.cloud.downloadFile({
      fileID: "cloud://cloud1-5gq90yl1e17197f6.636c-cloud1-5gq90yl1e17197f6-1313408770/image/avatar.jpg"

     //获取临时文件
     }).then(res => {
      //将临时文件保存到相册
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
      }).then(res => console.log(res))
    })
  },
~~~



### 删除文件

- ` wx.cloud.deleteFile`

- 可以批量删除文件 `fileList`

  ~~~js
      wx.cloud.deleteFile({
          fileList: ["cloud://cloud1-5gq90yl1e17197f6.636c-cloud1-5gq90yl1e17197f6-1313408770/image/avatar.jpg"]
      })
  ~~~





### 获取临时链接

> 创建的临时链接，可以在小程序意外的地方进行访问

- 有效使用 **2 小时** 开发指引> 存储> Api
- 返回 https 协议的图片链接，可以进行访问
- 可以设置有效期 `maxAge` ，可以查看文档
- 可以批量获取 `fileList`，**一次最多获取50条**

~~~js
  getTempFile() {
    wx.cloud.getTempFileURL({

      fileList: ["cloud://cloud1-5gq90yl1e17197f6.636c-cloud1-5gq90yl1e17197f6-1313408770/image/avatar.jpg"]

    }).then(res => console.log(res.fileList[0].tempFileURL))
  }

    //设置超时事件
    wx.cloud.getTempFileURL({
      fileList: [{
        fileID: 'a7xzcb',
        maxAge: 60 * 60, // one hour
      }]
    }).then(res => {
      // get temp file URL
      console.log(res.fileList)
    }).catch(error => {
      // handle error
    })
~~~





# 云函数

> 云函数在物理设计上，**一个云函数可由多个文件组成**，占用一定量的 CPU 内存等计算资源

- 代码运行在**云端 `Node.js`** 中

- 各云函数**完全独立**，可**分别部署**在不同的地区

- 云函数之间也可**互相调用**

- ##### 云函数的独特优势在于与微信登录鉴权的无缝整合。

  > 开发者无需校验 openid 的正确性因为**微信已经完成了这部分鉴权**，开发者可以**直接使用该 `openid`。**



### 云函数的使用场景

1. 调用小程序服务端的 **Api 接口**和获取一些需要**鉴权的必要的数据**，

   > 消息订阅，数据监听，生成获取openid、生成二维码、....及后台可做的一系列操作

2. 通过云函数，来进行服务端的数据整理，

3. 普通网络请求在云数据库获取数据的时候**最多20条**，云函数 get() 方法**默认**返回 100条，在云函数中进行**整理更多的数据**，返回逻辑层

   - **例如**：get 默认返回100条，可以通过 `limit(500)` 返回更多的数据
   - 像普通的网络请求使用了 limit(100) 也**只会**返回20条数据



### 云函数的使用

- 云函数是运行在**云端的 `nodejs` 当中的**，因此需要**上传云函数**

  > 创建的时候，会自动上传，但是修改之后就不会了，注意要手动上传

- 云函数是完全独立的，因此在本地云函数所以依赖 `node_modules` 文件**不需要**进行**上传到云端**



#### 云函数文件夹的配置

- `project.config.json` 配置文件中的  `cloudfunctionRoot` 字段指定了**云函数的根路径**
- `miniprogramRoot` 字段指定了应用**逻辑层的根路径**



#### 云函数连接到云开发环境

- 云函数需要链接到云开发环境，**并且**初始化环境之后生效

- **注意**：要等待提示函数上传成功之后才可以调用

  > 创建云函数之后**会自动上传的**，上传之后的颜色会**变绿**

  - 但是**修改**之后便不会立刻上传函数，**最好手动上传修改后的云函数**



#### 函数调用Api

- 上传成功之后通过 `wx.cloud.callFunction` 接口进行调用

  > 会自动调用云函数模块中main方法

- 参数：Object 类型，通过**配置参数对象属性**进行调用指定的云函数

  - `name`: 云函数名

  - `data`: 传入的参数

    > `data` 中的数据会**传到**云函数的 **`event` 事件对象当中**

- 支持 `promise` 和回调函数的方式返回结果

- 在云函数没有 `wx` 的 `api` 所以**获取 `cloud` 对象**，要使用 `wx-server-sdk` `sdk`

  > 例： `const db = cloud.database()`

  ~~~js
  // 通过 wx-server-sdk 来获取cloud 对象
  const cloud = require('wx-server-sdk')

  //初始换云环境，使用默认的环境
  cloud.init()

  //获取db对象
  const db = cloud.database()
  // 云函数入口函数
  exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    console.log(wxContext);
    //data中的参数
    console.log(event);
    //返回的结果
    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  }
  ~~~



#### 上传 buffer 图片文件

- 在云函数中的 `cloud.updateFile({})` 接口的配置对象属性
- 不是`filePath`了 而是 `fileContent` 字段，会将图片的缓存 buffer 数据上传的 运存书
- **云开发>开发指引**



#### 定时触发器

> 就是定时任务

- cron表达式
- **云开发> 开发指引> 定时触发器**