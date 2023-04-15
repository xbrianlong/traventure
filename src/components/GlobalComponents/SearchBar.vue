<template>
  <div class="input-container">
    <v-icon icon="mdi-magnify" id="icon" size="large"></v-icon>
    <input
      type="text"
      id="search-input"
      placeholder="Search"
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
  background-color: var(--light-grey-primary);
  padding: 0px 10px 0px 25px;
  border-radius: 10px;
  line-height: 52px;
}

.input-container #icon {
  position: absolute;
  color: var(--dark-grey-primary);
  align-items: center;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  padding-left: 35px;
}

.input-container #search-input {
  line-height: normal;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--dark-grey-primary);
  width: 100%;
  padding-left: 40px;
}

.input-container input:focus {
  outline: none;
}
</style>
