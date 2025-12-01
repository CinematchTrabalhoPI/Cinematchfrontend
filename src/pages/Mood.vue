<template>
  <div class="mood-page">
    <Header />

    <button class="btn-back" @click="goBack">← Voltar</button>

    <h1 class="title">Escolha seu Mood 🎭</h1>

    <div class="mood-grid">
      <div
        v-for="(mood, key) in moodCards"
        :key="key"
        class="mood-card"
        @click="goToMood(key)"
      >
        <h2>{{ mood.title }}</h2>
        <p>{{ mood.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const moodCards = {
  fun: { title: "Fun 😂", desc: "Leve, engraçado e divertido!" },
  romantic: { title: "Romantic 💘", desc: "Clima de romance no ar!" },
  action: { title: "Action 🔥", desc: "Adrenalina e explosões!" },
  dramatic: { title: "Dramatic 🎭", desc: "Histórias sérias e emocionantes." },
  mindblowing: { title: "Mindblowing 🤯", desc: "Prepare-se para explodir a cabeça." },
  horror: { title: "Horror 😱", desc: "Assustador e sombrio." },
  smart: { title: "Smart 🧠", desc: "Reflexivo, profundo e inteligente." },
  classic: { title: "Classic ⭐", desc: "Filmes antigos e memoráveis." },
  blockbuster: { title: "Blockbuster 🎬", desc: "Hits super populares!" },
};

function goToMood(id) {
  router.push(`/mood/${id}`);
}

const goBack = () => router.back();
</script>

<style scoped>
.mood-page {
  padding: 90px 100px;
  min-height: 100vh;
  color: white;
}

.btn-back {
  margin-bottom: 20px;
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

.title {
  font-size: 2.4rem;
  margin-bottom: 30px;
  font-weight: bold;
}

.mood-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}
.mood-card {
  background: #1b1b1b;
  border: 2px solid #2d2d2d;
  padding: 23px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.25s ease-in-out, transform 0.25s ease-in-out, border-color 0.25s ease-in-out;
}

.mood-card:hover {
  background: #292929;
  transform: translateY(-4px);
  border-color: #ff2d74;
}

.mood-card h2 {
  margin-bottom: 10px;
  font-size: 1.6rem;
}

.mood-card p {
  color: #ccc;
  font-size: 1rem;
}

@media (max-width: 900px) {
  .mood-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .mood-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
