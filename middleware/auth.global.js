export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (to.path === '/login' || to.path === '/callback' || authStore.isAuthenticated) {
    console.log("sir 3llah");
    return true;
  } else {
    console.log("7bess");
    return navigateTo('/login'); 
  }
})
