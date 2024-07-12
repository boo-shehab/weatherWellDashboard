<script setup>
import closeIcon from '@/assets/Icons/CloseIcon.svg';
import downloadIcon from '@/assets/Icons/downloadIcon.svg'
import { defineProps, ref } from 'vue';

const { viewType, generation } = defineProps(['viewType', 'generation'])
const generateNote = ref(true)
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
}
function downloadPdf() {
  const pdfUrl = generation.generation.pdfUrl; // Replace this with the actual URL of your PDF
  fetch(pdfUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificate.pdf'; // You can set the filename here
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(error => {
      console.error('Error downloading PDF:', error);
    });
}

</script>
<template>
  <main>
    <v-row v-if="viewType === 'new' && generateNote" class="success-generated">
      <v-col class="pa-0 ma-0 weight-700">Your certificates have been generated successfully</v-col>
      <v-spacer></v-spacer>
      <v-col class="flex-grow-0 pa-0 ma-0">
        <v-img :src="closeIcon" alt="" width="40" height="40" @click="generateNote = false" />
      </v-col>
    </v-row>
    <v-row class="head-style">
      <v-col class="pa-0 ma-0 text-primary weight-700">generated templates</v-col>
      <v-spacer></v-spacer>
      <v-col class="flex-grow-0 pa-0 ma-0">
        <v-btn class="rounded-xl bg-primary ma-0 text-subtitle-1" @click="downloadPdf" flat>

          <span class="d-flex align-center ga-2 ">
            <v-img :src="downloadIcon" alt="" width="24" height="24" />
            download
          </span>
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="viewType === 'view'" class="custom-border ma-0">
      <v-col cols="12" sm="4" class="col-style">
        <p class="text-secondary text-subtitle-2 weight-700">Title</p>
        <span class="text-neutral-900 text-subtitle-1 weight-500">{{ generation.generation.title}}</span>
      </v-col>
      <v-col cols="12" sm="4" class="col-style">
        <p class="text-secondary text-subtitle-2 weight-700">Date</p>
        <span class="text-neutral-900 text-subtitle-1 weight-500">{{ formatDate(generation.generation.creationDate)
          }}</span>
      </v-col>
      <v-col cols="12" sm="4" class="col-style">
        <p class="text-secondary text-subtitle-2 weight-700">users</p>
        <span class="text-neutral-900 text-subtitle-1 weight-500">{{ generation.generation.count }}</span>
      </v-col>
      <v-col cols="12" class="col-style">
        <p class="text-secondary text-subtitle-2 weight-700">Description</p>
        <span class="text-neutral-900 text-subtitle-1 weight-500">{{ generation.generation.description}}</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(item, index) in generation.items" cols="12" md="4" :key="index">
        <v-card class="custom-border px-4 pt-4" flat>
          <v-img :src="item.imageUrl" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px" cover>
          </v-img>
          <v-card-actions>

            <span>{{ item.name}}</span>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </main>
</template>

<style scoped>
.success-generated{
  border-radius: 48px;
  color: #008636;
  border: 2px solid #008636;
  background: #F5FFF9;
  padding: 8px 24px;
  margin: 0px;
  align-items: center;
}
.head-style {
  margin: 0px;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;

}
.col-style {
  border-right: 1px solid #EEF1F7;
  border-bottom: 1px solid #EEF1F7;
  padding: 16px 24px;
}
</style>
