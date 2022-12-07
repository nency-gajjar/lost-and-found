export default {
    methods: {
      calculateInsuranceCharges(insurance){
        if(Number(insurance) <= 0){
            return 0;
        }
        if(Number(insurance) > 0 && Number(insurance) < 100){
            return 1;
        }
        else if(Number(insurance) >= 100 && Number(insurance) < 200){
            return 2;
        }
        else if(Number(insurance) >= 200 && Number(insurance) < 300){
            return 3;
        }
        else{
            return 4;
        }
      },
    },
  }