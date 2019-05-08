import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-display-schedule',
  templateUrl: './display-schedule.page.html',
  styleUrls: ['./display-schedule.page.scss'],
})
export class DisplaySchedulePage implements OnInit {

  public myPhoto: any;
  public error: string;
  private loading: any;

  constructor(
    public navCtrl: NavController,private readonly http: HttpClient,
    private readonly loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController) {
  }

  ngOnInit() {
  }

  takePhoto() {
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      this.myPhoto = this.convertFileSrc(imageData);
      this.uploadPhoto(imageData);
    }, error => this.error = JSON.stringify(error), {
      quality: 100,
      destinationType: camera.DestinationType.FILE_URI,
      sourceType: camera.PictureSourceType.CAMERA,
      encodingType: camera.EncodingType.JPEG
    });
  }
 
  selectPhoto(): void {
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      this.myPhoto = this.convertFileSrc(imageData);
      this.uploadPhoto(imageData);
    }, error => this.error = JSON.stringify(error), {
      sourceType: camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: camera.EncodingType.JPEG,
    });
  }

  private convertFileSrc(url: string): string {
    if (!url) {
      return url;
    }
    if (url.startsWith('/')) {
      return window['WEBVIEW_SERVER_URL'] + '/_app_file_' + url;
    }
    if (url.startsWith('file://')) {
      return window['WEBVIEW_SERVER_URL'] + url.replace('file://', '/_app_file_');
    }
    if (url.startsWith('content://')) {
      return window['WEBVIEW_SERVER_URL'] + url.replace('content:/', '/_app_content_');
    }
    return url;
  }

  private async uploadPhoto(imageFileUri: any) {
    this.error = null;
    this.loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });

    this.loading.present();

    window['resolveLocalFileSystemURL'](imageFileUri,
      entry => {
        entry['file'](file => this.readFile(file));
      });
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private postData(formData: FormData) {
    this.http.post<boolean>(`${environment.serverURL}/upload`, formData)
      .pipe(
        catchError(e => this.handleError(e)),
        finalize(() => this.loading.dismiss())
      )
      .subscribe(ok => this.showToast(ok));
  }

  private async showToast(ok: boolean | {}) {
    if (ok === true) {
      const toast = await this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  private handleError(error: any) {
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return throwError(errMsg);
  }

}
