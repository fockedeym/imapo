import { Component, ViewChild, OnInit,Input } from '@angular/core';
import {ImapoService} from '../imapo.service';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-xmp',
  templateUrl: './xmp.component.html',
  styleUrls: ['./xmp.component.css']
})
export class XmpComponent implements OnInit {

  constructor(private imapoService: ImapoService,private fb: FormBuilder) { }

  xmpForm:FormGroup;

  ngOnInit(): void {
    this.xmpForm = this.fb.group({
      fileToUpload:['',Validators.required],});
    if(this.imapoService.fileToUpload)
        this.xmpForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.xmpForm.patchValue({fileToUpload: true}),);
  }

  xmp:any//Xmp
  showXmp:Boolean

  uploadFileXmp() {
    const fileToUpload = this.imapoService.fileToUpload
    this.imapoService.postFile('xmp',{},'json').subscribe(
        (data:any) => {
          this.xmp = { value: JSON.stringify(data.xmp, null, "\t")}
          this.showXmp =true
        }
        , (error) => {
          console.log(error)
          this.showXmp =false
        }
      );
    }
}
