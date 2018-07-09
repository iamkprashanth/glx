import { Component } from '@angular/core';
import { IonicPage, List, ModalController, NavController } from 'ionic-angular';
import { Items } from '../../providers/items/items';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: any[];


  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    private items: Items, private db: AngularFireDatabase) {
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

    this.items.query(
      (data) => {
        this.currentItems = data;
        debugger;
      },
      (errDat) => {
        debugger;
      })


  }


  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
     let addModal = this.modalCtrl.create('ItemCreatePage');
     addModal.onDidDismiss(item => {
       if (item) {
         this.items.add(item);
       }
     })
     addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item:string) {
    console.log('Deleting'+item);
    this.items.delete(item,
      (data) => {
       console.log('Deleted successfully');
        debugger;
      },
      (errDat) => {
        debugger;
      })
  }

    /**
   * Prompt the user to add a new item. This shows our ItemUpdatePage in a
   * modal and then update the item to our data source if the user created one.
   */
  updateItem(item:any,itemKey:any){
    console.log('Update'+item.name+' itemkey='+itemKey);
    let addModal = this.modalCtrl.create('ItemUpdatePage',{item: item});
     addModal.onDidDismiss(item => {
      console.log('after Updating '+item.name+' itemkey='+itemKey);
       if (item) {
         this.items.update(item,itemKey);
       }
     })
     addModal.present();

  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
