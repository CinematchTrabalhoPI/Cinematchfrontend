<template>
  <div class="genre-movies popular">
    <Header />

    <button class="btn-back" @click="goBack">← Voltar</button>

    <h2>{{ genreName }}</h2>

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
import Header from "../components/Header.vue";
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

const goBack = () => router.back();

onMounted(async () => {
  try {
    const genresResponse = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` }, params: { language: "pt-BR" } }
    );

    const genreObj = genresResponse.data.genres.find(g => g.id == route.params.id);
    genreName.value = genreObj ? genreObj.name : "Desconhecido";

    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        params: {
          with_genres: route.params.id,
          language: "pt-BR",
          sort_by: "popularity.desc",
          page: 1
        }
      }
    );

    movies.value = response.data.results;
  } catch (err) {
    console.error(err);
    error.value = "Não foi possível carregar os filmes.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.popular {
  padding: 90px 100px 40px 100px;
}

.popular h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card a {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 12px;
}

.movie-card img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.movie-card p {
  font-size: 1.2rem;
  color: #fff;
  margin-top: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
}

.movie-card:hover p {
  -webkit-line-clamp: unset; 
  white-space: normal;
}

.btn-back {
  margin-bottom: 40px;
  padding: 8px 16px;
  background: #242424;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.btn-back:hover {
  background: #6a6a6a;
}

@media (min-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1600px) {
  .movie-grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
