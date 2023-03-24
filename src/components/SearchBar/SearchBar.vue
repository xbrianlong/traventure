<template>
  <div class="WhereTo">
    <v-combobox
      label="Where to?"
      :items="options"
      v-model="selectedOption"
      placeholder="Eg. Paris, Singapore, Japan"
    ></v-combobox>
  </div>

</template>

<script>
// import { mdiMapMarker } from '@mdi/js';

export default {
  data: () => ({
    options: [
      'California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'
    ],
    selectedOption: null
  }),
  watch: {
    selectedOption(newVal) {
      console.log(newVal);
    }
  }
}
</script>

<style>
.WhereTo {
  width:500px;
  margin:auto;
}
</style>