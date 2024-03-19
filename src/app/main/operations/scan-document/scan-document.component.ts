import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { OperationsService } from "src/app/services/master-service/operations.service";

@Component({
  selector: "app-scan-document",
  templateUrl: "./scan-document.component.html",
  styleUrls: ["./scan-document.component.scss"],
})
export class ScanDocumentComponent implements OnInit {
  submitted = false;
  selectuploadCopy: any = undefined;
  userId: any;
  saveedJson:any={
    "documentsData": [
      {
        "docType": 0,
        "docketNo": "",
        "documentNo": "",
        "scanStatus": "",
        "documentName": "",
        "isActive": true,
        "createdBy": this.cs.login_UserId()
      }
    ]
  }
  constructor(
    private fb: FormBuilder,
    private cs: CommonServiceService,
    private toastrService: ToastrService,
    private operationService: OperationsService
  ) {
    this.userId = this.cs.login_UserId();
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.operationService
      .createScanDocument(this.saveedJson)
      .subscribe(
        (res: any) => {
          this.toastrService.success("succesfully Created !", "Success-200 !");
          this.submitted = false;
          this.ngOnInit()
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              debugger;
            }
            this.toastrService.error(
              err.error.Message,
              `Error statu:${err.status}`
            );
          }
        }
      );
  }

  documentList = [
    { id: 1, type: "Billing" },
    { id: 2, type: "POD" },
  ];
  onFileChancancelChqque(event: any, a: number,index:any) {
    if (a == 3) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        // this.formMaster.controls["documentName"].setValue(
        //   files.item(0)?.name || ""
        // );
        this.saveedJson.documentsData[index]['documentName']=files.item(0)?.name || ""
        this.selectuploadCopy = files.item(0)?.name || "";
      } else {
        // this.formMaster.controls["documentName"].setValue("");
        this.saveedJson.documentsData[index]['documentName']= ""
        this.selectuploadCopy = "";
      }
    }
  }

  fileResetPan(index:any) {
    if (this.selectuploadCopy != "") {
      this.selectuploadCopy = undefined;
      // this.formMaster.controls["documentName"].reset();
      this.saveedJson.documentsData[index]['documentName']= ""
    }
  }
  addRowForTables(data: any) {
    debugger
    if (data == '' || data == 0) return
    if (data < 60) {
      const newLength = data;
      this.saveedJson.documentsData = Array.from({ length: newLength }, () => ({
        "docType": 0,
        "docketNo": "",
        "documentNo": "",
        "scanStatus": "",
        "documentName": "",
        "isActive": true,
        "createdBy": this.cs.login_UserId()
      }));
      console.log(this.saveedJson);
    }
  }
  setupJson(data:any,index:any,cond:any){
this.saveedJson.documentsData[index][cond]=data
console.log(this.saveedJson);
  }
}
