// home
const Home = () => import(/* webpackChunkName: "group-main" */ '../pages/home')
// 栏目1
const Menu1 = () => import(/* webpackChunkName: "group-main" */ '../pages/reserve/menu1')



export default {
  path: '/reserve',
  component: Home,
  redirect: '/reserve/menu1',
  meta:{
    name: '一级导航2',
    permission: [0, 1],  //1是超级管理员,0街道
  },
  children: [
    {
      path: 'menu1',
      component: Menu1,
      meta:{
        name: '二级导航1',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      }
    },
  ]
}
