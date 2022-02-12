import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup, ValidationErrors } from '@angular/forms';
import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-thresholder',
  templateUrl: './thresholder.component.html',
  styleUrls: ['./thresholder.component.css']
})
export class ThresholderComponent implements OnInit {

  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }

  thresholderForm:FormGroup;
  imageThresholder:any;

  ngOnInit(): void {
    this.thresholderForm = this.fb.group({
      fileToUpload:['',Validators.required],
      Rstart: [0, [Validators.required,Validators.min(0)]],
      Gstart: [0,[Validators.required,Validators.min(0)]],
      Bstart: [0,[Validators.required,Validators.min(0)]],
      Rend: [122,[Validators.required,Validators.max(255)]],
      Gend: [122,[Validators.required,Validators.max(255)]],
      Bend: [122,[Validators.required,Validators.max(255)]],
      });
    if(this.imapoService.fileToUpload)
      this.thresholderForm.patchValue({fileToUpload: true})
    this.thresholderForm.validator= this.endBiggerThanStart //TODO add a check xend and yend < image width and length
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.thresholderForm.patchValue({fileToUpload: true}),);
  }

  endBiggerThanStart(form: FormGroup): any {
    if(form.get('Rstart').value >= form.get('Rend').value)
      form.controls['Rstart'].setErrors({ 'startGreaterThanEnd': true });
    else
      form.controls['Rstart'].setErrors(null);
    if (form.get('Gstart').value >= form.get('Gend').value)
      form.controls['Gstart'].setErrors({ 'startGreaterThanEnd': true });
    else
      form.controls['Gstart'].setErrors(null);
    if (form.get('Bstart').value >= form.get('Bend').value)
      form.controls['Bstart'].setErrors({ 'startGreaterThanEnd': true });
    else
      form.controls['Bstart'].setErrors(null);
  };


  uploadFileThresholder() {
      var parameters={
        rstart:this.thresholderForm.get('Rstart').value,
        gstart:this.thresholderForm.get('Gstart').value,
        bstart:this.thresholderForm.get('Bstart').value,
        rend:this.thresholderForm.get('Rend').value,
        gend:this.thresholderForm.get('Gend').value,
        bend:this.thresholderForm.get('Bend').value
      }
      this.imapoService.postFile('threshold',parameters).subscribe(
        async (blobImage:Blob) => {
          await this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageThresholder=val);
          this.loadThresholdedImage(blobImage);
        }
        , error => console.log(error)
      );

    }
    loadThresholdedImage(blobImage:Blob){
        var file = new File([blobImage], "threshold.png", { type: "image/png" });
        this.imapoService.setFileToUpload(file)
    }
}
