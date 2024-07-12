<script lang="ts" setup>
import axiosIns from '@/plugins/axios';
import AddLocationDialog from '@/view/location/AddLocationDialog.vue'
import { onMounted, ref } from 'vue';

const locations = ref([]);
const isLoading = ref(false);

const getLocations = async() => {
  try {
    isLoading.value = true;
    locations.value = [];
    const data = await axiosIns.get('location');
    locations.value = data.data;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getLocations();
})

</script>

<template>
  <header class="mb-6">
    <VRow align="center" class="bg-white border rounded-xl ma-0 px-1 py-1" gap="16">
      <VSpacer />
      <VCol class="flex-grow-0">
        <AddLocationDialog @update="getLocations()"/>
      </VCol>
    </VRow>
  </header>
  <main>
    <div v-if="!isLoading && locations.length === 0">
      <div class="text-center pt-10">
        <VIcon size="60">mdi-map-marker-alert-outline</VIcon>
        <h3>you haven't added any location yet</h3>
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
          v-for="item in locations"
          :key="item.name"
          class="text-secondary text-subtitle-1 weight-500"
        >
        <td>{{ item.name }}</td>
        <td style="text-wrap: nowrap;">
          <AddLocationDialog :isEdit="true" :data="item" @update="getLocations()" />
          <DeleteDialog :url="`location/${item.id}`"  @update="getLocations()"/>
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
