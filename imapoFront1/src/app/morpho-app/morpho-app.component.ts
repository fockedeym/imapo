import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';

import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-morpho-app',
  templateUrl: './morpho-app.component.html',
  styleUrls: ['./morpho-app.component.css']
})
export class MorphoAppComponent implements OnInit {
  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }
  imageMorpho:any;
  morphoForm:FormGroup;
  standardMorphos:any={
                        identity:[[0,0,0],[0,1,0],[0,0,0]],
                        cross1:[[0,1,0],[1,1,1],[0,1,0]],
                        plain:[[1,1,1],[1,1,1],[1,1,1]],
                        cross2:[[1,0,1],[0,1,0],[1,0,1]],
                      }
  ngOnInit(): void {
    this.morphoForm = this.fb.group({
      fileToUpload:['',Validators.required],
      morphoKernelType:['standard'],
      morphoOperationType:['closing'],
      customX:['3'],
      customY:['3'],
      morphoKernel: ['', [Validators.required]],
    });
    if(this.imapoService.fileToUpload)
      this.morphoForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.morphoForm.patchValue({fileToUpload: true}),);
  }

  setNullMorpho(){
    var newMorpho=[]
    for (var i=0 ; i < this.morphoForm.get('customY').value; i++) {
      var newRow=[]
      for (var j=0 ; j < this.morphoForm.get('customX').value; j++) {
        newRow.push(0)
      }
      newMorpho.push(newRow)
    }
    this.morphoForm.patchValue({morphoKernel: newMorpho})
  }
  setValueToMorpho(event:any,x,y){
    var kernel=this.morphoForm.get('morphoKernel').value
    //necessary to make a copy or bug in the ngFor display
    var newKernel=kernel.map(x => [...x])
    newKernel[y][x]= Number(event.target.value) >= 0.5 ? 1 : 0
    this.morphoForm.patchValue({morphoKernel: newKernel})
  }
  uploadFileMorpho() {
      var parameters={
        kernel:this.morphoForm.get('morphoKernel').value,
        operation:this.morphoForm.get('morphoOperationType').value,
      }
      this.imapoService.postFile('morpho',parameters).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageMorpho=val);
        }
        , error => console.log(error)
      );
    }
}
