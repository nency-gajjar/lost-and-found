export default {
  data() {
    return {
      bindPhoneInputProps: {
        mode: "international",
        autoDefaultCountry: true,
        validCharactersOnly: true,
        autoFormat: true,
        preferredCountries: ["US", "CN"],
        placeholder: "Enter a phone number",
        name: "telephone",
        maxLen: 15,
        inputOptions: {
          showDialCode: false,
        },
      },
    }
  },
  methods: {
    formatMobileNumber(phoneNumber) {
      let arr = phoneNumber.split(" ");
      let countryCode = arr.shift();
      return countryCode + " " + arr.join("");
    },
  },
}
