<template>
  <div class="home">
    <div class="wrapper">
      <div class="header">
        <a href="/" class="logo">
          <img
            class="logo__img"
            src="/img/logo_steriley.png"
            alt="steriley.com"
          >
        </a>

        <Introduction />
      </div>

      <div class="container container--flex">
        <div class="primary column">
          <FancyHeader>last.fm Recent Scrobbles</FancyHeader>
          <LastFm :fetch="fetch" />
        </div>
        <div class="secondary column">
          <ContactForm />
        </div>
      </div>
    </div>

    <div class="footer">
      Copyright &copy; 2004 &ndash; {{ thisYear }} Stephen Riley
    </div>
  </div>
</template>

<script>
import ContactForm from '../components/ContactForm.vue';
import FancyHeader from '../components/FancyHeader.vue';
import Introduction from '../components/Introduction.vue';
import LastFm from '../components/LastFm.vue';

export default {
  name: 'HomePage',
  components: {
    ContactForm,
    FancyHeader,
    Introduction,
    LastFm,
  },

  computed: {
    thisYear() {
      return new Date().getFullYear();
    },
  },

  methods: {
    async fetch(endpoint) {
      try {
        let response = await fetch(`/api/${endpoint}`);

        if (response) {
          return await response.json();
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: calc(100vh - 70px);
}

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
  overflow: hidden;
  padding: 1rem 0.5rem 0;
  position: relative;
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
    justify-content: space-around;
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
  color: #222;
  padding: 1rem;
  text-align: center;
}
</style>
