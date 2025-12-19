<script lang="ts" setup>
import LastFmTrack from './LastFmTrack.vue';
import { computed, onMounted, ref } from 'vue';

const TRACKS_TO_DISPLAY = 6;

let tracks = ref(new Array(TRACKS_TO_DISPLAY).fill(0));

onMounted(async () => {
  // TODO: figure out dynamic routes for /api/lastfm/[limit]
  let data = await fetch(`/api/lastfm`);
  tracks.value = await data.json();
});

const listeningNow = computed(() =>
  tracks.value.find((t: any) => t.date?.utc === 0),
);
const displayedTracks = computed(() =>
  tracks.value.filter((t) => t.date?.utc !== 0),
);
</script>

<template>
  <div
    v-if="listeningNow"
    class="mb-8 rounded-lg  bg-surface shadow-md p-4"
  >
    <div class="flex items-center gap-4">
      <div class="relative size-16 shrink-0">
        <img
          :alt="`${listeningNow.artist} - ${listeningNow.title}`"
          class="h-full w-full rounded-md object-cover shadow-md"
          :src="listeningNow.artwork"
        />
      </div>
      <div class="grow overflow-hidden">
        <p class="text-sm text-primary">Now Listening</p>
        <h4 class="truncate font-bold text-primary">{{ listeningNow.title }}</h4>
        <p class="truncate text-sm text-secondary">{{ listeningNow.artist }}</p>
      </div>
      <div class="flex h-4 items-end gap-1">
        <span class="w-1 animate-sound-bar-1 rounded-full bg-orange-500"></span>
        <span class="w-1 animate-sound-bar-2 rounded-full bg-orange-500"></span>
        <span class="w-1 animate-sound-bar-3 rounded-full bg-orange-500"></span>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
    <div
      class="group flex min-w-0 items-center gap-3 text-left md:flex-col md:text-center"
      v-for="(track, key) in displayedTracks"
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
