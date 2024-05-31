<template>
  <div class="todo-item">
    <p>ID: {{ todo.id }}</p>
    <p>Title: {{ todo.title }}</p>
    <p>Email: {{ todo.email }}</p>
    <p v-if="!isEditing">Text: {{ todo.text }}</p>
    <textarea v-else v-model="localTodo.text"></textarea>
    <p>
      Status:
      <span v-if="!isEditing">{{
        todo.completed ? 'Completed' : 'Incomplete'
      }}</span>
      <input v-else type="checkbox" v-model="localTodo.completed" />
    </p>
    <button @click="editTodo" v-if="!isEditing && isAdmin">Edit</button>
    <button @click="saveTodo" v-if="isEditing">Save</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { Todo } from '../interfaces'

const props = defineProps<{
  todo: Todo
}>()

const store = useStore()

const isAdmin = computed(() => store.getters.currentUser?.role === 'admin')
const isEditing = ref(false)

const localTodo = ref({ ...props.todo })

const editTodo = () => {
  isEditing.value = true
}

const saveTodo = () => {
  store.dispatch('updateTodo', { ...localTodo.value, editing: false })
  isEditing.value = false
}
</script>

<style scoped>
.todo-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
