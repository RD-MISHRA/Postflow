// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     token: localStorage.getItem('token') || null,
//     user: null,
//     authenticated: false,
//   },

//   mutations: {
//     SET_TOKEN(state, token) {
//       state.token = token;
//       localStorage.setItem('token', token);
//     },
//     SET_USER(state, user) {
//       state.user = user;
//       state.authenticated = true;
//     },
//     LOGOUT(state) {
//       state.token = null;
//       state.user = null;
//       state.authenticated = false;
//       localStorage.removeItem('token');
//     },
//   },

//   actions: {
//     async validateTokenAndFetchUser({ commit }, token) {
//       try {
//         const res = await axios.get('http://localhost:5000/api/auth/validate', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log('Token validated successfully:', res);
//         commit('SET_USER', res.data);
//       } catch (err) {
//         console.error('Token invalid or expired:', err);
//         commit('LOGOUT');
//       }
//     },

//     async loginWithGoogle({ commit, dispatch }, token) {
//       commit('SET_TOKEN', token);
//       await dispatch('validateTokenAndFetchUser', token);
//     },
//   },

//   getters: {
//     isAuthenticated: state => state.authenticated,
//     user: state => state.user,
//   },
// });


import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

console.log('Importing Vue and Vuex');

Vue.use(Vuex);
console.log('Vuex plugin registered');

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: null,
    authenticated: false,
  },

  mutations: {
    SET_TOKEN(state, token) {
      console.log('Mutation SET_TOKEN triggered with token:', token);
      state.token = token;
      localStorage.setItem('token', token);
    },
    SET_USER(state, user) {
      console.log('Mutation SET_USER triggered with user:', user);
      state.user = user;
      state.authenticated = true;
    },
    LOGOUT(state) {
      console.log('Mutation LOGOUT triggered');
      state.token = null;
      state.user = null;
      state.authenticated = false;
      localStorage.removeItem('token');
    },
  },

  actions: {
    async validateTokenAndFetchUser({ commit }, token) {
      console.log('Action validateTokenAndFetchUser called with token:', token);
      try {
        const res = await axios.get('http://localhost:5000/api/auth/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Token validated successfully:', res);
        commit('SET_USER', res.data);
      } catch (err) {
        console.error('Token invalid or expired:', err);
         commit('LOGOUT');
      }
    },

    async loginWithGoogle({ commit, dispatch }, token) {
      console.log('Action loginWithGoogle called with token:', token);
      commit('SET_TOKEN', token);
      await dispatch('validateTokenAndFetchUser', token);
    },
  },

  getters: {
    isAuthenticated: state => {
      console.log('Getter isAuthenticated accessed, value:', state.authenticated);
      return state.authenticated;
    },
    user: state => {
      console.log('Getter user accessed, value:', state.user);
      return state.user;
    },
  },
});
