<script setup>
import { onMounted, ref } from 'vue';
import axiosIns from "@/plugins/axios";
import { RuleRequired } from "@/utils/rules";
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const diseaseId = route.params.id;
const openDialog = ref(false);
const diseaseData = ref({ name: '' });
const savedDisease = ref({name: ''})
const FormDataEdit = ref([]);
const isPosting = ref(false);
const diseaseMessages = ref([]);
const form = ref(null);

const handleSubmit = async () => {
  const isValid = await form.value.validate();
  console.log(isValid.valid)
  if (!isValid.valid) return;

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
    router.push('/Allergy')
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

onMounted(() => {
  getDiseaseData();
})
</script>

<template>
  <VCard class="bg-primary-surface rounded-xl pa-4">
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <p>Health Alert Setting</p>
          </div>
        </VCardTitle>
        <VCardText class="bg-white mx-3 mb-3 rounded-xl">
          <VForm ref="form" fast-fail @submit.prevent="handleSubmit" class="py-3">
            <label for="name" class="text-neutral-900 weight-500"  style="font-size: 18px">Case name</label>
            <VTextField
              id="name"
              variant="outlined"
              :loading="isPosting"
              v-model="diseaseData.name"
              class="input-border my-4"
              :rules="[RuleRequired]"
              required />

            <VRow  v-for="(formdata, index) in FormDataEdit" :key="index" class="border rounded-xl border-secondary mb-5 mx-0">
              <VCol cols="12">
                <VBtn flat icon=" mdi-trash-can text-red" class="ma-1" @click="deleteMessage(index)" />
              </VCol>
              <VCol cols="12" md="6">
                  <label :for="`title${index}`" class="text-neutral-900 weight-500">Disease Message</label>
                  <VTextField
                    :id="`title${index}`"
                    variant="outlined"
                    :loading="isPosting"
                    v-model="formdata.title"
                    class="input-border my-3"
                    :rules="[RuleRequired]"
                    required />
              </VCol>

              <VCol cols="6" md="3">
                <label :for="`min${index}`" class="text-neutral-900 weight-500">From</label>
                <VTextField
                  :id="`min${index}`"
                  type="number"
                  variant="outlined"
                  :loading="isPosting"
                  v-model="formdata.minValue"
                  class="input-border my-3"
                  :rules="[RuleRequired]"
                  required />
              </VCol>
              <VCol cols="6" md="3">
                <label :for="`max${index}`" class="text-neutral-900 weight-500 pb-4">To</label>
                <VTextField
                  :id="`max${index}`"
                  type="number"
                  variant="outlined"
                  :loading="isPosting"
                  v-model="formdata.maxValue"
                  class="input-border my-3"
                  :rules="[RuleRequired]"
                  required />
              </VCol>
              <VCol cols="12">
                  <label :for="`description${index}`" class="text-neutral-900 weight-500">Message description</label>
                  <VTextField
                    :id="`description${index}`"
                    variant="outlined"
                    :loading="isPosting"
                    v-model="formdata.description"
                    class="input-border my-3"
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
