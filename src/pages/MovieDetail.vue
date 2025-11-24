<template>
  <div class="movie-detail" v-if="movie">
    <button class="btn-back" @click="goBack">← Voltar</button>

    <div class="movie-header">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      <div class="movie-info">
        <h1>{{ movie.title }} <span>({{ releaseYear }})</span></h1>
        <p>Nota: {{ movie.vote_average.toFixed(1) }}</p>
        <p class="overview">{{ movie.overview }}</p>

        <div class="genres">
          <router-link
            v-for="genre in movie.genres"
            :key="genre.id"
            :to="`/genre/${genre.id}`"
            class="genre"
          >
            {{ genre.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const movie = ref(null);

// Token Bearer do TMDB
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VlNDkxZjA0M2ExODg2ZWNkNWI2ZTkzMDM1NjkzMCIsIm5iZiI6MTc1OTUwOTI5NS43MzgsInN1YiI6IjY4ZGZmYjJmYzIzZmRjZTE5YmI3N2VjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCkEvmJZlyl49UfX0fVSI76-Yk2dD9tDBKMV3ulA1SI";

const releaseYear = computed(() => {
  return movie.value?.release_date?.split("-")[0] || "";
});

const goBack = () => {
  router.back();
};

onMounted(async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      params: { language: "pt-BR" }
    });
    movie.value = response.data;
  } catch (err) {
    console.error("Erro ao carregar filme:", err);
  }
});
</script>

<style scoped>
.movie-detail {
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

.movie-header {
  display: flex;
  gap: 40px;
}

.movie-header img {
  width: 250px;
  border-radius: 8px;
}

.movie-info h1 {
  font-size: 2rem;
  margin: 0;
}

.movie-info span {
  font-weight: normal;
  color: #aaa;
}

.overview {
  margin: 20px 0;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.genre {
  background-color: #ff2d2d;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: 0.2s;
}

.genre:hover {
  opacity: 0.8;
}
</style>
