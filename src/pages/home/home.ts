import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;
  qrcodeStr : string;
  qrcodeOk : boolean = false;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.products = response
            console.log(this.products);
        });
  }

  isOk(str : string) : boolean {
    
    return str.length > 0; //TODO: Do proper checking
  }
  send() {
    console.log("Enviando");
  }
  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData.text);
      this.qrcodeStr = barcodeData.text;
      this.qrcodeOk = this.isOk(this.qrcodeStr);
      console.log(this.qrcodeOk);
      

      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      
      // if(this.selectedProduct !== undefined) {
      //   this.productFound = true;
      //   console.log(this.selectedProduct);
      // } else {
      //   this.selectedProduct = {};
      //   this.productFound = false;
      //   this.toast.show('Product not found', '5000', 'center').subscribe(
      //     toast => {
      //       console.log(toast);
      //     }
      //   );
      // }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
