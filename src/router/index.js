import { createRouter, createWebHashHistory } from 'vue-router'
import Games from '../views/Games.vue'
import About from '../views/AboutView.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
