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
- 默认语言来自运行时配置 `appLocale`，支持 `zh-CN` 和 `en-US`；已有持久化语言优先于该默认值。

## 运行时配置

应用运行时配置位于 `public/config/app.config.js`，由 `index.html` 在应用入口脚本之前加载并注入到 `window.APP_CONFIG`。

```ts
interface AppConfig {
  appTitle: string
  appLocale: AppLocale
}
```

```js
window.APP_CONFIG = {
  appTitle: 'Unified Vue',
  appLocale: 'zh-CN',
}
```

业务代码通过 `src/hooks/useAppConfig.ts` 统一读取配置。`appTitle` 用于设置浏览器页面标题，`appLocale` 用于设置应用默认语言。构建后可直接修改 `dist/config/app.config.js`，无需重新构建应用。

## 项目目录约定

页面统一放在 `src/pages/<module>/index.vue`，页面私有组件放在对应页面目录的 `components` 子目录。当前首页入口为 `src/pages/home/index.vue`。

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

TypeScript 7 checks the project's TypeScript sources with the `tsc` CLI. Vue SFC template type checking is not currently available through `vue-tsc` because its launcher is not compatible with TypeScript 7. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

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
