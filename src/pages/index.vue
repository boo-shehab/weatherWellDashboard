<script setup>
import CustomIcon from '@/components/CustomIcon.vue'
import adminIcon from '@/assets/Icons/admin.svg'
import generationsIcon from '@/assets/Icons/generationsIcon.svg'
import userGroupIcon from '@/assets/Icons/userGroupIcon.svg'
import calendarDownloadIcon from '@/assets/Icons/calendarDownloadIcon.svg'
import UsersChart from '@/components/charts/UsersChart.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import axiosIns from '@/plugins/axios'
const router = useRouter();

const Statistics = ref({
  totalTemplates: 120,
  totalGenerations: 3500,
  totalUsers: 200,
  todayGenerations: 150
});
const isLoading = ref(true)
function getTimePassed(startDate) {
  const currentDate = new Date();
  const startDateObj = new Date(startDate);
  const timeDifference = currentDate.getTime() - startDateObj.getTime();

  const millisecondsInHour = 1000 * 60 * 60;
  const millisecondsInDay = millisecondsInHour * 24;
  const millisecondsInWeek = millisecondsInDay * 7;
  const millisecondsInMonth = millisecondsInDay * 30;
  const millisecondsInYear = millisecondsInDay * 365;

  if (timeDifference < millisecondsInHour) {
    return `${Math.floor(timeDifference / 1000 / 60)} minutes ago`;
  } else if (timeDifference < millisecondsInDay) {
    return `${Math.floor(timeDifference / millisecondsInHour)} hours ago`;
  } else if (timeDifference < millisecondsInWeek) {
    return `${Math.floor(timeDifference / millisecondsInDay)} days ago`;
  } else if (timeDifference < 4 * millisecondsInWeek) {
    return `${Math.floor(timeDifference / millisecondsInWeek)} weeks ago`;
  } else if (timeDifference < 12 * millisecondsInMonth) {
    return `${Math.floor(timeDifference / millisecondsInMonth)} months ago`;
  } else {
    return `${Math.floor(timeDifference / millisecondsInYear)} years ago`;
  }
}

// const loadData = async () => {
//   isLoading.value = true;
//   await StatisticsStore.getStatistics();
//   await generation.getGeneration();
//   Statistics.value = StatisticsStore.statistics;
//   isLoading.value = false;
// }
// loadData();
const counters = ref({
  users: 0,
  controller: 0,
  admin: 0,
  disease: 0
})
const getData = async() => {
  try {
    const {data} = await axiosIns.get('counter')
    counters.value = data;
    console.log(data)
  }catch(e) {
    console.log(e);
  }
}
onMounted(() => {
  getData()
})
</script>

<template>
  <!-- <div v-if="isLoading">
    <v-progress-linear indeterminate color="primary"></v-progress-linear>
  </div> -->
  <main>
    <v-row class="bg-white custom-border ma-0">
      <v-col cols="6" sm="6" md="3" class="pa-0 ma-0 col-border">
        <v-card flat class="pa-0 ma-0">
          <template #title>
            <span class="text-sm-subtitle-2 text-caption text-secondary">admins</span>
            <br />
            <span class="text-sm-h4 text-h5 text-black opacity-1">{{ counters.admin }}</span>
          </template>
          <template #prepend>
            <CustomIcon :icon="adminIcon" bg-color="#F9ECEC" border-color="#CB5A5A" />
          </template>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6" md="3" class="pa-0 ma-0 col-border">
        <v-card flat class="pa-0 ma-0">
          <template #title>
            <span class="text-sm-subtitle-2 text-caption text-secondary">controllers </span>
            <br />
            <span class="text-sm-h4 text-h5 text-black opacity-1">{{ counters.controller}}</span>
          </template>

          <template #prepend>
            <!-- mdi-file-tree -->
            <v-icon class="customIcon-style text-green" :style="`border: 1px solid #008636; background-color:#F5FFF9;`">
              mdi-file-tree
            </v-icon>
            <!-- <CustomIcon :icon="generationsIcon" bg-color="#F5FFF9" border-color="#008636" /> -->
          </template>
        </v-card>
      </v-col>
      <v-col cols="6" md="3" class="pa-0 ma-0 col-border">
        <v-card flat class="pa-0 ma-0">

          <template #title>
            <span class="text-sm-subtitle-2 text-caption text-secondary">Users </span>
            <br />
            <span class="text-sm-h4 text-h5 text-black opacity-1">{{ counters.users }}</span>
          </template>

          <template #prepend>
            <CustomIcon :icon="userGroupIcon" bg-color="#FFFDF5" border-color="#F5CE00" />
          </template>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6" md="3" class="pa-0 ma-0 col-border">
        <v-card flat class="pa-0 ma-0">

          <template #title>
            <span class="text-sm-subtitle-2 text-caption text-secondary">Heath alerts</span>
            <br />
            <span class="text-sm-h4 text-h5 text-black opacity-1">{{ counters.disease }}</span>
          </template>

          <template #prepend>
            <v-icon class="customIcon-style text-orange" :style="`border: 1px solid #F58400; background-color:#FFFAF5;`">
              mdi-bell-alert-outline
            </v-icon>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="5" lg="4">
      </v-col>
      <v-col cols="12">
        <GenerateChart />
      </v-col>
    </v-row>
  </main>
</template>

<style scoped>
.custom-border {
  border: 1px solid #EEF1F7;
  border-radius: 24px;
  overflow: hidden;
}

.col-border {
  border-right: 1px solid #EEF1F7
}

.timeline-style {
  justify-content: start;
}

.timeline-style .v-timeline-item__opposite {
  padding: 0 !important;
}
.frame-button {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: rgba(203, 90, 90, 0.04);
  border: 1.34px solid #CB5A5A;
  box-shadow: 0px 0px 16px 0px #CB5A5A3D inset;
  height: 82px;
  padding: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
  border-radius: 32px;
}
</style>
