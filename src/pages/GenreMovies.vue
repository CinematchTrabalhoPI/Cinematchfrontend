<template>
  <div class="genre-movies">
    <button class="btn-back" @click="goBack">← Voltar</button>

    <h2>Filmes do gênero: {{ genreName }}</h2>

    <div v-if="loading">Carregando filmes...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <router-link :to="`/movie/${movie.id}`">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
          <p>{{ movie.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const movies = ref([]);
const genreName = ref("");
const loading = ref(true);
const error = ref(null);

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VlNDkxZjA0M2ExODg2ZWNkNWI2ZTkzMDM1NjkzMCIsIm5iZiI6MTc1OTUwOTI5NS43MzgsInN1YiI6IjY4ZGZmYjJmYzIzZmRjZTE5YmI3N2VjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCkEvmJZlyl49UfX0fVSI76-Yk2dD9tDBKMV3ulA1SI";

const goBack = () => {
  router.back();
};

onMounted(async () => {
  try {
    // Pega o nome do gênero
    const genresResponse = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      params: { language: "pt-BR" }
    });
    const genreObj = genresResponse.data.genres.find(g => g.id == route.params.id);
    genreName.value = genreObj ? genreObj.name : "Desconhecido";

    // Pega os filmes do gênero
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      params: {
        with_genres: route.params.id,
        language: "pt-BR",
        sort_by: "popularity.desc",
        page: 1
      }
    });
    movies.value = response.data.results;
  } catch (err) {
    console.error("Erro ao carregar filmes do gênero:", err);
    error.value = "Não foi possível carregar os filmes.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.genre-movies {
  padding: 40px 100px;
  color: #fff;
  font-family: Arial, sans-serif;
}

.btn-back {
  background: #ff2d74;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
}

.btn-back:hover {
  background: #ff557f;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  background: #1e1e1e;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}
</style>
