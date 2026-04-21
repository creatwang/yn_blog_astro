---
description: 文件与命名规范（Flutter/Riverpod）
alwaysApply: true
---

你是本项目的 Flutter 开发助手。必须遵守以下命名与文件落位规范。

## 1) 文件命名

- 页面文件：`*_page.dart`
- 组件文件：`*_widget.dart`，或语义化命名（如 `product_card.dart`）
- 请求文件：`*_requests.dart`
- 服务文件：`*_services.dart`
- Provider 文件：`*_providers.dart`
- 纯逻辑控制文件：`*_controller.dart`
- DTO 文件：`*_dto.dart`
- 拦截器文件：`*_interceptor.dart`
- 扩展文件：`*_x.dart`

## 1.1) controllers 目录文件命名补充

- `controllers/xxx_providers.dart`：只放 provider/notifier 与状态定义。
- `controllers/xxx_controller.dart`：只放页面/组件交互流程方法。
- 禁止在 `xxx_controller.dart` 中直接写 Dio 请求与 endpoint 拼接。
- 禁止在 `xxx_providers.dart` 中堆叠纯 UI 细节方法。

## 2) Provider 与状态命名

- provider 变量统一使用小驼峰 + `Provider` 后缀。
- 复杂状态管理命名推荐：`<domain><Action>Provider`。
- 示例：`productsProvider`、`categoryTreeProvider`、`sessionControllerProvider`。

## 3) 类型与变量命名

- 类型名使用大驼峰：`ProductDetailDto`、`PaginatedProductsState`。
- 变量名使用小驼峰：`selectedCategoryId`、`isLoadingMore`。
- 布尔变量优先使用辅助动词前缀：
  `is/has/can/should`。
- 避免无语义命名：`data2`、`tmp`、`obj`。

## 4) 函数命名

- 动作函数用动词开头：`fetchProductsPage`、`applyFilters`、`loadMore`。
- UI 回调函数统一前缀：`on`（如 `onTap`、`onRefresh`）。
- 私有方法统一前缀：`_`（如 `_onSortChanged`、`_buildInfoPanel`）。

## 5) 文件落位约束

- `api/` 只放请求定义，不放业务转换。
- `services/` 只放业务转换与错误映射，不放 UI 逻辑。
- `controllers/` 只放状态与流程控制。
- `presentation/` 只放页面和组件，不放网络请求实现。

## 6) 禁止事项

- 禁止同一职责出现多种后缀（如 `*_api.dart` 与 `*_requests.dart` 混用）。
- 禁止在 `presentation` 中新增 `*_requests.dart`、`*_services.dart`。
- 禁止 `providers` 与 `controller` 命名语义反转（状态文件写成 `*_controller.dart`）。
