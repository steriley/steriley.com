<template>
  <div class="latest-tweet">
    <div v-if="tweet" class="tweet">
      <a :href="tweetUrl" class="tweet__avatar">
        <img :src="tweet.user.profile_image_url_https" :alt="tweet.user.name">
      </a>
      <a :href="userProfileUrl" class="tweet__username">
        <s>@</s>{{ tweet.user.screen_name }}
      </a>
      <small class="tweet__time">
        <a :href="tweetUrl" :title="tweet.created.time">
          {{ tweet.created.short }}
        </a>
      </small>
      <p class="tweet__text">{{ tweet.text }}</p>
    </div>
    <FakePlaceholder v-else/>
  </div>
</template>

<script>
import FakePlaceholder from '@/components/FakePlaceholder.vue';

export default {
  name: 'Twitter',

  components: {
    FakePlaceholder,
  },

  props: {
    fetch: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      tweet: null,
    };
  },

  computed: {
    userProfileUrl() {
      return `http://twitter.com/#!/${this.tweet.user.screen_name}`;
    },

    tweetUrl() {
      return `${this.userProfileUrl}/status/${this.tweet.id_str}`;
    },
  },

  mounted() {
    fetch('/.netlify/functions/twitter')
      .then(data => data.json())
      .then((json) => {
        this.tweet = json;
      });
  },
};
</script>

<style lang="scss" scoped>
a,
s {
  color: #dbd9f5;
  outline: 0;
  text-decoration: none;
}

.latest-tweet {
  min-width: 100%;
  max-width: 800px;
  position: relative;
  right: 0;
  top: 0;
  z-index: 0;

  &::after {
    bottom: -2.5rem;
    content: url('/img/twitter_bird.png');
    position: absolute;
    right: 0;
  }

  @media screen and (min-width: 1024px) {
    margin: 0 0 0 25%;
    min-width: 75%;
  }
}

.tweet {
  background-color: rgba(0, 0, 0, .5);
  border-radius: .25em;
  color: #fff;
  padding: .5em;
  text-align: left;

}

.tweet__avatar {
  float: left;
  margin-right: .25em;
}

.tweet__username {
  margin-right: .25em;
}

.tweet__text {
  margin: 0;
}
</style>
