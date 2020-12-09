import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Pets',
    component: () => import(/* webpackChunkName: "Pets" */ '@/views/Pets.vue')
  },
  {
    path: '/pet',
    name: 'Pet',
    component: () => import(/* webpackChunkName: "Pet" */ '@/views/Pet.vue'),
    props : route => { return { id : +route.params.id } }
  },
  {
    path: '/erasure',
    name: 'Erase',
    component: () => import(/* webpackChunkName: "Pet" */ '@/views/Erase.vue'),
    props : route => { return { id : +route.params.id } }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
