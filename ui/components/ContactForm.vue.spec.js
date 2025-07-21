import { it, describe, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactForm from './ContactForm.vue';

const mountWith = (options) => {
  return mount(ContactForm, options);
};

const dataQa = (str) => `[data-qa="${str}"]`;

describe('<ContactForm />', () => {
  let contactForm;
  let fakeYear = 2100;
  let date = new Date(fakeYear, 1, 1);

  beforeEach(() => {
    vi.setSystemTime(date);

    global.fetch = vi
      .fn()
      .mockImplementationOnce(
        () => new Promise((resolve) => resolve('whatever')),
      );

    contactForm = mountWith();
  });

  it('should render the component', () => {
    expect(contactForm.exists()).toBe(true);
  });

  it('should render field: name', () => {
    let name = contactForm.find(dataQa('contact-name'));
    expect(name.exists()).toBe(true);
    expect(name.attributes()).toEqual(
      expect.objectContaining({
        maxlength: '30',
        required: '',
      }),
    );
  });

  it('should render field: email', () => {
    let email = contactForm.find(dataQa('contact-email'));
    expect(email.exists()).toBe(true);
    expect(email.attributes()).toEqual(
      expect.objectContaining({
        maxlength: '50',
        required: '',
      }),
    );
  });

  it('should render field: subject', () => {
    expect(contactForm.find(dataQa('contact-subject')).exists()).toBe(true);
  });

  it('should render field: comments', () => {
    expect(contactForm.find(dataQa('contact-comments')).exists()).toBe(true);
  });

  it('should render field: message', () => {
    expect(contactForm.find(dataQa('contact-message')).exists()).toBe(true);
  });

  it('should have a submit button', () => {
    expect(contactForm.find(dataQa('btn-submit')).exists()).toBe(true);
  });

  it('should NOT render the sent message', () => {
    expect(contactForm.find(dataQa('contact-sent')).exists()).not.toBe(true);
  });

  describe('when form is completed and submitted', () => {
    let mockInput = 'TEST_STRING';

    beforeEach(async () => {
      contactForm
        .find(dataQa('contact-name'))
        .find('input')
        .setValue(mockInput);
      contactForm
        .find(dataQa('contact-email'))
        .find('input')
        .setValue(mockInput);
      contactForm
        .find(dataQa('contact-subject'))
        .find('input')
        .setValue(mockInput);
      contactForm
        .find(dataQa('contact-comments'))
        .find('input')
        .setValue(mockInput);
      contactForm
        .find(dataQa('contact-message'))
        .find('textarea')
        .setValue(mockInput);

      await contactForm.find(dataQa('btn-submit')).trigger('submit');
    });

    it('should send the expected payload', () => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        body: JSON.stringify({
          name: mockInput,
          email: mockInput,
          subject: mockInput,
          comments: mockInput,
          message: mockInput,
          timestamp: 4105123200000,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      });
    });

    it('should display the sent message', () => {
      expect(contactForm.find(dataQa('contact-sent')).exists()).toBe(true);
    });

    it('should NOT display the contact form', () => {
      expect(contactForm.find(dataQa('contact-form')).exists()).not.toBe(true);
    });

    describe('when clicking the return button', () => {
      beforeEach(async () => {
        await contactForm.find(dataQa('contact-return')).trigger('click');
      });

      it('should NOT display the sent message', () => {
        expect(contactForm.find(dataQa('contact-sent')).exists()).not.toBe(
          true,
        );
      });

      it('should display the contact form', () => {
        expect(contactForm.find(dataQa('contact-form')).exists()).toBe(true);
      });
    });
  });
});
