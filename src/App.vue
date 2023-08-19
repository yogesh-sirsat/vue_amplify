<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      Vue Amplify
      <router-link active-class="active" class="nav-item" to="/">Create</router-link>
      <router-link active-class="active" class="nav-item" to="/list-person">List</router-link>
    </nav>
  </header>

  <main class="container justify-center">
      <RouterView />
  </main>
</template>

<style scoped>
  header {
    background-color: #3eaf7c;
    color: white;
    padding: 10px;
    font-size: 1.5em;

    .nav-item {
      padding: 6px;
      font-size: 0.8em;
    }

    .active {
      background-color: #1f5c40;
      font-weight: bold;
    }
  }

  main {
    margin-top: 20px;
  }
</style>
