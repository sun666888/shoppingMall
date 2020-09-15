import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '联通eSIM商城'
    },
    component: () => import('./views/Home.vue')
  },
  {
    path: '/allShang',
    name: 'allShang',
    meta: {
      title: '商城全部商品'
    },
    component: () => import('./views/AllShang.vue')
  },
  {
    path: '/shoppingcart',
    name: 'shoppingcart',
    meta: {
      title: '购物车'
    },
    component: () => import('./views/ShoppingCart.vue')
  },
  {
    path: '/personalcenter',
    name: 'personalcenter',
    meta: {
      title: '个人中心'
    },
    component: () => import('./views/PersonalCenter.vue')
  },
  {
    path: '/personalorder',
    name: 'personalorder',
    meta: {
      title: '订单中心'
    },
    component: () => import('./views/PersonalOrder.vue')
  },
  // {
  //   path: '/detailsorder',
  //   name: 'detailsorder',
  //   meta: {
  //     title: '订单详情'
  //   },
  //   component: () => import('./views/DetailsOrder.vue')
  // },
  {
    path: '/commodityareaone',
    name: 'commodityareaone',
    meta: {
      title: 'eSIM苹果专区'
    },
    component: () => import('./views/CommodityAreaOne.vue')
  },
  {
    path: '/commodityareatwo',
    name: 'commodityareatwo',
    meta: {
      title: 'eSIM小米专区'
    },
    component: () => import('./views/CommodityAreaTwo.vue')
  },
  {
    path: '/commodityareathree',
    name: 'commodityareathree',
    meta: {
      title: 'eSIM出门问问专区'
    },
    component: () => import('./views/CommodityAreaThree.vue')
  },
  {
    path: '/commodityareafour',
    name: 'commodityareafour',
    meta: {
      title: 'eSIM阿巴町专区'
    },
    component: () => import('./views/CommodityAreaFour.vue')
  },
  {
    path: '/commodityAreafive',
    name: 'commodityAreafive',
    meta: {
      title: 'eSIM科强专区'
    },
    component: () => import('./views/CommodityAreaFive.vue')
  },
  {
    path: '/commodityAreasix',
    name: 'commodityAreasix',
    meta: {
      title: 'eSIM努比亚专区'
    },
    component: () => import('./views/CommodityAreaSix.vue')
  },
  {
    path: '/commodityareaseven',
    name: 'commodityareaseven',
    meta: {
      title: 'eSIM OPPO 专区'
    },
    component: () => import('./views/CommodityAreaSeven.vue')
  },
  {
    path: '/commodityareaeight',
    name: 'commodityareaeight', 
    meta: {
      title: 'eSIM华米专区'
    },
    component: () => import('./views/CommodityAreaEight.vue')
  },
  {
    path: '/earphoneZone',
    name: 'earphoneZone', 
    meta: {
      title: '耳机专区'
    },
    component: () => import('./views/EarphoneZone.vue')
  },
  {
    path: '/details',
    name: 'details',
    meta: {
      title: '商品详情'
    },
    component: () => import('./views/details.vue')
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    meta: {
      title: '立即预约'
    },
    component: () => import('./views/subscribe.vue')
  },
  {
    path: '/detailssettlement',
    name: 'detailssettlement',
    meta: {
      title: '商品结算'
    },
    component: () => import('./views/DetailsSettlement.vue')
  },
  {
    path: '/addressmanagement',
    name: 'addressmanagement',
    meta: {
      title: '管理收货地址'
    },
    component: () => import('./views/AddressManagement.vue')
  },
  {
    path: '/detailsaddress',
    name: 'detailsaddress',
    meta: {
      title: '添加收货地址'
    },
    component: () => import('./views/DetailsAddress.vue')
  },
  {
    path: '/detailsorder',
    name: 'detailsorder',
    meta: {
      title: '订单详情'
    },
    component: () => import('./views/DetailsOrder.vue')
  },
  {
    path: '/allShangtwo',
    name: 'allShangtwo',
    meta: {
      title: '搜索结果'
    },
    component: () => import('./views/AllShangTwo.vue')
  },
  {
    path: '/announcement',
    name: 'announcement',
    meta: {
      title: '搜索结果'
    },
    component: () => import('./views/Announcement.vue')
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default router
