<template>
    <div class="todo-list">
      <ul>
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { State } from '@/store'
  import TodoItem from './TodoItem.vue'
  
  const store = useStore<State>()
  const todos = computed(() => store.getters.todos)
  </script>
  
  <style scoped lang="scss">
  .todo-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
  </style>
  