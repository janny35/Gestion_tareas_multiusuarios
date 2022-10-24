import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import TaskView from '../views/TaskView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tareas/:id',
    name: 'tareas',
    component: TaskView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
