import layout from '@/layout/layout'
const message = {
  path: '/message',
  name: 'message',
  component: layout,
  redirect: '/message/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/message/index')
    },
    {
      path: 'dynamic',
      component: () => import('@/views/message/dynamic'),
      meta: {
        title: '动态通知'
      }
    },
    {
      path: 'draw',
      component: () => import('@/views/message/draw'),
      meta: {
        title: '开奖公告'
      }
    },
    {
      path: 'details',
      component: () => import('@/views/message/details'),
      meta: {
        title: '文章详情'
      }
    }
  ]
}
export default message
