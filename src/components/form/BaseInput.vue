<template>
  <div class="input-container">
    <component
      :is="inputOrTextArea"
      :id="identifier"
      :class="`input`"
      v-bind="$attrs"
      :type="type"
      @input="updateValue"
    />
    <label :for="identifier" class="l-required">{{ label }}:</label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => emit('update:modelValue', event.target.value);

const inputOrTextArea = computed(() =>
  props.type !== 'textarea' ? 'input' : 'textarea',
);
const identifier = computed(() =>
  props.label.toLowerCase().replace(/\s+/, '-'),
);
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

textarea.input {
  min-height: 100px;
  max-height: 500px;
  width: calc(100% - 1rem);
}

.input {
  background-color: transparent;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #222;
  display: block;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  outline: 0;
  padding: 0.75rem 0.5rem;
  resize: vertical;
  transition: background-color 1s;

  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.5);
    transition: background-color 1s, border-color 0.5s;
  }
}
</style>
