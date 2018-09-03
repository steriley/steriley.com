<template>
  <div class="wrapper">
    <slot/>
    <div class="introduction">
      <h1 class="heavy-shadow">Stephen Riley</h1>
      <div class="bio">
        Experienced Front-end Web Developer with extensive knowledge of W3C Standards based
        development of desktop &amp; mobile HTML5 and Sass based CSS with a sprinkle of JavaScript
        to bring it all together. Possessing a range of core Front-end skills developed while
        working in financial, media, marketing, e-learning and e-commerce environments.
        Located in Manchester, United Kingdom.
      </div>
      <div id="social-media" class="container--flex">
        <a class="social social--facebook" title="Facebook | Stephen Riley" href="http://www.facebook.com/steriley/">Facebook</a>
        <a class="social social--instagram" title="Instagr.am" href="http://instagram.com/steriley/">Instagr.am</a>
        <a class="social social--linkedin" title="Stephen Riley - LinkedIn" href="http://uk.linkedin.com/in/steriley228">LinkedIn</a>
        <a class="social social--pintrest" title="Pinterest" href="https://www.pinterest.com/riley6206/">Pinterest</a>
        <a class="social social--skype" title="Skype" href="skype:steriley?call">Skype</a>
        <a class="social social--twitter" title="SteRiley on Twitter" href="http://twitter.com/steriley/">Twitter</a>
        <a class="social social--youtube" title="YouTube - steriley's Channel" href="http://www.youtube.com/user/steriley">YouTube</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  max-width: 1100px;
  margin: 3rem auto 7rem;
}

.introduction {
  background-color: rgba(0, 0, 0, .5);
  border-radius: .25rem;
  color: #eee;
  margin-top: 1rem;
  padding: 1rem;
  z-index: 1;
}

.heavy-shadow {
  color: #fff;
  margin: 0 0 .25em 0;
  font-size: 8vmax;
  line-height: .9em;
  letter-spacing: -.05em;
  text-align: center;
  text-transform: uppercase;
  text-shadow:
    0 1px 0 #ccc,
    0 2px 0 #c9c9c9,
    0 3px 0 #bbb,
    0 4px 0 #b9b9b9,
    0 5px 0 #aaa,
    0 6px 1px rgba(0, 0, 0, .1),
    0 0 5px rgba(0, 0, 0, .1),
    0 1px 3px rgba(0, 0, 0, .3),
    0 3px 5px rgba(0, 0, 0, .2),
    0 5px 10px rgba(0, 0, 0, .25),
    0 20px 20px rgba(0, 0, 0, .15);
}

.bio {
  font-size: 1rem;
  margin: 0 auto 1.5rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .8);
  max-width: 680px;
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
  transition: filter .5s;
  min-width: 65px;
  margin: 0 .25rem 1rem;

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
