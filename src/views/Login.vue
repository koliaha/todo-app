<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  
  const email = ref('user@user.com')
  const password = ref('12345')
  const error = ref('')
  
  const store = useStore()
  const router = useRouter()
  
  const handleLogin = async () => {
    try {
      await store.dispatch('login', { email: email.value, password: password.value })
      router.push({ name: 'Home' })
    } catch (err) {
      error.value = 'Invalid email or password'
    }
  }
  </script>
  
  <style scoped lang="scss">
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  
    form {
      display: flex;
      flex-direction: column;
      width: 300px;
  
      input {
        margin-bottom: 10px;
        padding: 10px;
        font-size: 16px;
      }
  
      button {
        padding: 10px;
        font-size: 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
      }
  
      p {
        color: red;
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
  </style>
  