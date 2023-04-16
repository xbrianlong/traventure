<template>
  <div v-if="message" class="snackbar-wrapper">
    <font-awesome-icon icon="fa-regular fa-circle-check" class="snackbar-icon" />
    <div class="snackbar-text">{{ message }}</div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

library.add(faCircleCheck)

export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'warning', 'error'].includes(value)
    }
  }
}
</script>

<style scoped>
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
  margin-right: 10px;
}

.success {
  background-color: #4caf50;
}

.warning {
  background-color: #ffc107;
}

.error {
  background-color: #f44336;
}
</style>
