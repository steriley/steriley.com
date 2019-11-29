<template>
  <div class="input-container">
    <component
      :is="inputOrTextArea"
      :id="identifier"
      :class="`input`"
      v-bind="$attrs"
      :type="type"
      @input="inputEvent($event.target.value)"
    />
    <label :for="identifier" class="l-required">{{ label }}:</label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: 'text',
    },
  },

  data: () => ({
    input: '',
  }),

  computed: {
    inputOrTextArea() {
      return this.type !== 'textarea' ? 'input' : 'textarea';
    },

    identifier() {
      return this.label.toLowerCase().replace(/\s+/, '-');
    },
  },

  methods: {
    inputEvent(name) {
      this.$emit('input', name);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column-reverse;
}

label {
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  margin-bottom: 0.25rem;
}

.input:required + label {
  &::after {
    background-color: #1a3c61;
    border-radius: 1em;
    content: 'Required';
    font-size: 0.6em;
    margin-left: 1em;
    padding: 0.3em 0.75em;
    position: relative;
    text-transform: uppercase;
    line-height: 1.75;
  }
}

.input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  display: block;
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  resize: vertical;
  outline: 0;
  padding: 0.75rem 0.5rem;
  transition: background-color 1s;

  &:focus {
    background-color: darken(#57547c, 5%);
    border-color: darken(#fff, 50%);
    transition: background-color 1s, border-color 0.5s;
  }
}
</style>
