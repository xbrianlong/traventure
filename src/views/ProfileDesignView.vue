<template>
  <TheHeader />
  <div class="view">
    <font-awesome-icon icon="fa-solid fa-circle-chevron-left" class="back-icon" />
    <div class="page-title">User Profile</div>
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
      <font-awesome-icon icon="fa-regular fa-circle-check" class="snackbar-icon" />
      <div class="snackbar-text">Your profile is saved successfully !</div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleCheck, faCircleChevronLeft)

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

.save-btn:hover {
  cursor: pointer;
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
</style>
