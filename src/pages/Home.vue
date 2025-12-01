<template>
  <div class="home"> 
    <Header />

    <header class="hero" v-if="topMovie">
      <div class="mainText">
        <h1>Dê <span class="pink">match</span> com o filme <span class="pink">perfeito</span> para o seu momento!</h1>
        <p>Descubra filmes que combinam com o seu humor. Escolha o mood do dia e deixe o match acontecer.</p>
        <div class="buttons">
          <router-link to="/match" class="btn-primary">Match</router-link>
          <router-link to="/mood" class="btn-secondary">Mood do Dia</router-link>
        </div>
      </div>

      <div class="header-movie">
        <router-link :to="`/movie/${topMovie.id}`">
          <img :src="`https://image.tmdb.org/t/p/w500${topMovie.poster_path}`" :alt="topMovie.title" />
          <h2>{{ topMovie.title }}</h2>
          <p>Clique para saber mais</p>
        </router-link>
      </div>
    </header>
    <section class="popular">
      <h2>Grandes Matches do Momento 🎬</h2>

      <div v-if="loading">Carregando filmes...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="movie-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
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
    
    const popular11 = response.data.results.slice(0, 11);

    
    topMovie.value = popular11[0];

   
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


.home {
  padding-top: 90px; 
 
}
.hero {
  padding: 40px 100px ;
  text-align: left;
   max-height: 85vh;
  display: flex;
}
.mainText{
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
}
.mainText h1 {
  font-size: 4.1rem;
}
.mainText p {
  font-size: 1.5rem;
 width: 80%;
  color: #BDBDBD;
  line-height: 2.3rem;
}
.pink {
  color: #F94B69;
}

.buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 48%;
  gap: 1.8rem;
}

.btn-primary {
  background: linear-gradient(90deg, #FF8197, #F41C41);
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  color: #0A0B0B;
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.btn-secondary {
  border: 2px solid #ff2d74;
  background: transparent;
  padding: 12px 30px;
  border-radius: 30px;
  color: #ff2d74;
  cursor: pointer;
  font-size: 1.5rem;
    display: flex;
  justify-content: center;
}

.header-movie {
   display: flex;
   width: 50%;
   justify-content: center;
}
.header-movie a {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header-movie img {
  border-radius: 8px;
  height: 80%;
  width: 100%;
}

.header-movie h2 {
  font-size: 1.8rem;
}
.header-movie p {
  font-size: 1.2rem;
  color: #BDBDBD;
}

.popular {
  padding:  40px 100px ;
  background-color: #212227;
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

</style>
