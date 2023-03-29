<template>
  <div v-if="message" class="snackbar" :class="type">
    {{ message }}
  </div>
</template>

<script>
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
.snackbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  border-radius: 4px;
  transition: transform 0.3s ease-in-out;
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
