<script setup>
import { ref, watch } from 'vue';
// import { useStatisticsStore } from '@/store/StatisticsStore';

// const usersOverview = useStatisticsStore();

const months = ['','','','','','','','','','','','','','','','',''];

const isLoading = ref(false);
const yearNumbers = ref(['last day', 'last month', 'last year']);
const year = ref('last day')

const series = ref( [{
  name: 'alerts',
  data: [0,0,0,0,2,4,5]
}])
const chartOptions = ref({
    chart: {
    toolbar: false
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      colors: ['#00B9C0']
    },
    xaxis: {
      type: 'date',
        categories: months
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
  },
  fill: {
    colors: ['#FFFFFF'],
    opacity: 0
  }
})
</script>
<template>
  <v-sheet class="pa-6 rounded-xl">
    <v-row>
      <v-col>
        <p class="text-primary weight-700">Alerts</p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-combobox v-model="year" :items="yearNumbers" class="input-border combobox" flat></v-combobox>
      </v-col>
    </v-row>
    <div v-if="isLoading">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </div>
    <div id="chart" v-else>
      <apexchart type="area" height="350" :zoom="false" :options="chartOptions" :series="series"></apexchart>
    </div>
  </v-sheet>
</template>

<style>
.combobox .v-field__outline {
  display: none;
}

.combobox .v-field__overlay {
  width: 107px;
  height: 40px;
  padding: 8px 16px;
  opacity: 0;
  background-color: white !important;
}
</style>
