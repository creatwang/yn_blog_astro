---

description: Flutter/Riverpod 编码基础规范
alwaysApply: true
---

您精通 Flutter、Dart、Riverpod、Freezed、Flutter Hooks。

关键原则

- 编写简洁、技术性强的 Dart 代码，并提供准确的示例。
- 在适当情况下使用函数式和声明式编程模式。
- 优先使用组合而非继承。
- 使用带有辅助动词的描述性变量名（例如：isLoading、hasError）。
- 组织文件结构：导出的 widget、子 widget、helpers、静态内容、types。

Dart/Flutter

- 对不可变 widget 使用 const 构造函数。
- 利用 Freezed 处理不可变状态类和联合体。
- 对简单函数和方法使用箭头语法。
- 优先使用表达式体实现单行 getter 和 setter。
- 使用尾随逗号以改善格式和差异比较。

错误处理和验证

- 在视图中使用 SelectableText.rich 而非 SnackBars 实现错误提示。
- 使用红色在 SelectableText.rich 中显示错误信息，提高可见性。
- 处理屏幕中的空状态。
- 在 Riverpod 状态（如 StateNotifier/AsyncNotifier）中统一管理错误和加载状态。

Riverpod 特定指南

- provider 通常用于响应式共享状态。
- 非响应式、一次性、局部逻辑禁止强行上 provider。
- 禁止为简单流程引入多层 provider 相互监听。
- 简单状态优先使用 StateProvider/NotifierProvider。
- 异步数据优先使用 FutureProvider 或 AsyncNotifierProvider。
- 复杂业务状态使用 NotifierProvider 或 AsyncNotifierProvider。
- 状态类优先使用 Freezed 保证不可变性和可读性。
- 使用有意义的 provider 命名（如 userProfileProvider、cartControllerProvider）。
- 在 UI 中优先使用 `ref.watch()` 订阅状态，使用 `ref.read()` 触发动作。
- 对副作用（导航、弹窗、日志）使用 `ref.listen()` 处理。
- 避免在 build 中执行副作用；副作用放入监听器或 provider 内部流程。

性能优化

- 尽可能使用 const widget 以优化重建。
- 实现列表视图优化（例如：ListView.builder）。
- 静态图片优先使用 AssetImage。
- 远程图片优先使用 cached_network_image。
- 使用 `select`/细粒度 provider 拆分减少不必要重建。

关键约定

1. 使用 GoRouter 或 auto_route 进行导航和深度链接。
2. 针对 Flutter 性能指标（首次有效绘制时间、可交互时间）进行优化。
3. 优先使用无状态 widget：
- 对依赖 Riverpod 状态的 widget，使用 ConsumerWidget 或 Consumer。
- 使用 `ref.listen()` 处理副作用（如导航、显示对话框）。

UI 和样式

- 使用 Flutter 内置组件并按需创建自定义组件。
- 使用 responsive_framework 实现响应式设计。
- 使用主题确保应用内样式一致性。
- 使用 `Theme.of(context).textTheme.titleLarge` 代替 `headline6`，
  使用 `headlineSmall` 代替 `headline5` 等。

组件和 UI 规范

- 创建小型私有组件类，而不是像 `Widget_build` 这样的方法。
- 实现 RefreshIndicator 以支持下拉刷新。
- 文本框中设置合适的 `textCapitalization`、`keyboardType`、
  `textInputAction`。
- 使用 Image.network 时必须包含 `errorBuilder`。

其他

- 调试时使用 `log` 而非 `print`。
- 调试期间，可使用 ProviderObserver 监控 provider 状态变化。
- 代码行长度不超过 80 个字符，多参数函数在右括号前添加逗号。

代码生成

- 使用 build_runner 从注解生成代码（Freezed、JSON 序列化）。
- 修改注解类后，运行：
  `flutter pub run build_runner build --delete-conflicting-outputs`。

文档

- 记录复杂逻辑和非显而易见的代码决策。
- 遵循 Flutter、Riverpod 官方文档最佳实践。
- 有关 Widgets、状态管理和后端集成实践，请参考 Flutter 与
  Riverpod 官方文档。