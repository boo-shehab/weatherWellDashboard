<script lang="ts" setup>
import axiosIns from '@/plugins/axios';
import AddSensorTypeDialog from '@/view/SensorType/AddSensorTypeDialog.vue'
import SensorSettingDialog from '@/view/SensorType/SensorSettingDialog.vue'
import { onMounted, ref } from 'vue';

const sensorsType = ref([]);
const isLoading = ref(false);

const getSensorType = async() => {
  try {
    isLoading.value = true;
    sensorsType.value = [];
    const data = await axiosIns.get('sensor-type');
    sensorsType.value = data.data;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getSensorType();
})

</script>

<template>
  <header class="mb-6">
    <VRow align="center" class="bg-white border rounded-xl ma-0 px-1 py-1" gap="16">
      <VSpacer />
      <VCol class="flex-grow-0">
        <AddSensorTypeDialog @update="getSensorType()"/>
      </VCol>
    </VRow>
  </header>
  <main>
    <div v-if="!isLoading && sensorsType.length === 0">
      <div class="text-center pt-10">
        <VIcon size="60">mdi-developer-board</VIcon>
        <h3>you haven't added any types of sensor yet</h3>
      </div>
    </div>
    <VTable v-else class="bg-white border rounded-xl ma-0 px-1 py-1">
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <div v-if="isLoading" class="pa-3">
          <h3>
            loading...
          </h3>
        </div>
        <tr
          v-for="item in sensorsType"
          :key="item.name"
          class="text-secondary text-subtitle-1 weight-500"
        >
        <td>{{ item.name }}</td>
        <td style="text-wrap: nowrap;">
            <!-- <SensorSettingDialog :sensorTypeId="item.id" /> -->

          <VBtn flat icon="mdi-cog-outline" class="ma-1 text-secondary" :to="`/sensor-type/setting/${item.id}`" />
          <DeleteDialog :url="`sensor-type/${item.id}`"  @update="getSensorType()"/>
        </td>

        </tr>
      </tbody>
    </VTable>
  </main>
</template>


<style scoped>
.main-header {
  direction: rtl
}
</style>
