<script setup>
import { onMounted, ref } from 'vue';
import SideBar from '@/components/SideBar.vue';
import router from '@/router'
import { watch } from 'vue';
import { useUserStore } from './store/userStore';

const userStore = useUserStore()
const isLoading = ref(userStore.isLoading)
const route = ref(router.currentRoute.value.name);
watch(() => router.currentRoute.value.name, (newValue) => {
  route.value = newValue;
});

</script>
<template>
  <v-app>
    <v-main class="w-screen bg-neutral-900" style="overflow: auto;">
      <v-container v-if="userStore.isAuthenticated" class="pa-4 ma-0 bg-neutral-900" fluid >
        <SideBar>
          <router-view />
        </SideBar>
      </v-container>
      <router-view v-else />
    </v-main>
  </v-app>
</template>
<style>
@import url('@/assets/main.css');
</style>
