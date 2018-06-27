<template>
  <div class="home">
    <Twitter/>

    <h2 class="cursive">last.fm Recent Scrobbles</h2>
    <LastFm/>

    <h2 class="cursive">Latest from Instagram</h2>
    <Instagram/>
  </div>
</template>

<script>
import LastFm from '@/components/LastFm.vue';
import Twitter from '@/components/Twitter.vue';
import Instagram from '@/components/Instagram.vue';

export default {
  name: 'Home',
  components: {
    LastFm,
    Twitter,
    Instagram,
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
  margin: 0.5em 0;
  position: relative;
  text-shadow: 1px 1px 0 #fff;
  text-transform: lowercase;
  z-index: 10;
}
</style>
