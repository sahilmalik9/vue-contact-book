<template>
  <div class="container">
    <h1>Contact Book</h1>

    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search contacts by first or last name"
      class="search-input"
    />

    <div class="buttons-row">
      <router-link to="/add" class="btn">
        + Add New Contact
      </router-link>
    </div>

    <div class="card-list">
      <div
        class="contact-card"
        v-for="contact in filteredContacts"
        :key="contact.id"
      >
        <div class="card-initials">
          {{ getInitials(contact.firstName, contact.lastName) }}
        </div>
        <div class="card-info">
          <router-link :to="`/contact/${contact.id}`" class="card-name">
            {{ contact.firstName }} {{ contact.lastName }}
          </router-link>
          <p class="card-email">{{ contact.email }}</p>
        </div>
      </div>
    </div>

    <p v-if="filteredContacts.length === 0" class="message-notfound">
      No contacts found.
    </p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useContacts } from '../composables/useContacts'

export default {
  setup() {
    const { contacts } = useContacts()
    const searchTerm = ref('')

    const filteredContacts = computed(() => {
      const term = searchTerm.value.toLowerCase()
      return contacts.value
        .filter(c =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(term)
        )
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
    })

    const getInitials = (first, last) => {
      return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase()
    }

    return {
      searchTerm,
      filteredContacts,
      getInitials,
    }
  },
}
</script>
