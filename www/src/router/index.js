import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Vault from '@/components/Vault'
import Vaults from '@/components/Vaults'
import Keeps from '@/components/Keeps'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
     {
      path: '/vaults/:id',
      name: 'Vault',
      component: Vault
    },
    {
      path:'*',
      redirect: '/'
    }
  ]
})
