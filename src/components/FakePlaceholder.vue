<template>
  <div class="fake-container">
    <div class="fake fake-image" />
    <div class="fake-content">
      <div class="fake fake-header" />
      <div class="fake fake-text" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';

$size: 4rem;
$margin: 0.5rem;

.fake-container {
  display: flex;
}

.fake {
  opacity: 0.3;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholder-shimmer;
  animation-timing-function: linear;
  background-color: #f2f2f2;
  background-repeat: no-repeat;
  background-size: 300px 300px;
  background-image: linear-gradient(
    to left,
    #f2f2f2 0%,
    #ccc 50%,
    #f2f2f2 100%
  );
}

@keyframes placeholder-shimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}

.fake-content {
  width: 100%;
}

.fake-image {
  flex-shrink: 0;
  height: $size;
  margin-right: $margin;
  width: $size;
}

.fake-header {
  height: math.div($size - $margin, 3);
  margin-bottom: $margin;
}

.fake-text {
  height: math.div($size - $margin, 1.5);
  width: 100%;
}

.fake-container--column {
  flex-direction: column;
  padding: $margin;

  .fake {
    opacity: 1;
  }

  .fake-image {
    width: 100%;
    padding-bottom: 50%;
    margin-right: 0;
    margin-bottom: $margin;
  }

  .fake-text,
  .fake-header {
    display: none;
  }
}
</style>
