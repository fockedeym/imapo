import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImapoService} from '../imapo.service'

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnInit {

  constructor(private imapoService: ImapoService) { }

  imgURL:any;
  async ngOnInit(): Promise<void> {
    if(this.imapoService.fileToUpload ===undefined){
    await this.imapoService.loadDefaultImage()
    }
    this.preview()
  }

  preview() {
    var mimeType = this.imapoService.fileToUpload.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.imapoService.fileToUpload);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  handleFileInput(file:File){
    this.imapoService.setFileToUpload(file)
    this.preview()
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
