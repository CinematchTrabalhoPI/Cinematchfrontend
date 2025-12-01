import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Match from "../pages/Match.vue";
import Mood from "../pages/Mood.vue";          
import MoodList from "../pages/MoodList.vue"; 
import MovieDetail from "../pages/MovieDetail.vue";
import GenreMovies from "../pages/GenreMovies.vue";
import MeusMatches from "../pages/MeusMatches.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/match", name: "Match", component: Match },
  { path: "/mood", name: "Mood", component: Mood },
  { path: "/mood/:id", name: "MoodList", component: MoodList },
  { path: "/movie/:id", name: "MovieDetail", component: MovieDetail },
  { path: "/genre/:id", name: "GenreMovies", component: GenreMovies },
  { path: "/meus-matches", name: "MeusMatches", component: MeusMatches },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
