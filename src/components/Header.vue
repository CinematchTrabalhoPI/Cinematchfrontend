<template>
  <header class="hero-header">
    <router-link to="/matches" class="btn-primary">Meus Matches</router-link>
  </header>
</template>

<script setup></script>

<style scoped>
.hero-header {
  position: fixed;   /* fixa no topo */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;     /* fica acima do conteúdo */
  background-color: #121212;
  padding: 20px 40px;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  height: 70px;      /* define altura do header */
}

.btn-primary {
  text-decoration: underline;
  font-weight: bold;
}
</style>
