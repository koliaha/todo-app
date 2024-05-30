<template>
    <li :class="{ 'todo-item': true, completed: todo.completed }">
      <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" />
      <span>{{ todo.text }}</span>
      <button @click="removeTodo(todo.id)">Remove</button>
    </li>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import { useStore } from 'vuex'
  import { State } from '@/store'
  
  const props = defineProps<{
    todo: { id: number; text: string; completed: boolean }
  }>()
  
  const store = useStore<State>()
  
  const toggleTodo = (id: number) => {
    store.dispatch('toggleTodo', id)
  }
  
  const removeTodo = (id: number) => {
    store.dispatch('removeTodo', id)
  }
  </script>
  
  <style scoped lang="scss">
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  
    &.completed {
      text-decoration: line-through;
    }
  
    input[type='checkbox'] {
      margin-right: 10px;
    }
  
    button {
      background-color: #f00;
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
  </style>
  