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
  nextTodoId: number
  isAuthenticated: boolean
}
