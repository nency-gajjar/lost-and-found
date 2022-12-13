export default {
    methods: {
        scrollToError() {
            const veeValidationError = document.querySelector('.error:first-of-type')
            if (veeValidationError) {
                veeValidationError.style.scrollMargin = '20px'
                document.querySelector('.error:first-of-type').scrollIntoView({ behavior: "smooth" })
            }
        }
    }
}
