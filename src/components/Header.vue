<template>
  <header class="hero-header">
    <router-link to="/">
      <img :src="logo" alt="Logo" class="logo">
    </router-link>

    <router-link to="/meus-matches" class="btn-primary">
      <img :src="ticket" alt="Ticket Icon" class="icon">
      Meus Matches
    </router-link>
  </header>
</template>

<script setup>
import ticket from '@/assets/ticket.png'
import logo from '@/assets/logo.png'
</script>

<style scoped>
.hero-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #121212;
  padding: 20px 100px;
  height: 70px;
}

.logo {
  height: 30px;
  cursor: pointer; 
}

.btn-primary {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.btn-primary:hover{
  text-decoration: underline;
}

.btn-primary .icon {
  width: 20px;
  margin-right: 8px;
}
</style>
