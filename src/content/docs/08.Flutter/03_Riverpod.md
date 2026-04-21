---
title: '状态管理 Riverpod'
---



# 状态管理、 Riverpod|Cubit 

- Cubit 是一个轻量级状态管理，后面在补充



## 介绍

### 1. Riverpod 在干什么

- 本质：用「可观察的状态」驱动 UI；依赖它的 widget 在状态变化时会按需重建，效果上类似「不用手写 `setState` 的联动刷新」，但模型是声明式（`watch` 谁、谁才跟着变）。
- 和 `setState` 的差别：不是「改一个变量就整页 `setState`」，而是谁 `watch` 了这份状态，谁才 rebuild（再配合 `select` 等可以更细）。



### 2. autoDispose Provider

- 生命周期：当没有任何监听者（没有 `watch` / `listen` 等保持订阅）时，Provider 会被自动 dispose；有新的监听时再创建。
- 和你说的「跟页面一起走」：在常见路由场景里，页面关了、树里没人再 `watch`，往往就会 dispose，所以体感上像跟页面生命周期一致；但严格说是**「无人订阅就销毁」**，不是 Flutter 的 `dispose` 事件本身。
- 用途：适合页面级、临时、可重建的数据（表单草稿、单次请求的缓存等），减少长期占内存。



### 3. 非 `autoDispose`（keepAlive）

- 生命周期：只要 `ProviderScope` 还在，会始终在内存中，不会因为没人 `watch` 就自动清掉。
- 刷新方式：状态变了，`watch` 它的 widget 会更新；若要丢弃缓存 / 强制重跑，常用 `invalidate` / `refresh`
- **重点**(清理)：需要你在合适时机主动处理（例如登出时 `invalidate` 一批、或 `ref.onDispose` 里释放资源）；不是「永不监听」，而是**「实例不自动从容器里移除」**。



重点：

- 非 `autoDispose` 会常驻内存：适合全局会话、主题、用户信息等；若把大列表、仅某页用的数据也做成长期 Provider，容易造成内存与逻辑耦合（页面以为「走了就干净」，实际还在）。
- 实践建议：默认倾向 `autoDispose` + 需要跨页长期保留时再 `keepAlive`，比一上来全局长存更可控。

| 类型                                     | 典型数据               | 更推荐                                                       |
| :--------------------------------------- | :--------------------- | :----------------------------------------------------------- |
| FutureProvider                           | 一次接口、详情页加载   | `autoDispose`：离开页面无人订阅就清缓存，避免旧数据误用；要跨页保留再 `keepAlive` |
| StreamProvider                           | 实时推送、WebSocket    | 看需求：仅当前页用 → `autoDispose`；全局连接 → 非 dispose + 在 `ref.onDispose` 里关流 |
| NotifierProvider / StateNotifierProvider | 表单、列表页状态、筛选 | `autoDispose` 居多；全局购物车等 → 常驻                      |
| AsyncNotifierProvider                    | 分页、提交后刷新列表   | `autoDispose` 很常见；登录态、全局配置 → 常驻 + 登出时 `invalidate` |



一句口诀

- 「只服务这一屏 / 这一流程」 → 优先 `autoDispose`。
- 「多屏共享、应用级」 → 常驻，并在登出 / 切换账号等节点集中 `invalidate` 或重置。

有具体页面（例如某个 `*_providers.dart`）也可以贴片段，我可以按场景帮你标该用哪种



### 4. 常见方法

**注意**：一旦 Provider 被赋值并存储在内存中（且没有被销毁），后续的 `ref.watch` **只是读取缓存的值**，不会再次触发赋值逻辑，除非你调用了 `ref.invalidate(provider)` 之后**销毁旧状态**，下次有人读取会从头初始化

下面方法都会触发初始化

- `read`：一次性拿值/触发动作，不订阅
- `watch`：拿值并订阅，变了会重建
- `listen`：不用于渲染，专门监听变化做副作用

------

- `ref.read(provider)`
  - 适合：按钮点击、提交、调用 notifier 方法
  - 特点：读取当下值，不跟随后续变化
  - 常见写法：`ref.read(cartProvider.notifier).addItem()`
  
- `ref.watch(provider)`
  - 适合：`build` 中渲染 UI 数据
  - 特点：建立订阅；provider 变化时触发重建
  - 常见写法：`final cart = ref.watch(cartProvider)`
  
- `ref.listen(provider, (prev, next) {...})`
  - 适合：Toast、弹窗、导航、错误提示、日志
  - 特点：监听变化执行回调，不靠它重建 UI
  - 常见写法：监听 `AsyncValue` 的失败后弹错误提示
  
- 如果你发现 `watch` 导致重建范围太大，可以结合 **`select`** 使用
  
  ~~~dart
  final name = ref.watch(userProvider.select((u) => u.name));
  ~~~
  
  

------

推荐分工：

- 渲染界面 → `watch`
- 用户操作触发命令 → `read`
- 状态变化后的副作用 → `listen`

------

易错点：

- 在 `build` 里用 `read` 渲染数据：不会自动刷新
- 用 `watch` 做导航/弹 Toast：可能重复触发副作用
- 把所有逻辑都塞 `listen`：UI 数据流会变乱



## 一、Provider (同步)不可变

不可变的特点：可覆盖，可注入

```dart
final cityProvider = Provider((ref) => 'London');
final countryProvider = Provider((ref) => 'England');

// 可注入
final locationProvider = Provider<String>((ref) {
  final city = ref.watch(cityProvider);
  final country = ref.watch(countryProvider);
  return '$city, $country';
});

// 可覆盖
runApp(
  ProviderScope(
    overrides: [
      baseUrlProvider.overrideWithValue('https://prod-api.xxx.com'),
    ],
    child: const MyApp(),
  ),
);

// 跨模块共享
final baseUrl = ref.watch(baseUrlProvider);

```



## 二、StateProvider  (同步)可变的



~~~dart
//定义
import 'package:flutter_riverpod/flutter_riverpod.dart';
// 定义一个简单的数字状态，默认值为 0
final counterProvider = StateProvider<int>((ref) => 0);


// 使用
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 1. 监听状态变化（UI 会随之刷新）
    final count = ref.watch(counterProvider);

    return Scaffold(
      body: Center(
        child: Text('当前数值: $count'),
      ),
      floatingActionButton: FloatingActionButton(
        // 2. 修改状态
        onPressed: () {
          // 方式 A：直接赋值
          ref.read(counterProvider.notifier).state++;
          
          // 🚀方式 B：基于当前值进行逻辑处理（推荐，更安全），但是如果这样的话就可以使用 Notifier
          // ref.read(counterProvider.notifier).update((state) => state + 1);
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
~~~



## 三、FutureProvider  (异步)拉一次无参

适合“只读异步数据获取”（拉一次、展示结果）

~~~dart
// 非通知，不接收参数的，注解版本
@riverpod
Future<User> user(Ref ref) async {
  final response = await http.get('https://api.example.com/user/123');
  return User.fromJson(response.body);
}

// 非通知，不接收参数的，普通版本
final userProvider = FutureProvider<User>((ref) async {
  final response = await http.get(
    Uri.parse('https://api.example.com/user/123'),
  );
  final map = jsonDecode(response.body) as Map<String, dynamic>;
  return User.fromJson(map);
});
~~~





## 四、FutureProvider.family  (异步)拉一次有参

简单来说：它允许你**向 Provider 传递参数**来获取异步数据

- 自动处理加载中、错误和数据状态。

- **family**：给这个 Provider 开了个“后门”，让它能接收一个外部参数（比如 ID、URL、索引等）。

- **自动缓存**：如果你多次调用 `productDetailProvider(123)`，Riverpod 只会发起一次网络请求，结果会被缓存。

- **自动释放**：当所有订阅了 ID 为 `123` 的组件都销毁时，这个特定参数的状态会被自动清理。

- **并发支持**：你可以同时监听 `id: 1` 和 `id: 2`，它们是互不干扰的独立状态。

  ~~~dart
  // 监听 ID 为 1 的状态
  final product1 = ref.watch(productProvider(1));
  // 监听 ID 为 2 的状态
  final product2 = ref.watch(productProvider(2));
  ~~~

基本使用

可以，给你一段最小可用示例：参数变化自动重新拉取（不需要手动再调接口）。

~~~dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

*// 1) 模拟当前站点参数（你切站点时改它）*
final currentCompanyIdProvider = StateProvider<int>((ref) => 1);
*// 2) 带参数的 FutureProvider（family）*
final productsProvider = FutureProvider.family<List<String>, int>((
  ref,
  companyId,
) async {
  *// 这里放真实接口：GET /products?company_id=companyId*
  await Future<void>.delayed(const Duration(milliseconds: 400));
  return List.generate(3, (i) => 'company=$companyId product_$i')
});

class DemoPage extends ConsumerWidget {
  const DemoPage({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
​    *// 3) watch 参数*
​    final companyId = ref.watch(currentCompanyIdProvider);
​    *// 4) watch 带参 povider*
​    final productsAsync = ref.watch(productsProvider(companyId));
​    return Column(
​      children: [
​        Row(
​          children: [
​            ElevatedButton(
​              onPressed: () =>
​                  ref.read(currentCompanyIdProvider.notifier).state = 1,
​              child: const Text('切到站点1'),
​            ),
​            const SizedBox(width: 8),
​            ElevatedButton(
​              onPressed: () =>
​                  ref.read(currentCompanyIdProvider.notifier).state = 2,
​              child: const Text('切到站点2'),
​            ),
​            const SizedBox(width: 8),
​            ElevatedButton(
​              onPressed: () {
​                *// 同参数强制刷新才需要手动 refresh*
​                ref.refresh(productsProvider(companyId));
​              },
​              child: const Text('手动刷新'),
​            ),
​          ],
​        ),
​        const SizedBox(height: 12),
​        productsAsync.when(
​          loading: () => const CircularProgressIndicator(),
​          error: (e, _) => Text('error: $e'),
​          data: (list) => Column(
​            crossAxisAlignment: CrossAxisAlignment.start,
​            children: list.map(Text.new).toList(),
​          ),
​        ),
​      ]
​    );
  }
}
~~~



你可以重点看这句：

- `ref.watch(productsProvider(companyId))`

当 `companyId` 从 1 变 2，Riverpod 会自动用新参数重建并重新请求。



注意事项

- **参数限制**：传给 `family` 的参数必须支持 **`==` 比较和 hashCode**。通常使用 `int`, `String`, `bool` 或者通过 `freezed` 生成的实体类。
- **不要在内部创建参数**：不要传一个每次都会刷新的对象（如新的 List），否则会导致 Provider 频繁重新计算。

~~~dart
// 定义一个 family，参数是一个 List
final myProvider = FutureProvider.family<String, List<String>>((ref, categories) async {
  return "Results for ${categories.join(', ')}";
});

// --- 在 UI 中错误地使用 ---
Widget build(context, ref) {
  // 错误：这里每次 build 都会创建一个 [NEW] List 实例
  // 在 Dart 中，['a'] == ['a'] 结果是 false (因为内存地址不同)
  final asyncValue = ref.watch(myProvider(['electronics', 'books'])); 

  return asyncValue.when(
    data: (data) => Text(data),
    loading: () => CircularProgressIndicator(), // 页面会一直停在这里不断闪烁/转圈
    error: (e, _) => Text('Error'),
  );
}
~~~



## 五、Notifier (同步逻辑)可变的



~~~dart
// 1. 定义 Notifier 类
class Counter extends Notifier<int> {
  @override
  int build() => 0;

  void increment() => state++;
}

// 2. 定义 Provider
final counterProvider = NotifierProvider<Counter, int>(Counter.new);

// ui种使用
class CounterView extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 监听状态
    final count = ref.watch(counterProvider);

    return Scaffold(
      body: Center(child: Text('$count')),
      floatingActionButton: FloatingActionButton(
        // 调用封装好的 increment 方法，而不是直接修改 state
        onPressed: () => ref.read(counterProvider.notifier).increment(),
        child: Icon(Icons.add),
      ),
    );
  }
}

~~~









##  六、AsyncNotifier(异步逻辑) 拉多次有参可修改

- **特点**：
  - 内部有一个 `build()` 方法（相当于 `FutureProvider` 的函数体）。
  - 可以定义**方法（Method）**来修改状态。
- **优势**：可以轻松实现“乐观更新”（在网络请求回来前就先改掉 UI）。



- `if (async.isLoading / hasError / hasValue)` 手动判断
- `async.valueOrNull`（只关心数据，不关心错误）
- `async.whenData(...)`（只处理 data 分支）
- `ref.watch(provider.select(...))`（只监听某个字段）
- 监听副作用：`ref.listen(provider, ...)`（弹 toast、跳转等）
- 不订阅只读一次：`ref.read(provider)`（事件里读取）



### 6.1、调用时机（敲黑板！）

它的调用时机非常智能，主要有以下三个时刻：

1. **首次监听（最常见）**：
   当你在 UI 中第一次执行 `ref.watch(myProvider)` 时，`build` 立即执行。此时状态会自动变为 `AsyncLoading`。
2. **手动刷新（Invalidate）**：
   当你调用 `ref.invalidate(myProvider)` 时，旧状态被销毁，`build` 会**重新运行**。这常用于“下拉刷新”。
3. **依赖更新**：
   如果你在 `build` 内部使用了 `ref.watch(另一个Provider)`，那么当那个 Provider 变化时，`build` 会**重新运行**。

------

### 6.2、build方法

1. **自动封装**：当你 `return` 一个数据（比如 `Product` 对象）时，Riverpod 会自动把它包装成 `AsyncData(product)` 放入 `state`。
2. **异步等待**：因为 `build` 是异步的，在它执行 `return` 之前，Riverpod 会自动先把 `state` 设为 `AsyncLoading()`。
3. **异常捕获**：如果 `build` 内部报错了，它会自动捕获错误并将 `state` 设为 `AsyncError(error)`。



~~~dart
// 通知，不接收参数的，普通版本
final randomJokeProvider = AsyncNotifierProvider<JokeNotifier, Joke>(JokeNotifier.new);
class JokeNotifier extends AsyncNotifier<Joke> {
    
   FutureOr<PaginatedProductsState> build() async {
    final result = await fetchProductsPageService(
      page: 1,
      pageSize: _pageSize,
      shopCateGoryId: _selectedShopCategoryId,
      sort: _sort,
      orderBy: _orderBy,
    );
    return result;
  }
    
  Future<void> loadJoke() async {
    // 1. 手动设为加载状态 (UI 会自动变转圈)
    state = const AsyncLoading();
    try {
      await api.save(newName);
      // 2. 成功后，手动设为数据状态 (UI 自动显示新名字)
      state = AsyncData(newName);
    } catch (e, stack) {
      // 3. 失败后，手动设为错误状态 (UI 自动显示错误信息)
      state = AsyncError(e, stack);
    }
  }
    
  void refresh() {
   ref.invalidateSelf(); // 这会导致 build() 重新执行
  }
    
}


// 使用
@override
Widget build(BuildContext context, WidgetRef ref) {
  // 获取整个“盒子” (AsyncValue)
  final AsyncValue<String> asyncName = ref.watch(nameProvider);

  return asyncName.when(
    // 情况 A：数据准备好了 (AsyncData)
    data: (name) => Text('你好, $name'),
    
    // 情况 B：正在加载中 (AsyncLoading)
    loading: () => const CircularProgressIndicator(),
    
    // 情况 C：出错了 (AsyncError)
    error: (err, stack) => Text('加载失败: $err'),
  );
}
~~~



## 七、状态销毁时机

没有监听者，销毁的完整过程

想象你有一个 **商品详情页**：

1. **用户进入详情页**：
   - 页面组件执行 `ref.watch(productProvider)`。
   - 此时，监听者数量 = **1**。
   - Provider 开始工作，执行 `build()`，数据存入内存。
2. **用户在页面内操作**：
   - 你点击收藏，修改了 `state`。此时内存里的数据是“已收藏”。
3. **用户点击“返回”按钮**：
   - 详情页 Widget 被销毁（Pop）。
   - 因为页面没了，`ref.watch` 自然也消失了。
   - 此时，监听者数量 = **0**。



手动使其失效（Invalidate）

这是由你或代码逻辑主动触发的：

- **`ref.invalidate(provider)`**：在 UI 或其他地方调用，强制销毁当前状态并重新执行 `build`。
- **`ref.invalidateSelf()`**：在 Notifier 内部调用，通常用于处理“加载失败后重试”或“下拉刷新”。



参数变化（仅限 `.family`）

如果你使用的是 `AsyncNotifier.family`：

- **现象**：如果你从 `watch(provider(1))` 切换到了 `watch(provider(2))`。
- **后果**：对于参数 `1` 的状态，如果没有其他地方引用，它会根据销毁策略消失；而参数 `2` 会启动它自己的独立状态。



### autoDispose  

`autoDispose` 是 Riverpod 中的一个修饰符，主要作用是**在 Provider 不再被任何 Widget 或其他 Provider 监听时，自动销毁其状态并释放资源**。

~~~dart
// 定义一个自动销毁的 Provider
final myProvider = StateProvider.autoDispose<int>((ref) => 0);

// 使用时与普通 Provider 无异
final value = ref.watch(myProvider);
~~~



## 八，响应处理api



## 九、Riverpod 异步请求工具清单（请求前 / 请求中 / 请求后）

本文档面向本项目依赖的 **Riverpod 3**（`flutter_riverpod: ^3.0.0`），按「请求前 → 请求中 → 请求后」组织，并为每项补充**作用说明**与**可独立运行的完整示例**。

> **版本提示（Riverpod 3）**  
> - `AsyncValue.valueOrNull` 已移除：请使用 **`value`**（在 loading/error 时可能返回**上一次**成功值，详见官方文档对 `value` 的说明）。  
> - `AsyncValue.guard` 的签名为 **`guard(() async { ... })`**，参数是 **`Future<T> Function()`**，不是直接传入 `Future` 变量。

---

### 1、状态声明（请求结果的「形状」）

#### `AsyncValue<T>`

**作用**：描述异步结果的**联合类型**容器；在某一时刻可能同时携带 loading、上一版 data、error 等信息（多态组合），UI 或逻辑通过 `when` / `map` / pattern matching 安全分流。

#### `AsyncData<T>` / `AsyncError<T>` / `AsyncLoading<T>`

**作用**：三种具体构造形态，用于**手动写入** `state`（常见于 `AsyncNotifier`），或与 `map` 家族配合拿到**完整**状态对象（含附带字段）。

**完整示例（单文件可运行）**：声明状态并手动构造三种 `AsyncValue`。

```dart
// file: example_async_value_constructors.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final manualStateProvider = Provider<AsyncValue<int>>((ref) {
  const flag = 1;
  if (flag == 0) {
    return const AsyncValue.loading();
  }
  if (flag == 1) {
    return const AsyncValue.data(42);
  }
  return AsyncValue.error(Exception('boom'), StackTrace.current);
});

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final s = ref.watch(manualStateProvider);
          return MaterialApp(
            home: Scaffold(
              body: Center(child: Text(s.toString())),
            ),
          );
        },
      ),
    ),
  );
}
```

---

### 2、请求中：在 Notifier 内操纵状态

`AsyncValue.guard`

**作用**：把「`try/catch` + 成功写 `data` / 失败写 `error`」收敛为一次 `await`；得到新的 `AsyncValue<T>`，常用于 `AsyncNotifier` 的 mutation 方法。

**完整示例**：

```dart
// file: example_async_value_guard.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class CounterNotifier extends AsyncNotifier<int> {
  @override
  Future<int> build() async => 0;

  Future<void> bump() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await Future<void>.delayed(const Duration(milliseconds: 50));
      if (state.hasValue && state.requireValue >= 3) {
        throw StateError('too large');
      }
      return state.maybeWhen(data: (v) => v + 1, orElse: () => 1);
    });
  }
}

final counterProvider =
    AsyncNotifierProvider<CounterNotifier, int>(CounterNotifier.new);

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final async = ref.watch(counterProvider);
          return MaterialApp(
            home: Scaffold(
              body: Center(
                child: async.when(
                  data: (v) => Text('value: $v'),
                  error: (e, _) => Text('error: $e'),
                  loading: () => const CircularProgressIndicator(),
                ),
              ),
              floatingActionButton: FloatingActionButton(
                onPressed: () => ref.read(counterProvider.notifier).bump(),
                child: const Icon(Icons.add),
              ),
            ),
          );
        },
      ),
    ),
  );
}
```

`ref.onDispose`

**作用**：在 provider **即将销毁**（含 `autoDispose` 无人监听、或 `invalidate/refresh` 触发重建前等场景）时执行清理，例如取消 `CancelToken`、关流、关控制器。

**完整示例**：

```dart
// file: example_ref_on_dispose.dart
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final tickProvider = StreamProvider.autoDispose<int>((ref) {
  final controller = StreamController<int>();
  var n = 0;
  final timer = Timer.periodic(
    const Duration(seconds: 1),
    (_) {
      n += 1;
      if (!controller.isClosed) controller.add(n);
    },
  );
  ref.onDispose(() {
    timer.cancel();
    unawaited(controller.close());
  });
  return controller.stream;
});

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final async = ref.watch(tickProvider);
          return MaterialApp(
            home: Scaffold(
              body: Center(
                child: async.when(
                  data: (v) => Text('tick: $v'),
                  error: (e, _) => Text('$e'),
                  loading: () => const CircularProgressIndicator(),
                ),
              ),
            ),
          );
        },
      ),
    ),
  );
}
```

`ref.keepAlive()`

**作用**：在 **`autoDispose`** 模式下，暂时**阻止**「无人监听就销毁」；返回 `KeepAliveLink`，调用 `close()` 后恢复可销毁行为。适合缓存一次成功的网络结果直到你主动释放。

**完整示例**：

```dart
// file: example_ref_keep_alive.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final cachedProvider = FutureProvider.autoDispose<String>((ref) async {
  final link = ref.keepAlive();
  ref.onDispose(link.close);
  await Future<void>.delayed(const Duration(milliseconds: 200));
  return 'loaded-once';
});

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final async = ref.watch(cachedProvider);
          return MaterialApp(
            home: Scaffold(
              body: Center(
                child: async.when(
                  data: (s) => Text(s),
                  error: (e, _) => Text('$e'),
                  loading: () => const CircularProgressIndicator(),
                ),
              ),
            ),
          );
        },
      ),
    ),
  );
}
```

---

### 3、请求后：读取、转换、分流（`AsyncValue` API）

#### `state.when`

**作用**：**穷尽**处理 data / error / loading 三种分支，返回同一类型 `T`（常用于直接 `return Widget`）。带 `skipLoadingOnReload` / `skipLoadingOnRefresh` / `skipError` 控制「多状态并存」时走哪条分支（见源码文档说明）。

**完整示例**：见上文 `example_async_value_guard.dart` 中 `async.when(...)`。

#### `whenData`

**作用**：只对 **data** 做映射，得到**新的** `AsyncValue<NewT>`；loading/error 分支会保留相应形态（适合链式数据变换）。

**完整示例**：

```dart
// file: example_when_data.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final rootProvider = FutureProvider<int>((ref) async => 21);

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final doubled = ref.watch(rootProvider).whenData((v) => v * 2);
          return MaterialApp(
            home: Scaffold(
              body: Center(
                child: doubled.when(
                  data: (v) => Text('doubled: $v'),
                  error: (e, _) => Text('$e'),
                  loading: () => const CircularProgressIndicator(),
                ),
              ),
            ),
          );
        },
      ),
    ),
  );
}
```

#### `hasValue` / `value` / `requireValue`

**作用**：

- `hasValue`：是否已有成功值（可能与 `isLoading` / `hasError` 同时为 true，例如刷新中）。  
- `value`：读取当前关联值；在 loading/error 时**可能**仍是上一版值（Riverpod 3 用其替代旧版 `valueOrNull` 的常见用法）。  
- `requireValue`：**强制**当前必须可读出值，否则抛错（适合逻辑层已保证必有值）。

**完整示例**：

```dart
// file: example_value_accessors.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final oneProvider = FutureProvider<int>((ref) async => 7);

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final async = ref.watch(oneProvider);
          final summary = StringBuffer()
            ..writeln('hasValue: ${async.hasValue}')
            ..writeln('value: ${async.value}')
            ..writeln(
              () {
                try {
                  return 'requireValue: ${async.requireValue}';
                } catch (e) {
                  return 'requireValue threw: $e';
                }
              }(),
            );
          return MaterialApp(
            home: Scaffold(
              body: Center(child: Text(summary.toString())),
            ),
          );
        },
      ),
    ),
  );
}
```

#### `maybeWhen`

**作用**：只处理关心的分支，其余走 `orElse`（不必写满三个回调）。

**完整示例**：

```dart
// file: example_maybe_when.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final flagProvider = StateProvider<int>((ref) => 0);

final derivedProvider = Provider<AsyncValue<String>>((ref) {
  final flag = ref.watch(flagProvider);
  if (flag == 0) return const AsyncValue.loading();
  if (flag == 1) return const AsyncValue.data('ok');
  return AsyncValue.error('bad', StackTrace.current);
});

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final text = ref.watch(derivedProvider).maybeWhen(
                data: (s) => 'data: $s',
                orElse: () => 'not only-data state',
              );
          return MaterialApp(
            home: Scaffold(
              body: Center(child: Text(text)),
              floatingActionButton: FloatingActionButton(
                onPressed: () {
                  ref.read(flagProvider.notifier).state =
                      (ref.read(flagProvider) + 1) % 3;
                },
                child: const Icon(Icons.swap_horiz),
              ),
            ),
          );
        },
      ),
    ),
  );
}
```

#### `whenOrNull`

**作用**：与 `maybeWhen` 类似，但未处理的分支返回 **null**（适合简短链式调用）。

**完整示例**：

```dart
// file: example_when_or_null.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final sampleProvider = Provider<AsyncValue<int>>(
  (ref) => const AsyncValue.data(99),
);

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final label =
              ref.watch(sampleProvider).whenOrNull(data: (v) => 'n=$v') ??
                  'no data branch';
          return MaterialApp(
            home: Scaffold(body: Center(child: Text(label))),
          );
        },
      ),
    ),
  );
}
```

#### `map` / `maybeMap` / `mapOrNull`

**作用**：

- `map`：回调接收 **`AsyncData` / `AsyncError` / `AsyncLoading` 完整对象**，适合需要子类型上额外字段时。  
- `maybeMap`：未覆盖的分支走 `orElse`。  
- `mapOrNull`：未覆盖分支返回 **null**。

**完整示例**：

```dart
// file: example_map_family.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final triStateProvider = Provider<AsyncValue<int>>((ref) {
  return AsyncLoading<int>(progress: 0.4);
});

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final s = ref.watch(triStateProvider);
          final viaMap = s.map(
            data: (d) => 'data ${d.value}',
            error: (e) => 'err ${e.error}',
            loading: (l) => 'loading p=${l.progress}',
          );
          final viaMaybe = s.maybeMap(
            loading: (l) => 'only-loading: ${l.progress}',
            orElse: () => 'other',
          );
          final viaOrNull = s.mapOrNull(
            loading: (l) => 'mapOrNull loading ${l.progress}',
          );
          return MaterialApp(
            home: Scaffold(
              body: Center(
                child: Text(
                  '$viaMap\n$viaMaybe\n$viaOrNull',
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          );
        },
      ),
    ),
  );
}
```

#### `unwrapPrevious`

**作用**：去掉「携带上一状态」的包装，把多态视图**折叠**成单纯的 loading / data / error 之一；用于避免 UI 在刷新时误把「上一版 data + loading」当成纯 loading 闪烁（常配合 `ref.watch(provider).unwrapPrevious()`）。

**完整示例**：

```dart
// file: example_unwrap_previous.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ReloadNotifier extends AsyncNotifier<int> {
  @override
  Future<int> build() async => 1;

  Future<void> reload() async {
    state = await AsyncValue.guard(() async {
      await Future<void>.delayed(const Duration(milliseconds: 100));
      return state.requireValue + 10;
    });
  }
}

final reloadProvider =
    AsyncNotifierProvider<ReloadNotifier, int>(ReloadNotifier.new);

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final raw = ref.watch(reloadProvider);
          final flat = raw.unwrapPrevious();
          return MaterialApp(
            home: Scaffold(
              body: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text('raw: $raw'),
                    Text('unwrapPrevious: $flat'),
                  ],
                ),
              ),
              floatingActionButton: FloatingActionButton(
                onPressed: () =>
                    ref.read(reloadProvider.notifier).reload(),
                child: const Icon(Icons.refresh),
              ),
            ),
          );
        },
      ),
    ),
  );
}
```

---

### 4、请求前 / 后：失效、立即重算、监听生命周期

#### `ref.invalidate(provider)`

**作用**：标记 provider **失效**；下一次被读取时再执行 `build`（不会强制立刻执行）。

#### `ref.refresh(provider)`

**作用**：等价于 **`invalidate` + 立即 `read`**，立刻触发重算并拿到新状态（适合下拉刷新、重试按钮）。

**完整示例**：

```dart
// file: example_invalidate_refresh.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final timeProvider = FutureProvider<String>((ref) async {
  await Future<void>.delayed(const Duration(milliseconds: 150));
  return DateTime.now().toIso8601String();
});

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final async = ref.watch(timeProvider);
          return MaterialApp(
            home: Scaffold(
              body: Center(
                child: async.when(
                  data: (s) => Text(s),
                  error: (e, _) => Text('$e'),
                  loading: () => const CircularProgressIndicator(),
                ),
              ),
              persistentFooterButtons: [
                TextButton(
                  onPressed: () => ref.invalidate(timeProvider),
                  child: const Text('invalidate'),
                ),
                TextButton(
                  onPressed: () {
                    ref.refresh(timeProvider);
                  },
                  child: const Text('refresh'),
                ),
              ],
            ),
          );
        },
      ),
    ),
  );
}
```

#### `ref.onCancel`

**作用**：当 **最后一个监听者被移除**时触发（provider 可能进入 pause / `autoDispose` 清理链路）；**不保证**之后一定会 dispose（可能马上又有新监听）。适合与 `keepAlive` 组合做高级缓存控制。

**完整示例**：

```dart
// file: example_ref_on_cancel.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final logProvider = StateProvider<List<String>>((ref) => []);

final listenOnceProvider = Provider.autoDispose<void>((ref) {
  ref.onCancel(() {
    final logs = [...ref.read(logProvider)];
    logs.add('onCancel at ${DateTime.now()}');
    ref.read(logProvider.notifier).state = logs;
  });
});

class TogglePage extends ConsumerStatefulWidget {
  const TogglePage({super.key});

  @override
  ConsumerState<TogglePage> createState() => _TogglePageState();
}

class _TogglePageState extends ConsumerState<TogglePage> {
  bool show = true;

  @override
  Widget build(BuildContext context) {
    if (show) ref.watch(listenOnceProvider);
    final logs = ref.watch(logProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('onCancel demo')),
      body: ListView(
        children: logs.map(Text.new).toList(),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => show = !show),
        child: Icon(show ? Icons.visibility : Icons.visibility_off),
      ),
    );
  }
}

void main() {
  runApp(
    const ProviderScope(
      child: MaterialApp(home: TogglePage()),
    ),
  );
}
```

---

### 5、性能：细粒度监听 `select`

**作用**：`ref.watch(provider.select((state) => ...))` 只在 selector 返回值按 `==` 变化时重建，减少无关字段变化带来的 rebuild。

**完整示例**：

```dart
// file: example_select.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ProfileNotifier extends Notifier<(String name, int age)> {
  @override
  (String, int) build() => ('Ann', 20);

  void rename(String name) => state = (name, state.$2);

  void birthday() => state = (state.$1, state.$2 + 1);
}

final profileProvider =
    NotifierProvider<ProfileNotifier, (String, int)>(ProfileNotifier.new);

void main() {
  runApp(
    ProviderScope(
      child: Consumer(
        builder: (context, ref, _) {
          final name = ref.watch(
            profileProvider.select((p) => p.$1),
          );
          return MaterialApp(
            home: Scaffold(
              body: Center(child: Text('name: $name')),
              persistentFooterButtons: [
                TextButton(
                  onPressed: () =>
                      ref.read(profileProvider.notifier).rename('Bob'),
                  child: const Text('rename'),
                ),
                TextButton(
                  onPressed: () =>
                      ref.read(profileProvider.notifier).birthday(),
                  child: const Text('age++'),
                ),
              ],
            ),
          );
        },
      ),
    ),
  );
}
```

---

### 6、建议阅读顺序

1. 先掌握 **`AsyncValue` 三种构造** 与 **`when` / `map`** 的分流差异。  
2. 在 `AsyncNotifier` 内用 **`AsyncValue.guard`** 写 mutation。  
3. 用 **`invalidate` / `refresh`** 表达刷新语义；用 **`onDispose` / `onCancel` / `keepAlive`** 管理资源与缓存。  
4. 遇到刷新闪烁再查阅 **`unwrapPrevious`** 与 `when` 的 **skip** 参数。

以上示例均为「单文件 + `ProviderScope` + `runApp`」的最小可运行骨架，可按需拷贝到 `example/` 目录用 `flutter run` 验证。



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