<template>
  <div>
    <h2 class="todo-title">Todo List</h2>
    <div class="todo-list">
      <TodoItem
        v-for="todo in paginatedTodos"
        :key="todo.id"
        :todo="todo"
        @updateTodo="updateTodo"
      />
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Previous</button>
      <button @click="nextPage" :disabled="page === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps } from 'vue'
import { useStore } from 'vuex'
import TodoItem from './TodoItem.vue'
import { Todo } from '../interfaces'

const props = defineProps<{
  filter: {
    title: string
    email: string
    status: string
  }
  sortById: boolean
}>()

const store = useStore()
const todos = computed(() => store.getters.todos)

const page = ref(1)
const pageSize = 3

const filteredTodos = computed(() => {
  return todos.value.filter((todo: Todo) => {
    return (
      (!props.filter.title || todo.title.includes(props.filter.title)) &&
      (!props.filter.email || todo.email.includes(props.filter.email)) &&
      (!props.filter.status ||
        (props.filter.status === 'completed'
          ? todo.completed
          : !todo.completed))
    )
  })
})

const sortedTodos = computed(() => {
  return !props.sortById
    ? filteredTodos.value
    : [...filteredTodos.value].sort((a, b) => a.id - b.id)
})

const paginatedTodos = computed(() => {
  const start = (page.value - 1) * pageSize
  return sortedTodos.value.slice(start, start + pageSize)
})

const totalPages = computed(() => {
  return Math.ceil(sortedTodos.value.length / pageSize)
})

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

const updateTodo = (updatedTodo: Todo) => {
  store.dispatch('updateTodo', updatedTodo)
}
</script>

<style scoped>
.todo-title {
  margin-top: 2rem;
  font-size: 1.5rem;
}
.todo-list {
  margin-top: 1rem;
}
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
</style>
