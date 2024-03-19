import { Component, OnInit } from '@angular/core';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';

@Component({
  selector: 'app-mapped-product',
  templateUrl: './mapped-product.component.html',
  styleUrls: ['./mapped-product.component.scss']
})
export class MappedProductComponent implements OnInit {
  customerList:any
  submitted=false
constructor(private masterService:CustomerMasterServiceService,){}
ngOnInit(): void {
  this.APIbinding()
}

APIbinding(){
  this.masterService.getAllCustomerMaster().subscribe((res:any)=>{
    this.customerList= res.data
    
    })
}
}
