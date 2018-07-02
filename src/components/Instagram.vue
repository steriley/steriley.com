<template>
  <ul v-if="photos" class="photo-list">
    <li v-for="photo in photos" :key="photo.link" :data-date="photo.created_time_formatted"
        class="photo-list__item">
      <a :href="photo.link" class="photo">
        <img v-lazy="photo.images.standard_resolution.url" :alt="photo.caption.text"
             class="photo__img">

        <span class="meta">
          <svg class="meta__icon" xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 100 100">
            <path d="M29 32c-5 5-5 13 0 18l21 22 21-22c5-5 5-13 0-18-4-5-12-5-17
                  0l-4 4-4-4c-5-5-13-5-17 0z"/>
          </svg>
          <span class="meta__count">
            {{ photo.likes.count }}
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
    fetch('/api/instagram/14')
      .then(data => data.json())
      .then((json) => {
        this.photos = json;
      });
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
  padding: 0;
}

.photo-list__item {
  flex-basis: calc(14.2857% - 1rem);
  background-color: #fff;
  padding-bottom: 2rem;
  margin: .5rem;
  box-shadow: rgba(0, 0, 0, .4) 2px 2px 1rem;
  border-radius: 2px;
  transform: rotate(-2deg) translate3d(0, 0, 0);
  transition: transform .2s ease-in;

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
    font-family: "Pacifico", cursive;
    position: absolute;
    bottom: .5rem;
    left: .25rem;
    color: rgba(0, 0, 0, .4);
  }
}

.photo {
  padding: .25rem;
  display: block;

  &::before {
    content: '';
    position: absolute;
    background-color: #ddd;
    top: .25rem;
    left: .25rem;
    width: calc(100% - .5rem);
    padding-bottom: calc(100% - .5rem);
    z-index: 0;
  }
}

.photo__img {
  display: block;
  width: 100%;
  opacity: 0;
  position: relative;
  z-index: 1;
  transition: opacity .2s ease-in;

  &[lazy=loaded] {
    opacity: 1;
  }
}

.meta {
  align-items: center;
  bottom: -.5rem;
  display: flex;
  justify-content: center;
  opacity: .75;
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
  left: .25rem;
  right: auto;

  & .meta__count {
    color: #000;
  }
}
</style>
