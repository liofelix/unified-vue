import { beforeEach, describe, expect, it } from 'vite-plus/test'

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import App from '../App.vue'
import i18n from '../locales'
import router from '../router'
import pinia from '../stores'
import { useLocaleStore } from '../stores/locale'

type LocaleMenu = {
  items: Array<{ key: string; label: string }>
  selectable: boolean
  selectedKeys: string[]
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    useLocaleStore(pinia).setLocale('zh-CN')
  })

  it('renders locale dropdown with default locale', async () => {
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [pinia, i18n, router],
      },
    })

    const dropdown = wrapper.getComponent({ name: 'ADropdown' })
    const menu = dropdown.props('menu') as LocaleMenu

    expect(wrapper.find('.app-locale-switcher').exists()).toBe(true)
    expect(wrapper.get('button[aria-label="切换语言"]').attributes('type')).toBe('button')
    expect(wrapper.get('.app-svg-icon use').attributes('href')).toBe('#icon-common-language')
    expect(menu).toMatchObject({
      selectable: true,
      selectedKeys: ['zh-CN'],
      items: [
        { key: 'zh-CN', label: '简体中文' },
        { key: 'en-US', label: 'English' },
      ],
    })
    expect(useLocaleStore(pinia).locale).toBe('zh-CN')
  })

  it('switches locale to English from the dropdown menu', async () => {
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [pinia, i18n, router],
      },
    })

    const dropdown = wrapper.getComponent({ name: 'ADropdown' })

    await dropdown.vm.$emit('menuClick', { key: 'en-US' })
    await nextTick()

    expect(useLocaleStore(pinia).locale).toBe('en-US')
  })
})
