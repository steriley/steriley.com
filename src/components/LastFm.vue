<script lang="ts" setup>
import LastFmTrack from './LastFmTrack.vue';
import { onMounted, ref } from 'vue';

const TRACKS_TO_DISPLAY = 6;

let tracks = ref(new Array(TRACKS_TO_DISPLAY).fill(0));

onMounted(async () => {
  // TODO: figure out dynamic routes for /api/lastfm/[limit]
  let data = await fetch(`/api/lastfm`);
  tracks.value = await data.json();
});
</script>

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
      <slot v-else data-qa="lastfm-placeholder" />
    </li>
  </ol>
</template>

<style scoped lang="scss">
.last-fm {
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-width: 400px;

  &__track {
    margin: 0 0 1em 0;
    position: relative;
  }
}
</style>
