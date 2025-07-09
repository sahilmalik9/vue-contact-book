<template>
  <div class="container" v-if="contact">
    <h1>Edit Contact</h1>

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
        <button type="submit" class="btn">Save Changes</button>
        <router-link :to="`/contact/${contact.id}`" class="btn back-btn">Cancel</router-link>
      </div>
    </form>
  </div>

  <div v-else class="container message-notfound">
    Contact not found.
    <router-link to="/" class="btn" style="margin-top: 1rem; display: inline-block;">Back to List</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { getContactById, updateContact } = useContacts()

    const contact = ref(null)

    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const firstNameError = ref(false)
    const lastNameError = ref(false)
    const emailError = ref(false)

    onMounted(() => {
      const c = getContactById(route.params.id)
      if (c) {
        contact.value = c
        firstName.value = c.firstName
        lastName.value = c.lastName
        email.value = c.email
      }
    })

    function submitForm() {
      firstNameError.value = !firstName.value.trim()
      lastNameError.value = !lastName.value.trim()
      emailError.value = !email.value.includes('@')

      if (firstNameError.value || lastNameError.value || emailError.value) return

      updateContact({
        id: contact.value.id,
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
      })

      router.push(`/contact/${contact.value.id}`)
    }

    return {
      contact,
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
