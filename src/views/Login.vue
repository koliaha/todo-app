<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit" autocomplete="off">
      <div>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          :class="{ 'is-invalid': emailError && touched.email }"
          autocomplete="off"
          @blur="setFieldTouched('email')"
        />
        <span>{{ emailError }}</span>
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          :class="{ 'is-invalid': passwordError && touched.password }"
          autocomplete="new-password"
          @blur="setFieldTouched('password')"
        />
        <span>{{ passwordError }}</span>
      </div>
      <button type="submit">Login</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const error = ref('')
const store = useStore()
const router = useRouter()

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const { handleSubmit, errors, setFieldTouched, validate } = useForm({
  validationSchema: schema,
})

const {
  value: email,
  errorMessage: emailError,
  meta: emailMeta,
} = useField('email')
const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
} = useField('password')

const touched = {
  email: emailMeta.touched,
  password: passwordMeta.touched,
}

const onSubmit = handleSubmit(async (values) => {
  try {
    const user = await store.dispatch('login', {
      email: values.email,
      password: values.password,
    })
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', JSON.stringify(user))
    router.push({ name: 'Home' })
  } catch (err) {
    error.value = 'Invalid email or password'
  }
})
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);

  h1 {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 1rem;
    animation: fadeInDown 1s ease-in-out;
  }

  form {
    @apply container;
  }

  div {
    margin-bottom: 1rem;
  }

  input {
    @apply input;
    border-color: #ccc;
  }

  .is-invalid {
    border-color: red;
  }

  button {
    @apply button;
  }

  span {
    color: red;
    font-size: 0.875rem;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
    display: block;
  }

  p {
    color: red;
    margin-top: 1rem;
    font-size: 0.875rem;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
