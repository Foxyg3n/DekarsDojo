import { createRouter, createWebHashHistory } from 'vue-router'
import Games from '../views/GamesView.vue'
import About from '../views/AboutView.vue'
import Login from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Games',
    component: Games
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
