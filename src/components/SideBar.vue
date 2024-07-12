<script setup>
import logo from '@/assets/logo.png'
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const drawer = ref(true);

const pages = [
  {
    name: 'Dashboard',
    path: '/',
    title: 'Dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    name: 'Devices',
    path: '/Devices',
    title: 'Devices',
    icon: 'mdi-file-tree'
  },
  {
    name: 'location',
    path: '/location',
    title: 'location',
    icon: 'mdi-map-marker-multiple-outline'
  },
  {
    name: 'sensor-type',
    path: '/sensor-type',
    title: 'sensor type',
    icon: 'mdi-memory'
  },
  {
    name: 'Health Alerts',
    path: '/Allergy',
    title: 'Health Alerts',
    icon: 'mdi-bell-alert-outline'
  },
]

</script>

<template>
  <v-layout class="layout">
    <v-navigation-drawer mobile-breakpoint="sm" v-model="drawer" class="bg-neutral-900 text-grey h-screen"
      location="left" width="250">
      <v-list align="center">
        <v-img :src="logo" width="100" height="100" class="my-10" />
      </v-list>
      <v-list density="compact" nav class="text-secondary">
        <v-list-item v-for="page in pages" :key="page.name" :class="route.name === page.name ? 'active-item' : ''" :title="page.title"
          :to="page.path" :value="page.title" append-icon="mdi-chevron-right">
          <template #prepend>
            <VIcon width="24" class="ma-2">{{ page.icon}}</VIcon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="">
      <v-card class="main-style bg-background pa-4">
        <NavBar @drawer="drawer = !drawer" />
        <slot></slot>
      </v-card>
    </v-main>

  </v-layout>
</template>

<style>
.layout {
  min-height: calc(100vh - 32px);
}
.active-item {
  box-shadow: 0px 0px 16px 0px #CB5A5A3D inset;
  border: 1px solid #CB5A5A;
  background: #CB5A5A29;
  color: #CB5A5A;
  border-radius: 16px
}

.main-style {
  background-color: white;
  border-radius: 24px !important;
  height: 100%;
}
</style>
