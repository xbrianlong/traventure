<template>
  <TheHeader />
  <div class="view">
    <h1 class="title">User Profile</h1>
    <div class="container">
      <div class="avatar"></div>
      <div class="details-wrapper">
        <div class="input-wrapper" v-for="(input, index) in inputs" :key="index">
          <div class="input-title">{{ input.inputName }}</div>
          <div class="input-field"></div>
        </div>

        <div class="save-btn">Save</div>
      </div>
    </div>
    <div class="snackbar-wrapper">
      <font-awesome-icon icon="fa-solid fa-circle-check" />
      <div class="snackbar-text">Your profile is saved successfully !</div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleCheck)

const inputs = ref([
  {
    inputName: 'Username'
  },
  {
    inputName: 'Email'
  },
  {
    inputName: 'Password'
  },
  {
    inputName: 'Confirm Password'
  },
  {
    inputName: 'Location'
  }
])
</script>

<style scoped>
.title {
  font-size: 35px;
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
  height: 80px;
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

.save-btn:hover {
  cursor: pointer;
}
</style>
