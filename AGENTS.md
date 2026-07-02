<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

## 开发规范

- Vue 组件命名遵循 Vue 官方风格指南，统一使用多单词组件名，避免单词组件名。
- 公共组件放置在 `src/components` 下，组件文件名采用 PascalCase，例如 `AppSvgIcon.vue`、`AppLocaleSwitcher.vue`。
- 页面级组件放置在 `src/views` 下，按业务模块建立小写目录，并以 `index.vue` 作为模块入口，例如 `src/views/home/index.vue`。
- 页面私有子组件统一放置在对应页面目录的 `components` 子目录下，组件文件名同样采用 PascalCase。
- 布局组件放置在 `src/layouts` 下，按布局语义命名，避免与业务页面组件混用。
- Pinia store 按模块组织，模块目录使用业务模块名，入口统一为 `index.ts`，例如 `src/stores/locale/index.ts`。
- Pinia 全局实例、插件注册等 store 基础设施统一收敛到 `src/stores/index.ts`。
- 国际化资源统一放置在 `src/locales` 下，语言包放置在 `src/locales/messages`，语言类型和 i18n 初始化逻辑集中维护。
- 公共常量统一放置在 `src/constants` 下，按领域或模块拆分文件，避免在业务代码中散落魔法值。
- 公共工具函数统一放置在 `src/utils` 下，函数应保持无副作用或明确声明副作用。
- 公共组合式函数统一放置在 `src/hooks` 下，命名采用 `useXxx` 格式。
- 公共自定义指令统一放置在 `src/directives` 下，指令命名应表达明确行为语义。
- 公共静态资源统一放置在 `src/assets` 下，并按资源类型拆分目录，例如 `icons`、`images`、`styles`、`fonts`。
- 全局样式、样式变量、mixin、reset/base 样式统一放置在 `src/assets/styles` 下。
- CSS class 命名采用 BEM 规范，业务样式应以模块或组件语义作为 block。
- 文件夹命名统一使用小写，多个单词使用 kebab-case。
- TypeScript 类型定义优先就近维护；模块私有类型放在模块内 `types.ts`，跨模块共享类型放在 `src/types`。
- 新增公共能力前，应优先检查 `components`、`constants`、`utils`、`hooks`、`directives`、`stores` 中是否已有可复用实现，避免重复建设。

<!--VITE PLUS END-->
