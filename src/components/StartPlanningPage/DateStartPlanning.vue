<template>
  <div class="date-container">
    <span class="dates">Dates</span>
    <VueDatePicker
      v-model="date"
      range
      placeholder="Start Date | End Date"
      auto-apply
      multi-calendars
      :format="formatDate"
      :enable-time-picker="false"
      class="dp"
    >
      <template #input-icon>
        <svg></svg>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const date = ref()

function formatDate(date) {
  const startDay = date[0]
  const endDay = date[1]

  return `${startDay.getDate()}/${startDay.getMonth()}/${startDay.getFullYear()} - ${endDay.getDate()}/${endDay.getMonth()}/${endDay.getFullYear()}`
}
</script>

<style scoped>
.date-container {
  position: relative;
  border: solid 2px var(--light-grey-primary);
  padding: 0px 10px 0px 25px;
  border-radius: 20px;
  line-height: 52px;
  width: 80%;
}

.dates {
  font-size: 20px;
  font-weight: bold;
}

/* Customizing Date Picker */
.dp__theme_light {
  --dp-border-color: none;
}

.dp {
  width: 90%;
  display: inline-block;
}
</style>
