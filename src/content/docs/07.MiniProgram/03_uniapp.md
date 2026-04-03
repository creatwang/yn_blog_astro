---
title: '第一章、项目搭建'
---




# 第一章、项目搭建

命令行创建 `uniapp`

后台接口文档（规范参照）：https://apifox.cn/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/doc-1521513

## 一、uniapp 需要的 插件

1. `uni-create-view`：快速创建文件
2. uni-helper：uniapp代码提示
3. uniapp小程序扩展：鼠标悬停提示
4. ts校验安装类型生命文件小程序|uniapp的两个： `pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types`

配置`jsconfig`： 设置组件的时候会有ts提示



## 二、安装uni-ui

组件自动导入

https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html

根据官方文档操作

uni-ui是用js写的所以没有ts文件，需要手动下载类型声明文件

```bash
npm i -D @uni-helper/uni-ui-types
```

## 三、配置pinia和持久化修改

> 由于平台api有区别，所以要兼容性处理下

```js
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

// 默认导出，给 main.ts 使用
export default pinia

// 模块统一导出
export * from './modules/member'

```



usemember

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<any>()

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // 网页端配置 presist: true,  
  // TODO: 持久化 小程序的storage和浏览器的不一样，所以要同一修改一下api
  {
    persist: {
      Storage: {
        getItem(key, value) {
          return uni.getStorageSync(key)
        },
        setItem(key,value) {
          uni.setStorageSync(key, value)
        },
      },
    },

  },
)

```



## 四、封装请求函数和拦截器

https.js

```js
/**
 * 添加拦截器:
 *   拦截 request 请求
 *   拦截 uploadFile 文件上传
 *
 * TODO:
 *   1. 非 http 开头需拼接地址
 *   2. 请求超时
 *   3. 添加小程序端请求头标识
 *   4. 添加 token 请求头标识
 */

import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时, 默认 60s
    options.timeout = 10000
    // 3. 添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
  code: string
  msg: string
  result: T
}
// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx， axios 就是这样设计的
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

```



### 五、配置组件自动导入

> 配置完之后要重启一下

```js
	// 组件自动引入规则
	"easycom": {
		// 是否开启自动扫描
		"autoscan": true,
		// 以正则方式自定义组件匹配规则
		"custom": {
			// uni-ui 规则如下配置
			"^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
			// 以 Xtx 开头的组件，在 components 文件夹中查找引入（需要重启服务器）
			"^Xtx(.*)": "@/components/Xtx$1.vue"
		}
	},
```



**重点**：自动导入的话没有引用，就无法识别类型，所以需要根据volar的规则配置下自动导入组件的类型声明，

```ts
import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'

declare module 'vue' {
   export interface GlobalComponents {
      XtxSwiper: typeof XtxSwiper
      XtxGuess: typeof XtxGuess
   }
}

// 组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
export type XtxSwiperInstance = InstanceType<typeof XtxSwiper>

```





# 第二章、基础语法

## 一、标签

```ts
div = view

text  = span

img = image
a = navigator
// navigator 有 hover-class='none
<navigator
    class="category-item"
    hover-class="none"
    url="/pages/index/index"
    v-for="item in list"
    :key="item.id"
>
    <image class="icon" :src="item.icon"></image>
    <text class="text">{{ item.name }}</text>
</navigator>
```





## 二、组件css

**重点**：uni编译成h5默认是带scope作用域的

### 2.1、img

`aspect-ratio:  image`组件中的`mode`属性设置`aspectfit`，`aspectFill`

### 2.2、input

placeholder-calss: 设置展位字符的样式

type：tel 等 电话输入键盘

### 2.3、page

> page 就相当于是html

```css
<script setup lang="ts">
</script>

<template>
  <view class="viewport">
  </view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}
</style>

```





## 三、SEO

1. `uniCloud-db` 组件直接渲染
2. `serverPrefetch` 生命周期 + 状态还礼 vuex或者 pain





## 四、路由跳转navigate

### 属性

1. open-type：relanch
2. target: 打开新的小程序 self|miniprogram
3. url： /page/index



css样式

```css
/*  #ifdef  APP-PLUS  */
width: 60upx;
height: 60upx;
/*  #endif  */
```



html标签

```html
/*  #ifdef  H5  */
<button type="default"></button>
/*  #endif  */
```



js函数

```js
change() {
   // #ifdef APP-PLUS
   statusbarHeight = plus.navigator.getStatusbarHeight()
   // #endif
}
```



# 第三章、pages.json

> 是一个大对象

## 对象中的属性



### golalStyle

> 全局样式配置



#### tabBar

```json
	"tabBar": {
		"selectedColor": "#8f8f94",
		"list": [
			{
				"pagePath": "pages/index/index",
				"text": "首页",
				"iconPath": "static/logo.png"
			},
			{
				"pagePath": "pages/index/index",
				"text": "zhnagsan"
			}
		]
	},
```



# 第四章、uniapp 和 小程序的区别

每个页面是一个.vue 文件，数据绑定及事件处理同 Vue.js 规范

1. src="{{url}}”升级成 :src="url"1. 属性绑定
2. 事件绑定 bindtap="eventName"升级成 @tap="eventName"，支持()传参
3. 支持 Vue 常用指令 v-for、v-if、v-show、v-model等
4. 全局`api`调用 `wx.` 换乘 `uni.` 支持多端开发



# 第五章、[uniapp全局文件](https://uniapp.dcloud.net.cn/collocation/main.html)



## 5.1、全局样式和css内置变量

>  App.vue 中通过 `@import` 语句可以导入外联样式，一样作用于每一个页面

快速书写 css 变量的方法是：在 css 中**敲 hei**，在候选助手中即可看到 3 个 css 变量。（HBuilderX 1.9.6 以上支持）

| CSS 变量            | 描述                   | App                                                          | 小程序 | H5                   |
| :------------------ | :--------------------- | :----------------------------------------------------------- | :----- | :------------------- |
| --status-bar-height | 系统状态栏高度         | [系统状态栏高度](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.getStatusbarHeight)、nvue 注意见下 | 25px   | 0                    |
| --window-top        | 内容区域距离顶部的距离 | 0                                                            | 0      | NavigationBar 的高度 |
| --window-bottom     | 内容区域距离底部的距离 | 0                                                            | 0      | TabBar 的高度        |



## 5.2、全局变量设置

在main.js引用挂载到Vue.prototype 或者在App.vue引用挂载到globalData**（uniapp）**

## 5.3、应用级别生命周期

~~~html
<script>
	// 只能在App.vue里监听应用的生命周期
	export default {
		onLaunch: function(options) {
			console.log('App Launch')
			console.log('应用启动路径：', options.path)
		},
		onShow: function(options) {
			console.log('App Show')
			console.log('应用启动路径：', options.path)
		},
		onHide: function() {
			console.log('App Hide')
		},
        globalData: {  
            text: 'text'  
        }
	}
</script>
~~~



## 5.4、[uniapp页面生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#timeline)；

~~~js
// 页面加载，在页面当中是没有组件挂在hooks的，只有onLoad
onLoad(async () => {
   isLoading.value = true
   await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
   isLoading.value = false
})

// 组件中在才会有挂载
// 组件挂载完毕
onMounted(() => {
   getHomeGoodsGuessLikeData()
})
~~~



## 5.5、组件的生命周期

## 组件生命周期

`uni-app` 组件支持的生命周期，与vue标准组件的生命周期相同。这里没有页面级的onLoad等生命周期：

| 函数名        | 说明                                                         | 平台差异说明 | 最低版本 |
| :------------ | :----------------------------------------------------------- | :----------- | :------- |
| beforeCreate  | 在实例初始化之前被调用。[详见](https://v2.cn.vuejs.org/v2/api/#beforeCreate) |              |          |
| created       | 在实例创建完成后被立即调用。[详见](https://v2.cn.vuejs.org/v2/api/#created) |              |          |
| beforeMount   | 在挂载开始之前被调用。[详见](https://v2.cn.vuejs.org/v2/api/#beforeMount) |              |          |
| mounted       | 挂载到实例上去之后调用。[详见](https://v2.cn.vuejs.org/v2/api/#mounted) 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用`$nextTick`[Vue官方文档](https://v2.cn.vuejs.org/v2/api/#vm-nextTick) |              |          |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 打补丁之前。[详见](https://v2.cn.vuejs.org/v2/api/#beforeUpdate) | 仅H5平台支持 |          |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。[详见](https://v2.cn.vuejs.org/v2/api/#updated) | 仅H5平台支持 |          |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。[详见](https://v2.cn.vuejs.org/v2/api/#beforeDestroy) |              |          |
| destroyed     | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。[详见](https://v2.cn.vuejs.org/v2/api/#destroyed) |              |          |

https://uniapp.dcloud.net.cn/tutorial/page.html#页面调用接口



# 第六章、小程序手机号登录退出

## 6.1、流程

1. 封装网络请求
2. token未登录|超时处理
3. 全局错误拦截

## 6.2、代码

~~~html
<script setup lang="ts">
import { postLoginAPI, postLoginWxMinAPI, postLoginWxMinSimpleAPI } from '@/services/login'
import { useMemberStore } from '@/stores'
import type { LoginResult } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// #ifdef MP-WEIXIN
// 获取 code 登录凭证
let code = ''
onLoad(async () => {
  const res = await wx.login()
  code = res.code
})

// 获取用户手机号码
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  const { encryptedData, iv } = ev.detail
  // 后台会根据这3个参数进行解密，之后请求到手机号用户信息等
  const res = await postLoginWxMinAPI({ code, encryptedData, iv })
  loginSuccess(res.result)
}
// #endif

const loginSuccess = (profile: LoginResult) => {
  // 保存会员信息
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  // 成功提示
  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    // 页面跳转
    // uni.switchTab({ url: '/pages/my/my' })
    uni.navigateBack()
  }, 500)
}

// 模拟手机号码快捷登录（开发练习）
const onGetphonenumberSimple = async () => {
  const res = await postLoginWxMinSimpleAPI('13123456789')
  loginSuccess(res.result)
}


// #ifdef H5
// 传统表单登录，测试账号：13123456789 密码：123456，测试账号仅开发学习使用。
const form = ref({
  account: '13123456789',
  password: '',
})

// 表单提交
const onSubmit = async () => {
  const res = await postLoginAPI(form.value)
  loginSuccess(res.result)
}
// #endif
</script>
    <view class="login">
      <!-- 网页端表单登录 -->
      <!-- #ifdef H5 -->
      <input v-model="form.account" class="input" type="text" placeholder="请输入用户名/手机号码" />
      <input v-model="form.password" class="input" type="text" password placeholder="请输入密码" />
      <button @tap="onSubmit" class="button phone">登录</button>
      <!-- #endif -->

      <!-- 小程序端授权登录 -->
      <!-- #ifdef MP-WEIXIN -->
      <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif -->
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 通用模拟登录 -->
          <button @tap="onGetphonenumberSimple">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》</view>
    </view>
~~~



# 第七章、 小程序分包、预加载

目录结构

~~~js
src
>components
>composables // 通用hooks
>pages
>pagesMember
	>address
	>address-form
	>profile
	>settings
>pagesOrder
	>create
	>detail
	>list
	>payment
>services
>static
>stores
>styles
>types
>utils
~~~



~~~js
	
	"pages": [
		{
			"path": "pages/my/my",
			"style": {
				"navigationStyle": "custom",
				"navigationBarTextStyle": "white",
				"navigationBarTitleText": "我的"
			}
		}
	],
	// 分包加载规则
	"subPackages": [
		{
			// 子包的根目录
			"root": "pagesMember",
			// 页面路径和窗口表现
			"pages": [
				{
					"path": "settings/settings",
					"style": {
						"navigationBarTitleText": "设置"
					}
				},
				{
					"path": "profile/profile",
					"style": {
						"navigationStyle": "custom",
						"navigationBarTextStyle": "white",
						"navigationBarTitleText": "个人信息"
					}
				},
				{
					"path": "address/address",
					"style": {
						"navigationBarTitleText": "地址管理"
					}
				},
				{
					"path": "address-form/address-form",
					"style": {
						"navigationBarTitleText": ""
					}
				}
			]
		},
		{
			"root": "pagesOrder",
			"pages": [
				{
					"path": "create/create",
					"style": {
						"navigationBarTitleText": "填写订单"
					}
				},
				{
					"path": "detail/detail",
					"style": {
						"navigationBarTitleText": "订单详情",
						"navigationStyle": "custom"
					}
				},
				{
					"path": "payment/payment",
					"style": {
						"navigationBarTitleText": "支付结果"
					}
				},
				{
					"path": "list/list",
					"style": {
						"navigationBarTitleText": "订单列表"
					}
				}
			]
		}
	],
	// 分包预下载规则
	"preloadRule": {
		"pages/my/my": {
			"network": "all",
			"packages": [
				"pagesMember"
			]
		}
	}
~~~



# 第八章、 uniapp文件上传

~~~js
// 修改头像
const onAvatarChange = () => {
  // 调用拍照/选择图片
  // 选择图片条件编译
  // #ifdef H5 || APP-PLUS
  // 微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // 文件路径
      const tempFilePaths = res.tempFilePaths
      // 上传
      uploadFile(tempFilePaths[0])
    },
  })
  // #endif

  // #ifdef MP-WEIXIN
  // uni.chooseMedia 仅支持微信小程序端
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      // 上传
      uploadFile(tempFilePath)
    },
  })
  // #endif
}

// 文件上传-兼容小程序端、H5端、App端
const uploadFile = (file: string) => {
  // 文件上传
  uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath: file,
    success: (res) => {
      if (res.statusCode === 200) {
        const avatar = JSON.parse(res.data).result.avatar
        // 个人信息页数据更新
        profile.value!.avatar = avatar
        // Store头像更新
        memberStore.profile!.avatar = avatar
        uni.showToast({ icon: 'success', title: '更新成功' })
      } else {
        uni.showToast({ icon: 'error', title: '出现错误' })
      }
    },
  })
}
~~~



国内编辑地址字段

收货人

手机号

区域

详细地址

默认地址



# 第九章、小程序支付

> 支付参数类型 WechatMiniprogram.RequestPaymentOption

~~~js
// 订单支付
const onOrderPay = async () => {
  if (import.meta.env.DEV) {
    // 开发环境模拟支付
    await getPayMockAPI({ orderId: query.id })
  } else {
    // #ifdef MP-WEIXIN
    // 正式环境微信支付
    const res = await getPayWxPayMiniPayAPI({ orderId: query.id })
    await wx.requestPayment(res.result)
    // #endif

    // #ifdef H5 || APP-PLUS
    // H5端 和 App 端未开通支付-模拟支付体验
    await getPayMockAPI({ orderId: query.id })
    // #endif
  }
  // 关闭当前页，再跳转支付结果页
  uni.redirectTo({ url: `/pagesOrder/payment/payment?id=${query.id}` })
}

~~~





# 第十章、跨端兼容

## 1、条件编译 ifdef endif

条件编译语法：通过特殊注释，以 #ifdef 或 #ifndef 加 平台名称 开头，以 #endif 结尾。

```css
/*  #ifdef  APP-PLUS  */
width: 60upx;
height: 60upx;
/*  #endif  */
```



html标签

```html
/*  #ifdef  H5  */
<button type="default"></button>
/*  #endif  */
```



js函数

```js
change() {
	// #ifdef APP-PLUS
	statusbarHeight = plus.navigator.getStatusbarHeight()
	// #endif
}
```



## 2、视口的问题

小程序的视口是不包括tabbar和topbar的，但是到h5的时候视口则是全屏，所以在进行布局的时候，最好将视口设置为100%，**不要使用 100vh**



## 3、样式兼容性处理

打包之后到**h5**端是时候样式都是**自带 scoped** 的 所一有些组件中的样式并不能完全生效，需要手动导出来



## 4、小程序没有*选择器要使用page



# 第十一章、多端适配常见问题

## 1、app 和 web 支持component，miniprog不支持

## 2、app 和 web 支持three，miniprog需要单独适配

> app端需要renderjs配合渲染，

~~~jsx
<template>
  <view class="w-full" id="webgl-wrapper" >
    <view class="mask">
      <view>敬请期待...</view>
    </view>
    <view v-if="progress > 0 && progress < 100 " class="progress-wrapper">
      <progress class="progress" :percent="progress" activeColor="#D3E3FD" stroke-width="8" />
    </view>
    <view type="webgl" id="canvasRef"></view>
  </view>
</template>

<script module="webglRender" lang="renderjs">
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
	export default {
  data: function() {
    return {
      progress: 0,
    }
  },
     mounted() {
        this.init();
     },
		 methods: {
      getUrl(src) {
          
           // #ifdef APP-PLUS
              let url = plus.io.convertLocalFileSystemURL( src )
              return new Promise((resolve,reject)=>{
                  plus.io.resolveLocalFileSystemURL(url, entry => {
                      var reader = null;
                      entry.file( file => {
                          reader = new plus.io.FileReader();
                          reader.onloadend =  ( read )=> {
                              resolve(read.target.result)
                          };
                          reader.readAsDataURL( file );
                      }, function ( error ) {
                          alert( error.message );
                      } );
                  },err=>{
                      resolve(src)
                  })
              })
              // #endif
              // #ifndef APP-PLUS
              return new Promise((resolve,reject)=>{
                  resolve(src)
              })
              // #endif
      },
      loaderFn() {
          const loader = new GLTFLoader();
         return new Promise(async (resolve, reject) => {
            const url = await this.getUrl('/static/images/product.glb')
            loader.load(url, (model) => {
              resolve(model);
            },
            function (xhr) {
              this.progress = parseInt(xhr.loaded/xhr.total*100)
            },
            function (error) {
              reject(error);
            });
          })
        },
      async init() {
        const el = document.getElementById('webgl-wrapper');
        const width = el.offsetWidth
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.lookAt(0,0,0);
        const renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        renderer.setSize(width, width);
        document.getElementById('canvasRef').appendChild(renderer.domElement);
        // 添加光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1); // 点光源
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);
        //加载模型
        const model = await this.loaderFn()
        const box3_2 = new THREE.Box3().setFromObject(model.scene);   //新建一个Box3包裹盒把模型包裹起来
        const boxSize = box3_2.getSize(new THREE.Vector3()).length();  //综合计算出模型的长度值，利用它设置相机位置
        const boxCenter = box3_2.getCenter(new THREE.Vector3());
        const fov = camera.fov * (Math.PI / 280);
        const cameraZ = boxSize / 2 / Math.tan(fov / 2);
        camera.position.z = cameraZ;
        model.scene.position.set(0, -boxCenter.y, 0);
        scene.background = new THREE.Color("#F6F8FE");
        scene.add(model.scene);
        renderer.setClearColor(0xffffff)
        renderer.render(scene, camera);
      // 创建 OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 开启阻尼
        controls.dampingFactor = 0.25; // 阻尼因子
        controls.maxDistance = 800; // 阻尼因子
        controls.screenSpacePanning = false; // 禁用屏幕空间平移
        //禁止缩放
        controls.enableZoom = false
        // 渲染循环
        const animate = function () {
          requestAnimationFrame(animate);
          // 更新控制
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      }
		}
	}
</script>

<style scoped lang="scss">
 #webgl-wrapper {
   position: relative;
 }
 .progress-wrapper{
   position: absolute;
   inset: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #F6F8FE;

   .progress {
    width: 80%;
   }
 }

 .mask {
   display: flex;
   align-items: center;
   justify-content: center;
   pointer-events: none;
   position: absolute;
   border-radius: 10rpx;
   inset: 0;
   background-color: rgba(0, 0, 0, 0.5);
   z-index: 1;
   color: #fff;
 }


</style>
~~~



## 3、app 获取本地资源，和其他端并不一致

~~~js
      getUrl(src) {
           // #ifdef APP-PLUS
              let url = plus.io.convertLocalFileSystemURL( src )
              return new Promise((resolve,reject)=>{
                  plus.io.resolveLocalFileSystemURL(url, entry => {
                      var reader = null;
                      entry.file( file => {
                          reader = new plus.io.FileReader();
                          reader.onloadend =  ( read )=> {
                              resolve(read.target.result)
                          };
                          reader.readAsDataURL( file );
                      }, function ( error ) {
                          alert( error.message );
                      } );
                  },err=>{
                      resolve(src)
                  })
              })
              // #endif
              // #ifndef APP-PLUS
              return new Promise((resolve,reject)=>{
                  resolve(src)
              })
              // #endif
      },
~~~





# 第十二章、常用配置

## 1. 屏幕旋转

~~~javascript
    "app-plus" : {
        "usingComponents" : true,
        "nvueStyleCompiler" : "uni-app",
        "compilerVersion" : 3,
        "screenOrientation" : [
            //可选，字符串数组类型，应用支持的横竖屏
            "portrait-primary", //可选，字符串类型，支持竖屏
            "portrait-secondary", //可选，字符串类型，支持反向竖屏
            "landscape-primary", //可选，字符串类型，支持横屏
            "landscape-secondary" //可选，字符串类型，支持反向横屏
        ],
        "splashscreen" : {
            "alwaysShowBeforeRender" : true,
            "waiting" : true,
            "autoclose" : true,
            "delay" : 0
        },
        /* 模块配置 */
        "modules" : {},
        /* 应用发布信息 */
        "distribute" : {
            /* android打包配置 */
            "android" : {
                "permissions" : [
                    "<uses-permission android:name=\"android.permission.CHANGE_NETWORK_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\"/>",
                    "<uses-permission android:name=\"android.permission.VIBRATE\"/>",
                    "<uses-permission android:name=\"android.permission.READ_LOGS\"/>",
                    "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
                    "<uses-feature android:name=\"android.hardware.camera.autofocus\"/>",
                    "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.CAMERA\"/>",
                    "<uses-permission android:name=\"android.permission.GET_ACCOUNTS\"/>",
                    "<uses-permission android:name=\"android.permission.READ_PHONE_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.CHANGE_WIFI_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.WAKE_LOCK\"/>",
                    "<uses-permission android:name=\"android.permission.FLASHLIGHT\"/>",
                    "<uses-feature android:name=\"android.hardware.camera\"/>",
                    "<uses-permission android:name=\"android.permission.WRITE_SETTINGS\"/>"
                ]
            },
            /* ios打包配置 */
            "ios" : {
                "dSYMs" : false
            },
            /* SDK配置 */
            "sdkConfigs" : {}
        }
    },

~~~



# 第十三章、本地打包

1. 到官网下载对应的包 [Android-SDK@4.85.82519_20251107-1.zip](..\..\..\..\android-app\Android-SDK@4.85.82519_20251107-1.zip) 、这个放到了public里
2. 把生成的资源放进去，修改一些配置
3. 本地生成证书先安装java环境

~~~shell
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore

testalias是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字
test.keystore是证书文件名称，可修改为自己想设置的文件名称，也可以指定完整文件路径
36500是证书的有效期，表示100年有效期，单位天，建议时间设置长一点，避免证书过期
回车后会提示：
Enter keystore password: //输入证书文件密码，输入完成回车
Re-enter new password: //再次输入证书文件密码，输入完成回车
What is your first and last name?
[Unknown]: //输入名字和姓氏，输入完成回车
What is the name of your organizational unit?
[Unknown]: //输入组织单位名称，输入完成回车
What is the name of your organization?
[Unknown]: //输入组织名称，输入完成回车
What is the name of your City or Locality?
[Unknown]: //输入城市或区域名称，输入完成回车
What is the name of your State or Province?
[Unknown]: //输入省/市/自治区名称，输入完成回车
What is the two-letter country code for this unit?
[Unknown]: //输入国家/地区代号（两个字母），中国为CN，输入完成回车
Is CN=XX, OU=XX, O=XX, L=XX, ST=XX, C=XX correct?
[no]: //确认上面输入的内容是否正确，输入y，回车
Enter key password for  
(RETURN if same as keystore password): //确认证书密码与证书文件密码一样（HBuilder|HBuilderX要求这两个密码一致），直接回车就可以  
以上命令运行完成后就会生成证书，路径为“D:\test.keystore”。



~~~



使用 命令 keytool -list -v -keystore sim.jks 查看自己的jks文件信息 可以使用 c:\sim.jks 添加文件路径 keytool -list -v -keystore c:\sim.jks

然后 根据当前信息进行 jsk文件信息修改 keytool -changealias -keystore sim.jks -alias key0 -destalias station-yard key0 是当前别名 station-yard 是目标别名（自己随便命名）

#### uni-app 控制台添加密钥





- 这里每一个activity 都是一个入口

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:allowClearUserData="true"
        android:icon="@mipmap/ic_launcher"
                 // 这里name  在strings.xml 文件配置
        android:label="@string/app_name"
        android:largeHeap="true"
        android:extractNativeLibs="true"
        android:supportsRtl="true">
        // 这里是主入口
        <activity
            android:name="io.dcloud.PandoraEntry"
            android:configChanges="orientation|keyboardHidden|keyboard|navigation"
            android:label="@string/app_name"
            android:launchMode="singleTask"
            android:hardwareAccelerated="true"
                  // 这里可以定义自己的主题
            android:theme="@style/Theme.AppSplash"
            android:screenOrientation="user"
            android:exported="true"
            android:windowSoftInputMode="adjustResize" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
        
        // 这里是uniapp的入口，这里不能改的，这里的区别后面在研究总之这里是冷启动的开始
        <activity
            android:name="io.dcloud.PandoraEntryActivity"
            android:launchMode="singleTask"
            android:configChanges="orientation|keyboardHidden|screenSize|mcc|mnc|fontScale|keyboard|smallestScreenSize|screenLayout|screenSize|uiMode"
            android:hardwareAccelerated="true"
            android:permission="com.miui.securitycenter.permission.AppPermissionsEditor"
            android:screenOrientation="user"
            android:theme="@style/DCloudTheme"
            android:exported="true"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <action android:name="android.intent.action.VIEW" />
                <data android:scheme=" " />
            </intent-filter>
        </activity>
        <meta-data
            android:name="dcloud_appkey"
                   //密钥id添加
            android:value="9d0e01e70bd6055a82ace17a9511f969" />
    </application>

</manifest>
~~~

- 主图在这里配置，主题都可以配置启动图背景等

~~~xml
<!-- res/values/themes.xml -->
<resources>
    <!-- 定义你的常规应用主题 -->
    <style name="Theme.MyApp" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <!-- ... 你应用的主要配色 ... -->
    </style>

    <!-- 定义启动图主题 -->
    <style name="Theme.AppSplash" parent="Theme.SplashScreen">
        <!-- 启动图的背景色 -->
        <item name="android:windowSplashScreenBackground">#FFFFFF</item>

        <!-- 启动图中间的图标（确保 ic_splash 是你放在 drawable 或 mipmap 目录的图片）这里放到了public -->
        <item name="android:windowSplashScreenAnimatedIcon">@drawable/news_avd_v02</item>

        <!-- 启动图退出时的动画时长（可选） -->
        <item name="android:windowSplashScreenAnimationDuration">1000</item>

        <!-- 当启动图显示完毕后，切换到的主应用主题 -->
        <item name="postSplashScreenTheme">@style/Theme.MyApp</item>
    </style>
</resources>

~~~

- dcloud_control.xml 配置appid

~~~xml
<hbuilder>
<apps>
    <app appid="__UNI__EC8F78C" appver=""/>
</apps>
</hbuilder>

~~~

- build.gradle 文件

~~~shell
apply plugin: 'com.android.application'

android {
    compileSdkVersion 35
    buildToolsVersion '35.0.0'
    namespace 'com.gbuilderchina.store'
    defaultConfig {
        applicationId "com.gbuilderchina.store"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
    }
    // 这里配置证书
    signingConfigs {
        config {
            keyAlias 'george.app'
            keyPassword '123456'
            storeFile file('george.app.keystore')
            storePassword '123456'
            v1SigningEnabled true
            v2SigningEnabled true
        }
    }

    buildTypes {
        debug {
            signingConfig signingConfigs.config
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        release {
            signingConfig signingConfigs.config
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    aaptOptions {
        additionalParameters '--auto-add-overlay'
        ignoreAssetsPattern "!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~"
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.aar', '*.jar'], exclude: [])
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.localbroadcastmanager:localbroadcastmanager:1.0.0'
    implementation 'androidx.core:core:1.1.0'
    implementation "androidx.fragment:fragment:1.1.0"
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    implementation 'com.facebook.fresco:fresco:2.5.0'
    implementation "com.facebook.fresco:animated-gif:2.5.0"
    implementation 'com.github.bumptech.glide:glide:4.9.0'
    implementation 'com.alibaba:fastjson:1.2.83'
    implementation 'androidx.webkit:webkit:1.5.0'
    implementation "androidx.core:core-splashscreen:1.0.0"
    implementation 'com.airbnb.android:lottie:6.3.0'
    implementation 'com.google.android.material:material:1.10.0'
}






~~~

- 然后就配置完事了



# 补充、常见案例

## 一、获取安全区域

> 去除摄像头挖孔的位置后，底部home图标

```ts
<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>
<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 10 + 'px' }">
    <!-- logo文字 -->
    <view class="logo">
      <image class="logo-image" src="@/static/images/logo.png"></image>
      <text class="logo-text">新鲜 · 亲民 · 快捷</text>
    </view>
    <!-- 搜索条 -->
    <view class="search">
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text>
    </view>
  </view>
</template>
```



## 二、UniHelper获取组件属性类型

```js
<script setup lang="ts">
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'

const activeIndex = ref(0)

// 当 swiper 下标发生变化时触发
const onChange: UniHelper.SwiperOnChange = (ev) => {
  activeIndex.value = ev.detail.current
}
// 定义 props 接收
defineProps<{
  list: BannerItem[]
}>()
</script>
```



## 三、分页ts类型

> 可以利用泛型进行简化

```ts
/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 列表数据 */
  items: T[]
  /** 总条数 */
  counts: number
  /** 当前页数 */
  page: number
  /** 总页数 */
  pages: number
  /** 每页条数 */
  pageSize: number
}

/** 通用分页参数类型 */
export type PageParams = {
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 10 */
  pageSize?: number
}

/** 通用商品类型 */
export type GoodsItem = {
  /** 商品描述 */
  desc: string
  /** 商品折扣 */
  discount: number
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品已下单数量 */
  orderNum: number
  /** 商品图片 */
  picture: string
  /** 商品价格 */
  price: number
}

```

页面和网络请求中使用

```js
/**
 * 猜你喜欢-小程序 api
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}

// 组件中
// 猜你喜欢的列表
const guessList = ref<GuessItem[]>([])
// 已结束标记
const finish = ref(false)
// 获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
  // 退出分页判断
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  // guessList.value = res.result.items
  // 数组追加
  guessList.value.push(...res.result.items)
  // 分页条件
  if (pageParams.page < res.result.pages) {
    // 页码累加
    pageParams.page++
  } else {
    finish.value = true
  }
}

```





## 四、定义全局组件

> 目前并没有更好的方案，只能是通过vite插件在打包的时候，在所有页面上将包打进去

- webpack 方案 `vue-inset-loader` ，核心思路是调整 webpack 配置使用 loader，对文件进行中间处理。文档地址 https://ask.dcloud.net.cn/article/39345 仓库地址 https://github.com/1977474741/vue-inset-loader
- vite 插件方案 `vue3-inset-loader`，和上面思路一致，vite 方向的插件，仓库地址 https://github.com/smartXJ/vue3-inset-loader/tree/main

## 五、定义全局组件

viewport-fit：cover

# 着重了解下网页兼容性的面试题

1. 安卓-苹果有没有刘海的兼容性

   其实w3c早就为我们提供了解决方法（CSS3新特性viewport-fit）
   在w3c.org官方给出的关于圆形展示(Round display)的标准中， 提到了viewport-fit这一属性，这个属性表明了对于某些屏幕并不是矩形形状的设备的时候浏览器该如果进行显示。LOL传送:viewport-fit官方参考文档

   CSS3新特性env以及var预定义变量。
   在定义以后viewport-fix以后， 浏览器会自动生成四个padding变量，即用来将页面向内挤压到可以正常显示的位置。这个时候需要用到env或者constant来将变量转换成CSS属性值并且赋值给属性。ps:env好像还在开发中，好像只支持IOS 11.2及以上。目前比较稳妥的方法就是constant和env一起使用。LOL传送：env和var变量

   **viweprot-fit:cover, 当屏幕非矩形屏幕的情况下，会给出4个padding安全变量，根据当前页面头部的定位方式选择设置安全变量的css属性**

   1. ```html
      <meta name="viewport"
              content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
      
      
      ```

   2. 把页面主体内容限定在安全区内

      ```less
      body {
          //11.1
          padding-top: constant(safe-area-inset-top);
          //11.2之后
          padding-top: env(safe-area-inset-top);
          padding-bottom: constant(safe-area-inset-bottom);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: constant(safe-area-inset-left);
          padding-left: env(safe-area-inset-left);
          padding-right: constant(safe-area-inset-right);
          padding-right: env(safe-area-inset-right);
      }
      
      
      ```

      - 当给按钮增加高度的方式也是一样

      ```less
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
      
      ```



viewport-fit：cover

# uniapp 遇到的问题

#### .9文件

#### rpx dip问题

#### 渲染3d模型问题只能在渲染线程上处理render，读取本地图片需要plus原生能力
