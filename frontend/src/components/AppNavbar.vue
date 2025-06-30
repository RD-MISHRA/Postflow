<template>
  <header class="bg-white shadow-md fixed top-0 w-full z-50">
    <nav class="w-full max-w-screen-xl mx-auto flex items-center justify-between p-4">
      <div class="flex items-center space-x-2">
        <img
          src="https://res.cloudinary.com/dbzwx9a7b/image/upload/v1750580149/Screenshot_2025-06-22_134532_cmnzyn.png"
          alt="PostFlow Logo"
          class="h-8 w-auto"
        />
        <span class="text-xl font-bold text-blue-500">PostFlow</span>
      </div>

      <div class="md:hidden">
        <button @click="isOpen = !isOpen" class="focus:outline-none">
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <ul class="hidden md:flex space-x-6">
        <li><a href="#" class="font-semibold hover:text-blue-500">Features</a></li>
        <li><a href="#" class="font-semibold hover:text-blue-500">Pricing</a></li>
        <li><a href="#" class="font-semibold hover:text-blue-500">About</a></li>
        <li><a href="#" class="font-semibold hover:text-blue-500">Contact</a></li>
      </ul>

      <div class="hidden md:flex items-center space-x-4">
        <div v-if="isAuthenticated" class="flex items-center space-x-2">
          <img :src="user.photo" alt="User Photo" class="w-8 h-8 rounded-full object-cover" referrerpolicy="no-referrer" />
          <div class="flex flex-col text-sm text-gray-800">
            <div class="font-medium">{{ user.name }}</div>
            <div class="text-gray-500 text-xs">{{ user.email }}</div>
          </div>
          <button
            @click="handleLogout"
            class="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center"
            title="Logout"
          >
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-lg" />
          </button>
        </div>
        <button
          v-else
          @click="handleGoogleAuth"
          class="w-full max-w-[400px] flex items-center justify-start gap-4 h-10 px-4 rounded-md bg-[#f2f2f2] text-[#1f1f1f] font-roboto font-medium text-sm relative overflow-hidden hover:shadow focus:outline-none active:bg-[#e0e0e0] transition border border-gray-200"
        >
          <div class="flex-shrink-0 w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
          </div>
          <span class="flex-grow text-left truncate">Continue with Google</span>
        </button>
      </div>
    </nav>

    <div v-if="isOpen" class="md:hidden bg-white border-t border-gray-200 p-4 space-y-4">
      <a href="#" class="block hover:text-blue-500">Features</a>
      <a href="#" class="block hover:text-blue-500">Pricing</a>
      <a href="#" class="block hover:text-blue-500">About</a>
      <a href="#" class="block hover:text-blue-500">Contact</a>

      <div v-if="isAuthenticated" class="flex items-center space-x-2 mt-4">
        <img :src="user.photo" alt="User Photo" class="w-8 h-8 rounded-full object-cover" referrerpolicy="no-referrer"/>
        <div>
          <div class="font-medium text-gray-800">{{ user.name }}</div>
          <div class="text-gray-500 text-xs">{{ user.email }}</div>
          <button
            @click="handleLogout"
            class="w-full mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            title="Logout"
          >
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-lg" />
          </button>
        </div>
      </div>
      <button
        v-else
        @click="handleGoogleAuth"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Login with Google
      </button>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "AppNavbar",
  data() {
    return {
      isOpen: false,
    };
  },
 computed: {
    ...mapGetters(['user', 'isAuthenticated']) 
  },

  watch: {
    '$route'() {
      this.isOpen = false;
    }
  },
  methods: {
    ...mapActions(['loginWithGoogle','logout']),
   
    handleLogout(){
      this.logout();
     
    },
    handleGoogleAuth() {
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const backendUrl = 'http://localhost:5000';
      const googleAuthPopup = window.open(
        `${backendUrl}/api/auth/google`,
        'GoogleLogin',
        `width=${width},height=${height},top=${top},left=${left}`
      );

      const receiveMessage = async (event) => {
        if (event.origin !== backendUrl) return;

        const { token, error } = event.data;

        if (error) {
          alert(error);
          return;
        }

        if (token) {
          try {
            localStorage.setItem('token', token);
            await this.loginWithGoogle(token); // ✅ mapped action
            console.log('✅ User authenticated and Vuex state updated');
             window.location.reload();
          } catch (err) {
            console.error('❌ Failed to validate token:', err);
          }
        }
      };

      window.addEventListener('message', receiveMessage, false);
  
      const timer = setInterval(() => {
        if (googleAuthPopup.closed) {
          clearInterval(timer);
          window.removeEventListener('message', receiveMessage);
        }
      }, 500);
    }
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
