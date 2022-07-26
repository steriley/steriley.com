import { it, describe, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FakePlaceholder from './FakePlaceholder.vue';

const mountWith = (options) => {
  return shallowMount(FakePlaceholder, options);
};

describe('<FakePlaceholder />', () => {
  let fakePlaceholder;

  beforeEach(() => {
    fakePlaceholder = mountWith();
  });

  it('should render the component', () => {
    expect(fakePlaceholder.exists()).toBe(true);
  });
});
