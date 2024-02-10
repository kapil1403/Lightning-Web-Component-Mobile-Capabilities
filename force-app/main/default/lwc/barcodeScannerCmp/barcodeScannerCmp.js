import { LightningElement, track } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities';

export default class BarcodeScannerCmp extends LightningElement {
    barcodeScanner;
    @track scannedBarcodes;

    connectedCallback() {
        this.barcodeScanner = getBarcodeScanner();
    }

    beginScanning() {
        // Set your configuration options, including bulk and multi-scanning if desired, in this scanningOptions object
        const scanningOptions = {
            barcodeTypes: [this.barcodeScanner.barcodeTypes.QR, 
                            this.barcodeScanner.barcodeTypes.CODE_128,
                            this.barcodeScanner.barcodeTypes.CODE_39,
                            this.barcodeScanner.barcodeTypes.CODE_93,
                            this.barcodeScanner.barcodeTypes.DATA_MATRIX,
                            this.barcodeScanner.barcodeTypes.EAN_13,
                            this.barcodeScanner.barcodeTypes.EAN_8,
                            this.barcodeScanner.barcodeTypes.ITF,
                            this.barcodeScanner.barcodeTypes.PDF_417,
                            this.barcodeScanner.barcodeTypes.UPC_A,
                            this.barcodeScanner.barcodeTypes.UPC_E
                        ],
            scannerSize: "FULLSCREEN",
            cameraFacing: "BACK",
            showSuccessCheckMark: true,
            enableBulkScan: true,
            enableMultiScan: true,
        };

        // Make sure BarcodeScanner is available before trying to use it
        if (this.barcodeScanner != null && this.barcodeScanner.isAvailable()) {
        // Reset scannedBarcodes before starting new scanning session
        this.scannedBarcodes = [];

        // Start scanning barcodes
        this.barcodeScanner
            .scan(scanningOptions)
            .then((results) => {
                this.processScannedBarcodes(results);
            })
            .catch((error) => {
                this.processError(error);
            })
            .finally(() => {
                this.barcodeScanner.dismiss();
            });
        } else {
            console.log("BarcodeScanner unavailable. Non-mobile device?");
        }
    }

    processScannedBarcodes(barcodes) {
        // Do something with the barcode scan value:
        // - look up a record
        // - create or update a record
        // - parse data and put values into a form
        // - and so on; this is YOUR code
        console.log(JSON.stringify(barcodes));
        this.scannedBarcodes = this.scannedBarcodes.concat(barcodes);
    }

    processError(error) {
        // Check to see if user ended scanning
        if (error.code == "USER_DISMISSED") {
            console.log("User terminated scanning session.");
        } else {
            console.error(error);
        }
    }

    get scannedBarcodesAsString() {
        return this.scannedBarcodes.map((barcode) => barcode.value).join("\n");
    }
}