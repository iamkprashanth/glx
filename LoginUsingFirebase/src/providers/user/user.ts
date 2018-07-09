import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore } from "angularfire2/firestore";

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  public  _user: any;
  //public userData: any;

  constructor(public api: Api, public afAuth: AngularFireAuth, private afd: AngularFireDatabase) {
    //this.userData = firebase.database().ref("/UserProfile/");
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    //let seq = this.api.post('login', accountInfo).share();
    let seq =this.afAuth.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
    seq.then((res: any) => {
      // If the API returned a successful response, mark the user as logged in      
        this._loggedIn(res.user);      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {

    let seq = this.afAuth.auth.createUserWithEmailAndPassword(accountInfo.email, accountInfo.password);

    //this.api.post('signup', accountInfo).share();
    seq.then((res: any) => {
      // If the API returned a successful response, mark the user as logged in     
      var users = this.afd.list('/UserProfile');
      const newBillRef = users.push({});
      newBillRef.set({
        name: accountInfo.name,
        id: res.user.uid
      }).then(newBill => {
        this._loggedIn(res.user);
      }, error => {
        console.log(error);
      });

    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
