import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class ModalPopupService {
 

  constructor(private modalService: NgbModal, private http: HttpClient) { }
  openModals(ref: TemplateRef<any>, mode: string, isCentered: boolean) {
    this.modalService.dismissAll();
    this.modalService.open(ref, {
      centered: isCentered,
      size: mode,
      backdrop:'static',
      keyboard: false,
      
    });
  }
  modalOpenSuccess(modalSuccess: any,windowclass: string, isCentered: boolean,animation : boolean,backdrop: boolean,size:string ) {
    this.modalService.open(modalSuccess, {
      centered: isCentered,
      windowClass: windowclass,
      animation: animation,
      backdrop: backdrop,
      size:size
    });
  }
  closeModal() {
    this.modalService.dismissAll();
   
  }
}
