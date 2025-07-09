<template>
  <div class="container" v-if="contact">
    <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>

    <p><strong>Email:</strong> <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p>

    <div class="buttons-row">
      <router-link :to="`/edit/${contact.id}`" class="btn">Edit</router-link>
      <button @click="deleteContactAndGoBack" class="btn" style="background-color:#e74c3c;">
        Delete
      </button>
      <router-link to="/" class="btn" style="background-color:#7f8c8d;">
        Back to List
      </router-link>
    </div>
  </div>

  <div v-else class="container message-notfound">
    Contact not found.
    <router-link to="/" class="btn" style="margin-top: 1rem; display: inline-block;">
      Back to List
    </router-link>
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
    const { getContactById, deleteContact } = useContacts()
    const contact = ref(null)

    onMounted(() => {
      contact.value = getContactById(route.params.id)
    })

    function deleteContactAndGoBack() {
      if (confirm('Are you sure you want to delete this contact?')) {
        deleteContact(contact.value.id)
        router.push('/')
      }
    }

    return { contact, deleteContactAndGoBack }
  },
}
</script>
