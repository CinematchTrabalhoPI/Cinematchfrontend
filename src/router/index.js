import { createRouter, createWebHistory } from "vue-router";

// Pages
import Home from "../pages/Home.vue";
import Match from "../pages/Match.vue";
import Mood from "../pages/Mood.vue";
import MovieDetail from "../pages/MovieDetail.vue";
import GenreMovies from "../pages/GenreMovies.vue"; // nova página de filmes por gênero

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/match", name: "Match", component: Match },
  { path: "/mood", name: "Mood", component: Mood },
  { path: "/movie/:id", name: "MovieDetail", component: MovieDetail },
  { path: "/genre/:id", name: "GenreMovies", component: GenreMovies },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
