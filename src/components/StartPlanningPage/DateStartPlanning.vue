<template>
  <div class="date-container" id="date-text-field">
    <span class="dates">Dates</span>
    <VueDatePicker
      :model-value="date"
      @update:model-value="handleDate"
      range
      placeholder="Start Date   |   End Date"
      auto-apply
      multi-calendars
      :format="formatDate"
      :enable-time-picker="false"
      class="dp"
      :offset="20"
      max-range="30"
    >
      <template #input-icon>
        <svg></svg>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update-date'])

const date = ref()

function handleDate(modelData) {
  date.value = modelData
  emit('update-date', date.value)
}

function formatDate(date) {
  const startDay = date[0]
  const endDay = date[1]
  return `${startDay.getDate()}/${startDay.getMonth()}/${startDay.getFullYear()} - ${endDay.getDate()}/${endDay.getMonth()}/${endDay.getFullYear()}`
  // return `${startDay.toDateString()} - ${endDay.toDateString()}`
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
  line-height: initial;
}
</style>
