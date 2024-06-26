import { createStore } from 'vuex'

import { State, User, Todo } from '../interfaces'

const savedUser = localStorage.getItem('currentUser')

export default createStore<State>({
  state: {
    todos: [
      {
        id: 6,
        title: 'Task 3',
        email: 'user@user.com',
        text: 'Task details 3',
        completed: false,
      },
      {
        id: 7,
        title: 'Task 3',
        email: 'user@user.com',
        text: 'Task details 3',
        completed: false,
      },
      {
        id: 8,
        title: 'Task 3',
        email: 'user@user.com',
        text: 'Task details 3',
        completed: false,
      },
      {
        id: 1,
        title: 'Task 1',
        email: 'user@user.com',
        text: 'Task details 1',
        completed: false,
      },
      {
        id: 2,
        title: 'Task 2',
        email: 'admin@admin.com',
        text: 'Task details 2',
        completed: true,
      },
      {
        id: 3,
        title: 'Task 3',
        email: 'user@user.com',
        text: 'Task details 3',
        completed: false,
      },
      {
        id: 4,
        title: 'Task 3',
        email: 'user@user.com',
        text: 'Task details 3',
        completed: false,
      },
      {
        id: 5,
        title: 'Task 3',
        email: 'user@user.com',
        text: 'Task details 3',
        completed: false,
      },
  
    ],
    users: [
      { email: 'user@user.com', password: '12345', role: 'user' },
      { email: 'admin@admin.com', password: '67890', role: 'admin' },
    ],
    currentUser: savedUser ? JSON.parse(savedUser) : null,
    nextTodoId: 9,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  },
  mutations: {
    addTodo(state, todo: { title: string, email: string, text: string }) {
      const newTodo = {
        id: state.nextTodoId,
        title: todo.title,
        email: todo.email,
        text: todo.text,
        completed: false,
      }
      state.todos.push(newTodo)
      state.nextTodoId++
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
    updateTodo(state, updatedTodo: Todo) {
      const index = state.todos.findIndex((t) => t.id === updatedTodo.id)
      if (index !== -1) {
        state.todos[index] = updatedTodo
      }
    },
    login(state, user: User) {
      state.currentUser = user
      state.isAuthenticated = true
    },
    logout(state) {
      state.currentUser = null
      state.isAuthenticated = false
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('currentUser')
    },
  },
  actions: {
    addTodo({ commit }, todo: { title: string, email: string, text: string }) {
      commit('addTodo', todo)
    },
    toggleTodo({ commit }, todoId: number) {
      commit('toggleTodo', todoId)
    },
    removeTodo({ commit }, todoId: number) {
      commit('removeTodo', todoId)
    },
    updateTodo({ commit }, updatedTodo: Todo) {
      commit('updateTodo', updatedTodo)
    },
    login({ commit, state }, { email, password }) {
      const user = state.users.find(
        (u) => u.email === email && u.password === password,
      )
      if (user) {
        commit('login', user)
        return user
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
    incompleteTodos: (state) => state.todos.filter((t) => !t.completed),
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.currentUser,
  },
})
