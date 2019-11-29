<template>
  <form action="/contact" method="post" class="form" @submit="submit">
    <FancyHeader>Get in touch...</FancyHeader>
    <fieldset class="fieldset">
      <input type="hidden" name="timestamp" :value="timestamp" />

      <vInput v-model="name" label="Name" maxlength="30" required />

      <vInput
        v-model="email"
        label="Email"
        maxlength="50"
        type="email"
        required
      />

      <vInput v-model="subject" label="Subject" maxlength="40" />

      <vInput
        v-model="message"
        label="Message"
        maxlength="30"
        class="support"
      />

      <vInput
        v-model="comments"
        type="textarea"
        label="Comments"
        cols="33"
        rows="5"
        required
      />

      <button type="submit">Send Message</button>
    </fieldset>
  </form>
</template>

<script>
import FancyHeader from '@/components/FancyHeader.vue';
import vInput from '@/components/form/Input.vue';

export default {
  components: {
    FancyHeader,
    vInput,
  },

  data: () => ({
    name: '',
    email: '',
    subject: '',
    comments: '',
    message: '',
  }),

  computed: {
    timestamp() {
      return +new Date();
    },
  },

  methods: {
    submit(e) {
      const data = {
        ...this.$data,
        timestamp: this.timestamp,
      };

      fetch('/api/contact', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  max-width: 500px;
}

.fieldset {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.3rem;
  padding: 1rem;
  border: 0;
  margin: 0;
}

.support {
  display: none;
}

button[type='submit'] {
  appearance: none;
  background-color: #2196f3;
  border-radius: 0.2em;
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 1em 2em;
  transition: background-color 0.25s;
  width: 100%;
}
</style>
