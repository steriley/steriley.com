<template>
  <div class="c-youtube">
    <div class="c-youtube__wrapper">
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
  }),

  mounted() {
    if (!this.scriptAlreadyExists()) {
      const tag = document.createElement('script');
      const firstScriptTag = document.getElementsByTagName('script')[0];

      tag.src = this.scriptSrc;

      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => this.initialisePlayer();
      return true;
    }

    return this.initialisePlayer();
  },

  methods: {
    initialisePlayer() {
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
  background-color: rgba(0, 0, 0, 0.5);
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
  top: 50%;
  width: 100%;
}

.c-youtube__close {
  background-color: #d5d4de;
  border-radius: 50%;
  color: #3a3a3a;
  cursor: pointer;
  font-size: 2em;
  font-weight: 700;
  height: 50px;
  line-height: 1.75;
  position: absolute;
  right: -25px;
  text-align: center;
  top: -25px;
  width: 50px;
  z-index: 100;

  &:hover {
    color: #000;
  }
}
</style>
