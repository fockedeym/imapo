import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-human-seg',
  templateUrl: './human-seg.component.html',
  styleUrls: ['./human-seg.component.css']
})
export class HumanSegComponent implements OnInit {

  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }
  imageHumanSeg:any;
  humanSegForm:FormGroup;

  ngOnInit(): void {
    this.humanSegForm = this.fb.group({
      fileToUpload:['',Validators.required],
    });
    if(this.imapoService.fileToUpload)
      this.humanSegForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.humanSegForm.patchValue({fileToUpload: true}),);
  }

  uploadFileHumanSeg() {
      this.imapoService.postFile('humanSeg',{}).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageHumanSeg=val);
        }
        , error => console.log(error)
      );
    }

}
