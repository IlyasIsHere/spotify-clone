<template>
  <div class="user-profile">
    <img
      :src="user.images[0]?.url"
      :alt="user.display_name"
      class="profile-image"
    />
    <div class="profile-info">
      <h3>{{ user.display_name }}</h3>
      <p>{{ user.email }}</p>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['logout']);

const logout = () => {
  emit('logout');
};
</script>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.profile-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
}

.profile-info {
  text-align: center;
}

.profile-info h3 {
  margin: 0;
  font-size: 18px;
}

.profile-info p {
  margin: 0;
  color: #666;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;
}

button:hover {
  background-color: #ddd;
}
</style>
