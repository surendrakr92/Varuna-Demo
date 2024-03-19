import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
@Component({
  selector: 'app-virtual-login',
  templateUrl: './virtual-login.component.html',
  styleUrls: ['./virtual-login.component.scss']
})
export class VirtualLoginComponent implements OnInit {
  branchMasterList: any = []
  changesBranchId: any = null
  currBranch: any;
  mainBranch: any;
  constructor(private masterservice: CountryMasterService,
    private tostrs: ToastrService,
    private routes: Router,
    private cs: CommonServiceService) { 
      this.currBranch=this.cs.login_UserCurrBranch()
      this.mainBranch=this.cs.login_UserMainBranch()
    }
  ngOnInit(): void {
    this.masterservice.getVirtualBranchList(this.currBranch,this.mainBranch).subscribe((res: any) => {
      this.branchMasterList = res.data;
    });
  }
  changeBranchs() {
    debugger
    if (this.changesBranchId) {
      this.cs.changeCurrBranch(this.changesBranchId.branchCode);
      this.cs.AddCurrentCurrBranch(this.changesBranchId.branchId);
      this.routes.navigate(['/dashboard'])
      this.tostrs.success('branch changes succesfully')
      this.routes.navigate(['/dashboard'])
      setTimeout(() => {
        window.location.reload()
      }, 100);
    }
  }
  branchLocationDtls(data: any) {
    debugger
    this.changesBranchId = data
  }
}
