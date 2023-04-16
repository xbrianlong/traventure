<template>
  <TheHeader />
  <div class="view">
    <font-awesome-icon icon="fa-solid fa-circle-chevron-left" class="back-icon" />
    <div></div>
    <div class="page-title">User Profile</div>
    <form class="container" @submit.prevent="submitForm">
      <div class="avatar" :style="{ 'background-image': `url(${imageData})` }" @click="handleClick">
        <input
          class="file-input"
          ref="fileInput"
          type="file"
          @input="handleFileChange"
          @change="onChangeInput"
        />
      </div>
      <div class="details-wrapper">
        <div class="input-wrapper">
          <div class="input-title">{{ inputUsername.inputName }}</div>
          <input
            class="input-field"
            v-model="userInput[inputUsername.name]"
            :type="inputUsername.type"
            :placeholder="inputUsername.placeholder"
            :name="inputUsername.name"
            @change="onChangeInput"
            minlength="2"
            oninvalid="setCustomValidity('Username must be at least 2 characters long')"
          />
        </div>
        <div class="input-wrapper">
          <div class="input-title">{{ inputLocation.inputName }}</div>
          <input
            class="input-field"
            v-model="userInput[inputLocation.name]"
            :type="inputLocation.type"
            :placeholder="inputLocation.placeholder"
            :name="inputLocation.name"
            @change="onChangeInput"
          />
        </div>
        <div class="input-wrapper">
          <div class="input-title">{{ inputOldPassword.inputName }}</div>
          <input
            class="input-field"
            id="old-password"
            v-model="userInput[inputOldPassword.name]"
            :type="inputOldPassword.type"
            :placeholder="inputOldPassword.placeholder"
            :name="inputOldPassword.name"
            @change="checkOldPassword"
          />
        </div>
        <div class="input-wrapper">
          <div class="input-title">{{ inputNewPassword.inputName }}</div>
          <input
            class="input-field"
            id="new-password"
            v-model="userInput[inputNewPassword.name]"
            :type="inputNewPassword.type"
            :placeholder="inputNewPassword.placeholder"
            :name="inputNewPassword.name"
            @change="checkNewPassword"
          />
        </div>
        <div class="input-wrapper">
          <div class="input-title">{{ inputConfirmPassword.inputName }}</div>
          <input
            class="input-field"
            id="confirm-password"
            v-model="userInput[inputConfirmPassword.name]"
            :type="inputConfirmPassword.type"
            :placeholder="inputConfirmPassword.placeholder"
            :name="inputConfirmPassword.name"
            @change="checkConfirmPassword"
          />
        </div>
        <button class="save-btn" :disabled="disableSave" type="submit">Save</button>
      </div>
    </form>
    <SnackBar :message="message" :type="type" />
  </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'

import { ref, onBeforeMount } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { db, storage } from '../firebase'
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import SnackBar from '../components/ProfilePage/SnackBar.vue'
import { getDoc } from '@firebase/firestore'
import { ref as refer, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

library.add(faCircleChevronLeft)

async function getUserDetails(user) {
  const docRef = doc(db, user, 'userDetails')
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    let userData = docSnap.data()
    return userData
  } else {
    console.log('No such document!')
  }
}

const inputUsername = {
  inputName: 'Username',
  placeholder: 'Enter a username',
  label: 'Username',
  type: 'text',
  name: 'username'
}
const inputLocation = {
  inputName: 'Location',
  placeholder: 'Enter a Location',
  label: 'Location',
  type: 'text',
  name: 'location'
}
const inputOldPassword = {
  inputName: 'Old Password',
  placeholder: 'Enter your old password',
  label: 'Old password',
  type: 'text',
  name: 'oldPassword'
}
const inputNewPassword = {
  inputName: 'New Password',
  placeholder: 'Enter a new password',
  label: 'New password',
  type: 'text',
  name: 'newPassword'
}
const inputConfirmPassword = {
  inputName: 'Confirm Password',
  placeholder: 'Confirm your password',
  label: 'Password confirmation',
  type: 'text',
  name: 'passwordConfirmation'
}

const userInput = ref({
  username: '',
  location: '',
  oldPassword: '',
  newPassword: '',
  passwordConfirmation: ''
})

const auth = getAuth()
const user = auth.currentUser.email
const userData = ref([])
//change default image
const imageData = ref('https://via.placeholder.com/300')

onBeforeMount(async () => {
  const userDetails = await getUserDetails(user)
  userData.value = userDetails
  if (userDetails) {
    if (userData.value.username) {
      userInput.value.username = userData.value.username
    }
    if (userData.value.location) {
      userInput.value.location = userData.value.location
    }
    if (userData.value.img) {
      imageData.value = userData.value.img
    }
  }
})

const fileInput = ref(null)

const disableSave = ref(true)
const message = ref('')
const type = ref('success')

//handle on click for image
const handleClick = () => {
  fileInput.value.click()
}

//handle uploading for image
const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const fileName = new Date().getTime() + file.name
  const storageRef = refer(storage, `images/${fileName}`)

  const uploadTask = uploadBytesResumable(storageRef, file)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
    },
    (error) => {
      console.log(error)
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        imageData.value = downloadURL
      })
    }
  )
}

//enables save button when there is an input
function onChangeInput() {
  disableSave.value = false
}

//checks validity of confirm password field and shows the correct error messages
function checkConfirmPassword() {
  disableSave.value = false
  var input = document.getElementById('confirm-password')
  if (!/^(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(input.value)) {
    input.setCustomValidity(
      'Password needs to have 7-15 characters and contain at least one numeric digit and a special character'
    )
  } else if (input.value != document.getElementById('new-password').value) {
    input.setCustomValidity('Passwords are not matching')
  } else {
    input.setCustomValidity('')
  }
}

//function to check that old password inputted matches the one in firebase
async function checkOldPassword() {
  disableSave.value = false
  var input = document.getElementById('old-password')
  try {
    const credential = EmailAuthProvider.credential(user, userInput.value.oldPassword)
    await reauthenticateWithCredential(auth.currentUser, credential).then(() => {
      input.setCustomValidity('')
    })
  } catch (FirebaseError) {
    console.log(FirebaseError)
    input.setCustomValidity('Your old password is wrong')
  }
}

//checks validity of new password field and shows the correct error messages
function checkNewPassword() {
  disableSave.value = false
  var input = document.getElementById('new-password')
  if (!/^(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(input.value)) {
    input.setCustomValidity(
      'Password needs to have 7-15 characters and contain at least one numeric digit and a special character'
    )
  } else {
    input.setCustomValidity('')
  }
}

//show snackbar but i think can input variables so snackbar's message and type can change
function showSnackBar(msg) {
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

//save button feature
async function submitForm() {
  const errorArr = []
  //for changing of image/userdetails
  const data = {
    username: userInput.value.username,
    location: userInput.value.location,
    img: imageData.value
  }
  try {
    await setDoc(doc(db, user, 'userDetails'), data)
  } catch (error) {
    console.log(error)
    errorArr.push(error)
  }
  //for changing of password
  let reset = false
  if (
    userInput.value.oldPassword &&
    userInput.value.newPassword &&
    userInput.value.passwordConfirmation
  ) {
    reset = true
  }
  if (reset) {
    //maybe can make sure the password rules work before this block runs
    //then a else clause to show failure in a snackbar
    console.log('resetting...')
    try {
      const credential = EmailAuthProvider.credential(user, userInput.value.oldPassword)
      await reauthenticateWithCredential(auth.currentUser, credential).then(() => {
        if (userInput.value.newPassword == userInput.value.passwordConfirmation) {
          updatePassword(auth.currentUser, userInput.value.newPassword)
          console.log('password updated')
          //prob can add to the message in the snackbar that password updated
        } else {
          console.log('failure to update')
          //idk what other rules there needs to be but this is the failure clause
        }
      })
    } catch (error) {
      console.log(error)
      //prob can add a snackbar failure here
      //both update password and reauth errors will end up here
    }
  }
  console.log('done')
  showSnackBar('Your profile is saved successfully')
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
  height: 100%;
  overflow: hidden;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}

.avatar {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: block;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  margin-right: 5%;
}

.details-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 73vh;
}

.input-wrapper {
  padding-top: 5px;
}

.input-title {
  font-size: 16px;
  color: var(--dark-grey-primary);
  padding-left: 10px;
}
.input-field {
  width: 70vh;
  height: 8vh;
  border-radius: 15px;
  border: solid 1px var(--dark-grey-primary);
  padding-left: 10px;
}

.save-btn {
  background: var(--black-text-primary);
  color: var(--white-background-primary);
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 20px;
  font-weight: bold;
  bottom: 0px;
  right: 0px;
  width: 20vh;
  position: absolute;
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
