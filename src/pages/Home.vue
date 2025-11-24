<template>
  <div class="home"> 
    <Header />

    <!-- Hero -->
    <header class="hero" v-if="topMovie">
      <div class="mainText">
        <h1>Dê match com o filme perfeito para o seu momento!</h1>
        <p>Descubra filmes que combinam com o seu humor. Escolha o mood do dia e deixe o match acontecer.</p>
        <div class="buttons">
          <router-link to="/match" class="btn-primary">Match</router-link>
          <router-link to="/mood" class="btn-secondary">Mood do Dia</router-link>
        </div>
      </div>

      <div class="header-movie">
        <!-- Clicável: leva para detalhes do topMovie -->
        <router-link :to="`/movie/${topMovie.id}`">
          <img :src="`https://image.tmdb.org/t/p/w500${topMovie.poster_path}`" :alt="topMovie.title" />
          <h2>{{ topMovie.title }}</h2>
        </router-link>
      </div>
    </header>

    <!-- Grid de filmes -->
    <section class="popular">
      <h2>Grandes Matches do Momento 🎬</h2>

      <div v-if="loading">Carregando filmes...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="movie-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
          <!-- Cada card clicável leva para /movie/:id -->
          <router-link :to="`/movie/${movie.id}`">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"/>
            <p>{{ movie.title }}</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import Header from "../components/Header.vue";

import { ref, onMounted } from "vue";
import axios from "axios";

const movies = ref([]);
const topMovie = ref(null);
const loading = ref(true);
const error = ref(null);

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VlNDkxZjA0M2ExODg2ZWNkNWI2ZTkzMDM1NjkzMCIsIm5iZiI6MTc1OTUwOTI5NS43MzgsInN1YiI6IjY4ZGZmYjJmYzIzZmRjZTE5YmI3N2VjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCkEvmJZlyl49UfX0fVSI76-Yk2dD9tDBKMV3ulA1SI";

onMounted(async () => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      params: {
        language: "pt-BR",
        page: 1
      }
    });

    // Pega os 11 primeiros filmes
    const popular11 = response.data.results.slice(0, 11);

    // Primeiro filme = hero
    topMovie.value = popular11[0];

    // Próximos 10 = grid
    movies.value = popular11.slice(1);

  } catch (err) {
    console.error("Erro ao carregar filmes:", err);
    error.value = "Não foi possível carregar os filmes.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
html, body {
  background-color: black;
  color: #fff;
  font-family: Arial, sans-serif;
}

/* Hero */
.home {
  padding-top: 90px; /* Espaço para o header fixo */
}
.hero {
  padding: 40px 100px ;
  text-align: left;
  display: flex;
}
.mainText{
    width: 50%
}

.pink {
  color: #ff2d74;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 16px;
}

.btn-primary {
  background: linear-gradient(90deg, #ff2d74, #ff7f4f);
  border: none;
  padding: 12px 30px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}

.btn-secondary {
  border: 2px solid #ff2d74;
  background: transparent;
  padding: 12px 30px;
  border-radius: 10px;
  color: #ff2d74;
  cursor: pointer;
}

/* Header movie */
.header-movie img {
  width: 200px;
  border-radius: 8px;
  margin-top: 20px;
}

.header-movie h2 {
  margin-top: 10px;
}

/* Grid */
.popular {
  padding:  40px 100px ;
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
