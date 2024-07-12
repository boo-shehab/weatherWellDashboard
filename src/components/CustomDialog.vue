<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import CloseIcon from '@/assets/Icons/CloseIcon.svg'

const props = defineProps({
  dialog: Boolean,
  closeIcon: Boolean,
  dialogId: String
});

const emit = defineEmits(['closeDialog', 'openDialog']);
const localDialog = ref(props.dialog);

const closeDialog = () => {
  emit('closeDialog', props.dialogId);
}

const openDialog = () => {
  emit('openDialog', props.dialogId)
}

watch(() => props.dialog, (newValue) => {
  localDialog.value = newValue;
})
</script>
<template>
  <div>
    <span @click="openDialog">
      <slot></slot>
    </span>
    <v-dialog v-model="localDialog" persistent width="720">
      <v-card class="bg-primary-surface b-radius-32">
        <v-card-title>
          <v-row class="ma-0">
            <v-col class="text-primary">
              <slot name="title">
              </slot>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="flex-grow-0">
              <v-img v-if="closeIcon" :src="CloseIcon" alt="" width="40" height="40" @click="closeDialog"></v-img>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="bg-white mx-3 mb-3 b-radius-32">
          <slot name="body">
          </slot>
          <v-card-actions dir="rtl">
            <slot name="action">
            </slot>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
</style>
