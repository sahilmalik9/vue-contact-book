<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-1 p-4">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
