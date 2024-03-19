import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { roleUserMapping, roleUserMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-role-user-mapping',
  templateUrl: './new-role-user-mapping.component.html',
  styleUrls: ['./new-role-user-mapping.component.scss']
})
export class NewRoleUserMappingComponent {

  constructor(private formbuilder: FormBuilder,
    private masterservice: CountryMasterService,
    private toastrService: ToastrService,
    private routes: Router, private cs: CommonServiceService,//for id
    private router: ActivatedRoute) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  formRoleUserMapping!: FormGroup;
  submitted!: true
  filteredUsers: any = []
  roleMasterList: any = []
  roleUserMappingDetailsById: any = ""
  UserMasterList: any = []
  selectedRole: any = []
  ngOnInit(): void {
    this.formRoleUserMapping = this.formbuilder.group({
      roleId: [''],
      userId: ['', Validators.required],
      defaultRole: ['', [Validators.required]],//, Validators.pattern('^(?! )[0-9]{2,}(?: [s0-9]+)*$')
      isActive: [true]
    })
    this.getRoleMasterList()
    this.getUserMaster()
    this.router.params.subscribe((res) => {

      let roleUserMappingId = res.data
      if (roleUserMappingId) {
        this.masterservice.getRoleUserByUserId(roleUserMappingId).subscribe((res: any) => {
          this.roleUserMappingDetailsById = res.data
          debugger
          this.formRoleUserMapping.controls['userId'].setValue(res.data[0].userId)
          debugger
          res.data.filter((item2: { roleId: any; }) => {
            this.roleMasterList.some((item1: any) => {
              if (item1.roleId === item2.roleId) {
                item1['selected'] = true
                this.selectedRole.push({ ...{ roleId: item2.roleId } })
              }
            });
          });
          this.roleMasterList.filter((x: any) => {
            if (x.roleId == res.data[0].defaultRole) {
              x['default'] = true
              this.formRoleUserMapping.controls['defaultRole'].setValue(res.data[0].defaultRole)
            }
          })
          this.filteredUsers = [...this.roleMasterList]
          console.log(this.filteredUsers)
        })
      }
    })
  }
  get f() {
    return this.formRoleUserMapping.controls;
  }
  getRoleMasterList() {
    this.masterservice.getAllRoleMasterList().subscribe((res: any) => {
      this.roleMasterList = res.data
    })
  }
  getUserMaster() {
    this.masterservice.getAllUserMasterList().subscribe((res: any) => {
      this.UserMasterList = res.data
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.formRoleUserMapping.invalid) {
      return
    }
    var roleUserMappingJson = new roleUserMapping
    roleUserMappingJson = this.formRoleUserMapping.value
    roleUserMappingJson['roles'] = this.selectedRole
    if (this.roleUserMappingDetailsById.mappingId == undefined) { roleUserMappingJson.createdBy = +this.UserId }
    else { roleUserMappingJson.updatedBy = +this.UserId; roleUserMappingJson.mappingId = this.roleUserMappingDetailsById.mappingId }
    console.log(roleUserMappingJson)
    this.masterservice.createRoleUserMapping(roleUserMappingJson).subscribe((result) => {
      this.toastrService.success('Changes Saved succesfully !', 'Success-200 !');
      this.routes.navigate(['master/role-user-mapping']);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formRoleUserMapping.get(err.error.Errors[prop]?.PropertyName);
            if (formControl) {
              formControl.setErrors({
                serverError: err.error.Errors[prop]?.ErrorMessage
              });
            }
          });
        }
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
      }
    })
    // if (this.roleUserMappingDetailsById == "") {


    // } else {
    //   this.masterservice.createRoleUserMapping(roleUserMappingJson).subscribe((result) => {
    //     this.toastrService.success('succesfully Updated !', 'Success-200 !');
    //     this.routes.navigate(['master/role-user-mapping']);
    //   }, err => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status === 422) {
    //         debugger

    //         Object.keys(err.error.Errors).forEach((prop: any) => {
    //           const formControl = this.formRoleUserMapping.get(err.error.Errors[prop]?.PropertyName);
    //           //wrong key comes 
    //           if (formControl) {
    //             // activate the error message
    //             formControl.setErrors({
    //               serverError: err.error.Errors[prop]?.ErrorMessage
    //             });
    //           }
    //         });

    //       }
    //       this.toastrService.error('some thing went wrong', 'Error !');
    //     }
    //   })
    // }
  }
  filter(data: any) {
    this.filteredUsers = [...this.roleMasterList.filter((user: any) => user.roleName.includes(data.target.value))];
    console.log(this.filteredUsers)
  }
  setupDefult(ev: any, boo: Boolean) {
    if (boo) {
      this.formRoleUserMapping.controls['defaultRole'].setValue(ev.roleId)
      const index = this.filteredUsers.findIndex((item: { roleName: any; }) => {
        return JSON.stringify(item.roleName) === JSON.stringify(ev.roleName);
      });
      this.filteredUsers[index]['default'] = true
    }
    else {
      this.formRoleUserMapping.controls['defaultRole'].setValue('')
      const index = this.filteredUsers.findIndex((item: { roleName: any; }) => {
        return JSON.stringify(item.roleName) === JSON.stringify(ev.roleName);
      });
      this.filteredUsers[index]['default'] = false
    }

  }
  takeRoleValue(data: any, index: any) {
    debugger
    const existingIndex = this.selectedRole.findIndex((x: any) => x.roleId === data.roleId);
    if (data.selected && data.default) {
      this.formRoleUserMapping.controls['defaultRole'].setValue('')
    }
    if (existingIndex !== -1) {
      this.selectedRole.splice(existingIndex, 1);
      this.filteredUsers[index]['selected'] = false
    } else {
      this.selectedRole.push({ roleId: data.roleId });
      this.filteredUsers[index]['selected'] = true
    }
    console.log('Role =>', this.selectedRole);
  }

}