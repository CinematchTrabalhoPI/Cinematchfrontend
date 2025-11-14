import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Match from "../pages/Match.vue";
import Mood from "../pages/Mood.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/match", name: "match", component: Match },
  { path: "/mood", name: "mood", component: Mood }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
