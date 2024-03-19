import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { data } from 'jquery';
import { environment } from 'src/environments/environment';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private setMenu = new BehaviorSubject<string>("");
  menu = this.setMenu.asObservable()

  constructor(private http: HttpClient) { }
  setMenuItem(menu: string): void {
    this.setMenu.next(menu);
  }
  // Method to get the menu, whether it is set or not
  getMenu(): string {
    return this.setMenu.value;
  }
  getfackData() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  upload_file(fileInput: any) {
    let url = `${environment.baseWebApiUrl}files?api-version=v1`
    var formdata = new FormData();
    formdata.append("Name", "test");
    formdata.append("Description", "test");
    formdata.append("FormFile", fileInput.files[0], "/C:/Users/Laxmi Kant/OneDrive - Varuna Integrated Logistics Pvt Ltd/Documents/images/joker images.jpg");
    formdata.append("documentTypeId", "1");
    formdata.append("webPageId", "1");
    formdata.append("Encrypted", "true");
    return this.http.post(url, formdata)
  }
  print_file_to_pdf(elementId: any): Observable<any> {
    const doc = new jsPDF("p", "pt", "a2");
    const source = (<HTMLInputElement>document.getElementById(elementId));
    // doc.setFontSize(10);
    return of(
      doc.html(source, {
        width: 800,
        margin: 15,
        callback: function (pdf) {
          doc.output("dataurlnewwindow"); // preview pdf file when exported
        }
      })
    );

    // autotable(doc, {
    //   html: '#content',
    //   useCss: true
    // })
    // (<HTMLInputElement>document.getElementById("viewData_information"));
  }
public downLoadXlsFileLocalsAccJson(releventInfo:any,fileName:any){
  // let fileName = 'countryMaster.xLsx'
  // let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(releventInfo);
  Object.keys(ws).forEach(key => {
    if (ws[key].v === "Action") {
      delete ws[key];
    }
  });
  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
return  XLSX.writeFile(wb, fileName);
}
//name priority
convertCsvToJsonService(data:any){
  let url = environment.baseWebApiUrl + 'varuna/v1/lanepriority/getallexceluploadquery'
  return this.http.post(url, data);
}
}
