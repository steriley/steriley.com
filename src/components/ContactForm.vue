<template>
  <form action="/contact" method="post" class="form">
    <fieldset class="fieldset">
      <input type="hidden" name="timestamp" :value="timestamp" />
      <div class="row">
        <label for="realname" class="l-required">Name:</label>
        <input
          id="realname"
          v-model="name"
          type="text"
          maxlength="30"
          required
        />
      </div>
      <div class="row">
        <label for="email" class="l-required">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          maxlength="50"
          required
        />
      </div>
      <div class="row">
        <label for="subject">Subject:</label>
        <input id="subject" v-model="subject" type="text" maxlength="40" />
      </div>
      <div class="row">
        <label for="message_body" class="support">Message:</label>
        <input
          id="message_body"
          v-model="trap"
          type="text"
          maxlength="30"
          class="support"
        />
      </div>
      <div class="row">
        <label for="comments" class="l-required">Comments:</label>
        <textarea
          id="comments"
          v-model="comments"
          name="sender_message"
          cols="33"
          rows="5"
          class="required"
        />
      </div>
      <input
        type="submit"
        name="submit"
        value="Send Message"
        title="Send Message"
      />
    </fieldset>
  </form>
</template>

<script>
export default {
  data: () => ({
    name: '',
    email: '',
    subject: '',
    comments: '',
    trap: '',
  }),

  computed: {
    timestamp() {
      return +new Date();
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.3em;
  padding: 1em;
  margin-bottom: 30px;
}

.fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

.l-required::after {
  background-color: #1a3c61;
  border-radius: 1em;
  content: 'Required';
  font-size: 0.6em;
  margin-left: 1em;
  padding: 0.3em 0.75em;
  position: relative;
  text-transform: uppercase;
  top: -0.3em;
}

label {
  color: #fff;
  cursor: pointer;
}

label,
input {
  display: block;
  margin-bottom: 5px;
}

input[type='email'],
input[type='text'],
textarea {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  color: #fff;
  font-size: 1rem;
  outline: 0;
  padding: 1em;
  transition: background-color 1s;
  width: 100%;

  &:focus {
    background-color: darken(#57547c, 5%);
    border-color: darken(#fff, 50%);
    transition: background-color 1s, border-color 0.5s;
  }
}

.row {
  position: relative;
  margin-bottom: 1em;
}

.support {
  display: none;
}

input[type='submit'] {
  transition: background-color 0.25s;
  background-color: #2196f3;
  border-radius: 0.2em;
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  color: #fff;
  cursor: pointer;
  padding: 1em 2em;
  text-transform: uppercase;
  width: 100%;
}
</style>
