<template>
  <ul v-if="photos" class="photo-list">
    <li
      v-for="photo in photos"
      :key="photo.link"
      :data-date="photo.created_time_formatted"
      class="photo-list__item"
    >
      <a v-if="photo" :href="photo.link" class="photo">
        <img
          v-lazy="photo.images.standard_resolution.url"
          :alt="photo.caption.text"
          class="photo__img"
        >

        <span class="meta">
          <svg
            class="meta__icon"
            xmlns="http://www.w3.org/2000/svg"
            version="1"
            viewBox="0 0 100 100"
          >
            <path
              d="M29 32c-5 5-5 13 0 18l21 22 21-22c5-5 5-13 0-18-4-5-12-5-17
                  0l-4 4-4-4c-5-5-13-5-17 0z"
            />
          </svg>
          <span class="meta__count">{{ photo.likes.count }}</span>
        </span>
      </a>
      <FakePlaceholder v-else class="fake-container--column" />
    </li>
  </ul>
</template>

<script>
import FakePlaceholder from '@/components/FakePlaceholder.vue';

export default {
  name: 'Instagram',

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
      photos: new Array(8).fill(0),
    };
  },

  mounted() {
    this.fetch(`instagram/${this.photos.length}`)
      .then(json => {
        this.photos = json;
      })
      .catch(e => console.log(e));
  },
};
</script>

<style lang="scss" scoped>
.photo-list {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  list-style-type: none;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.photo-list__item {
  flex-basis: calc(50% - 1rem);
  background-color: #fff;
  padding-bottom: 2rem;
  margin: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 1rem;
  border-radius: 2px;
  transform: rotate(-2deg) translate3d(0, 0, 0);
  transition: transform 0.2s ease-in;

  @media screen and (min-width: 650px) {
    flex-basis: calc(25% - 1rem);
  }

  @media screen and (min-width: 1100px) {
    flex-basis: calc(14.2857% - 1rem);
  }

  &:nth-child(even) {
    transform: rotate(2deg);
  }

  &:nth-child(3n) {
    transform: none;
    position: relative;
    top: -5px;
  }

  &:nth-child(5n) {
    transform: none;
    position: relative;
    top: 5px;
  }

  &:nth-child(8n) {
    position: relative;
    top: 8px;
    right: 5px;
  }

  &:hover {
    transform: rotate(0) translate3d(0, -3%, 0);
  }

  &::after {
    content: attr(data-date);
    font-family: 'Pacifico', cursive;
    position: absolute;
    bottom: 0.5rem;
    left: 0.25rem;
    color: rgba(0, 0, 0, 0.4);
  }
}

.photo {
  min-width: 120px;
  padding: 0.25rem;
  display: block;

  @media screen and (min-width: 650px) {
    min-width: 180px;
  }

  &::before {
    content: '';
    position: absolute;
    background-color: #ddd;
    top: 0.25rem;
    left: 0.25rem;
    width: calc(100% - 0.5rem);
    padding-bottom: calc(100% - 0.5rem);
    z-index: 0;
  }
}

.photo__img {
  display: block;
  width: 100%;
  opacity: 0;
  position: relative;
  z-index: 1;
  transition: opacity 0.2s ease-in;

  &[lazy='loaded'] {
    opacity: 1;
  }
}

.meta {
  align-items: center;
  bottom: -0.5rem;
  display: flex;
  justify-content: center;
  opacity: 0.75;
  position: absolute;
  right: 0;
}

.meta__icon {
  fill: #f00;
  width: 50px;
  height: auto;
}

.meta__count {
  color: #fff;
  font-size: 11px;
  position: absolute;
}

.meta--comments {
  background-color: #fff;
  left: 0.25rem;
  right: auto;

  & .meta__count {
    color: #000;
  }
}
</style>
