// import Vue from 'vue'
// import App from './App.vue'
// import './assets/tailwind.css'
// import store from './store'
// Vue.config.productionTip = false
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


// import { 
//   faGripLines, 
//   faPlusSquare, 
//   faBookmark, 
//   faUpload, 
//   faLink, 
//   faClock, 
//   faCalendarAlt 
// } from '@fortawesome/free-solid-svg-icons'

// library.add(
//   faGripLines, 
//   faPlusSquare, 
//   faBookmark, 
//   faUpload, 
//   faLink, 
//   faClock, 
//   faCalendarAlt
// )

// Vue.component('font-awesome-icon', FontAwesomeIcon)
// import router from './router/routes'
// new Vue({
//   store,
//   router,
//   render: h => h(App),
// }).$mount('#app')



import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import store from './store'
import router from './router/routes'

Vue.config.productionTip = false

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faGripLines, 
  faPlusSquare, 
  faBookmark, 
  faUpload, 
  faLink, 
  faClock, 
  faCalendarAlt 
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faGripLines, 
  faPlusSquare, 
  faBookmark, 
  faUpload, 
  faLink, 
  faClock, 
  faCalendarAlt
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// ✅ Get token from localStorage before creating the app
const token = localStorage.getItem("token");

if (token) {
  store.dispatch("validateTokenAndFetchUser", token)
    .then(() => {
      console.log("✅ Token validated, creating Vue app...");
      new Vue({
        store,
        router,
        render: h => h(App),
      }).$mount('#app');
    })
    .catch(() => {
      console.log("⚠️ Token invalid or expired, clearing localStorage and creating app.");
      localStorage.removeItem("token");
      new Vue({
        store,
        router,
        render: h => h(App),
      }).$mount('#app');
    });
} else {
  console.log("ℹ️ No token found, creating Vue app without validation.");
  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app');
}
