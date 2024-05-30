<template>
  <form @submit.prevent="handleSubmit(onSubmit)">
    <div>
      <label for="title">Title</label>
      <input
        id="title"
        v-model="title"
        :class="{ 'is-invalid': errors.title }"
        placeholder="Task title"
        required
      />
      <span v-if="errors.title">{{ errors.title.message }}</span>
    </div>
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="email"
        :class="{ 'is-invalid': errors.email }"
        placeholder="Email"
        required
      />
      <span v-if="errors.email">{{ errors.email.message }}</span>
    </div>
    <div>
      <label for="text">Text</label>
      <textarea id="text" v-model="text" placeholder="Task text"></textarea>
    </div>
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const store = useStore()

// Определяем схему валидации с использованием yup
const schema = yup.object({
  title: yup
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(25, 'Title must be less than 25 characters')
    .required('Title is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  text: yup.string(),
})

// Используем useForm и useField из vee-validate для управления формой и полями
const { handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const { value: title } = useField('title')
const { value: email } = useField('email')
const { value: text } = useField('text')

const onSubmit = (values: { title: string; email: string; text?: string }) => {
  store.dispatch('addTodo', {
    title: values.title,
    email: values.email,
    text: values.text || '',
  })
  title.value = ''
  email.value = ''
  text.value = ''
}
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;

  label {
    margin-bottom: 5px;
  }

  input,
  textarea {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    width: 300px;

    &.is-invalid {
      border-color: red;
    }
  }

  span {
    color: red;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
}
</style>
