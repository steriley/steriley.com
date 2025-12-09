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
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
    <div
      class="group flex flex-col items-center text-center"
      v-for="(track, key) in tracks"
      :key="key"
      data-qa="lastfm-item"
    >
      <LastFmTrack
        v-if="track"
        v-bind="{ ...track }"
        :track-number="key"
        data-qa="lastfm-track"
      />
      <slot v-else data-qa="lastfm-placeholder" />
    </div>
  </div>
</template>
