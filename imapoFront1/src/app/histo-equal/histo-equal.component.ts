import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import {ImapoService} from '../imapo.service';
import { Domain } from '../domain.enum'
@Component({
  selector: 'app-histo-equal',
  templateUrl: './histo-equal.component.html',
  styleUrls: ['./histo-equal.component.css']
})
export class HistoEqualComponent implements OnInit {

  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }
  imageDomains = Object.keys(Domain).filter(value => typeof value === 'string');
  imageHistoEqual:any;
  histoForm:FormGroup;


  ngOnInit(): void {
    this.histoForm = this.fb.group({
      fileToUpload:['',Validators.required],
      selectedDomain: ['GRAY',Validators.required],
    });
    if(this.imapoService.fileToUpload)
      this.histoForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.histoForm.patchValue({fileToUpload: true}),);

  }

  uploadFileHistoEqual() {
    console.log(this.histoForm.get('selectedDomain').value)
      var parameters={
        selectedDomain:this.histoForm.get('selectedDomain').value,
      }
      this.imapoService.postFile('histoEqual',parameters).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageHistoEqual=val);
        }
        , error => console.log(error)
      );
    }
}
