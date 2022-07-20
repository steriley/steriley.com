<template>
  <ol class="last-fm">
    <li v-for="(track, key) in tracks" :key="key" class="last-fm__track">
      <LastFmTrack
        v-if="track"
        :track="track"
        :track-number="key"
        @display:video="loadVideo"
      />
      <FakePlaceholder v-else />
      <YouTube v-if="displayVideo === key" :track="track" />
    </li>
  </ol>
</template>

<script>
import FakePlaceholder from './FakePlaceholder.vue';
import LastFmTrack from './LastFmTrack.vue';
import YouTube from './YouTube.vue';

export default {
  name: 'LastFm',

  components: {
    FakePlaceholder,
    LastFmTrack,
    YouTube,
  },

  props: {
    fetch: {
      type: Function,
      default: () => {},
    },
  },

  data: () => ({
    displayVideo: -1,
    tracks: new Array(6).fill(0),
  }),

  mounted() {
    this.fetch(`lastfm/${this.tracks.length}`).then(json => {
      this.tracks = json;
    });
  },

  methods: {
    loadVideo(trackObj) {
      this.displayVideo = trackObj.trackNumber;
    },
  },
};
</script>

<style scoped lang="scss">
.last-fm {
  list-style-type: none;
  margin: 0;
  padding: 0 0.5rem;

  @media screen and (min-width: 1024px) {
    max-width: 310px;
  }
}

.last-fm__track {
  margin: 0 0 1em 0;
  position: relative;
}
</style>
