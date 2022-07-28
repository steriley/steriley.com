<template>
  <div class="latest-tweet">
    <div v-if="tweet" class="tweet" data-qa="tweet-latest">
      <a :href="tweetUrl" class="tweet__avatar" data-qa="tweet-avatar">
        <img :src="tweet.user.profile_image_url_https" :alt="tweet.user.name" />
      </a>
      <a :href="userProfileUrl" class="tweet__username" data-qa="tweet-author">
        <s>@</s>{{ tweet.user.screen_name }}
      </a>
      <small class="tweet__time" data-qa="tweet-time">
        <a :href="tweetUrl" :title="tweet.created.time">
          {{ tweet.created.short }}
        </a>
      </small>
      <p class="tweet__text" data-qa="tweet-text">{{ tweet.text }}</p>
    </div>
    <FakePlaceholder v-else data-qa="tweet-placeholder" />
  </div>
</template>

<script setup>
import FakePlaceholder from './FakePlaceholder.vue';
import { ref, computed, onMounted } from 'vue';

defineProps({
  fetch: {
    type: Function,
    default: () => {},
  },
});

const tweet = ref(null);
const userProfileUrl = computed(
  () => `https://twitter.com/${tweet.value.user.screen_name}`,
);
const tweetUrl = computed(
  () => `${userProfileUrl.value}/status/${tweet.value.id_str}`,
);

onMounted(async () => {
  let data = await fetch('/api/twitter');
  tweet.value = await data.json();
});
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
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.25em;
  color: #fff;
  padding: 0.5em;
  text-align: left;
}

.tweet__avatar {
  float: left;
  margin-right: 0.25em;
}

.tweet__username {
  margin-right: 0.25em;
}

.tweet__text {
  margin: 0;
}
</style>
