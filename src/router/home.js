// home
const Home = () => import(/* webpackChunkName: "group-main" */ '../pages/home')
// 概况
const Style = () => import(/* webpackChunkName: "group-main" */ '../pages/home/style')
// 图表
const Graph = () => import(/* webpackChunkName: "group-main" */ '../pages/home/graph')


export default {
  path: '/home',
  component: Home,
  redirect: '/home/style',
  meta:{
    name: '一级导航1',
    permission: [0, 1],  //1是超级管理员,0街道
  },
  children: [
    {
      path: 'style',
      component: Style,
      meta:{
        name: '样式',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      }
    },
    {
      path: 'graph',
      component: Graph,
      meta:{
        name: '图表',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      }
    },
  ]
}
