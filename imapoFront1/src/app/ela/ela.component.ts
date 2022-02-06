import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-ela',
  templateUrl: './ela.component.html',
  styleUrls: ['./ela.component.css']
})
export class ElaComponent implements OnInit {

  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }
  imageEla:any;
  elaForm:FormGroup;


  ngOnInit(): void {
    this.elaForm = this.fb.group({
      fileToUpload:['',Validators.required],
      quality: ['80', [Validators.required,Validators.min(0),Validators.max(100)]],
      scale: ['1',[Validators.required,Validators.min(0)]],
    });
    if(this.imapoService.fileToUpload)
      this.elaForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.elaForm.patchValue({fileToUpload: true}),);
  }

  uploadFileEla() {
      var parameters={
        quality:Number(this.elaForm.get('quality').value),
        scale:Number(this.elaForm.get('scale').value),
      }
      this.imapoService.postFile('ela',parameters).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageEla=val);
        }
        , error => console.log(error)
      );
    }

}
