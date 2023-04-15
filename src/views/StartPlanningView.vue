<template>
  <TheHeader />
  <div>
    <div class="image-wrapper">
      <img src="../assets/images/startplanning-img.jpg" alt="startplanningimage" />
    </div>
    <div class="box-wrapper centered">
      <h2 class="box-title">Plan a new trip</h2>
      <div class="selections">
        <SearchStartPlanning />
        <DateStartPlanning />
        <!-- <DatePicker /> -->
      </div>
      <StartPlanningButton class="button" />
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import SearchStartPlanning from '../components/StartPlanningPage/SearchStartPlanning.vue'
import DateStartPlanning from '../components/StartPlanningPage/DateStartPlanning.vue'
import StartPlanningButton from '../components/StartPlanningPage/StartPlanningButton.vue'
</script>

<style scoped>
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  z-index: -1;
}

.image-wrapper img {
  height: 100vh;
  width: 100%;
  object-fit: cover;
}

.box-wrapper {
  width: 800px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box-title {
  font-size: 40px;
  margin-top: 30px;
}

.selections {
  margin-top: 30px;
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.button {
  margin-top: 50px;
}
</style>
