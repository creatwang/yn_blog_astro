---
title: 'flutter 依赖'

---



# flutter 依赖

~~~yml
name: groe_app_pad
description: "A new Flutter project."
publish_to: 'none' # Remove this line if you wish to publish to pub.dev
version: 1.0.0+1
environment:
  sdk: ^3.9.2
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  cupertino_icons: ^1.0.8
  collection: ^1.19.1
  dio: ^5.9.2
  flutter_riverpod: ^3.0.0
  go_router: ^17.1.0
  responsive_framework: ^1.5.1
  flutter_secure_storage: ^10.0.0
  webview_flutter: ^4.13.1
  flutter_staggered_grid_view: ^0.7.0
  mobile_scanner: ^7.2.0

  intl: any
  shared_preferences: ^2.5.5
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0
  flutter_gen_runner: ^5.13.0+1
  build_runner: ^2.9.0
flutter:
  generate: true
  uses-material-design: true
  assets:
    - assets/images/
    - assets/html/
flutter_gen:
  output: lib/gen/
  line_length: 100
~~~

## 项目信息

| 项   | 说明                                                |
| :--- | :-------------------------------------------------- |
| 名称 | `groe_app_pad`                                      |
| SDK  | `^3.9.2`（Dart 3.9 及以上）                         |
| 发布 | `publish_to: 'none'` 表示不发布到 pub.dev，私有应用 |

------

## `dependencies`（运行时依赖）

| 依赖                        | 版本约束 | 作用简述                                                     |
| :-------------------------- | :------- | :----------------------------------------------------------- |
| flutter                     | SDK      | Flutter 框架本体。                                           |
| flutter_localizations       | SDK      | 官方本地化（`MaterialApp` 的 `localizationsDelegates` 等），与 `intl`、ARB 生成代码配合做多语言。 |
| cupertino_icons             | ^1.0.8   | iOS 风格图标字体，配合 `CupertinoIcons` 使用。               |
| collection                  | ^1.19.1  | 集合工具（如 `groupBy`、`firstWhereOrNull` 等），减少手写循环与空安全样板代码。 |
| dio                         | ^5.9.2   | HTTP 客户端：拦截器、超时、下载、FormData 等，适合对接 REST API（项目里建议与统一 `Dio` 实例、拦截器一起用）。 |
| flutter_riverpod            | ^3.0.0   | 状态管理与依赖注入：`Provider` / `Notifier` 等，与 UI 解耦、可测试。 |
| go_router                   | ^17.1.0  | 声明式路由与深链接，替代手写 `Navigator` 栈管理，适合多页面/平板布局。 |
| responsive_framework        | ^1.5.1   | 响应式断点、缩放或约束布局，让同一套 UI 在不同屏幕宽度下更易适配。 |
| flutter_secure_storage      | ^10.0.0  | 安全存储（Keychain / Keystore 等），适合存 token、密钥等敏感数据，优于明文 `SharedPreferences`。 |
| webview_flutter             | ^4.13.1  | 内嵌 WebView，用于展示 H5、活动页、文档等与 `assets/html/` 本地页配合。 |
| flutter_staggered_grid_view | ^0.7.0   | 瀑布流/不规则网格（多列高度不一），适合图片墙、卡片瀑布布局。 |
| mobile_scanner              | ^7.2.0   | 相机扫码（二维码/条码等），依赖平台相机权限与原生实现。      |
| intl                        | any      | 日期/数字/消息格式化；`flutter_localizations` 与 `gen-l10n` 常会间接依赖它，`any` 表示由解析器选兼容版本（注意：生产环境若需可复现构建，可改为固定版本范围）。 |
| shared_preferences          | ^2.5.5   | 轻量键值持久化（用户设置、非敏感标记等），数据存于平台偏好存储，不宜存高敏感信息。 |

------

## `dev_dependencies`（仅开发/构建）

| 依赖               | 版本约束  | 作用简述                                                     |
| :----------------- | :-------- | :----------------------------------------------------------- |
| flutter_test       | SDK       | 单元测试、Widget 测试、`flutter test` 所需。                 |
| flutter_lints      | ^5.0.0    | 官方推荐 lint 集合，配合 `analysis_options.yaml` 统一代码风格与静态检查。 |
| build_runner       | ^2.9.0    | 运行代码生成任务的总入口（监听模式 `watch`、一次性 `build`）。 |
| flutter_gen_runner | ^5.13.0+1 | 根据 `pubspec` 的 `flutter.assets` 等生成类型安全的资源访问代码（与下方 `flutter_gen` 配置对应）。 |

------

## `flutter` 与 `flutter_gen`（与依赖相关的配置）

| 配置                         | 作用                                                         |
| :--------------------------- | :----------------------------------------------------------- |
| generate: true               | 启用 Flutter 内置生成器（例如 gen-l10n，从 `l10n.yaml` + ARB 生成 `app_localizations*.dart`）。 |
| uses-material-design: true   | 打包 Material 图标字体。                                     |
| assets                       | `assets/images/`、`assets/html/` 声明给打包与（可选）`flutter_gen` 扫描。 |
| flutter_gen.output: lib/gen/ | 将 `flutter_gen` 生成的资源 Dart 代码输出到 `lib/gen/`，避免手写字符串路径。 |
| flutter_gen.line_length: 100 | 生成代码换行宽度，与团队格式化习惯对齐。                     |

------

## 使用上的简短建议

1. `intl: any`：能少操心版本冲突，但 CI 可重复性略差；若团队介意，可改为例如 `intl: ^0.20.2`（以当前 Flutter 解析结果为准）。
2. 敏感数据：token 等优先 flutter_secure_storage；一般配置用 shared_preferences。
3. 网络：业务层用 dio，路由用 go_router，全局状态用 flutter_riverpod，与你们架构规则里的分层一致即可。

如果你希望这份内容落盘成仓库里的 `docs/DEPENDENCIES.md`，可以说一下目标路径，我可以按你仓库习惯写好一版文件内容（你本地保存或让我改仓库都行）。