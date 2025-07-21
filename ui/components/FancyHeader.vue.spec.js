import { it, describe, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FancyHeader from './FancyHeader.vue';

const mountWith = (options) => {
  return shallowMount(FancyHeader, options);
};

describe('<FancyHeader />', () => {
  let fancyHeader;

  beforeEach(() => {
    fancyHeader = mountWith();
  });

  it('should render the component', () => {
    expect(fancyHeader.exists()).toBe(true);
  });

  describe('when provided with slot content', () => {
    let slotText = 'whatever';

    beforeEach(() => {
      fancyHeader = mountWith({
        slots: {
          default: slotText,
        },
      });
    });

    it('should render the slot content', () => {
      expect(fancyHeader.text()).toBe(slotText);
    });
  });
});
