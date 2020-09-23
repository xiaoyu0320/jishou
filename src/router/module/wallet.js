import layout from '@/layout/layout'
const wallet = {
  path: '/wallet',
  name: 'walletindex',
  component: layout,
  redirect: '/wallet/index',
  children: [{
    path: 'index',
    component: () => import('@v/wallet/wallet.vue')
  },
  {
    path: 'receivables',
    name: 'receivables',
    component: () => import('@/views/wallet/Receivables')
  },
  {
    path: 'transferASC',
    name: 'transferASC',
    component: () => import('@/views/wallet/TransferASC')
  },
  {
    path: 'coinChange',
    name: 'coinChange',
    component: () => import('@/views/wallet/coinChange')
  },
  {
    path: 'definite',
    name: 'definite',
    component: () => import('@/views/wallet/definite')
  },
  {
    path: 'bill',
    name: 'bill',
    component: () => import('@/views/share/bill')
  },
  {
    path: 'result',
    name: 'result',
    component: () => import('@/views/wallet/result')
  },
  {
    path: 'ascchange',
    name: 'ascchange',
    component: () => import('@/views/wallet/ascchange')
  }

  ]
}
export default wallet
