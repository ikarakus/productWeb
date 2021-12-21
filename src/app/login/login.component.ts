import {Component, OnInit} from '@angular/core';
import {Auth, Hub, I18n} from 'aws-amplify';
import {dict} from '../../assets/i18n/amplify/AuthDict';
import {Router} from '@angular/router';
import {UtilsGeneral} from '../utils/UtilsGeneral';
import {User} from '../model/user';
import { FormFieldTypes } from '@aws-amplify/ui-components';


@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user: User;
  signInFields: FormFieldTypes;
  constructor(private router: Router) {
    this.signInFields = [
      {
        type: 'username',
  //      value:'ikarakus@gmail.com'
      },
      {
        type: 'password',
 //       value:'9616575Ab'
      }
    ];
  }


  ngOnInit() {
    I18n.putVocabularies(dict);
    const listener = (data) => {
      switch (data.payload.event) {
        case 'signIn':
          this.login();
          break;
        case 'signUp':
          console.log('the user signed up');
          break;
        case 'signOut':
          console.log('the user is signed out');
          break;
        case 'signIn_failure':
          console.log('the user is sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');

      }
    };
    Hub.listen('auth', listener);
  }

  login() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        if (user) {
          UtilsGeneral.setUser(user.attributes);
          return this.router.navigate(['/product']);
        }
      });
  }
}
