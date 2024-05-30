import { createStore } from 'vuex'

export interface Todo {
  id: number
  title: string
  email: string
  text: string
  completed: boolean
}

export interface User {
  email: string
  password: string
  role: 'user' | 'admin'
}

export interface State {
  todos: Todo[]
  users: User[]
  currentUser: User | null
}

export default createStore<State>({
  state: {
    todos: [
      { id: 1, title: 'Task 1', email: 'user@user.com', text: 'Task details 1', completed: false },
      { id: 2, title: 'Task 2', email: 'admin@admin.com', text: 'Task details 2', completed: true },
      { id: 3, title: 'Task 3', email: 'user@user.com', text: 'Task details 3', completed: false },
      { id: 4, title: 'Task 3', email: 'user@user.com', text: 'Task details 3', completed: false },
      { id: 5, title: 'Task 3', email: 'user@user.com', text: 'Task details 3', completed: false },
      { id: 6, title: 'Task 3', email: 'user@user.com', text: 'Task details 3', completed: false },
      { id: 7, title: 'Task 3', email: 'user@user.com', text: 'Task details 3', completed: false },
      { id: 8, title: 'Task 3', email: 'user@user.com', text: 'Task details 3', completed: false },
    ],
    users: [
      { email: 'user@user.com', password: '12345', role: 'user' },
      { email: 'admin@admin.com', password: '67890', role: 'admin' },
    ],
    currentUser: null,
  },
  mutations: {
    addTodo(state, todo: { title: string, text: string }) {
      const newTodo = {
        id: Date.now(),
        title: todo.title,
        email: state.currentUser?.email || '',
        text: todo.text,
        completed: false,
      }
      state.todos.push(newTodo)
    },
    toggleTodo(state, todoId: number) {
      const todo = state.todos.find((t) => t.id === todoId)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo(state, todoId: number) {
      state.todos = state.todos.filter((t) => t.id !== todoId)
    },
    login(state, user: User) {
      state.currentUser = user
    },
    logout(state) {
      state.currentUser = null
    },
  },
  actions: {
    addTodo({ commit }, todo: { title: string, text: string }) {
      commit('addTodo', todo)
    },
    toggleTodo({ commit }, todoId: number) {
      commit('toggleTodo', todoId)
    },
    removeTodo({ commit }, todoId: number) {
      commit('removeTodo', todoId)
    },
    login({ commit, state }, { email, password }) {
      const user = state.users.find(
        (u) => u.email === email && u.password === password,
      )
      if (user) {
        commit('login', user)
      } else {
        throw new Error('Invalid credentials')
      }
    },
    logout({ commit }) {
      commit('logout')
    },
  },
  getters: {
    todos: (state) => state.todos,
    completedTodos: (state) => state.todos.filter((t) => t.completed),
    pendingTodos: (state) => state.todos.filter((t) => !t.completed),
    isAuthenticated: (state) => !!state.currentUser,
    currentUser: (state) => state.currentUser,
  },
})
