<template>
  <div class="c-youtube">
    <div class="c-youtube__wrapper">
      <div
        v-if="!interacted"
        :class="['c-youtube__cover', { playing: ready }]"
        @click="interacted = true"
      />
      <div id="ytplayer"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    track: {
      default: () => {},
    },
  },

  data: () => ({
    player: null,
    playerId: 'ytplayer',
    scriptSrc: 'https://www.youtube.com/iframe_api',
    ready: false,
    interacted: false,
  }),

  mounted() {
    if (this.scriptAlreadyExists()) {
      this.initialisePlayer();
    }

    const tag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];

    tag.src = this.scriptSrc;

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => this.initialisePlayer();
  },

  methods: {
    initialisePlayer() {
      if (this.player === null) {
        this.player = new YT.Player(this.playerId, {
          height: '480',
          width: '640',
          rel: 0,
          modestbranding: 1,
          videoId: '9bZkp7q19f0',
          events: {
            onReady: this.onReady,
            onStateChange: this.onStateChange,
          },
        });
      }
    },

    onReady() {
      this.player.cuePlaylist({
        listType: 'search',
        list: `${this.track.artist} ${this.track.title} official video`,
        index: 0,
      });
    },

    onStateChange(event) {
      if (event.data === 5) {
        this.player.playVideo();
      }

      if (event.data === 1) {
        setTimeout(() => {
          this.ready = true;
        }, 1000);
      }
    },

    onPauseVideo() {
      this.player.pauseVideo();
    },

    scriptAlreadyExists() {
      const scripts = Array.from(document.getElementsByTagName('script')).map(
        script => script.src,
      );

      return scripts.includes(this.scriptSrc);
    },
  },
};
</script>

<style lang="scss">
.c-youtube {
  margin-top: 1rem;
  background-color: #000;
  height: 100%;
  width: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}

.c-youtube__wrapper {
  border-radius: 0.3em;
  height: 175px;
  position: relative;
  top: 50%;
  width: 100%;
}

.c-youtube__cover {
  background-color: #000;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 1;
  transition: opacity 0.5s ease-in;

  &.playing {
    opacity: 0;
  }
}
</style>
