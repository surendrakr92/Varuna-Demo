import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import {
  CustomerContract,
  MenuAccessMaster, ModuleMaster, RoleMaster, addressMaster, branchLevel, branchMaster, branchUserMapping, cityMaster,
  clusterMapping,
  clusterMaster, cngr_cnse_Master, codeTypeMaster, companyMaster, customerGroup, departmentMaster,
  divisionMaster, driverMaster, finYear, generalMaster, laneMaster, menuMaster, ownerMaster, pinCodeMaster,
  prqRequest,
  rateMaster,
  roleUserMapping,
  routeMaster,
  subCityMaster,
  subClusterMaster, tdsServiceMaster, tdsrateMaster, userMaster, vehicleMaster, zoneMaster
} from 'src/app/models/master';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from '../commonService/common-service.service';
import { Subject, map } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CountryMasterService {
  private menuUpdateSource = new Subject<void>();

  menuUpdated$ = this.menuUpdateSource.asObservable();
  constructor(private http: HttpClient,
    private cs: CommonServiceService) { }
  getAllCountryList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/country/getcountrys'
    return this.http.post(url, {});
  }
  getAllCountryListDetailsById(countryId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/country/getcountrysbyid'
    return this.http.post(url, { "countryId": countryId });
  }
  createCountry(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/country'
    return this.http.post(url, data);
  }
  editCountryMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/country/updatecountry'
    return this.http.put(url, data)
  }
  disableAndEnableCountry(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/country/deletecountry'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // ......................................state..................
  getAllStateMasterList(countryId?: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state/getallstates'
    return this.http.post(url, { countryId: countryId });
  }
  getAllStateListDetailsById(stateId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state/getstatebyid'
    return this.http.post(url, { "stateId": stateId });
  }
  getAllCityByStateId(stateId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/city/getcitybystateid'
    return this.http.post(url, { "stateId": stateId });
  }
  createState(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state'
    return this.http.post(url, data);
  }
  editStateMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state/updatestate'
    return this.http.put(url, data)
  }
  disableAndEnableState(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state/deletestate'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // ......................................City..................
  getAllCityMasterList(stateId?: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/city/getallcitys'
    return this.http.post(url, { stateId: stateId });
  }
  createCity(data: cityMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/city'
    return this.http.post(url, data);
  }
  editCityMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/city/updatecity'
    return this.http.put(url, data)
  }
  getCityListDetailsById(cityId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/city/getcitybyid'
    return this.http.post(url, { "cityId": cityId });
  }
  disableAndEnableCity(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/city/deletecity'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // ......................................sub City master..................
  getAllSubCityMasterList(data: any) {
    // let url = environment.baseWebApiUrl + 'varuna/v1/subcity/getallsubcitys'
    // return this.http.post(url, { subCityId: subCityId });
    let url = environment.baseWebApiUrl + 'varuna/v1/subcity/getallsubcitys'
    return this.http.get(url + `?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&subCityName=${data.searchD}`);
  }
  createSubCityMaster(data: subCityMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcity'
    return this.http.post(url, data);
  }
  editSubCityMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcity/updatesubcity'
    return this.http.put(url, data)
  }
  getSubCityMasterListDetailsById(subCityId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcity/getsubcitysbyid?subCityId=' + subCityId
    return this.http.get(url);
  }
  disableAndEnableSubCityMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcity/deletesubcity'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // ......................................pin code..................
  getAllPincodeMasterListTest(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/pincode/getallpincodes'
    return this.http.get(url + `?cityId=${data.cityId}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&pincode=${data.searchD}`);
  }
  getAllPincodeMasterList(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/pincode/getallpincodes'
    return this.http.get(url + `?cityId=0&pageNumber=1&pageSize=4000&pincode`);
  }
  createPincode(data: pinCodeMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/pincode'
    return this.http.post(url, data);
  }
  editPincodeMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/pincode/updtepincode'
    return this.http.put(url, data)
  }
  getPincodeListDetailsById(pincodeId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/pincode/getpincodebyid'
    return this.http.post(url, { "pincodeId": pincodeId });
  }
  disableAndEnablePincode(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/pincode/deletepincode'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // ......................................companyMaster.................

  getAllCompanyMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/company/getcompanys'
    return this.http.post(url, {});
  }
  createCompanymaster(data: companyMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/company'
    return this.http.post(url, data);
  }
  getCompanyDetailsById(companyId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/company/getcompanysbyid'
    return this.http.post(url, { "companyId": companyId });
  }
  editCompanyMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/company/updatecompany'
    return this.http.put(url, data)
  }
  disableAndEnableCompanyMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/company/deletecompany'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // ......................................division.................
  getAllDivisionList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/division/getdivisions'
    return this.http.post(url, {});
  }
  createDivisionmaster(data: divisionMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/division'
    return this.http.post(url, data);
  }
  getDivisionDetailsById(divisionId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/division/getdivisionsbyid'
    return this.http.post(url, { "divisionId": divisionId });
  }
  editDivisionMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/division/updatedivision'
    return this.http.put(url, data)
  }
  disableAndEnableDivisionMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/division/deletedivision'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }

  // ......................................zone.................

  getAllZoneList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/zone/getallzones'
    return this.http.post(url, {});
  }
  createZonemaster(data: zoneMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/zone'
    return this.http.post(url, data);
  }
  getZoneDetailsById(zoneId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/zone/getzonebyid'
    return this.http.post(url, { "zoneId": zoneId });
  }
  editZoneMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/zone/updatezone'
    return this.http.put(url, data)
  }
  disableAndEnableZoneMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/zone/deletezone'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }

  // ......................................BranchLevel.................
  getAllBranchLevelList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchlevel/getallbranchlevels'
    return this.http.post(url, {});
  }
  createBrancheLevel(data: branchLevel) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchlevel'
    return this.http.post(url, data);
  }
  getBranchLevelDetailsById(branchId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchlevel/getbranchlevelbyid'
    return this.http.post(url, { "branchLevelId": branchId });
  }
  editBranchLevel(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchlevel/updatebranchlevel'
    return this.http.put(url, data)
  }
  disableAndEnableBranchLevel(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchlevel/deletebranchlevel'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // ......................................Branch.................
  getAllBranchMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/branch/getallbranch'
    return this.http.post(url, {});
  }
  createBranchemaster(data: branchMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branch'
    return this.http.post(url, data);
  }
  getBranchMasterDetailsById(branchId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branch/getbranchbyid'
    return this.http.post(url, { "branchId": branchId });
  }
  editBranchMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branch/updatebranch'
    return this.http.put(url, data)
  }
  disableAndEnableBranchMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branch/deletebranch'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  getVirtualBranchList(curBrcd: string, mainBrcd: string) {
    let url = environment.baseWebApiUrl + `varuna/v1/workinglocations/getworkinglocation?curBrcd=${curBrcd}&mainBrcd=${mainBrcd}`
    return this.http.get(url);
  }
  // ......................................cluster.................
  getAllClusterMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/cluster/getcluster'
    return this.http.post(url, {});
  }

  createClusterMaster(data: clusterMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/cluster'
    return this.http.post(url, data);
  }
  getClusterMasterDetailsById(clusterId: clusterMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/cluster/getclusterbyid'
    return this.http.post(url, { "clusterId": clusterId });
  }
  editClusterMaster(data: clusterMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/cluster/updatecluster'
    return this.http.put(url, data)
  }
  disableAndEnableClusterMaster(data: clusterMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/cluster/deletecluster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });

  }
  // ......................................Sub cluster.................
  getAllSubClusterMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcluster/getsubclusters'
    return this.http.post(url, {});
  }

  createSubClusterMaster(data: subClusterMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcluster'
    return this.http.post(url, data);
  }
  getSubClusterMasterDetailsById(subclusterId: subClusterMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcluster/getsubclusterbyid'
    return this.http.post(url, { "subclusterId": subclusterId });
  }
  editSubClusterMaster(data: subClusterMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcluster/updatesubcluster'
    return this.http.put(url, data)
  }
  disableAndEnableSubClusterMaster(data: subClusterMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subcluster/deletesubcluster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });

  }

  // ......................................menu Master.................
  getAllMenuMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/menu/getallmenues'
    return this.http.post(url, {});
  }

  createMenuMaster(data: menuMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menu'
    return this.http.post(url, data);
  }
  getMenuMasterDetailsById(webPageId: menuMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menu/getmenubyid'
    return this.http.post(url, { "webPageId": webPageId });
  }
  editMenuMaster(data: menuMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menu/updatemenu'
    return this.http.put(url, data)
  }
  disableAndEnableMenuMaster(data: menuMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menu/deletemenu'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });

  }

  // ......................................Module Master.................
  getAllModuleMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/module/getallmodule'
    return this.http.post(url, {});
  }

  createModuleMaster(data: ModuleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/module'
    return this.http.post(url, data);
  }
  getModuleMasterById(moduleId: ModuleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/module/getmodulebyid'
    return this.http.post(url, { "moduleId": moduleId });
  }
  editModuleMaster(data: ModuleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/module/updatemodule'
    return this.http.put(url, data)
  }
  disableAndEnableModuleMaster(data: ModuleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/module/deletemodule'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // getModulbyMenurights(moduleId: any) {
  //   return this.http.post<ApiResponse>(environment.baseWebApiUrl + 'varuna/v1/module/getmodelbymenuwithrights',
  //     {
  //       "roleId": this.cs.login_UserModuleByRoleId()[0].roleId,
  //       "userId": this.cs.login_UserId(),
  //       "moduleId": moduleId
  //     })
  //     .pipe(
  //       map((response: ApiResponse) => {
  //         const menuData = response.data;
  //         localStorage.setItem('ModuleAccessedMenu', JSON.stringify(menuData));;
  //         return response;
  //       }
  //       ));
  // }
  getModulbyMenurights(moduleId: any) {
    return this.http.post<ApiResponse>(environment.baseWebApiUrl + 'varuna/v1/module/getmodelbymenuwithrights', {
      "roleId": this.cs.login_UserModuleByRoleId()[0].roleId,
      "userId": this.cs.login_UserId(),
      "moduleId": moduleId
    }).pipe(
      map((response: ApiResponse) => {
        const menuData = response.data;
        localStorage.setItem('ModuleAccessedMenu', JSON.stringify(menuData));
        this.menuUpdateSource.next(); // Trigger update here
        return response;
      })
    );
  }
  
  // ......................................Department Master.................
  getAllDepartmentMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/department/getAllDepartment'
    return this.http.post(url, {});
  }

  createDepartmentMaster(data: departmentMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/department'
    return this.http.post(url, data);
  }
  getDepartmentMasterById(deptId: departmentMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/department/getdepartmentbyid'
    return this.http.post(url, { "deptId": deptId });
  }
  editDepartmentMaster(data: departmentMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/department/updatedepartment'
    return this.http.put(url, data)
  }
  disableAndEnableDepartmentMaster(data: departmentMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/department/deletedepartment'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });

  }
  // ......................................role Master.................
  getAllRoleMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/role/getAllRole'
    return this.http.post(url, {});
  }

  createRoleMaster(data: RoleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/role'
    return this.http.post(url, data);
  }
  getRoleMasterById(roleId: RoleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/role/getrolebyid'
    return this.http.post(url, { "roleId": roleId });
  }
  editRoleMaster(data: RoleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/role/updaterole'
    return this.http.put(url, data)
  }
  disableAndEnableRoleMaster(data: RoleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/role/deleterole'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });

  }
  // ......................................menu-accesss Master.................
  getAllMenuAccMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/menuaccess/getallmenuaccess'
    return this.http.post(url, {});
  }

  createMenuAccMaster(data: MenuAccessMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menuaccess'
    return this.http.post(url, data);
  }
  getMenuAccMasterById(accessId: MenuAccessMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menuaccess/getmenuaccessbyid'
    return this.http.post(url, { "accessId": accessId });
  }
  editMenuAccMaster(data: MenuAccessMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menuaccess/updatemenuaccess'
    return this.http.put(url, data)
  }
  disableAndEnableMenuAccMaster(data: MenuAccessMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menuaccess/deletemenuaccess'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });

  }
  // ......................................user Master.................
  getAllUserMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/user/getallusers'
    return this.http.post(url, {});
  }
  createUserMaster(data: userMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/user/createuser'
    return this.http.post(url, data);
  }

  getUserMasterDetailsById(userId: userMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/user/getuserbyid'
    return this.http.post(url, { "userId": userId });
  }

  editUserMaster(data: userMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/user/updateuserbyid'
    return this.http.put(url, data)
  }
  // ......................................cluster mapping.................
  getAllclusterMappingList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/mappingcityclustersubcluster/getallmappingcityclustersubcluster'
    return this.http.post(url, {});
  }

  createclusterMapping(data: clusterMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mappingcityclustersubcluster'
    return this.http.post(url, data);
  }
  getclusterMappingById(clusterMappingId: clusterMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mappingcityclustersubcluster/getmappingcityclustersubclusterbyid'
    return this.http.post(url, { "clusterMappingId": clusterMappingId });
  }
  editclusterMapping(data: clusterMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mappingcityclustersubcluster/updatemappingcityclustersubcluster'
    return this.http.put(url, data)
  }
  disableAndEnableclusterMapping(data: clusterMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mappingcityclustersubcluster/deletemappingcityclustersubcluster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });

  }
  // ......................................role user mapping.................
  getAllRoleUserMappingList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/roleusermapping/getallrollusermapping'
    return this.http.post(url, {});
  }

  createRoleUserMapping(data: roleUserMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/roleusermapping'
    return this.http.post(url, data);
  }
  getRoleUserMappingById(userId: roleUserMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/roleusermapping/getroleuserbyid'
    return this.http.post(url, { "userId": userId });
  }
  getRoleUserByUserId(userId: roleUserMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/roleusermapping/getroleuserbyid'
    return this.http.post(url, { "userId": userId });
  }
  // editRoleUserMapping(data: roleUserMapping) { //closed
  //   let url = environment.baseWebApiUrl + 'varuna/v1/roleusermapping/updateroleusermapping'
  //   return this.http.put(url, data)
  // }
  disableAndEnableRoleUserMapping(data: roleUserMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/roleusermapping/deleteroleusermapping'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });

  }
  //-----------------------branch user mapping------------------
  getAllBranchUserMappingList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchusermapping/getallbranchusermapping'
    return this.http.post(url, {});
  }
  createBranchUserMapping(data: branchUserMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchusermapping'
    return this.http.post(url, data);
  }
  getBranchUserMappingById(branchMappingId: branchUserMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchusermapping/getbranchusaermappingbyid'
    return this.http.post(url, { "branchMappingId": branchMappingId });
  }
  editBranchUserMappingMapping(data: branchUserMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchusermapping/updatebranchusermapping'
    return this.http.put(url, data)
  }
  disableAndEnableBranchUserMapping(data: branchUserMapping) {
    let url = environment.baseWebApiUrl + 'varuna/v1/branchusermapping/deletebranchusermapping'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // ---------------------general master-------------------
  getAllGeneralMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/genralmaster/getallgenralmaster'
    return this.http.post(url, {});
  }
  createGeneralMaster(data: generalMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/genralmaster'
    return this.http.post(url, data);
  }
  getGeneralMasterById(generalId: generalMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/genralmaster/getgenralmasterbyid'
    return this.http.post(url, { "generalId": generalId });
  }

  editGeneralMaster(data: generalMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/genralmaster/updategenralmaster'
    return this.http.put(url, data)
  }
  disableAndEnableGeneralMaster(data: generalMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/genralmaster/deletegenralmaster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }

  // ---------------------general master-------------------
  getGeneralMasterByCodeTyoeId(codeTypeId: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/genralmaster/getcodetypeid'
    return this.http.post(url, { "codeTypeId": codeTypeId });
  }

  // -----------------code type --------------------
  getAllCodeType() {
    let url = environment.baseWebApiUrl + 'varuna/v1/codetype/getallcodetype'
    return this.http.post(url, {});
  }
  createCodeType(data: codeTypeMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/codetype'
    return this.http.post(url, data);
  }
  editcodeTypeMaster(data: codeTypeMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/codetype/updatecodetype'
    return this.http.put(url, data)
  }
  getcodeTypeById(codeTypeId: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/codetype/getcodetypebyid'
    return this.http.post(url, { "codeTypeId": codeTypeId });
  }
  disableAndEnableCodeTypeMaster(data: codeTypeMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/codetype/deletecodetype'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // -----------------financial year --------------------
  getAllFinancialYear() {
    let url = environment.baseWebApiUrl + 'varuna/v1/finyear/getallfinyear'
    return this.http.post(url, {});
  }
  getFinacialYearById(finId: finYear) {
    let url = environment.baseWebApiUrl + 'varuna/v1/finyear/getfinyearbyid'
    return this.http.post(url, { "finId": finId });
  }
  createFinYear(data: finYear) {
    let url = environment.baseWebApiUrl + 'varuna/v1/finyear'
    return this.http.post(url, data);
  }
  editFinYear(data: finYear) {
    let url = environment.baseWebApiUrl + 'varuna/v1/finyear/updatefinyear'
    return this.http.put(url, data)
  }
  disableAndEnableFinYear(data: finYear) {
    let url = environment.baseWebApiUrl + 'varuna/v1/finyear/deletefinyear'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }


  // -----------------vendor Master---------------
  getAllVendorMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/vendor/getallvendor'
    return this.http.post(url, {});
  }
  getVendorMasterById(vendorId: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vendor/getvendorbyid'
    return this.http.post(url, { "vendorId": vendorId });
  }
  createVendorMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vendor'
    return this.http.post(url, data);
  }
  updateVendorMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vendor/updatevendor'
    return this.http.put(url, data)
  }
  // -----------------customer group Master---------------
  getAllCustomerMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/customergroup/getallcustomergroup'
    return this.http.post(url, {});
  }
  editCustomerGroupMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customergroup/updatecustomergroup'
    return this.http.put(url, data)
  }

  createCustomerGroupMaster(data: customerGroup) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customergroup'
    return this.http.post(url, data);
  }
  disableAndEnableCustomerGroup(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customergroup/deletecustomergroup'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  getCustomerMasterById(custGroupId: customerGroup) {
    let url = environment.baseWebApiUrl + 'varuna/v1/customergroup/getcustomergroupbyid'
    return this.http.post(url, { "custGroupId": custGroupId });
  }
  // -----------------address master---------------
  getAllAddressMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/address/getalladdress'
    return this.http.post(url, {});
  }
  createAddressMaster(data: addressMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/address'
    return this.http.post(url, data);
  }

  getAddressMasterById(addressId: addressMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/address/getaddressbyid'
    return this.http.post(url, { "addressId": addressId });
  }
  editAddressMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/address/updateaddress'
    return this.http.put(url, data)
  }
  disableAndEnableAddressMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/address/deleteaddress'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  getaddressbyqueryperm(data: any) {
    let url = environment.baseWebApiUrl + `varuna/v1/address/getaddressbyqueryperm?countryId=${data.countryId}&stateId=${data.stateId}&cityId=${data.cityId}&pincode=${data.pincode}`
    return this.http.get(url);
  }
  // -----------------driver master---------------
  getAllDriverMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/driver/getdrivers'
    return this.http.post(url, {});
  }
  createDriverMaster(data: driverMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/driver'
    return this.http.post(url, data);
  }
  updateDriverMaster(data: driverMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/driver/updatedriver'
    return this.http.put(url, data);
  }
  getDriverById(driverId: driverMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/driver/getdriverbyid'
    return this.http.post(url, { "driverId": driverId });
  }
  disableAndEnableDriver(data: driverMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/driver/deletedriver'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  //driver master list
  getDriverMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/driver/getdriversdetails'
    return this.http.post(url, {
      "pageNumber": 1,
      "pageSize": 10
    });
  }
  getDriverMasterById(driverId: driverMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/driver/getdriverdetailbyid'
    return this.http.post(url, { "driverId": driverId });
  }

  updateDriverMasterFinalJson(data: driverMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/driver/updatedrivermaster'
    return this.http.put(url, data);
  }
  // -----------------owner master master---------------
  getAll_owner_master() {
    let url = environment.baseWebApiUrl + 'varuna/v1/ownermaster/getallowners'
    return this.http.post(url, {});
  }
  create_owner_master(data: ownerMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/ownermaster'
    return this.http.post(url, data);
  }
  update_owner_master(data: ownerMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/ownermaster/updateowner'
    return this.http.put(url, data);
  }
  get_owner_master_ById(ownerId: ownerMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/ownermaster/getownerbyid'
    return this.http.post(url, { "ownerId": ownerId });
  }
  disableAndEnableowner_master(data: ownerMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/ownermaster/deleteowner'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // -----------------owner master---------------
  getAll_Cngr_Cnse_Master() {
    let url = environment.baseWebApiUrl + 'varuna/v1/consigneeconsignor/getconsigneeconsignor'
    return this.http.post(url, {});
  }
  create_Cngr_Cnse_Master(data: cngr_cnse_Master) {
    let url = environment.baseWebApiUrl + 'varuna/v1/consigneeconsignor'
    return this.http.post(url, data);
  }
  update_Cngr_Cnse_Master(data: cngr_cnse_Master) {
    let url = environment.baseWebApiUrl + 'varuna/v1/consigneeconsignor/updateconsigneeconsignor'
    return this.http.put(url, data);
  }
  get_Cngr_Cnse_ById(consiConseId: cngr_cnse_Master) {
    let url = environment.baseWebApiUrl + 'varuna/v1/consigneeconsignor/getconsigneeconsignorsbyid'
    return this.http.post(url, { "consiConseId": consiConseId });
  }
  disableAndEnable_Cngr_Cnse_(data: cngr_cnse_Master) {
    let url = environment.baseWebApiUrl + 'varuna/v1/consigneeconsignor/deleteconsigneeconsignor'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  // -----------------tds section master--------------- 7 aug 2023

  getAllTdsRateMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdssection/getalltdssections'
    return this.http.post(url, {});
  }
  //
  createTdsRateMaster(data: tdsrateMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdssection'
    return this.http.post(url, data);
  }
  updateTdsRateMaster(data: tdsrateMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdssection/updatetdssection'
    return this.http.put(url, data);
  }

  getTdsRateMasterById(tdsRateId: tdsrateMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdssection/gettdssectionbyid'
    return this.http.post(url, { "tdsRateId": tdsRateId });
  }
  disableAndEnableTdsRateMaster(data: tdsrateMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdssection/deletetdssection'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      body: data

    });

  }
  // -----------------tds service master--------------- 7 aug 2023
  getAllTdsRateServiceMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsservice/getalltdsservice'
    return this.http.post(url, {});
  }
  createTdsRateServiceMaster(data: tdsServiceMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsservice'
    return this.http.post(url, data);
  }
  updateTdsRateServiceMaster(data: tdsServiceMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsservice/updatetdsservice'
    return this.http.put(url, data);
  }
  getTdsRateServiceMasterById(tdsRateId: tdsServiceMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsservice/gettdsservicebyid'
    return this.http.post(url, { "tdsRateId": tdsRateId });
  }
  disableAndEnableTdsRateServiceMaster(data: tdsServiceMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsservice/deletetdsservice'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }

  // -----------------tds rate master--------------- 11 aug 2023
  getAllRate() {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsrate/getalltdsrates'
    return this.http.post(url, {});
  }
  createTdsRate(data: rateMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsrate'
    return this.http.post(url, data);
  }
  updateTdsRate(data: rateMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsrate/updatetdsrate'
    return this.http.put(url, data);
  }
  getTdsRateById(tdsRateId: rateMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsrate/gettdsratebyid'
    return this.http.post(url, { "tdsRateId": tdsRateId });
  }
  disableAndEnableTdsRate(data: rateMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsrate/deletetdsrate'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      body: data

    });

  }



  // ----------------lane master--------------------10 aug 2023
  getAllLaneMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/lane/getalllenes'
    return this.http.post(url, {});
  }
  getLaneMasterDetailsById(laneId: laneMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lane/lanebyid'
    return this.http.post(url, { "laneId": laneId });
  }
  createLaneMaster(data: laneMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lane'
    return this.http.post(url, data);
  }
  editLaneMaster(data: laneMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lane/updatelane'
    return this.http.put(url, data)
  }
  disableAndEnableLaneMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/lane/deletelane'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  //-----------------------route master ---------------17 aug 2023
  getAllRouteMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routemaster/getallroutes'
    return this.http.get(url + `?cityId=${data.cityId}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&fromcity=${data.fromcity}&tocity=${data.tocity}`);
  }
  getRouteMasterDetailsById(routeId: routeMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routemaster/getroutebyid?routeId=' + routeId
    return this.http.post(url,{});
  }
  createRouteMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routemaster'
    return this.http.post(url, data);
  }
  updateRoutemaster(data: routeMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routemaster/updateroute'
    return this.http.put(url, data)
  }
  disableAndEnableRouterMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routemaster/deleteroute'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  getAllRouteMasterByCity(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routemaster/getroutefilterbycity'
    return this.http.post(url + `?fromcity=${data.fromcity}&tocity=${data.tocity}`,{});
  }

  //---------------------vehicle master---------------------- 18 aug 2023
  getAllVehicleMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclemaster/getvehicledetails'
    return this.http.post(url, {});
  }
  getvehicleDetailById(vehicleDetailId: vehicleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclemaster/getvehicledetailsbyvehicleno'
    return this.http.post(url, { "vehicleDetailId": vehicleDetailId });
  }
  createVehicleMaster(data: vehicleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclemaster'
    return this.http.post(url, data);
  }
  updateVehicleMaster(data: vehicleMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclemaster/updatevehiclemaster'
    return this.http.put(url, data)
  }
  disableAndEnableVehicleMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclemaster/deletevehiclemaster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  //-------- TDS Rate Differential Master  ------- 22 sep 2023
  getAllTDSRateDiffMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/tdsratediffrential/getalltdsratediffrentials'
    return this.http.post(url, {});
  }
  //------------------prq Request ------------------------------        7 oct 2023
  getAllPrqRequestList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/prq'
    return this.http.post(url, {});
  }
  getPrqRequestDetailById(prqId: prqRequest) {
    let url = environment.baseWebApiUrl + 'varuna/v1/prq/getprqbyid'
    return this.http.post(url, { "prqId": prqId });
  }
  createPrqRequest(data: prqRequest) {
    let url = environment.baseWebApiUrl + 'varuna/v1/prq/getallprq'
    return this.http.post(url, data);
  }
  updatePrqRequest(data: prqRequest) {
    let url = environment.baseWebApiUrl + 'varuna/v1/prq/updateprq'
    return this.http.put(url, data)
  }
  // -----------------route rate master------------
  getAllRouteGroupList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/routegroup/getallroutegroup'
    return this.http.post(url, {});
  }
  getRouteRateGroupDetailById(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routeratemaster/getallrouterate'
    return this.http.post(url, data);
  }
  Createrouterate(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routeratemaster/createrouterate'
    return this.http.post(url, data);
  }
  getRouteratebyid(rateId: Number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routeratemaster/getrouteratebyid'
    return this.http.post(url, { rateId: rateId });
  }
  updateRouterate(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/routeratemaster/updaterouterate'
    return this.http.put(url, data);
  }
  //role section
  getAllRolMenuList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/role/getallrole'
    return this.http.post(url, {});
  }
  getROleMenuDetailById(roleId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menu/getmenubyroleid'
    return this.http.post(url, { "roleId": roleId });
  }
  insertMenuRole(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/menu/insertmenurolemapping'
    return this.http.post(url, data);
  }
  getAllAction(){
    let url = environment.baseWebApiUrl + 'varuna/v1/menu/getallactions'
    return this.http.post(url, {});
  }
    //matrix
    getMatrixAdditionbyGroupId(data:any) {
      let url = environment.baseWebApiUrl + 'varuna/v1/matrixaddition/getmatrixadditionbygroupid'
      return this.http.post(url, data);
    }
    getMatrixList() {
      let url = environment.baseWebApiUrl + 'varuna/v1/matrixaddition/getallmatrixaddition'
      return this.http.post(url, {});
    }



    // group master
getGroupMasterbyid(groupId: Number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/routegroup/getroutegroupbyid'
  return this.http.post(url, { groupId: groupId });
}
CreateGroupMaster(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/routegroup/createroutegroup'
  return this.http.post(url, data);
}
 
updateGroupMaster(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/routegroup/updateroutegroup'
  return this.http.put(url, data);
}
// SOP
getAllmanageSOPList() {
  let url = environment.baseWebApiUrl + 'varuna/v1/sop/getallsopfile'
  return this.http.post(url, {});
}
 
getUploadSopbyid(sopFileId: Number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/sop/getsopfilebyid'
  return this.http.post(url, { sopFileId: sopFileId});
}
 
CreateUploadSop(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/sop/createsopfile'
  return this.http.post(url, data);
}
editUploadSop(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/sop/updatesopfile'
  return this.http.put(url, data);
}
deleteSopfile(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/sop/deletesopfile'
  return this.http.delete(url, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: data
  });
}
}