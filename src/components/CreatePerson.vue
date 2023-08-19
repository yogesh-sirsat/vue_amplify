<template>
    <div class="p-4">
        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">First Name:</label>
                <input v-model="formData.firstName" type="text" id="firstName"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
                    required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">Last Name:</label>
                <input v-model="formData.lastName" type="text" id="lastName"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
                    required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
                <input v-model="formData.email" type="email" id="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
                    required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="city">City:</label>
                <input v-model="formData.city" type="text" id="city"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
                    required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="zip">Zip:</label>
                <input v-model="formData.zip" type="number" id="zip"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
                    required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">Gender:</label>
                <select v-model="formData.gender" id="gender"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="profilePicture">Profile Picture:</label>
                <input type="file" accept="image/*" @change="handleFileChange" id="profilePicture"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
                    required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="isBoxChecked">Is Box Checked:</label>
                <input v-model="formData.isBoxChecked" type="checkbox" id="isBoxChecked"
                    class="form-checkbox shadow border rounded h-4 w-4 text-gray-700 ">
            </div>
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow border rounded  w-full">Submit</button>
        </form>
        <button class="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 shadow border rounded  w-full mt-2" @click="router.push('/list-person')">View All Person's</button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { v4 as uuid } from 'uuid';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { createPerson } from '../graphql/mutations';

const router = useRouter();

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    city: "",
    zip: "",
    profilePicture: "",
    isBoxChecked: false
};

const formData = ref({ ...initialFormData });

const submitForm = async (e) => {
    e.preventDefault();

    formData.value.id = uuid();

    if(formData.value.profilePicture) {
        const fileName = `${formData.value.id}.jpg`;

        Storage.configure({region: 'ap-south-1'});
        const { key } = await Storage.put(fileName, formData.value.profilePicture, {contentType: 'image/jpg'});

        formData.value.profilePicture = {
            bucket: awsmobile.aws_user_files_s3_bucket,
            region: awsmobile.aws_user_files_s3_bucket_region,
            key
        };
    }
    // Create a new person in the database
    await API.graphql(graphqlOperation(createPerson, { input: formData.value }));

    // Reset the form data after submission
    e.target.reset();
    formData.value = { ...initialFormData };
};

const handleFileChange = (event) => {
    formData.value.profilePicture = event.target.files[0];
};

</script>
  