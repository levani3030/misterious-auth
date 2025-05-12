import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // Type-only import
import AuthView from '../views/AuthView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
  },
  // We can add a default route to redirect to /auth or show a home page
  {
    path: '/',
    redirect: '/auth', // Or a different component for home
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // BASE_URL is typically '/'
  routes,
});

export default router;
