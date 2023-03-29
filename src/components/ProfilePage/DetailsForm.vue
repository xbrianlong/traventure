<template>
  <v-sheet width="400" class="mx-auto">
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="username"
        label="Username"
        :rules="usernameRules"
        :model-value="username"
        required
        clearable
        variant="outlined"
        color="blue"
        @change="onChangeInput"
      ></v-text-field>

      <v-text-field
        type="email"
        v-model="email"
        label="Email"
        :rules="emailRules"
        :model-value="email"
        required
        clearable
        variant="outlined"
        color="blue"
        @change="onChangeInput"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append-inner="show1 = !show1"
        :model-value="password"
        required
        clearable
        variant="outlined"
        color="blue"
        @change="onChangeInput"
      ></v-text-field>

      <v-text-field
        v-model="password1"
        :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="confirmPasswordRules"
        :type="show2 ? 'text' : 'password'"
        label="Confirm password"
        hint="At least 8 characters"
        counter
        @click:append-inner="show2 = !show2"
        :model-value="password1"
        required
        clearable
        variant="outlined"
        color="blue"
        @change="onChangeInput"
      ></v-text-field>

      <v-text-field
        v-model="location"
        label="Location"
        :rules="locationRules"
        :model-value="location"
        required
        clearable
        variant="outlined"
        color="blue"
        @change="onChangeInput"
      ></v-text-field>

      <v-btn :disabled="disableSave" color="blue" size="large" type="submit" variant="elevated">
        Save
      </v-btn>
      <SnackBar :message="message" :type="type" />
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import SnackBar from './SnackBar.vue'

const userDetails = ['johndoe', 'johndoe@example.com', 'john123', 'Clementi, Singapore'] //in actual app, should fetch this from database
const username = ref(userDetails[0])
const email = ref(userDetails[1])
const password = ref(userDetails[2])
const password1 = ref(userDetails[2])
const location = ref(userDetails[3])

const show1 = ref(false)
const show2 = ref(false)
const message = ref('')
const type = 'success'

const disableSave = ref(true)

const usernameRules = [
  (value) => {
    if (value) {
      return true
    }
    return 'Username is required'
  },
  (value) => {
    if (value.length >= 2) {
      return true
    }
    return 'Username must be at least 2 characters long'
  }
]

const emailRules = [
  (value) => {
    if (value) {
      return true
    }
    return 'Email is required'
  }
]

const passwordRules = [
  (value) => {
    if (value) {
      return true
    }
    return 'Password is required'
  },
  (value) => {
    if (value.length >= 8) {
      return true
    }
    return 'Password must be at least 8 characters long'
  }
]

const confirmPasswordRules = [
  (value) => {
    if (value) {
      return true
    }
    return 'Confirmation of password is required'
  },
  (value) => {
    if (value === password.value) {
      return true
    }
    return 'Passwords do not match'
  },
  (value) => {
    if (value.length >= 8) {
      return true
    }
    return 'Password must be at least 8 characters long'
  }
]

const locationRules = [
  (value) => {
    if (value) {
      return true
    }
    return 'Location is required'
  }
]

function onChangeInput() {
  disableSave.value = false
}

function submitForm() {
  showSnackBar()
  //steps to update the user details in the database
}

function showSnackBar() {
  message.value = 'Your profile is saved successfully!'
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>

<style scoped>
.v-text-field {
  margin-top: 17px;
  margin-bottom: 17px;
}

.v-btn {
  float: right;
}
</style>
