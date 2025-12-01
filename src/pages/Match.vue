<template>
  <div class="page">
    <Header />

    <button class="btn-back" @click="goBack">← Voltar</button>

    <h1>Em desenvolvimento...</h1>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.back();
</script>

<style scoped>
.page {
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
</style>
