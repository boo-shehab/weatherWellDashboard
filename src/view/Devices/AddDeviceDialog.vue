<script setup>
import axiosIns from "@/plugins/axios";
import { RuleRequired } from "@/utils/rules";
import { onMounted, ref } from "vue";

const locations = ref()
const isPosting = ref(false)
const location = ref('')
const name = ref('')
const form = ref(null);
const emit = defineEmits(['update'])

const handleSubmit = async() => {

  const isValid = await (form.value)?.validate();
    if (!isValid.valid) throw Error;
  try {
    isPosting.value = true;
    await axiosIns.post('controller',{name: name.value, locationId: location.value});
    emit('update')
    name.value = '';
    locations.value = null;
    location.value = '';
  } catch(e) {
    console.log(e);
  }finally{
    isPosting.value = false
  }
}
const getLocations = async ()=> {
  try{
    const data = await axiosIns.get('location');
    locations.value = data.data;
  } catch(e) {
    console.log(e);
  }
}
onMounted(() => {
  getLocations()
})
</script>
<template>

  <VDialog max-width="700" persistent>
    <template #activator="{ props: activatorProps }">
      <VBtn color="primary" flat class="ma-0 rounded-xl" v-bind="activatorProps" prepend-icon="mdi-plus"> Create </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard class="bg-primary-surface rounded-xl pa-4">
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <p>create device</p>
            <VBtn icon="mdi-close" flat @click="isActive.value = false" :disabled="isPosting" style="border: 1px solid #CB5A5A; background-color: #F9ECEC;" class="text-red" />
          </div>
        </VCardTitle>
        <VCardText class="bg-white mx-3 mb-3 rounded-xl">
          <VForm ref="form" fast-fail @submit.prevent="async() => {
            await handleSubmit().then(() => {
              isActive.value = false;
            })
          }">
            <label for="name" class="text-neutral-900 weight-500">device name</label>
            <VTextField
            id="name"
            variant="outlined"
            class="input-border my-4"
            :rules="[RuleRequired]"
            v-model="name"
            required />

            <label for="location" class="text-neutral-900 weight-500">location</label>
            <VAutocomplete
            id="location"
            variant="outlined"
            :items="locations"
            item-title="name"
            item-value="id"
            :rules="[RuleRequired]"
            class="input-border my-4"
            v-model="location"
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
