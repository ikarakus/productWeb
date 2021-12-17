import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {UserService} from './user.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {NgxSpinnerService} from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private filePath: BehaviorSubject<string>;
  private imagePath: BehaviorSubject<string>;
  private videoPath: BehaviorSubject<string>;
  private timezone: BehaviorSubject<string>;
  public primeTimeHours = new Subject;
  public appConfig = new Subject;
  constructor(private http: HttpClient, private router: Router,  private translate: TranslateService,
              private userService: UserService, private spinner: NgxSpinnerService) {
    this.filePath = new BehaviorSubject<string>('');
    this.imagePath = new BehaviorSubject<string>('');
    this.videoPath = new BehaviorSubject<string>('');
    this.timezone = new BehaviorSubject<string>('');
  }

  getFilePathValue(): Observable<string> {
    return this.filePath.asObservable();
  }
  setFilePathValue(newValue): void {
    this.filePath.next(newValue);
  }

  getImagePathValue(): Observable<string> {
    return this.imagePath.asObservable();
  }
  setImagePathValue(newValue): void {
    this.imagePath.next(newValue);
  }
  getVideoPathValue(): Observable<string> {
    return this.videoPath.asObservable();
  }
  setVideoPathValue(newValue): void {
    this.videoPath.next(newValue);
  }

  getTimezoneValue(): Observable<string> {
    return this.timezone.asObservable();
  }
  setTimezoneValue(newValue): void {
    this.timezone.next(newValue);
  }

  async reload(url: string): Promise<boolean> {
    if (url === this.router.url) {
      await this.router.navigateByUrl('.', {skipLocationChange: true});
      return this.router.navigateByUrl(url);
    }
  }

  uploadFile(endpoint:string,fileToUpload:any,fileType:string) {
    let progress = 0;
    const formData: FormData = new FormData();
    this.spinner.show();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'text'
      })
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            if (fileType==='file') {
              this.setFilePathValue(event.body);
            }
            if (fileType==='image') {
              this.setImagePathValue(event.body);
            }
            if (fileType==='video') {
              this.setVideoPathValue(event.body);
            }
            this.spinner.hide();
            break;
        }
      });
  }
}
