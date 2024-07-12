import { ref } from 'vue'
import axiosIns from "@/plugins/axios";
import { defineStore } from "pinia";
import axios from 'axios';
// export const useUserStore = defineStore('useUsersStore', {
//     state: () => ({
//         user: null,
//         users: null,
//         isAuthenticated: false,
//         isLoading: false,
//     }),
//     actions: {
//         async setUserFromToken(token) {
//           this.isLoading = true;
//           try {
//               const response = await axiosIns.get('Auth/current', {
//                   headers: {
//                       Authorization: `Bearer ${token}`,
//                   },
//               });
//               this.setUser(response.data);
//           } catch (error) {
//               console.error('Error fetching user info:', error.message, error.response);
//           }
//           this.isLoading = false
//         },

//         setUser(user) {
//             this.user = user;
//             this.isAuthenticated = true;
//             if(user.data.token)
//               localStorage.setItem('authToken', user? user.data.token : '');
//         },
//         async getUsers(pageNumber = 1, username = '') {
//           this.isLoading = true;
//           try {
//               const config = {
//                 headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//                 }
//               };
//               const response = await axios.get(`http://139.84.174.215:5266/api/Users?Name=${username}&PageNumber=${pageNumber}&PageSize=6`,config);
//                 this.users = response.data.data;
//           } catch (error) {
//             console.error('login failed', error);
//           }
//           this.isLoading = false
//         },
//         async createUser(user) {
//           this.isLoading = true;
//           try {

//               const config = {
//                 headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//                 }
//               };
//               const response = await axios.post(`http://139.84.174.215:5266/api/Users`, user, config);
//                 this.users = response.data.data;
//           } catch(error) {
//             console.error('failed to create a user', error);
//           }
//           this.isLoading = false
//         },
//         async loadUserFromStorage() {
//             const storedToken = localStorage.getItem('authToken');
//             if (storedToken) {
//                 await this.setUserFromToken(storedToken);
//             }
//         },
//         async login(credentials) {
//           this.isLoading = true;
//             try {
//                 const response = await axios.post('http://139.84.174.215:5266/api/Auth/login', credentials);
//                 this.setUser(response.data);
//             } catch (error) {
//                 console.error('Login failed:', error);
//             }
//             this.isLoading = false;
//         },
//         async DeleteUser(id) {
//           this.isLoading = true;
//           try{
//               const config = {
//                 headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//                 }
//               };
//             const response = await axios.delete(`http://139.84.174.215:5266/api/Users/${id}`,config)
//             this.users = response.data;
//           } catch (error) {
//             console.error(error)
//           }
//           this.isLoading = false;
//         },
//         logout() {
//             this.user = null;
//             this.isAuthenticated = false;
//             localStorage.removeItem('authToken');
//         },
//     },
// });

export const useUserStore = defineStore('useUserStore', () => {

  const user = ref(localStorage.getItem('userAuth'));
  if(user.value !== undefined) {
    user.value = JSON.parse(user.value);
  } else {
    user.value = null;
  }
  console.log(user.value);

  const users = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const getUserAuth = async () => {
    try {
      isLoading.value = true;
      if(user.value) {
        const data = await axiosIns.get(`admin/${user.value.adminInfo.id}`)
        if(data.status >= 200 && data.status < 300)
          isAuthenticated.value = true
        else
          isAuthenticated.value = false;
      }else {
        isAuthenticated.value = false;
      }
    } catch(e) {
      console.log(e);
      isAuthenticated.value = false;
      user.value = null;
    }finally{
      isLoading.value = false;
    }
  }

  const login = async (username, password) => {
    try {
      isLoading.value = true;
        const data = await axiosIns.post('admin/login',{ username, password })
        if(data.status >= 200 && data.status < 300){
          isAuthenticated.value = true
          user.value = data.data;
          user.value.adminInfo.password = password;
          localStorage.setItem('userAuth', JSON.stringify(user.value))
        }else
          isAuthenticated.value = false;
    } catch(e) {
      console.log(e);
      isAuthenticated.value = false;
      user.value = null;
    }finally{
      isLoading.value = false;
    }
  }

  const postUserAuth = async (newUser) => {
    try {
      isLoading.value = true;
      const data = await axiosIns.post('admin/login', newUser)
      if (data.status >= 200 && data.status < 300) {
        user.value = data.data;
        user.value.password = newUser.password;
        localStorage.setItem('userAuth', user.value);
      }
    } catch(e) {
      console.log(e);
    } finally {

    }
  }
  return{
    user,
    isLoading,
    isAuthenticated,
    login,
    getUserAuth
  }
})
