<template>
  <HomePage />
</template>

<script setup>
import HomePage from './views/HomePage.vue';
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

body {
  background-color: #f1f1f1;
  font: 1rem/1.3 'Open Sans', Calibri, sans-serif;
  padding: 0;
}

a {
  &:hover {
    color: #afa9f8;
  }
}
</style>
