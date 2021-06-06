import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
	{
		path:'/Login',
		name:'Login',
		component: resolve => require(['../login/Login.vue'],resolve)
	},
	{
		path:'/ManagerMain',
		name:'ManagerMain',
		component: resolve => require(['../view/manager/ManagerMain.vue'],resolve),
		children:[
			{
				path: 'GoodsManage',
				name: 'GoodsManage',
				component: resolve => require(['../view/table/GoodsManage.vue'],resolve)
			},
			{
				path: 'AddGoods',
				name: 'AddGoods',
				component: resolve => require(['../view/table/AddGoods.vue'],resolve)
			},
			{
				path: 'UpdateGoods',
				name: 'UpdateGoods',
				component: resolve => require(['../view/table/UpdateGoods.vue'],resolve)
			},
			{
				path: 'UserManage',
				name: 'UserManage',
				component: resolve => require(['../view/table/UserManage.vue'],resolve)
			},
			{
				path: 'AdminManage',
				name: 'AdminManage',
				component: resolve => require(['../view/table/AdminManage.vue'],resolve)
			},
			{
				path: 'UpdateUser',
				name: 'UpdateUser',
				component: resolve => require(['../view/table/UpdateUser.vue'],resolve)
			},
			{
				path: 'UpdateAdmin',
				name: 'UpdateAdmin',
				component: resolve => require(['../view/table/UpdateAdmin.vue'],resolve)
			},
			{
				path: 'AddUser',
				name: 'AddUser',
				component: resolve => require(['../view/table/AddUser.vue'],resolve)
			},
		],
	},

  ]
})
