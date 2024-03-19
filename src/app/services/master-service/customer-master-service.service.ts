import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customerMaster } from 'src/app/models/master';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerMasterServiceService {
  constructor(private http: HttpClient) { }
  // ...customer--master
  getAllCustomerMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/customer/getallcustomer'
    return this.http.post(url,
      {
        "pageNo": 1,
        "pageSize": 1000
      });
  }
  createCustomerMaster(data: customerMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customer'
    return this.http.post(url, data);
  }
  getCustomerMasterById(custId: customerMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customer/getcustomerbyid'
    return this.http.post(url, { "custId": custId });
  }
  editCustomerMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customer/updatecustomer'
    return this.http.put(url, data)
  }
  disableAndEnableCustomerMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customer/deletecustomer'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  getCustAdflrs(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customer/getcustomeraddressbyfilters'
    return this.http.post(url, data);
  }
  // lane priority _operation
  getAllLanePriorityMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/lanepriority/getalllanespriority'
    return this.http.post(url, {});
  }
  getLanePrioritybyCustomerId(custId: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lanepriority/getlaneprioritybycustomerid'
    return this.http.post(url, { "custId": custId });
  }
  getLanePrioritybyId(priorityId: any, custId: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lanepriority/getlaneprioritybyid'
    return this.http.post(url, { "custId": custId, "priorityId": priorityId });
  }
  createLanePeriority(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lanepriority'
    return this.http.post(url, data)
  }
  UpdatelanePriority(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lanepriority/updatelanepriority'
    return this.http.put(url, data)
  }
  disableAndEnablelanepriority(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lanepriority/deletelanepriority'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  //customer mis
  getAllCustomerMis() {
    let url = environment.baseWebApiUrl + 'varuna/v1/customermis/getallcustomersmis'
    return this.http.post(url, {});
  }
  createCustomerMis(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customermis'
    return this.http.post(url, data);
  }
  getCustomerMisById(misId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customermis/getcustomermisbyid'
    return this.http.post(url, { "misId": misId });
  }
  editCustomerMis(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customermis/updatecustomermis'
    return this.http.put(url, data)
  }
  disableAndEnableCustomerMis(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customermis/deletecustomermis'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  ////  customer contract :6 api
  getallContractsbyCustomer(custId: Number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customercontract/getallcontractsbycustomer';
    return this.http.post(url, {
      custId: custId
    });
  }
  createCustomerContract(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customercontract'
    return this.http.post(url, data);
  }
  getCustomerContractId(contractId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customercontract/getcontractbyid'
    return this.http.post(url, { "contractId": contractId });
  }
  getcontractratebyfilters(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractrate/getcontractratebyfilters'
    return this.http.post(url, data);
  }
  editCustomerContract(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customercontract/updatecontract'
    return this.http.put(url, data)
  }
  disableAndEnableCustomerContract(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customercontract/deletecontract'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  getAllContract() {
    let url = environment.baseWebApiUrl + 'varuna/v1/customercontract/getallcontracts'
    return this.http.post(url, {});
  }
  // customer clause : 5api
  createCClause(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractclausemapping'
    return this.http.post(url, data);
  }
  getallCClause(custId: Number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractclausemapping/getallcontractclausemappings';
    return this.http.post(url, {
      custId: custId
    });
  }
  getCClauseId(contractClauseId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractclausemapping/getcontractclausebyi'
    return this.http.post(url, { "contractClauseId": contractClauseId });
  }
  editCClause(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractclausemapping/updatecontractclausemapping'
    return this.http.put(url, data)
  }
  disableAndEnableCClause(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractclausemapping/deletecontractclausemapping'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  getCCMBCId(contractId: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractclausemapping/getallcontractclausemappingbycontractid'
    return this.http.post(url, { "contractId": contractId });
  }

  // customer contract service selection
  createCCharge(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractcharge'
    return this.http.post(url, data);
  }
  getCChargeById(contractId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractcharge/getcontractchargebyid'
    return this.http.post(url, { "contractId": contractId });
  }
  getallCCharge() {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractcharge/getallcontractcharges';
    return this.http.post(url, {});
  }
  editCCharge(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractcharge/updatecontractcharge'
    return this.http.put(url, data)
  }
  disableAndEnableCCharge(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractcharge/deletecontractcharge'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // customer rate
  getallCRates(custId: Number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractrate/getallcontractrates';
    return this.http.post(url, {
      custId: custId
    });
  }
  createCRate(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractrate'
    return this.http.post(url, data);
  }
  updateCRate(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractrate/updatecontractrate'
    return this.http.put(url, data);
  }
  rateExcelSubmission(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractrate/validatecontractrateexceluploaddata'
    return this.http.post(url, data);
  }
  customerClauseCSV(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/contractclausemapping/validatecontractclausemappingexcel'
    return this.http.post(url, data);
  }
  // customer contract labour master
  filterByCustIdLab(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/labourcharges/getlabourchargesbycustomerid'
    return this.http.post(url, data);
  }
  getLabourChById(laneId: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/labourcharges/getlabourchargesbyid'
    return this.http.post(url, {
      laneId: laneId
    });
  }
  saveLbrcgh(data:any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/labourcharges'
    return this.http.post(url, data);
  }
  LbrRateExcelSubmission(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/labourcharges/validateexceluploadlabourcharges'
    return this.http.post(url, data);
  }
  // rate approval submission _______
  rateApprovalFilter(data:any){
    let url = environment.baseWebApiUrl + 'varuna/v1/contractrate/getcontractrateforapproval'
    return this.http.post(url, data);
  }
  rateApproval(data:any){
    let url = environment.baseWebApiUrl + 'varuna/v1/contractrate/contractappprovedisapprove'
    return this.http.post(url, data);
  }
  labourrateApproval(data:any){
    let url = environment.baseWebApiUrl + 'varuna/v1/labourcharges/labourrateapproval'
    return this.http.post(url, data);
  }
  // product master
  getallProductMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/productmaster/getallproducts'
    return this.http.post(url, {});
  }
    // ...additional
    getAllCustomerIdbyAddress(custId: customerMaster) {
      let url = environment.baseWebApiUrl + 'varuna/v1/customer/getallcustomeridbyaddress'
      return this.http.post(url, { "custId": custId });
    }
}
