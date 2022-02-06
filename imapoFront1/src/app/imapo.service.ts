import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable,Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ImapoService {

  constructor(private httpClient:HttpClient){}
    fileToUpload: File
    fileToUploadChange:Subject<File>= new Subject<File>();

    setFileToUpload(f:File){
      this.fileToUploadChange.next(f)
      this.fileToUpload=f
    }

    async loadDefaultImage(){
      const data = await this.httpClient.get('assets/gris.png', { responseType: 'blob' }).toPromise();
      var file = new File([data], "gris.png", { type: data.type });
      this.setFileToUpload(file)
    }
    postFile(endpointProcedure: string, parameters: any, respType="blob"): Observable<Object> {
        const endpoint = 'api/' + endpointProcedure;
        const formData: FormData = new FormData();
        formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
        for (var key in parameters) {
          formData.append(key, JSON.stringify(parameters[key]));
        }
        if (respType=='blob')
          return this.httpClient.post(endpoint, formData, {responseType: 'blob'})
        else if (respType=='json')
          return this.httpClient.post(endpoint, formData, {responseType: 'json'})

    }

    async createImageFromBlob(image: Blob, callback) {
      const reader = new FileReader();
      const prom = new Promise((resolve, reject) => {
          reader.onload = () => {
            callback(reader.result);
            resolve();
          };
          reader.readAsDataURL(image)
      });
      await prom
    }
}
