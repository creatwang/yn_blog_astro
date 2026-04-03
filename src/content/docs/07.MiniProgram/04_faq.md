---
title: '自定义tabbar'
---



# 自定义tabbar

- 问题：自定义tabbar会闪，社区一直也没有答案
- 实现关键，切换 `tabbar` 的时候要在，切换的页面内修改

~~~js
//页面的生命周期函数
 onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        currentIndex: 3
      })
    }
  },
~~~









### `uni-app` 中以下组件的高度是固定的，不可修改：

| 组件          | 描述       | App                                                          | H5   |
| :------------ | :--------- | :----------------------------------------------------------- | :--- |
| NavigationBar | 导航栏     | 44px                                                         | 44px |
| TabBar        | 底部选项卡 | HBuilderX 2.3.4 之前为 56px，2.3.4 起和 H5 调为一致，统一为 50px。（但可以自主更改高度） | 50px |



### [原生小程序获取](https://developers.weixin.qq.com/community/develop/doc/0002a04267c9108d49a7bca8f5b000)tabbar高度

首先这个tabbar的值机型不一样,高度也是不一样的,动态获取的方法如下:

调用微信提供的方法 wx.getSystemInfo() 详细信息请查看 => [微信官方API](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfo.html)

返回的设备信息json如下:

```js
{
	"errMsg": "getSystemInfo:ok",
	"model": "iPhone 6/7/8",
	"pixelRatio": 2,
	"windowWidth": 375,
	"windowHeight": 619,
	"system": "iOS 10.0.1",
	"language": "zh_CN",
	"version": "7.0.4",
	"screenWidth": 375,
	"screenHeight": 667,
	"SDKVersion": "2.10.3",
	"brand": "devtools",
	"fontSizeSetting": 16,
	"benchmarkLevel": 1,
	"batteryLevel": 97,
	"statusBarHeight": 20,
	"safeArea": {
		"right": 375,
		"bottom": 667,
		"left": 0,
		"top": 20,
		"width": 375,
		"height": 647
	},
	"deviceOrientation": "portrait",
	"platform": "devtools",
	"devicePixelRatio": 2
}﻿
```

这里我们需要用的到参数有四个

```js
windowHeight :窗口高度
screenHeight :屏幕高度
statusBarHeight :设备状态栏高度
pixelRatio :设备像素比
```

底部的导航栏计算公式:

```ts
const tabbarHeight = ( screenHeight - windowHeight - statusBarHeight ) * pixelRatio
```

测试机型结果:

```js
iPhone 5:          56px
iphone 6/7/8 :    56px
iPhone 6/7/8 Plus: 84px
iPhone X:          114px
 ...
更多机型,请自测,记得回来点个赞!
```

备注:建议在app.js中调用,然后全局设置即可



### 自定义tabbar动态获取高度

~~~js
// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: true,
    currentIndex: 0,
    list: [{
      "pagePath": "/pages/mian-music/main-music",
      "iconPath": "/assets/images/tabbar/music_normal.png",
      "selectedIconPath": "/assets/images/tabbar/music_active.png",
      "text": "音乐"
    }, {
      "pagePath": "/pages/main-video/main-video",
      "iconPath": "/assets/images/tabbar/video_normal.png",
      "selectedIconPath": "/assets/images/tabbar/video_active.png",
      "text": "视频"
    },
    {
      "pagePath": "/pages/profile/profile",
      "iconPath": "/assets/images/tabbar/profile_normal.png",
      "selectedIconPath": "/assets/images/tabbar/profile_active.png",
      "text": "我的"
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    trigger(e) {
      const tabIndex = e.currentTarget.dataset.pickindex;
      const url = this.data.list[tabIndex].pagePath
      wx.switchTab({ url })
    }
  },
          //关键点，获取tabbar高度的方法，由于tabbar是组件，要在页面中获取，需要放到监听页面声明周期函数中，不然在手动跳转页面的时候会报错
  lifetimes: {
    attached() {
      wx.getTabbarHeight = (fn) => {
         //return this.createSelectorQuery().select(".tabbar").boundingClientRect(res => console.log(res)).exec()
        this.createSelectorQuery().select(".tabbar").boundingClientRect(fn).exec()
      }
    }
  }
})


~~~







~~~js
// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-5gq90yl1e17197f6",
      traceUser: true
    })
    this.getSystemInfo()
  },
  globalData: {
    windowHeight: 0,
    windowWidth: 0,
    screenHeight: 0,
    screenWidth: 0,
    mainHeight: 0,
    statusBarHeight: "20px"
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.windowHeight = result.windowHeight
        this.globalData.windowWidth = result.windowWidth
        this.globalData.screenHeight = result.screenHeight
        this.globalData.screenWidth = result.screenWidth
        this.globalData.statusBarHeight = result.statusBarHeight
      },
    })
  },
  getMainHeight(fn) {
      wx.getSystemInfo({
          success: (result) => {
              wx.getTabbarHeight(res => {
               let temp = (result.windowHeight - res.height) + "px"
                fn(temp)
              })
          },
      })
  }
})

~~~







页面调用

~~~typescript
 <scroll-view class="warp" style="height: {{mainHeight}};" scroll-y >



 onLoad(options) {
    getApp(). getMainHeight(mainHeight => this.setData({ mainHeight }))
    wx.setNavigationBarTitle({ title: '音乐' })
    this.fetchBanner()
    this.fetchSongList()
    this.fetchSongMenu()
  },
~~~





- ##### 注意

  - `tabbar` 切换页面**只能**使用  ` wx.switchTab({ url })`

  > 在自定义 `tabbar` 进行 ` wx.switchTab({ url })` 切换，**必须要在 `app.json` 配置相同的 `pagePath` 字段**，否则不能切换



# van-index-anchor

> `vant` 索引栏 官方文档展示的是简写

```html
<!--指定索引 和 指定标题-->
<van-index-anchor index="#">热门搜索</van-index-anchor>
```



# 自定义导航栏

> 个人决定就是**自定义返回按钮**，根据 `api` 获取胶囊的大小，计算位置

- 之后在 `app.json` 或者页面的 `json` 文件中配置

  ~~~json
    "navigationStyle": "custom"
  ~~~

- **`app.json` 配置之后所有页面都需要自定义**



