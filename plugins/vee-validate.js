
// import { extend, localize } from "vee-validate";
// import { required, email, min } from "vee-validate/dist/rules";

import Vue from 'vue'

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
  localize,
} from 'vee-validate'
import {
  email,
  required,
  min,
  integer,
  length,
  numeric,
  // eslint-disable-next-line camelcase
  max_value,
  max,
} from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

const dictionary = {
    en: {
        messages: {
            required: () => '* Required',
        },
    },
};

// Install required rule.

extend('required', required)
extend('numeric', numeric)
extend('max_value', max_value)
extend('insurance', {
  // eslint-disable-next-line camelcase
  ...max_value,
  // eslint-disable-next-line no-template-curly-in-string
  message: '{_field_} cannot exceed ${max}.',
})
extend('email', email)
extend('min', min)
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match',
})
extend('strongPassword', {
  validate(value) {
    const passwordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

    return passwordRegex.test(value)
  },
  message:
    'Minimum eight characters with at least one uppercase letter, one lowercase letter, one number and one special character',
})

extend('positiveNumber', {
  validate(value) {
    return value > 0
  },
  message: 'The {_field_} must be above 0.',
})

extend('venueName', {
  params: ['target'],
  validate(value, { target }) {
    return {
      required: !value && !target,
      valid:
        !['', null, undefined].includes(value) ||
        !['', null, undefined].includes(target),
    }
  },
  message: "Please fill Venue name.",
  computesRequired: true,
})

extend('address', {
  params: ['target'],
  validate(value, { target }) {
    return {
      required: !value && !target,
      valid:
        !['', null, undefined].includes(value) ||
        !['', null, undefined].includes(target),
    }
  },
  message: "Please fill your address",
  computesRequired: true,
})

extend('markup', {
  params: ['target'],
  validate(value, { target }) {
    return {
      required: !value && !target,
      valid:
        !['', null, undefined].includes(value) ||
        !['', null, undefined].includes(target),
    }
  },
  message:
    'The markup is required. Please fill in a dollar amount or percentage.',
  computesRequired: true,
})

extend('promo', {
  params: ['target'],
  validate(value, { target }) {
    return {
      required: !value && !target,
      valid:
        !['', null, undefined].includes(value) ||
        !['', null, undefined].includes(target),
    }
  },
  message: 'The promo code value field is required.',
  computesRequired: true,
})

extend('weight', {
  params: ['target'],
  validate(value, { target }) {
    return {
      required: !value && !target,
      valid:
        !['', null, undefined, '0'].includes(value) ||
        !['', null, undefined, '0'].includes(target),
    }
  },
  message: 'Weight is required',
  computesRequired: true,
})

extend('int', {
  ...integer,
  message: 'The {_field_} field may only contain numeric characters',
})
extend('float', {
  validate(value) {
    return !isNaN(Number(value))
  },
  message: 'The {_field_} field must contain a number.',
})
extend('length', length)

extend('max', max)

export const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
export const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/

extend('us_phone', {
  validate(value) {
    return phoneRegex.test(value)
  },
  message: 'The phone number is not valid',
})

extend('zip', {
  validate(value) {
    return zipRegex.test(value)
  },
  message: 'The zip code is not valid',
})

localize(dictionary);