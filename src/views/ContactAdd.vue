<template>
  <div class="container">
    <h1>Add Contact</h1>

    <form @submit.prevent="submitForm">
      <label for="firstName" class="form-label">First Name</label>
      <input id="firstName" v-model="firstName" required />
      <p v-if="firstNameError" class="error-msg">First name is required.</p>

      <label for="lastName" class="form-label">Last Name</label>
      <input id="lastName" v-model="lastName" required />
      <p v-if="lastNameError" class="error-msg">Last name is required.</p>

      <label for="email" class="form-label">Email</label>
      <input id="email" type="email" v-model="email" required />
      <p v-if="emailError" class="error-msg">Valid email is required.</p>

      <div class="buttons-row">
        <button type="submit" class="btn">Add Contact</button>
        <router-link to="/" class="btn back-btn">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'

export default {
  setup() {
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')

    const firstNameError = ref(false)
    const lastNameError = ref(false)
    const emailError = ref(false)

    const router = useRouter()
    const { addContact } = useContacts()

    function submitForm() {
      firstNameError.value = !firstName.value.trim()
      lastNameError.value = !lastName.value.trim()
      emailError.value = !email.value.includes('@')

      if (firstNameError.value || lastNameError.value || emailError.value) return

      const id = Date.now().toString()

      addContact({
        id,
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
      })

      router.push(`/contact/${id}`)
    }

    return {
      firstName,
      lastName,
      email,
      submitForm,
      firstNameError,
      lastNameError,
      emailError,
    }
  },
}
</script>
