<script setup>
import axiosIns from "@/plugins/axios";
import { ref, defineProps } from "vue";

const { url } = defineProps(['url'])
const isDeleting = ref(false)
const emit = defineEmits(['update'])
const handleDelete = async() => {
  try {
    isDeleting.value = true;
    await axiosIns.delete(url);
    emit('update');

  } catch(e) {
    console.log(e);
  }finally{
    isDeleting.value = false
  }
}
</script>
<template>

  <VDialog max-width="700" persistent>
    <template #activator="{ props: activatorProps }">
      <VBtn flat icon=" mdi-trash-can text-red" class="ma-1" v-bind="activatorProps" />
    </template>
    <template #default="{ isActive }">
      <VCard class="bg-primary-surface rounded-xl pa-4">
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <p>Delete</p>
            <VBtn icon="mdi-close" flat :disabled="isDeleting" @click="isActive.value = false" style="border: 1px solid #CB5A5A; background-color: #F9ECEC;" class="text-red" />
          </div>
        </VCardTitle>
        <VCardText class="bg-white mx-3 mb-3 rounded-xl">
          Are you shore you want to delete this ?
        </VCardText>
        <VCardActions>
          <VBtn color="primary" flat class="ma-0 rounded-xl" :loading="isDeleting" @click="handleDelete"> Delete </VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
