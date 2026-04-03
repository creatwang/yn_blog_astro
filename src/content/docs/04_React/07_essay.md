---
title: '07_essay'
---



class 组件的方法，2件事修改数据，this.setState重新调用render函数

this绑定，因为绑定 onClick 的时候 是this.foo 赋值操作，而不是调用 this.foo()

{} 支持放jsx标签数组，所有的标签会自动渲染到dom上, 但是不支持放对象

### 书写规范

1. jsx不能字符串，都需要babel进行转换
2. jsx只能有一个根，vue2 也只能有一个根，vue3可以有多个根
3. 通常使用分组运算符将换行的jsx，当作一个整体
4. 单标签必须使用 `/>` 结尾，例：img 标签，后面要加 /
5. jsx中使用 `{}` 包裹js代码进行执行，注释也是一样 `{/* */}`
6. 在子元素(可以理解为被jsx标签包裹的 `{}` )的 `{}` 中如果存放的是**数组**的话，会将数组元素**全部取出，直接显示**。放的 `jsx` 标签的话也会显示
7. `Number`、`String` 会直接显示
8. `null`、`undefined`、`Boolean` 不会显示内容，必须要转换成字符传显示 `{ture.toString()}`
9. `Object` 不能作为子元素显示
10. `{}` 可以添加表达式

### 属性绑定

1. 属性绑定统一 `{}`，例：`title={}`, 这里不是字符串，
2. `class` 绑定 `{}` + `${}`
3. `style` 绑定，`jsx` 中不支持 `style` 字符串写法，需要使用 `Object` 写法(只是被标签元素包裹的不支持`Object`)



1. 列表渲染map，使用最多的没有之一



### 问题

1. react 响应式原理面试题
2. 不要在原state对象上修改数据，都是这么做的
3. create-react-app 创建的时候不能有大写字母
4. react18 ReactDOM -> react-dom/client,之前的版本 react-dom
5. react 的入口式index.js 文件



组件化开发

1. 继承 React.Component
2. 实现render，唯一必须实现的方法
3. 函数和class 组件使用的时候都要首字母大写



### 声明周期

constructor 创建

render 渲染

组件被挂载dom上componentDidMount

shouldComponentUpdate render前，但是首次渲染的时候不会

getDerivedStateFromProps render之前

~~~typescript
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritesite: "runoob"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritesite: props.favsite };
  }
  render() {
    return (
      <h1>我喜欢的网站是 {this.state.favoritesite}</h1>

    );
  }
}
~~~



getSnapshotBeforeUpdate(prevProps, prevState)，批量同步更新dom前

~~~typescript
 getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "在更新前喜欢的网站是：" + prevState.favoritesite;
  }
~~~



componentDidUpdate 更新后



### 组件通讯

consturctor(props){super(props)} 可以省略

134-138graphql

可以直接在react元素上使用展开运算符

context  provider

contextType

回看async

### 插槽



### css样式

>  在react 中是没有css作用域的，所以在任何地方设置的css，都是全局样式



验证事件总线，不销毁监听的情况下，执行

仅仅在react 事件处理中是异步的

函数组件闭包陷阱

​    this.forceUpdate()

全局的origin

重定向、NavLink、outlet



router5

swich切 route可以单独使用



router6

route只能在routes里面

且不能单独使用，需要Outlet占位

回顾vue model：message

自定义hook，和函数式组件

useState回看



### 项目



### 优化

svg，标签html 的方法

图片导入

是第三方组件库集成，修改第三方样式库

样式混入的继承

怎样最大程度还原ui设计稿

添加shalldowEquals

整理 useRef(0) 的问题



~~~
  function foo(itemRef) {
    itemRef.style.flexShrink = "0"
  }

  return (
    <VipHouseWrapper>
        <HouseAreaHeader title={houseInfo.title} subTitle={houseInfo.subtitle}/>
        <div className="houseSection">
        {
          houseInfo.list.map(val => {
            return (
                <HouseStandardItem ref={foo} key={val.id} houseData = {val} rowNumber={5}/>
            )
          })
        }
        </div>
    </VipHouseWrapper>
  )
})
~~~

json 模块化下可以直接导入不用导出

object-fit：cover

