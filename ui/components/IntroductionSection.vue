<template>
  <div class="intro-wrapper">
    <slot />
    <div class="introduction">
      <h1 class="heavy-shadow">Stephen Riley</h1>
      <div class="bio">
        <p>Experienced TypeScript Developer specialising in modern front-end and Node.js development, with a strong focus on scalable applications and AI integrations. Skilled in Vue, TypeScript, and full-stack development, along with experience building AI-powered solutions, including chatbots and automation tools.</p>
        <p>Background in delivering high-performance web applications across finance, media, e-commerce, and e-learning, with a passion for clean, maintainable code and intelligent system design. Based in Manchester, UK.</p>
      </div>
      <div id="social-media" class="container--flex">
        <a
          class="social social--linkedin"
          title="Stephen Riley - LinkedIn"
          href="http://uk.linkedin.com/in/steriley228"
          >LinkedIn</a
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro-wrapper {
  position: relative;
  max-width: 1100px;
  margin: 1rem auto;

  @media screen and (min-width: 1024px) {
    margin-top: 7rem;
  }
}

.introduction {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  margin-top: 1rem;
  padding: 1rem;
  z-index: 1;
}

.heavy-shadow {
  color: #fff;
  margin: 0 0 0.25em 0;
  font-size: 3rem;
  line-height: 0.9em;
  letter-spacing: -0.05em;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 20px 20px rgba(0, 0, 0, 0.15);

  @media screen and (min-width: 720px) {
    font-size: 6rem;
  }
}

.bio {
  color: #222;
  font-size: 1rem;
  margin: 0 auto 1.5rem;
  max-width: 800px;

  @media screen and (min-width: 720px) {
    font-size: 1.25rem;
  }

  @media screen and (min-width: 1440px) {
    font-size: 1.5rem;
  }
}

.container--flex {
  list-style-type: none;
  display: flex;
  justify-content: center;
  flex-flow: wrap;
}

.social {
  background: transparent url(/img/social_icons.png) no-repeat 0 0;
  display: block;
  filter: none;
  height: 65px;
  outline: none;
  position: relative;
  text-indent: -999em;
  transition: filter 0.5s;
  min-width: 65px;
  margin: 0 0.25rem 1rem;

  &:hover {
    filter: grayscale(1);
  }
}

.social--instagram {
  background-position: -198px 0;
}

.social--linkedin {
  background-position: -330px 0;
}

.social--pintrest {
  background-position: -396px 0;
}

.social--skype {
  background-position: -462px 0;
}

.social--twitter {
  background-position: -528px 0;
}

.social--youtube {
  background-position: -660px 0;
}
</style>
