<script setup>
import axiosIns from "@/plugins/axios";
import { RuleRequired } from "@/utils/rules";
import { ref } from "vue";

const isPosting = ref(false)
const name = ref('')
const openDialog = ref(false)
const form = ref(null);
const emit = defineEmits(['update'])
const handleSubmit = async() => {

  const isValid = await form.value.validate();
    if (!isValid.valid)  return;
  try {
    isPosting.value = true;
    await axiosIns.post('sensor-type',{name: name.value});
    emit('update')
    openDialog.value = false
    name.value = '';
  } catch(e) {
    console.log(e);
  }finally{
    isPosting.value = false
  }
}
</script>
<template>

  <VDialog max-width="700" persistent v-model="openDialog">
    <template #activator>
      <VBtn color="primary" flat class="ma-0 rounded-xl" @click="openDialog = true" prepend-icon="mdi-plus"> add </VBtn>
    </template>
    <template #default>
      <VCard class="bg-primary-surface rounded-xl pa-4">
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <p>add sensor type</p>
            <VBtn icon="mdi-close" flat @click="openDialog = false" :disabled="isPosting" style="border: 1px solid #CB5A5A; background-color: #F9ECEC;" class="text-red" />
          </div>
        </VCardTitle>
        <VCardText class="bg-white mx-3 mb-3 rounded-xl">
          <VForm ref="form" fast-fail @submit.prevent="handleSubmit()">
            <label for="name" class="text-neutral-900 weight-500">sensor name</label>
            <VTextField
            id="name"
            variant="outlined"
            :rules="[RuleRequired]"
            class="input-border my-4"
            v-model="name"
            required />

            <VBtn color="primary" flat class="ma-0 rounded-xl" :loading="isPosting" type="submit">submit</VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </template>
  </VDialog>
</template>
