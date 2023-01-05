import DetectBrowser from "./detectBrowser";

export default {
    mixins: [DetectBrowser],
    methods: {
        scrollToError() {
            const veeValidationError = document.getElementsByClassName("error")[0];
            if (veeValidationError) {
                veeValidationError.style.scrollMargin = '20px'
                veeValidationError.scrollIntoView({ behavior: "smooth" })
            }
        },
        scrollToFocused(event) {
            const field = event.target;
            field.style.scrollMargin = '30px';
            if(this.mobileDevice){
                field.scrollIntoView();
            }
            else{
                field.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
}
