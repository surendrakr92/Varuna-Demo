import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';

@Component({
  selector: 'app-manifest-cancellation',
  templateUrl: './manifest-cancellation.component.html',
  styleUrls: ['./manifest-cancellation.component.scss']
})
export class ManifestCancellationComponent {
  setupJsN: any = []
  constructor(private indentS: IndentServiceService,
    private cs: CommonServiceService,
    private toastrService: ToastrService) { }
  jsonforc = {
    "manifestlist": [
      {
        "tcNo": "",//MF/HQTR/23/00005
        "cancelledBy": this.cs.login_UserId(),
        "cancelledOn": "",
        "cancelReason": "",
        "manualTcNo": null,//
        "tcDate": null,//
        "fromCityId": null//
      }
    ]
  }
  HandleMfNo(data: any, index: any) {
    this.indentS.getmanifestdetailByTc(data.target.value).subscribe((res: any) => {
      if (res.succeeded) {
        console.log(res)
        debugger
        this.jsonforc.manifestlist[index]['tcNo'] = res.data?.tcNo ?? ''
        this.jsonforc.manifestlist[index]['fromCityId'] = res.data?.fromCityId ?? null
        this.jsonforc.manifestlist[index]['manualTcNo'] = res.data?.manualTcNo ?? null
        this.jsonforc.manifestlist[index]['tcDate'] = res.data?.tcDate.slice(0, 10) ?? null
        this.jsonforc.manifestlist[index]['cancelledOn'] = res.data?.tcDate.slice(0, 10) ?? null
      }
    }, err => {
      this.toastrService.error(err.error.Message);
      this.jsonforc.manifestlist[index]['fromCityId'] = null
      this.jsonforc.manifestlist[index]['manualTcNo'] = null
      this.jsonforc.manifestlist[index]['tcDate'] = null
    })
  }
  reaosnCn(ev: any, index: any) {
    this.jsonforc.manifestlist[index]['cancelReason'] = ev.target.value
    console.log(this.jsonforc)
  }
  setupJson(data: any) {
     let indexfin=this.setupJsN.findIndex((x: { tcNo: any; })=>x.tcNo==data.tcNo)
     if(indexfin !== -1){
      this.setupJsN.splice(indexfin,1)
     }else{
      this.setupJsN.push(data)
     }
   
    console.log(this.setupJsN)
  }
  submission() {
    console.log(this.setupJsN)
    this.indentS.cancelManifest({manifestlist:this.setupJsN}).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('cancellation done succesfully');
        this.jsonforc=this.jsonforc
      }
    }, err => {
      this.toastrService.error(err.error.Message);
    })
  }
}
