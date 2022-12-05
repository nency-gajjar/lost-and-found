export default {
  methods: {
    formatMobileNumber2(phoneNumber) {
      let arr = phoneNumber.split(" ");
      arr.shift();
      let phone = arr.join("");
      return phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    },
  },
}
