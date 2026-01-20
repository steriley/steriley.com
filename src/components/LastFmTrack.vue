<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

defineProps<{
  url: string;
  artwork?: string;
  artist: string;
  title: string;
  date: {
    utc: number;
    formatted: string;
  };
  trackNumber: number;
}>();
</script>

<template>
  <div
    class="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg md:h-auto md:w-full md:aspect-square"
  >
    <img
      :alt="`${artist} - ${title}`"
      class="h-full w-full object-cover shadow-md"
      :src="artwork !== '' ? artwork : '/no-cover-art.jpg'"
    />
    <a
      :href="url"
      class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      <span class="material-symbols-outlined text-white text-5xl!"
        >play_circle</span
      >
    </a>
  </div>
  <div class="min-w-0 flex-1 overflow-hidden md:w-full">
    <h4
      class="truncate text-left text-sm font-bold text-primary group-hover:text-secondary md:mt-3 md:text-center"
    >
      {{ title }}
    </h4>
    <p class="truncate text-left text-xs text-secondary md:text-center">
      {{ artist }}
    </p>
    <span
      :date-time="date.utc"
      class="mt-1 block truncate text-left text-[10px] text-secondary/70 md:text-center"
      >{{ date.formatted }}</span
    >
  </div>
</template>
