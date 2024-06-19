import { LightningElement } from 'lwc';

export default class WizardPage extends LightningElement {
    currentStep='1';
    handleOnStep(event){
        this.currentStep=event.target.value;

    }
    get isStepOne(){
        return this.currentStep === "1";
    }
    get isStepTwo(){
        return this.currentStep === "2";
    }
    get isStepThree(){
        return this.currentStep === "3";

    }
    
    get isEnablePrev(){
        return this.currentStep != "1";
    }
    get isEnableNext(){
        return this.currentStep != "3";
    }
    get isEnableFinish(){
        return this.currentStep === "3";
    }
   
    handleNext(){
        if(this.currentStep=="1"){
            this.currentStep="2";

        }
        else if(this.currentStep=="2"){
            this.currentStep="3";
        }
    }
    handlePrev(){
        if(this.currentStep=="3"){
            this.currentStep="2";

        }
        else if(this.currentStep=="2"){
            this.currentStep="1";
        }
    }
    handleFinish(){
        if(this.currentStep=="3"){
            this.currentStep="1";

        }
       
    }
}