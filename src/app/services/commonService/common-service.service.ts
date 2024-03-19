import { Injectable } from '@angular/core';
import { Currentuser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }
  objcurentusr: any
  menuDetails:any
  private modulemasterList: any[] = [];
  login_User_Code() {
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}');
    return this.objcurentusr?.userCode;
  }
  login_UserName() {
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}') as Array<Currentuser>;
    return this.objcurentusr?.userName;
  }
  login_UserId() {
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}') as Array<Currentuser>;
    return this.objcurentusr?.id;
  }
  login_UserBranch() {
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}') as Array<Currentuser>;
    return this.objcurentusr?.branchName;
  }
  login_UserBranchId() {
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}') as Array<Currentuser>;
    return this.objcurentusr?.branchID;;
  }
  login_UserMainBranch() {
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}') as Array<Currentuser>;
    return this.objcurentusr?.mainBrcd;;
  }
  login_UserCurrBranch() {
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}') as Array<Currentuser>;
    return this.objcurentusr?.currBrcd;;
  }
  login_UserCurrBranchId() {
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}') as Array<Currentuser>;
    return this.objcurentusr?.currBrcdId;;
  }
  login_UserModuleByRoleId(){
    this.objcurentusr = JSON.parse(localStorage.getItem('user') || '{}') as Array<Currentuser>;
    return this.objcurentusr?.userRoleDetailsResponses;
  }
  changeBranch(newBranchId: number, branchName: any) {
    if (this.objcurentusr) {
      // Update the branchID in the Currentuser object
      this.objcurentusr.branchID = newBranchId;
      this.objcurentusr.branchName = branchName;
      // Save the updated Currentuser object back to localStorage
      localStorage.setItem('user', JSON.stringify(this.objcurentusr));
      // Now you can access the updated branchID using this.login_UserBranchId()
    }
  }
  changeCurrBranch(currBrcd: string) {
    if (this.objcurentusr) {
      this.objcurentusr.currBrcd = currBrcd;
      localStorage.setItem('user', JSON.stringify(this.objcurentusr));
    }
  }
  AddCurrentCurrBranch(currBrcdId: any) {
    if (this.objcurentusr) {
      this.objcurentusr['currBrcdId'] = currBrcdId;
      localStorage.setItem('user', JSON.stringify(this.objcurentusr));
    }
  }
  /*.......................*/
MenuDetail_By_ModuleId(){
  this.menuDetails = JSON.parse(localStorage.getItem('ModuleAccessedMenu') || '{}') as Array<any>;
  return this.menuDetails;
}
  /*.......................*/
  /* Data table configuration */
  destryTableData() {
    $('.destorydatatable').DataTable().clear().destroy();
  }
  getDTConfig(fileName: any) {
    setTimeout(() => {
      $('#data-table-config').DataTable(
        this.getDataTableConfig(fileName)
      );
      // $('#data-table-config_filter input').attr('placeholder','Search');
      $('#data-table-config_filter input').attr('maxlength', 100);
    }, 100);
  }
  getDataTableConfig(fileName: any): any {
    return {
      pagingType: 'full_numbers',
      pageLength: 25,
      lengthMenu: [25, 50, 75],
      scrollX: true,
      scrollY: 300,
      order: [],
      columnDef: [{ orderable: false, targets: [0] }],
      processing: true,
      //"sDom": 't',
      dom: 'Bfrtip',
      destroy: true,
      // orders: [[1, 'desc']],
      // buttons: [
      //       'csv'
      //   ],
      "language": {
        // "lengthMenu": '_MENU_ bản ghi trên trang',
        search: '<i class="fa fa-search"></i>',
        // "searchPlaceholder":'<i class="fa fa-search"></i>',
        // placeholder:"<i class='icon-search'></i>",
        // search: "_INPUT_",
        searchPlaceholder: 'Search'
      },
      buttons: [
        'pageLength',
        {
          extend: 'csv',
          text: 'Export',
          filename: fileName,
          className: 'btn btn-dark float-right mt-1 mr-5 py-1'
        },
      ],
      //  lengthMenu: [ 10, 20, 50],
      //  lengthChange:true
    };
  }
  //csv_Json_gloabally method 
  csvToJsonForResponse(file: File): Promise<any[]> {
    debugger
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const content = e.target.result;
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        const data = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          const rowData: any = {};
          for (let j = 0; j < headers.length; j++) {
            const key = headers[j]?.trim();
            rowData[key] = values[j]?.trim();
          }
          data.push(rowData);
        }

        // Process the data and resolve the promise
        resolve(this.processCsvData(data));
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsText(file);
    });
  }
  private processCsvData(data: any[]): any[] {
    this.modulemasterList = [];

    for (const row of data) {
      if (Object.values(row).every((value) => !value)) {
        continue;
      }

      if (!this.isValid(row)) {
        row.error = 'Validation failed error occurred!';
      }

      this.modulemasterList.push(row);
    }

    return this.modulemasterList;
  }
  private isValid(row: any): boolean {
    // Implement your custom validation logic here.
    // Return true if the row is valid, false otherwise.

    // Example: Check if 'Clause Name' and 'Clause Description' columns are present
    if (!row['Clause Name'] || !row['Clause Description']) {
      return false;
    }

    // Add more validation rules as needed

    return true;
  }
  /**
   * Get the processed CSV data in JSON format.
   */
  getModulemasterList(): any[] {
    return this.modulemasterList;
  }
  downloadSampleFile(fileName: any, data: any) {
    const dataWithHeaders = [...data];
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
    a.download = fileName;
    a.click();
    /* Clean up the temporary URL */
    return window.URL.revokeObjectURL(url);
  }

}
