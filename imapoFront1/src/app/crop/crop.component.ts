import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup, ValidationErrors } from '@angular/forms';
import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})
export class CropComponent implements OnInit {

  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }

  cropForm:FormGroup;
  imageCrop:any;

  ngOnInit(): void {
    this.cropForm = this.fb.group({
      fileToUpload:['',Validators.required],
      xstart: ['', [Validators.required,Validators.min(1)]],
      xend: ['',[Validators.required,Validators.min(1)]],
      ystart: ['',[Validators.required,Validators.min(2)]],
      yend: ['',[Validators.required,Validators.min(2)]],
      });
    if(this.imapoService.fileToUpload)
      this.cropForm.patchValue({fileToUpload: true})
    this.cropForm.validator= this.endBiggerThanStart //TODO add a check xend and yend < image width and length
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.cropForm.patchValue({fileToUpload: true}),);
  }

  endBiggerThanStart(form: FormGroup): any {
    if(form.get('xstart').value >= form.get('xend').value)
      form.controls['xstart'].setErrors({ 'startGreaterThanEnd': true });
    else
      form.controls['xstart'].setErrors(null);
    if (form.get('ystart').value >= form.get('yend').value)
      form.controls['ystart'].setErrors({ 'startGreaterThanEnd': true });
    else
      form.controls['ystart'].setErrors(null);
  };


  uploadFileCrop() {
      var parameters={
        xstart:this.cropForm.get('xstart').value,
        xend:this.cropForm.get('xend').value,
        ystart:this.cropForm.get('ystart').value,
        yend:this.cropForm.get('yend').value
      }
      this.imapoService.postFile('crop',parameters).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageCrop=val);
        }
        , error => console.log(error)
      );
    }
}
