<template>
  <div class="home">
    <div class="header">
      <a href="/" class="logo">
        <img
          class="logo__img"
          src="/img/logo_steriley.png"
          alt="steriley.com"
        />
      </a>

      <Introduction>
        <Twitter :fetch="fetch" />
      </Introduction>
    </div>

    <div class="container container--flex">
      <div class="primary">
        <FancyHeader>Latest from Instagram</FancyHeader>
        <Instagram :fetch="fetch" />
      </div>
      <div class="secondary">
        <FancyHeader>last.fm Recent Scrobbles</FancyHeader>
        <LastFm :fetch="fetch" />
      </div>
    </div>

    <ContactForm />

    <div class="footer">
      Copyright &copy; 2004 &ndash; {{ thisYear }} Stephen Riley
    </div>
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue';
import FancyHeader from '@/components/FancyHeader.vue';
import Instagram from '@/components/Instagram.vue';
import Introduction from '@/components/Introduction.vue';
import LastFm from '@/components/LastFm.vue';
import Twitter from '@/components/Twitter.vue';

export default {
  name: 'Home',
  components: {
    ContactForm,
    FancyHeader,
    Instagram,
    Introduction,
    LastFm,
    Twitter,
  },

  computed: {
    thisYear() {
      return new Date().getFullYear();
    },
  },

  methods: {
    fetch(endpoint) {
      return fetch(`/api/${endpoint}`).then(data => data.json());
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  margin: 2rem 0 0.5rem;
  z-index: 2;

  @media screen and (min-width: 1024px) {
    position: absolute;
    margin-top: 0.5rem;
  }
}

$skyline-image-height: 140px;

.header {
  background: transparent url(/img/siloso.jpg) no-repeat 50% 0 fixed;
  background-size: cover;
  min-height: 700px;
  overflow: hidden;
  padding: 1rem 0.5rem 0;
  position: relative;

  &::after {
    background: transparent url(/img/bg_skyline2.png) 0 0;
    content: '';
    height: $skyline-image-height;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.container--flex {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 650px) {
    flex-direction: row;
  }
}

.secondary {
  min-width: 330px;
  order: -1;

  @media screen and (min-width: 650px) {
    order: 0;
  }
}

.footer {
  background-color: #003;
  color: #fff;
  padding: 1rem;
  position: relative;
  text-align: center;
  margin-top: calc(#{$skyline-image-height} + 3rem);

  &::before {
    background: transparent url(/img/bg_skyline.png) 0 0;
    content: '';
    height: $skyline-image-height;
    position: absolute;
    top: -$skyline-image-height;
    left: 0;
    width: 100%;
  }
}
</style>
