export default {
    methods: {
        scrollToError(){
            if(document.getElementsByClassName('error')[0]){
              document.getElementsByClassName('error')[0].scrollIntoView();
            }
        }
    }
}
  