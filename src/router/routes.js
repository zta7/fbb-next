import { types } from 'define/blocks'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        children: [
          {
            path: `:type(${types.join('|')}).:id`,
            name: 'Block',
            props: true,
            component: () => import('pages/BlockPage.vue'),
            children: [
              {
                path: ':treeSelected',
                name: 'treeSelected',
                component: () => import('components/block/BlockMain.vue'),
                props: true,
              },
              // {
              //   path: 'ecc',
              //   name: 'ECC',
              //   component: () => import('components/block/BlockECC.vue'),
              // },
              // {
              //   path: 'properties',
              //   name: 'Properties',
              //   component: () => import('components/block/BlockProperties.vue'),
              // },
            ],
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
