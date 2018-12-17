
// 首页
const Index = () => import(/* webpackChunkName: "group-main" */ '../pages/index/index')

import home from './home.js'  //培育库
import reserve from './reserve.js'  //储备库

let routes = [
  {
		path: '/',
		redirect: '/home/general',
		name: 'general', //首页默认
		hidden: true,
	},
	{
		path: '/index',
		name: 'index',
		component: Index,
		meta:{
			name: '首页',
			permission: [1],  //1是超级管理员,0街道
		},
	},
	home,
	reserve
]

export {
	routes
}
