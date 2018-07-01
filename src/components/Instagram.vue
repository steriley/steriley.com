<template>
  <ul v-if="photos" class="photo-list">
    <li v-for="photo in photos" :key="photo.link" class="photo-list__item">
      <a :href="photo.link" class="photo">
        <img :src="photo.images.standard_resolution.url" :alt="photo.caption.text"
             class="photo__img">

        <span class="meta">
          <span class="meta__count">
            {{ photo.likes.count }}
          </span>
        </span>

        <span class="meta meta--comments">
          <span class="meta__count">
            {{ photo.comments.count }}
          </span>
        </span>
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
.photo-list {
  list-style-type: none;
  margin: 0 0 10px;
  padding: 0;
  display: flex;
  flex-flow: wrap;
  max-width: 1200px;
}

.photo-list__item {
  flex-basis: 14.2857%;
}

.photo {
  padding: .25rem;
  position: relative;
  display: block;
}

.photo__img {
  display: block;
  width: 100%;
}

.meta {
  align-items: center;
  background-color: #f00;
  bottom: .25rem;
  display: flex;
  justify-content: center;
  opacity: .75;
  padding: .75rem;
  position: absolute;
  right: .25rem;
}

.meta__count {
  color: #fff;
  position: absolute;
}

.meta--comments {
  background-color: #fff;
  left: .25rem;
  right: auto;

  & .meta__count {
    color: #000;
  }
}
</style>
