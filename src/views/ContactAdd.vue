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

      <!-- New Mobile Number Field -->
      <label for="mobile" class="form-label">Mobile Number</label>
      <input id="mobile" type="tel" v-model="mobile" placeholder="123-456-7890" />
      <p v-if="mobileError" class="error-msg">Mobile number must be 10 digits.</p>

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
    const mobile = ref('')

    const firstNameError = ref(false)
    const lastNameError = ref(false)
    const emailError = ref(false)
    const mobileError = ref(false)

    const router = useRouter()
    const { addContact } = useContacts()

    function submitForm() {
      firstNameError.value = !firstName.value.trim()
      lastNameError.value = !lastName.value.trim()
      emailError.value = !email.value.includes('@')

      // Mobile validation: optional but if provided, must be 10 digits (numbers only)
      const mobilePattern = /^\d{10}$/
      mobileError.value = mobile.value.trim() !== '' && !mobilePattern.test(mobile.value.trim())

      if (firstNameError.value || lastNameError.value || emailError.value || mobileError.value) return

      const id = Date.now().toString()

      addContact({
        id,
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        mobile: mobile.value.trim(),
      })

      router.push(`/contact/${id}`)
    }

    return {
      firstName,
      lastName,
      email,
      mobile,
      submitForm,
      firstNameError,
      lastNameError,
      emailError,
      mobileError,
    }
  },
}
</script>
