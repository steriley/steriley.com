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
        v-bind="{ ...track }"
        :track-number="key"
        data-qa="lastfm-track"
      />
      <FakePlaceholder v-else data-qa="lastfm-placeholder" />
    </li>
  </ol>
</template>

<script>
export const TRACKS_TO_DISPLAY = 6;
</script>

<script setup>
import FakePlaceholder from './FakePlaceholder.vue';
import LastFmTrack from './LastFmTrack.vue';
import { ref, onMounted } from 'vue';

let tracks = ref(new Array(TRACKS_TO_DISPLAY).fill(0));

onMounted(async () => {
  let data = await fetch(`/api/lastfm/${TRACKS_TO_DISPLAY}`);
  tracks.value = await data.json();
});
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
