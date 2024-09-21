import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import IndexView from '../views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  parseQuery: function (query) {
    const params = new URLSearchParams(query)
    const result = {}
    for (const [key, value] of params.entries()) {
      result[key] = value
    }
    return result
  },
  stringifyQuery: function (params) {
    const query = new URLSearchParams()
    for (const key in params) {
      query.set(key, params[key])
    }
    return query.toString()
  },
  routes: [
    {
      path: '/',
      redirect: '/forum/index.php',
    },
    {
      path: '/forum/index.php',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/forum/login.php',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/forum/viewtopic.php',
      name: 'topic',
      component: () => import('../views/TopicView.vue'),
      props: (route) => ({
        uri: route.query.t,
      }),
    },
  ],
})

export default router
