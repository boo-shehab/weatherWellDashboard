<script setup>
import { ref } from 'vue';
import logo from '@/assets/logo.png'
import router from '@/router';
import { useUserStore } from '@/store/userStore';


const userStore = useUserStore()

const visible = ref(false);

const username = ref('');
const password = ref('');
const isLoading = ref(false)
const handleSubmit = async () => {
  console.log('handleSubmit')
  try{
    isLoading.value = true
    await userStore.login(username.value, password.value);
    if(userStore.isAuthenticated)
      router.push('/')
  }catch(e) {
    console.log(e)
  }finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <v-row no-gutters>
      <v-col cols="12" md="6" class="welcome">
        <v-row class=" py-10" justify="center" align="center" style="height: 100%; margin: 0;">
          <v-col cols="8">
            <h1 class="title text-h6 text-sm-h3 text-white pt-4">
              <span>Welcome To</span>
              <br />
              <span class="text-sm-h2 text-h4">weather well</span>
            </h1>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row align="center" justify="center" class="h-screen" style="margin: 0;">
          <v-col>
            <v-card class="mx-auto pa-10 pb-8" flat>
              <h1 class="mb-8 bt-8 text-h4 text-primary weight-700">Login</h1>
              <div class="text-subtitle-1 text-neutral-900">Username</div>
              <v-text-field v-model="username" class="input-border" density="compact"
                prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

              <div class="text-subtitle-1 text-neutral-900">
                password
              </div>

              <v-text-field v-model="password" :prepend-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'" class="input-border" density="compact" variant="outlined"
                @click:prepend-inner="visible = !visible"></v-text-field>
              <v-btn block class="login-button b-radius-24 " :loading="isLoading" flat @click="handleSubmit">
                Login
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.container {
  background-color: white;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.welcome {
  background: linear-gradient(0deg, #551A16, #7E2620, #A6332B, #CC4238);
  position: relative;
}

.title span {
  font-weight: 700;
}

.login-button {
  background: linear-gradient(180deg, #CB5A5A 0%, #8A3D3D 100%);
  color: white;
}
</style>
