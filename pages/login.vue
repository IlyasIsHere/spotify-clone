<template>
  <div class="login-container">
    <h1>Login with Spotify</h1>
    <button @click="handleLogin" class="login-button">
      Connect with Spotify
    </button>
  </div>
</template>

<script setup>
const auth = useAuth()

const handleLogin = () => {
  auth.login()
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-button {
  padding: 12px 24px;
  background-color: #1DB954;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
}
</style>