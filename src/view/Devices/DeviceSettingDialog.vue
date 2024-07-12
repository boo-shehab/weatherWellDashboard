<script setup>
import axiosIns from "@/plugins/axios";
import { RuleRequired } from "@/utils/rules";
import { ref, watch } from "vue";

const { deviceId } = defineProps(['deviceId']);
const controller = ref(null);
const isControllerLoading = ref(false);
const locations = ref([]);
const isPosting = ref(false);
const form = ref(null);
const emit = defineEmits(['update']);
const sensorsType = ref([]);
const isSensorsTypeLoading = ref(false);
const openDialog = ref(false);
const isItChanged = ref(false);
const sensorsList = ref([]);

const FormDataEdit = ref({
  name: '',
  locationId: '',
  sensorsType: [],
});

const handleSubmit = async () => {
  const isValid = await form.value.validate();
  if (!isValid) return;

  try {
    isPosting.value = true;
    if (FormDataEdit.value.name !== controller.value.name || FormDataEdit.value.locationId !== controller.value.locationId) {
      await axiosIns.put(`controller/${deviceId}`, { name: FormDataEdit.value.name, locationId: FormDataEdit.value.locationId });
    }

    const sensorsToAdd = FormDataEdit.value.sensorsType.filter(sensor => !sensorsType.value.some(curr => curr.sensorTypeId === sensor));
    const sensorsToRemove = sensorsType.value.filter(sensor => !FormDataEdit.value.sensorsType.some(upd => upd === sensor.sensorTypeId));

    // Find sensors to add
    for (const sensorId of sensorsToAdd) {
      await axiosIns.post(`sensor`, { sensorTypeId: sensorId, controllerId: deviceId });
    }

    // Find sensors to remove
    for (const sensor of sensorsToRemove) {
      await axiosIns.delete(`sensor/${sensor.id}`);
    }

    emit('update');
    locations.value = [];
    openDialog.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    isPosting.value = false;
  }
};

const getController = async () => {
  try {
    isControllerLoading.value = true;
    const data = await axiosIns.get(`controller/${deviceId}`);
    const sensorData = await axiosIns.get(`sensor/${deviceId}`);
    sensorsType.value = sensorData.data;
    FormDataEdit.value.sensorsType = sensorData.data.map(sensor => sensor.sensorTypeId);
    controller.value = data.data;
    FormDataEdit.value.name = controller.value.name;
    FormDataEdit.value.locationId = controller.value.locationId;
  } catch (e) {
    console.log(e);
  } finally {
    isControllerLoading.value = false;
  }
};

const filterSensorTypes = () => {
  return sensorsList.value.filter(sensorType =>
    FormDataEdit.value.sensorsType.some(sensor =>
      sensor === sensorType.id
    )
  );
};

const getSensorsType = async () => {
  try {
    isSensorsTypeLoading.value = true;
    const data = await axiosIns.get('sensor-type');
    sensorsList.value = data.data;
    FormDataEdit.value.sensorsType = filterSensorTypes().map(sensorType => sensorType.id);
  } catch (e) {
    console.log(e);
  } finally {
    isSensorsTypeLoading.value = false;
  }
};

const getLocations = async () => {
  try {
    const data = await axiosIns.get('location');
    locations.value = data.data;
  } catch (e) {
    console.log(e);
  }
};

watch(() => FormDataEdit.value, () => {
  isItChanged.value = FormDataEdit.value.name !== controller.value.name ||
                      FormDataEdit.value.locationId !== controller.value.locationId ||
                      JSON.stringify(FormDataEdit.value.sensorsType) !== JSON.stringify(sensorsType.value.map(sensor => sensor.sensorTypeId));
}, { deep: true });

watch(openDialog, async () => {
  if (openDialog.value) {
    await getController();
    getLocations();
    getSensorsType();
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
            <p>device setting</p>
            <VBtn icon="mdi-close" flat @click="openDialog = false" :disabled="isPosting" style="border: 1px solid #CB5A5A; background-color: #F9ECEC;" class="text-red" />
          </div>
        </VCardTitle>
        <VCardText class="bg-white mx-3 mb-3 rounded-xl">
          <VForm ref="form" fast-fail @submit.prevent="handleSubmit()">
            <label for="name" class="text-neutral-900 weight-500">device name</label>
            <VTextField
              id="name"
              variant="outlined"
              :loading="isControllerLoading"
              v-model="FormDataEdit.name"
              class="input-border my-4"
              :rules="[RuleRequired]"
              required />

            <label for="location" class="text-neutral-900 weight-500">location</label>
            <VAutocomplete
              id="location"
              variant="outlined"
              :items="locations"
              :loading="isControllerLoading"
              v-model="FormDataEdit.locationId"
              item-title="name"
              item-value="id"
              :rules="[RuleRequired]"
              class="input-border my-4"
              required />

            <label for="sensors" class="text-neutral-900 weight-500">sensors</label>
            <VAutocomplete
              id="sensors"
              variant="outlined"
              multiple
              chips
              :items="sensorsList"
              item-title="name"
              item-value="id"
              :loading="isSensorsTypeLoading"
              v-model="FormDataEdit.sensorsType"
              class="input-border my-4"
              required />

            <VBtn
              color="primary"
              flat
              :disabled="!isItChanged"
              class="ma-0 rounded-xl"
              type="submit"
              :loading="isPosting">submit</VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </template>
  </VDialog>
</template>
