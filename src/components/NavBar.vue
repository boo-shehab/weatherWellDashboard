<script setup>
// import router from '@/router';
import userAvatar from '@/assets/userAvatar.svg'
// import { useUserStore } from '@/store/userStore';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { watch } from 'vue';

const route = useRoute();
const routeName = ref(route.name);
watch(() => route.name, (newRouteName, oldRouteName) => {
  console.log('Route name changed from', oldRouteName, 'to', newRouteName);
  routeName.value = newRouteName;
});

// const userStore = useUserStore();
// const user = userStore.user;
// const logoutHandler = () => {
//   userStore.logout();
//   router.push('/login');
// }
</script>

<template>
  <v-toolbar class="pb-4 bg-background">

    <v-toolbar-title class="text-subtitle-1">
      <V-btn @click="$emit('drawer')">
        <v-icon>mdi-menu</v-icon>
      </V-btn>
      {{routeName}}
    </v-toolbar-title>
    <v-card flat height="50" class="user-details">
      <v-card-item class="py-0 px-2" style="width: 150px;" :prepend-avatar="userAvatar">
        <v-card-title class="text-neutral-900 text-sm-subtitle-1 text-body-2 weight-700">
          Admin
          <v-tooltip activator="parent" location="start">Admin</v-tooltip>
        </v-card-title>
        <v-card-subtitle class="text-secondary text-sm-subtitle-2 text-caption weight-500 opacity-1">HR
          Officer</v-card-subtitle>
      </v-card-item>
      <v-menu>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="logoutHandler"><v-btn>logout</v-btn></v-list-item-title>
          </v-list-item>
        </v-list>
        <template #activator="{ props }">
          <v-btn color="primary" size="50" dark v-bind="props">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-card>

  </v-toolbar>
</template>

<style>
.v-toolbar__content {
  background-color: white;
  gap: 16px;
  border: 1px solid #F2F2F2;
  border-radius: 24px;
}
.account-info {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
}
.bell-style {
  border: 1px solid #EEF1F7;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 0px;
  margin: 0px;
}

.user-details {
  display: flex;
  align-items: center;
  border: 1px solid #EEF1F7;
  height: 50px;
  padding: 8px, 16px, 8px, 16px;
  margin-right: 16px;
}
</style>
