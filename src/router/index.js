import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/userStore';
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: import('@/pages/index.vue'),
      meta: {
        requiresAuth: true,
        forAdmin: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: import('@/pages/auth/login.vue'),
      meta: {
        requiresAuth: false,
        forAdmin: false
      },
    },
    {
      path: '/Devices',
      name: 'Devices',
      component: import('@/pages/Devices/index.vue'),
    },
    {
      path: '/location',
      name: 'location',
      component: import('@/pages/locations/index.vue'),
    },
    {
      path: '/sensor-type',
      name: 'sensor type',
      component: import('@/pages/SensorType/index.vue'),
    },
    {
      path: '/sensor-type/setting/:id',
      name: 'sensor setting',
      component: import('@/pages/SensorType/setting.vue')
    },
    {
      path: '/Allergy',
      name: 'Allergy',
      component: import('@/pages/Allergy/index.vue'),
    },
    {
      path: '/Allergy/setting/:id',
      name: 'Allergy setting',
      component: import('@/pages/Allergy/setting.vue')
    },
  ]
})

router.beforeResolve(async (to, from, next) => {
  const userStore = useUserStore();
  if(!userStore.isAuthenticated && userStore.user) {
    await userStore.getUserAuth();
  }
  console.log(userStore.isAuthenticated)
  if(!userStore.isAuthenticated && to.name !== 'login') {
    console.log('false')
    return next({name: 'login'})
  } else if(userStore.isAuthenticated && to.name === 'login') {

    console.log('true')
    return next({name: 'Dashboard'})
  }
  next();
})

export default router;
