<template>
  <ol class="last-fm">
    <li v-for="(track, key) in tracks" :key="key" class="last-fm__track">
      <a :href="track.url" class="track">
        <div class="cover">
          <img :src="track.artwork" :alt="`${track.artist} - ${track.title}`" class="track__cover">
        </div>
        <div class="details">
          <span class="track__artist">{{ track.artist }}</span>
          <span class="track__title">{{ track.title }}</span>
          <span :date-time="track.date.utc" :class="{'track__date--now' : track.date.utc === 0}"
                class="track__date">{{ track.date.formatted }}</span>
          <button class="track__video" @click.prevent="loadVideo(track.artist, track.title)">
            Watch Video
          </button>
        </div>
      </a>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'LastFm',

  data() {
    return {
      tracks: [],
      displayVideo: false,
    };
  },

  mounted() {
    fetch('/api/lastfm/6')
      .then(data => data.json())
      .then((json) => {
        this.tracks = json;
      });
  },

  methods: {
    loadVideo(artist, title) {
      this.displayVideo = `${artist} ${title}`;
    },
  },
};
</script>

<style scoped lang="scss">
.last-fm {
  list-style-type: none;
  margin: 0;
  max-width: 310px;
  padding: 0;
}

.last-fm__track {
  margin: 0 0 1em 0;
  position: relative;
}

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
  background: transparent url(/assets/img/no_coverart.png) no-repeat left top;
  float: left;
  margin-right: 5px;
}

.track__artist {
  font-weight: 700;
}

.track__date {
  bottom: 0;
  font-size: .9em;
  position: absolute;
  right: 0;
}

.track__date--now {
  background: url('/icon_eq.gif') no-repeat 0 50%;
  padding-left: 1rem;
}

.track__video {
  background-color: transparent;
  border: 0;
  color: #fff;
  font-size: .9em;
  height: auto;
  outline: none;
  padding: 0;
  text-transform: lowercase;
  z-index: 10;
  align-self: flex-start;
    bottom: 0;
  font-size: .9em;
  position: absolute;
  left: 0;
}
</style>
