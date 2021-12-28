import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private router: Router) {}

  async reload(url: string): Promise<boolean> {
    if (url === this.router.url) {
      await this.router.navigateByUrl('.', {skipLocationChange: true});
      return this.router.navigateByUrl(url);
    }
  }
}
