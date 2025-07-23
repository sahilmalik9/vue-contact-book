import { createRouter, createWebHashHistory } from 'vue-router' // CHANGED HERE
import ContactList from '../views/ContactList.vue'
import ContactDetails from '../views/ContactDetails.vue'
import ContactAdd from '../views/ContactAdd.vue'
import ContactEdit from '../views/ContactEdit.vue'

const routes = [
  { path: '/', name: 'ContactList', component: ContactList },
  { path: '/contact/:id', name: 'ContactDetails', component: ContactDetails },
  { path: '/add', name: 'ContactAdd', component: ContactAdd },
  { path: '/edit/:id', name: 'ContactEdit', component: ContactEdit },
]

const router = createRouter({
  history: createWebHashHistory(), // CHANGED HERE
  routes,
})

export default router
