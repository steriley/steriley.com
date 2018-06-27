<template>
  <ol class="last-fm">
    <li v-for="(track, key) in tracks" :key="key" class="last-fm__track">
      <a :href="track.url" class="track">
        <img :src="track.artwork" :alt="`${track.artist} - ${track.title}`" class="track__cover">
        <span class="track__artist">{{ track.artist }}</span>
        <span class="track__title">{{ track.title }}</span>
        <span :date-time="track.date.utc" class="track__date">{{ track.date.formatted }}</span>
        <button class="track__video">Watch Video</button>
      </a>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'LastFm',

  data() {
    return {
      tracks: [],
    };
  },

  mounted() {
    fetch('/api/lastfm')
      .then(data => data.json())
      .then((json) => {
        this.tracks = json;
      });
  },
};
</script>

<style scoped lang="scss">
.last-fm {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.last-fm__track {
  margin: 0 0 1em 0;
  position: relative;
}

.track {
  display: block;
  height: 64px;
  color: #000;
  text-decoration: none;

  span {
    display: block;
  }
}

.track__cover {
  background: transparent url(/assets/img/no_coverart.png) no-repeat left top;
  clear: left;
  float: left;
  height: 64px;
  margin-right: 5px;
  overflow: hidden;
  text-indent: -999em;
  width: 64px;
}

.track__artist {
  font-weight: 700;
}

.track__title {
  overflow: hidden;
  height: 33px;
}

.track__date {
  bottom: 0;
  font-size: 0.9em;
  position: absolute;
  right: 0;
}

.track__video {
  background: none;
  border: 0;
  bottom: 0;
  color: #fff;
  font-size: 0.9em;
  height: auto;
  left: 70px;
  outline: none;
  padding: 0;
  position: absolute;
  text-transform: lowercase;
  z-index: 10;
}
</style>
