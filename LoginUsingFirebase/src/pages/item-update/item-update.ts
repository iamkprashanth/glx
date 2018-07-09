import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ItemUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-update',
  templateUrl: 'item-update.html',
})
export class ItemUpdatePage {
  isReadyToSave: boolean;
  item: any;
  itemKey: any;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,formBuilder: FormBuilder,
    public viewCtrl: ViewController) {
      console.log(navParams.get('item').name, );
      this.item=navParams.get('item');
      this.form = formBuilder.group({
        profilePic: [''],
        name: [this.item.name, Validators.required],
        about: [this.item.about]
      });
  
      // Watch the form for changes, and
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemUpdatePage');
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

}
