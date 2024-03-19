import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-viewreceiptitemlist',
  templateUrl: './viewreceiptitemlist.component.html',
  styleUrls: ['./viewreceiptitemlist.component.scss']
})
export class ViewreceiptitemlistComponent {

  receiptList: Array<any> = [];
  receiptItemList: Array<any> = [];
  UserId: any
  flag = 0;
  branchid: any
  submitted!: true
  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};

  constructor(private itemService: StationaryService, private routes: Router, private modalService: ModalPopupService,
    private cs: CommonServiceService,//for id
    private toastrService: ToastrService, private router: ActivatedRoute) {
    this.UserId = this.cs.login_User_Code()//for id
    this.dtOptions = {
      lengthMenu: [5, 10, 20, 50, 100],
    }
    this.branchid = this.cs.login_UserCurrBranchId()
    //this.branchid = this.cs.login_UserBranchId()
  }
  ngOnInit(): void {
    this.getItemList(this.branchid);    
  }
  
  getItemList(receiptId: number) {
    this.itemService.getAllReceiptMaster(receiptId).subscribe((res: any) => {
      this.receiptList = res.data;
      this.dtTrigger.next(null)
    })
  }


  
  rediredctionView() {
    this.routes.navigate(['stationery/receipt-master/viewreceiptitem-master', this.branchid])    
  }
  modelOpen(model: any) {
    this.modalService.modalOpenSuccess(model, popupclass.info, true, false, false, popupclass.medium);
  }

}
