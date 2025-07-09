import { ref } from 'vue'

const STORAGE_KEY = 'contacts'

const contacts = ref([])

function loadContacts() {
  const data = localStorage.getItem(STORAGE_KEY)
  contacts.value = data ? JSON.parse(data) : []
}

function saveContacts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts.value))
}

function getAllContacts() {
  loadContacts()
  return contacts.value
}

function addContact(contact) {
  loadContacts()
  contacts.value.push(contact)
  saveContacts()
}

function updateContact(updatedContact) {
  loadContacts()
  const index = contacts.value.findIndex(c => c.id === updatedContact.id)
  if (index !== -1) {
    contacts.value[index] = updatedContact
    saveContacts()
  }
}

function deleteContact(id) {
  loadContacts()
  contacts.value = contacts.value.filter(c => c.id !== id)
  saveContacts()
}

function getContactById(id) {
  loadContacts()
  return contacts.value.find(c => c.id === id)
}

export function useContacts() {
  loadContacts()
  return {
    contacts,
    getAllContacts,
    addContact,
    updateContact,
    deleteContact,
    getContactById,
  }
}
