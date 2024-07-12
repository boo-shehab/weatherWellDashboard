<script lang="ts" setup>
import axiosIns from '@/plugins/axios';
import AddDeviceDialog from '@/view/Devices/AddDeviceDialog.vue'
import DeviceSettingDialog from '@/view/Devices/DeviceSettingDialog.vue'
import { onMounted, ref } from 'vue';

const controllers = ref([]);
const isLoading = ref(null);

const getControllers = async() => {
  try {
    isLoading.value = true;
    controllers.value = [];
    const data = await axiosIns.get('controller');
    controllers.value = data.data;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getControllers();
})

</script>

<template>
  <header class="mb-6">
    <VRow align="center" class="bg-white border rounded-xl ma-0 px-1 py-1" gap="16">
      <VSpacer />
      <VCol class="flex-grow-0">
        <AddDeviceDialog @update="getControllers()" />
      </VCol>
    </VRow>
  </header>
  <main>
    <div v-if="!isLoading && controllers.length === 0">
      <div class="text-center pt-10">
        <VIcon size="60">mdi-memory</VIcon>
        <h3>you haven't create any device yet</h3>
      </div>
    </div>
    <VTable v-else class="bg-white border rounded-xl ma-0 px-1 py-1">
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            key
          </th>
          <th class="text-left">
            Location
          </th>
          <th class="text-left">
            Status
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
        <tr v-else
          v-for="item in controllers"
          :key="item.name"
          class="text-secondary text-subtitle-1 weight-500"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.location.name }}</td>
          <td><VChip :class="!item.isActive? 'bg-green' : 'bg-red'">{{ !item.isActive? 'Connected' : 'disconnected' }}</VChip></td>
          <td style="text-wrap: nowrap;">
            <DeviceSettingDialog :deviceId="item.id"/>
            <DeleteDialog :url="`controller/${item.id}`" @update="getControllers()" />
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
