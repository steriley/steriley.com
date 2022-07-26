import { it, describe, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import HomePage from './Home.vue';

const mountWith = (options) => {
  return shallowMount(HomePage, options);
};

describe('<HomePage />', () => {
  let homePage;
  let fakeYear = 1999;

  beforeEach(() => {
    const date = new Date(fakeYear, 1, 1);
    vi.useFakeTimers();
    vi.setSystemTime(date);

    homePage = mountWith();
  });

  it('should render the component', () => {
    expect(homePage.exists()).toBe(true);
  });

  it('should display the current year in the footer', () => {
    expect(homePage.find('footer').text()).toContain(fakeYear);
  });
});
