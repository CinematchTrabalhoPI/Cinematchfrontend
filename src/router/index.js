import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Match from "../pages/Match.vue";
import Mood from "../pages/Mood.vue";
import MovieDetail from "../pages/MovieDetail.vue";
import GenreMovies from "../pages/GenreMovies.vue";
import MeusMatches from "../pages/MeusMatches.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/match", name: "match", component: Match },
  { path: "/mood", name: "mood", component: Mood },

  // detalhes
  { path: "/movie/:id", name: "MovieDetail", component: MovieDetail },

  // gêneros
  { path: "/genre/:id", name: "GenreMovies", component: GenreMovies },

  // página com a lista dos matches
  { path: "/meus-matches", name: "MeusMatches", component: MeusMatches },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
