<template>
  <div class="matches-page">
    <button class="btn-back" @click="goBack">← Voltar</button>

    <h1>Meus Matches ❤️</h1>

    <div v-if="matches.length === 0" class="empty">
      Você ainda não adicionou filmes.
    </div>

    <div class="movie-grid">
      <div v-for="movie in matches" :key="movie.id" class="movie-card">
        <router-link :to="`/movie/${movie.id}`">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
          <p>{{ movie.title }}</p>
        </router-link>

        <button class="btn-remove" @click="removeMatch(movie.id)">
          Remover
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const matches = ref([]);

onMounted(() => {
  matches.value = JSON.parse(localStorage.getItem("meus_matches") || "[]");
});

const goBack = () => router.back();

const removeMatch = (id) => {
  matches.value = matches.value.filter(m => m.id !== id);
  localStorage.setItem("meus_matches", JSON.stringify(matches.value));
};
</script>
<style scoped>
.matches-page {
  padding: 40px 70px;
  color: #fff;
  font-family: Arial, sans-serif;
}

/* Botão voltar */
.btn-back {
  background: #ff2d74;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  transition: 0.2s;
}

.btn-back:hover {
  background: #d3235d;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 30px;
}

/* Texto quando vazio */
.empty {
  margin-top: 30px;
  text-align: center;
  opacity: 0.7;
  font-size: 1.1rem;
}

/* Grade de filmes */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 25px;
}

/* Card */
.movie-card {
  background: #1a1a1a;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  transition: 0.2s;
  border: 1px solid #2a2a2a;
}

.movie-card:hover {
  transform: scale(1.03);
  border-color: #ff2d74;
}

/* Imagem */
.movie-card img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 12px;
  transition: 0.2s;
}

.movie-card img:hover {
  opacity: 0.9;
}

/* Título */
.movie-card p {
  margin: 6px 0 10px;
  font-size: 1rem;
  font-weight: bold;
}

/* Botão remover */
.btn-remove {
  width: 100%;
  padding: 8px;
  background: #ff2d2d;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn-remove:hover {
  background: #d21f1f;
}
</style>
