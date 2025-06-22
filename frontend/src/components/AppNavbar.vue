<template>
  <header class="bg-white shadow-md fixed top-0 w-full z-50">
    <nav class="container mx-auto flex items-center justify-between p-4">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img
          src="https://res.cloudinary.com/dbzwx9a7b/image/upload/v1750580149/Screenshot_2025-06-22_134532_cmnzyn.png"
          alt="PostFlow Logo"
          class="h-8 w-auto"
        />
        <span class="text-xl font-bold text-indigo-600">PostFlow</span>
      </div>

      <!-- Hamburger (Mobile) -->
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

      <!-- Navigation Links -->
      <ul class="hidden md:flex space-x-6">
        <li><a href="#" class="hover:text-indigo-600">Features</a></li>
        <li><a href="#" class="hover:text-indigo-600">Pricing</a></li>
        <li><a href="#" class="hover:text-indigo-600">About</a></li>
        <li><a href="#" class="hover:text-indigo-600">Contact</a></li>
      </ul>

      <!-- User Info or Login Button -->
      <div class="hidden md:flex items-center space-x-4">
        <div v-if="isAuthenticated" class="flex items-center space-x-2">
          <img
            :src="user.photo"
            alt="User Photo"
            class="w-8 h-8 rounded-full object-cover"
          />
          <div class="text-sm text-gray-800">
            <div class="font-medium">{{ user.name }}</div>
            <div class="text-gray-500 text-xs">{{ user.email }}</div>
          </div>
        </div>
        <button
          v-else
          @click="handleGoogleAuth"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login with Google
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t border-gray-200 p-4 space-y-4">
      <a href="#" class="block hover:text-indigo-600">Features</a>
      <a href="#" class="block hover:text-indigo-600">Pricing</a>
      <a href="#" class="block hover:text-indigo-600">About</a>
      <a href="#" class="block hover:text-indigo-600">Contact</a>

      <div v-if="isAuthenticated" class="flex items-center space-x-2 mt-4">
        <img
          :src="user.photo"
          alt="User Photo"
          class="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <div class="font-medium text-gray-800">{{ user.name }}</div>
          <div class="text-gray-500 text-xs">{{ user.email }}</div>
        </div>
      </div>
      <button
        v-else
        @click="handleGoogleAuth"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
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
    ...mapGetters(['user', 'isAuthenticated']) // ✅ no namespace needed
  },

  watch: {
    '$route'() {
      this.isOpen = false;
    }
  },
  methods: {
    ...mapActions(['loginWithGoogle']),// ✅

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
