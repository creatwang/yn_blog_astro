---
title: '14_essay'
---

放大镜功能的实现

跨平台

key 是否能使用 symbol

 VNode 和 真实的dom对比

简洁见名知意

侦听器diff

阿里思维导图组件

radio v-model互斥，定义valye

checkbox 回看

不支持 name-zhangsan 这种写法

局部组件 是否回被打包 回看视频

回看 vue/cli更新



emits: 回看



测试es6 作用域this

使用prvide 和 eventBus 的时候注意要使用箭头函数，this指向

使用非父子组件进行传值的时候记得添加注释

生成好虚拟dom ，才能进行加载

虚拟dom 转换为真实dom之后才算挂在好

先卸载虚拟dom，之后更新真实dom 两个事完成之后才算unmounted

最后销毁

异步组件回看，回顾import 导入加载的过程



7-19

复习 margin 负值的使用

style 标签的 lang = "less" 回看

name $parent $root $attr $slot

webpack3 魔法注释



7-22

unmap  $stroe 回看 setup函数

所有的数据都要方法 Vuex 吗

7-23

mutation 必须是同步的原因

action 和 mutation 的区别

router-view 使用 keep-alive

path 的懒加载为什么查找规则要添加后缀名



问题：为什么node 包在node_modules中使用不会报错



补充：ref 和 计算属性的区别，并测试对像的响应式’

查看 stateref 和 ref 的区别

创建一个引用对象，其中包含存储的所有状态、getter和插件添加的状态属性。 类似于toRefs()，但专门为Pinia商店设计，所以方法和非反应性属性完全被忽略。

44173741



8月1日

项目实现当前位置

更多滚动栏

响应式打包，postcss-px-to-viewport

回顾离开页面需要卸载的东西，很多人都不卸载是不规范的，想起来了添加事件总线的时候也要卸载

整理需求实现的方法

回顾插槽 在使用和剧名插槽使用的时候 默认插槽是否一定要添加名字

写函数



8.2

路由动画怎么写，在挂载和卸载执行怎样的动画怎样指定组件添加动画



shallowRef 根据官方文档重新整理笔记

懒加载异常



当组件发送异步请求的时候一定要进行非空判断，数据的有效性 v-if 不为空的时候显示，或者使用可选链



- 一键分享 twitter

  ~~~
  https://twitter.com/intent/tweet?original_referer={{encoded_web_url}}&text={{encoded_text}}&related={{encoded_category}}&url={{encoded_web_url}}&via={{encoded_source}}
  ~~~

- 参数

  | 参数                   | 说明         |
  | ---------------------- | ------------ |
  | `{{encoded_web_url}}`  | 网页链接地址 |
  | `{{encoded_text}}`     | 网页标题     |
  | `{{encoded_category}}` | 网页分类     |
  | `{{encoded_source}}`   | 来源         |





~~~js
let metaArr = [
    'twitter:url', 'http://java.chendahai.cn',
    'twitter:site', 'http://java.chendahai.cn',
    'twitter:title', 'this is title',
    'twitter:description', 'this is desc',
    'twitter:card', 'summary_large_image',
    'twitter:image', 'http://gg.chendahai.cn/static/image/pkq.jpg'
]
let metaParams = metaArr.toString()
// 需要encode两次 因为浏览器会自动decode一次，另一次是服务端会decode
metaParams = encodeURIComponent(encodeURIComponent(metaParams))
window.open(`https://twitter.com/share?text=${title}&url=http://java.chendahai.cn/share/new?meta=${metaParams}`)
~~~

