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
  <div class="relative w-full aspect-square">
    <img
      :alt="`${artist} - ${title}`"
      class="w-full h-full object-cover rounded-lg shadow-md"
      :src="artwork !== '' ? artwork : '/img/no-cover-art.png'"
    />
    <a
      :href="url"
      class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
    >
      <span class="material-symbols-outlined text-white text-5xl!"
        >play_circle</span
      >
    </a>
  </div>
  <h4
    class="mt-3 font-bold text-sm text-primary group-hover:text-secondary truncate w-full"
  >
    {{ title }}
  </h4>
  <p class="text-xs text-secondary truncate w-full">{{ artist }}</p>
  <span :date-time="date.utc" class="mt-1 w-full truncate text-[10px] text-secondary/70">{{
    date.formatted
  }}</span>
</template>
