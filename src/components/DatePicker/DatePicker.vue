<template>
  <div class="DatePicker">
    <v-row>
      <v-col cols="12" sm="6">
        <p>Select Dates: </p>
        <VueDatePicker v-model="dates" range :dateFormat="dateFormat"></VueDatePicker>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { format } from 'date-fns';

export default {
  components: { VueDatePicker },
  data: () => ({
    dates: [
      new Date('2019-09-10'),
      new Date('2019-09-20'),
    ],
    dateFormat: 'yyyy-MM-dd',
  }),
  computed: {
    dateRangeText() {
      const formattedDates = this.dates.map(date => format(date, this.dateFormat));
      return formattedDates.join(' ~ ');
    },
  },
  watch: {
    dates(newDates) {
      const startDate = format(newDates[0], this.dateFormat);
      const endDate = format(newDates[1], this.dateFormat);
      console.log(`Selected date range: ${startDate} - ${endDate}`);
    },
  },
}
</script>


<style>
.DatePicker{
  width:1000px;
  margin:auto;
}
</style> 