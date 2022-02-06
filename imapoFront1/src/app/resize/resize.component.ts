import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css']
})
export class ResizeComponent implements OnInit {
  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }
  imageResize:any;
  resizeForm:FormGroup;

  ngOnInit(): void {
    this.resizeForm = this.fb.group({
      fileToUpload:['',Validators.required],
      x: ['', [Validators.required,Validators.min(0)]],
      y: ['',[Validators.required,Validators.min(0)]],
      resizeType: ['',Validators.required],
    });
    if(this.imapoService.fileToUpload)
      this.resizeForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.resizeForm.patchValue({fileToUpload: true}),);

  }


  uploadFileResize() {
      var parameters={
        x:this.resizeForm.get('x').value,
        y:this.resizeForm.get('y').value,
        resizeType:this.resizeForm.get('resizeType').value,
      }
      this.imapoService.postFile('resize',parameters).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageResize=val);
        }
        , error => console.log(error)
      );
    }
}
