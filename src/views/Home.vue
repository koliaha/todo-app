<template>
    <div class="home">
      <h1>Home</h1>
      <p>Welcome, {{ currentUser?.email }}!</p>
      <button @click="logout">Logout</button>
  
      <div class="filters">
        <input type="text" v-model="filter.title" placeholder="Filter by title" />
        <input type="text" v-model="filter.email" placeholder="Filter by email" />
        <select v-model="filter.status">
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <button @click="sort('id')">Sort by ID</button>
      </div>
  
      <TodoForm />
      <div class="todo-list">
        <div v-for="todo in paginatedTodos" :key="todo.id" class="todo-item">
          <p>ID: {{ todo.id }}</p>
          <p>Title: {{ todo.title }}</p>
          <p>Email: {{ todo.email }}</p>
          <p>Text: {{ todo.text }}</p>
          <p>Status: {{ todo.completed ? 'Completed' : 'Pending' }}</p>
          <button @click="toggleTodo(todo.id)">Toggle Status</button>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">Previous</button>
        <button @click="nextPage" :disabled="page === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import TodoForm from '../components/TodoForm.vue'
  
  const store = useStore()
  const router = useRouter()
  
  const currentUser = computed(() => store.getters.currentUser)
  const todos = computed(() => store.getters.todos)
  
  const logout = () => {
    store.dispatch('logout')
    router.push({ name: 'Login' })
  }
  
  // Фильтры, сортировка и пагинация
  const filter = ref({
    title: '',
    email: '',
    status: '',
  })
  const sortKey = ref('id')
  const page = ref(1)
  const pageSize = 3
  
  const filteredTodos = computed(() => {
    return todos.value.filter(todo => {
      return (
        (!filter.value.title || todo.title.includes(filter.value.title)) &&
        (!filter.value.email || todo.email.includes(filter.value.email)) &&
        (!filter.value.status || (filter.value.status === 'completed' ? todo.completed : !todo.completed))
      )
    })
  })
  
  const sortedTodos = computed(() => {
    return [...filteredTodos.value].sort((a, b) => {
      if (sortKey.value === 'id') {
        return a.id - b.id
      }
      return 0
    })
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
  
  const toggleTodo = (id: number) => {
    store.dispatch('toggleTodo', id)
  }
  </script>
  
  <style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  
    .filters {
      display: flex;
      margin-bottom: 20px;
      
      input, select, button {
        margin: 0 5px;
        padding: 10px;
        font-size: 16px;
      }
    }
  
    .todo-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  
    .todo-item {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
    }
  
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
  
      button {
        margin: 0 5px;
        padding: 10px;
        font-size: 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    }
  }
  </style>
  