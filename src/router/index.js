import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout/layout'
Vue.use(VueRouter)
const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@v/common/login')
},
{
  path: '/register',
  name: 'register',
  component: () => import('@v/common/register')
},
{
  path: '/forget',
  name: 'forget',
  component: () => import('@v/common/forget')
},
{
  path: '/download',
  name: 'download',
  component: () => import('@v/download/download')
},
{
  path: '/argeement',
  name: 'argeement',
  component: () => import('@/views/wallet/UserAgreement')
},
{
  path: '/new',
  name: 'new',
  component: () => import('@/views/wallet/newHtml')
},
{
  path: '/',
  name: 'layout',
  component: layout,
  redirect: '/wallet/index'
}
]
const asyncRotuer = () => {
  const routerModule = require.context('./module', false, /\.js$/)
  const arr = routerModule.keys().map(routerModule);
  (arr || []).forEach((route) => {
    route = route.__esModule && route.default ? route.default : route
    routes.push(route)
  })
}
asyncRotuer()
const router = new VueRouter({
  mode: 'hash',
  routes
})
export default router
