import { Component, ViewChild, OnInit,Input } from '@angular/core';
import {ImapoService} from '../imapo.service';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import {ImageLoaderComponent} from '../image-loader/image-loader.component';

@Component({
  selector: 'app-exif',
  templateUrl: './exif.component.html',
  styleUrls: ['./exif.component.css']
})
export class ExifComponent implements OnInit {

  constructor(private imapoService: ImapoService,private fb: FormBuilder) { }

  exifForm:FormGroup;

  ngOnInit(): void {
    this.exifForm = this.fb.group({
      fileToUpload:['',Validators.required],});
    if(this.imapoService.fileToUpload)
        this.exifForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.exifForm.patchValue({fileToUpload: true}),);
  }

  exif:any//Exif
  GPSInfo:any
  showExif:Boolean
  showGPSInfo:Boolean

  uploadFileExif() {
    const fileToUpload = this.imapoService.fileToUpload
    this.imapoService.postFile('exif',{},'json').subscribe(
        (data:any) => {
          this.exif = data
          this.showExif =true
          this.showGPSInfo=false
          if(this.exif.GPSInfo){
            this.GPSInfo=this.exif.GPSInfo
            delete this.exif.GPSInfo
            this.showGPSInfo=true
          }
        }
        , (error) => {
          console.log(error)
          this.showExif =false
        }
      );
    }
}
