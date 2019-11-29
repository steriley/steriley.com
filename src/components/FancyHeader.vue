<template>
  <h2>
    <slot />
  </h2>
</template>

<style scoped>
h2 {
  clear: both;
  color: #181f63;
  font-family: 'Pacifico', cursive;
  font-size: 2em;
  font-weight: normal;
  margin: 0.5em 0;
  padding: 0 0.5rem;
  position: relative;
  text-shadow: 1px 1px 0 #fff;
  text-transform: lowercase;
  z-index: 10;
}
</style>
