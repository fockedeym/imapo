import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import {ImapoService} from '../imapo.service';
@Component({
  selector: 'app-quantization-table',
  templateUrl: './quantization-table.component.html',
  styleUrls: ['./quantization-table.component.css']
})
export class QuantizationTableComponent implements OnInit {

  constructor(private imapoService:ImapoService,private fb: FormBuilder) { }
  quantTableForm:FormGroup;
  quantTables:any
  sampling:any
  ngOnInit(): void {
    this.quantTableForm = this.fb.group({
      fileToUpload:['',Validators.required],
    });
    if(this.imapoService.fileToUpload)
      this.quantTableForm.patchValue({fileToUpload: true})
    this.imapoService.fileToUploadChange.subscribe((f:File) => this.quantTableForm.patchValue({fileToUpload: true}),);
  }

  uploadQuantTable() {
      this.imapoService.postFile('quantTable',{},'json').subscribe(
        (data:any) => {
            this.quantTables=[];
            Object.values(data.tables).forEach(element => {
              this.quantTables.push(this.tableToQuantTable(element))
            });
            this.sampling=data.sampling
          }
        , error => console.log(error)
      );
    }

    tableToQuantTable(table:any){
      var retval=[];
      table.forEach((value, index) => {
        if(index%8==0){
          retval.push([])
        }
        retval[Math.floor(index/8)].push(value)
      })
      return retval
    }

}
