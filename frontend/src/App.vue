<template>
  <div>
    <AppNavbar/>

    
  
</div>
</template>

<script>
import { mapActions } from 'vuex';
import AppNavbar from './components/AppNavbar.vue';
export default {
  name: 'App',
  components: {
    AppNavbar,
  },
  methods: {
    ...mapActions(['validatetoken'])
  },

 // App.vue or main.js

created() {
  const token = localStorage.getItem('token');
  if (token) {
    this.$store.dispatch('validateTokenAndFetchUser', token);
  }
}

  
};
</script>
