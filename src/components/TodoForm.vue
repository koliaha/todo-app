<template>
    <form @submit.prevent="addTodo">
      <input v-model="title" placeholder="Task title" required />
      <input v-model="text" placeholder="Task text" required />
      <button type="submit">Add Task</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  
  const store = useStore()
  
  const title = ref('')
  const text = ref('')
  
  const addTodo = () => {
    store.dispatch('addTodo', { title: title.value, text: text.value })
    title.value = ''
    text.value = ''
  }
  </script>
  
  <style scoped lang="scss">
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  
    input {
      margin-bottom: 10px;
      padding: 10px;
      font-size: 16px;
      width: 300px;
    }
  
    button {
      padding: 10px;
      font-size: 16px;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  }
  </style>
  