import { Component,Input, OnInit, Output } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ImapoService} from './imapo.service'
import { Observable } from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private imapoService: ImapoService) { }
  title = 'imapoFront1';
  fileToUpload: File | null = null;
  imageBright:any;
  url:any;
  brightnessLevel:number;

  handleFileInput(file:File){
    this.fileToUpload=file
    this.uploadFileToActivity()
  }
  uploadFileToActivity() {
      this.imapoService.postFile('upload',{}).subscribe(data => {
        // do something, if upload success
        }, error => {
          console.log(error);
        });
    }
}
