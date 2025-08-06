<script lang="ts" setup>
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
  <a :href="url" class="track">
    <div class="cover">
      <img
        :src="artwork !== '' ? artwork : '/img/no-cover-art.png'"
        :alt="`${artist} - ${title}`"
        class="track__cover"
      />
    </div>
    <div class="track__details">
      <span class="track__details__artist">{{ artist }}</span>
      <span class="track__details__title">{{ title }}</span>
      <span
        :date-time="date.utc"
        :class="[
          'track__details__date',
          { 'track__details__date--now': date.utc === 0 },
        ]"
        >{{ date.formatted }}</span
      >
    </div>
  </a>
</template>

<style lang="scss" scoped>
.track {
  display: flex;
  min-height: 64px;
  color: #000;
  text-decoration: none;

  &__cover {
    float: left;
    margin-right: 5px;
  }

  span {
    display: block;
  }

  &__details {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    padding-bottom: 1rem;

    &__artist {
      font-weight: 700;
    }

    &__date {
      bottom: 0;
      font-size: 0.9em;
      position: absolute;
      right: 0;
    }

    &__date--now {
      background: url('/icon_eq.gif') no-repeat 0 50%;
      padding-left: 1rem;
    }
  }
}
</style>
