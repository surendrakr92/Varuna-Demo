import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-customer-master',
  templateUrl: './view-customer-master.component.html',
  styleUrls: ['./view-customer-master.component.scss']
})
export class ViewCustomerMasterComponent implements OnInit{
  customerDetailsById:any
  payData:any
  branchData:any
  constructor (private customerServicve:CustomerMasterServiceService,
    private shared_service:SharedService,
    public router:ActivatedRoute){}
ngOnInit(): void {
  this.router.params.subscribe((res) => {
    debugger
    let custId = res.viewData;
    if (custId) {
      this.customerServicve
        .getCustomerMasterById(custId)
        .subscribe((res: any) => {
          this.customerDetailsById = res.data[0];
          this.payData=this.customerDetailsById.customerPayBasis.map((x: { payBasisName: any; })=>x.payBasisName).join()
          this.branchData=this.customerDetailsById.customerBranch.map((x: { branchname: any; })=>x.branchname).join()
        });
    }
  });
}
download_pdf_print() {
  let element_id="viewData_information"
 this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
 })
 }
}
