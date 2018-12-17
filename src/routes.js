// 登录
const Login = () => import(/* webpackChunkName: "group-main" */ './pages/login/login')
// home
const Home = () => import(/* webpackChunkName: "group-main" */ './pages/home')
// 概况
const General = () => import(/* webpackChunkName: "group-main" */ './pages/general/general')
// 国高
const nationalTech = () => import(/* webpackChunkName: "group-nationalTech" */ './pages/nationalTech/nationalTech')
const techList = () => import(/* webpackChunkName: "group-nationalTech" */ './pages/nationalTech/list')
const nationalTechDetail = () => import(/* webpackChunkName: "group-nationalTech" */ './pages/nationalTech/detail')
const Content = () => import(/* webpackChunkName: "group-nationalTech" */ './pages/content')
// 省高
const provincialTech = () => import(/* webpackChunkName: "group-provincialTech" */ './pages/provincialTech/provincialTech')

let routes = [
	//重定向到首页
	{
		path: '/',
		redirect: '/home/general',
		name: 'general', //首页默认
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta:{
			name: '登录'
		}
	},
	{
		path: '/home',
		component: Home,
		children: [
			{
				path: 'general',
				component: General,
				permission: [0, 1],  //1是超级管理员,0不是
				meta:{
					name: '概况'
				}
			},
			{
				path: 'nationalTech',
				permission: [1],
				meta:{
					name: '国家高新技术企业'
				},
				component: Content,
				redirect: '/home/nationalTech/nationalTech',
				children: [
					{path: 'nationalTech', name: 'nationalTech', component: nationalTech},
					{path: 'list', name: 'nationalTechList', component: techList},
					{path: 'detail', name: 'nationalTechDetail', component: nationalTechDetail},
				]
			},
			{
				path: 'provincialTech',
				permission: [1],
				meta:{
					name: '省科技型企业'
				},
				component: Content,
				redirect: '/home/provincialTech/provincialTech',
				children: [
					{path: 'provincialTech', name: 'provincialTech', component: provincialTech},
					{path: 'list', name: 'provincialTechList', component: techList}, // 同国家高新
					{path: 'detail', name: 'provincialTechDetail', component: nationalTechDetail}, // 同国家高新
				]
			},
		]
	}
]

export {
	routes
}
