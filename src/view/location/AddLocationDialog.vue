<script setup>
import axiosIns from "@/plugins/axios";
import { RuleRequired } from "@/utils/rules";
import { onMounted, ref, watch } from "vue";


const { isEdit, data } = defineProps(['isEdit', 'data'])
const locations = ref()
const isPosting = ref(false)
const name = ref('')
const form = ref(null);
const isDialogOpen = ref(false)
const emit = defineEmits(['update'])
const handleSubmit = async() => {

  const isValid = await (form.value)?.validate();
    if (!isValid.valid)  throw Error;
  try {
    isPosting.value = true;
    if(isEdit){
      await axiosIns.put(`location/${data.id}`,{name: name.value});
    }else {
      await axiosIns.post('location',{name: name.value});
    }
    emit('update')
    name.value = '';
    locations.value = null;
    isDialogOpen.value = false;
  } catch(e) {
    console.log(e);
  }finally{
    isPosting.value = false
  }
}

const isNameUnique = (value) => {
  return !locations.value.some(location => location.name.toLowerCase() === value.toLowerCase()) || 'Name already exists';
}

const getLocations = async ()=> {
  try{
    const data = await axiosIns.get('location');
    locations.value = data.data;
  } catch(e) {
    console.log(e);
  }
}

watch(isDialogOpen, () => {
  if(isDialogOpen.value) {
    getLocations()
    if(isEdit) {
      name.value = data.name;
    } else {
      name.value = ''
    }
  }
})

</script>
<template>

  <VDialog max-width="700" persistent v-model="isDialogOpen">
    <template #activator>

      <VBtn v-if="isEdit" flat icon="mdi-pencil-outline" @click="isDialogOpen = true" class="ma-1" />
      <VBtn v-else color="primary" flat class="ma-0 rounded-xl" @click="isDialogOpen = true" prepend-icon="mdi-plus"> add </VBtn>
    </template>
    <template #default>
      <VCard class="bg-primary-surface rounded-xl pa-4">
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <p>add location</p>
            <VBtn icon="mdi-close" flat @click="isDialogOpen = false" :disabled="isPosting" style="border: 1px solid #CB5A5A; background-color: #F9ECEC;" class="text-red" />
          </div>
        </VCardTitle>
        <VCardText class="bg-white mx-3 mb-3 rounded-xl">
          <VForm ref="form" fast-fail @submit.prevent="handleSubmit">
            <label for="name" class="text-neutral-900 weight-500">location</label>
            <VTextField
            id="name"
            variant="outlined"
            class="input-border my-4"
            v-model="name"
            :rules="[RuleRequired, isNameUnique]"
            required />

            <VBtn color="primary" flat class="ma-0 rounded-xl" :loading="isPosting" type="submit">submit</VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </template>
  </VDialog>
</template>
