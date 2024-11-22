<template>
  <div id="app">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Global styles can be added here */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>