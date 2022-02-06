import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-bright',
  templateUrl: './bright.component.html',
  styleUrls: ['./bright.component.css']
})
export class BrightComponent implements OnInit {

  constructor(private imapoService: ImapoService,private fb: FormBuilder) { }

  brightForm:FormGroup

  imageBright:any;

  ngOnInit(): void {
    this.brightForm = this.fb.group({
      fileToUpload:['',Validators.required],
      brightnessLevel: ['', [Validators.required,Validators.min(-1),Validators.max(254)]],
    });
    if(this.imapoService.fileToUpload)
      this.brightForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.brightForm.patchValue({fileToUpload: true}),);
  }

  uploadFileBrightness() {
    const brightness = this.brightForm.get('brightnessLevel').value
    this.imapoService.postFile('bright',{brightnessFactor: brightness}).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageBright=val);
        }
        , error => console.log(error)
      );
    }

}
