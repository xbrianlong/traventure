<template>
  <div class="input-container">
    <span class="dates">Dates</span>
    <input
      type="text"
      id="search-input"
      placeholder="e.g. Paris, China, Italy"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-container {
  position: relative;
  border: solid 2px var(--light-grey-primary);
  padding: 0px 10px 0px 25px;
  border-radius: 20px;
  line-height: 52px;
  width: 80%;
}

.input-container #search-input {
  font-weight: 300;
  font-size: 18px;
  font-style: italic;
  color: var(--dark-grey-primary);
  width: 80%;
  display: inline-flex;
  margin-left: 15px;
}

.input-container input:focus {
  outline: none;
}

.dates {
  font-size: 20px;
  font-weight: bold;
}
</style>
