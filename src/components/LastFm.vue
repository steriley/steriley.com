<template>
  <ol class="last-fm">
    <li v-for="(track, key) in tracks" :key="key" class="last-fm__track">
      <LastFmTrack v-if="track" :track="track"/>
      <FakePlaceholder v-else/>
    </li>
  </ol>
</template>

<script>
import FakePlaceholder from '@/components/FakePlaceholder.vue';
import LastFmTrack from '@/components/LastFmTrack.vue';

const tracksToDisplay = 6;

export default {
  name: 'LastFm',

  components: {
    FakePlaceholder,
    LastFmTrack,
  },

  props: {
    fetch: {
      type: Function,
      default: () => {},
    },
  },

  data: () => ({
    displayVideo: false,
    tracks: new Array(tracksToDisplay).fill(0),
  }),

  mounted() {
    this.fetch(`lastfm/${tracksToDisplay}`)
      .then((json) => {
        this.tracks = json;
      });
  },

  methods: {
    loadVideo(artist, title) {
      this.displayVideo = `${artist} ${title}`;
    },
  },
};
</script>

<style scoped lang="scss">
.last-fm {
  list-style-type: none;
  margin: 0;
  max-width: 310px;
  padding: 0 .5rem;
}

.last-fm__track {
  margin: 0 0 1em 0;
  position: relative;
}
</style>
