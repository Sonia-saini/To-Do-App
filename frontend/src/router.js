// 1. Define route components.

import { createRouter, createWebHistory } from "vue-router";
import Register from "../src/Pages/Register.vue";
import Todo from "../src/Pages/Todo.vue";
import Login from "../src/Pages/Login.vue";
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: "/",
    component: Todo,
    meta: { requiresAuth: document.cookie.includes("username") },
  },
  {
    path: "/register",
    component: Register,
    meta: { requiresAuth: !document.cookie.includes("username") },
  },
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: !document.cookie.includes("username") },
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
router.beforeEach((to, from, next) => {
  console.log(to);
  if (
    (to.path === "/login" || to.path === "/register") &&
    to.matched.some((record) => record.meta.requiresAuth === false)
  ) {
    alert("you are already Logged In");
    next("/");
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    next();
  } else {
    next("/login");
  }
});
// 5. Create and mount the root instance.
export default router;
