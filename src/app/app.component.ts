import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonService} from './services/common.service';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';
import {Auth, I18n} from 'aws-amplify';
import {UtilsGeneral} from './utils/UtilsGeneral';
import {dict} from '../assets/i18n/amplify/AuthDict';
import {User} from './model/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public user: User;
  public lang: any;
  constructor(private router: Router, private commonService: CommonService,
              private translate: TranslateService,private cdr: ChangeDetectorRef) {
          if (UtilsGeneral.getLang() === null) {
            translate.addLangs(['en', 'tr']);
            // const browserLang = translate.getBrowserLang();
            // this.lang = browserLang.match(/en|tr/) ? browserLang : 'en';
            // to activate the multi language system, just uncomment the code above and then comment the code below.
            this.lang = 'en';
            UtilsGeneral.setLang(this.lang);
          } else {
            this.lang = UtilsGeneral.getLang();
          }
          translate.use(this.lang);
          I18n.setLanguage(this.lang);
          I18n.putVocabularies(dict);

  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.user = UtilsGeneral.getUser();
        this.cdr.detectChanges();
        Auth.currentSession()
          .catch(err => this.logOutIdle());
    }});
  }

  logOut() {
    UtilsGeneral.removeLogin();
    Auth.signOut()
      .then(data => {
        console.log('Tutor log out.');
      }).catch(ex => {
      console.log(ex);
    });
  }

  logOutIdle() {
    UtilsGeneral.removeLogin();
    UtilsGeneral.clearCognitoStorage();
  }

  public switchLanguage(event) {
    if (event.value) {
      this.translate.use(event.value);
      UtilsGeneral.setLang(event.value);
      I18n.setLanguage(event.value);
      this.commonService.reload('/');
    }
  }

}

