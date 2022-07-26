import { it, describe, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import IntroductionSection from './IntroductionSection.vue';

const mountWith = (options) => {
  return shallowMount(IntroductionSection, options);
};

describe('<IntroductionSection />', () => {
  let introductionSection;

  beforeEach(() => {
    introductionSection = mountWith();
  });

  it('should render the component', () => {
    expect(introductionSection.exists()).toBe(true);
  });

  describe('when provided with slot content', () => {
    let slotText = 'slot content here';

    beforeEach(() => {
      introductionSection = mountWith({
        slots: {
          default: slotText,
        },
      });
    });

    it('should render the slot content', () => {
      expect(introductionSection.text()).toContain(slotText);
    });
  });
});
