import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';

@Component({
  selector: 'app-un-mapped-product',
  templateUrl: './un-mapped-product.component.html',
  styleUrls: ['./un-mapped-product.component.scss']
})
export class UnMappedProductComponent implements OnInit {
  formMaster!:FormGroup
  submitted=false
  customerList:any
  productList:any=''
  constructor(private formbuilder:FormBuilder,private masterService:CustomerMasterServiceService,){}
  ngOnInit(): void {
    this.formMaster= this.formbuilder.group({
      docketNo:[''],
    })
    this.APIBinding()
  }
  get f(){
    return this.formMaster.controls
  }

  APIBinding(){
this.masterService.getAllCustomerMaster().subscribe((res:any)=>{
this.customerList= res.data

})
this.masterService.getallProductMaster().subscribe((res:any)=>{
this.productList=res.data
console.log(this.productList)
})
  }
}
