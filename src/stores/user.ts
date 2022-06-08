import { defineStore } from 'pinia'
import { watch } from 'vue'
import { LocalStorage, Quasar } from 'quasar'

export enum ViewEnum {
  Namespace = 'namespace',
  Type = 'type'
}

export class Config {
  view = ViewEnum.Type
  typesSort = ['BasicFunctionBlock', 'SubApplication', 'HMI', 'Adapter', 'CompositeFunctionalBlock', 'CustomDataStructure', 'ServiceFunctionBlock', 'SimpleFunctionBlock', 'SystemConfiguration']
  selected = 'All'
  namespacesSort: string[] = []
  blocks = {}
  openedBlockIds: string[] = []
  locale = Quasar.lang.getLocale()

  constructor(data: Partial<Config> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<Config> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}

export const useConfigStore = defineStore('configs', {
  state: () => (({ ...new Config(LocalStorage.getItem('configs') as Config) })),
})

const configStore = useConfigStore()
watch(configStore.$state, (n) => LocalStorage.set('configs', n), { deep: true, immediate: true })
