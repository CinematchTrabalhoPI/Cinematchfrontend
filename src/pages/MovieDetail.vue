<template>
  <div class="movie-detail" v-if="movie">
    <button class="btn-back" @click="goBack">← Voltar</button>

    <div class="movie-header">
      <div class="posterGenres">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />

        <!-- GÊNEROS -->
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

        <!-- NOTA COM ESTRELA -->
        <p class="rating">
          <img :src="star" alt="Star" class="star" />
          {{ movie.vote_average.toFixed(1) }}
        </p>

        <p class="overview">{{ movie.overview }}</p>

        <!-- ADICIONAR / REMOVER MATCH -->
        <button class="btn-match" @click="toggleMatch">
          {{ isInMatches ? "Remover dos Matches" : "Adicionar aos Matches" }}
        </button>

        <router-link to="/meus-matches" class="btn-go-matches">
          Ver Meus Matches ❤️
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import star from "@/assets/star.png"; // ← AGORA FUNCIONA

import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const movie = ref(null);

// TOKEN
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VlNDkxZjA0M2ExODg2ZWNkNWI2ZTkzMDM1NjkzMCIsIm5iZiI6MTc1OTUwOTI5NS43MzgsInN1YiI6IjY4ZGZmYjJmYzIzZmRjZTE5YmI3N2VjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCkEvmJZlyl49UfX0fVSI76-Yk2dD9tDBKMV3ulA1SI";

// Ano do filme
const releaseYear = computed(() => movie.value?.release_date?.split("-")[0] || "");

// Matches no localStorage
const matches = ref(JSON.parse(localStorage.getItem("meus_matches") || "[]"));

// Verifica se já tá no match
const isInMatches = computed(() =>
  matches.value.some((m) => m.id === movie.value?.id)
);

// Adiciona/remove
const toggleMatch = () => {
  if (!movie.value) return;

  if (isInMatches.value) {
    matches.value = matches.value.filter((m) => m.id !== movie.value.id);
  } else {
    matches.value.push({
      id: movie.value.id,
      title: movie.value.title,
      poster_path: movie.value.poster_path,
    });
  }

  localStorage.setItem("meus_matches", JSON.stringify(matches.value));
};

// Voltar
const goBack = () => router.back();

// Buscar filme
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
  padding: 40px 100px;
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
.btn-back:hover {
  background: #6a6a6a;
}

.movie-header {
  display: flex;
  gap: 5rem;
  margin: 0 30px;
}

/* POSTER + GÊNEROS */
.posterGenres {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
}

.posterGenres img {
  width: 20rem;
  border-radius: 8px;
}

/* GÊNEROS */
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

.movie-info h1 {
  font-size: 2rem;
  margin: 0;
}

.movie-info span {
  color: #aaa;
  font-weight: lighter;
  font-style: italic;
}

.overview {
  margin: 20px 0;
  font-size: 21px;
}

/* ⭐ NOTA COM ESTRELA */
.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
}
.star {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.btn-match {
  margin-top: 20px;
  padding: 10px 20px;
  background: #ff2d74;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 50px;
}

.btn-go-matches {
  display: inline-block;
  margin-top: 14px;
  color: #ff7b7b;
  text-decoration: underline;
}
</style>
