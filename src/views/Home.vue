<template>
  <div class="home">
    <div class="header">
      <a href="/" class="logo">
        <img class="logo__img" src="/img/logo_steriley.png" alt="steriley.com">
      </a>

      <Introduction>
        <Twitter/>
      </Introduction>
    </div>

    <div class="container container--flex">
      <div class="primary"/>
      <div class="secondary">
        <h2 class="cursive">last.fm Recent Scrobbles</h2>
        <LastFm/>
      </div>
    </div>

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
  padding: 0 .5rem;
  position: relative;
  text-shadow: 1px 1px 0 #fff;
  text-transform: lowercase;
  z-index: 10;
}

.logo {
  position: static;
  margin: 2rem 0 .5rem;

  @media screen and (min-width: 650px) {
    position: absolute;
    margin-top: .5rem;
  }
}

$skyline-image-height: 140px;

.header {
  background: transparent url(/img/siloso.jpg) no-repeat 50% 0 fixed;
  background-size: cover;
  min-height: 700px;
  overflow: hidden;
  padding: 1rem .5rem 0;
  position: relative;

  &::after {
    background: transparent url(/img/bg_skyline2.png) 0 0;
    content: '';
    height: $skyline-image-height;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.container--flex {
  display: flex;
  justify-content: flex-end;
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
