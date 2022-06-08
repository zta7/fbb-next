import { boot } from 'quasar/wrappers'
import { Quasar } from 'quasar'
import { setLocale as setVeeValidateLocal } from '@vee-validate/i18n'
import { useConfigStore } from 'src/stores/user'
import { i18n } from './i18n'

export const localeMap = {
  zh: 'zh-CN',
  en: 'en-US',
}

export const localeOptions = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
]

export const setLocale = (v) => {
  const $config = useConfigStore()
  const locale = v || $config.locale
  setVeeValidateLocal(locale)
  i18n.locale = locale
  import(
    `quasar/lang/${localeMap[locale]}`
  ).then((lang) => {
    Quasar.lang.set(lang.default)
  })
}

export default boot(() => {
  setLocale()
})
