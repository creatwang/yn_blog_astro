---
title: 'Flutter Started'
---

1. code 插件 code runner、dart、flutter



4、

| **响应式框架** | responsive_framework      | 自动处理断点，支持 UI 等比缩放或重排。         |
| -------------- | ------------------------- | ---------------------------------------------- |
| **自适应导航** | flutter_adaptive_scaffold | 官方出品，快速实现手机/平板/桌面三端导航切换。 |



# 第一章、flutter 渲染机制

> 这“三棵树”协同工作的机制是其性能强大的核心原因。到 2026 年，虽然底层的渲染引擎演进到了 **Impeller**，但其三树联动逻辑依然遵循以下经典架构



## 1.1、三棵树的角色定位

| 树的名称              | 官方名称          | 俗称 / 比喻             | 核心职责                                                     |
| :-------------------- | :---------------- | :---------------------- | :----------------------------------------------------------- |
| **Widget Tree**       | Widget Tree       | **配置树(层)** / 说明书 | **只读的轻量快照**。定义 UI 的结构、配置和参数（如：颜色、文字内容）。它是不可变的（Immutable），销毁和创建成本极低。 |
| **Element Tree**      | Element Tree      | **管理树(层)** / 粘合剂 | **逻辑节点**。负责维护 Widget 和 RenderObject 之间的引用，管理状态（State）的生命周期。它是 Widget 实例化后的体现。 |
| **RenderObject Tree** | RenderObject Tree | **渲染树(层)** / 施工队 | **实际绘制节点**。负责具体的布局（Layout）计算、尺寸测量（Size）和绘制（Paint）。它是最重的一个对象。 |

Element Tree 会记录一些位置的引用，不会重新创建会修改应用指向最新的快照，会通过widget tree的改变，来知道是否有新的配置可用，可用的话会传递给

render对象，这样就会重新渲染

build方法执行只代表 widget 这部分快照被重建了

## 1.2、运行机制与时机（生命周期）

这三棵树并不是同时瞬间生成的，而是通过一个**深度优先遍历**的过程逐一挂载：

### 1.2.1、第一阶段：初始化（挂载）

1. **Widget 生成**：当你调用 `runApp(MyApp())` 时，Flutter 首先根据你的代码构建 `Widget Tree`。
2. **Element 挂载**：Flutter 调用 Widget 的 `createElement()` 方法，在 `Element Tree` 中创建一个对应的 Element 节点。
3. **RenderObject 生成**：Element 挂载后，会调用 Widget 的 `createRenderObject()` 方法，在 `RenderObject Tree` 中生成对应的节点。
   - <span style="color: red">注意：并不是所有的 Widget 都会生成 RenderObject（例如 `StatelessWidget` 无状态组件只是配置组合），只有继承自 `RenderObjectWidget` 的组件才会生成物理渲染节点。</span>



非渲染型 Widget (如 `StatelessWidget`, `StatefulWidget`)

这类 Widget 就像是一个**“包装盒”**或者**“组合指令”**。

- **它们渲染成什么？** 它们在 `RenderObject Tree` 中**完全没有对应节点**。
- **它们的作用：** 它们唯一的任务就是通过 `build()` 方法返回**另一个（或一组）Widget**。
- **运行逻辑：**
  1. `StatelessWidget` 会生成一个 `ComponentElement`。
  2. 这个 Element 的工作是：调用你的 `build` 方法，拿到里面的子 Widget。
  3. 它不停地往下拆解，直到遇到一个真正的 `RenderObjectWidget` 为止。
- 渲染型 Widget (如 `SizedBox`, `Column`, `Stack`, `Padding`)

这些 Widget 继承自 `RenderObjectWidget`（例如 `LeafRenderObjectWidget` 或 `SingleChildRenderObjectWidget`）。

- **它们渲染成什么？** 它们会创建真正的 `RenderObject` 节点（如 `RenderBox`）。
- **它们的作用：** 它们负责实际的尺寸计算、布局、偏移和在屏幕上涂色。



**三棵树的实际映射关系：**

| **Widget Tree** (逻辑结构)  | **Element Tree** (管理结构) | **RenderObject Tree** (渲染实体) |
| :-------------------------- | :-------------------------- | :------------------------------- |
| `MyContainer` (组合)        | `ComponentElement`          | *(无对应节点，塌陷)*             |
| `Padding` (渲染)            | `RenderObjectElement`       | **`RenderPadding`**              |
| `Text` (组合/代理)          | `StatelessElement`          | *(无对应节点，塌陷)*             |
| `RichText` (Text内部的渲染) | `RenderObjectElement`       | **`RenderParagraph`**            |

**结果：** 在最终的渲染树里，`RenderPadding` 的直接子节点就是 `RenderParagraph`。`MyContainer` 和 `Text` 就像消失了一样，它们只存在于“图纸”和“管理层”中。

------



### 1.2.2、第二阶段：更新（Diff 算法）

这是 Flutter 性能优化的精髓。当你调用 `setState()` 时：

1. **标记为 Dirty**：对应的 Element 会被标记为“脏”。
2. **触发 Rebuild**：在下一帧刷新时，Flutter 重新运行 Widget 的 `build` 方法，生成一颗**新的 Widget Tree**。
3. **核心对比（The Diff）**：
   - Flutter 将**新的 Widget** 与 **旧的 Element** 指向的旧 Widget 进行对比。
   - **判断条件**：如果 `runtimeType` 和 `key` 都相同，Element 就不动，只是更新它内部的引用，并通知 `RenderObject` 修改属性（如颜色变了）。
   - **结果**：这样做避免了重新创建昂贵的 `RenderObject`，只需修改其属性，从而实现极速刷新。

------

3. 运行流程图解

假设你有一个简单的结构：`Container -> Text`

1. **Widget Tree**: `Container` 对象 -> `Text` 对象（这只是两块描述性的内存数据）。
2. **Element Tree**: `StatelessElement` -> `ComponentElement`（它们持有对 Widget 的引用，**“地理坐标”：定位自己在树中的位置**）。
3. **RenderObject Tree**: `RenderPadding` -> `RenderParagraph`（这里存着具体的像素坐标、字体度量数据，是真正干活的地方）。

------

为什么需要三棵树？（2026 年的视角）

如果只有一棵树，每次改一个字都要重新计算整个页面的布局和绘制，手机会非常烫。

- **Widget 层**解决了“**方便开发**”的问题：开发者只需声明 UI 长什么样，不需要手动操作 DOM。
- **Element 层**解决了“**效率**”的问题：它像一个缓存层，通过对比（Diff）找出最小变动范围，决定哪些需要重绘，哪些可以复用。
- **RenderObject **层解决了“**性能**”的问题：它通过局部布局（Relayout Boundary）和局部重绘（Repaint Boundary），确保只有发生变化的区域才消耗 GPU 资源。

总结

- **Widget** 是你写的**源代码**。
- **Element** 是 Flutter 的**运行上下文**。
- **RenderObject** 是屏幕上**显示的像素**。

你可以把 `Widget` 想象成房屋的设计图纸（可以随手画几十张），`Element` 是现场的项目经理，而 `RenderObject` 就是那座真实的房子。改图纸很快，但拆了房子重盖很慢，所以经理（Element）会尽量根据新图纸只改动房子里的零件，而不是重建。

### 1.2.3、深度优先的“边拆边建”流程

当你启动应用时，流程是这样的：

1. **第一步：** 拿到根 Widget（比如 `MyApp`）。
2. **第二步：** 立即为 `MyApp` 创建对应的 **Element**，并将其挂载（Mount）到树上。
3. **第三步：** 立即运行该 Element 的 `build()` 方法。这个方法会返回其**直接子 Widget**。
4. **第四步：** 拿到子 Widget 后，立即为它创建 **Element**…、
5. **循环往复：** 如此递归下去，直到遇到叶子节点（也就是没有子组件的节点）



## 1.3、flutter生命周期

initState(): widget重建时不会执行，因为是分开独立管理的，只会在初始化state的时候执行

> 通常用于发送网络请求

didUpdateWidget(): setState 当改状态所属的空间更新是会执行执行之后会在执行build

build(); setState  会重新构建build；

dispose(): ifelse 导致控件移除销毁的时候State 对象移除会调用，重新创建控件替换的这种不算



**deactivate()**: 当 State 对象从树中被暂时移除时调用（例如在 Navigator 跳转时）Tab 切换、使用 GlobalKey 移动组件

~~~dart
void deactivate() {
  // 此时组件已断开链接，但尚未销毁
  print('--- 链接已断开 (deactivate) ---');
  super.deactivate();
}

@override
void activate() {
  super.activate();
  // 此时组件重新回到了树中
  print('--- 重新建立链接 (activate) ---');
}
~~~



**didChangeDependencies()**: 当 State 对象的依赖（如 `InheritedWidget` 或 `Theme`）发生变化时调用。它在 `initState` 之后也会立即调用一次。

当你的组件通过 `context` 获取了某个父级节点的数据，而这个父级节点具备“向下广播”数据的能力时，你的组件就与它建立了**依赖关系**。



💡 特别提醒：如果是指“页面切换”

如果你是因为 **Navigator 页面跳转** 导致的“断开”和“重连”（比如从购物车返回商品页），`deactivate/activate` 可能不会如你预期般触发，因为页面栈的逻辑更复杂。

这种情况下，你需要使用 **`RouteObserver`** 来判断：

- **didPushNext**：当你跳到下一个页面（当前页面“断开”）。
- **didPopNext**：当用户从下个页面返回（当前页面“重连”）。





# 第二章、flutter基础语法



## 1、dart基础数据类型

1. 数字 (Numbers)

Dart 提供了三种处理数值的类型：

- **`int`**：整数值，通常为 64 位（取决于平台）。
- **`double`**：64 位双精度浮点数。
- **`num`**：`int` 和 `double` 的父类。当一个变量既可以是整数又可以是浮点数时使用。
- 字符串 (Strings)

- **`String`**：UTF-16 编码的字符序列。可以使用单引号或双引号定义，支持插值表达式 `${expression}`。
- 布尔值 (Booleans)

- **`bool`**：仅有两个对象，即布尔字面量 `true` 和 `false`。
- 集合 (Collections)

Dart 内置了强大的集合支持：

- **`List`**：有序的项目集合（类似于数组）。
- **`Set`**：无序且元素唯一的集合。
- **`Map`**：键值对映射集合。
- 记录 (Record)

- **`Record`**：在 Dart 3.0 引入，允许将多个值组合成一个单一对象，类似于匿名结构体。例如：`(String, int) record = ('A', 1);`。
- 其他核心类型

- **`Runes`**（及其替代方案）：用于表示字符串中的 Unicode 字符点。
- **`Symbol`**：用于表示在 Dart 程序中声明的运算符或标识符。
- **`Null`**：表示空值的类型，只有一个值 `null`。
- **`dynamic`**：显式告知编译器关闭静态类型检查（慎用）。
- **`void`**：通常用于表示函数不返回任何值。
- 特殊底层类型

- **`Object`**：除 `Null` 外所有 Dart 类的基类。
- **`Never`**：表示表达式永远无法成功完成评估（通常用于总是抛出异常的函数）。

**注意：** 在 Dart 中，一切皆为对象（包括数字和函数），所有类型都直接或间接继承自 `Object`。随着 2026 年 Dart 宏（Macros）等特性的成熟，类型系统在静态元编程方面得到了进一步增强。



## 2、map

> dart中的map　value 没有静态检查

在 `Map<String, dynamic>` 中，虽然键（Key）是确定的，但值（Value）通常被声明为 `dynamic`。

- 所以当你从 Map 中取出值时，Dart 编译器并不知道它具体是什么类型。
- 你必须手动进行类型转换（如 `as String`），或者在运行时承担崩溃的风险。编译器无法在**编译阶段**提醒你“这里应该是数字而不是字符串”。

~~~dart
// 动态的
Map<String, dynamic> userJson = {
  "id": 101,            // int
  "name": "张三",       // String
  "isVIP": true,        // bool
  "tags": ["A", "B"]    // List
};

// var声明 var是自动推断类型，这样的推断相当于 Map<String, dynamic> 或者Map<String, Object?>
var data = {"id": "101", "name": null};

Map<int, String> numMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
};
print(numMap);
numMap.remove(1);
print(numMap);

---->[控制台输出]----
{0: zero, 1: one, 2: two}
{0: zero, 2: two}


Map<int, String> numMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
};
numMap[3] = 'three';
numMap[4] = 'four';
print(numMap);

---->[控制台输出]----
{0: zero, 1: one, 2: two, 3: three, 4: four}


Map<int, String> numMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
};
numMap.forEach((key, value) {
  print("${key} = $value");
});

---->[控制台输出]----
0 = zero
1 = one
2 = two

~~~



## 3、Record

4.1、性能与内存优势

- **Map**：是一个复杂的哈希表结构，在内存中比较重，查找 Key 需要计算哈希值。
- **Record**：在底层接近于一组局部变量，**内存占用极低，访问速度极快**，没有哈希查找的过程。

4.2、自动实现“值相等”

如果你有两个 `Map`，即便内容一样，它们也不一定相等。但 Record 默认就实现了内容比较，但仅仅是 基本数据类型

~~~dart
var r1 = (a: 1, b: 2);
var r2 = (a: 1, b: 2);
print(r1 == r2); // 输出 true！

~~~



### 1. 它是如何工作的？

`record` 是一种**匿名、不可变、聚合**的类型。

- **`(String, int)`**：这是**类型声明**，表示这个变量必须包含一个字符串和一个整数。
- **`('A', 1)`**：这是**赋值**，它按照顺序将值组合在一起。
- 核心特性

- **固定长度**：一旦定义，不能添加或删除字段。
- **类型安全**：它不像 `List` 只能存同一种类型，也不像 `Map` 失去了静态类型检查。它明确知道第一个是 `String`，第二个是 `int`。
- **值相等性**：如果两个 Record 的内容完全一样，它们就是相等的（不需要重写 `==` 和 `hashCode`）。
- 如何取值？

Record 使用 **`.$索引`** 的方式来访问（索引从 1 开始）：

dart

```dart
var record = ('A', 1);
print(record.$1); // 输出 'A'
print(record.$2); // 输出 1
```

请谨慎使用此类代码。



### 2.为什么需要它？(最实用的场景)

在没有 Record 之前，如果你的函数想返回两个值（比如用户姓名和年龄），你得定义个类或者返回一个 `Map`。现在你可以直接写：

dart

```dart
// 函数定义：返回一个包含姓名和年龄的记录
(String, int) getUserInfo() {
  return ("张三", 25);
}

void main() {
  // 调用并使用结构赋值（Destructuring）
  var (name, age) = getUserInfo();
  print("姓名: $name, 年龄: $age");
}
```

请谨慎使用此类代码。



### 3.进阶：命名命名字段

你还可以给记录里的字段起名字，这样代码可读性更强：

dart

```dart
// 定义带名字的记录
({String name, int age}) userInfo = (name: "张三", age: 25);

print(userInfo.name); // 直接通过名字访问，不再用 $1
```

请谨慎使用此类代码。



总结

`(String, int)` 就像是一个**轻量级的临时小容器**。它比类更轻（不用写那么多代码），比 `List` 更强（可以存不同类型且类型安全），是 2026 年处理多值传递的首选方案。



### 4.深度对比：Map vs Record

| 特性         | Map (运行时)                   | Record (静态/2026主流)           |
| :----------- | :----------------------------- | :------------------------------- |
| **定义**     | `Map<String, dynamic>`         | `({String name, int age})`       |
| **访问成员** | `user["name"]` (可能返回 null) | `user.name` (必定存在且类型正确) |
| **拼写检查** | **无**（写错 key 运行才知）    | **有**（写错属性名编译报错）     |
| **类型保障** | **弱**（需要频繁 `as` 强转）   | **强**（编译器严格锁定类型）     |
| **性能**     | 略慢（需要哈希查找）           | 极快（类似于局部变量）           |



## 4、空安全 ！

Dart 是一个空安全的语言，也就是说，你无法将一个非空类型对象值设为 null :

~~~dart
void main() {
    int a = null//这个是不行的
    int? a = null // 这样可以
}

void payWay(string? name) {
    // 或者这样
}
~~~



## 5、只允许在当前文件下访问

要在class 、变量等命名的时候前面加_下划线



# 第三章、修饰符

> 注意这里是修改符，并不是声明变量的关键词，如果没有主动设置变量类型会进行自动推导，但是它是用来修饰变量的

## 1、编译时常量const



> 在 Dart 中，`const` 和 `final` 都用于定义**不可变**的变量，一旦赋值就不能再修改。但在 2026 年的现代 Dart 开发中，它们的区别主要体现在**赋值时机**和**内存表现**上。

- **`const` (编译时常量)**：它的值必须在**编译阶段**就能确定。这就意味着你只能用字面量（如 `123`, `"hello"`）或其他 `const` 变量给它赋值。不能用函数返回值

- **`const`**：在内存中是**单例**的。如果代码中出现了多次相同的 `const` 对象，Dart 编译只会创建一个内存实例，并进行复用。这对于优化 Flutter 渲染性能至关重要（例如 `const Text('Hello')`）。

- **`final` (运行时常量)**：：常用于定义类中的属性。你可以在构造函数中初始化，它每次初始化都会分配新的内存空间（除非是基本值类型）。

  > 它的值可以在**程序运行时**初始化确定。你可以用函数返回值、网络请求结果或用户输入给它赋值。

- **`const` 字段**：**不能"直接"定义在类中**，除非它同时被声明为 `static`。

  > 因为class中的是变量，我发在编译期间确定值

- **`final` 集合**：变量本身的引用不能改，但**集合内部的内容是可以修改的**（除非集合本身也是不可变的）。

- **`const` 集合**：整个集合及其内部元素都是绝对不可变的。深度不可变性 (Deep Immutability)

- 在 Flutter/Dart 开发中，遵循 **"Const First"** 原则：**能用 `const` 的地方永远优先使用 `const`**，因为它能显著提升应用的运行效率和减少内存开销。如果值只有在运行时才能拿到，再使用 `final`。

- StatefulWidget 也可以使用const canonical

~~~dart
class TestPage extends StatelessWidget {
  const TestPage({super.key});
  @override
  Widget build(BuildContext context) {
      /*
        对象本身几乎没区别，但变量语义有区别。
        c1（const 变量）
        编译期常量绑定
        不能重新赋值
        c2（var 变量，初始值是 const 对象）
        当前先指向同一个 const 对象
        但后面可以重新赋值到别的对象
        所以：
        在“当前这两行刚声明后”，identical(c1, c2) 通常是 true
        但从语言语义上它们不是一回事：c2 是可变引用，c1 不是。
      */
      // 保证参数值是一样的，不变的，不能是变量
    const c1 = Textwrapper(text: 'Apple');
    var c2 = const Textwrapper(text: 'Apple');
    print('Textwrapper identical = ${identical(c1, c2)}'); //out true

  }
}

class Textwrapper extends StatelessWidget {
  final String text;
    // 这里的const 只是语法，不然实例化的时候不能用const
  const Textwrapper({required this.text,super.key});
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(text),
    );
  }
}

~~~





## 2、运行时常量 final

在类（Class）中声明 `final` 变量时，Dart 并不强制要求你立刻给它赋值。它只要求：**在对象创建完成（即构造函数运行结束）之前，该变量必须被初始化且只能被赋值一次。**



~~~dart
class A {
  final String name;
  final int age;

  // 正确：先声明字段，再使用 this 语法糖赋值,这里等同于初始化列表，本质上就是初始化列表的自动化缩写。
  A(this.name, this.age);
}
~~~





## 3、var

## 1、自动类型推断var

~~~dart
var name = "张三"; // Dart 自动推断 name 是 String 类型
var age = 25;     // Dart 自动推断 age 是 int 类型
var data = {"id": 1}; // Dart 自动推断 data 是 Map<String, int> 类型
var data = {"id": 1, 'name': null}; // Dart 自动推断 data 是 Map<String, dynamic> 类型
~~~



### 1.1、关键特性：它是“强类型”的

很多人误以为 `var` 像 JavaScript 那样可以随便改变类型，但在 Dart 中，**一旦推断出类型，就不能再更改**。



###  1.2、与 `dynamic` 的区别

这是初学者最容易混淆的地方：

- **`var`**：类型是**固定的**。编译器在编译时就帮你填好了类型，运行速度快，安全。
- **`dynamic`**：类型是**动态的**。变量可以在运行期间从 `int` 变成 `String`。它会跳过类型检查，风险较高。



### 1.3、 什么时候用 `var`？

在 2026 年的 Dart 开发规范中，推荐做法是：

- *个人觉得就是用来**快速接收变量**使用的

- **在局部变量（函数内部）使用 `var`**：让代码更简洁。
  - *推荐：* `var user = User();`
  - *不推荐：* `User user = User();` (类型写了两遍，冗余)
- **在类的成员变量（Field）中建议显式声明类型**：这样看类定义时一眼就能知道属性是什么类型。

~~~dart
class MyApp {
  // 这里不能自动推断的可以手动声明
  final int age;
  // 这里有默认值可以自动推断的就使用var
  var name = 'zhagnsan';
   MyApp(this.age) {

   }
}
~~~





### 1.4、如果不立即赋值会怎样？

如果你声明 `var` 但没有初始化，它的类型会变成 `dynamic`：

~~~dart
var temp; // 类型被推断为 dynamic
temp = 1;
temp = "hello"; // 不会报错
~~~



**注意：** 为了代码安全，应尽量避免这种写法，最好在声明时就初始化。

总结

`var` 就像是一个**懒人工具**，它告诉编译器：“你这么聪明，看我右边写的是什么，你自己把左边的类型填上吧！”它既保持了代码的简洁，又没有牺牲 Dart 作为强类型语言的安全性。



# 第四章、flutter Class

```dart
class foo {
    int _internal = 0;
    // 这里前面的下划线代表私有的
}
```



## 1、构造函数

- 普通构造函数
- 命名构造函数
- 工厂构造函数



###  1.1、初始化列表 (Initializer List)

它是构造函数中一个非常特殊且强大的区域，执行时机处于**“对象刚分配内存”之后**，但**“构造函数体** `{}` **运行”之前**。

以下是这种写法的核心含义：

1. 为什么用冒号 `:` 而不是写在大括号里？

如果你在类中定义了 **`final`** 变量（比如 `createdAt`），它们必须在对象创建完成前就被赋值。

- **大括号 `{}` 内部**：属于“赋值”阶段。对于 `final` 变量来说，到这一步已经太晚了（`final` 必须在“初始化”阶段完成）。
- **初始化列表 `:`**：属于“初始化”阶段。这是给 `final` 变量赋值的**唯一合法位置**（除了直接在声明处赋值）。

- 这里举例子用的是命名构造函数，普通的构造函数也可以，但是**工厂构造函数不行**

~~~dart
class ApiService {
  final String url;
  final DateTime createdAt;
  final String status;

  // 使用逗号分隔多个初始化项,
  ApiService._private(this.url)
      : createdAt = DateTime.now(),
        status = 'loading',
        assert(url.isNotEmpty) {  // 也可以包含断言
        print("所有 final 字段已就绪");
      }
}
~~~

**一句话理解冒号 `:` 的存在：**
它是 Dart 为 `final` 变量设置的“最后通牒区”——在对象内存完全锁死之前，你有最后一次机会通过冒号后的代码把值填进去。

至于为什么不在初始化的时候在赋值，是因为final定义的变量要接收变量，或者创建对象前要赋值

断言

断言既可以在初始化列表中使用也可以在函数体中使用，区别就是对象有没有出现在内存中，通常除了在初始化列表中要断言计算后的值，其他断言基本可以放在初始化列表

~~~dart
//这样也可以只不过是多算了一遍表达式
Score(List<int> points)
  : total = points.reduce((a, b) => a + b),
    assert(points.reduce((a, b) => a + b) <= 100); // 只能重算一遍表达式
~~~



#### 重点来了

在 Dart 中，**`this.name`（Initializing Formals）的执行时机等同于初始化列表**。

~~~dart
class A {
  final String name;
  final int age;

  // 正确：先声明字段，再使用 this 语法糖赋值
  A(this.name, this.age);
}
~~~



### 1.1.1、初始化为什么不在定义的时候赋值？

虽然你可以在定义时直接赋值（如 `final String status = 'active';`），但在实际开发中，有以下三个理由让你“不得不”在构造函数中赋值：

1. **依赖外部传入的数据**：很多 `final` 变量的值取决于你创建对象时传入的参数（例如 `url`）。定义时你并不知道用户会传什么。

2. **计算逻辑**：有些值需要根据传入的参数计算出来。

   dart

   ```dart
   final String domain;
   // 定义时无法赋值，因为需要解析传入的 url
   ApiService(String url) : domain = Uri.parse(url).host;
   ```

   请谨慎使用此类代码。



3. **节省内存/延迟创建**：如果在定义时赋值，那么每个实例的初始值都是一样的。通过构造函数赋值，可以让每个对象拥有自己独特的、不可变的“基因”。



## 2、工厂函数factory

| 特点          | 普通函数 (Regular Function)  | 工厂函数 (Factory Method)      |
| :------------ | :--------------------------- | :----------------------------- |
| **核心职责**  | 执行任务、处理数据、改变状态 | **生产并返回实例对象**         |
| **命名契约**  | 通常是动词（`run`, `print`） | 通常含 `create`, `from`, `get` |
| **对类依赖**  | 处理一段逻辑返回想要的数据   | 返回的组件对象                 |
| **2026 实践** | 解决局部的小逻辑             | 负责模块间的解耦和对象初始化   |



### 问题

- 工厂函数能做的普通函数也能做，工厂函数做不了的普通函数也能做，我为什么要用工厂函数

> 那就是说普通实例工厂函数和普通实例函数在特性和特点上**没有任何区别**，唯一的区别就是语义的区别，不考虑语义规范，实际上普通函数可以完全替代工厂函数



但是其实是一种编程哲学，主要区别在语义上

语义上的“防呆设计”（降低认知负担）

在大型项目中，代码的可读性高于一切，防止你的代码在快速迭代中不至于变成一团乱麻。

- **普通函数**：如果你看到一个函数叫 `processUser()`，你不知道它是修改了用户数据，还是删除了用户，还是返回了一个新用户。
- **工厂函数**：如果你看到 `User.fromJSON()` 或 `createUser()`，你的大脑会自动切换到“造物模式”。你明确知道：**调用它一定会得到一个对象，且不会对现有数据产生副作用。**
- **结论**：工厂函数建立了一种**标准协议**，让成千上万行代码的意图变得一眼可见。
- 只有工厂函数能实现的“无感解耦”





## 3、工厂构造函数

> `factory`（工厂构造函数）的核心作用是**打破了“构造函数必须创建新对象”的限制**。

作用：

1. **数据清洗与逻辑前置**

| 特性            | 普通构造函数           | 工厂构造函数 (`factory`)                      |
| :-------------- | :--------------------- | :-------------------------------------------- |
| **关键字**      | 无                     | 必须使用 `factory`                            |
| **内存表现**    | **必定**产生新内存地址 | **不一定**，可以复用旧地址                    |
| **return 语句** | **禁止**写 return      | **必须**写 return                             |
| **this 访问**   | 可以访问 `this`        | **禁止**访问 `this`（因为对象可能还没造出来） |
| **子类化**      | 只能产出本类           | 可以产出本类或任意子类                        |



### 3.1、实现单例模式

- 这里是主要作用返回缓存对象，应为普通的构造函数不能return

~~~dart
class ApiService {
  final String url;

  // 1. 定义一个私有的静态变量，用来在内存中缓存唯一的实例
  static ApiService? _instance;

  // 2. 这是你提到的命名构造函数（负责真正的内存分配和初始化）
  // 开头的下划线 "_" 确保了外部文件无法直接通过 ApiService._private() 来创建对象
  ApiService._private(this.url) {
    print("【底层逻辑】正在为 ApiService 分配内存，并初始化 URL: $url");
  }

  // 3. 工厂构造函数：它是外部访问的唯一入口
  // 它的逻辑是：如果缓存里有，就给旧的；没有，才调用上面的 _private 构造器造个新的
  factory ApiService() {
    if (_instance == null) {
      print("【工厂逻辑】内存中未发现实例，准备调用私有构造器...");
      // 调用上面的命名构造函数
      _instance = ApiService._private("https://api.example.com");
    } else {
      print("【工厂逻辑】内存中已存在实例，直接返回旧对象。");
    }
    return _instance!;
  }

  void getData() {
    print("正在通过 $url 请求数据...");
  }
}

void main() {
  print("--- 第一次调用 ApiService() ---");
  var service1 = ApiService();
  service1.getData();

  print("\n--- 第二次调用 ApiService() ---");
  var service2 = ApiService();
  service2.getData();

  // 验证内存地址
  print("\nservice1 和 service2 是否为同一个对象: ${identical(service1, service2)}");
}
~~~



### 3.2、返回子类实例



```dart
abstract class Logger {
  // 工厂构造函数：根据参数决定生产哪种具体的 Logger
  factory Logger(String mode) {
    if (mode == 'dev') {
      return ConsoleLogger(); // 返回子类实例 A
    } else {
      return ServerLogger();  // 返回子类实例 B
    }
  }

  void log(String message);
}
```



### 3.4、数据清洗与逻辑前置

~~~dart
class User {
  final int id;
  final String name;

  User._internal(this.id, this.name);

  // 工厂构造函数：在真正调用 _internal 生产对象前，先“洗”一遍数据
  factory User.fromJson(Map<String, dynamic> json) {
    // 1. 数据清洗：强制转换类型（防止后端乱传 String 类型的 id）
    final rawId = json['id'];
    int id = rawId is String ? int.parse(rawId) : (rawId as int);

    // 2. 逻辑前置：数据补全
    String name = json['name'] ?? "匿名用户";

    // 3. 逻辑拦截：如果 id 不合法，可以抛出异常或返回特定对象
    if (id < 0) {
      throw Exception("非法的用户 ID");
    }

    // 4. 全部清洗完毕，交给真正的构造函数
    return User._internal(id, name);
  }
}

void main() {
  var data = {"id": "101", "name": null};
  var user = User.fromJson(data);
  print("清洗后的数据: ID=${user.id}, Name=${user.name}"); // ID=101, Name=匿名用户
}

~~~



**一句话总结：**
普通构造函数是**死**的（只能创建新对象因为不能return）；工厂构造函数是**活**的（它可以根据内存情况、传入参数，决定是给你一个旧的、一个新的、还是给一个子类的对象）。



## 4、StatefulWidget 和 StatelessWidget



### 4.1、为什么build 会放到state中

当某些情况下会导致组件重新实例化

1. **依赖的“环境上下文”发生变化**

- **屏幕旋转/尺寸改变**：使用了 `MediaQuery.of(context)`。
- **主题切换**：使用了 `Theme.of(context)`。
- **多语言切换**：使用了 `Localizations.of(context)`。
- **系统字体缩放**：用户在系统设置里调大了字体。

2. ** 路由管理与页面切换**

- **模态框/弹窗**
- 页面返回



## 4、父子组件通信

### 4.1，父组件获取子组件state调用

~~~dart
import 'package:flutter/material.dart';

// 子组件
class ChildWidget extends StatefulWidget {
  ChildWidget({Key? key}) : super(key: key);

  @override
  ChildState createState() => ChildState();
}

class ChildState extends State<ChildWidget> {
  String _message = "等待中...";

  void updateText(String text) {
    setState(() => _message = text);
  }

  @override
  Widget build(BuildContext context) => Text("子组件状态: $_message");
}

// 父组件
class ParentWithKey extends StatelessWidget {
  // 定义一个 GlobalKey，泛型指定为子组件的 State 类
  final GlobalKey<ChildState> _childKey = GlobalKey<ChildState>();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ChildWidget(key: _childKey), // 将 Key 传给子组件
        ElevatedButton(
          onPressed: () => _childKey.currentState?.updateText("来自父组件的操作"),
          child: Text("点击改变子组件"),
        ),
      ],
    );
  }
}

~~~



### 4.2、`of` 静态方法获取 State

这种方式遵循 Flutter 惯例（如 `Theme.of`），用于**子组件主动获取父组件**的状态。



~~~dart
import 'package:flutter/material.dart';

// 父组件
class ParentWidget extends StatefulWidget {
  @override
  ParentState createState() => ParentState();

  // 惯用的 static of 方法
  static ParentState? of(BuildContext context) {
      // 这里为什那么向上查找因为因为上下文是当前调用的上下文
    return context.findAncestorStateOfType<ParentState>();
  }
}

class ParentState extends State<ParentWidget> {
  int count = 0;

  void increment() => setState(() => count++);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("父组件计数: $count"),
        Divider(),
        ChildWidget(), // 正常的后代组件
      ],
    );
  }
}

// 子组件
class ChildWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        // 通过 ParentWidget.of 向上寻找 State
        final parentState = ParentWidget.of(context);
        parentState?.increment();
      },
      child: Text("让父组件自增"),
    );
  }
}

~~~





**注意这样方式会有有获取不到的可能性**

1. **不在同一个 Element Tree 分支上**：
   这是最常见的原因。`context` 是 Element Tree 中的一个位置。如果你通过 `Overlay`（例如 `showDialog`、`showModalBottomSheet`）弹出子组件，这些弹窗实际上被挂载到了顶级 `Navigator` 的 `Overlay` 中，它们在树中的位置与原父组件是**并列**的，而不是其后代，因此无法向上搜寻到父 State。
2. **泛型匹配失败**：
   Flutter 严格匹配泛型类型。如果你在调用时写错了 State 的类名，或者由于 **Package 导入路径不一致**（例如一个用 `package:my_app/main.dart` 导入，另一个用相对路径 `../main.dart` 导入），Dart 可能会将它们视为两个不同的类型。
3. **尚未挂载（Unmounted）**：
   如果在 `State.initState` 中直接调用（此时 `context` 还没完全与树关联好），或者在异步操作（如 `await`）之后组件已经从树中移除时调用，也会找不到。
4. **跨路由跳转**：
   如果你通过 `Navigator.push` 跳转到了一个新页面，新页面是整个屏幕的重绘，它不再是旧页面组件的子节点，自然找不到旧页面的 State。



### 4.3、回调函数的方式

~~~dart
import 'package:flutter/material.dart';

// 1. 父组件：持有状态和修改逻辑
class ParentWrapper extends StatefulWidget {
  @override
  _ParentWrapperState createState() => _ParentWrapperState();
}

class _ParentWrapperState extends State<ParentWrapper> {
  String _sharedText = "初始状态";

  // 定义回调函数：供子组件 A 调用
  void _updateSharedStatus(String newValue) {
    setState(() {
      _sharedText = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("父组件监控到状态: $_sharedText", style: TextStyle(fontWeight: FontWeight.bold)),
        Divider(),
        // 传入回调函数给 A
        SiblingA(onAction: _updateSharedStatus),
        // 传入最新数据给 B
        SiblingB(displayData: _sharedText),
      ],
    );
  }
}

// 2. 兄弟组件 A：触发者
class SiblingA extends StatelessWidget {
  final Function(String) onAction; // 接收父组件传来的回调

  SiblingA({required this.onAction});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => onAction("A 修改了状态！"), // 执行回调，通知父组件
      child: Text("我是 A：点击通知兄弟 B"),
    );
  }
}

// 3. 兄弟组件 B：展示者
class SiblingB extends StatelessWidget {
  final String displayData; // 接收父组件传来的数据

  SiblingB({required this.displayData});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(10),
      color: Colors.blue[50],
      child: Text("我是 B：收到的实时数据是 -> $displayData"),
    );
  }
}

~~~



# 第四章、路由



## 1.MaterialPageRoute

```dart
MaterialPageRoute({
    WidgetBuilder builder,
    RouteSettings settings, // 包含路由的配置信息，如路由名称、是否初始路由（首页）
    bool maintainState = true, // 默认情况下，当入栈一个新路由时，原来的路由仍然会被保存在内存中，如果想在路由没用的时候释放其所占用的所有资源，可以设置maintainState为 false。
    bool fullscreenDialog = false, // 表示新的路由页面是否是一个全屏的模态对话框，在 iOS 中，如果fullscreenDialog为true，新页面将会从屏幕底部滑入（而不是水平方向）。
  })
```

案例

~~~dart
class RouterTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () async {
          // 打开`TipRoute`，并等待返回结果
          var result = await Navigator.push(
            context,
              //这个是Material 页面路由
            MaterialPageRoute(
              builder: (context) {
                  // 这个是一个新组件
                return TipRoute(
                  // 路由参数
                  text: "我是提示xxxx",
                );
              },
            ),
          );
          //输出`TipRoute`路由返回结果
          print("路由返回值: $result");
        },
        child: Text("打开提示页"),
      ),
    );
  }
}
~~~



## 2. Navigator

`Navigator`是一个路由管理的组件，它提供了打开和退出路由页方法。`Navigator`通过一个栈来管理活动路由集合。通常当前屏幕显示的页面就是栈顶的路由。`Navigator`提供了一系列方法来管理路由栈，在此我们只介绍其最常用的两个方法：

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#_1-future-push-buildcontext-context-route-route)1. `Future push(BuildContext context, Route route)`

将给定的路由入栈（即打开新的页面），返回值是一个`Future`对象，用以接收新路由出栈（即关闭）时的返回数据。

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#_2-bool-pop-buildcontext-context-result)2. `bool pop(BuildContext context, [ result ])`

将栈顶路由出栈，`result` 为页面关闭时返回给上一个页面的数据。

`Navigator` 还有很多其他方法，如`Navigator.replace`、`Navigator.popUntil`等，详情请参考API文档或SDK 源码注释，在此不再赘述。下面我们还需要介绍一下路由相关的另一个概念“命名路由”。

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#_3-实例方法)3. 实例方法

Navigator类中第一个参数为context的**静态方法**都对应一个Navigator的**实例方法**， 比如`Navigator.push(BuildContext context, Route route)`等价于`Navigator.of(context).push(Route route)` ，下面命名路由相关的方法也是一样的。





# 第四章、JSON转换



# 第五章、断言

| 特性           | 断言 (`assert`)                  | 代码逻辑 (`if/else/throw`)               |
| :------------- | :------------------------------- | :--------------------------------------- |
| **生效环境**   | **仅 Debug 模式**                | **所有模式** (Debug/Release)             |
| **解决的问题** | **程序员的 Bug**（代码写错了）   | **用户的操作/环境**（网络断、余额不足）  |
| **运行后果**   | 失败即闪退/红屏，强制开发者修复  | 捕获异常后程序继续运行，通过 UI 提示用户 |
| **性能开销**   | Release 模式下被剔除，**零开销** | 始终存在，有微量开销                     |

代码中的断言

~~~dart
void processPayment(double amount, double balance) {
  // 1. 断言：检查程序员的逻辑错误（内部状态假设）
  // 理由：如果余额为负数，说明之前的逻辑出大 Bug 了，调试期必须停下来
  assert(balance >= 0, '内部错误：检测到账户余额为负数，请检查数据库逻辑');

  // 2. 逻辑：处理运行时环境/用户行为
  // 理由：余额不足是正常的业务情况，发布版也要处理，不能用断言
  if (amount > balance) {
    print("提示：余额不足，支付失败。");
    return;
  }

  // 执行支付...
  print("支付成功：$amount");

  // 3. 断言：校验执行结果
  assert(balance >= 0, '支付后余额异常');
}

~~~

构造函数中的断言

~~~dart
class AppConfig {
  final String apiEndpoint;
  final int timeout;
  late String _logMessage;

  AppConfig({required this.apiEndpoint, required this.timeout})
      // --- 阶段 A: 初始化列表与断言 ---
      : assert(apiEndpoint.startsWith('https'), '安全警告：API 必须使用 https'),
        assert(timeout > 0, '配置错误：超时时间必须大于 0') {

    // --- 阶段 B: 构造函数逻辑体 ---
    _logMessage = "配置已加载：$apiEndpoint";
    print(_logMessage);

    // 逻辑处理：如果超时过长，在调试期给个提醒
    if (timeout > 10000) {
      print("注意：当前设置的超时时间较长。");
    }
  }
}

~~~



# 第六章 函数

**匿名函数写法区别**

1. 返回值的区别
2. 是否多行代码区别

| 特性         | `() {}`                     | `() => add()`             |
| :----------- | :-------------------------- | :------------------------ |
| **全称**     | 匿名函数体                  | 箭头函数（语法糖）        |
| **等价写法** | -                           | `{ return add(); }`       |
| **返回值**   | `void` 或显式 `return` 的值 | **自动返回** `add()` 的值 |
| **逻辑行数** | 可以写很多行                | **只能写一行表达式**      |



| 函数类型         | 关键标志      | 注意事项                               |
| :--------------- | :------------ | :------------------------------------- |
| **普通方法**     | `name()`      | 必须有小括号 `()`                      |
| **Getter**       | `get name`    | **禁止**加小括号 `()`                  |
| **Setter**       | `set name(v)` | **必须**有一个参数，**禁止**写返回类型 |
| **箭头函数**     | `=>`          | 只能写**一行**表达式，隐含 `return`    |
| **构造函数简写** | `this.name`   | 只能在构造函数参数位使用，不能写类型   |
| **异步函数**     | `async`       | 返回类型必须被 `Future<T>` 包裹        |

**一句话记忆：**
只要是“干活”的动作（方法），带括号 `()`；只要是“拿东西”或“设东西”的动作（属性访问），不带括号。



~~~dart
1. 基础函数
// 显式声明返回类型和参数类型
int add(int a, int b) {
  return a + b;
}

// 如果没有返回值，使用 void
void printMessage(String msg) {
  print(msg);
}

2. 箭头函数
// 相当于 { return a + b; }
int add(int a, int b) => a + b;

// 常用在 Flutter 的组件构建中
Widget build(BuildContext context) => Scaffold(body: Center());

3. 取值器与设置器
class Rectangle {
  double width = 0;
  double height = 0;

  // Getter: 取值器，使用 get 关键字，不带 ()
  double get area => width * height;

  // Setter: 设置器，使用 set 关键字，必须带 (参数)
  set side(double value) {
    width = value;
    height = value;
  }
}

// 调用示例：
var rect = Rectangle();
rect.side = 10;   // 像赋值一样调用 setter
print(rect.area); // 像访问属性一样调用 getter

4. 构造函数
class User {
  final String name;
  final int age;

  // 1. 默认构造函数（初始化简写）
  User(this.name, this.age);

  // 2. 命名构造函数 (Named Constructor)
  User.guest() : name = "访客", age = 0;

  // 3. 工厂构造函数 (Factory Constructor)
  // 不一定创建新实例，可以返回缓存或子类
  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['name'], json['age']);
  }

  // 4. 常量构造函数
  const User.constant(this.name, this.age);
}

5. 匿名函数与闭包 (Anonymous Functions)
void main() {
  var list = ['Apple', 'Banana'];

  // 匿名箭头函数
  list.forEach((item) => print(item));

  // 匿名大括号函数
  list.forEach((item) {
    var upper = item.toUpperCase();
    print(upper);
  });
}

6. 异步函数 (Asynchronous Functions)
// 返回 Future<T>，使用 async 标记，内部使用 await
Future<String> fetchData() async {
  var result = await http.get('...');
  return result.body;
}

// 如果没有返回值，写 Future<void>
Future<void> saveSettings() async {
  await storage.write(...);
}

7. 静态函数 (Static Functions)
class Utils {
  // 静态工具方法，直接通过 Utils.formatDate 调用
  static String formatDate(DateTime date) => "${date.year}-${date.month}";
}

~~~



# 第七章、异常

捕获异常：Try-Catch

~~~dart
try {
  // 可能抛出错误的代码
  var result = 10 ~/ 0; // 整数除以零

} on IntegerDivisionByZeroException {
  // 相当于if和switch的作用 如果当前异常是IntegerDivisionByZeroException就执行这个代码块
  print('不能除以零！');
} catch (e, s) {
  // 捕获所有其他异常
  // e 是异常对象，s 是堆栈信息（StackTrace）
  print('未知错误: $e');
  print('堆栈追踪: $s');
} finally {
  // 无论是否报错，最后都会执行（通常用于关闭资源）
  print('清理工作完毕');
}

~~~



抛出异常

~~~dart
void setAge(int age) {
  if (age < 0) {
    // 1. 直接抛出一个异常对象
    throw Exception('年龄不能为负数：$age');
  }
  print('年龄设置为: $age');
}

~~~



自定义业务异常

~~~dart
// 自定义异常，实现 Exception 接口
class InsufficientBalanceException implements Exception {
  final double balance;
  final double required;

  InsufficientBalanceException(this.balance, this.required);

  @override
  String toString() => '余额不足：当前 $balance, 需要 $required';
}

void pay(double price, double myBalance) {
  if (myBalance < price) {
    // 抛出自定义异常
    throw InsufficientBalanceException(myBalance, price);
  }
}

~~~



重新抛出异常

~~~dart
try {
  pay(100, 50);
} on InsufficientBalanceException catch (e) {
  print('记录日志: 用户尝试支付失败');

  // 重新抛出，让 UI 层也能捕获到并弹出提示框
  rethrow;
}
~~~



拦截全局异常

~~~dart
import 'dart:ui';
import 'package:flutter/material.dart';

void main() {
  // 确保 Flutter 绑定初始化（使用异步拦截时必须先调这句）
  WidgetsFlutterBinding.ensureInitialized();

  // A. 框架错误拦截
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    // TODO: 调用上报接口
  };

  // B. 异步/根错误拦截
  PlatformDispatcher.instance.onError = (error, stack) {
    // TODO: 调用上报接口
    return true;
  };

  // C. UI 错误视图自定义
  ErrorWidget.builder = (details) => MyCustomErrorPage(details: details);

  runApp(const MyApp());
}

~~~



# 第八章、混入Mixin

~~~dart
import 'package:flutter/material.dart';

// Counter 类通过 with 混入 ChangeNotifier
class Counter with ChangeNotifier,A,B {
  int _count = 0;

  int get count => _count;

  void increment() {
    _count++;
    // 这个方法来自 ChangeNotifier，用来通知监听者（UI）去刷新
    notifyListeners();
  }
}
~~~



# 第十章、状态管理、依赖注入 Riverpod

~~~dart
. 完整的工程逻辑演示
为了让你看清“前后逻辑”，我们假设整个流程如下：
第一步：创建源文件 lib/providers/user_provider.dart
此时你手写以下内容：
dart
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'user_provider.g.dart'; // 此时这行会报错，因为文件还没生成

@riverpod
class Counter extends _$Counter { // 此时 _$Counter 会报红
  @override
  int build() => 0;

  void increment() => state++; // 此时 state 是继承自生成的父类的
}


第二步：运行生成指令（关键步骤）
在终端执行：
bash
dart run build_runner build
请谨慎使用此类代码。

第三步：工具生成的 lib/providers/user_provider.g.dart 内容（简化版）
生成器会自动写出类似下面的代码，你不需要动它：

// 由 riverpod_generator 自动生成的代码
part of 'user_provider.dart';

// 看！这就是你继承的那个类
abstract class _$Counter extends AutoDisposeNotifier<int> {
  // 这里面包含了 state 的定义和管理逻辑
}

// 还会自动生成供 UI 使用的 provider 变量
final counterProvider = AutoDisposeNotifierProvider<Counter, int>(...);


class MyData extends _$MyData {
  @override
  // 1. 返回类型必须声明为 Map
  Map<String, int> build() {
    // 2. 返回对应的 Map 结构
    return {'name': 1};
  }
}
~~~

总结
文件关系：.dart 文件是你的“源代码”，.g.dart 是机器根据注解帮你写的“脚手架代码”。
_$类名：是机器生成的抽象父类，用来帮你处理复杂的 Provider 注册逻辑。
state：是机器生成的父类里自带的属性，代表当前的状态数据。
在 2026 年，这种“源代码”与“生成代码”协作的模式是 Flutter 的标准逻辑。你只需要关注业务（increment），而那些琐碎的底层绑定（state 怎么通知刷新、Provider 怎么定义）全部交给机器完成。



# 第十二章、Dart Macros

在 2026 年，**Dart Macros（宏）** 已经成为 Dart 语言的稳定特性。它最大的价值在于：**在内存中实时生成代码，彻底告别 `.g.dart` 文件和 `build_runner` 扫描。**

以下是在 2026 年使用 Macro 的具体步骤和实例：

1. 环境准备

由于 Macro 是深度编译器集成的特性，你需要确保：

- **SDK 版本**：`pubspec.yaml` 中的 SDK 约束至少在 `3.5.0` 或更高。
- **开启实验特性**（如果你使用的是预览版）：在 `analysis_options.yaml` 或运行命令中启用 `macros` 实验性标志。
- 安装支持宏的库

在 2026 年，主流库都推出了宏版本。例如，原来的 `json_serializable` 进化为了支持宏的注解。

yaml

```
dependencies:
  json: ^2.0.0  # 假设为 2026 年支持宏的 json 库
```

请谨慎使用此类代码。



3. 实际代码演示：Json 宏

注意：**不再需要 `part 'xxx.g.dart';`**，也不再需要运行 `build_runner`。

dart

```dart
import 'package:json/json.dart'; // 引入宏库

@JsonCodable() // 这是一个 Macro 注解
class User {
  final int id;
  final String name;

  // 你只需要定义字段，宏会自动在内存中帮你生成:
  // 1. User.fromJson(Map<String, Object?> json)
  // 2. Map<String, Object?> toJson()
}

void main() {
  // 直接调用宏生成的构造函数，IDE 不会报错，因为宏是实时生成的
  var user = User.fromJson({'id': 1, 'name': '张三'});
  print(user.toJson());
}
```

请谨慎使用此类代码。



4. 宏与 `build_runner` 的使用区别

| 特性         | 旧方案 (`build_runner`)                    | 新方案 (**Macros**)                  |
| :----------- | :----------------------------------------- | :----------------------------------- |
| **生成文件** | 产生大量 `.g.dart` 或 `.freezed.dart`      | **零文件**，代码存在于内存中         |
| **执行命令** | 必须手动运行 `dart run build_runner build` | **全自动**，保存代码时编译器实时处理 |
| **报错反馈** | 运行完命令才知道错                         | **秒级反馈**，像写普通代码一样报错   |
| **IDE 支持** | 经常需要重启分析引擎才能看到生成的代码     | IDE 完美支持，属性提示实时更新       |

5. 如何在 Riverpod 中使用 Macro？

在 2026 年，Riverpod 3.0+ 已经完全拥抱了宏。

dart

```dart
import 'package:riverpod/riverpod.dart';

@Riverpod() // 宏版注解
class Counter extends _$Counter {
  @override
  int build() => 0;

  void increment() => state++;
}

// 宏会自动在内存中创建 counterProvider
```

请谨慎使用此类代码。



**注意：** 此时你依然需要写 `extends _$Counter`，但这个 `_$Counter` 不再存在于硬盘上的 `.g.dart` 里，而是由编译器直接注入。

6. 自定义宏（进阶）

如果你想自己写一个宏（比如自动生成单例模式的宏），你需要定义一个实现了 `ClassDeclarationsMacro` 等接口的类。这通常是框架开发者的工作。

总结

在 2026 年，**Macro 的用法就是“加个注解就完事了”**。

- 它解决了代码冗余。
- 它消灭了漫长的等待编译时间。
- 如果你发现你的项目还在用 `build_runner`，请检查是否可以升级到 **Macro 版本** 的库，这能极大地提升开发体验。 Dart 官方宏开发指南 是目前最高级的参考资料。 [1], [2]



# 第十三章、目录结构

```bash
lib/
├── main.dart                 # 程序入口，配置 ProviderScope 和全局拦截
├── app.dart                  # MaterialApp 配置，处理路由、主题、国际化代理
├── core/                     # 核心共享层（不依赖具体业务）
│   ├── theme/                # 主题定义（Light/Dark/Pad特定样式）
│   ├── l10n/                 # 国际化配置（ARB文件及生成类）
│   ├── network/              # Dio 封装、拦截器、BaseUrl 配置
│   ├── router/               # GoRouter 路由定义（支持响应式布局跳转）
│   ├── utils/                # 通用工具类
│   └── common_widgets/       # 基础原子组件（按钮、输入框）
├── features/                 # 业务功能层（按模块划分）
│   ├── home/                 # 首页模块
│   │   ├── data/             # 数据源（API、DTO模型）
│   │   │   ├──dto/             # dto的组成有可能是多个实体构成的
│   │   │   └──mapper/          # 用于拆分转换dto
│   │   │   └──data_source/     # 定义数据的来源 api get post
│   │   │   └──home_repository_imp.dart/  Repository（仓库） 而不是 Api 或 Service，是因为它在设计模式中扮演着“数据守护者”的角色，而不仅仅是发个请求。
│   │   ├── domain/           # 业务实体（Entity）、仓库接口
                ├── entities/                # 存放实体类
                │   └── product_entity.dart  # 纯净的业务模型
                └── repositories/            # 存放接口
                └── i_product_repository.dart # 定义方法的契约
│   │   ├── presentation/     # UI 逻辑
│   │   │   ├── widgets/      # 局部组件
│   │   │   ├── screen_m.dart # 手机端页面
│   │   │   └── screen_p.dart # Pad 端页面（或响应式适配逻辑）
│   │   └── home_controller.dart  # 逻辑控制器 (可选) 相当于java controller 用于接受界面操纵
│   ├── cart/                 # 购物车模块
│   ├── product/              # 商品详情模块
│   └── profile/              # 个人中心模块
└── shared/                   # 业务共享层
├── models/               # 全局通用模型（如 User、Product）
└── providers/            # 全局状态（如 Auth、Theme、Locale）
```



# 第十四章、依赖库

1. 核心业务库（必须生成）

这些库构成了你项目的底层逻辑和数据模型：

- collection

  > 是一个便利列表的超集，当使用dart map的时候它不能像js map 那样返回index，可以使用collection中的 `mapIndexed((index, val)` ，当然还有更多的方法

- **`riverpod_generator`**

  - **用途**：将你带有 `@riverpod` 注解的函数或类，转化为 UI 可用的 `fetchUserProvider` 或 `counterProvider`。
  - **不运行后果**：你写的 `extends _$Counter` 会持续报错，且 UI 无法找到对应的 Provider。

- **`freezed`**
  - **用途**：生成**不可变对象**。它会自动帮你写好 `copyWith`、`==` 和 `hashCode`（这是实现你最开始要求的 **Set 集合存放对象自动去重** 的核心逻辑）。
  - **不运行后果**：无法使用复杂的模型类。

- **`json_serializable`**
  - **用途**：生成 `fromJSON` 和 `toJSON` 的具体实现代码。
  - **不运行后果**：无法自动将后端返回的 Map 数据转换为 Dart 对象。

- 资源与路由优化（推荐生成）

这些库虽然可选，但在 2026 年的规范项目中通常都会使用：

- **`flutter_gen_runner`**
  - **用途**：将你的图片（Assets）和字体自动转化为代码变量。
  - **效果**：你可以写 `Assets.images.logo.path` 而不是手动打字符串 `"assets/logo.png"`。
- **`go_router_builder`**
  - **用途**：为 GoRouter 提供类型安全的路由跳转。
  - **效果**：避免手动写字符串路径，防止商城项目页面多了之后跳转出错。

------

总结：你的 `dev_dependencies` 清单

在你的 `pubspec.yaml` 中，凡是出现在 **`dev_dependencies`** 且名字里带有 **`_generator`**、**`build`** 或 **`serializable`** 字样的库，几乎都需要 `build_runner`。

2026 年的最佳操作习惯

不要每次改完都去手动运行 `build`。**强烈建议在项目开始开发时，直接在终端开启“监视模式”：**

bash

```bash
# 2026 推荐指令
dart run build_runner watch --delete-conflicting-outputs
```

请谨慎使用此类代码。



**为什么一定要开 `watch`？**
因为在 2026 年，由于 SDK 的优化，`watch` 模式非常轻量。它会像监听器一样守在后台，只要你保存（Ctrl+S）代码，它就会在 **0.5 秒内** 帮你补全生成的类，让你在编写业务逻辑时完全感觉不到代码生成的延迟

# 第十五章、常见的命令



1. 基础更新（最常用）

如果你只是想根据 `pubspec.yaml` 中定义的版本范围获取更新：

bash

```bash
flutter pub get
```

请谨慎使用此类代码。



- **作用**：根据 `pubspec.yaml` 下载依赖，并生成/更新 `pubspec.lock` 文件。
- 尝试升级到兼容的最新版本

如果你想在不改变 `pubspec.yaml` 版本约束的前提下，尝试将依赖升级到范围内的最高版本：

bash

```bash
flutter pub upgrade
```

请谨慎使用此类代码。



- **作用**：它会尝试更新 `pubspec.lock`，将所有包升级到你允许的最高版本（例如 `^3.0.0` 会升级到 `3.9.9` 但不会升级到 `4.0.0`）。
- 升级到主版本（2026 推荐做法）

如果你想让项目彻底跟上 2026 年的最新节奏，直接升级到最新的大版本（可能会改动 `pubspec.yaml`）：

bash

```bash
flutter pub upgrade --major-versions
```

请谨慎使用此类代码。



- **作用**：它会自动修改你的 `pubspec.yaml` 文件，将版本号改为当前的最新版本。
- **注意**：这可能会引入破坏性更新（Breaking Changes），升级后需要检查代码是否有报错。
- 强力清理并重新拉取

如果遇到依赖冲突或者某些包下载不完整，使用这个“组合拳”：

bash

```bash
flutter pub cache clean    # 清理本地全局缓存
flutter clean              # 清理项目编译缓存
rm pubspec.lock            # 手动删除锁定文件（Windows 使用 del pubspec.lock）
flutter pub get            # 重新拉取
```

请谨慎使用此类代码。



5. 检查哪些包可以更新

在操作前，你可以先通过以下指令查看有哪些包出了新版本：

bash

```bash
flutter pub outdated
```

请谨慎使用此类代码。



```bash
dart run build_runner build --delete-conflicting-outputs
```



- **看点**：它会列表对比你“当前使用的版本”、“当前允许的最高版本”以及“官方最新的版本”。

2026 年特别提示：

1. **Macro 库更新**：由于 2026 年许多支持 **Macro** 的库处于快速迭代期，建议定期运行 `flutter pub outdated` 检查更新，以获取更稳定的宏编译支持。
2. **SDK 约束**：如果升级后报错，请检查你的 `environment: sdk` 是否设置得过低，确保其满足最新库的要求。 Flutter 官方依赖管理指南 提供了关于版本解析的详细逻辑



# 第十六章、配置开发环境

在 2026 年的 Flutter 开发中，配置环境变量（如 API 域名、密钥等）最专业、最标准的方式是使用 **`--dart-define`** 或 **`--dart-define-from-file`**。

这种方式比传统的 `.env` 文件更安全且性能更高，因为它在**编译时**就将变量注入到了代码中。

1. 准备配置文件

在项目根目录下创建一个 `env.json`（或根据环境创建 `dev.json`, `prod.json`）。

**config/dev.json**

json

```json
{
  "BASE_URL": "https://dev-api.shop.com",
  "API_KEY": "dev_key_123",
  "IS_DEBUG": true
}
```

请谨慎使用此类代码。



2. 在 Dart 代码中读取

使用 `String.fromEnvironment`、`int.fromEnvironment` 或 `bool.fromEnvironment` 来获取这些值。

**lib/core/config/env_config.dart**

dart

```dart
class EnvConfig {
  // 建议定义为 static const，这样在编译时就会被替换为常量
  static const String baseUrl = String.fromEnvironment(
    'BASE_URL',
    defaultValue: 'https://localhost:8080',
  );

  static const String apiKey = String.fromEnvironment('API_KEY');

  static const bool isDebug = bool.fromEnvironment('IS_DEBUG', defaultValue: false);
}
```

请谨慎使用此类代码。



3. 运行与编译

在运行或打包时，通过参数指向你的配置文件。

- **运行开发版：**

  bash

  ```shell
  flutter run --dart-define-from-file=config/dev.json
  ```

  请谨慎使用此类代码。



- **打包正式版：**

  bash

  ```shell
  flutter build apk --dart-define-from-file=config/prod.json
  ```

  请谨慎使用此类代码。





------

4. 2026 年进阶方案：配合 Riverpod 注入

为了在商城项目中更好地管理这些配置，建议将其封装进 Riverpod Provider。

dart

```dart
// lib/core/config/env_provider.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';
part 'env_provider.g.dart';

@riverpod
class AppEnv extends _$AppEnv {
  @override
  String build() => EnvConfig.baseUrl; // 使用上面定义的常量
}
```

请谨慎使用此类代码。



5. 为什么 2026 年不推荐使用 `.env` 库？

以前大家习惯用 `flutter_dotenv` 库，但在 2026 年这种做法已逐渐被淘汰，原因如下：

1. **加载延迟**：`.env` 需要在 `main` 函数中 `await` 加载，会增加白屏时间。
2. **非强类型**：`.env` 读取的全部是字符串，需要手动转型。
3. **安全性**：`--dart-define` 直接将值编译进二进制文件，不容易像 `.env` 文件那样被轻易从安装包中提取。

总结

1. **创建 JSON**：存放不同环境的配置。
2. **代码常量化**：使用 `String.fromEnvironment` 定义。
3. **编译注入**：使用 `--dart-define-from-file` 参数。

**小贴士：** 别忘了把你的 `config/*.json` 加入到 `.gitignore` 中，防止敏感密钥泄露到代码仓库！ Flutter 官方关于环境配置的说明 详细介绍了编译时注入的机制。



# 第十七章、开发规范



在 2026 年的 Flutter 开发规范中，你展示的这种结构被称为 **功能优先的分层架构 (Feature-First Layered Architecture)**。

这种设计是结合了 **领域驱动设计 (DDD)** 简化版与 **整洁架构 (Clean Architecture)** 的产物。它目前是中大型 Flutter 项目（尤其是使用 Riverpod 的项目）的行业标准。

以下是该架构的详细拆解：

1. 核心设计理念：功能优先 (Feature-First)

与传统的“层级优先”（所有模型放一起，所有 UI 放一起）不同，这种方式**按业务逻辑（Home, Cart, Product）**进行纵向切分。

- **高内聚**：修改首页逻辑时，你只需要在 `home/` 文件夹下工作。
- **易删除/迁移**：如果某个功能下线，直接删除对应的 `feature/xxx` 目录即可，不会产生大量残留代码。
- 三层结构解析 (Layered Architecture)

在该结构中，每个功能内部又被横向切分为三层，实现了**职责分离**：

**A. Data 层 (数据层)**

- **职责**：负责与外部通信（网络 API、本地数据库）。
- **内容**：`data_source.dart`（Dio 请求）、`dto`（后端返回的原始 JSON 模型）。
- **作用**：解决“数据从哪来”的问题。

**B. Domain 层 (领域层 - 核心)**

- **职责**：存放纯粹的业务逻辑和数据模型。
- **内容**：`entity.dart`（UI 使用的纯净模型）、`repository_interface.dart`（定义数据获取的协议）。
- **作用**：它是最稳定的层，不关心 UI 长什么样，也不关心数据是来自 Dio 还是 Hive。

**C. Presentation 层 (表现层/UI 层)**

- **职责**：负责将数据显示在屏幕上，并处理用户交互。
- **内容**：
  - **Providers**：Riverpod 状态管理器（取代了旧的 ViewModel）。
  - **Widgets/Screens**：UI 界面。
- **2026 适配策略**：你看到的 `screen_m.dart` (Mobile) 和 `screen_p.dart` (Pad) 体现了**多端适配策略**，共用同一个 Provider 逻辑，但渲染不同的布局。

------

3. 为什么 2026 年大家都在用它？

1. **完美契合 Riverpod**：Riverpod 的 `ref.watch` 机制让 Presentation 层可以非常优雅地监听 Domain 层的状态变化。
2. **代码生成友好**：`riverpod_generator` 和 `freezed` 产生的代码可以完美放置在每个 feature 的 `data` 和 `providers` 目录下，互不干扰。
3. **团队协作**：开发者 A 负责 `cart`，开发者 B 负责 `home`，两人修改同一个文件的概率极低，极大减少了 Git 冲突。
4. **适配复杂性**：通过将 UI 拆分为 `_m` 和 `_p`，可以保持代码整洁。逻辑在 `controller`（或 Provider）里写一次，UI 根据屏幕尺寸选择加载哪个文件。

总结

你所使用的这种结构是 **“分层架构”与“功能模块化”** 的结合体。它在 2026 年被认为是**最利于维护、扩展性最强**的设计方案，非常适合你提到的需要兼容 Pad 端、处理国际化和复杂主题的商城 App。





# Future FutureOr

~~~dart
@override
Widget build(BuildContext context, WidgetRef ref) {
  // 1. 监听异步 Provider
  final asyncValue = ref.watch(homeControllerProvider);

  // 2. 使用 .when 自动处理 异步的 三种状态
  return asyncValue.when(
    data: (products) => Text("拿到数据: ${products.length}"),
    loading: () => CircularProgressIndicator(), // 加载中
    error: (err, stack) => Text("出错: $err"),     // 出错
  );
}

~~~







# 屏幕适配方案

| 维度            | **flutter_screenutil** (比例缩放派)                          | **responsive_framework** (自适应布局派)                     |
| :-------------- | :----------------------------------------------------------- | :---------------------------------------------------------- |
| **核心逻辑**    | **等比拉伸/缩小**。所有组件随屏幕尺寸变大而变大，变小而变小。 | **布局重组/断点控制**。小屏堆叠、大屏分栏或自动扩充内容。   |
| **代码习惯**    | 必须在每个宽高、字号后加 `.w`, `.h`, `.sp`。                 | 直接写数字，在全局或局部配置断点行为。                      |
| **Pad 表现**    | 像一个“巨型手机版”。按钮和文字会变得很大。                   | 像“专业 Pad 版”。按钮大小不变，但显示的商品列数和内容变多。 |
| **2026 年地位** | 属于**UI 适配**工具。                                        | 属于**布局架构**工具。                                      |



flutter_screenutil

## responsive_framework



### 镜像缩放

~~~dart




@override
Widget build(BuildContext context) {
  return ResponsiveScaledBox(
    // 1. 设定一个“基准宽度”（比如 600）
    // 无论手机还是平板，程序都会认为屏幕宽度就是 600
    width: 600,

    // 2. 这里的内容你照常写，直接用固定数字
    child: Scaffold(
      appBar: AppBar(title: const Text("商城首页")),
      body: Container(
        width: 300, // 在 600 的基准下，它永远占屏幕的一半
        height: 200,
        color: Colors.blue,
        child: const Text("文字也会自动缩放", style: TextStyle(fontSize: 20)),
      ),
    ),
  );
}

~~~



- 通常全局锁定

~~~dart
class AppLayoutConfig {
  static const double designWidth = 600.0; // 全局设计稿基准
}


builder: (context, child) => ResponsiveScaledBox(
  width: AppLayoutConfig.designWidth,
  child: child!,
),

~~~



### 断点

~~~dart
@override
Widget build(BuildContext context) {
  // 判断当前是否为平板状态
  final isTablet = ResponsiveBreakpoints.of(context).isTablet;

  return Scaffold(
    // 如果是平板，显示左侧导航栏；如果是手机，显示底部导航
    drawer: isTablet ? const MySideBar() : null,
    bottomNavigationBar: isTablet ? null : const MyBottomBar(),
    body: const MyContent(),
  );
}

~~~

### MaxWidthBox (最大宽度锁定) —— 解决 2080px 散架问题

当你锁定基准宽度为 600dp，但在 2080px 的超宽屏（如 4K 屏）上运行时，即使有缩放，UI 也会因为拉伸过宽而显得很怪。

- **功能**：强制给内容设置一个最大边界，超出部分留白或填充背景。

- **用法**：

  dart

  ```dart
  MaxWidthBox(
    maxWidth: 1200, // 无论屏幕多宽，主体内容最宽只展示 1200dp
    background: Container(color: Colors.grey[200]), // 左右两侧留白背景
    child: child!,
  )



  MaterialApp(
    builder: (context, child) => ResponsiveBreakpoints.builder(
      // 1. 最外层：锁定最大宽度，防止 2080px 这种超宽屏导致 UI 散架
      child: MaxWidthBox(
        maxWidth: 1200, // 无论屏幕多宽，商城内容区最大 1200dp
        background: Container(color: const Color(0xFFF5F5F5)), // 屏幕两侧多出的部分背景色

        // 2. 中间层：执行镜像缩放，让你不用写 .w
        child: ResponsiveScaledBox(
          width: 600, // 你的设计稿基准宽度
          child: child!, // 这里是具体的页面内容
        ),
      ),
      // 3. 断点配置：用于代码里判断 isTablet
      breakpoints: [
        const Breakpoint(start: 0, end: 450, name: MOBILE),
        const Breakpoint(start: 451, end: 1200, name: TABLET),
        const Breakpoint(start: 1201, end: double.infinity, name: DESKTOP),
      ],
    ),
    home: const HomeScreen(),
  );

  ```dart



### ResponsiveRowColumn (行列自动转换)

这是针对商城 App 详情页的神器。它可以根据断点自动切换 **横向 (Row)** 或 **纵向 (Column)** 排列。



- **场景**：手机上是“上图下文”，Pad 上自动变成“左图右文”。

- **优势**：不需要写两个 Widget，只需包裹一层。

- **写法**：

  dart

  ```dart
  ResponsiveRowColumn(
    // 核心逻辑：手机返回 COLUMN，Pad 返回 ROW
    layout: ResponsiveBreakpoints.of(context).isMobile
            ? ResponsiveRowColumnType.COLUMN
            : ResponsiveRowColumnType.ROW,

    // 间距设置：Row 时水平间距 20，Column 时垂直间距 20
    columnSpacing: 20,
    rowSpacing: 20,

      // 决定这里横着排还是竖着排
    children: [
      // 左侧/上侧：商品大图
      ResponsiveRowColumnItem(
        rowFlex: 2, // 在 Pad 上占 2 份宽度
        child: Image.asset('assets/product.png', fit: BoxFit.cover),
      ),

      // 右侧/下侧：商品标题和价格
      ResponsiveRowColumnItem(
        rowFlex: 3, // 在 Pad 上占 3 份宽度
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("2026 新款超轻跑步鞋", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            SizedBox(height: 10),
            Text("￥599.00", style: TextStyle(color: Colors.red, fontSize: 20)),
          ],
        ),
      ),
    ],
  )

  ```





### ResponsiveGridView (响应式网格)

它增强了原生的 `GridView`，让你可以针对不同断点直接配置间距和对齐方式。

- **功能**：在不同设备上自动调整固定间距和自适应列数，配合 `ScaledBox` 使用时，能产生极其稳定的宫格效果。
- 2026 年的高级进阶：Banned/Clamping (缩放限制)

在全局缩放模式下，如果你担心在某些极小或极大的屏幕上缩放得太离谱：

- **功能**：可以设置缩放的“上下限”。
- **作用**：比如设置最小缩放不低于 0.8 倍，最大不超过 1.5 倍，防止 UI 元素在 2080px 屏幕上大到像桌面图标。



~~~dart
// lib/features/home/presentation/screens/home_screen_m.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:responsive_framework/responsive_framework.dart';
import '../providers/home_controller.dart'; // 引入你的控制器

class HomeProductGrid extends ConsumerWidget {
  const HomeProductGrid({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 1. 获取 Controller 中的商品数据状态
    final productState = ref.watch(homeControllerProvider);

    // 2. 根据状态渲染 UI
    return productState.when(
      data: (products) => ResponsiveGridView.builder(
        // 这里就是你写的那个组件
        gridDelegate: const ResponsiveGridDelegate(
          maxExtent: 200,
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          childAspectRatio: 0.8,
        ),
        itemCount: products.length,
        padding: const EdgeInsets.all(16),
        itemBuilder: (context, index) {
          final product = products[index];
          return ProductCard(product: product); // 渲染单个商品卡片
        },
      ),
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (err, stack) => Center(child: Text('加载失败: $err')),
    );
  }
}

~~~

**角色：** 你是一名资深 Flutter 架构师，擅长 iPad 端的响应式电商开发。

**任务：** 请为我构建一个 iPad 端商城的基础架构

技术栈，flutter，

- 网络请求：可以使用市面上的流行库

- responsive_framework
  - 设置响应式布局

- **`riverpod`**
  - **用途**：将你带有 `@riverpod` 注解的函数或类，转化为 UI 可用的 `fetchUserProvider` 或 `counterProvider`。
  - **不运行后果**：你写的 `extends _$Counter` 会持续报错，且 UI 无法找到对应的 Provider。
  
- **`freezed`**
  - **用途**：生成**不可变对象**。它会自动帮你写好 `copyWith`、`==` 和 `hashCode`（这是实现你最开始要求的 **Set 集合存放对象自动去重** 的核心逻辑）。
  - **不运行后果**：无法使用复杂的模型类。

- **`json_serializable`**
  - **用途**：生成 `fromJSON` 和 `toJSON` 的具体实现代码。
  - **不运行后果**：无法自动将后端返回的 Map 数据转换为 Dart 对象。

- 资源与路由优化（推荐生成）

这些库虽然可选，但在 2026 年的规范项目中通常都会使用：

- **`flutter_gen_runner`**
  - **用途**：将你的图片（Assets）和字体自动转化为代码变量。
  - **效果**：你可以写 `Assets.images.logo.path` 而不是手动打字符串 `"assets/logo.png"`。
- **`go_router_builder`**
  - **用途**：为 GoRouter 提供类型安全的路由跳转。
  - **效果**：避免手动写字符串路径，防止商城项目页面多了之后跳转出错。



**1. 布局要求 (Tablet Layout)：**

- 要求是响应式布局

**2. 状态管理逻辑 (State Management)：**

**3. UI 组件要求：可以使用flutter自带的库**

4. 重点，由于是基础架构，设计的一定要合理，从api方法调用网络请求到人中token到获取数据到渲染页面，要按照市场上顶尖的架构设计，简单方便阅读，有完整的liu'ch