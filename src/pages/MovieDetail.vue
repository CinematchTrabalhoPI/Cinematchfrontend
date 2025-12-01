<template>
  <div class="movie-detail">
    <Header />
    
    <button class="btn-back" @click="goBack">← Voltar</button>

    <div class="movie-header" v-if="movie">
      <div class="posterGenres">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
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

      <div class="movie-info">
        <h1>{{ movie.title }} <span>({{ releaseYear }})</span></h1>
        <p class="rating">
          <img :src="star" alt="Star" class="star" />
          {{ movie.vote_average.toFixed(1) }}
        </p>
        <p class="overview">{{ movie.overview }}</p>
        <button
          class="btn-match"
          :class="isInMatches ? 'remove' : 'add'"
          @click="toggleMatch"
        >
          {{ isInMatches ? "Remover dos Matches" : "Adicionar aos Matches" }}
        </button>
      </div>
    </div>

    <div v-if="showAlert" class="alert">{{ alertMessage }}</div>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import star from "@/assets/star.png";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const movie = ref(null);
const releaseYear = computed(() => movie.value?.release_date?.split("-")[0] || "");
const matches = ref(JSON.parse(localStorage.getItem("meus_matches") || "[]"));
const isInMatches = computed(() => matches.value.some((m) => m.id === movie.value?.id));

const showAlert = ref(false);
const alertMessage = ref("");

const toggleMatch = () => {
  if (!movie.value) return;
  if (isInMatches.value) {
    matches.value = matches.value.filter((m) => m.id !== movie.value.id);
    alertMessage.value = "Filme removido dos Matches!";
  } else {
    matches.value.push({
      id: movie.value.id,
      title: movie.value.title,
      poster_path: movie.value.poster_path,
    });
    alertMessage.value = "Filme adicionado aos Matches!";
  }
  localStorage.setItem("meus_matches", JSON.stringify(matches.value));
  showAlert.value = true;
  setTimeout(() => (showAlert.value = false), 2000);
};

const goBack = () => router.back();

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VlNDkxZjA0M2ExODg2ZWNkNWI2ZTkzMDM1NjkzMCIsIm5iZiI6MTc1OTUwOTI5NS43MzgsInN1YiI6IjY4ZGZmYjJmYzIzZmRjZTE5YmI3N2VjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCkEvmJZlyl49UfX0fVSI76-Yk2dD9tDBKMV3ulA1SI";

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}`,
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        params: { language: "pt-BR" },
      }
    );
    movie.value = res.data;
  } catch (err) {
    console.error("Erro ao carregar filme:", err);
  }
});
</script>

<style scoped>
.movie-detail {
  padding: 90px 100px 40px 100px;
  color: #fff;
  font-family: Arial, sans-serif;
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
.btn-back:hover { background: #6a6a6a; }

.movie-header {
  display: flex;
  gap: 5rem;
  margin: 0 30px;
}

.posterGenres {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
}

.posterGenres img { width: 20rem; border-radius: 8px; }

.genres {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

.genre {
  background-color: lch(55.04% 81.59 32.58);
  padding: 5px 10px;
  border-radius: 6px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 0.85rem;
  white-space: nowrap;
}

.movie-info h1 { font-size: 2rem; margin: 0; }
.movie-info span { color: #aaa; font-weight: lighter; font-style: italic; }

.overview { margin: 20px 0; font-size: 21px; }

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
}
.star { width: 18px; height: 18px; object-fit: contain; }

.btn-match {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  color: rgb(0, 0, 0);
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.btn-match.add { background: linear-gradient(90deg, #FF8197, #F41C41); }
.btn-match.remove { background: #ff2d2d; }

.alert {
  position: fixed;
  top: 110px;
  right: 20px;
  background: #212020;
  color: rgb(173, 173, 173);
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  z-index: 9999;
  transition: all 0.8s ease-in-out;
}
</style>
