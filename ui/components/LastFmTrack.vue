<template>
  <a :href="url" class="track">
    <div class="cover">
      <img
        :src="artwork !== '' ? artwork : '/img/no-cover-art.png'"
        :alt="`${artist} - ${title}`"
        class="track__cover"
      />
    </div>
    <div class="details">
      <span class="track__artist">{{ artist }}</span>
      <span class="track__title">{{ title }}</span>
      <span
        :date-time="date.utc"
        :class="{ 'track__date--now': date.utc === 0 }"
        class="track__date"
        >{{ date.formatted }}</span
      >
    </div>
  </a>
</template>

<script setup>
defineProps({
  url: {
    type: String,
    default: '',
  },
  artwork: {
    type: String,
    default: '',
  },
  artist: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  date: {
    type: Object,
    default: () => ({}),
  },
  trackNumber: {
    type: Number,
    default: -1,
  },
});
</script>

<style lang="scss" scoped>
.track {
  display: flex;
  min-height: 64px;
  color: #000;
  text-decoration: none;

  span {
    display: block;
  }
}

.details {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding-bottom: 1rem;
}

.track__cover {
  float: left;
  margin-right: 5px;
}

.track__artist {
  font-weight: 700;
}

.track__date {
  bottom: 0;
  font-size: 0.9em;
  position: absolute;
  right: 0;
}

.track__date--now {
  background: url('/img/icon_eq.gif') no-repeat 0 50%;
  padding-left: 1rem;
}

.track__video {
  align-self: flex-start;
  background-color: transparent;
  border: 0;
  bottom: 0;
  color: #003;
  font-size: 0.9em;
  height: auto;
  left: 0;
  outline: none;
  padding: 0;
  position: absolute;
  text-transform: lowercase;
  z-index: 10;
}
</style>
