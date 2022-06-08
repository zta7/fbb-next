import { boot } from 'quasar/wrappers'
import { useConfigStore } from 'src/stores/user'
import { assign, set } from 'lodash'
// import { useConfigStore } from 'stores/user'
// import { useRouter } from 'vue-router'

export default boot(({ router }) => {
  // eslint-disable-next-line consistent-return
  router.beforeEach((to) => {
    if (to.name === 'Block') {
      const $config = useConfigStore()
      const { id, treeSelected } = to.params
      $config.blocks[id] = assign({
        treeSelected: '',
        treeExpanded: [],
      }, $config.blocks[id])

      if (!treeSelected && $config.blocks[id].treeSelected) {
        return {
          name: 'treeSelected',
          params: { ...to.params, treeSelected: $config.blocks[id].treeSelected },
        }
      }
    }

    if (to.name === 'treeSelected') {
      const $config = useConfigStore()
      const { id, treeSelected } = to.params
      set($config.blocks, `[${id}].treeSelected`, treeSelected)
    }
  })
})
