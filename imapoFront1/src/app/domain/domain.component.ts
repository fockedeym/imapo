import { Component, ViewChild, OnInit,Input } from '@angular/core';
import {ImapoService} from '../imapo.service';
import {ImageLoaderComponent} from '../image-loader/image-loader.component';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  constructor(private imapoService: ImapoService,private sanitizer: DomSanitizer) { }
  imageRed:any;
  imageBlue:any;
  imageGreen:any;

  imageHue:any;
  imageSaturation:any;
  imageValue:any;

  imageY:any;
  imageU:any;
  imageV:any;

  showDomains:Boolean;
  imageLoaded:Boolean;
  ngOnInit(): void {
    this.imageLoaded=this.imapoService.fileToUpload !== undefined
    this.imapoService.fileToUploadChange.subscribe((f:File) =>{
      this.uploadFileDomain()
      this.imageLoaded=true;
    },);

  }

  uploadFileDomain() {
    this.imapoService.postFile('domain',{},'json').subscribe(
        (data:any) => {
          this.imageRed = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[0])
          this.imageGreen = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[1])
          this.imageBlue = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[2])
          this.imageHue = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[3])
          this.imageSaturation = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[4])
          this.imageValue = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[5])
          this.imageY = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[6])
          this.imageU = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[7])
          this.imageV = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+data.result[8])
          this.showDomains =true
        }
        , (error) => {
          console.log(error)
          this.showDomains =false
        }
      );
    }
}
