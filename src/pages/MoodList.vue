<template>
  <div class="mood-movies popular">
    <Header />

    <button class="btn-back" @click="goBack">← Voltar</button>

    <h2>{{ moodTitle }}</h2>

    <div v-if="loading">Carregando filmes...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <router-link :to="`/movie/${movie.id}`">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <p>{{ movie.title }}</p>
        </router-link>
      </div>
    </div>

    <div class="load-more-wrapper" v-if="!loading && !error">
      <button class="load-more" @click="loadMore">Carregar mais</button>
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
const loading = ref(true);
const error = ref(null);
const page = ref(1);
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VlNDkxZjA0M2ExODg2ZWNkNWI2ZTkzMDM1NjkzMCIsIm5iZiI6MTc1OTUwOTI5NS43MzgsInN1YiI6IjY4ZGZmYjJmYzIzZmRjZTE5YmI3N2VjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCkEvmJZlyl49UfX0fVSI76-Yk2dD9tDBKMV3ulA1SI";

const moodConfig = {
  fun: {
    name: "Leve e Engraçado 😂",
    params: { with_genres: "35,10751", "vote_average.gte": 5, sort_by: "popularity.desc" }
  },
  romantic: {
    name: "Romântico 💘",
    params: { with_genres: "10749", "vote_average.gte": 5, sort_by: "popularity.desc" }
  },
  action: {
    name: "Ação & Adrenalina 🔥",
    params: { with_genres: "28,53", "vote_count.gte": 50, sort_by: "popularity.desc" }
  },
  dramatic: {
    name: "Drama 🎭",
    params: { with_genres: "18", "vote_average.gte": 6, sort_by: "vote_average.desc" }
  },
  mindblowing: {
    name: "Mindblowing 🤯",
    params: { with_genres: "878,9648", "vote_average.gte": 5.5, sort_by: "vote_average.desc" }
  },
  horror: {
    name: "Terror 😱",
    params: { with_genres: "27", "vote_average.gte": 5, sort_by: "popularity.desc" }
  },
  smart: {
    name: "Filmes Inteligentes 🧠",
    params: { with_genres: "99,18", "vote_average.gte": 6, sort_by: "vote_average.desc" }
  },
  classic: {
    name: "Clássicos ⭐",
    params: { "primary_release_date.lte": "2000-01-01", "vote_average.gte": 5.5, sort_by: "vote_average.desc" }
  },
  blockbuster: {
    name: "Blockbusters 🎬",
    params: { "vote_count.gte": 200, sort_by: "popularity.desc" }
  }
};

const moodTitle = moodConfig[route.params.id]?.name || "Mood Selecionado";

const goBack = () => router.back();

async function loadMovies() {
  loading.value = true;
  try {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      params: { language: "pt-BR", page: page.value, ...moodConfig[route.params.id].params }
    });
    movies.value.push(...response.data.results);
  } catch (err) {
    console.error("Erro ao carregar filmes:", err);
    error.value = "Não foi possível carregar os filmes.";
  } finally {
    loading.value = false;
  }
}

function loadMore() {
  page.value++;
  loadMovies();
}

onMounted(() => {
  loadMovies();
});
</script>

<style scoped>
.popular {
  padding: 90px 100px 40px 100px;
  min-height: 100vh;
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
}

.movie-card:hover p {
  -webkit-line-clamp: unset;
  white-space: normal;
}

.load-more-wrapper {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.load-more {
  padding: 12px 22px;
  background: #242424;
  color: #fff;
  border: 1px solid #555;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: 0.3s ease;
}

.load-more:hover {
  background: #333;
  transform: scale(1.05);
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

@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .movie-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .popular {
    padding: 90px 20px 40px 20px;
  }
}

@media (min-width: 1600px) {
  .movie-grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
