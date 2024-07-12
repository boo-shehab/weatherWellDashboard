<script lang="ts" setup>
import axiosIns from '@/plugins/axios';
import AddAllergyDialog from '@/view/Allergy/AddAllergyDialog.vue'
import AllergySettingDialog from '@/view/Allergy/AllergySettingDialog.vue'
import { onMounted, ref } from 'vue';

const disease = ref([]);
const isLoading = ref(null);

const getControllers = async() => {
  try {
    isLoading.value = true;
    disease.value = [];
    const data = await axiosIns.get('disease');
    disease.value = data.data;
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
        <AddAllergyDialog @update="getControllers()" />
      </VCol>
    </VRow>
  </header>
  <main>
    <div v-if="!isLoading && disease.length === 0">
      <div class="text-center pt-10">
        <VIcon size="60">mdi-allergy</VIcon>
        <h3>you haven't added any allergy yet</h3>
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
        <tr v-else
          v-for="item in disease"
          :key="item.name"
          class="text-secondary text-subtitle-1 weight-500"
        >
          <td>{{ item?.name }}</td>
          <td style="text-wrap: nowrap;">
            <VBtn flat icon="mdi-cog-outline" class="ma-1 text-secondary" :to="`/Allergy/setting/${item.id}`" />
            <DeleteDialog :url="`disease/${item.id}`" @update="getControllers()" />
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
