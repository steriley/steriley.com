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
  color: #222;
  cursor: pointer;
  display: inline-flex;
  margin-bottom: 0.25rem;
}

.input:required + label {
  &::after {
    background-color: rgba(0, 0, 0, 0.05);
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0;
  display: block;
  color: #222;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  resize: vertical;
  outline: 0;
  padding: 0.75rem 0.5rem;
  transition: background-color 1s;

  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.5);
    transition: background-color 1s, border-color 0.5s;
  }
}
</style>
