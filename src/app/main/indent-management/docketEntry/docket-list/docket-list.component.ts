import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-docket-list',
  templateUrl: './docket-list.component.html',
  styleUrls: ['./docket-list.component.scss']
})
export class DocketListComponent implements OnInit {
  UserId: any
  indentdocLis: any = []
  finencialListTrue: boolean = false
  nestltList: boolean = false
  constructor(private cs: CommonServiceService,
    private indentS: IndentServiceService,
    public routes: Router) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [10, 20, 40, 80, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getDocketList()
    if (window.location.pathname.includes('finencial-list')) {
      this.finencialListTrue = true
    }else if(window.location.pathname.includes('docket-nestle-list')){
    this.nestltList=true
    }
  }
  getDocketList() {
    this.indentS.getalldocketlist().subscribe((res: any) => {
      this.indentdocLis = res.data
      this.dtTrigger.next(null)
    })
  }
  DriectLink(data: any) {
    debugger
    let json = {
      docketNo: data.docketNo,
      docketId: data.docketId,
      setupJ: this.routes.url.includes('finencial') ? 'finencialEdit' :this.routes.url.includes('docket-nestle-list') ? 'NestleEditt': ''
    }
   if(json.setupJ=='NestleEditt'){
    this.routes.navigate(['indent/docket-nestle-list/docket-update/'], { queryParams: json })
   }else if(json.setupJ=='finencialEdit'){
    this.routes.navigate(['indent/docket-finencial-list/docket-update'], { queryParams: json })
   }else{
    this.routes.navigate(['indent/docket-list/docket-update/'], { queryParams: json })
   }
  }
  downloadExcel(tablerefrece: any) {
    let fileName = 'cngr_cnse.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
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

}

