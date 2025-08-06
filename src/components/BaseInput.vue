<script lang="ts" setup>
import { computed } from 'vue';

const model = defineModel();

const props = defineProps<{
  label: string;
  type?: string;
}>();

const inputOrTextArea = computed(() =>
  props.type === 'textarea' ? 'textarea' : 'input',
);
const identifier = computed(() =>
  props.label.toLowerCase().replace(/\s+/, '-'),
);

function onInput(event: Event) {
  model.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <label
    :for="identifier"
    :class="['label', { 'label--required': $attrs.required === '' }]"
  >
    {{ label }}:
    <component
      :id="identifier"
      :is="inputOrTextArea"
      :type
      class="input"
      v-bind="$attrs"
      @input="onInput"
    />
  </label>
</template>

<style lang="scss" scoped>
.label {
  color: #222;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.25rem;
  position: relative;

  &--required::before {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 1em;
    content: 'Required';
    font-size: 0.6em;
    line-height: 1.75;
    margin-left: 1em;
    padding: 0.3em 0.75em;
    position: absolute;
    right: 0;
    text-transform: uppercase;
    top: 0;
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
  margin: 0.25rem0.75rem 0;
  outline: 0;
  padding: 0.75rem 0.5rem;
  resize: vertical;
  transition: background-color 1s;

  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.5);
    transition:
      background-color 1s,
      border-color 0.5s;
  }
}
</style>
