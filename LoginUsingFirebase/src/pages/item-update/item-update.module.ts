import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ItemUpdatePage } from './item-update';

@NgModule({
  declarations: [
    ItemUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemUpdatePage),
    TranslateModule.forChild()
  ],
})
export class ItemUpdatePageModule {}
