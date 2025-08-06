<script lang="ts" setup>
import BaseInput from './BaseInput.vue';
import { computed, reactive, ref } from 'vue';

const sent = ref(false);
const sending = ref(false);
const timestamp = computed(() => +new Date());
const form = reactive({
  name: '',
  email: '',
  subject: '',
  comments: '',
  message: '',
});

async function submit(event: Event) {
  const data = {
    ...form,
    timestamp: timestamp.value,
  };

  sending.value = true;

  await fetch('/api/contact', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  sending.value = false;
  sent.value = true;
}
</script>

<template>
  <form
    action="/api/contact"
    method="post"
    class="form"
    @submit.prevent="submit"
  >
    <fieldset v-if="sent" class="fieldset" data-qa="contact-sent">
      <p>Your message has been sent!</p>
      <p data-qa="contact-return" @click="sent = !sent">
        Forgot to say something? Send another message...
      </p>
    </fieldset>
    <fieldset v-else class="fieldset" data-qa="contact-form">
      <input type="hidden" name="timestamp" :value="timestamp" />

      <BaseInput
        v-model="form.name"
        data-qa="contact-name"
        label="Name"
        maxlength="30"
        required
      />

      <BaseInput
        v-model="form.email"
        data-qa="contact-email"
        label="Email"
        maxlength="50"
        type="email"
        required
      />

      <BaseInput
        v-model="form.subject"
        data-qa="contact-subject"
        label="Subject"
        maxlength="40"
      />

      <BaseInput
        v-model="form.message"
        data-qa="contact-comments"
        label="Comments"
        maxlength="30"
        class="support"
      />

      <BaseInput
        v-model="form.comments"
        data-qa="contact-message"
        type="textarea"
        label="Message"
        cols="33"
        rows="5"
        required
      />

      <button type="submit" data-qa="btn-submit" :disabled="sending">
        Send Message
      </button>
    </fieldset>
  </form>
</template>

<style lang="scss" scoped>
@use 'sass:color';

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

:deep(.support) {
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
    background-color: color.scale($button-color, $lightness: -5%);
  }

  &:active {
    background-color: color.scale($button-color, $lightness: -10%);
  }

  &:disabled {
    background-color: color.scale($button-color, $lightness: -25%);
    color: color.scale($text-color, $lightness: -25%);
  }
}
</style>
