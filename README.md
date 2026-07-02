# unified-vue

`unified-vue` 是一个基于 Vue 3 和 Vite+ 的前端项目，使用 Pinia 管理全局状态，使用 `vue-i18n` 管理应用文案，使用 Antdv Next 作为组件库。

## 语言切换

应用入口在 `src/main.ts` 中注册 Pinia、`vue-i18n`、路由和 SVG 图标符号表。`src/App.vue` 通过 `a-config-provider` 注入当前 Antdv Next 语言包，并在启动时初始化语言状态。

`src/components/AppLocaleSwitcher.vue` 提供语言切换入口：

- 使用图标型文本按钮展示 `common-language` SVG 图标。
- 通过 Antdv Next `a-dropdown` 展示 `简体中文` 和 `English` 两个菜单项。
- 菜单选中项来自 `src/stores/locale/index.ts` 中的 `locale`。
- 切换语言时同步更新 `vue-i18n`、`dayjs` 和 Antdv Next 的 locale。
- 当前语言会通过 `pinia-plugin-persistedstate` 持久化。

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
vp install
```

### Compile and Hot-Reload for Development

```sh
vp dev
```

### Type-Check, Compile and Minify for Production

```sh
vp run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
vp test
```
