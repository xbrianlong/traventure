<template>
  <TheHeader />
  <div class="view">
    <font-awesome-icon icon="fa-solid fa-circle-chevron-left" class="back-icon" />
    <div class="page-title">User Profile</div>
    <form 
      class="container" 
      @submit.prevent="submitForm">
      <div 
        class="avatar"
        :style="{ 'background-image': `url(${imageData})` }"
        @click="handleClick">
          <input
            class="file-input"
            ref="fileInput"
            type="file"
            @input="handleFileChange"
            @change="onChangeInput"
          >
      </div>
      <div class="details-wrapper">
        <div class="input-wrapper" v-for="input in inputs" :key="input.label">
          <div class="input-title">{{ input.inputName }}</div>
          <input
            class="input-field"
            v-model = "userInput[input.name]"
            :type = "input.type"
            :placeholder="input.placeholder"
            :name="input.name"
            @change="onChangeInput"
            >
        </div>

        <button 
          class="save-btn"
          :disabled="disableSave"
          type="submit"
          >Save</button>
        <!-- <div class="save-btn">Save</div> -->
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

import { db, storage } from '../firebase';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'
import SnackBar from '../components/ProfilePage/SnackBar.vue';
import { getDoc } from '@firebase/firestore';
import { ref as refer, uploadBytesResumable, getDownloadURL } from "firebase/storage";

library.add(faCircleChevronLeft)

async function getUserDetails(user) {
  const docRef = doc(db, user, "userDetails");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let userData = docSnap.data();
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
    inputName: "Location",
    placeholder: "Enter a Location",
    label: "Location",
    type: "text",
    name: "location",
  },
  {
    inputName: "New Password",
    placeholder: "Enter your old password",
    label: "Old password",
    type: "text",
    name: "oldPassword",
  },
  {
    inputName: "Old Password",
    placeholder: "Enter a new password",
    label: "New password",
    type: "text",
    name: "newPassword",
  },
  {
    inputName: "Confirm Password",
    placeholder: "Confirm your password",
    label: "Password confirmation",
    type: "text",
    name: "passwordConfirmation",
  }
]

const inputs = ref(INPUT_FIELDS)
const userInput = ref({
        username: "",
        location: "",
        oldPassword: "",
        newPassword: "",
        passwordConfirmation: "",
      })

const auth = getAuth();
const user = auth.currentUser.email;
const userData = ref([])
//change default image
const imageData = ref('https://via.placeholder.com/300')

onBeforeMount(async () => {
  const userDetails = await getUserDetails(user);
  userData.value = userDetails;
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
  const storageRef = refer(storage, `images/${fileName}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      console.log(error)
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        imageData.value = downloadURL
      });
    }
  );
}

//enables save button when there is an input
function onChangeInput() {
  disableSave.value = false
}

//show snackbar but i think can input variables so snackbar's message and type can change
function showSnackBar() {
  message.value = 'Your profile is saved successfully!'
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

//save button feature
async function submitForm() {
  //for changing of image/userdetails
  const data = {
    username: userInput.value.username,
    location: userInput.value.location,
    img: imageData.value,
  }
  try {
      await setDoc(doc(db, user, "userDetails"), data);
  } catch (error) {
      console.log(error);
  }
  //for changing of password
  let reset = false
  if (userInput.value.oldPassword && userInput.value.newPassword && userInput.value.passwordConfirmation) {
    reset = true
  }
  if (reset) {
    //maybe can make sure the password rules work before this block runs
    //then a else clause to show failure in a snackbar
    console.log("resetting...")
    try {
      const credential = EmailAuthProvider.credential(
        user,
        userInput.value.oldPassword
      )
      await reauthenticateWithCredential(
        auth.currentUser,
        credential
      ).then(() => {
        if (userInput.value.newPassword == userInput.value.passwordConfirmation) {
          updatePassword(auth.currentUser, userInput.value.newPassword)
          console.log("password updated")
          //prob can add to the message in the snackbar that password updated
        } else {
          console.log("failure to update")
          //idk what other rules there needs to be but this is the failure clause
        }
      })
    } catch (error) {
      console.log(error);
      //prob can add a snackbar failure here
      //both update password and reauth errors will end up here
    }
  }
  console.log("done")
  showSnackBar()
  //success snackbar, needa somehow isolate this to show only if successful
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
