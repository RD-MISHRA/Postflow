<template>
  <div>
    <AppNavbar v-if="showFooter" />
    <router-view></router-view>
    <AppFooter v-if="showFooter" />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/Footer.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  },
  computed: {
    showFooter() {
      // Only show the footer on the homepage
      return this.$route.path === '/';
    }
  },
  methods: {
    ...mapActions(['validateTokenAndFetchUser']) // match this to your Vuex action
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.validateTokenAndFetchUser(token);
    }
    console.log('App created, token validation dispatched');
  }
};
</script>
