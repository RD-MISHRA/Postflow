import Vue from "vue";
import VueRouter from "vue-router";
import DashBoard from "@/components/dashboard/DashBoard.vue";
import PostflowLandingPage from "@/components/PostflowLandingPage.vue";
import CreatePost from "@/components/dashboard/CreatePost.vue";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: PostflowLandingPage,
  },
  {
    path: "/dashboard",
    component: DashBoard,
    meta: { requiredAuth: true }, // ✅ FIXED TYPO
    children: [
      {
        path: "create-post",
        component: CreatePost,
        meta: { requiredAuth: true }, // ✅ FIXED TYPO
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiredAuth); 
  const isAuthenticated = store.state.authenticated;

  
  console.log(`[Router Guard] Navigating to: ${to.fullPath}`);
  console.log(`[Router Guard] requiresAuth: ${requiresAuth}, isAuthenticated: ${isAuthenticated}`);

  if (requiresAuth && !isAuthenticated) {
    console.log("[Router Guard] Not authenticated: redirecting to landing page.");
    next({ path: "/", query: { redirectFrom: to.fullPath } });
  } else {
    next();
  }
});

export default router;
