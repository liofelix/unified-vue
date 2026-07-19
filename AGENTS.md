<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` when dependencies are missing or dependency manifests have changed.
- [ ] Never create, configure, or use a `.pnpm-store` directory inside this project. Dependencies must be installed into the project `node_modules`.
- [ ] Run `vp check` and `vp test run` to check formatting, lint, types, and tests.
- [ ] Run `vp run build` for release-oriented or build-pipeline changes.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## 角色与基本原则

- 以资深前端工程师标准工作：先读现有实现，再做最小、可维护、可验证的修改。
- 结论必须有仓库代码、配置或文档依据；无法确认时明确说明“不知道”。
- 优先复用已有依赖和公共能力；涉及公共接口、共享基础设施或用户行为时，补充匹配风险的测试。

## 技术栈与文档

- 技术栈：Vue 3、`<script setup lang="ts">`、TypeScript 7、Vite+、Vue Router、Pinia、Vue I18n、Antdv Next、Tailwind CSS 4、Sass、VueUse。
- Antdv Next 文档：https://antdv-next.com/llms-full.txt；Vite+ 文档：`node_modules/vite-plus/docs`。

## 工具链与验证

- 只使用现有依赖；依赖缺失或 `package.json`/`pnpm-lock.yaml` 变化时运行 `vp install`。
- 禁止创建、配置或使用项目内 `.pnpm-store`；依赖必须安装到项目 `node_modules`。
- 提交前运行 `vp check` 和 `vp test run`；发布或构建链路变更再运行 `vp run build`。
- 安装、运行时或包管理异常时运行 `vp env doctor`，并提供输出。

## 目录与模块职责

- 公共组件放 `src/components`，文件名用 PascalCase、多单词命名；页面放 `src/pages/<module>/index.vue`，页面私有组件放同目录 `components`。
- 布局放 `src/layouts`，按布局语义命名；Pinia 按业务模块放 `src/stores/<module>/index.ts`，实例和插件放 `src/stores/index.ts`。
- 国际化资源放 `src/locales/messages`，类型和初始化逻辑放 `src/locales`；常量、工具、组合式函数、指令分别放 `src/constants`、`src/utils`、`src/hooks`、`src/directives`。
- 静态资源放 `src/assets`，按 `icons`、`images`、`styles`、`fonts` 分类；全局样式放 `src/assets/styles`。
- 文件夹使用小写 kebab-case；模块私有类型就近放 `types.ts`，跨模块类型放 `src/types`。
- 新增公共能力前先检查现有 `components`、`constants`、`utils`、`hooks`、`directives`、`stores`，避免重复实现。

## Vue 与 Antdv Next

- Vue 组件使用多单词 PascalCase；SFC 本地方法、事件处理和异步函数优先使用 `const xxx = () => {}`。
- 使用 Antdv Next 前先查文档；组件、类型和静态方法优先从 `antdv-next` 根包导入。
- 模板组件统一使用小写 kebab-case，例如 `<a-button>`，不使用 `<AButton>`。

## TypeScript

- 优先显式类型、类型守卫、泛型和工具类型完成类型收窄；避免无必要的类型断言。
- 类型定义遵循就近原则：模块私有类型不外置，跨模块复用类型统一放 `src/types`。

## CSS 与 BEM

- class 使用 `block__element--modifier`，三部分均使用小写 kebab-case：
  - `block` 是模块或组件语义，如 `app-locale-switcher`。
  - `element` 是 block 内部部分，如 `app-locale-switcher__menu`。
  - `modifier` 是外观、尺寸或变体，如 `app-locale-switcher--compact`。
- block 必须表达业务语义；避免 `container`、`wrapper`、`box`、`left`、`red` 等通用或视觉名称。
- element 必须归属于 block；禁止 `block__element__child`，层级过深时扁平化或拆成新 block。
- modifier 不单独使用；交互状态使用 `is-active`、`is-disabled`、`has-error` 等状态类。
- class 名保持简短清晰，通常不超过 block、element、modifier 三段；避免重复上下文、颜色、像素值、DOM 标签和实现细节。
- Vue SFC SCSS 以 block 为根，使用 `&__element`、`&--modifier`；状态类、伪类和第三方覆盖收敛在对应 block 内，避免全局、HTML 层级和跨 block 深层选择器。
- 正例：`.app-locale-switcher__trigger`、`.app-locale-switcher--compact`、`.is-active`。
- 反例：`.page-home-content-wrapper-left-red`、`.app-locale-switcher__menu__item`、`.blue-box`。
