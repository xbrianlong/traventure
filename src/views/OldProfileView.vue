<template>
  <TheHeader />
  <div class="view">
    <div class="profile">
      <UserAvatar />
      <DetailsForm />
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import DetailsForm from '../components/ProfilePage/DetailsForm.vue'
import UserAvatar from '../components/ProfilePage/UserAvatar.vue'
</script>

<style scoped>
/* .profile {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin: 10%;
} */

.profile {
  display: flex;
  align-items: center;
  padding: 10%;
}
</style>
