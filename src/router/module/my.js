import layout from '@/layout/layout'
const message = {
  path: '/my',
  name: 'my',
  component: layout,
  redirect: '/my/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/my/index')
    },
    {
      path: 'setting',
      component: () => import('@/views/my/setting'),
      meta: {
        title: '设置'
      }
    },
    {
      path: 'nickname',
      component: () => import('@/views/my/nickname'),
      meta: {
        title: '修改用户昵称'
      }
    },
    {
      path: 'security',
      component: () => import('@/views/my/security'),
      meta: {
        title: '安全中心'
      }
    },
    {
      path: 'replacePhone',
      component: () => import('@/views/my/replacePhone'),
      meta: {
        title: '绑定/更改手机号'
      }
    },
    {
      path: 'modifyPassword',
      component: () => import('@/views/my/modifyPassword'),
      meta: {
        title: '修改登录密码'
      }
    },
    {
      path: 'modifyPayPassword',
      component: () => import('@/views/my/modifyPayPassword'),
      meta: {
        title: '修改交易密码'
      }
    },
    {
      path: 'bypass',
      component: () => import('@/views/my/bypass'),
      meta: {
        title: '子账号'
      }
    },
    {
      path: 'createChild',
      component: () => import('@/views/my/createChild'),
      meta: {
        title: '创建子账号'
      }
    },
    {
      path: 'turn',
      component: () => import('@/views/my/turn'),
      meta: {
        title: '转币/收币'
      }
    },
    {
      path: 'baasYard',
      component: () => import('@/views/my/baasYard'),
      meta: {
        title: '我的Baas码'
      }
    },
    {
      path: 'resultList',
      component: () => import('@/views/my/resultList'),
      meta: {
        title: '结果提示'
      }
    },
    {
      path: 'baasTrade',
      component: () => import('@/views/my/baasTrade')
    },
    {
      path: 'result',
      component: () => import('@/views/my/result')
    },
    {
      path: 'baasLog',
      component: () => import('@/views/my/baasLog')
    },
    {
      path: 'community',
      component: () => import('@/views/my/community')
    },
    {
      path: 'childResult',
      component: () => import('@/views/my/childResult')
    },
    {
      path: 'list',
      component: () => import('@/views/my/list'),
      meta: {
        title: '子账号参与记录'
      }
    },
    {
      path: 'profit',
      component: () => import('@/views/my/profit'),
      meta: {
        title: '社区收益'
      }
    },
    {
      path: 'about',
      component: () => import('@/views/my/about')
    },
    {
      path: 'togother',
      component: () => import('@/views/my/togother')
    },
    {
      path: 'counts',
      component: () => import('@/views/my/counts')
    },
    {
      path: 'delresult',
      component: () => import('@/views/my/delresult')
    }
  ]
}
export default message
