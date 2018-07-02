<template>
  <div class="home">

    <div class="header">
      <Introduction>
        <Twitter/>
      </Introduction>
    </div>

    <h2 class="cursive">last.fm Recent Scrobbles</h2>
    <LastFm/>

    <div class="container">
      <h2 class="cursive">Latest from Instagram</h2>
      <Instagram/>
    </div>

    <div class="footer">
      Copyright &copy; 2004 &ndash; {{ thisYear }} Stephen Riley
    </div>
  </div>
</template>

<script>
import Introduction from '@/components/Introduction.vue';
import LastFm from '@/components/LastFm.vue';
import Twitter from '@/components/Twitter.vue';
import Instagram from '@/components/Instagram.vue';

export default {
  name: 'Home',
  components: {
    Introduction,
    LastFm,
    Twitter,
    Instagram,
  },

  computed: {
    thisYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.cursive {
  clear: both;
  color: #181f63;
  font-family: "Pacifico", cursive;
  font-size: 2em;
  font-weight: normal;
  margin: .5em 0;
  position: relative;
  text-shadow: 1px 1px 0 #fff;
  text-transform: lowercase;
  z-index: 10;
}

$skyline-image-height: 140px;

.header {
  $container-height: 700px;

  background: transparent url(/img/siloso.jpg) no-repeat 0 0 fixed;
  background-size: cover;
  min-height: $container-height;
  overflow: hidden;

  &::after {
    background: transparent url(/img/bg_skyline2.png) 0 0;
    content: '';
    height: $skyline-image-height;
    position: absolute;
    top: $container-height - $skyline-image-height;
    left: 0;
    width: 100%;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  background-color: #003;
  color: #fff;
  padding: 1rem;
  position: relative;
  text-align: center;
  margin-top: calc(#{$skyline-image-height} + 3rem);

  &::before {
    background: transparent url(/img/bg_skyline.png) 0 0;
    content: '';
    height: $skyline-image-height;
    position: absolute;
    top: -$skyline-image-height;
    left: 0;
    width: 100%;
  }
}
</style>
