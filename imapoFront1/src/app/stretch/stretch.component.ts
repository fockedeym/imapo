import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import {ImapoService} from '../imapo.service';
import { Domain } from '../domain.enum'

@Component({
  selector: 'app-stretch',
  templateUrl: './stretch.component.html',
  styleUrls: ['./stretch.component.css']
})
export class StretchComponent implements OnInit {

  constructor(private imapoService: ImapoService,private fb: FormBuilder) { }
  imageDomains = Object.keys(Domain).filter(value => typeof value === 'string');
  stretchForm:FormGroup

  imageStretch:any;

  ngOnInit(): void {
    this.stretchForm = this.fb.group({
      fileToUpload:['',Validators.required],
      selectedDomain: ['GRAY',Validators.required],
    });
    if(this.imapoService.fileToUpload)
      this.stretchForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.stretchForm.patchValue({fileToUpload: true}),);
  }

  uploadFileStrech() {
    var selectedDomain=this.stretchForm.get("selectedDomain").value
    this.imapoService.postFile('histoStretch',{selectedDomain:selectedDomain}).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageStretch=val);
        }
        , error => console.log(error)
      );
    }
}
