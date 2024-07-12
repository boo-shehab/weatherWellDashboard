<script setup>
import axiosIns from "@/plugins/axios";
import { RuleRequired } from "@/utils/rules";
import { onMounted, ref } from "vue";

const sensorsType = ref()
const isPosting = ref(false)
const sensorTypeId = ref('')
const name = ref('')
const form = ref(null);
const emit = defineEmits(['update'])

const handleSubmit = async() => {

  const isValid = await (form.value)?.validate();
    if (!isValid.valid) throw Error;
  try {
    isPosting.value = true;
    await axiosIns.post('disease',{name: name.value, sensorTypeId: sensorTypeId.value});
    emit('update')
    name.value = '';
    sensorTypeId.value = '';
  } catch(e) {
    console.log(e);
  }finally{
    isPosting.value = false
  }
}
const getSensorsType = async ()=> {
  try{
    const data = await axiosIns.get('sensor-type');
    sensorsType.value = data.data;
  } catch(e) {
    console.log(e);
  }
}
onMounted(() => {
  getSensorsType()
})
</script>
<template>

  <VDialog max-width="700" persistent>
    <template #activator="{ props: activatorProps }">
      <VBtn color="primary" flat class="ma-0 rounded-xl" v-bind="activatorProps" prepend-icon="mdi-plus"> add </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard class="bg-primary-surface rounded-xl pa-4">
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <p>add health alert</p>
            <VBtn icon="mdi-close" flat @click="isActive.value = false" :disabled="isPosting" style="border: 1px solid #CB5A5A; background-color: #F9ECEC;" class="text-red" />
          </div>
        </VCardTitle>
        <VCardText class="bg-white mx-3 mb-3 rounded-xl">
          <VForm ref="form" fast-fail @submit.prevent="async() => {
            await handleSubmit().then(() => {
              isActive.value = false;
            })
          }">
            <label for="name" class="text-neutral-900 weight-500">alert name</label>
            <VTextField
            id="name"
            variant="outlined"
            class="input-border my-4"
            :rules="[RuleRequired]"
            v-model="name"
            required />

            <label for="location" class="text-neutral-900 weight-500">sensor type</label>
            <VAutocomplete
            id="location"
            variant="outlined"
            :items="sensorsType"
            item-title="name"
            item-value="id"
            :rules="[RuleRequired]"
            class="input-border my-4"
            v-model="sensorTypeId"
            required />

            <VBtn
              color="primary"
              flat
              class="ma-0 rounded-xl"
              type="submit"
              :loading="isPosting">submit</VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </template>
  </VDialog>
</template>
