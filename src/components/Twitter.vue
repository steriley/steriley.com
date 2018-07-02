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
  </div>
</template>

<script>
export default {
  name: 'Twitter',

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
    fetch('/api/twitter')
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

.tweet {
  background-color: rgba(0, 0, 0, .4);
  border-radius: .25em;
  bottom: 1.5em;
  color: #fff;
  padding: .5em;
  position: static;
  right: 4em;
  text-align: left;
  z-index: 0;
  max-width: 320px;
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
