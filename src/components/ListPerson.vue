<template>
  <h1>List of Person</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="person in persons" :key="person.id" class="bg-white rounded-lg shadow-lg p-4">
        <img :src="`https://${person.profilePicture.bucket}.s3.${person.profilePicture.region}.amazonaws.com/public/${person.profilePicture.key}`" alt="Profile Image" class="w-60 h-60 object-cover rounded-t-lg">
        <div class="p-2">
          <h2 class="text-xl font-semibold">{{ person.firstName }} {{ person.lastName }}</h2>
          <p>{{ person.email }}</p>
          <p>{{ person.gender }}</p>
          <p>{{ person.city }}</p>
          <p>{{ person.zip }}</p>
          <p>{{ person.isBoxChecked ? "Checked User": "Unchecked User" }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { API } from 'aws-amplify';
  import { listPeople } from '../graphql/queries';
  export default {
    data() {
      return {
        persons: [],
      };
    },
    async created() {
      try {
        const { data } = await API.graphql({ query: listPeople });
        this.persons = data.listPeople.items;
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  </style>
  