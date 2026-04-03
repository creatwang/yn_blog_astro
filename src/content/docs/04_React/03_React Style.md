---
title: '第一节、React的过渡动画'
---

# 第一节、React的过渡动画



### react-transition-group介绍

> React曾为开发者提供过动画插件 react-addons-css-transition-group，后由社区维护，形成了现在的 react-transition-group。
>
> 可以**通过原生的CSS来实现**这些过渡动画，但是**`React`社区**为我们**提供**了`react-transition-group`用来完成过渡动画。

- 帮助实现组件的 ”入场“ 和 ”离场“ 动画，由于是社区在维护，需要安装使用

  ~~~shell
  npm install react-transition-group --save
  ~~~

- **优点**：`react-transition-group` 本身**非常小**，不会为我们应用程序增加过多的负担





### react-transition-group主要组件

- `react-transition-group`主要包含四个组件：
  1. `Transition`
     该组件是一个和平台无关的组件（不一定要结合`CSS`）；
     在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是`CSSTransition`；
  2. `CSSTransition`
     在前端开发中，通常使用`CSSTransition`来完成过渡动画效果
  3. `SwitchTransition`
     两个组件显示和隐藏切换时，使用该组件
  4. `TransitionGroup`
     将多个动画组件包裹在其中，一般用于列表中元素的动画；



- **总结**：`CSSTransition` 就是基于 `Transition` **组件构建的**，所以**使用后三个即可**



## 一、CSSTransition

- CSSTransition执行过程中，有三个状态：
  - `appear`：页面**首次加载**的时候
  - `enter`：动画**过渡前**
  - `exit`：动画**结束后**
  - 关键字，`active` 和 `done`



### 1》状态所对应的CSS样式

- **开始状态**：对应的类是 `-appear`、`-enter`、`exit`；
- **执行动画**：对应的类是 `-appear-active`、`-enter-active`、`-exit-active`；
- **执行结束**：对应的类是 `-appear-done`、`-enter-done`、`-exit-done`；



### 2》CSSTransition 组件的属性

- **注意**：`CSSTransition` **只**允许有**一个根**，

~~~typescript
  import {CSSTransition, SwitchTransition, TransitionGroup} from 'react-transition-group'
  render() {
    const {isShow} = this.state
    return (
      <div>
          <button onClick={e => this.setState({isShow: !isShow})}>trigger</button>
              <CSSTransition 
                  //class前缀
                  classNames="wyn" 
                  //判断是否显示
                  in={isShow} 
                  //当被Switch和group包裹的时候 key 会代替in属性的作用
                  //key={isShow ? 1: 2}
                  //首次渲染的是否添加动画
                  appear={true}
                  //是否卸载组件，不使用的话需要添加 done class
                  // unmountOnExit={true} 
                  //class 切换完成的时间
                  timeout={2000}
                  >
                  {/*只允许有一个根*/}
                  <div className="box">
                      <h4>张三</h4>
                      <h4>李四</h4>
                  </div>
              </CSSTransition>
      </div>
    )
  }
~~~





#### 1、in触发进入或者退出状态 unmountOnExit

> 简单说：给 `in` 属性绑定一个`boolean` 变量，来控制显示隐藏，

- **重点**：需要搭配 **`unmountOnExit={true}`  属性使用** 之后 `CSSTransition`  会自动卸载组件

  > 否则组件不卸载，动画结束后还会回显

  - 如果频繁切换，**不希望组件卸载**的话，可以使用 `enter/exit-done` class 



- ##### 使用

  - 当 `in` **为 `true` 时**，触发**进入**状态，会添加 `-enter`、`-enter-acitve` 的 `class` 开始执行动画，当动画执行结束后，会移除两个 `class`，并且添加 `-enter-done` 的 `class`；\

    

  - 当 `in` **为 `false` 时**，触发**退出**状态，会添加 `-exit`、`-exit-active`的`class`开始执行动画，当动画执行结束后，会移除两个`class`，并且添加`-enter-done`的`class`；





#### 2、`classNames`属性动画class的前缀

> 确定`classNames`之后，对应的 `class` 名称：比如`card-enter`、`card-enter-active`、`card-enter-done`；





#### 3、timeout：过渡动画的时间

- ##### 参数：毫秒

- 过渡动画 `class` 的持续实现，在其属性指定的时间内完成 `class` 的切换
- 区分`Transition` 中的`duration`： 
  - `timeout`：是在指定的时间内，要完成对应class的切换
  - `duration`：是动画的持续时间，有可能动画结束了，`timeout` 时间常的话可能动画结束一段时间在进行`active`的切换



#### 4、appear

> 是否在初次进入添加动画（**需要和in同时为true**）





#### 5、CSSTransition对应的钩子函数

> 主要为了检测动画的执行过程，来完成一些JavaScript的操作

- `onEnter`：在进入动画之前被触发；
- `onEntering`：在应用进入动画时被触发；
- `onEntered`：在应用进入动画结束后被触发；



#### 6、注意：react-transtion-group 中没有 move移动class

> 需要手动实现，利用 `height`属性

~~~css
.wyn-enter,
.wyn-appear  {
  opacity: 0;
  /* height: 23px; */
}
.wyn-enter-active,
.wyn-appear-active {
  opacity: 1;
  /* height: 0; */
  transition: all 2s ease;
}

.wyn-enter-done {
  display: block;
}
.wyn-exit-done {
  display: none;
}

.wyn-exit {
  opacity: 1;
  /* height: 23px; */
}

.wyn-exit-active {
  opacity: 0;
  /* height: 0; */
  transition: all 2s ease;
  /* position: absolute; */

}

.move {
  
  transition: all 2s ease;
}
~~~





## 二、SwitchTransition

> 结合 `CSSTransition` 组件实现元素之间的切换。

- **知识点**：与 `CSSTransition` 元素进行切换的**区别**，就是**有 `mode` 属性**
- 而 `vue` 中将该属性都会在，`Transition`组件中



### 1、Mode属性

> 字符串类型，必填

- `in-out`：表示新组件**先进入**，旧组件**再移除**；
- `out-in`：表示就组件**先移除**，新组建**再进入**；



### 2、使用SwitchTransition

- **注意**：`SwitchTransition` 要和 `CSSTransition` 组件一起使用，**不能单独使用**

  > `SwitchTransition` 包裹的 `CSSTransition` 组件

  

- **`Transition` 中 key属性**：`SwitchTransition` 包裹的 `CSSTransition` 或 `Transition` 组件**不再**像以前那样**接受 `in` 属性来判断**元素是何种状态，**取而代之的是 `key` 属性；**

~~~typescript
  render() {
    const {isShow} = this.state
    return (
      <div>
        <h3>SwichTransition</h3>
        <button onClick={e => this.setState({isShow: !isShow})}>trigger</button>
        <SwitchTransition mode="in-out">
          <CSSTransition classNames={"wyn"} key={isShow ? 1 : 2} timeout={2000} unmountOnExit={true}>
            {
              isShow ? <h5>张三</h5> : <h5>李四</h5>  
            }
          </CSSTransition>
        </SwitchTransition>
      </div>

    )
  }
~~~





## 三、TransitionGroup

> `CSSTransition` **只能给一个根元素添加过渡动画**

- 在 `react-transition-group` 需要**使用** `TransitionGroup` 组件**包裹多个** `CSSTransition` 组件来实现批量**添加动画**

- `vue` 中 只需要 `transition-group` 组件直接包裹即可



### component 属性

> 类似`vue`中 `transition-group`组件中的 `tag` 属性，`TransitionGroup`，同样不是容器，可以通过 `component` 渲染成指定的元素



~~~typescript
  print() {
    const {books} = this.state
    let temp = books.map((item, index) => (
        <CSSTransition classNames={"wyn"} key={item.id} timeout={2000}>
          <li className='move'>
            <span className="span">{item.name}</span>--
            <span className="span">{item.price+"$"}</span>
            <button onClick={e =>  this.del(e, index)}>del</button>
          </li>
        </CSSTransition>
    ))
    return temp
  }

  render() {
    return (
      <div>
        <h4>transitionGroup</h4>
        <TransitionGroup component={"ul"}>
          {this.print()}
        </TransitionGroup>
      </div>
    )
  }
~~~





# 第二节、react编写css

> 在 react 中，没有 css 作用域



## 一、内联样式CSS写法

> `react` 官方文档中的写法。

- 对象写法 `style` 属性**绑定样式对象**

~~~typescript
export class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      temp: {
        border: "2px solid red",
        fontSize: "24px"
      }
    }
  }
  render() {
    return (
      <div>
        <h4>内联样式</h4>
        <div className="container">
          <div className="box" style={this.state.temp}>
            <h5>这里是张三</h5>
          </div>
        </div>
      </div>
    )
  }
}
~~~



## 二、普通CSS文件写法

- **注意**：普通的 `class` 文件的写法，**是没有`class`作用域的**
- 因此无论在哪加载的 `class` 都是**全局的 `css` 样式**



### 2.1、React 中使用less

> react 中是没有默认配置less 对应loader 的，同时有不对外展示配置文件，因此需要通过第三方插件，来进行手动配置

- `ant.design UI`框架有教程

  > 直接安装，`craco-less`

  ~~~shell
  npm i craco-less
  ~~~



#### craco

>  翻译过来就是， create-react-app-config 插件
>
> @craco/craco@alpha 内测版本

~~~shell
npm install @craco/craco 
~~~



- 将 `package.json` 启动脚本命令修改为 `craco` 启动

  > 这样的话会自动帮忙合并 `webpack` 配置

  ~~~js
    "scripts": {
      "start": "set PORT=9000 && craco start",
      "build": "craco build",
      "test": "craco test",
      "eject": "react-scripts eject"
    },
  ~~~

  

- 然后在项目**根目录**创建一个 `craco.config.js` 用于**修改默认配置。**

  

  

- 配置好就可以直接导入使用了



### 2.2、css导入

由于 `React` 框架使用的 `jsx` 

- 因此也是**没有`style` 的 `@import` 导入的关键字**
- 只能使用模块化的导入方式 ，`require`、`import()异步导入`
- 或者使用 `Portal` 向`header` 标签导入一个 `style` 元素

~~~typescript
require("./style.less") 
//使用Portal
 render() {
   const el = <style >@import("./style.less")</style>
   const dom = document.querySelector("head")
   return createPortal(el, dom) 
 }
~~~







## 三、CSS Module写法

> `css modules` **并不是** `React` 特有的解决方案，而是所有使用了**类似于 `webpack` 配置的环境下都可以使用的。**

- 其他项目中使用需要手动配置

- `React` 的脚手架已经**内置了`css modules` 的配置**，可以直接使用

- 通过这种方式可以让 `css` 有自己的作用域

- 唯一不适应的就是，需要 `css`对象**`.calss`属性** 获取，这样就不能使用 `emmt` 语法了

  > 要将css文件当作模块对象进行导入



### 使用 CSS Module

> 需要将所有的 `css` 文件，或者 `less` 文件修改为以 `module` 文件名结尾的文件

**例**：`index.module.css`

- **需要将 `xxx.module.css` 文件当作模块对象导入**

  > 默认是 default 导入，直接使用导入对象使用

~~~typescript
import React, { PureComponent } from 'react'
import app from "./index.module.less"
export class App extends PureComponent {

  render() {
      return(
          <div className="container">
              {/*需要 css对象.calss属性 获取*/}
              <div className={app.box}>
                  <h5 className='item'>这里是张三</h5>
              </div>
          </div>
      )
  }
}

export default App
~~~



## 四、CSS in JS

> 官方文档也有提到过CSS in JS这种方案

- “CSS-in-JS” 是指一种模式，其中 **`CSS` 由 `JavaScript` 生成**而不是在外部文件中定义
  - 因此 `React` 有被人称之为 `All in JS`
- 此功能并不是 `React` 的一部分，而是**由第三方库提供**



### 1、常见 CSS in JS的库

1. `styled-components`：目前最流行的 CSS-in-JS库

   ~~~shell
   npm install styled-components
   ~~~

2. `emotion` ：语法同  `styled-components` 差不多

3. `glamorous`



### 2、特点

- 它**支持**类似于**CSS预处理器一样的样式嵌套**：
  1. 支持直接子代选择器或后代选择器，并且直接编写样式；
  2. 可以通过`&`符号获取当前元素；
  3. 直接**伪类选择器、伪元素等；**



- 官方提供了 编写css 的vscode插件

  > vscode-styled-components

  



### 3、styled-components的使用

> `styled-components` 是通过模板字符串调用的方式使用的

- 回顾：以 `${}` 进行分，将差分的字符串**数组集合**当作第一参数传入，**后续的 `${}` 会当作参数列表一次传入**



- 根据这种**调用方式生成 `css` 样式**

  > `styled-components`的本质是通过**函数的调用**，最终创建出一个**组件**：

  - 这个组件会被**自动添加**上一个**不重复**的`class`；
  - `styled-components`会**给该`class`添加相关的样式**



- 非常简单，下载之后导入使用

  ~~~typescript
  import styled from 'styled-components'
  const ModuleCss = styled.div`
    .box {
      border: 3px solid salmon;
    }
  `
    render() {
       return  (
          //直接使用创建的组件进行使用
           <ModuleCss>
               <h4>modeule css</h4>
               <div className="container">
                   <div className="box">
                       <h5 className='item'>这里是张三</h5>
                   </div>
               </div>
           </ModuleCss> )
    }
  ~~~

  



#### props属性、attrs方法

> 可以更加灵活的，动态添加属性

1. `props` 属性会传入到，`${}`包裹的形参中

   - `props` 属性会包含 `attrs()` 方法初始化的一些对象属性
   - 还会包含，在**组件上自定义的一些属性**

   

2. 可以用通过 `attrs()` 方法**初始化一些 `css` 属性值**

   > 在 `arrts({})` 中定义的属性，通过`props`属性来获取

   - **参数**：`Object` || `Function`

~~~typescript
//object 初始化一些属性
    import styled from 'styled-components';
    export const ModuleCss = styled.div.attrs({
      num: 3
    })`
      .box {
        border: ${props => props.num}px solid red;
      }
    `
    
//function设置props默认属性
export const ModuleCss = styled.div.attrs(props => {
        return {
          num: 3,
          //设置默认值
          title: props.title || "blue"
        }
    })`
      .box {
        border: ${props => props.num}px solid red;
      }
    `
~~~



### 4、继承

~~~js
export const Bar = styled.div`
  border: 1px blue solid
`
//注意这例styled()方法后面要进行调用拼接模板字符串或者手动调用
export const Foo = styled(Bar)``
//export const Foo = styled(Bar)("")
~~~



## classnames库

> 在 `jsx` 中，可以很灵活的使用 `js` 代码，进行条件判断动态添加所需要的类

- 但是在业务逻辑过多的情况下，冗长的三元匀速符，会在标签属性上占据过多控件，导致阅读性很差

- 可以借助**第三方的库：**`classnames`

  > 可以像 `vue` 中使用对象和数组动态的绑定`class`， 和**vue中class绑定几乎一致**

- 相对与vue的绑定，classnames 的优势就是是个函数，添加参数列表比较方便一点

- 下载

  ~~~shell
  npm install classnames
  ~~~

- 使用

  ~~~typescript
  import React, { PureComponent } from 'react'
  import classNames from 'classnames'
  
  export class App extends PureComponent {
      return (
        <div>
          {/*既可以放入参数列表中，也能放在数组中*/}
          <h2 className={classNames("aaa", { bbb:isbbb, ccc:isccc })}>嘿嘿嘿</h2>
          <h2 className={classNames(["aaa", { bbb: isbbb, ccc: isccc }])}>嘻嘻嘻</h2>
        </div>
      )
    }
  }
  
  export default App
  ~~~

  





# 第三节、图片的导入

- 在webpack 当中所有的，图片要使用模块，原因是，打包的时候会修改文件路径，在项目启动之后动态加载的时候，获取不到完整的文件名





