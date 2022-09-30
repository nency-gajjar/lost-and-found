import { phoneRegex } from '@/plugins/vee-validate'

export const formatPhoneNumber = (phone)=> {
  if (phoneRegex.test(phone)) return phone.replace(phoneRegex, '($1) $2-$3')
  return false
}

export const formatPhoneNumberForApi = (phone) => {
  if (phoneRegex.test(phone))
    return phone.replace(phoneRegex, '$1$2$3')
  return undefined
}

export default {
  methods: {
    formatPhoneNumber,
    formatPhoneNumberForApi,
  },
}
