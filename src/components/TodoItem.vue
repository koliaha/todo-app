<template>
  <li :class="{ 'todo-item': true, completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="toggleTodo(todo.id)"
    />
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
<style lang="scss" >
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-family: 'Roboto', sans-serif;
  animation: fadeInUp 0.5s ease-in-out;
  transition: transform 0.3s;

  &.completed span {
    text-decoration: line-through;
    color: #888;
  }
  p {
    color: black;
  }
  input[type='checkbox'] {
    margin-right: 1rem;
    transform: scale(1.5);
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.7);
    }
  }

  span {
    flex-grow: 1;
    font-size: 1.1rem;
  }

  button {
    width: auto;
    padding: 0.5rem 1rem;
  }

  &:hover {
    transform: translateY(-5px);
  }
}
</style>
