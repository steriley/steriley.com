<template>
  <form action="/contact" method="post" class="form" @submit="submit">
    <FancyHeader>Get in touch...</FancyHeader>
    <fieldset v-if="sent" class="fieldset">
      <p>Your message has been sent!</p>
      <p @click="sent = !sent">
        Forgot to say something? Send another message...
      </p>
    </fieldset>
    <fieldset v-else class="fieldset">
      <input type="hidden" name="timestamp" :value="timestamp" />

      <vInput v-model="form.name" label="Name" maxlength="30" required />

      <vInput
        v-model="form.email"
        label="Email"
        maxlength="50"
        type="email"
        required
      />

      <vInput v-model="form.subject" label="Subject" maxlength="40" />

      <vInput
        v-model="form.message"
        label="Comments"
        maxlength="30"
        class="support"
      />

      <vInput
        v-model="form.comments"
        type="textarea"
        label="Message"
        cols="33"
        rows="5"
        required
      />

      <button type="submit" :disabled="sending">Send Message</button>
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
    form: {
      name: '',
      email: '',
      subject: '',
      comments: '',
      message: '',
    },
    sent: false,
    sending: false,
  }),

  computed: {
    timestamp() {
      return +new Date();
    },
  },

  methods: {
    submit(e) {
      const data = {
        ...this.$data.form,
        timestamp: this.timestamp,
      };

      this.sending = true;

      fetch('/api/contact', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(() => {
        this.sending = false;
        this.sent = true;
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
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  color: #222;
  padding: 1rem;
  border: 0;
  margin: 0;
}

.support {
  display: none;
}

button[type='submit'] {
  $button-color: #003;
  $text-color: #fff;

  appearance: none;
  background-color: $button-color;
  border-radius: 0.2em;
  border: none;
  color: $text-color;
  cursor: pointer;
  font-size: 1rem;
  outline: 0;
  padding: 1em 2em;
  transition: background-color 0.25s;
  width: 100%;

  &:focus {
    background-color: darken($button-color, 5%);
  }

  &:active {
    background-color: darken($button-color, 10%);
  }

  &:disabled {
    background-color: darken($button-color, 25%);
    color: darken($text-color, 25%);
  }
}
</style>
