import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-menu-access-master',
  templateUrl: './menu-access-master.component.html',
  styleUrls: ['./menu-access-master.component.scss']
})
export class MenuAccessMasterComponent {

  RoleMenuList: any
  submitted = false
  userCode: any
  selectroleDetails: any = undefined
  formMaster!: FormGroup
  json: any = []
  roleMenuDetailById: any = []
  roleIdFor: any
  constructor(private masterservice: CountryMasterService, private fb: FormBuilder,
    private toastrService: ToastrService,
    private cs: CommonServiceService) {
    this.userCode = this.cs.login_User_Code()
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  menuAccessList: any = []
  ngOnInit(): void {
    this.formMaster = this.fb.group({
      roleId: ["", Validators.required],
    })
    this.getDeptList()
  }
  getDeptList() {
    this.masterservice.getAllRolMenuList().subscribe((res: any) => {
      this.RoleMenuList = res.data
      console.log(this.RoleMenuList)
    })
  }
  get fs() {
    return this.formMaster.controls
  }
  onSaveChanges() {
    debugger
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    this.masterservice.insertMenuRole({ "commands": this.jsonParsingCode(this.json) }).subscribe((result) => {
      this.toastrService.success('saved Changes !', 'Success-200 !');
      this.onReset()
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
          });
        }
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
      }
    })
  }

  onReset() {
    this.formMaster.reset()
    this.roleMenuDetailById = []
  }
  bindMenu(ev: any) {
    debugger
    this.selectroleDetails = ev
    this.roleIdFor = ev.roleId
    if (this.selectroleDetails) {
      this.masterservice.getROleMenuDetailById(ev.roleId).subscribe((res: any) => {
        this.roleMenuDetailById = res.data
        console.log(this.roleMenuDetailById)
      })
    }
  }
  allChecker(ev: any) {
    if (ev.length == 0) {
      return false
    }
    else {
      return ev.every((x: any) => x.isActionRight)
    }
  }
  nonechecker(ev: any) {
    return !ev.some((x: any) => x.isActionRight)
  }
  someCheker(ev: any) {
    if (ev.every((x: any) => x.isActionRight) == true) {
      !ev.some((x: any) => x.isActionRight)
    } else {
      return ev.some((x: any) => x.isActionRight)
    }
  }
  menuHandler(ev: any, index: any) {
    debugger
    if (this.json.map((x: any) => x.webPageId == ev.webPageId)[0]) return
    this.json.push({
      "roleId": this.roleIdFor,
      "webPageId": ev.webPageId,
      "isActive": true,
      "menuId": ev.menuId,
      "createdBy": this.userCode,
      "roleMenuActions": []
    })
    // console.log(this.json)
  }
  singleSetBoo(jsonD: any, data: any, indexI: any, indexJ: any) {
    debugger
    let checkindex = this.json.find((x: { webPageId: any; roleMenuActions: any[] }) => x.webPageId == jsonD.webPageId);
    if (checkindex === undefined) {
      // Item with menuId doesn't exist, push a new object
      this.json.push({
        "roleId": 1,
        "webPageId": jsonD.webPageId,
        "isActive": true,
        "menuId": 5,
        "createdBy": "00001581",
        "roleMenuActions": [{
          "subWebPageId": jsonD.subWebPageId,
          "isAllowed": data
        }]
      });
    } else {
      // Item with menuId exists, check if actionId exists
      let existingAction = checkindex.roleMenuActions.find((action: { subWebPageId: any; }) => action.subWebPageId === jsonD.subWebPageId);
      if (existingAction) {
        // actionId exists, update the existing object
        existingAction.isAllowed = data;
      } else {
        // actionId doesn't exist, push a new object into roleMenuActions array
        checkindex.roleMenuActions.push({
          "subWebPageId": jsonD.subWebPageId,
          "isAllowed": data
        });
      }
    }
    console.warn(this.json)
  }
  // allAllowedHandler(item: any, data:any,index:any) {
  //   // Check if item has subMenuNewEntities and data is true
  //   if (item.subMenuNewEntities && data) {
  //     // Create roleMenuActions array based on subMenuNewEntities
  //     const roleMenuActions = item.subMenuNewEntities.map((subMenu: { subWebPageId: any; }) => ({
  //       "subWebPageId": subMenu.subWebPageId,
  //       "isAllowed": true  // Assuming you want to set isAllowed to true when data is true
  //     }));

  //     // Add or update roleMenuActions in the item
  //     let existingItem = this.json.find((x: { menuId: any; }) => x.menuId === item.menuId);
  //     if (!existingItem) {
  //       // Item doesn't exist, push a new object
  //       this.json.push({
  //         ...item,
  //         "roleMenuActions": roleMenuActions
  //       });
  //     } else {
  //       // Item exists, update roleMenuActions
  //       existingItem.roleMenuActions = roleMenuActions;
  //     }
  //   }
  //   this.roleMenuDetailById[index]['subMenuNewEntities'].forEach((element:any) => {
  //     element.isActionRight=data
  //   });
  //   console.log(this.json)
  // }
  allAllowedHandler(item: any, data: any, indexI: any,indexJ:any) {
    debugger;
    // Check if menuId already exists in this.json
    if (this.json.map((x: any) => x.webPageId == item.webPageId)[0] == undefined || this.json.map((x: any) => x.webPageId == item.webPageId)[0] == false) {
      this.json.push({
        "roleId": this.roleIdFor,
        "webPageId": item.webPageId,
        "isActive": true,
        "moduleId": item.moduleId,
        "createdBy": this.userCode,
        "roleMenuActions": []
      })
    }
    if (item.subMenuNewEntities && data) {
      // Create roleMenuActions array based on subMenuNewEntities
      const roleMenuActions = item.subMenuNewEntities.map((subMenu: { subWebPageId: any; }) => ({
        "subWebPageId": subMenu.subWebPageId,
        "isAllowed": true
      }));

      // Add or update roleMenuActions in the item
      let existingItem = this.json.find((x: { webPageId: any; }) => x.webPageId === item.webPageId);
      if (existingItem) {
        // Item exists, update roleMenuActions
        existingItem.roleMenuActions = roleMenuActions;
      }
    } else {
      const roleMenuActions = item.subMenuNewEntities.map((subMenu: { subWebPageId: any; }) => ({
        "subWebPageId": subMenu.subWebPageId,
        "isAllowed": false
      }));
      // Add or update roleMenuActions in the item
      let existingItem = this.json.find((x: { webPageId: any; }) => x.webPageId === item.webPageId);
      if (existingItem) {
        // Item exists, update roleMenuActions
        existingItem.roleMenuActions = roleMenuActions;
      }
    }
    // Set isActionRight for each element in subMenuNewEntities
    this.roleMenuDetailById[indexJ]['childMenus'][indexI]['subMenuNewEntities'].forEach((element: any) => {
      element.isActionRight = data;
    });
    console.log(this.json);
  }
  jsonParsingCode(originalJson: any) {
    const filteredJson = originalJson.filter((obj: { roleMenuActions: string | any[]; }) => obj.roleMenuActions.length > 0);
    return filteredJson
  }
  NoneAllowedHandler(item: any, data: any, indexI: any,indexJ:any) {
    // Check if menuId already exists in this.json
    if (this.json.map((x: any) => x.webPageId == item.webPageId)[0] == undefined || this.json.map((x: any) => x.webPageId == item.webPageId)[0] == false) {
      this.json.push({
        "roleId": this.roleIdFor,
        "webPageId": item.webPageId,
        "isActive": true,
        "menuId": item.menuId,
        "createdBy": this.userCode,
        "roleMenuActions": []
      })
    }
    if (item.subMenuNewEntities && data) {
      // Create roleMenuActions array based on subMenuNewEntities
      const roleMenuActions = item.subMenuNewEntities.map((subMenu: { subWebPageId: any; }) => ({
        "subWebPageId": subMenu.subWebPageId,
        "isAllowed": false
      }));

      // Add or update roleMenuActions in the item
      let existingItem = this.json.find((x: { webPageId: any; }) => x.webPageId === item.webPageId);
      if (existingItem) {
        // Item exists, update roleMenuActions
        existingItem.roleMenuActions = roleMenuActions;
      }
    } else {
      const roleMenuActions = item.subMenuNewEntities.map((subMenu: { subWebPageId: any; }) => ({
        "subWebPageId": subMenu.subWebPageId,
        "isAllowed": true
      }));
      // Add or update roleMenuActions in the item
      let existingItem = this.json.find((x: { webPageId: any; }) => x.webPageId === item.webPageId);
      if (existingItem) {
        // Item exists, update roleMenuActions
        existingItem.roleMenuActions = roleMenuActions;
      }
    }
    // Set isActionRight for each element in subMenuNewEntities
    this.roleMenuDetailById[indexJ]['childMenus'][indexI]['subMenuNewEntities'].forEach((element: any) => {
      element.isActionRight = !data;
    });
    console.log(this.json);
  }
}
