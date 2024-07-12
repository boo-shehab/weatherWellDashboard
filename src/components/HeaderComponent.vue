<script setup>
import CustomDialog from './CustomDialog.vue';
import { ref, defineProps, defineEmits, watch } from 'vue';

const { isDateExist, isTitleExist } = defineProps(['btnData', 'isDateExist', 'isTitleExist'])
const emits = defineEmits([ 'dateFilter', 'titleFilter']);
const title = ref()
const date = ref()
const showDate = ref('')
const dialog = ref(false)

const closeDialog = () => {
  dialog.value = false;
}
const openDialog = () => {
  dialog.value = true;
}
watch( () => title.value, () => {
  emits('titleFilter', title.value);
})
watch( () => date.value, () => {
  const year = date.value.getFullYear();
  const month = String(date.value.getMonth() + 1).padStart(2, '0');
  const day = String(date.value.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;
  showDate.value = formattedDate
  console.log(showDate.value);
  emits('dateFilter', date.value);
})
</script>

<template>
  <header class="mb-6">
    <v-row align="center" class="bg-white border b-radius-48 ma-0 pa-4" gap="16">
      <v-col cols="auto" style="padding: 0px margin-right: 16px">
        <v-text-field v-if="isTitleExist" v-model="title" class="input-border" placeholder="Title" density="compact"
          variant="outlined" style="width: 240px; height: 50px;">
          <template #prepend-inner>
            <v-icon class="text-primary">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="auto" style="padding: 0px">
        <CustomDialog :closeIcon="true" :dialog="dialog" @closeDialog="closeDialog" @openDialog="openDialog">
          <v-text-field v-if="isDateExist" v-model="showDate" class="input-border" readonly dense placeholder="Date"
            density="compact" variant="outlined" style="width: 240px; height: 50px;">

            <template #append-inner>
              <v-icon class="text-primary">mdi-calendar</v-icon>
            </template>
          </v-text-field>
          <template #title>date picker</template>
          <template #body>
            <v-row justify="space-around">
              <v-date-picker v-model="date" color="primary" class="w-100"></v-date-picker>
            </v-row>
          </template>
        </CustomDialog>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="flex-grow-0 pa-0">
        <slot></slot>
      </v-col>
    </v-row>
  </header>
</template>
