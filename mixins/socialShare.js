export default {
    data() {
        return {
            showSharingIcons: false,
        }
    },
    computed: {
      showSocialShare() {
        if(this.itemDetails.item_status === 0){
          return false;
        }
        return true;
      },
    },
    methods: {
        socialShare(platform){
            let message = "Hey, looks like I have found your lost item.%0ahttps://foundshelf.com/detail-confirmation?id="+this.itemDetails.id;
            if(platform === "twitter"){
              let url = "https://twitter.com/intent/tweet?text="+message;
              window.open(url, '_blank');
            }
            else if(platform === "facebook"){
              let url = `https://www.facebook.com/sharer/sharer.php?u=https://foundshelf.com/detail-confirmation?id=${this.itemDetails.id}&quote=Hey, looks like I have found your lost item.`;
              window.open(url, '_blank');
            }
            else if(platform === "email"){
              let bodyMsg = "Click below link to view your lost item.\n\nhttps://foundshelf.com/detail-confirmation?id="+this.itemDetails.id;
              let url = "mailto:?Subject=Hey,%20looks%20like%20I%20have%20found%20your%20lost%20item&body="+encodeURIComponent(bodyMsg);
              window.open(url, '_blank');
            }
            else if(platform === "copy"){
              navigator.clipboard.writeText(`https://foundshelf.com/detail-confirmation?id=${this.itemDetails.id}`);
            }
            this.showSharingIcons = false;
        },
    }
}
