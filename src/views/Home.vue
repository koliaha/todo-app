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
      <button @click="sortById = !sortById" :class="sortById && 'isActive'">
        Sort by ID
      </button>
      <button
        @click="formAdd = !formAdd"
        class="add"
        :class="formAdd && 'isActive'"
      >
        +
      </button>
    </div>
    <TodoForm v-if="formAdd" />
    <TodoList :filter="filter" :sortById="sortById" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'

const store = useStore()
const router = useRouter()

const currentUser = computed(() => store.getters.currentUser)
// const isAdmin = computed(() => currentUser.value?.role === 'admin')
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
    @media screen and (max-width: 550px) {
      gap: 1rem;
    }
  }
  .todo-item {
    background: white;
    padding: 1rem;
    border-radius: 20px;
    @media screen and (max-width: 550px) {
      width: 100%;
    }
  }
  .logout {
    position: absolute;
    right: 2rem;
    top: 2rem;
    width: 250px;
    @media screen and (max-width: 550px) {
      width: 100px;
      right: 1rem;
      top: 1rem;
    }
  }
  .filters {
    max-width: 670px;
    display: flex;
    gap: 10px;
    align-items: center;
    @media screen and (max-width: 550px) {
      flex-direction: column;
    }
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
    @media screen and (max-width: 550px) {
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
  input,
  textarea,
  select {
    margin: 0;
  }
  button {
    &.isActive {
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
