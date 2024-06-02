import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/Chat/ChatView.vue'
import ClientsView from '../views/Clients/ClientsView.vue'
import ProductsView from '../views/Products/ProductsView.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aiapp/',
    name: 'aiapp',
    //component: HomeView,
    children: [
      {
        path: 'chat',
        name: 'chat',
        component: ChatView
      },
      {
        path: 'clients',
        name: 'clients',
        component: ClientsView
      },
      {
        path: 'products',
        name: 'products',
        component: ProductsView
      },
    ]
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
