import layout from '@/layout/layout'
const grab = {
  path: '/grab',
  name: 'grabindex',
  component: layout,
  redirect: '/grab/index',
  children: [{
    path: 'index',
    component: () => import('@v/grab/index.vue')
  },
  {
    path: 'list',
    component: () => import('@v/grab/list.vue')
  },
  {
    path: 'report',
    component: () => import('@v/grab/report.vue')
  },
  {
    path: 'togother',
    component: () => import('@v/grab/togother.vue')
  },
  {
    path: 'result',
    component: () => import('@v/grab/result.vue')
  },
  {
    path: 'rule',
    component: () => import('@v/grab/rule.vue')
  }
  ]
}
export default grab
