<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useFileStore } from '@/store/FileStore';
const fileStore = useFileStore();
let { imgId, title, filePath, imagedata } = defineProps(['imgId', 'title', 'filePath', 'imagedata'])
const emit = defineEmits(['handleFileChange']);
const isDragging = ref(false)
const image = ref(imagedata);
const onDragover = (event) => {
  event.preventDefault();
  isDragging.value = true;
  event.dataTransfer.dropEffect = 'copy'
}
const onDragleave = (event) => {
  event.preventDefault();
  isDragging.value = false;
}
const onDrop = async (event) => {
  event.preventDefault();
  isDragging.value = false;
  const files = event.dataTransfer.files;
  if (files.length === 1 && files[0].type === 'image/svg+xml') {
    image.value = await fileStore.uploadImage(files[0])
    image.value = image.value.url;
    emit('handleFileChange', [image.value, filePath]);
  }
}
const handleFileChange = async (event) => {
  const selectedFile = event.target.files[0];
  image.value = await fileStore.uploadImage(selectedFile)
  image.value = image.value.url;
  emit('handleFileChange', [image.value, filePath])
}

</script>

<template>
  <p class="text-subtitle-4 ma-2">{{ title }}</p>
  <div>
    <label :for="imgId" @dragover.prevent="onDragover = true" @dragleave.prevent="onDragleave" @drop.prevent="onDrop">
      <v-card flat class=" bg-customYellowLight pa-2" height="200">
        <div v-if="!image" class="card-style">
          <v-img class="pa-2" width="50" height="50" src="../assets/addImgIcon.svg" />
          <p class="label-text pa-2">اسحب و افلت الملف هنا </p>
          <span class="text-grey pa-2">او</span>
          <span class="text-customYellowDark pa-2">اضغط هنا</span>
        </div>
        <div v-else>
          <v-img :src="image" cover></v-img>
        </div>
      </v-card>
    </label>
    <input type="file" @change="handleFileChange" :id="imgId" accept="image/svg+xml" class="d-none">
  </div>
</template>

<style scoped>
.card-style {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #FFD24D;
}

.label-text {
  font-size: 16px;

}
</style>
