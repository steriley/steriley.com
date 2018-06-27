<template>
  <ul v-if="photos" class="photos">
    <li v-for="photo in photos" :key="photo.link">
      <a :href="photo.link">
        <img :src="photo.images.standard_resolution.url" :alt="photo.caption.text">
        <span class="likes">{{ photo.likes.count }}</span>
        <span class="comments">{{ photo.comments.count }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Instagram',

  data() {
    return {
      photos: null,
    };
  },

  mounted() {
    fetch('/api/instagram')
      .then(data => data.json())
      .then((json) => {
        this.photos = json;
      });
  },
};
</script>

<style lang="scss" scoped>
.photos {
  list-style-type: none;
  margin: 0 0 10px;
  padding: 0;
}

.photos li {
  float: left;
  padding: 0 .25em .25em 0;
  min-height: 90px;
  min-width: 90px;
  width: 14.2857%;
}

.photos a {
  position: relative;
  display: block;
}

.photos img {
  display: block;
  width: 100%;
}

.photos a span.likes,
.photos a span.comments {
  position: absolute;
  right: .5em;
  bottom: .5em;
  display: block;
  width: 32px;
  height: 32px;
  background: transparent url(/assets/img/photo_love.png) no-repeat;
  text-align: center;
  font-size: 11px;
  padding-top: 8px;
}

.photos a span.comments {
  right: auto;
  left: .5rem;
}
</style>
