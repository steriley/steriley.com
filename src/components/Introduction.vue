<template>
  <div class="inner">
    <h1 class="heavy-shadow">Stephen Riley</h1>
    <h2 class="intro">
      Experienced Front-end Web Developer with extensive knowledge of W3C Standards based
      development of desktop &amp; mobile HTML5 and Sass based CSS with a sprinkle of JavaScript to
      bring it all together. Possessing a range of core Front-end skills developed while working in
      financial, media, marketing, e-learning and e-commerce environments.
      Located in Manchester, United Kingdom.
    </h2>
    <ul id="social-media" class="social-icons">
      <li class="facebook"><a title="Facebook | Stephen Riley" href="http://www.facebook.com/steriley/">Facebook</a></li>
      <li class="instagram"><a title="Instagr.am" href="http://instagram.com/steriley/">Instagr.am</a></li>
      <li class="linkedin"><a title="Stephen Riley - LinkedIn" href="http://uk.linkedin.com/in/steriley228">LinkedIn</a></li>
      <li class="pinterest"><a title="Pinterest" href="https://www.pinterest.com/riley6206/">Pinterest</a></li>
      <li class="skype"><a title="Skype" href="skype:steriley?call">Skype</a></li>
      <li class="twitter"><a title="SteRiley on Twitter" href="http://twitter.com/steriley/">Twitter</a></li>
      <li class="youtube"><a title="YouTube - steriley's Channel" href="http://www.youtube.com/user/steriley">YouTube</a></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.inner {
  background-color: rgba(0, 0, 0, .4);
  border-radius: 2px;
  color: #eee;
  margin: 3em;
  padding: .5em;
  position: relative;
  text-align: center;
}

.heavy-shadow {
  color: #fff;
  margin: 0 0 .25em 0;
  font-size: 9em;
  line-height: .9em;
  letter-spacing: -.05em;
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

.intro {
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .8);
  font-weight: 400;
  padding: 0 2em;
}

.social-icons {
  list-style-type: none;
  display: flex;
  justify-content: center;
}
</style>
