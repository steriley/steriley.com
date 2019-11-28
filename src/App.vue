<template>
  <div id="app" class="app">
    <Home />
  </div>
</template>

<script>
import Home from './views/Home';

export default {
  components: {
    Home,
  },
};
</script>

<style lang="scss">
body {
  background-color: #afa9f8;
  font: 1rem/1.3 'Open Sans', Calibri, sans-serif;
  margin: 0;
  padding: 0;
}

a {
  &:hover {
    color: #afa9f8;
  }
}
</style>
