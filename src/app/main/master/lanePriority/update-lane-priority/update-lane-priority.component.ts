import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";

import { SharedService } from "src/app/services/shared.service";
import * as XLSX from "xlsx";
type AOA = any[][];
@Component({
  selector: "app-update-lane-priority",
  templateUrl: "./update-lane-priority.component.html",
  styleUrls: ["./update-lane-priority.component.scss"],
})
export class UpdateLanePriorityComponent implements OnInit {
  formMaster: any = FormGroup;
  submitted = false;
  customermasterList: any;
  laneCategoryList: any;
  patchedCustIdDetails: any;
  UserId: any = "";
  lanePeriorityListByCustId: any = [];
  VloadAbilityList: any = [];
  xlsUploadedJson: any = [];
  //
  modulemasterList: any;
  constructor(
    private formbiuilder: FormBuilder,
    private modalService: ModalPopupService,
    private customerService: CustomerMasterServiceService,
    private masterservice: CountryMasterService,
    private toastrService: ToastrService,
    private route: Router,
    public routess: ActivatedRoute,
    private cs: CommonServiceService,
    private shrServ: SharedService
  ) {
    this.UserId = this.cs.login_User_Code(); //for id
  }
  ngOnInit(): void {
    this.getAllCustomermasterList();
    this.dropDwonGeneralList();
    this.formMaster = this.formbiuilder.group({
      branchName: [0],
      laneCategory: ["", Validators.required],
      isActive: [true],
    });
    this.routess.queryParams.subscribe((params) => {
      this.patchedCustIdDetails = params;
      debugger;
      if (this.patchedCustIdDetails.custId) {
        this.customerService
          .getLanePrioritybyId(
            this.patchedCustIdDetails?.priorityId
              ? this.patchedCustIdDetails?.priorityId
              : 0,
            this.patchedCustIdDetails.custId
          )
          .subscribe((res: any) => {
            this.lanePeriorityListByCustId = res.data.lanePriorityDtl;
          });
      }
    });
  }
  get f() {
    return this.formMaster.controls;
  }
  getAllCustomermasterList() {
    this.customerService.getAllCustomerMaster().subscribe((res: any) => {
      this.customermasterList = res.data;
    });
  }
  dropDwonGeneralList() {
    this.masterservice
      .getGeneralMasterByCodeTyoeId(96)
      .subscribe((res: any) => {
        this.laneCategoryList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(62)
      .subscribe((res: any) => {
        this.VloadAbilityList = res.data;
      });
  }
  laneCategory(index: any, value: any) {
    debugger;
    this.lanePeriorityListByCustId[index]["categoryGeneralId"] = value;
  }
  VloadAbili(index: any, value: any) {
    debugger;
    this.lanePeriorityListByCustId[index]["loadabilityId"] = value;
  }
  numberData(index: any, value: any) {
    debugger;
    this.lanePeriorityListByCustId[index]["monthTarget"] = +(value);
  }
  // data: any =  ['Sr no.','From City','To City','Vehicle Type','Loadability','Lane Category','Monthly Target'];
  data: AOA = [
    [
      "Sr No.",
      "From City",
      "To City",
      "Vehicle Type",
      "Loadability",
      "Lane Category",
      "Monthly Target",
    ],
  ];
  wopts: XLSX.WritingOptions = { bookType: "csv", type: "array" };
  fileName: string = "LanePeriority.csv";
  export(): void {
    debugger
    // /* generate worksheet */
    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // /* save to file */
    // XLSX.writeFile(wb, this.fileName);
    //above not working as mentioned
    const dataWithHeaders = [...this.data];
    /* Join the header row with commas to create a CSV header line */
    const headerLine = dataWithHeaders[0].join(",");
      /* Create an array for CSV content including the header line */
    const csvContent = [headerLine];
      /* Append the rest of the data to the CSV content */
    for (let i = 1; i < dataWithHeaders.length; i++) {
      csvContent.push(dataWithHeaders[i].join(","));
    }
      /* Join the CSV lines with line breaks to create a valid CSV content */
    const csvData = csvContent.join("\n");
      /* Generate a Blob containing the CSV data */
    const blob = new Blob([csvData], { type: "text/csv" });
      /* Create a temporary URL for the Blob and trigger the download */
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = this.fileName;
    a.click();
      /* Clean up the temporary URL */
    window.URL.revokeObjectURL(url);
    
  }
  onFileChange(event: any) {
    debugger;
    const file = event.target.files[0];
    if (file) {
      this.readExcelFile(file);
    }
  }
  readExcelFile(file: File) {
    debugger;
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // Validate and process the data
      this.processExcelData(data);
    };
    fileReader.readAsArrayBuffer(file);
  }
  processExcelData(data: any[]) {
    debugger;
    this.lanePeriorityListByCustId = data.map((item, index) => {
      const errors = this.validateData(item); // Implement your validation logic

      if (errors.length > 0) {
        // Set error messages
        item.error = errors.join(", ");
      } else {
        item.error = ""; // No errors
      }
      return item;
    });
  }

  validateData(item: any): string[] {
    debugger;
    // Implement your validation logic here and return an array of error messages
    const errors: string[] = [];
    // Example validation:
    if (!item.fromCity) {
      errors.push("From City is required.");
    } else if (!item.toCity) {
      errors.push("TO City is required.");
    } else if (!item.monthTarget) {
      errors.push("Monthly Target is required.");
    } else if (!item.laneCategory) {
      errors.push("Lane Category is required.");
    }
    // Add more validation rules as needed

    return errors;
  }
  importFile() {
    debugger
    if(this.lanePeriorityListByCustId.length>=0){
      this.toastrService.warning("should be one list neededd atleat", "Success-302 !");
       return
    }
    let fileName = 'ModifiedLanePriorityCategory.csv';
    // Convert the data to a CSV format string with custom headers
    const csvData = this.convertJsonToCsv(this.lanePeriorityListByCustId);
    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });
    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
  convertJsonToCsv(jsonData: any[]) {
    const separator = ',';
    const customHeaders = [
      'Sr. No.',
      'From City',
      'To City',
      'Vehicle Type',
      'Loadability',
      'Lane Category',
      'Monthly Target'
    ];

    // Create the header row
    const headerRow = customHeaders.join(separator);
    // Create an array of CSV rows
    debugger
    const csvRows = jsonData.map((data, index) => {
      return customHeaders.map(header => {
        let field;
        if (header === 'Sr. No.') {
          field = index + 1;
        } else if (header === 'To City') {
          field = data.toCity;
        } else if (header === 'Vehicle Type') {
          field = data.vehicletype;
        } else if (header === 'Loadability') {
          field = data.loadability;//data.loadability
        } else if (header === 'Lane Category') {
          field = data.categoryGeneral;
        } else if (header === 'Monthly Target') {
          field = data.monthTarget;
        }else if (header === 'From City') {
          field = data.fromCity;
        }
        else {
          field = data[header];
        }
        if (field !== null && field !== undefined) {
          // Escape double quotes
          field = field.toString().replace(/"/g, '""');
          // Enclose fields with double quotes if they contain special characters
          if (field.search(/("|,|\n)/g) >= 0) {
            field = `"${field}"`;
          }
        }

        return field;
      }).join(separator);
    });

    // Combine the header row and CSV rows into a single string
    return [headerRow, ...csvRows].join('\n');
  }
  OnSubmit() {
    let json = {
      priorityId: this.patchedCustIdDetails?.priorityId
        ? this.patchedCustIdDetails?.priorityId
        : 0,
      custId: this.patchedCustIdDetails.custId,
      fromDate: this.patchedCustIdDetails?.fromDate,
      toDate: this.patchedCustIdDetails?.toDate,
      isActive: this.patchedCustIdDetails?.isActive,
      updatedBy: this.patchedCustIdDetails?.priorityId ? this.UserId : null,
      createdBy: this.patchedCustIdDetails?.priorityId ? null : this.UserId,
      lanePriorityDtllist: this.lanePeriorityListByCustId,
    };
    // if(this.lanePeriorityListByCustId.length>0){
    //    this.toastrService.warning("should be one list neededd lane prioriy list", "Success-200 !");
    //    return
    // }
    let sendJson = { custId: this.patchedCustIdDetails.custId };
    if (this.patchedCustIdDetails?.priorityId) {
      this.customerService.UpdatelanePriority(json).subscribe(
        (res) => {
          this.toastrService.success("succesfully Updated !", "Success-200 !");
          this.route.navigate(["master/lane-priority-list"], {
            queryParams: sendJson,
          });
        },
        (err) => {
          this.toastrService.error(
            err.error.Message,
            `Error statu:${err.status}`
          );
        }
      );
    } else {
      this.customerService.createLanePeriority(json).subscribe(
        (res) => {
          this.toastrService.success("succesfully Created !", "Success-200 !");
          this.route.navigate(["master/lane-priority-list"], {
            queryParams: sendJson,
          });
        },
        (err) => {
          this.toastrService.error(
            err.error.Message,
            `Error statu:${err.status}`
          );
        }
      );
    }
  }
  modelopen(model: any) {
    this.cs.destryTableData();

    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  onFileChangeCsv(event: any) {
    debugger;
    const file = event.target.files[0];
    if (file) {
      this.readCsvFile(file);
    }
  }
  readCsvFile(file: File) {
    debugger
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      debugger
      const content = e.target.result;
      const lines = content.split("\n");
      // Extract headers (first line)
      const headers = lines[0].split(",");
      // Initialize an array to hold the data
      const data = [];
      // Iterate over lines starting from the second line (data rows)
      for (let i = 1; i < lines.length; i++) {
        debugger
        const values = lines[i].split(",");
        // Create an object with keys from headers and corresponding values
        const rowData: any = {};
        for (let j = 0; j < headers.length; j++) {
          debugger
          const key = headers[j]?.trim(); // Remove leading/trailing spaces
          rowData[key] = values[j]?.trim(); // Remove leading/trailing spaces
        }
        // Push the row data into the data array
        data.push(rowData);
      }
      // Now, 'data' contains the parsed CSV data
      this.processCsvData(data);
    };
    fileReader.readAsText(file);
  }
  processCsvData(data: any[]) {
    debugger
    // Clear previous data if needed
    this.modulemasterList = [];
    // Validate and process each row of data
    for (const row of data) {
      // Skip rows that are entirely empty
      if (Object.values(row).every(value => !value)) {
        continue;
      }
      // Implement your data validation logic here

      // Add an "error" key if validation fails
      if (!this.isValid(row)) {
        row.error = 'Validation failed'; // You can provide a more descriptive error message
      }
      // Add the row to the table data
      this.modulemasterList.push(row);
      console.log('test data', this.modulemasterList)
    }
    let json = {
      "lanePriorityDtlExcel": this.parseJsonForXLs(this.modulemasterList)
    }
    this.shrServ.convertCsvToJsonService(json).subscribe((res: any) => {
      if (res.succeeded) {
        console.log(res)
        this.xlsUploadedJson = res.data
        console.log(this.xlsUploadedJson)
      }
    })
  }
  isValid(row: any): boolean {
    debugger;
    // Implement your validation logic here
    // Return true if the row is valid, false otherwise
    // For example, check if required columns are present and have valid values
    // Example validation: Check if 'From City' and 'To City' columns are present
    if (!row["From City"] || !row["To City"]) {
      return false;
    }
    // Add more validation rules as needed
    return true;
  }
  saveValidDataToTable() {
    const hasErrorMessage = this.xlsUploadedJson.every((item: { errorMessage: string | string[]; }) => item.errorMessage == "");
    if (!hasErrorMessage) {
      this.toastrService.error("Resolve Error Occured !", "Error-302 !");
      return
    }
      this.xlsUploadedJson?.forEach((element:any) => {
      element['priorityId']=+(this.patchedCustIdDetails.priorityId)
    });
    this.lanePeriorityListByCustId = this.xlsUploadedJson
    this.modalService.closeModal()
    console.log('data', this.lanePeriorityListByCustId)
  }
  parseJsonForXLs(inputJson: any) {
    return inputJson.map((item: { [x: string]: string; }, index: any) => {
      return {
        priorityId: index,
        fromCity: item["From City"],
        toCity: item["To City"],
        vehicletype: item["Vehicle Type"],
        categoryGeneral: item["Lane Category"],
        Loadability: item["Loadability"],
        monthTarget: parseInt(item["Monthly Target"]),
        fromCityId: 0, // You can set the appropriate values here
        toCityId: 0,   // You can set the appropriate values here
        vehicleTypeId: 0, // You can set the appropriate values here
        categoryGeneralId: 0, // You can set the appropriate values here
        loadabilityId: 0, // You can set the appropriate values here
        errorMessage: ""
      };
    });
  }
}
