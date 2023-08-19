window.global ||= window;
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CreatePerson from './components/CreatePerson.vue'
import ListPerson from './components/ListPerson.vue'
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const routes = [
  { path: '/', component: CreatePerson },
  { path: '/list-person', component: ListPerson },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app')
