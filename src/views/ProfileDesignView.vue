<template>
  <TheHeader />
  <div class="view">
    <font-awesome-icon icon="fa-solid fa-circle-chevron-left" class="back-icon" />
    <div class="page-title">User Profile</div>
    <div class="container">
      <div 
        class="avatar"
        :style="{ 'background-image': `url(${imageData})` }"
        @click="handleClick">
          <input
            class="file-input"
            ref="fileInput"
            type="file"
            @input="handleFileChange"
          >
      </div>
      <div v-if="userData" class="details-wrapper">
        <div class="input-wrapper" v-for="input in inputs" :key="input.label">
          <div class="input-title">{{ input.inputName }}</div>
          <input
            class="input-field"
            v-model = "userInput[input.name]"
            :type = "input.type"
            :placeholder="input.placeholder"
            :name="input.name"
            required
            clearable
            @change="onChangeInput()"
            >
        </div>

        <button 
          class="save-btn"
          :disabled="disableSave">Save</button>
        <!-- <div class="save-btn">Save</div> -->
      </div>
    </div>
    <SnackBar />
  </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'

import { ref, onBeforeMount } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { db, storage } from '../firebase';
import { getAuth } from 'firebase/auth';
import { doc } from 'firebase/firestore'
import SnackBar from '../components/ProfilePage/SnackBar.vue';
import { getDoc } from '@firebase/firestore';

library.add(faCircleChevronLeft)

async function getUserDetails(user) {
  const docRef = doc(db, "email1@email.com", "userDetails");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let userData = docSnap.data();
    console.log("got info")
    return userData;
  } else {
    console.log("No such document!");
  }
}

const INPUT_FIELDS = [
  {
    inputName: "Username",
    placeholder: "Enter a username",
    label: "Username",
    type: "text",
    name: "username",
  },
  {
    inputName: "Password",
    placeholder: "Enter a new password",
    label: "Password",
    type: "password",
    name: "password",
  },
  {
    inputName: "Confirm Password",
    placeholder: "Confirm your password",
    label: "Password confirmation",
    type: "password",
    name: "passwordConfirmation",
  },
  {
    inputName: "Location",
    placeholder: "Enter a Location",
    label: "Location",
    type: "text",
    name: "location",
  }
]

const inputs = ref(INPUT_FIELDS)
const userInput = ref({
        username: "",
        password: "",
        passwordConfirmation: "",
        location: "",
      })

const auth = getAuth();
const user = auth.currentUser.email;
const userData = ref([])

onBeforeMount(async () => {
  const userDetails = await getUserDetails(user);
  userData.value = userDetails;
  userInput.value.username = userData.value.username
  userInput.value.location = userData.value.location
})

const fileInput = ref(null)
const imageData = ref('https://via.placeholder.com/300')

const disableSave = ref(true)

const handleClick = () => {
  fileInput.value.click()
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    imageData.value = reader.result
  }
}

function onChangeInput() {
  disableSave.value = false
}

</script>

<style scoped>
.file-input {
  display: none;
}
.page-title {
  font-size: 30px;
  font-weight: bold;
}

.container {
  width: 85%;
  height: auto;
  overflow: hidden;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 300px;
  height: 300px;
  /* border-radius is use to make circle */
  border-radius: 50%;
  border: solid 1px black;
  display: block;
  cursor: pointer;
  background-size: cover;
  background-position: center;
}

.details-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 73vh;
}

.input-wrapper {
  padding-top: 10px;
}

.input-title {
  font-size: 16px;
  color: var(--dark-grey-primary);
  padding-left: 10px;
}
.input-field {
  width: 800px;
  height: 70px;
  border-radius: 20px;
  border: solid 1px var(--dark-grey-primary);
}

.save-btn {
  background: var(--black-text-primary);
  color: var(--white-background-primary);
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.save-btn:hover:enabled {
  cursor: pointer;
  transform: translateY(-1px);
}

.save-btn:active:enabled {
  background: var(--dark-grey-primary);
  color: var(--white-background-primary);
}

.save-btn:disabled {
  opacity: 0.6;
}

.snackbar-wrapper {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 18%;
  border: solid 2px #4caf50;
  background: #d0fbc1;
  padding: 10px 15px;
  border-radius: 10px;
  position: fixed;
  right: 10px;
  top: calc(var(--header-height) + 15px);
}

.snackbar-text {
  font-size: 15px;
  margin-left: -5px;
  color: #3e9241;
  font-weight: bold;
}

.snackbar-icon {
  width: 25px;
  height: 25px;
  color: #3e9241;
}

.back-icon {
  width: 30px;
  height: 30px;
  position: fixed;
  left: 20px;
  top: calc(var(--header-height) + 15px);
}

.back-icon:hover {
  cursor: pointer;
}
</style>
