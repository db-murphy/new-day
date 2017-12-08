import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Sinup from '@/components/Sinup'
import _Window from '@/components/Window'

Vue.use(Router)

export default new Router({
  routes: [
      {
			path: '/',
			redirect: '/login'
		},
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/sinup',
        name: 'Sinup',
        component: Sinup
    },
    {
        path: '/window',
        name: 'Window',
        component: _Window
    }
  ]
})
