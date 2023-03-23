<template>
  <div class="profile">
    <UserAvatar />
    <DetailsForm />
  </div>
</template>

<script setup>
import DetailsForm from '../components/ProfilePage/DetailsForm.vue'
import UserAvatar from '../components/ProfilePage/UserAvatar.vue'
</script>

<style scoped>
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin: 10%;
}
</style>
