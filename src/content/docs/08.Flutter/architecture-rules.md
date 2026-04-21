---
description: Flutter 项目目录与网络分层规范（Riverpod）
alwaysApply: true
---
-----注意：使用时删除掉此代码，修改文件后缀为mdc,mdc是为了特定的工具(ai|cursor|nuxt)开发的增强版本------

你是本项目的 Flutter 开发助手。必须遵守以下目录与分层规则。
## 1) 目录架构（必须遵守）
- `lib/app/`：应用级配置（路由、主题、启动装配）。
- `lib/core/`：基础设施（网络客户端、拦截器、存储、平台服务）。
- `lib/shared/`：跨模块复用（通用 widgets、extensions、utils）。
- `lib/features/<feature>/`：按功能模块组织代码，模块内部自包含。

`lib/features/<feature>/` 下必须包含以下 5 个目录：
- `api/`：仅定义 HTTP 请求（路径、参数、method、响应约定）。
- `services/`：调用 `api/` 后做业务数据处理与错误转换。
- `models/`：DTO/实体/序列化结构。
- `controllers/`：Riverpod providers/notifiers（状态管理）。
- `presentation/pages|widgets/`：页面与组件。

`presentation/` 下不允许再放 `controllers` 等跨职责目录，需保持同级分层。

## 1.1) controllers 目录命名与职责（强制）

`controllers/` 下有且仅有两类文件：

- `*_providers.dart`
  - 负责响应式状态管理与数据流。
  - 调用 `services/` 获取处理后的数据，再同步到 provider/notifier。
  - 承载 loading/data/error、分页、筛选等可观察状态。

- `*_controller.dart`
  - 负责纯交互流程与页面动作编排（非网络底层逻辑）。
  - 例如：复杂表单交互、局部操作流程、组件动作聚合。
  - 处理后同步到 widgets 局部状态，或触发 provider 动作。
## 2) 命名规范（必须）
- 页面：`*_page.dart`
- 组件：`*_widget.dart` 或语义化组件名（如 `product_card.dart`）
- Provider/Notifier：`*_providers.dart`
- 纯逻辑控制文件：`*_controller.dart`
- 请求文件：`*_requests.dart`
- 服务文件：`*_services.dart`
- DTO/模型：`*_dto.dart` / 语义化模型名
- 拦截器：`*_interceptor.dart`
- 变量命名使用语义化辅助动词：`isLoading`、`hasError`、`canLoadMore`
## 3) 网络实例管理（必须集中）
网络客户端实例统一放在：
- `lib/core/platform_services/network_clients.dart`（或项目约定同级文件）
允许的客户端类型（按项目实际维护）：
- `publicDioClient`：无需鉴权接口
- `protectedDioClient`：需要 token 的接口
- 新增其他实例时，统一放在该文件并注明用途
禁止在 `pages/widgets` 内部创建 `Dio()` 实例。
## 4) 请求调用链路（强制）
必须遵循以下调用顺序：
`presentation -> controllers(provider/notifier) -> services -> api(requests) -> network client`
### 4.1 在哪里调用请求
- `pages/widgets` 只允许触发 controller 行为（`ref.read(...notifier)`）。
- 实际 HTTP 调用只能发生在 `services` 调用 `api` 的过程中。
- `controllers` 不直接拼 URL，不直接处理底层 Dio 细节。
### 4.2 在哪里处理逻辑
- 参数映射、响应结构适配、错误转换：`services/`
- 原始请求定义（endpoint、query/body）：`api/`
- 视图状态（loading/data/error、分页）：`controllers/`
- 纯展示与交互：`presentation/`
## 5) 错误处理规范
- `services` 将底层错误转换为统一业务错误类型（如 `AppException`）。
- `controllers` 负责将错误状态暴露给 UI（AsyncValue/State）。
- `presentation` 不解析后端错误结构，只消费可展示的 message。

## 5.1) 组件方法抽取规划（必须遵守）

- 以下场景允许保留在 widget 私有方法：
  - 一次性、仅本页面使用、少于 10-15 行的简单 UI 交互。
  - 不涉及跨组件复用，不涉及多步骤流程编排。

- 以下场景必须抽到 `*_controller.dart`：
  - 同一页面存在多段相互依赖的交互流程。
  - 单个方法过长（> 15-20 行）或同类逻辑重复出现。
  - 需要复用到多个 widgets/pages 的本地流程逻辑。
  - 页面可读性明显下降，导致 build/回调难维护。

- 以下场景必须放在 `*_providers.dart` 而不是 `*_controller.dart`：
  - 需要响应式共享、持久化或被多个 widget 订阅的状态。
  - 需要和 `services/` 的数据请求结果形成状态闭环。
## 6) 禁止事项（必须避免）
- 禁止在 `presentation` 中直接 import `dio` 并发送请求。
- 禁止在 `api` 中写业务逻辑（如价格计算、列表合并、权限分支）。
- 禁止跨 feature 直接引用对方 `api/services` 内部实现（通过 provider 或公共抽象）。
- 禁止为简单逻辑引入多层 provider 相互监听，避免可读性下降。
## 7) 新增接口时的标准步骤
1. 在 `features/<feature>/api/*_requests.dart` 添加请求函数。
2. 在 `features/<feature>/services/*_services.dart` 添加业务包装与数据转换。
3. 在 `features/<feature>/controllers/*_providers.dart` 暴露 provider/notifier。
4. 在 `presentation` 通过 `ref.watch/ref.read` 使用，不直接请求网络。