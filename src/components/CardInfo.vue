<script setup>
import activeGenerateIcon from '@/assets/Icons/activeGenerateIcon.svg';
import CustomIcon from '@/components/CustomIcon.vue';
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['handleDelete'])
const { item } = defineProps(['item'])
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-based
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
}

const handleDelete = () => {
  emit('handleDelete', item.id)
}

</script>

<template>
  <v-card class="custom-border" flat>
    <v-card-item dir="rtl" class="align-start">
      <template #prepend>
        <CustomIcon :icon="activeGenerateIcon" bg-color="#F9ECEC" border-color="#CB5A5A" />
      </template>
      <v-card-title>
        <div class="d-flex justify-space-between">
          <span class="text-black text-h6 weight-700 pr-4">
            {{ item.title}}
          </span>
          <v-menu location="bottom" class="menu">
            <template v-slot:activator="{ props }">
              <v-icon class="button-style text-primary" v-bind="props"
                :style="`border: 1px solid #CB5A5A; background-color: #F9ECEC;`">mdi-dots-horizontal</v-icon>
            </template>

            <v-list class="custom-border list-style" style="box-shadow: none;">
              <v-list-item :to="`/Generate/view/${item.id}`" class="list-item-style">
                <v-list-item-title>
                  <v-icon class="text-orange mr-4">mdi-eye-outline</v-icon>
                  <span class="text-subtitle-1 weight-500">view</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="handleDelete">
                <v-list-item-title>
                  <v-icon class="text-red mr-4">mdi-delete-outline</v-icon>
                  <span class="text-subtitle-1 weight-500">delete</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <v-card-subtitle class="subtitle pr-4">{{ item.description }}
      </v-card-subtitle>
    </v-card-item>
    <v-divider style="width: 75%; margin: auto; padding: 6px 0;"></v-divider>
    <v-card-text class="pa-4">


      <v-row class="custom-border ma-0">
        <v-col class="col-border text-secondary text-subtitle-1">
          <v-icon class="text-primary text-h5">mdi-calendar-month</v-icon>
          {{ formatDate(item.creationDate) }}
        </v-col>
        <v-col class="col-border text-secondary text-subtitle-1">
          <v-icon class="text-primary text-h5">mdi-account-group-outline</v-icon>
          {{ item.count }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style>
.menu .v-overlay__content {
  border-radius: 24px !important;
}
</style>

<style scoped>
.subtitle {
  white-space: wrap;
  color: #87A0C4;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.44px;
  opacity: 1;
}

.list-style {
  width: 200px;
  padding: 8px  16px;
}

.list-item-style {
  border-bottom: 1px solid #EEF1F7;
}

.col-border {
  border-right: 1px solid #EEF1F7
}

.button-style {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 0px;
  margin: 0px;
}
</style>
