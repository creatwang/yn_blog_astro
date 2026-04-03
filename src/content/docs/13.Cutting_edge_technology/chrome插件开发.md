---
title: 'chrome插件开发'
---

谷歌扩展

### 什么是谷歌扩展？

##### 扩展，实际上不是一个exe、app之类的程序，下载了本地打开运行安装，本质上，它就是一个网页，写的用的都是前端的语言。

##### 那么既然也是用js这些语言来开发，那么他是如何开发的呢，这样我们就要先了解开发需要那些东西来组成。

### 基本的组成

- #### manifest.json

- #### background script

- #### content script

- #### popup

- #### html

#### (一) manifest.json

##### 每个插件都必须要含有这个文件，顾名思义，这是一个扩展组成的清单，这里面需要我们来配置一些扩展必须要的配置项和可选的配置项。

```json
{

  //必须

  "name": "插件名",

  "version": "1.0.0",

  "manifest_version": 2,



  // 推荐

  "description": "插件描述",

  "icons": {

    "48": "icons/icon_48.png",

    "128": "icons/icon_128.png"

  },



  // 可选

  // content script 插入网页内的脚本

  "content_scripts": [

    {

      "matches": [

        "*://juejin.cn/*"

      ],

      "run_at": "document_end",

      "js": [

        "popup/utils.js"

      ]

    }

  ],

  // 扩展在浏览器工具栏上的表现，这个可以适用全部任何页面，popup

  "browser_action": {

    "default_title": "juejin-auto",

    "default_popup": "popup/popup.html" //用户点击图标时，弹出一个popup页面

  },

  // background后台脚本，运行在浏览器环境内，与当前网页无关

  "background": {

    "scripts": [

      "background.js"

    ]

  },

  "options_ui": {

    "page": "options/options.html",

    "chrome_style": true

  },

  //在background中如果想要使用chrome api就要授权才能使用

  "permissions": [

    "cookies",

    "*://*.juejin.cn/",

    "webRequest",

    "webRequestBlocking"

  ],

  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"

}
```

#### (二) background script

##### background可以理解为插件运行在浏览器中的一个后台网站/脚本，与当前浏览页面无关。配置写在manifest上，主要由page,scripts,persistent组成。

```bash
  "background": {

    "scripts": ["background.js"],

    "persistent": false  //false 表示只在需要活动时活动，在完全不活动状态持续几秒后，chrome会暂停运行，true表示打开浏览器后一直运行，唯一场合就是使用chrome.webRequest API来阻止或修改网络请求。

  },
```

#### (三) content script

##### content script简单来说是插入到网页中的脚本。有独立的工作空间，命名空间，作用域，不会与页面中的某些函数和变量发生冲突，可以与插入的页面共享dom，主要用在消息传递上。

```prolog
  "content_scripts": [

    {

    // 匹配页面url，符合条件页面才执行脚本

      "matches": [

        "*://juejin.cn/*"

      ],

      // 脚本何时插入页面，在dom渲染完后

      "run_at": "document_end",

      "js": [

        "popup/utils.js"

      ]

    }

  ]
```

### 通信机制

##### 上面说的这几个组成部分，如果要进行交流，我们可以怎么做呢

##### content script 向 background发消息（同样conent向popup,popup向background，background向popup也可以用下面的方法）

```js
// content script向background发送消息

chrome.runtime.sendMessage(message,function(response){

    console.log(response) // background接收信息后返回的消息

})
// background接收content_script发过来的消息

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){

    console.log(request) // 发送来的信息

    sendResponse('我已收到你的消息：'+JSON.stringify(request)) // 对发来的信息进行回应

})
```

##### background向content script通信与其他的不同，content script可以有多个，一个页面一个，我们可以根据每个页面对应的tabId,向不同的content script发送消息。

```js
function getCurrentTabId(callback) {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

        if (callback) {

            callback(tabs.length ? tabs[0].id: null);

        }

    });

}



chrome.tabs.sendMessage(tabId, message, function(response) {

    console.log(response)

});
```

### 开发掘金自动签到抽奖扩展

##### 首先，分析一下做一个这样的扩展需要实现什么功能

##### 1. 检测当前是否登录

##### 2. 判断用户是否已签到

##### 3. 发送签到请求

##### 4. 发送抽奖请求

##### 5. 拿用户信息（可有可无）

#### 用户登录凭证

##### 通过跟用户相关的请求分析，我们可以通过cookie拿到登陆凭证，这样我们就可以在接下来需要登录凭证的请求的请求头中加上cookie就可以拿到相关的数据。

![image-20250515102518852](/src/assets/imgs/image-20250515102518852.png)



#### 相关的接口

##### 1.获取签到的状态[Get]/growth_api/v1/get_today_status

##### 2.用户签到 [POST]/growth_api/v1/check_in

##### 3.免费抽奖 [POST]/growth_api/v1/lottery/draw

##### 4.用户信息 [Get]/user_api/v1/user/get

##### 因为直接开发每次修改代码都需要重新手动加载扩展，所以找了个能够自动加载扩展的快速开发chrome扩展的预设——vue-web-extension来进行开发。

##### 下面是用vue-web-extension创建项目后的文件夹结构。

```css
.

├── dist

│   └── <the built extension>

├── node_modules

│   └── <one or two files and folders>

├── package.json

├── package-lock.json

├── scripts

│   ├── build-zip.js

│   └── remove-evals.js

├── src

│   ├── background.js

│   ├── icons

│   │   ├── icon_128.png

│   │   ├── icon_48.png

│   │   └── icon.xcf

│   ├── manifest.json

│   └── popup

│       ├── App.vue

│       ├── popup.html

│       └── popup.js

└── webpack.config.js
```

##### 因为我想一打开浏览器就会自动签到和抽奖，所以我就把这些的请求放到background.js里，让他在浏览器打开时就执行请求。

```js
// 抽奖

const drawFn = async () => {

  // 查询今日是否有免费抽奖机会

  const today = await fetch('https://api.juejin.cn/growth_api/v1/lottery_config/get', {

    headers: {

      cookie: document.cookie,

    },

    method: 'GET',

    credentials: 'include',

  }).then(res => res.json());



  if (today.err_no !== 0) return console.warn('免费抽奖失败！');

  if (today.data.free_count === 0) return console.log('今日已经免费抽奖！');



  // 免费抽奖

  const draw = await fetch('https://api.juejin.cn/growth_api/v1/lottery/draw', {

    headers: {

      cookie: document.cookie,

    },

    method: 'POST',

    credentials: 'include',

  }).then(res => res.json());



  if (draw.err_no !== 0) return console.warn('免费抽奖失败！');

  [3, 4].includes(draw.data.lottery_type) ? alert(`恭喜抽到：${draw.data.lottery_name}`) : console.log(`恭喜抽到：${draw.data.lottery_name}`);

};



(async () => {

  /** 用户信息 */

  const userInfo = await fetch('https://api.juejin.cn/user_api/v1/user/get', {

    headers: {

      cookie: document.cookie,

    },

    method: 'GET',

    credentials: 'include',

  }).then(res => res.json());

  console.log(userInfo);

  store.dispatch('setFoo', userInfo);

  console.log(store.getters.foo);



  // 查询今日是否已经签到

  const today_status = await fetch('https://api.juejin.cn/growth_api/v1/get_today_status', {

    headers: {

      cookie: document.cookie,

    },

    method: 'GET',

    credentials: 'include',

  }).then(res => res.json());



  if (today_status.err_no !== 0) return console.warn('签到失败！');

  if (today_status.data) {

    console.log('今日已经签到！');

    drawFn();

    return;

  }



  const check_in = await fetch('https://api.juejin.cn/growth_api/v1/check_in', {

    headers: {

      cookie: document.cookie,

    },

    method: 'POST',

    credentials: 'include',

  }).then(res => res.json());



  console.log(check_in.err_no);

  console.log(check_in);



  if (check_in.err_no !== 0) console.warn('签到失败！');

  console.log(`签到成功！当前积分；${check_in.data.sum_point}`);

  drawFn();



  // 发送信息

  chrome.runtime.sendMessage(today_status, function(response) {

    console.log(response);

  });



  // 接收信息

  chrome.runtime.onMessage.addListener(message => {

    console.log(message);

  });

})();
```

##### 然后就这样直接发送post请求的话会收到403，因为掘金的接口会校验请求头中的origin，非掘金的origin就会报403，所以我们要修改请求头中的origin。

##### 在扩展里origin是不能随意修改的，需要在chrome的一个请求周期里进行修改，这里我们在onBeforeSendHeaders里修改。

```groovy
// background.js文件

chrome.webRequest.onBeforeSendHeaders.addListener(

  function(details) {

    details.requestHeaders.push({ name: 'origin', value: 'https://juejin.cn' });

    return { requestHeaders: details.requestHeaders };

  },

  { urls: ['*://*.juejin.cn/*'] }, // 过滤器，控制监听url范围

  ['blocking', 'requestHeaders', 'extraHeaders'] // 元信息,blocking表示回调方法是同步调用的，requestHeadrs表示details中包含请求头的数据，extraHeaders需要填写这个字段origin才能修改成功。

);
```

##### 这样一个简单的掘金自动签到抽奖的扩展就完成了,在chrome的扩展上加载dist目录就可以加载到这个扩展了。

##### 可以看到，虽然以扩展的方式来实现签到的功能在使用上是挺方便，一打开浏览器就能自动签到，但是在开发扩展过程中也是挺麻烦的，要配置，要申请权限。就以实现自动签到抽奖的功能，会不会有更方便开发的方法呢？这里我就简单介绍一下Tampermonkey(油猴脚本)。

### Tampermonkey

##### 可以看到，这上面有很多写好的脚步提供给我们，我们也可以自己添加脚本上去，开发也非常方便。

![image-20250515102731456](/src/assets/imgs/image-20250515102731456.png)



### 总结

##### 总的来说,谷歌扩展是一个非常有意思的东西,无论是使用别人的扩展还是自己开发扩展,上手也是很快的。但是我们也可以看到谷歌扩展的强大的背后也会有一定的风险,它几乎可以控制浏览器绝大多数内容和功能,读取浏览器的历史记录,读取浏览器输入过的用户名,密码,邮箱,电话等等。所以我们也要小心使用扩展,不要使用不正规公司提供的扩展。