<script setup>
import { ref, watch } from 'vue';
import axiosIns from "@/plugins/axios";
import { RuleRequired } from "@/utils/rules";

const { diseaseId } = defineProps(['diseaseId']);
const openDialog = ref(false);
const diseaseData = ref({ name: '' });
const savedDisease = ref({name: ''})
const FormDataEdit = ref([]);
const isPosting = ref(false);
const diseaseMessages = ref([]);
const form = ref(null);

const handleSubmit = async () => {
  const isValid = await form.value.validate();
  if (!isValid) return;

  try {
    isPosting.value = true;
    console.log(diseaseData.value.name, savedDisease.value.name)
    if(diseaseData.value.name !== savedDisease.value.name){
      await axiosIns.put(`disease/${diseaseId}`, diseaseData.value)
    }
    for(let i = 0; i < diseaseMessages.value.length; i++) {
      const currentData = diseaseMessages.value[i];
      currentData.maxValue = parseInt(currentData.maxValue)
      currentData.minValue = parseInt(currentData.minValue)
      const originalData = FormDataEdit.value.find(item => item.id === currentData.id);
      if(!originalData) {
        await axiosIns.delete(`disease-message/${currentData.id}`)
      }
    }
    for (let i = 0; i < FormDataEdit.value.length; i++) {

      const currentData = FormDataEdit.value[i];
      currentData.maxValue = parseInt(currentData.maxValue)
      currentData.minValue = parseInt(currentData.minValue)
      const originalData = diseaseMessages.value.find(item => item.id === currentData.id);

      if (!originalData) {
        await axiosIns.post('disease-message', currentData);
      } else if (JSON.stringify(currentData) !== JSON.stringify(originalData)) {
        const id = currentData.id
        delete currentData.id
        await axiosIns.put(`disease-message/${id}`, currentData);
      }
    }
    openDialog.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    isPosting.value = false;
  }
};

const getDiseaseData = async () => {
  try {
    const { data } = await axiosIns.get(`disease/${diseaseId}`);
    const { data: diseaseMessagesData } = await axiosIns.get(`disease-message/${diseaseId}`);
    diseaseMessages.value = diseaseMessagesData;
    FormDataEdit.value = diseaseMessagesData.map(msg => ({
      ...msg,
      diseaseId: diseaseId
    }));
    diseaseData.value.name = data.name;
    savedDisease.value.name = data.name
  } catch (e) {
    console.log(e);
  }
};

const addNewMessage = () => {
  FormDataEdit.value.push({
    diseaseId: diseaseId,
    title: '',
    description: '',
    minValue: 0,
    maxValue: 0
  });
};

const deleteMessage = (index) => {
  FormDataEdit.value = FormDataEdit.value.filter((val, ind) => ind !== index);
}

watch(openDialog, (newVal) => {
  if (newVal) {
    getDiseaseData();
  }
});
</script>

<template>
  <VDialog max-width="700" persistent v-model="openDialog">
    <template #activator>
      <VBtn flat icon="mdi-cog-outline" class="ma-1" @click="openDialog = true" />
    </template>
    <template #default>
      <VCard class="bg-primary-surface rounded-xl pa-4">
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <p>Device Setting</p>
            <VBtn icon="mdi-close" flat @click="openDialog = false" :disabled="isPosting" class="text-red" />
          </div>
        </VCardTitle>
        <VCardText class="bg-white mx-3 mb-3 rounded-xl">
          <VForm ref="form" fast-fail @submit.prevent="handleSubmit">
            <label for="name" class="text-neutral-900 weight-500">Disease Name</label>
            <VTextField
              id="name"
              variant="outlined"
              :loading="isPosting"
              v-model="diseaseData.name"
              class="input-border my-4"
              :rules="[RuleRequired]"
              required />

            <VRow>
              <VCol cols="12" v-for="(formdata, index) in FormDataEdit" :key="index">
                <VBtn flat icon=" mdi-trash-can text-red" class="ma-1" @click="deleteMessage(index)" />
                  <label :for="`title${index}`" class="text-neutral-900 weight-500">Disease Message</label>
                  <VTextField
                    :id="`title${index}`"
                    variant="outlined"
                    :loading="isPosting"
                    v-model="formdata.title"
                    class="input-border my-4"
                    :rules="[RuleRequired]"
                    required />

                  <label :for="`description${index}`" class="text-neutral-900 weight-500">Message description</label>
                  <VTextField
                    :id="`description${index}`"
                    variant="outlined"
                    :loading="isPosting"
                    v-model="formdata.description"
                    class="input-border my-4"
                    :rules="[RuleRequired]"
                    required />

                <label :for="`min${index}`" class="text-neutral-900 weight-500">From</label>
                <VTextField
                  :id="`min${index}`"
                  type="number"
                  variant="outlined"
                  :loading="isPosting"
                  v-model="formdata.minValue"
                  class="input-border my-4"
                  :rules="[RuleRequired]"
                  required />

                <label :for="`max${index}`" class="text-neutral-900 weight-500">To</label>
                <VTextField
                  :id="`max${index}`"
                  type="number"
                  variant="outlined"
                  :loading="isPosting"
                  v-model="formdata.maxValue"
                  class="input-border my-4"
                  :rules="[RuleRequired]"
                  required />
              </VCol>
            </VRow>

            <VBtn
              color="primary"
              flat
              class="my-0 mx-2 rounded-xl"
              @click="addNewMessage"
              :loading="isPosting">Add New Disease Message</VBtn>

            <VBtn
              color="primary"
              flat
              class="ma-0 rounded-xl"
              type="submit"
              :loading="isPosting">Submit</VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </template>
  </VDialog>
</template>
