import { LightningElement } from 'lwc';
import { getBarcodeScanner, getBiometricsService } from 'lightning/mobileCapabilities';

export default class BiometricCmp extends LightningElement {
    status;
    biometricsService;

    connectedCallback(){
        this.barcodeScanner = getBarcodeScanner();
        this.biometricsService = getBiometricsService();
        alert(JSON.stringify(this.biometricsService));
    }

    handleVerifyClick(){
        /*let biometricsService = getBiometricsService();
        alert(JSON.stringify(biometricsService));
        // Check for device biometrics functionality, console log the results
        const options = {
            permissionRequestBody: "Required to confirm device ownership.",
            additionalSupportedPolicies: ['PIN_CODE']
        };
        biometricsService.isBiometricsReady(options)
        .then((results) => {
            alert(results);
        })
        .catch((error) => {
            alert(error.code);
            alert(error.message);
            // Handle cancellation or other errors here
            console.error('Error code: ' + error.code); + 
            console.error('Error message: ' + error.message);
        });*/
        if(this.biometricsService.isAvailable()){
            
            this.biometricsService.checkUserIsDeviceOwner(options)
                .then((result) => {
                // Do something with the result
                if (result === true) {
                this.status = "✔ Current user is device owner."
                } else {
                this.status = "𐄂 Current user is NOT device owner."
                }
            })
            .catch((error) => {
                // Handle errors
                this.status = 'Error code: ' + error.code + '\nError message: ' + error.message;
            });
        }else{
            //Biometric service is not enabled
            this.status = 'Problem initiating Biometrics service. Are you using a mobile device?';
        }
    }
}