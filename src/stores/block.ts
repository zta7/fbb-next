import { defineStore } from 'pinia'
import { flatten, groupBy } from 'lodash'
import blockConfig from 'src/define/blocks'
import { Block } from 'src/models/Block'

const data = flatten([
  ...Array.from(Object.keys(blockConfig), (e, i) => Array.from({ length: 30 }, (e2, i2) => (
    new Block({
      type: e, name: `${i2}`, namespace: `${i}.${i2}`, id: `${i}.${i2}`,
    })
  ))),
])

console.log(groupBy(data, 'type'))

export const useBlockStore = defineStore('block', {
  state: () => ({
    blocks: data,
    block: null as Block | null,
  }),
  getters: {
    namespaces: (state) => state.blocks.map((e) => e.namespace),
  },
})
