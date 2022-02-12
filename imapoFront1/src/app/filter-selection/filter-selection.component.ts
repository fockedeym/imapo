import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';

import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.css']
})
export class FilterSelectionComponent implements OnInit {
  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }
  imageFiltered:any;
  filterForm:FormGroup;
  standardFilters:any={
                        identity:[[0,0,0],[0,1,0],[0,0,0]],
                        ridgeDetection1:[[0,-1,0],[-1,4,-1],[0,-1,0]],
                        ridgeDetection2:[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],
                        sharpen:[[0,-1,0],[-1,5,-1],[0,-1,0]],
                        horizontalEdge:[[-1,-2,-1],[0,0,0],[1,2,1]],
                        verticalEdge:[[-1,0,1],[-2,0,2],[-1,0,1]],
                        mean:[[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]],
                        gaussian:[[1/16,2/16,1/16],[2/16,4/16,2/16],[1/16,2/16,1/16]],
                      }
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      fileToUpload:['',Validators.required],
      filterType:['standard'],
      customX:['3'],
      customY:['3'],
      filter: ['', [Validators.required]],
    });
    if(this.imapoService.fileToUpload)
      this.filterForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => {
        this.filterForm.patchValue({fileToUpload: true});
        this.formChange()
    });
  }

  formChange(event:any=null){
      if(this.filterForm.valid)
        this.uploadFileFilter()
  }

  setNullFilter(){
    var newFilter=[]
    for (var i=0 ; i < this.filterForm.get('customY').value; i++) {
      var newRow=[]
      for (var j=0 ; j < this.filterForm.get('customX').value; j++) {
        newRow.push(0)
      }
      newFilter.push(newRow)
    }
    this.filterForm.patchValue({filter: newFilter})
  }
  setValueToFilter(event:any,x,y){
    var filter=this.filterForm.get('filter').value
    //necessary to make a copy or bug in the ngFor display
    var newFilter=filter.map(x => [...x])
    newFilter[y][x]=Number(event.target.value)
    this.filterForm.patchValue({filter: newFilter})
    this.formChange()
  }
  uploadFileFilter() {
      var parameters={
        filter:this.filterForm.get('filter').value,
      }
      this.imapoService.postFile('filter',parameters).subscribe(
        (blobImage:Blob) => {
          this.imapoService.createImageFromBlob(blobImage,(val)=>this.imageFiltered=val);
        }
        , error => console.log(error)
      );
    }
}
