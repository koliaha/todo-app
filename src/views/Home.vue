<template>
  <div class="home">
    <h1>Home</h1>
    <p>Welcome, {{ currentUser?.email }}!</p>
    <button class="logout" @click="logout">Logout</button>

    <div class="filters container">
      <input type="text" v-model="filter.title" placeholder="Filter by title" />
      <input type="text" v-model="filter.email" placeholder="Filter by email" />
      <select v-model="filter.status">
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <button @click="sortById = !sortById" :class="sortById && 'isActive'">Sort by ID</button>
      <button @click="formAdd = !formAdd" class="add" :class="formAdd && 'isActive'">+</button>
    </div>

    <TodoForm class="" v-if="formAdd" />
    <h2 class="todo-title">Todo List</h2>
    <div class="todo-list">
      <div v-for="todo in paginatedTodos" :key="todo.id" class="todo-item">
        <p>ID: {{ todo.id }}</p>
        <p>Title: {{ todo.title }}</p>
        <p>Email: {{ todo.email }}</p>
        <p v-if="!todo.editing">Text: {{ todo.text }}</p>
        <textarea v-else v-model="todo.text"></textarea>
        <p>
          Status:
          <span v-if="!todo.editing">{{
            todo.completed ? 'Completed' : 'Incomplete'
          }}</span>
          <input v-else type="checkbox" v-model="todo.completed" />
        </p>
        <!-- <button @click="toggleTodo(todo.id)" v-if="!todo.editing">
          Toggle Status
        </button> -->
        <button @click="editTodo(todo)" v-if="!todo.editing && isAdmin">
          Edit
        </button>
        <button @click="saveTodo(todo)" v-if="todo.editing">Save</button>
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
const isAdmin = computed(() => currentUser.value?.role === 'admin')
const formAdd = ref(false)
const sortById = ref(false)
const logout = () => {
  store.dispatch('logout')
  router.push({ name: 'Login' })
}
const filter = ref({
  title: '',
  email: '',
  status: '',
})
const sortKey = ref('id')
const page = ref(1)
const pageSize = 3

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    return (
      (!filter.value.title || todo.title.includes(filter.value.title)) &&
      (!filter.value.email || todo.email.includes(filter.value.email)) &&
      (!filter.value.status ||
        (filter.value.status === 'completed'
          ? todo.completed
          : !todo.completed))
    )
  })
})

const sortedTodos = computed(() => {
  return !sortById.value
    ? filteredTodos.value
    : [...filteredTodos.value].sort((a, b) => {
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

// const toggleTodo = (id: number) => {
//   store.dispatch('toggleTodo', id)
// }

const editTodo = (todo: any) => {
  todo.editing = true
}

const saveTodo = (todo: any) => {
  store.dispatch('updateTodo', { ...todo, editing: false })
}
</script>

<style lang="scss">
@import '../assets/main.scss';

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  animation: fadeIn 1s ease-in-out;
  .todo-title {
    margin: 2rem 0;
  }
  .todo-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
  }
  .todo-item {
    background: white;
    padding: 1rem;
    border-radius: 20px;
  }
  .logout {
    position: absolute;
    right: 2rem;
    top: 2rem;
    width: 250px;
  }
  .filters {
    max-width: 670px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .add {
    border-radius: 50%;
    width: 42px;
    min-width: 42px;
  }
  h1 {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 1rem;
    animation: fadeInDown 1s ease-in-out;
  }

  p {
    font-size: 1.25rem;
    color: #fff;
    margin-bottom: 2rem;
  }
  input,
  textarea,
  select {
    margin: 0;
  }
  button{
    &.isActive{
        background: green;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    button {
      padding: 0.75rem 1.5rem;
      margin: 0 0.5rem;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
}
</style>
