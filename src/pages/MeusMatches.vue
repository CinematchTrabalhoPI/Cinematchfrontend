<template>
  <div class="matches-page popular">
    <Header />

    <button class="btn-back" @click="goBack">← Voltar</button>

    <h1>Meus Matches ❤️</h1>

    <div v-if="matches.length === 0" class="empty">
      Você ainda não adicionou filmes.
    </div>

    <div class="movie-grid" v-else>
      <div v-for="movie in matches" :key="movie.id" class="movie-card">
        <router-link :to="`/movie/${movie.id}`">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
          <p>{{ movie.title }}</p>
        </router-link>
        <button class="btn-remove" @click="removeMatch(movie.id)">Remover</button>
      </div>
    </div>

    <div v-if="showAlert" class="alert">{{ alertMessage }}</div>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const matches = ref([]);
const showAlert = ref(false);
const alertMessage = ref("");

onMounted(() => {
  matches.value = JSON.parse(localStorage.getItem("meus_matches") || "[]");
});

const goBack = () => router.back();

const removeMatch = (id) => {
  matches.value = matches.value.filter(m => m.id !== id);
  localStorage.setItem("meus_matches", JSON.stringify(matches.value));

  alertMessage.value = "Filme removido dos Matches!";
  showAlert.value = true;
  setTimeout(() => (showAlert.value = false), 2000);
};
</script>

<style scoped>
.popular {
  padding: 90px 100px 40px 100px;
}

.popular h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.empty {
  text-align: center;
  font-size: 1.1rem;
  opacity: 0.7;
  margin-top: 30px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, padding-bottom 0.3s ease;
  cursor: pointer;
  position: relative;
  padding-bottom: 12px;
}

.movie-card:hover {
  transform: scale(1.05);
  padding-bottom: 50px;
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

.btn-remove {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  padding: 8px;
  background: #ff2d2d;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  background-image: linear-gradient(to right, #ff2d2d 0%, #ff2d2d 0%, #ff6a6a 0%, #ff2d2d 0%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  transition: opacity 0.5s ease, background-size 0.5s ease;
}

.movie-card:hover .btn-remove {
  opacity: 1;
  pointer-events: auto;
  background-size: 100% 100%;
}

.btn-remove:hover {
  background: #d21f1f;
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

@media (max-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .popular {
    padding: 90px 20px 40px 20px;
  }
}
</style>
