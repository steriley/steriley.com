<template>
  <a :href="track.url" class="track">
    <div class="cover">
      <img
        :src="track.artwork !== '' ? track.artwork : '/img/no-cover-art.png'"
        :alt="`${track.artist} - ${track.title}`"
        class="track__cover"
      />
    </div>
    <div class="details">
      <span class="track__artist">{{ track.artist }}</span>
      <span class="track__title">{{ track.title }}</span>
      <span
        :date-time="track.date.utc"
        :class="{ 'track__date--now': track.date.utc === 0 }"
        class="track__date"
        >{{ track.date.formatted }}</span
      >
      <button class="track__video" @click.prevent="emitVideo">
        Watch Video
      </button>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    track: {
      type: Object,
      default: () => {},
    },

    trackNumber: {
      type: Number,
      default: -1,
    },
  },

  methods: {
    emitVideo() {
      const trackNumber = this.trackNumber;
      const { artist, title } = this.track;

      this.$emit('display:video', { artist, title, trackNumber });
    },
  },
};
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
  color: #fff;
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
