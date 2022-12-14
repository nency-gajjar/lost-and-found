export default {
    methods: {
        scrollToError() {
            const veeValidationError = document.getElementsByClassName("error")[0];
            if (veeValidationError) {
                veeValidationError.style.scrollMargin = '20px'
                veeValidationError.scrollIntoView({ behavior: "smooth" })
            }
        }
    }
}
