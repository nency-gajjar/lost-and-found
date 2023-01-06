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
            else if(platform === "copy"){
              navigator.clipboard.writeText(`https://foundshelf.com/detail-confirmation?id=${this.itemDetails.id}`);
            }
            this.showSharingIcons = false;
        },
    }
}
