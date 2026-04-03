---
title: 'TypeScript'
---



# 第一节、TypeScript 介绍

> 任何新技术的出现，都是为了解决原有技术的痛点，<u>`TypeScript`是拥有类型的`JavaScript`超集，它可以编译成普通、干净、完整的`JavaScript`代码。</u>

- 前端领域的快速发展，让 `JavaScript` 迅速被普及和受广大开发者的喜爱，借助于 `JavaScript` 本身的
  强大，也让使用 `JavaScript `开发的人员越来越多。

- 由于**历史的原因** `JavaScript` 还是存在很多的缺点的

  - 已解决的问题，es5之前没有作用域的概念，数组类型并不是连续的内存空间

  - ##### 直到今天，js 还是没有加入类型检测机制



为了弥补`JavaScript`类型约束上的缺陷，增加类型约束，很多公司推出了自己的方案：

- 2014年，Facebook推出了flow来对JavaScript进行类型检查；

- 同年，Microsoft微软也推出了TypeScript1.0 版本；

- 他们都致力于为JavaScript提供类型检查；

  - 而现在，无疑TypeScript已经完全胜出：

- ##### Vue2.x的时候采用的就是flow来做类型检查；

- ##### Vue3.x已经全线转向TypeScript ，98.3%使用TypeScript 进行了重构；

- 而Angular在很早期就使用TypeScript 进行了项目重构并且需要使用TypeScript 来进行开发；

- 而甚至Facebook公司一些自己的产品也在使用TypeScript ；

  - 学习TypeScript 不仅仅可以为我们的代码增加类型约束，而且可以培养我们前端程序员具备类型思维。



## 1、类型带来的问题(面试)

1. 在 `javaScript` 中，**无法在代码编辑期间发现代码的错误**
   - 这样的话只有在代码运行的时候才能发现错误
   - 一个错误产生后，整个项目都**因为一个小小的错误而陷入崩溃；**

2. `javaScript` 对数据类型也是没有限制的
   - 一个形参可以接收不同类型的数据。需要**手动进行类型的判断**，也同样不能根据传入的类型判断潜在的问题
   - 很多错误都是在运行期间才能发现
   - `javaScript` 的语法是很松散的**项目一旦庞大起来**，这种宽松的类型约束会带来非常多的安全隐患

3. 类型思维的缺失(不重要)：从其他方向转到前端的人员，也会因为没有类型约束，而总是担心自己的代码不安全，不够健壮；

4. ##### ts带来的最大的改变就是安全，让代码更加严谨，在大型项目中可以保证代码的开发效率、更加安全严谨的类型验证



## 2、Ts 所解决的问题(面试)

- `TypeScript` 的出现就是为了解决，以上**数据类型的缺失**、**类型校验静态检查**，以及一些扩展语法，**枚举**、**元组**类型，
- 让 `js` 代码更加安全，在编写的时代码时安全的，那么编译(编译成`javaScript`)运行时也一定是安全的



- `JavaScript`所拥有的特性，`TypeScript`全部都是支持的，并且它**紧随`ECMAScript`的标准**，所以ES6、ES7、ES8等新语法标准，它都是支持的



- `TypeScript`在实现新特性的同时，总是保持和ES标准的同步甚至是领先；



- 并且`TypeScript`**最终会被编译成`JavaScript`代码**，所以你并不需要担心它的兼容性问题，**在编译时也不需要借助于`Babel`这样的工具**



## 3、Ts的特点

> Ts>es>js，包含js中的所有类型，在包含这些的基础上，还会有强类型、泛型、接口

1. ##### 始于`JavaScript`，归于`JavaScript`

   - TypeScript可以编译出纯净、 简洁的JavaScript代码，并且可以运行在任何浏览器上、Node.js环境中和任何**支持`ECMAScript 3`（或更高版本）**的JavaScript引擎中；



2. `TypeScript`是一个强大的工具，用于构建大型项目



3. ##### 拥有先进的 JavaScript

   - TypeScript提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如**异步功能**和**`Decorators`**，以帮助**建立健壮的组件**；
   - 这些特性为**高可信应用程序开发时是可用的**，但是会被编译成简洁的ECMAScript3（或更新版本）的 JavaScript；

4. 也会有更好的语法提示



## 4、tsconfig文件

> ts编译器的配置文件，tsc -init创建

~~~json
{
  //指定哪些文件需要编译，有的时候并不是所有的文件都需要编译的
  "include": [
    //两个** 代表的是任意目录，一个*代表的是任意文件
    "./src/**/*"
  ],
  //不需要编译的文件，一般不需要，默认值 node_modules, bower_components, jspm_packages
  "exclude": [],
 // "extends" 相当于引入其他的配置文件，不常用
 //"files": [] 同include 选项一样，不常用
 //编译选项
 "compilerOptions": {
  //指定ts编译为js的版本,ESNext js的最新版本，但仅仅也是一些语法，promise语法没有办法转换，还是需要babals工具
  "target": "ES3",
  //编译js要使用那种模块化的规范
  "module": "ES6",
  // 指定ts要使用的第三方库，用于语法提示, 一般不用动，默认浏览器运行环境，都会有提示
  // "lib": ["DOM", "ES2015"]
  //指定ts编译完生成js文件所在的目录
  "outDir": "./dist",
  //将所有的js文件合并到一个js文件中，有模块化的情况下不能合并，不常用，打包工具用的
  //"outFile": "./dist/app.js"
  //是否将incloud中指定文件夹中的js文件，是否也编译到outDir文件夹中，默认就算有js的时候也不会编译到outdir文件夹中，不常用
  "allowJs": false,
  //检查outdir文件夹中的js是否符合ts语法，默认关闭，不常用
  "checkJs": false,
  //是否将注释编译到js文件中，默认false不移除，需要移除的时候修改ture
  "removeComments": false,
  //不生成编译后面的js文件,默认false
  "noEmit": false,
  //开启下面所有的严格检查,下面的选项全部为true
  //"strict": false,

  //当有错误的时候，不生成js文件，默认false
  "noEmitOnError": false,
  //设置编译后的js文件是否是严格模式，默认false，因为模块化，默认开启严格模式，不常用
  //"alwaysStrict": false,
  //不允许any类型进行类型推断
  "noImplicitAny": false,
  //不允许没有指明类型的this
  "noImplicitThis": false,
  //开启严格检查空值,当一个数据类型有可能为空的时候报错，这个时候可以使用可选链的方式进行判断。默认false
  "strictNullChecks": false

 }
}
~~~





## 5、Ts运行时环境

- 需要使用tsc 进行编译 typeScript-comper

  > 但是每次编写完 ts 代码都需要手动编译为js代码，需要搭建ts运行时环境

  ~~~shell
  npm install typescript -g
  tsc --version
  #生成 tsconfig.json 文件
  tsc --init
  #在存在tsconfing的时候，可以使用该命令监听所有的ts文件
  tsc -w
  ~~~





- **注意(重点)**：ts所有文件默认都是在**同一个作用域下面进行编译**的，添加export 代表当前文件是一个模块，来创建模块作用域



### 使用ts-node

~~~shell
npm install ts-node -g
#会有两个依赖包，@types/node 是在node中运行需要用的
npm install tslib @types/node -g
# 通过ts-node 命令来运行ts代码
ts-node math.ts
~~~



### webpack 配置ts运行时环境

1. 初始化npm init -y
2. 安装 webpack webpack-cli
3. ts-loader、局部的 typescript
4. extensions
5. webpack-dev-server
6. html-webpack-plugin

~~~js
const path = require("path")
const HtmlWepackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/main.ts"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "zhangsan.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".cjs", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/g,
        use: ["ts-loader"],
        //排除需要编译的文件夹
        exclude: /node_module/
      }
    ]
  },
  devServer:{

  },
  plugins: [
    new HtmlWepackPlugin({template: "./index.html"})
  ]
}
~~~





# 第二节、TypeScript 基础语法



## 一、变量的声明

> **重点**：在 `TypeScript` 中定义变量需要指定 ”标识符“ 的类型



### 类型注解

- ##### 小写：需要注意的是， 这里是类型注解-是要小写 `string` ，

- ##### 大写：如果是大写的话，代表的是JavaScript 中的包装类型

- 完整格式

  ~~~js
  var/let/const 标识符: 数据类型(类型注解) = 赋值;

  function foo(argu: string) {
     console.log(argu)
  }
  ~~~

- 不推荐使用 `var` `tslint` 检测ts语法规范
- 这种方式声明的代码会进行类型检测



### 类型推断

> 当没有给变量添加类型注解的时候，会自动进行类型推断

- 在声**明的变量后**直接**给变量赋值** 的时候，会默认会**根据当前值类型**，来给变量添加对应类型，这个过程就是类型 ”推导/推断“ （`infer`）
- 同常可以推导出来类型的变量一般是不加的



## 二、TypeScript 数据类型

> ts 包含了 js 中的所有数据类型

#### 1、三大基本数据类型：

`number` 中声明 16 进制  8 进制 2进制，和 `js` 中的声明方法是一致的，包括 `strinig` 和 `boolean` 类型

~~~typescript
Var num = 0b1001 //二进制
var hexNum2 = 0x1f; //16进制
var num2 = 0o123123 //8进制
~~~



#### 2、`null` 和 `undefined` 类型

> 在 JavaScript 中，null 与 undefined 分别表示“**这里有值，但是个空值**”和“**这里没有值**”。而在 TypeScript 中，null 与 undefined 类型都是**有具体意义的类型**。也就是说，它们作为类型时，表示的是一个有意义的具体类型值。这两者在没有开启 `strictNullChecks` 检查的情况下，会**被视作其他类型的子类型**，比如 string 类型会被认为包含了 null 与 undefined 类型：



- null 的声明

  ~~~typescript
  const nl: null = null
  const name: string = null // 仅在关闭 strictNullChecks 时成立
  ~~~

- `undefined` 的声明

  ~~~typescript
  const nl: undefined = undefined
  const age: number = undefined  // 仅在关闭 strictNullChecks 时成立
  ~~~

- `Symbol` 类型的声明方式不变

  - 要注意的是，在tsconfing中，配置target时要是es6之后的版本，因为之前的版本没有Symbol，所以不能编译，某些时候还是需要babels的

#### 3、`Array` 类型

> 一个数组在 `TypeScript` 开发中存放元素的数据类型最好是**固定的**

- `Ts` 中是需要声明数组中**所存放** ”**元素**“ 的类型的。

- 在 `Ts` 中定义**数组类型**的时候，数组**非基本数据类型**，有**不好区分`Object` 类型**，所以需要使用的 `Array`

- 在 `Ts` 中定义**数组元素类型**

  1. 需要使用**泛型**，来声明，需要注意的是，这样的写法在react 中是有冲突的

     ~~~typescript
     //尖括号会和 jsx 的标签冲突
     const names: Array<string> = []
     ~~~

  2. 简便写法（**推荐写法**）

     ~~~typescript
     const names: string[] = []
     ~~~





#### 4、`Object` 对象类型

> 通常情况下会当 `Object` 类型自动进行推导，或者断言



- 声明对象类型，还需要声明属性的类型这样对于开发者来说代码量会非常的大，因此通常情况下**参与代码逻辑**的情况下的**对象类型的变量**不会主动声明，**会让其自动推导**



- 对象类型，作为**函数参数**的时候，可以进行**主动声明属性类型**





##### 4.1、对象参数-对象变量举例



~~~typescript
//通过大括号表示该变量是对象类型
const obj: {} = {name: "zhangsan"}
//但是并没有表示对象属性的类型,这样的话会在 编写期间报错
console.log(obj.name)

//正确写法
const obj: {name:string} = {name: "zhangsan"}


//同样可以设置默认值，有默认值的情况下会自动认为是可选的
function findPostion( o: {x: string; y:string} = {x: "zhangsan", y: "lisi"} ) {
  console.log(o.x, o.y)
}

/*根据vscode 提示这个 ？ 就是代表可选参数
function findPostion(o?: {
    x: string;
    y: string;
    }): void
*/
findPostion()

//多添加属性也是会报错的，这里的123 会报错
findPostion({x:"1", y:"2", z: "123"})
~~~



##### 4.2、Object|object| {}

1. Object包装类 在ts中为顶级类表现形式为所有类型，可以为**任何值**；

   - **(重点*)不要在ts中使用任何包装类声明对象**，因为是不具体的类型，可以理解为java中的包装类**基本数据类型的引用类型**，String类型可以是null类型，



2. object

   > object 的引入就是为了解决对 Object 类型的错误使用

   - **(重点*)**它代表**所有非原始类型**的类型，即数组、对象与函数类型这些

   - **(重点*) 无法对这个变量进行任何的赋值修改操作的**

   - 用处不大，只是用来接受对象类型的值

     ~~~typescript
     let obj: object = {
         name: "zhangsan"
       }
     // 只能用于重新赋值一个对象
     obj = {}
     console.log(obj);
     ~~~





3. {}：它意味着任何**非 null / undefined 的值**，同object一样，如果接收的是引用类型的话，是无法对这个变量进行任何的赋值修改操作的

   - **同样**要**避免使用`{}`。**`{}`意味着任何非 `null / undefined` 的值，从这个层面上看，使用它和使用 `any` 一样恶劣。



##### 4.3、动态给对象添加属性

~~~typescript
//方法一： 使用索引签名
interface Person {
  [key: string]: any;
  age: number;
  name: string;
  country?: string;
}

const obj: Person = {
  name: 'Tom',
  age: 30,
};

// ⛔️ Error: 类型 'string' 不会分配给类型 'number'.ts(2322)
obj.age = '100';

//方法二
const obj: Record<string, any> = {
  webname: '迹忆客',
};

obj.website = "www.jiyik.com";

obj.author = 'jiyik';
~~~





#### 5、any 类型

> 当**无法确定**变量所需要声明类型的时候，可以声明 `any` 类型，可以**赋值任何类型的值**

- 一般不推荐使用，可以使用`unknown`(个人觉得 ，只要代码规范好都是可以的)

- 同常在**不想给某些** `javaScript` 变量**声明类型**的时候使用
- 因为有可能是 `function` 类型，因此 `any` 类型的变量也是**可以执行的**，但是类型不对运行时是会报错的



#### 6、unknown 3.x 版本推出

- 不确定的类型，和any类型很像

- 这种情况下使用

  ~~~typescript
  function bar() {return "zhangsan"}
  function foo() {return 123}
  const flag: boolean = false
  let result: unknown
  if() {
     result = bar()
  } else {
     result = foo()
  }

  ~~~



- ##### 特点

   1. 可以**接收**任何类型

   2. 赋值的时候，**只能赋值**给原类型，或者`unknown` 和 `any` 类型

      > 防止接收到不同类型的时候，去别的地方**乱用**



#### 7、void类型

> js 中void 后面会跟上一个表达式 void 0 等价于 void(0)  返回一个undefined
>
> Ts里的 void 与 JavaScript 中不同的是用于**描述一个内部没有 return 语句**，或者没有显式 return 一个值的函数的返回值



- 当函数返回一个 undefined 的时候也可以使用 void 表示，因为 `undefined` 和 `void` 都表示了一个没有意义的值

~~~typescript
//当形参没有类型注解的时候，默认类型是any
function sum(num1, num2): void {

}

function func1() {} //返回值类型默认推导为 void
function func2() { //返回值类型默认推导为 void
  return;
}
function func3() { //返回值类型默认推导为 undefined
  return undefined;
}
~~~



#### 8、never 类型：不可能的

> 表示的是一个，永远不可能用到的类型

1、通常是ts自动推断出来的

2、不要用never限制变量没有任何意义

重点：**用来限制函数饭返回值的**

1. 不能顺利的结束调用，例如：抛出错误
2. 死循环

- 举例1：限制变量场景

  > 如果多加了个 boolean 类型，会直接在**编写**时直接报错

  ~~~typescript
  function foo(flag: string | number/*| boolean*/) {
    switch(typeof flag) {
      case "string":
        ///处理
        break;
      case "number":
        //处理
        break
      default:
        //正常情况下，flag 永远不可能进入到当前逻辑
        //当时团队开发的时候，有可能要补充 ”其他case“ 的逻辑代码，又添加了联合类型foo(flag: string | number | boolean)
        //当时光添加类型了，忘记写逻辑了，这个时候就会进入default
        //当执行这行代码的时候会报错，警告开发者没有添加业务逻辑
        const check: never = flag
        break;
    }
  }
  ~~~



- 举例二： 限制返回值场景

  > 一下代码会在未运行时报错，因为有return关键字

  ~~~typescript
  //表示当前函数，永远不可能有返回值，
  function foo(): never {
    return
  }
  ~~~



#### 9、tuple 元组类型

> 在 `ts` 中的声明数组时，需要**规定数组元素类型**，但是某些场景下需要同一个数组内可以存放不同的数据类型，这个时候可以使用元组

- 简单理解：有类型的定长数组

- **作用**：可以让数组中的**每一个元素**都拥有**自己**的**特定的类型**

- **作用2**： 除了**显式地越界**访问，还可能存在**隐式**地越界访问，如通过**解构赋值**的形式：会**提示警告**

  > 对于数组，此时仍然无法检查出是否存在隐式访问，因为类型层面并不知道它到底有多少个元素

- **注意**：有多少个元素，就要设置多少个类型，直接限制了长度，否则在**编写时**会**直接报错**

  ~~~typescript
  const names: [string, number] = ["zhangasn", 123]
  ~~~

- **使用场景**： 例如 `react`  中 `useState()` 函数会返回一个**含**有**不同类型的元素 ”的“ 数组**。

- 也是会进行推导的

- 虽然很少有定长数据的应用场景 但使用元组确实能帮助我们进一步提升**数组结构的严谨性**

- **(重点*)**元组可以**避免索引越界的访问**



##### 9.1.具名元组

> 就是给定长元素添加个名字，考虑到某些拼装对象太麻烦，我们完全可以使用具名元组来做简单替换。

~~~typescript
const bar: [name: string, age: number] = ["zhangsan", 123]
//可选索引
const arr7: [name: string, age: number, male?: boolean] = ['linbudu', 599, true];
~~~



##### 9.2.元素和对象的区别

- 你只能将整个数组/元组标记为只读，而不能像对象那样标记某个属性为只读。
- 一旦被标记为只读，那这个只读数组/元组的类型上，将不再具有 push、pop 等方法（即会修改原数组的方法），因此报错信息也将是**类型 xxx 上不存在属性“push”这种**。这一实现的本质是**只读数组与只读元组的类型实际上变成了 ReadonlyArray，而不再是 Array。**



#### 10、函数类型

##### 10.1、返回类型

- void 返回值为空，调用者也**不应该**依赖于器返回值**进行**任何操作

- 也可以不写void，**因为ts会进行自动推导**

  ~~~typescript
  function foo(): void {}

  const result = foo;
  // 下面这段代码会报错
  // 因为 “调用者也不应该依赖于器返回值**进行**任何操作”
  if(result) {

  }

  ~~~



##### 10.2、参数类型

- **个人习惯**：**参数回调函数**、**上下文**函数、**不写参数类型**
- **自定义**声明**函数**的时候，要添加参数类型，**否则默认是 `any` 类型**



##### 10.3、函数类型

- 声明一个变量是函数类型

~~~typescript
//元组，函数argu 虽然是没有作用的但是不能省略
const arr: [string, (name: string, age: number) => void] = ["zhangsan", function(){}]
~~~

重点：
1、这里有一个注意事项，ts如果**先声明函数类型**返回值为void的时候是**不限制**返回值的，也就是返回什么都行

 虽然可以用，但是调用者**不能使用返回值进行任何操作** 因为标记了void

~~~js
type Foo = () => void;
const foo: Foo = function() {
    // 这样情况下返回什么都可以，是为了保证箭头函数可以正常运行
    return 1
}

const arr = [1, 3, 4]
const arr2 = []
// 这样的话默认返回的是push之后数组的length是number类型，因此不做限制
arr.forEach(val => arr2.push(val))
~~~



2、但是你如果**声明即使用**例如下面就**会限制**返回值

~~~js
//格式 (参数类型) => 返回值
const foo: (argu: number) => void = function() {}
~~~





3. ts 对于**参数函数**的，**参数个数**不进行检测

> 不校验的原因就是开发中，传入参数函数太多了，例如：foEeach 的函数参数，不需要将 val, index, arr 全部写上

- 但是会校验返回值

~~~typescript

type calcType = (arg1: string, arg2: number) => void
function calc(calctype: calcType) {}
//这里传入的参数函数是不进行类型校验的,意思就是函数类型就可以
calc(function() {

})
~~~



##### 10.4、函数的类型签名

> 当我们希望函数拥有自己属性的时候，可以使用类型签名

~~~typescript
interface IBar {
    name: "zhangsan",
    age: 34,
    //参数列表
    (arg: number): number //返回值
}
const bar: IBar = () => {}
bar()
~~~



##### 10.5、函数的构造签名

> 如果直接通过 `new` 函数创建示例的时候，ts是不知道你要创建的是一个什么类型的，需要使用构造签名

- **个人建议**：完全神经病，就**记住一点**需要new 的情况**直接class**，知道有这个东西就行

~~~typescript
class Base {}
interface IBase {
  new(): Base,
  (): void
}

function foo( fn: IBase) {
  return new fn()
}

~~~



##### 10.6、可选类型

> 在对象作为函数对象的时候，需要将属性作为可选类型可以使用 ？来表示，

- **重点**注意：**必**传参数 **不可以** 跟在**可选**参数后面

  > 规范，这样的话会优先赋值可选参数

- **拥有默认值的属性**，默认就是可选类型

- **表示符后面紧跟 `？`**显示表示可选类型，**没有传**的**默认值是 `undefined`** ，可以设置默认值

  ```ts
  const obj: {name: string, addr?: string,} = {
      name: "zhangsan",
     //这个字段可传可不传
     //addr: "天津曲艺协会"
  }
  ```



- 因此，当设置可选类型没有默认值的情况下，**相当于 `“规定类型”|undefined` 类型**的**联合类型**，也可以表示为

  > 这个是**官方文档**中**提**到的，因此不能传入非当前类型**或者 `undefined` 之外**的类型 **例如 null**

  - **注意**：但是不要真写成 `const obj: {addr: string|undefined, name: string}`，这样会强制你传值`undefined`或者`string`，默认值是可以不传的

  ```ts
  //addr 字段可以传undefined
  const obj: {addr?: string, name: string = "zhangsan"} = {
      name: "zhangsan",
     //addr: "undefined"
  }
  ```



- 当形参有默认值的情况下，就不需要使用可选类型了



##### 10.8、函数默认值

> **提示**：函数有默认值的情况，可以不声明类型

~~~typescript
//ts 会进行类型推断， argu2 默认类型就是number 了
function(argu: string, argu2 = 123)
~~~



#### 11、联合类型 Union type

- ##### 举例

  > **既**可以赋值 `string` 类型**也**可以赋值 `number` 类型

- 联合类型需要**进行类型的区分**，否则调用**非共有 `api`** 会进行**报错**， `narrow`: 缩小判断的范围

~~~typescript
const message: string|number = 12
//根据不同的类型进行不同的判断
function foo(argu: string|boolean|number){
  //因此使用联合类型的情况下须小心，如果直接 argu.toFixed(2) 会报错
  //需要进行判断
  switch(typeof argu) {
      case "number":
      argu.toFixed(2)
      break
  }

}
~~~



#### 12、ts中剩余参数使用

~~~typescript
function foo(...argu string[]) {}
function bar(...argu any[]) {}
~~~



## 三、Class类型ts中知识点

1. 属性描述符和操作性修饰符

   1. `public`：开放属性

   2. `private`: 私有属性，只能在当前类中访问 `js 中使用#来修饰`

   3. `protected`：只能在基类和派生类中使用

   4. `readonly` ：（不算 属性描述符）操作性修饰符，和 `interface` 中的 `readonly` 一致



2. `static` 静态描述符

   > 添加到函"数对象"上的方法，`static` 修饰的变量和方法"不会添加到原型"上，**因此**在类的内部静态成员**无法通过 `this` 来访问**，可以在内部通过类名访问



   ~~~typescript
   class Utils {
     public static identifier = "linbudu";

     public static makeUHappy() {
       Utils.studyWithU();
       // ...
     }

     public static studyWithU() { }
   }

   Utils.makeUHappy();
   ~~~



3. `override` 重写

   `TypeScript 4.3` 新增了 `override` 关键字，来确保"派生类"**尝试覆盖**的方法**一定**在"基类"中"存在定义"



4. `setter` 方法**不允许进行返回值的类型标注**，是一个只关注过程的函数。类的方法同样可以进行函数那样的重载，且语法基本一致，这里我们不再赘述。



### 抽象类

> 重点(理解定义，因为这句话也是抽象类的作用)：一个"抽象类"描述了**一个类中 "应当" 有**哪些成员（属性、方法等），一个"抽象方法"描述了**这一方法**在 **"实际实现" 中的 "结构"**。



- 使用 `abstract ` 修饰的类为抽象类
- `js` 中使用的是 `implements` 来实现抽象类的，所有抽象成员都要实现
- 在 `TypeScript` 中**无法声明 "静态" 的抽象成员**。



### 面向对象的 SOLID 原则

## 四、类型断言 as

> ​	`TypeScript` **无法推导**出**具体**的类型信息，这个我们需要使用**类型断言**（Type Assertions ）

- 总结：将一个宽泛，模糊的类型，转换成具体的类型，当ts的类型不符合预期不正确的时候，将其断言为正确的类型



### 双重断言

但是如果在使用类型断言时，原类型与断言类型之间差异过大，也就是指鹿为马太过离谱，离谱到了指鹿为霸王龙的程度，TypeScript 会给你一个类型报错：

```ts
const str: string = "linbudu";

// 从 X 类型 到 Y 类型的断言可能是错误的，blabla
(str as { handler: () => {} }).handler() // 报错
//这样的情况下会提醒你先断言到 unknow 类型，之后在断言的正确的类型
(str as unknown as { handler: () => {} }).handler() // 不报错
```



### 非空断言

> 通常在变量尾部使用！，来表示当前变量是一定有值的，程序在编译期间报错。

- 当在一些参数类型为可选类型的时候，如果不进行传值的，内部在使用七变量属性的时候会根据 `tsconfig.json` 配置文件进行报错，提示逻辑是不严谨的

~~~typescript
function foo(message?: string) :void {
    console.log(message!.length)
}
~~~





### 1、案例说明一 元素

-  `ts` 会根据方法的返回值类型**推导出对应的类型**

- 如果方法默认返回的的 `Element` 类型，并不是某些**具体的**元素类型，这样是无法获取到**具体类型中**所需要的**属性**的

  > 注意：没有具体类型的时候，ts 会在 “编写” 期间报错的

~~~typescript

//1.当获取image元素中src属性，默认推导的 Element 是没有 src 属性的，这个时候就需要类型断言
const el = document.querySelector(".image")

//使用断言之后，就可以获取到具体数据类型中的属性了
// console.log((el as HTMLImageElement).src)

//2. <>的方式进行类型断言，但是react中对 <>的支持并不友好, 泛型的<> 是放在后面的
const imgEl = <HTMLImageElement> el;
imgEl.src


~~~



### 2、案例说明二 class类

> 主要体现了，`ts`中的多态继承

- 当一个`Student` 类型继承了 `Person`类型

- 定义一个函数，函数形参类型是 `Person`，但由于 `Student` 是 `Person`的子类，所以也是 `Presion` 类型

- **注意：**但是当使用形参的 `Person` 类型的变量的时候，是无法获取到子类中的属性和方法的 这个时候也需要断言

  ~~~typescript
  class Person {}

  class Student extends Person {
    foo() {
      console.log("zhangsan")
    }
  }

  function baz(a: Person) {
    //类似于java中的类型强转，通过 as 将 a 变量进行类型转化
    (a as Student).foo()
  }
  ~~~



### 3、案例说明三 基本类型

- 将 `string` 类型转化 成 `number` 类型，不推荐

~~~typescript
//先转化为 any 或者 unknown 类型，在转化成number类型
const firend: string = "zhangsan"
const num: number = (firend as any) as number
~~~

- 只是打印的类型变了，本质上还是原有类型不能赋值





## 五、类型安全(作用不打，快速回顾的时候可以)



### 2、字面量类型

> 官方文档名称是，字面量推理

- 在 `js` 中字面量也可以作为类型，但是字面量类型一定要和值保持一致。

  1. 使用 **`let` 声明**的变量在**没**有明确指定类型的情况下会**自动推导类型**
  2. 使用 **`const` 声明** 的变量在**没**有明确指定类型的情况下会**值**当作**字面量类型**

  ~~~typescript
  //类型是 zhangsan 类型，因为是const 常量本身就不允许修改其他值
  const message = "zhangsan"
  //类型是 string 类型
  let msg = "lisi";
  ~~~



- **“字面量类型”** 要和 **“联合类型”** 在一起使用，才会更具有意义——用于限制只能输入的值

  ~~~typescript
  //限制该类型只能输入 “get” 和 “post”
  const method: "get"|"post" = "post"
  ~~~



- 也会**结合断言**进行使用

  ~~~typescript
  type mm = "get"|"post"

  function foo(parm: {url:string, method: "get"|"post"}) {
    console.log(parm.url, parm.method)
  }
  //参数类型解决方案一
       const temp: {url:string, method:mm} = {
         url: "/home",
         method: "post"
       }

  //方案二 使用断言，具体下属性的类型，可以使用 type 防止重复的声明类型
      const temp = {
        url: "/home",
        method: "post" as mm
      }

  ~~~



- ##### 字面量推理 `as const`（重要，也是官网的示例）

  ~~~typescript
  //参数类型解决方案三。在确定输入的没有问题的使用，
  //可以使用 断言 as const，这个也是官网提到的方法,可以进行内部推导,这个方法叫做字面量推理
  const temp = {
    url: "/home",
    method: "post" as "get"|"post"
  } as const

  foo(temp)
  ~~~



### 3、类型缩小

> 也称之为类型保护，也算是一种类型校验

- 简单说就是确定在某一个类型里

#### 3.1、typeof类型缩小

> 当某系业务逻辑存在联合类型的时候，而不同的数据类型会存在不同的内置方法这个时候，就需要进行类型保护防止意外的发生。



- `js` 中的 `typeof` 判断null 返回的是 `object` 判断 `NaN` 的时候 返回的是number



- `ts` 中的 `typeof` 返回的是一个 `TypeScript` 类型：



~~~typescript
type Str = typeof str; // "linbudu"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean
~~~





~~~typescript
function prinId(id: string | number) {
  if(typeof id === "string") {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}
~~~



#### 3.2、平等缩小-用于字面量类型

> 平等缩小一般用于字面量类型，进行判断

~~~typescript

type position = "left"|"center"|"right"

function prinMessage(argu: position): void {
  //由于 argu 类型为 position 所有只会有固定的值
  switch(argu) {
    case "left":
      console.log("张三")
  }

  if(argu === "center") {
    console.log("lisi")
  }
}
~~~



#### 3.3、基于 in 与 instanceof 的类型缩小

> 通常用于自定义class

- `instanceof` 判断构造函数的 `prototype` 属性的是否存在当前对象的原型链当中

  ~~~typescript
  class Student {
    action() {
      console.log("开始执行")
    }
  }

  class Product {
    exe() {
      console.log("这里是产品")
    }
  }

  function foo( temp: Student| Product) : void {
    if(temp instanceof Student) {
      temp.action
    }
  }
  ~~~





- `in` 用于判断当前 **属性”`string` 类型“** 是否出现在目标对象的原型链中

  > 通常用于 **自定义类型**，或者确定某一个实例对象中是否包含该方法

  ~~~typescript

  type Cart = {
    runing: () => void
  }
  type Dog = {
    eating: () => void
  }

  function bar(argu: Cart | Dog):void {
    if("runing" in argu) {
      argu.runing()
    }
  }
  ~~~



## 六、Ts中的 this 的使用

- **注意**：`this`参数通常声明在**第一位**

~~~typescript
//如果函数是有外部作用域提供的，哪么ts 就不会自动推导出 this 的类型，需要使用参数的方式进行声明
//注意：this参数通常声明在第一位
function eating(this: {name: string}, message: string) {
  console.log(this.name+"=>开始吃饭", message)
}

const obj = {
  name: "zhangsan",
  eating: eating
}

obj.eating("haokaixin ")
~~~





## 七、类型守卫 is

> 问题：在ts进行 “类型控制流分析” (及类型推导)的时候，在某个**节点**使用了**函数判断类型**之后返回`boolean`，会产生**断流**。这种情况`ts`**无法自动推导**出后面的类型



问题描述

~~~typescript
function isString(input: unknown): boolean {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    //这里判断正确了的话，说明input是string类型，就可以调用replace方法，但是由于断流了，ts自动推导不出来就会在编译期间”报错“表示不存在这个方法
    (input).replace("linbudu", "linbudu599")
  }
  if (typeof input === 'number') { }
}
~~~



使用类型守卫 is 关键字

`isString` 函数称为类型守卫，在它的返回值中，我们**不再使用** `boolean` 作为类型标注，而是**使用** `input is string` 这么个奇怪的搭配，拆开来看它是这样的：

- input 函数的某个参数；
- `is string`，即 **is 关键字 + 预期类型**，即如果这个函数成功返回为 `true`，那么 `is` 关键字前这个入参的类型，就会**被这个类型守卫调用方后续的类型控制流分析收集到**。

需要注意的是，类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查：（就是不会检查你是什么类型，你只是手动推导了一下，联合类型还是要自己判断）

~~~typescript
function isString(input: unknown): input is string {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 正确了
    (input).replace("linbudu", "linbudu599")
  }
  if (typeof input === 'number') { }
  // ...
}
~~~



**从这个角度来看，其实类型守卫有些类似于类型断言，但类型守卫更宽容，也更信任你一些。你指定什么类型，它就是什么类型。** 除了使用简单的原始类型以外，我们还可以在类型守卫中使用对象类型、联合类型等，比如下面我开发时常用的两个守卫：

要注意的是这里类型守卫，**返回的是联合类型**

~~~typescript
export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean' , 'undefined'].includes(typeof val);

~~~

除了使用 `typeof` 以外，我们还可以使用许多类似的方式来进行类型保护，只要它能够在联合类型的类型成员中起到**筛选作用**。





## 八、Ts高级



### 1、ts中的面向对象

- 封装

- 继承

  继承是多态的前提，父类作为参数类型的时候

  我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式

  父类引用指向子类对象，相同引用表现出来的方法形态是不一样的

- 多态

  > 多动态的表现，继承，抽象类，接口



### 2、函数的重载

> 重载：函数名相同，返回值和参数不同，就是函数的重载

1. 在 `ts` 中函数的重载和 **声明** 和 **执行**体 是分开的，因此**重载函数是没有执行体的**

2. ts 函数重载中，重载函数的**实现函数**是**不能直接调用**的

3. 这里有一个需要注意的地方，拥有多个重载声明的函数在被调用时，是按照重载**的声明顺序往下查找**的。

   > `TypeScript` 中的重载更像是**伪重载**

- **重点注意**：由于重载函数**共用同一个执行体**以及代码，因此，执行体中还是需要进行**手动进行类型判断**来**针对不同数据类型执行不同的逻辑**

  > 个人觉的：不是为了封装库更好的调用或者有强迫症，一般简单逻辑不会用，如果**联合类型能更好的替代重载，直接使用联合类型即可**，联合类型实现代码量小实现简单

- 实现函数最好使用 `any` 类型，使用联合类型的话容易报错



~~~typescript
//重载函数不能有执行体
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;

//实现函数不能单独调用，由于类型的原因，实现函数要是一个宽泛的类型

function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number

~~~



### 3、类成员修饰符

> 在 `TypeScript` 中，类的属性和方法支持三种修饰符： `public`、`private`、`protected`

- `public` **默认修饰**的是在任何地方可见、公有的属性或方法，默认编写的属性就是 `public` 的；

- `private` 修饰的是仅在**同类中可见**、私有的属性或方法；

  > es13 中使用的私有属性常采用的是 **#修饰符**，来确定一个属性是否是私有的

- `protected` 修饰的是仅在**类**自身及**子类**中可见、受保护的属性或方法；

- `readonly`：不希望外界可以任意的修改，只希望确定值后直接使用，那么可以使用`readonly`：

  > 同其他修饰符使用方法一致，对象属性可以修改，但是不能直接替换该对象。

- `static`：静态修饰符，该修饰符会将一个属性当作**类级别的属性**，可以通过class 直接获取，`js`中使用#

  > 加载也是类级别的，在js中 `class` 相当于是一个函数，`static` 修饰的属性会直接**添加到当前函数对象上**，而**非**添加到 `prototype` 对象上

- `ts` 中的访问器依然是 `get` 和 `set`，**与js中的访问器一致**

  > 个人理解，根据以上的一些修饰符，实现的更像java 中类的定义了



### 4、抽象类

> **作用**：让代码更加的**严谨**，所有**继承抽象类的子类一定有共同抽象方法的实现**

-  抽象类是使用`abstract`声明的类，**不能被实例化**，只能被继承
- 抽象类的子类**必须**要**实现父类**的全部**抽象方法**
- 抽象类中既可以存在，方法的抽象，也可以存在方法的实现
- 有抽象方法的类，就是抽象类
- 属性可以是抽象的

~~~typescript
abstract class Share {
    abstract sayHello():void
}
~~~



### 5、接口

**特点**：

1. 接口也可以继承接口的支持**多继承**的，既可以**限制变量类型**也可以**限制类**
2. 会自动合并，一般用于扩展第三方库

**作用**：**type 是用于做类型声明**的，但是 interface 更像是**限制类的格式规定有哪些属性和方法**，更专注对象和类的结构

**使用场景**：Api接口响应格式，描述数据模型，配置对象



- 接口中的方法全部都是抽象方法

- **提示**：接口的声明方式和 `class` 一致

- 可调用接口：定义函数类型

  ~~~typescript
  //使用接口定义函数类型，接口定义函数类型一定要有大括号的，阅读性不是很好可以使用 type 声明
  interface funcType {
    //参数类型string，返回值类型number
    (argu: string): number
  }
  //所用argu 是可调用的
  function foo(argu: funcType) {
      argu()
  }
  ~~~



- 索引类型- key-value 类型

  > interface 和 type 都可以限定对象中 key-value 的类型，有的时候会将index 保存为key。

  - 记住关键字 index 和 name，存索引用index，key-value用name

  ~~~typescript
  //用于限定索引-值类型
  type indexType = {
    [index: number]: string
  }

  // 限定对象中的key，要是一个可以转换为number类型的值
  const arr: indexType = {
    "123": "zhangsan",
    34: "lisi"
  }
  console.log(arr)


  //用于限定对象key-value 的类型
  interface objType {
    [name: string]: string
  }

  const obj: objType = {
    "name": "lisi"
  }
  console.log(obj)
  ~~~





#### 5.1、接口多继承

- 接口中**只做类型声明不做实现**
- 接口可以实现**多继承**，其子类**必**须要**实现父类**的**所有方法声明**

~~~typescript
interface Ainmal {
  getBaseInfo: () => void
}

interface Person {
  learn: () => void
}

class Dog implements Ainmal ,Person {
  getBaseInfo() {

  }

  learn() {

  }
}
~~~



#### 5.2、交叉类型

概念：**交叉类型是通过使用 “&” 符号来表示的。它表示一个新类型，该类型包含了多个类型的特性，即所有类型的并集**。例如，类型 A & B 表示一个包含类型 A 和类型 B 特性的新类型。



- 由于接口的多继承，重分体现了 `js` 的多态，使同一个实例具有多种不同的类型。这个时候可以使用**交叉类型**，这中类型的作用主要就体现在多继承中
- 即是 `Ainmal` 类型 也是 `Person` 类型

~~~typescript
interface Ainmal {
  getBaseInfo: () => void
}

interface Person {
  learn: () => void
}

type interType = Ainmal & Person
~~~



#### 5.4、字面量赋值freshness擦除操作

> 接口定义的类型，**接收对象引用赋值**的时候，会有一个**`freshness`类型擦除**的特性

~~~typescript
interface infoType {
  name: string,
  address: string,
  age: number
}

const info = {
  name: "zhangsan",
  age: 56,
  address: "天津曲艺协会",
  //进行赋值的时候，会将这个类型检测进行擦除
  friend: "lisi"
}

//只是类型检测的时候会被擦除不报错，不会擦除该属性
const infos: infoType = info

printInfo({
  name: "zhangsan",
  age: 56,
  address: "天津曲艺协会",
  //直接传对象多余的属性在类型检测的时候会报错
 // friend: "lisi"
})

//传变量赋值的时候可以进行擦除
printInfo(info)

function printInfo(argu: infoType) {
  console.log(argu.address)
  //但是这里不能获取friend 属性，类型检测过不去
  //console.log(argu.friend)
}
~~~



### 6、类型别名 type alias

> 在某些情况下一定要给对象属性设置类型，例如形参对象，如果多个方法都是同一个形参对象会增加代码的冗余

- `Ts` 提供了类型别名，可以统一声明一个对象类型进行使用，不支持继承和自动合并，更专注类型
- 使用 `type` 关键字进行声明

~~~typescript
//声明参数变量的联合类型，方便复用
type unionType = string | number | boolean
//统一声明对象类型
type ObjType = {name: string, age: number, address: string}

//直接使用声明好的类型
function foo(o: ObjType) {}
~~~



#### 6.1、type 与 interface

> 我也知道，很多同学更喜欢用 type（Type Alias，类型别名）来代替接口结构描述对象，而我更推荐的方式是，interface 用来描述**对象、类的结构**，而类型别名用来**将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型**。但大部分场景下接口结构都可以被类型别名所取代，因此，只要你觉得统一使用类型别名让你觉得更整齐，也没什么问题。



1. 区别一: type类型使用范围更广, **接口类型只能用来描述对象、类** 的数据结构

2. `interface`  用来描述**对象、类的结构**，而类型别名用来**将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型**。

3. `ts` 中 **`type` 类型不可以重复**，ts**允许定义多个相同名称的`interface`**

   > 如果存在**相同名称**的 `interface` 的时候，回将**多个 `interface` 中**的属性声明**进行合并**

4. `interface` **支持继承**的，`interface` 可以**被类实现**

- 总结: 如果是**非对象**类型的定义使用`type`, 如果是**对象**类型的声明那么使用`interface`

- 使用场景

  > 在ts中要想将一个属性添加到 `windows` 对象当中去可以**利用**这个**合并的特点**

  ~~~typescript
  //windows对象 继承与Windows 接口，这样就相当于将 age 属性合并到 Windows 接口里
  //windows 作为子类，是需要实现接口中的属性和方法的
  interface Windows {
  	age: string
  }

  windows.age = "5t"
  ~~~




####

### 7、枚举类型enum

> 优势：可读性强，枚举类型是为数不多的TypeScript特性有的特性之一

- 枚举允许开发者定义一组**命名常量**，常量可以是**数字**、**字符串**类型

- 使用方式同接口 interface 和 class 使用方式一致

- 枚举类型定义的时候是**名称常量**

  > 当以**数组的方式**获取的时候是 **string 字符串**类型
  > 是key **对象的方式**获取enum 的时候返回的**是number类型**

  ~~~typescript
  export {}
  enum Direction {
    //可以自定义修改值，一般不会自动修改
    LEFT = 100,
    RIGHT,
    TOP,
    BOTTOM
  }

  //默认打印格式，当以数组的方式获取的时候是 string 字符串类型
  //是key 对象的方式获取enum 的时候返回的是number类型
  {
    '0': 'LEFT',
    '1': 'RIGHT',
    '2': 'TOP',
    '3': 'BOTTOM',
    LEFT: 0,
    RIGHT: 1,
    TOP: 2,
    BOTTOM: 3
  }

  console.log(Direction[0])
  trunDirection(Direction.LEFT)
  function trunDirection(dir: Direction) {

    switch(dir) {
      case Direction.LEFT:
         //因此这里打印的是 number
        console.log(typeof dir)
    }

  }
  ~~~







## 九、泛型

> 将类型参数化，由调用者决定要使用什么样的类型

- 软件工程的主要目的是构建不仅仅**明确和一致的API**，还要让你的代码具有**很强的可重用性**：
-  虽然`any`是可以的，但是定义为`any`的时候，我们其实已经**丢失了类型信息**



泛型：实现类型参数化(默认类型)

- 函数和`class`(因为`class`的就是通过函数来实现)，在使用泛型的时候**参数类型**可以**进行自动的类型推导**

  > <u>类型别名中**显式传入**，或者函数中**隐式提取**</u>

- 但是**接口** 声明类型的时候 不能进行类型推导

- 泛型常见的声明变量

  > T：Type的缩写，类型
  > K、V：key和value的缩写，键值对
  > E：Element的缩写，元素
  > O：Object的缩写，对象

- 设置默认类型

  ~~~typescript
  type Rep<T = any> = {
    code: any
    data: T
  }
  ~~~




### 1、索引类型

> 包含三个部分：**索引签名类型**、**索引类型查询**与**索引类型访问**。

1. `interface TestType {[key:string]:string}`: 这里的  `[key:string]` 就是**索引签名类型**

   - 索引签名类型**只允许 `string | number | symbol` 的要求**。

2.  `keyof` 操作符 用于做索引类型查询的，这个操作符会将接口中**所有**的`key`转换成**包含所有字面量类型**的**联合类型**

3. 索引类型访问，其实是通过字面量类型获取的，会将接口中的`key`，**转换**成字面量类型以对象的语法获取

   > 访问就是为了组装其他类型

   - 存在索引签名类型的话 `TestType[string]`，可以使用**原始类型访问**
   - 不存在的话**字面量类型访问** `TestType[name]`
   - 数字索引会默认转成字符串获取，所以 `[key:string]:string` 的key可以是数字类型|`Symbol`



索引签名类型的一个常见场景是在重构 JavaScript 代码时，为内部属性较多的对象声明一个 `any` 的索引签名类型，以此来暂时支持**对类型未明确属性的访问**，并在后续一点点补全类型：

~~~typescript
interface AnyTypeHere {
  [key: string]: any;
}

const foo: AnyTypeHere['linbudu'] = 'any value';
~~~



#### 映射类型

> 映射类型指的是类型工具，索引类型的**最佳拍档(主要场景)**之一就是映射类型。

只有 `K in ` 属于映射类型的语法。

~~~typescript
//将传入对象类型中的 “成员类型” 全部映射成string类型
type Stringify<T> = {
	//便利 keyof T 联合类型，映射到key
    [K in keyof T]: string;
};
~~~





### 2、类型约束

同时也代表**类型的兼容性**

> 可以使用泛型的约束，来决定传入的类型 **必须** 包含的 “子类型”
>
> 1、字面量类型、为基本数据类型的子类型
>
> 2、符合联合类型中的类型，为联合类型的子类型
>
> 作用：1、用于限制类型 2、用于条件类型的判断



案例一：使用此方法来限制泛型传入的类型

- ~~~typescript
  interface ILength {
    length: number
  }

  function getLength<T extends ILength>(arg: T) {
    return arg.length
  }

  getLength("abc")
  getLength(["abc", "cba"])
  getLength({length: 100})
  ~~~

- `keyof`  修饰符的使用

  > `keyof` 是将目标对象中的所有**属性【注意：这里是属性并不是属性的类型，相当于是一个字面量的联合类型	】**取出来组成一个联合类型

  ~~~typescript
  //表示的意思就是，O 传入的泛型要是K类型中的属性的其中一种
  function foo<K, O extends keyof K>() {}
  //映射类型
  type Maptype<T> = {
  //这里相当于遍历 keyof T 字面量联合类型，依次赋值给porperty
  [porperty in keyof T]: T[porperty]
  }

  ~~~



- **老师的理解**：案例二：泛型只能够传入 number 类型和 string 类型的写法

  > 为什么要用 extends 而不用联合类型，因为**泛型中的联合类型**会变为**分发类型-（相关分布式条件类型）**

  ~~~typescript
  function sum<T extends number | string>

  // 分发类型number[]|string[] 而不是 (number|string)[]
  type NumAndStrArray = toArray<number|string>
  ~~~








#### 2.1、默认约束

- 默认约束的类型： `TS 3.9` 版本以前是 `any`，而在 **3.9** 版本以后则为 `unknown`



~~~typescript
type zhangType<K extend number = 1200>
~~~





### 3、函数泛型

- 可以通过**继承的方法**，来进行**类型约束**

~~~typescript
  //函数泛型不能设置默认值，只能继承某一个类型才能够使用对应的属性和方法
  function foo<T extends string, T2 extends number>(name:T, age: T2) {
    console.log(name.length, age.toFixed)
  }
  //这里可以不用声明泛型，且如果传入非继承的数据类型，会进行报错
  foo("zhangsan", 134)
~~~



### 4、class 泛型

> class 使用泛型的创建对象的时候，可以同函数一样进行类型推导

~~~typescript
class Point<T> {
  x: T
  y: T
  z: T

  constructor(x: T, y: T, z: T) {
    this.x = x
    this.y = y
    this.z = y
  }
}

const p1 = new Point("1.33.2", "2.22.3", "4.22.1")
const p2 = new Point<string>("1.33.2", "2.22.3", "4.22.1")
const p3: Point<string> = new Point("1.33.2", "2.22.3", "4.22.1")

const names1: string[] = ["abc", "cba", "nba"]
const names2: Array<string> = ["abc", "cba", "nba"] // 不推荐(react jsx <>)
~~~



### 5、接口泛型

> 在使用接口做类型声明的时候，不会进行类型的自动推导，一定要给泛型声明一个类型

- 接口支持给泛型添加一个**默认类型**

~~~typescript
//要么给泛型添加一个默认类型
 interface IPerson<T1 = string, T2 = number> {
    name: T1
    age: T2
  }
//要摸IPerson<string, number> 使用的时候声明类型
  const p: IPerson = {
    name: "why",
    age: 18
  }
~~~



### 6、工具类型

- 注意：都是对于类型的操作，返回的都是type，不是interface

- `Partial`

  > 可以将类型映射为相同类型，之后可以通过Required改为可选类型。

  ~~~typescript
  interface Zhangsan {
      name: string,
      age: number,
      address: string
  }
  type Zhangsan2 = Partial<Zhangsan>

  type Partial<T> = {
      [P in keyof T]?: T[P];
  };

  //其实 Partial 也可以使用 +? 来显式的表示添加可选标记：
  type Partial<T> = {
      [P in keyof T]+?: T[P];
  };
  ~~~



- `Required`

  ~~~typescript
  // IKun都变成必填的
  type IKun2 = Required<IKun>


  type Required<T> = {
      [P in keyof T]-?: T[P];
  };

  ~~~



- `Omit<Type, Keys>`: 过滤一些属性

  > 会过滤掉name和age类型

  ~~~typescript
  interface Zhangsan {
      name: string,
      age: number,
      address: string
  }
  type ikun = Omit(Zhangsan,"name|age")
  ~~~



- `Readonly` 只读类型工具，也同样可以使用 `+` 显示标记

~~~typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
type Readonly<T> = {
    +readonly [P in keyof T]: T[P];
};

//取消所有必选
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
~~~



- `Pick<Type, Keys>`：选择属性

  > 和上面一对，可多选

  ~~~typescript
  type ikun = Pick(Zhangsan,"name|age")
  ~~~



- `ReturnType<Type>` 和 `Awaited`

  > 传入一个含有Type函数会返回其返回值类型类型，可用于函数组件，

  ~~~typescript
  const foo = ref<ReturnType<typeof Foo>>()
  ~~~

  > 由于 `async` 函数本质上总是返回一个 `Promise`，`ReturnType` 会如实反映这一点。如果你只想要 `Promise` 里面的那个对象类型（例如用于定义变量或函数参数），你需要配合 TypeScript 的 **`Awaited`** 工具类型使用：

  ~~~typescript
  // 结果是 { id: number; name: string }
  type DataType = Awaited<ReturnType<typeof fetchData>>;

  // 这样你就可以直接定义变量了
  const user: DataType = {
    id: 2,
    name: "Bob"
  };
  ~~~



- `instanceType<Type>`

  > 用于获取某实例的类型进行声明

  ~~~typescript
  //这样 formRef 的类型 就等于 ElForm的类型
  const formRef = ref<InstanceType<typeof ElForm>>()
  ~~~



- `Record`

  > 用于**声明一组具有相同类型**的记录

  ~~~typescript
   type Record<K extends keyof any, T> = {
      [P in K]: T;
  };

  const obj: Record<string, string|number> = {};
   obj.name = "zhangsan";
   obj.age = 123
  ~~~



### 7、infer

> `infer` 是推断的意思，用于**提取**条件类型中的类型

- `infer` 只能在条件类型中使用

~~~typescript
// infer R 中 R 就表示 待推断的类型，这样即可提取到返回值类型 R

type FunctionReturnType<T extends Func> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;


type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]
~~~



- `infer` 结构还可以是 `Promise` 结构

~~~typescript
type PromiseValue<T> = T extends Promise<infer V> ? V : T;

type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取


~~~



- 当 `Promise` 发生嵌套的时候 又会出现这样的问题

~~~typescript
type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>>; // Promise<boolean>，只提取了一层
~~~



-  当类型要嵌套多层的时候  `infer` 也支持**递归操作**

~~~typescript
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
~~~



### 8、rest操作符

我们可以使用 `rest` 操作符来处理任意长度的情况



~~~typescript
// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;

~~~



### 9、分发式条件类型



#### 9.1、联合类型

定义：**也称条件类型的分布式特性**，只不过是条件类型在 **“满足一定情况”** 下会执行的逻辑而已。

- 分发式条件类型起作用的**条件**

1. **参数为联合类型**
2. 是否通过泛型**参数传入**，而**不能**直接进行（就是在参数中）**条件类型判断**
3. **泛型参数是否被数组包裹**了，条件类型中的泛型参数不能被包裹。



特性：对于属于**裸类型参数**的检查类型，条件类型会在**实例化**时期自动**分发**到联合类型上。

> 裸类型：泛型参数是否完全裸露，是否被一些数组，约束，交叉类型包裹

- 因为有的时候，并不是只会通过裸露泛型参数，来**确保分布式特性能够发生**。在某些情况下，我们也会需要**包裹泛型参数**来**禁用掉分布式特性**

~~~typescript
//是用交叉类型来阻止
export type NoDistribute<T> = T & {};

type Wrapped<T> = NoDistribute<T> extends boolean ? "Y" : "N";

type Res1 = Wrapped<number | boolean>; // "N"
type Res2 = Wrapped<true | false>; // "Y"
type Res3 = Wrapped<true | false | 599>; // "N"

//使用数组包裹
type CompareUnion<T, U> = [T] extends [U] ? true : false;

type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false
~~~



理解：分发式条件类型想当于传入 `number` 先进行了一个判断，之后是 `boolean` 又进行了判断，最后返回它们两个的结果

~~~typescript
type Naked<T> = T extends boolean ? "Y" : "N";

type Res3 = Naked<number | boolean>;
// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// "N" | "Y"
~~~



总结：

1、之所以使用 `extends` 不使用联合类型的原因，就是要**针对**分发式条件类型的场景，来决定使用那个

> 有的时候使用 `extends` 不使用联合类型，也是为了禁用掉分布式的特性

2、 之所以分布式条件类型要这么设计，我个人理解主要是为了**处理联合类型这种情况**，轻易地**进行集合之间的运算**，比如交集。

~~~typescript
type Intersection<A, B> = A extends B ? A : never;

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3

~~~





#### 9.2、any 和 never

问题

1. 当 `never` 当作泛型的时候，进行条件判断时，会返回 `never`

~~~typescript
type Special3 = never extends never ? 1 : 2; // 1

//只有 never 做为参数时会发生
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never
~~~



2. 当 any 直接作为判断参数或泛型判断参数时，会返回结果的联合类型

~~~typescript
// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2;  // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2
~~~





>  当我们想判断一个类型是否为 `never` 时，也可以通过上面所说的类似的手段。
>
> 例：数组包裹

~~~
type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<"linbudu">; // false
~~~



原因：其实**并不是**因为分发式条件类型。

我们此前在类型层级中了解过，当条件类型的判断参数为 any，会直接返回条件类型两个结果的联合类型。而在这里其实类似，当通过泛型传入的参数为 never，则会直接返回 never。



## 十、ts模块化和命名空间

`TypeScript`支持两种方式来控制我们的作用域：

- 模块化：每个文件可以是一个独立的模块，支持`ES Module`，也支持`CommonJS`；

- 命名空间：通过namespace来声明一个命名空间

  > 命名控件的出现要早于 es module，现在都使用 es module
  >
  > 命名空间在 TypeScript 早期时，称之为内部模块，主要目的是将一个模块内部再进行作用域的划分，防止一些命名冲突的问题。

~~~typescript
//支持命名控件导出
export namespace time {
  //所有对外使用的 方法需要导出才能使用
  export function format(time: string) {
    return "2222-02-22"
  }

  export function foo() {

  }

  export let name: string = "abc"
}

export namespace price {
  export function format(price: number) {
    return "99.99"
  }
}

time.foo()
~~~



## 十一、ts的类型声明

> `typescript` 中的类型，几乎都是我们自己编写的，但是我们也有用到一些其他的类型，例如`document.getElementById("image")  as HTMLImageElement`

- js不能定义类型，声明文件的所用就是**给js里的代码**做类型声明

- 这些类型的声明都来自 **`.d.ts` 类型声明文件**，用来做类型的声明(`declare`)。 它**仅仅用来做类型检测**

- 那么 `typescript` 会在哪里查找我们的类型声明呢？

-  注意：声明文件是不会转换成js的，所以声明文件是不用赋值的





### 1、内置类型声明

> 内置类型声明是**`typescript`自带**的、帮助我们内置了 <u>`JavaScript `运行时的一些标准化API的声明文件；</u>

- 包括比如`Math`、`Date`等内置类型，也包括`DOM API`，比如`Window`、`Document`等；
  - 内置类型声明通常在我们**安装typescript的环境中会带有**的；
- https://github.com/microsoft/TypeScript/tree/main/lib



### 2、外部定义类型声明

> 外部类型声明通常是我们**使用一些 js 库**（比如第三方库）时，需要的一些类型声明。
>

- 方式一：在自己库中进行类型声明（编写.d.ts文件），比如axios
- 方式二：通过社区的一个公有库DefinitelyTyped存放类型声明文件
  - 该库的GitHub地址：https://github.com/DefinitelyTyped/DefinitelyTyped/
  - **该库查找声明安装方式的地址**：https://www.typescriptlang.org/dt/search?search=
  - 比如我们使用安装react的时候，就是没有提供类型声明的，可以手动下载对应的类型声明文件： `npm i @types/react --save-dev`



### 3、自定义声明文件

> 可以使用 declare 关键字自定义进行类型的声明

- 自定义的声明文件在根路径下，tsc 会自动扫描读取.d.ts文件

- 情况一：我们使用的第三方库是一个纯的 `JavaScript` 库，而 `typescriptlang` **中也没有对应的声明文件；**比如 `lodash`， 这个时候就需要手动声明一些 .d.ts 文件
- 情况二：我们给自己的代码中声明一些类型，方便在其他地方直接进行使用；



~~~typescript
//声明模块
declare module "lodash" {
  //模块中所包含的方法,之做类型声明
  export function join(any: any[]) :void;
}

//声明变量
declare const wName: string
declare let wAge: number;
declare let wHeight: number
//声明函数
declare function wFoo(): void
declare function wBar(): void

//声明类
declare class Person {

  name: string
  age: number
  constructor(name: string, age: number)

}

//文件声明
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.png"
declare module "*.svg"
declare module "*.gif"

declare module "*.vue"{}
//当使用jquery 的时候
// 声明命名空间
declare namespace $ {
  export function ajax(settings: any): any
}


~~~





ts中类的自定义属性一定要有初始值，或者使用可选参数或者构造器

只读属性只能载构造器中进行修改，但是只读属性是对象的话，只要不是整个替换就可以修改对象中的属性

相当于const obj = {name: "zhangsan"} ; obj.name = "lisi"





测试函数返回自动推导



tsconfing 给 tsc编译整个ts文件的时候给它一些对应的配置





## 十二、装饰器

> 简单记：装饰器本质就是函数，只能用于class，用于装饰类成员(理解：对类成员添加额外的功能)

- 参数：所有的装饰器都又两个参数
  1. 参数一：代表装饰的类成员 `value`
  2. 参数二：类成员的上下文对象 `context`
- 执行时机：`class` 类在**“执行” 前**会 **先** 执行装饰器 **且** 会自动传入参数，
- 返回值：**所有**装饰器的**返回值如果是Function**都会**替换**原有的类成员和类



总结：相比使用**子类改变父**类，装饰器更加简洁优雅，缺点是**不**那么直观，功能也受到一些**限制**。所以，装饰器一般只用来**为类添加某种特定行为**。



### context对象

（1）`kind`：永远是字符串，类成员的名字

- `class`、`method`、`getter`、`setter`、`field`、`accessor`
- 这表示一共有六种类型的装饰器。



（2）`name`：`string | symbol` 类型，所装饰对象的名字，比如类名、属性名等。

（3）`addInitializer()`：

- 函数，用来添加类的初始化逻辑。以前，这些逻辑通常放在构造函数里面，对方法进行初始化，现在改成以函数形式传入`addInitializer()`方法。

- 注意，`addInitializer()`没有返回值。

（4）`private`：布尔值，表示所装饰的对象是否为类的私有成员。

（5）`static`：布尔值，表示所装饰的对象是否为类的静态成员。

（6）`access`：一个对象，包含了某个值的 get 和 set 方法。



### 类装饰器









# 第三节、ts常见报错

1. 由于所有的ts都运行在同一个作用域的下面，通过模块化的方式来区分自己的作用域

   > 在定义 const name: string； 的时候会提示报错，原因就是在编译器中main文件里也有name变量，因此不能重复声明，
   >
   > 解决引入模块化

2. 生成tsconfig文件的时候，报错的原因，由于是新创建的项目，项目里面没有ts文件，所以报错

   > 随便添加一个ts文件

3. tsc -w 编译所有的ts文件报错，原因是没有jsconfig文件，添加即可





## 重点：新鲜的

> ts 只会在 “初次赋值” 的时候，会进行类型检测，**初次赋值**的时候会认为你是**新鲜的**
>
> 2023-11-10 补充，现在好像都会去检测了

例：

~~~typescript

type pType = {
    name: string
    age: number
    address: string
}

const p = {
    name1: "zhangsna",
    address2: "天津曲艺协会",
    age3: 23
}
//由于不是初次赋值，这里ts不会进行校验的
const obj: pType = p

//初次赋值，会被认为是新鲜的，就会被检测
const obj: pType = {
    name1: "zhangsna",
    address2: "天津曲艺协会",
    age3: 23
}
~~~



## TS优化

> 导致ts慢的原因是，类型检测慢，这一样方面可以交给开发工具和 `eslint` 进行检测



索引签名

