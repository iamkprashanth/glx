import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { Item } from '../../models/item';
import { User } from '../../providers';
import { map } from 'rxjs/operators';

const FIREBASE_ITEMS= 'Items';

@Injectable()
export class Items {

  constructor(private afd: AngularFireDatabase,private usr:User) {  }
  public query(onSuccess: (data) => void, onError: (data) => void = null): any {
    this.afd.object(FIREBASE_ITEMS).valueChanges().subscribe((res: any) => {
      debugger;
      if (res == null) {
        onSuccess(null);
        return;
      }
      let currentItems = [];

      Object.keys(res).forEach(function (key) {
        console.log(key, res[key]);
        let obj={ key:key,profilePic:res[key].profilePic,name:res[key].name,about:res[key].about}
       // currentItems.push(res[key]);
       currentItems.push(obj);
      });

      onSuccess(currentItems)
    }, error => {
      onError(error);
    });

  }

  add(item: Item) {
    //this.items.push(item);

    // Add Firebase code
    var itemsRef = this.afd.list(FIREBASE_ITEMS);
    const newItem = itemsRef.push({});
    newItem.set({
      profilePic:item.profilePic,
      name: item.name,
      about: item.about
    }).then(newBill => {
      //this._loggedIn(res.user);
      console.log(item);
    }, error => {
      console.log(error);
    });

  }

  update(item:any,itemKey:any){
    console.log('item updating..');
    console.log(itemKey,item);
    var itemsRef = this.afd.list(FIREBASE_ITEMS);
    itemsRef.update(itemKey, {  name: item.name, about: item.about });

    // var itemsRef = this.afd.list(FIREBASE_ITEMS);
    // itemsRef.update(itemKey, {  name: item.name,
    //   about: item.about });
  }


   delete(item: any,onSuccess:(data) => void, onError: (data) => void = null) {
    var itemsRef = this.afd.list(FIREBASE_ITEMS);
     itemsRef.remove(item);
   }
}
