---
title: '第一节、开发工具配置'
---

# 第一节、开发工具配置

## 一、vscode

### 1、VSCode的常用设置和常用插件

VSCode编辑器下载-安装：https://code.visualstudio.com/

-  安装插件（增加功能）：右侧图标最后一项，Extensions，查找需要的插件（联网） 

1. 中文插件：`Chinese` 
2. 颜色主题：`atom one dark `，`Webstorm IntelliJ Darcula Theme`
3. 文件夹图标：`vscode-icons `
4. 在浏览器中打开网页：o`pen in browser`、`Live Sever `
5. 自动重命名/自动结尾标签：`auto rename tag `、`Auto Close Tag` 
6. `px to rem & rpx` 需要设置html 中的fontsize 
7. `ES7+ React/Redux/React-Native snippets `

   - 这个插件是在react开发中会使用到的，但是我经常用到它里面的打印语句；


   - console.log的快捷方式：`clg`


8. `TabOut `字符串 大括号 小括号移动到尾部
9. `Bookmarks `

​	ctrl+alt+K 创建或消除书签
​	ctrl+alt+j 跳转到前一个书签
​	ctrl+alt+l 跳转到后一个书签

​	书签快捷键失效的时候 `ctrl+shift+p` 搜索 `Bookmarks` 查看新的快捷键

10. VSCode对SFC的支持：单页面组件 .vue 文件
    插件一：`Vetur`，从Vue2开发就一直在使用的VSCode支持Vue的插件；
    插件二：`Volar`，官方推荐的插件；vue3 用这个就可以了 

11. `Path interllisense `路径提示 

12. 小程序需要的插件 

- WXML-Language Service


- 小程序开发助手


- wechat-snippet

13. react 插件 `es7+React/Redux`, rcc 

- webstorm 默认就有快捷方式
- `vscode-styled-components` ：css in js插件

14. 可以利用`vscode apidoc snippets` 插件创建api 快速生成文档注释

15. `git history` 、`git Graph`：git工具

16. `IntelliJ IDEA Keybindings` 很重要：webstorm的快捷键

17. `EJS language support` .ejs 文件语法支持

18. code Runner 支持dart运行



### 2、VSCode的配置：



1.  Auto Save 自动保存 

1.  Font Size 修改代码字体大小 

1.  Word Wrap 代码自动换行 

1.  Render Whitespace 空格的渲染方式(个人推荐) 

1.  Tab Size 代码缩进 

1.  推荐2个空格（公司开发项目基本都是2个空格） 

1.  Bracket Pair Colorizer 2`彩色括号插件`，但是该插件已经内置了 

- -  我们可以直接通过VSCode的配置来达到插件的效果； 

- -  设置右上角图标点击 打开设置(json) 添加下面的配置json 

```json
"editor.bracketPairColorization.enabled": true,
"editor.guides.bracketPairs":"active"
```

 

1.  vscode 打开新文件覆盖旧文件解决办法 

- -  vscode 中默认开启了preview，此时临时单击打开的文件在打开新文件时会被覆盖，若需要保留新打开的文件，则可双击文件（在资源管理器栏或者文件标题）或者修改文件，文件就不会被覆盖。 

- -  若要关闭此功能，则可在左下角单击设置，settings-> Workbench->Editor Management 里去掉Enable Preview 的勾选项，此时单击的文件都会被保留。 



1.  snip 设置自定义的函数或者变量自动提示 

1. 1. 在setting 输入 snip
   2. 取消 `JavaScript>suggest>Class Member Snippets: Enabled` 选项



1. 终端设置为gitbase

- vscode: 注意：gitbase的执行文件是在bin目录下的sh.exe，不是主目录下的gitbase.exe

```json
//1. 按“ctrl” 和 “,” 组合键盘，进入设置：
//2. 在“搜索设置”输入：“terminal.integrated.profiles.windows”，进入json编辑：
//3. 加入

"gitBash": {
  "path": "D:\\Git\\bin\\bash.exe",
}
```

- webstrom: 终端设置basefile=》tools》terminal》选中git安装路径中bin路径下的sh.exe





### 3、vscode快捷键



```js
/*vscode 快捷键 
ctrl+shift+e 聚焦到页面文件所在的列表的位置
ctrl+shift+c 打开cmd
ctrl+反引号 打开终端
Ctrl + Shift + N 打开新窗口
Ctrl + Shift + W关闭vscode窗口
Ctrl + W 关闭文件
CTRL + TAB：切换选项卡
ctrl+b:显示侧边栏
ctrl+alt+right split
alt+down/up; 交换行
shift+alt+down/up: 复制代码
alt+left/right :返回光标上一次所在的地方
ctrl+f: 查找
ctrl+h: 替换
ctrl+r: 全局查找
CTRL+, 打开用户设置
CTRL+K CTRL+S：显示快捷键
ALT + Z : 切换自动换行
ctrl+g: 输入行号到指定行
CTRL + P ：转到文件快捷方式
ctrl+shift+f:全局搜索


SHIFT + ALT + I : 在选定的每行末尾插入光标
CTRL+L : 选择当前行
CTRL + SHIFT + L :选择所有出现的当前选择
ctrl+down/up: 复制光标到下一行 统一修改
CTRL + F2 :选择所有出现的当前单词
CTRL + SHIFT + SPACE : 触发参数提示
SHIFT + ALT + F : 格式化文档
//ctrl+shift+s打開文件夾


F2 : 重命名变量
CTRL + K CTRL + X : 删除尾部空格
CTRL + K V =在右侧打开Markdown预览
Ctrl + K Z : 进入Zen模式
Ctrl + r: 切换工作区
//rpc 创建一个纯函数类组件
//rmc 创建一个mome 有 suc优化的组件
```



## 二、webStorm，23版本.3.8好用



### 1、常用配置

#### (1)、代码缩进



setting>Editor>Code Style>JavaScript

#### (2)、自动换行

#### (3)、注释配置方式

设置-》编辑器-》实时模板：live template->选中javaScript,点击添加实时模板-》配置模板文本-》编辑变量-》-》最后点击更改确定那些类型文件生效

~~~javascript
/**
 * @param {$TYPE$} $NAME$ - 加法第一位
 * @Description $DESC$ 
 * @date $date$
 * returns: {RERUEN}
 */
~~~

- 配置变量： date("yyyy/MM/dd HH:mm:ss")

```js
/**
 * @Description $DESC$ 
 * @date $date$
 */
```


- vscode新建全局配置文件、example-global.code-snippets

~~~
{
	
	// Place your 全局 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:
	"Print to console": {
		"scope": "javascript,typescript",
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	},
	"File Header Comment": {
    "prefix": "ddd",
    "body": [
        "/**",
        " * @date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
        " * @description: $0",
        " */",
    ],
    "description": "Insert a file header comment block"
},

"Example in documents": {
    "prefix": "///",
    "body": [
		 "/**",
        " * @param {$TYPE$} $NAME$ - 加法第一位",
        " * @Description $DESC$ ",
        " * @date $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
        " * @returns: {$RETURN$}",
        " */",
    ],
    "description": "Insert a file header comment block"
}
}
~~~



右键断点的位置

### 2、常用插件

`Atom Material Icons`

`CodeGlance Pro`

`Rainbow Brackets`

`Translation`

`leeCode`

`chapter_reader`

`codeGeex`：很有用

`aceJump`：`ctrl+;` 快速跳转，`Ctrl+Alt+;` 目标模式(跳转之后直接选中变量)

`JsonToTypeScript`:  json 转ts和class

`uniapp support`: webstorm 中虽然配置了语法提示，但是没有模板提示，webstorm还是认为view并不是html的标签，这个时候就需要这个插件来进行一些模板的语法提示

~~~
直接在ts、js文件中使用Alt+T快捷键或者Generate快捷键，调起生成弹窗。在弹窗中输入你想要转换的JSON字符串即可，当然你也可以点击格式化按钮进行一次格式化。

~~~



### 3、快捷键

```js
idea 快捷键 
chtrl+alt+left/right :返回光标上一次所在的地方
ctrl+f12: structure 查看代码结构 方法
alt+反引号:  vcs(版本控制系统) 操作界面-history
ctrl+反引号:  切换主题、缩小...
ctrl+shift+反引号: Git
CTRL + TAB：切换选项卡
shift+alt+down/up: 上下复制代码块
alt+down/up: 交换行代码
ctrl+f: 查找
ctrl+r: 替换
ctrl+g: 输入行号到指定行
ctrl + ALT + l : 格式化文档
alt+shift+enter: 相同名字的重命名修改
//rpc 创建一个带类型的组件
//rmc webstorm中没有这个代码片段需要自己设置,editor>live Templates 根据rcc快捷方式设置
rrdc + tab键 - - 创建一个通过dispatch连接到redux的React组件类
sst  = this.setState($END$);
ssf = this.setState((state, props) => { return { $END$ }});
alt+双击右键鼠标，高亮当前段落代码
shift+ctrl+= 展开所有元素标签
shift+ctrl+- 关闭所有元素标签
把插入符号移动到 代码的开始处	ctrl+[	快速 向开始处移动。
把插入符号移动到 代码的结尾处	ctrl+]	快速 向结尾处移动。想修改这个位置的内容时，就很好用哦。
滚动到中心	ctrl+m	上下滚动后，如果滚动太远了时，快速回到 插入符的光标处。
最近的文件	ctrl+e	会出现一个最近打开文件的列表，能快速选择文件，找到文件。
最近更改的文件	ctrl+shift+e	会出现一个列表，里面会显示 最近更改的具体的位置的内容 和 所属的文件。简记： 跟最近文件相关的，都是搭配 e。
最近更改的具体时间和位置	alt+shift+c	要查 被改文件的时间和位置，这个很方便。（跟复制的区别是，都是搭配 c ，但使用了 另外两个键。）
最后编辑位置	ctrl+shift+backspace	能快速跳转到 上一个编辑过的位置。
ctrl+[ || ctrl+]	能快速跳转到当前括号区域内开始||结束的位置
      
mac
   coomond+alt+u 查看当前文件引用组件和方法的结构分布图
      
      ctrl+alt+o 格式化代码
            ctrl+alt+t 包围代码
      vsc git alt+反引号
      ctrl+p 查看方法参数
       ctrl+q 查看class视图
      ctrl+shift+j 2行合并一行 移除不必要的空格
      ctrl+y 删除整行
      输入fori ctrl+j 可以查看发生的情况
      ctrl + w : 可以扩展选中，变量，在点击扩展到行，在点击扩展到方法
```



### 4、调试方式

1. `JavaScript debugger`



### 5、动态模板快捷方式

#### 5.1、箭头函数

使用动态模板 (Live Templates) —— **最推荐**

这是最快的方法。WebStorm 内置了缩写插件：

- 输入 **`arf`** 然后按 **`Tab`** 键：自动生成箭头函数常量。
  - 生成效果：`const functionName = () => { ... };`
- 输入 **`afn`** 然后按 **`Tab`** 键：生成匿名箭头函数。
  - 生成效果：`() => { ... }`

#### 5.2、快速创建变量

5. 万能后缀补全 (Postfix)

虽然没有直接生成 ref 的后缀，但你可以快速定义变量：

- **操作**：输入 `0.const` 然后按 **`Tab`**。
- **效果**：自动变为 `const name = 0;`（然后你再手动包裹 `ref()`）。

**建议：** 养成 **`vref` + `Tab`** 的习惯是 2025 年 Vue 开发者在 JetBrains 系列工具中最标准的高效做法。如果你使用的是 Vue Official (Volar) 插件，这些模板都是开箱即用的



#### 5.3、快速创建ref

Vue 3 专用：`vref` (最快)

- 在安装了 Vue 插件的 WebStorm 中，你可以通过以下缩写快速生成：
- **操作**：输入 **`vref`** 然后按 **`Tab`**。



## 三、sublim 开发配置



### 1、sublim快捷键

文件定位：打开文件-右键 `Reveal in Side Bar`

文件夹右键-当前文件夹查找：全局搜索

搜索全局文件：`ctrl+p`

安装插件：`Ctrl+Shift+P `打开`Package Control`，输入`install package`然后回车

[sublime插件统计地址](https://packagecontrol.io/)

卸载插件：`Ctrl+Shift+P `打开`Package Control`，输入`remove package`然后回车



### 2、sublim 常用插件

1. package Control：包管理工具，使用插件的话就要下载这个
2. SyncedSideBar：文件定位

选项卡之间移动时，该插件将自动触发 Sublime 将其显示在侧边栏中

1. **ChineseLocalizations ：中文**
2. SideBarEnhancements: 增强侧边栏
3. Emmet
4. ctags ctrl+鼠标左键查看函数定义
5. A File icon 文件图标插件
6. Terminus：终端

- ctrl+shift+t：在当前文件路径下打开终端
- ctrl+shift+alt+t：在当前项目路径中打开终端

- 配置，修改 `gitBash` 的路径就可以了

`Preferences >Package Settings > Terminus > Command Palett`

~~~json
[
	  {
        "caption": "Git Bash (panel)",
        "command": "terminus_open",
        "args":
        {
            "cmd":
            [
                "C:\\Program Files\\Git\\bin\\sh.exe"
                "-i",
                "-l"
            ],
            "cwd": "${file_path:${folder}}",
            "title": "Git Bash",
            "panel_name": "Terminus"
        }
    }
]

~~~



`Preferences >Package Settings > Terminus > key Bindings`

```ts
[
   {
        "keys":
        [
            "alt+1"
        ],
        "command": "terminus_open",
        "args":
        {
            "cmd": "C:\\Program Files\\Git\\bin\\sh.exe",
            "cwd": "${file_path:${folder}}",
            "panel_name": "Terminus"
        }
    }
] 
```



`SublimeTmpl`：创建模板文件



## 四、chrom 插件

`SwitchyOmega` 使用代理ip



## 五、开发其他问题

#### 1、webstorm 配置问题一 external libraries

external libraries 外部链接，有时候会自动下载一些过时的依赖导致框架在使用时老是有错误的语法提示

 

解决：help》find action》搜索 Registry  》打开注册表之后搜索 `typescript.external.type.definitions.packages` 删除不需要的外部依赖，之后删除 external libraries 下面的所有文件夹

#### 2、sublime ctrl+shift+f 快捷键无效

windows10 `ctrl+shift+f` 快捷键是繁体和简体转换，造成快捷键冲突。右键输入法-》设置关掉切换快捷键



# 第二节、常用应用



## 一、windows常用应用



### 1、quickLook(space空格快速查看超级好用)



### 2、windows 快捷录屏键

win+ g

# 第三节、项目搭建配置



1.  创建项目 

1.  搭建目录结构 

1.  链接远程 `git` 仓库，及 `.gitignore` 文件 

4. 修改git用户名和邮箱
5. 生成`jsong.config.js` 文件 
6. 配置`webpack` 集成ts，或者别名，扩展名一些配置
7. 整合中间件 router、redux、pinia、vuex
8. css 样式调整重置，设计整体架构样式风格。

- 可以下载 `npm install --save normalize.css` 文件

```css
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
========================================================================== */

/**
* 1. Correct the line height in all browsers.
* 2. Prevent adjustments of font size after orientation changes in iOS.
*/

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
========================================================================== */

/**
* Remove the margin in all browsers.
*/

body {
  margin: 0;
}

/**
* Render the `main` element consistently in IE.
*/

main {
  display: block;
}

/**
* Correct the font size and margin on `h1` elements within `section` and
* `article` contexts in Chrome, Firefox, and Safari.
*/

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
========================================================================== */

/**
* 1. Add the correct box sizing in Firefox.
* 2. Show the overflow in Edge and IE.
*/

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
* 1. Correct the inheritance and scaling of font size in all browsers.
* 2. Correct the odd `em` font sizing in all browsers.
*/

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
========================================================================== */

/**
* Remove the gray background on active links in IE 10.
*/

a {
  background-color: transparent;
}

/**
* 1. Remove the bottom border in Chrome 57-
* 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
*/

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
* Add the correct font weight in Chrome, Edge, and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/**
* 1. Correct the inheritance and scaling of font size in all browsers.
* 2. Correct the odd `em` font sizing in all browsers.
*/

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
* Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/**
* Prevent `sub` and `sup` elements from affecting the line height in
* all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
========================================================================== */

/**
* Remove the border on images inside links in IE 10.
*/

img {
  border-style: none;
}

/* Forms
========================================================================== */

/**
* 1. Change the font styles in all browsers.
* 2. Remove the margin in Firefox and Safari.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
  }

  /**
  * Show the overflow in IE.
  * 1. Show the overflow in Edge.
  */

  button,
  input { /* 1 */
  overflow: visible;
  }

  /**
  * Remove the inheritance of text transform in Edge, Firefox, and IE.
  * 1. Remove the inheritance of text transform in Firefox.
  */

  button,
  select { /* 1 */
  text-transform: none;
  }

  /**
  * Correct the inability to style clickable types in iOS and Safari.
  */

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
  -webkit-appearance: button;
  }

  /**
  * Remove the inner border and padding in Firefox.
  */

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
  }

  /**
  * Restore the focus styles unset by the previous rule.
  */

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
  }

  /**
  * Correct the padding in Firefox.
  */

  fieldset {
  padding: 0.35em 0.75em 0.625em;
  }

  /**
  * 1. Correct the text wrapping in Edge and IE.
  * 2. Correct the color inheritance from `fieldset` elements in IE.
  * 3. Remove the padding so developers are not caught out when they zero out
  *    `fieldset` elements in all browsers.
  */

  legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
  }

  /**
  * Add the correct vertical alignment in Chrome, Firefox, and Opera.
  */

  progress {
  vertical-align: baseline;
  }

  /**
  * Remove the default vertical scrollbar in IE 10+.
  */

  textarea {
  overflow: auto;
  }

  /**
  * 1. Add the correct box sizing in IE 10.
  * 2. Remove the padding in IE 10.
  */

  [type="checkbox"],
  [type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
  }

  /**
  * Correct the cursor style of increment and decrement buttons in Chrome.
  */

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
  height: auto;
  }

  /**
  * 1. Correct the odd appearance in Chrome and Safari.
  * 2. Correct the outline style in Safari.
  */

  [type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
  }

  /**
  * Remove the inner padding in Chrome and Safari on macOS.
  */

  [type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
  }

  /**
  * 1. Correct the inability to style clickable types in iOS and Safari.
  * 2. Change font properties to `inherit` in Safari.
  */

  ::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
  }

  /* Interactive
  ========================================================================== */

  /*
  * Add the correct display in Edge, IE 10+, and Firefox.
  */

  details {
  display: block;
  }

  /*
  * Add the correct display in all browsers.
  */

  summary {
  display: list-item;
  }

  /* Misc
  ========================================================================== */

  /**
  * Add the correct display in IE 10+.
  */

  template {
  display: none;
  }

  /**
  * Add the correct display in IE 10.
  */

  [hidden] {
  display: none;
  }
```

- 或者手动下载，将以下的补充加入

```js
//补充一些必要配置
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 4px;
  height: 5px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background-color: #fff;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e3e3e8;
}
```

 

1.  封装网络请求 

```js
import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { baseURL } from "./config"

class Request {
  private instance: AxiosInstance
  constructor(baseUrl: string, timeout = 3000) {
    console.log(baseURL, "基础url")
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: timeout
    })

    this.instance.interceptors.request.use(
      (config) => {
          
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (response => {
      const { code, result, message } = response.data;

    // 根据约定，比如 200 或 0 代表成功
    if (code === 200 || code === 0) {
      return result; // ✅ 核心：只返回 result 这一层
    }

    // 业务逻辑错误处理（如余额不足、库存不足）
    console.error(`[Business Error]: ${message}`);
    return Promise.reject(new Error(message || 'Unknown Error'));
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  request<T>(config: AxiosRequestConfig) {
    return this.instance.request<any, T>(config)
  }

  get<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, params: data, method: "GET" })
  }
  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "POST" })
  }
  delete<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "DELETE" })
  }
  put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "PUT" })
  }
}

export default new Request(baseURL)
```

### 一、editorconfig文件



1. 在多人协同开发的时候，在不同的操作系统中，对于`enter`**回车**来说 `windows`和`mac` **表示的换行符号是不一样的**，在**显示**的时候**会有一些问题**，这个时候需要统一起来。

1. 在一个就是编辑器的问题，`vscode` 和 `webstorm` 配置**缩进**的时候，配置的时候是4个空格有的是2个空格，还有的时候就是普通的tab 索引，会导致**风格不一致**，主要原因就是编辑器的风格不一致。

1. 解决上面的问题，只需要配置 `**.editorconfig**` **文件，注意没有后缀名**



-  默认情况下`webstorm` 都会默认读取这个文件的
- VSCode需要安装一个插件：`EditorConfig for VS Code`

因为默认情况下，vscode不会读取的 `.editorconfig`，需要安装插件，webstrom不需要



```plain
# http://editorconfig.org

root = true
#表似乎当前配置文件是在项目路径的根路径的
root=ture` =
[*] # 表示所有文件适用.vue .js .jsx ...
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # tab缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```



### 二、jsconfig.json配置
/.


-  在使用 `.vue` 单文件开发的时候使用 `template` 模板进行报错 

解决：在 `jsconfig.json` 中配置下面选项

  

-  如果是tsconfig的时候，需要在项目中添加一个.ts文件否则报错 

-  `jsconfig.json` 

可以提供一些有效的语法提示，没有jsconfing的情况下，每一个js都是独立的单元，没有import其他的依赖的时候，没有提示的

```json
{
  "compilerOptions": {
     //要使用的默认依赖库
    "target": "es5",
    "module": "esnext",
     //用于解析非相关模块名称的基目录。
    "baseUrl": "./",
    "moduleResolution": "node",
     //	指定相对于 baseUrl 选项计算的路径映射。
    "paths": {
      "@/*": ["src/*"],
      "component/*": ["src/component/*"]
    },
    "jsx": "preserve",
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
}
}
```

### 三、配置prettier格式化工具



Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。



1. 安装prettier



```bash
npm install prettier -D
```



1. 配置`.prettierrc`文件：



- useTabs：使用tab缩进还是空格缩进，选择false；
- tabWidth：tab是空格的情况下，是几个空格，选择2个；
- printWidth：一行代码占据字符的长度，推荐80，也有人喜欢100或者120，超过就会格式化；
- singleQuote：使用单引号还是双引号，选择true，使用单引号；
- trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
- semi：语句末尾是否要加分号，默认值true，选择false表示不加；



```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```



1.  创建 `.prettierignore` 忽略文件 

```plain
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

 

1.  vscode 下载插件 Prettier-code formatter 

测试文件修改之后，ctrl+s 保存是否会自动格式化

- 配置保存后自动格式化

setting 搜索format on save，点击选中 Format on save 即可



1.  配置 npm prettier 工具执行命令 

在package.json中配置一个scripts：着这样的话执行完该命令之后哪怕在其他的编辑器下，也可以将所有的文件根据，`.prettierrc` 配置进行格式化

 

```json
    "prettier": "prettier --write ."
```





#### 1、prettier 结合 eslint 规范



默认情况下，perttier 自定以配置的规范有些会和eslint 的规范可能会存在冲突，需要一些插件进行解决



-  安装插件：（vue在创建项目时，如果选择prettier，那么这两个插件会自动安装） 
- eslint-config-prettier：选中eslint会默认安装
- eslint-plugin-prettier ：有的并不会默认安装，用来帮助prettier结合eslint规范的

```bash
npm i eslint-plugin-prettier eslint-config-prettier -D
```

 

-  之后在进行配置 eslint 文件 

- - 这样的话，eslint 规范会以prettier 为准

```js
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
     //添加这一行配置，在后面进行添加固定配置，后面的规范会覆盖前面的规范，
    //刚刚添加之后，会报错，需要重启vscode就好了
    //还报错的话 执行一下 npm run prettier
    'plugin:prettier/recommended'
  ],
```

-  注意：eslint 对vue组件会有命名规范，可以在`.eslintrc.cjs`文件中手动关闭 

```js
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
     //关闭命名规范检测
    'vue/multi-word-component-names': 'off'
  }
```

 

#### 2、eslint

- 作用：当我们写的代码不符合规范的时候，eslint 会给我们报错只能的提示我们，用来**提示**

vscode eslint 插件

ESLint 将自动在校验的文件目录里寻找 ESLint 配置文件，这个插件会根据配置文件自动检测所编写的代码是否符合eslint 规范



- 自动校验代码规范

常见配置 `.eslintrc.cjs`

~~~json
// @see: http://eslint.cn

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 指定如何解析语法
  parser: "vue-eslint-parser",
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  // 继承某些已有的规则
  extends: ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
    "prefer-const": "off", // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/no-empty-function": "error", // 禁止空函数
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/ban-ts-comment": "error", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-var-requires": "off", // 允许使用 require() 函数导入模块
    "@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)

    // vue (https://eslint.vuejs.org/rules)
    "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该 no-unused-vars 规则时有效
    "vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
    "vue/no-mutating-props": "error", // 不允许改变组件 prop
    "vue/custom-event-name-casing": "error", // 为自定义事件名称强制使用特定大小写
    "vue/html-closing-bracket-newline": "error", // 在标签的右括号之前要求或禁止换行
    "vue/attribute-hyphenation": "error", // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
    "vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
    "vue/no-v-html": "off", // 禁止使用 v-html
    "vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
    "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
    "vue/no-setup-props-destructure": "off" // 禁止解构 props 传递给 setup
  }
};

~~~



`.eslintignore` 忽略文件

~~~text
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
/src/mock/*
stats.html
~~~





#### 3、git Husky和eslint



作用：会在代码提交前进行 eslint fix将一些不规范的代码进行格式化，因为有可能组员会在没有保存文件的前提下提交一些不规范的代码



-  husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push 
-  husky 自动配置命令 

```bash
npx husky-init && npm install
```



上面的命令会做三件事：

1.  安装husky相关依赖 
2. .在项目目录下创建 `.husky` 文件夹： 

```bash
npx huksy install
```

 

1. 在package.json中添加一个脚本： 

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
#    "lint": "vue-cli-service lint", 会在代码提交前执行一下的命令进行格式化
npm run lint
```

1. 执行git commit的时候会自动对代码进行lint校验, 校验之后进行提交



### 四、git commit规范



#### 1.5.1. 代码提交风格



通常我们的git commit会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。



![image-20230903203823004](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903203823004.png)



但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen



- Commitizen 是一个帮助我们编写规范 commit message 的工具；



1.安装Commitizen



```bash
npm install commitizen -D
```



2.安装cz-conventional-changelog，并且初始化cz-conventional-changelog：



```bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```



这个命令会帮助我们安装cz-conventional-changelog：



![image-20230903203859078](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903203859078.png)

并且在package.json中进行配置：

![image-20230903203908549](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903203908549.png)



这个时候我们提交代码需要使用 `npx cz`：



- 第一步是选择type，本次更新的类型

| Type     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增特性 (feature)                                           |
| fix      | 修复 Bug(bug fix)                                            |
| docs     | 修改文档 (documentation)                                     |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc) |
| refactor | 代码重构(refactor)                                           |
| perf     | 改善性能(A code change that improves performance)            |
| test     | 测试(when adding missing tests)                              |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                     |
| revert   | 代码回退                                                     |



- 第二步选择本次修改的范围（作用域）



![image-20230903203919656](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903203919656.png)



- 第三步选择提交的信息



![image-20230903203932273](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903203932273.png)



- 第四步提交详细的描述信息

![image-20230903203943692](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903203932273.png)



- 第五步是否是一次重大的更改



![image-20230903203952373](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903203952373.png)



- 第六步是否影响某个open issue



![image-20230903204000422](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903204000422.png)



我们也可以在scripts中构建一个命令来执行 cz：

![image-20230903204011758](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903204011758.png)



#### 1.5.2. 代码提交验证



如果我们按照cz来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？



- 我们可以通过commitlint来限制提交；



1.安装 `@commitlint/config-conventional` 和 `@commitlint/cli`



```bash
npm i @commitlint/config-conventional @commitlint/cli -D
```



2.在根目录创建 `commitlint.config.js` 文件，配置`commitlint`



```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```



3.使用 `husky` 生成 `commit-msg` 文件，验证提交信息：



```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```





### 五、后台管理系统scss动态设置每个页面的高度(重要管理系统“必”设置)

```css
// Base
$base--line-height: 1.15;

// Navbar
$navbar--height: 50px;

// Sidebar
$sidebar--width: 230px;
$sidebar--width-fold: 64px;
$sidebar--background-color-dark: #263238;
$sidebar--text-color-dark: #8a979e;
$sidebar--menu-item-height: 48px;

// Content
$content--padding: 15px; 
$content--background-color: #f1f4f5;
$content--card-header-height: 60px;
$content--tabs-header-height: 38px;
// Content, 填充整屏高度(非tabs状态) = 整屏高度 - 导航条高度 - aui-content上下内边距高度
$content--fill-height: calc(100vh - #{$navbar--height} - #{$content--padding * 2});
// Content, 填充整屏高度(是tabs状态) = 整屏高度 - 导航条高度 - tabs组件header高度 - tabs组件content上下内边距高度
$content--fill-height-tabs: calc(100vh - #{$navbar--height} - #{$content--tabs-header-height} - #{$content--padding * 2});
```









## 第四节、FAQ

#### 1.vscode使用ts的时候tsconfig报错

当tsconfig报错的时候，有很大的可能是vscode默认使用的ts语法是最新的，我们可以手动修改下vscode使用的版本，当时修改为5.0之前的版本4.8.4


![Alt text](/assets/markdown/assets/vscode_Setting_Plugin.assets/image-20230903203510463.png)



#### 2. element Plus按需引入样式

默认根据element plus 官网按需引入的的话，并没有自动引入message或者loading 的样式。

- 使用 `vite-plugin-style-import`
- 依赖一个库 `consola`，是内部用到的交互打印的一个包 `npm install -D vite-plugin-style-import consola`



#### 3.table-td设置宽度失效

当table 设置100%，设置td宽度px无效。这个时候尝试用%单位设置

#### 4.Hexo

 top_img 设置为false时不展示顶部图

```
---
title: JavaScript 函数、JavaScript 参数、解析过程、运行机制、变量提升、调试技巧
subtitle: JavaScript 函数介绍
description: JavaScript 参数、解析过程、运行机制、变量提升、调试技巧
keywords: avaScript 参数、解析过程、运行机制、变量提升、调试技巧
data: 2022-03-09 16:30:00
comments: true
categories: 'JavaScript'
tags: 'JavaScript Function'
#cover:     'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg'
#top_img: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg'
#order: 1
---
```
