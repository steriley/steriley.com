<template>
  <ol class="last-fm">
    <li
      v-for="(track, key) in tracks"
      :key="key"
      class="last-fm__track"
      data-qa="lastfm-item"
    >
      <LastFmTrack
        v-if="track"
        :track="track"
        :track-number="key"
        data-qa="lastfm-track"
        @display:video="loadVideo"
      />
      <FakePlaceholder v-else data-qa="lastfm-placeholder" />
      <YouTube
        v-if="displayVideo === key"
        data-qa="lastfm-youtube"
        :track="track"
      />
    </li>
  </ol>
</template>

<script>
import FakePlaceholder from './FakePlaceholder.vue';
import LastFmTrack from './LastFmTrack.vue';
import YouTube from './YouTube.vue';

export const TRACKS_TO_DISPLAY = 6;

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
    tracks: new Array(TRACKS_TO_DISPLAY).fill(0),
  }),

  mounted() {
    this.fetch(`lastfm/${TRACKS_TO_DISPLAY}`).then((json) => {
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
