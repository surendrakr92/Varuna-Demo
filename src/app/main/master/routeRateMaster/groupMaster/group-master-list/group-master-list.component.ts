import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-group-master-list',
  templateUrl: './group-master-list.component.html',
  styleUrls: ['./group-master-list.component.scss']
})
export class GroupMasterListComponent implements OnInit {
  UserId:any
  groupMasterList:any
  constructor(  private cs:CommonServiceService,//for id
  private toastrService:ToastrService, private countryMaster:CountryMasterService, private router:Router){
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId=this.cs.login_User_Code()//for id
  }

  dtTrigger:Subject<any>=new Subject<any>()

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.ApiBinding()
  }

  
ApiBinding(){
  this.countryMaster.getAllRouteGroupList().subscribe((res:any)=>{
    this.groupMasterList= res.data
    this.dtTrigger.next(null)
    console.log(this.groupMasterList)
  })
}
downloadExcel(tablerefrece:any){
  let fileName='group-master.xLsx'
  let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.groupMasterList);
  Object.keys(ws).forEach(key => {
if (ws[key].v === "Action") {
  delete ws[key];
 }
});
/* generate workbook and add the worksheet */
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
   /* save to file */
XLSX.writeFile(wb, fileName);
}
rediredctionView(groupId:any){
  this.router.navigate(['master/group-master/group-master-view', groupId])
}

redirectionEdit(id:any){
  this.router.navigate(['master/group-master/update-group-master',id])
}


}
