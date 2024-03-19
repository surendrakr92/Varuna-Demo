import { Routes } from '@angular/router';
import { LoadAbilityMappingComponent } from 'src/app/main/master/LoadAbilityMapping/load-ability-mapping/load-ability-mapping.component';
import { ManageSopComponent } from 'src/app/main/master/SOP/manage-sop/manage-sop.component';
import { UploadSopComponent } from 'src/app/main/master/SOP/upload-sop/upload-sop.component';
import { ViewManageComponent } from 'src/app/main/master/SOP/view-manage/view-manage.component';
import { TestssrsComponent } from 'src/app/main/master/SSRS/testssrs/testssrs.component';
import { CreateTdsRateDifferentialMasterComponent } from 'src/app/main/master/TDSAutomation/create-tds-rate-differential-master/create-tds-rate-differential-master.component';
import { TdsRateDifferentialMasterComponent } from 'src/app/main/master/TDSAutomation/tds-rate-differential-master/tds-rate-differential-master.component';
import { TdsRateMasterComponent } from 'src/app/main/master/TdsRateMaster/tds-rate-master/tds-rate-master.component';
import { AddressMasterComponent } from 'src/app/main/master/addressMaster/address-master/address-master.component';
import { NewAddressMasterComponent } from 'src/app/main/master/addressMaster/new-address-master/new-address-master.component';
import { ViewAddressMasterComponent } from 'src/app/main/master/addressMaster/view-address-master/view-address-master.component';
import { BranchComponent } from 'src/app/main/master/branchLevel/branchLevel/branchLevel.component';
import { NewBranchComponent } from 'src/app/main/master/branchLevel/new-branchLevel/new-branchLevel.component';
import { ViewBranchComponent } from 'src/app/main/master/branchLevel/view-branchLevel/view-branchLevel.component';
import { BranchMasterComponent } from 'src/app/main/master/branchMaster/branch-master/branch-master.component';
import { NewBranchMasterComponent } from 'src/app/main/master/branchMaster/new-branch-master/new-branch-master.component';
import { ViewBranchMasterComponent } from 'src/app/main/master/branchMaster/view-branch-master/view-branch-master.component';
import { BranchUserMappingComponent } from 'src/app/main/master/branchUserMapping/branch-user-mapping/branch-user-mapping.component';
import { NewBranchUserMappingComponent } from 'src/app/main/master/branchUserMapping/new-branch-user-mapping/new-branch-user-mapping.component';
import { ViewBranchUserMappingComponent } from 'src/app/main/master/branchUserMapping/view-branch-user-mapping/view-branch-user-mapping.component';
import { CityMasterComponent } from 'src/app/main/master/cityMaster/city-master/city-master.component';
import { NewCityMasterComponent } from 'src/app/main/master/cityMaster/new-city-master/new-city-master.component';
import { ViewCityMasterComponent } from 'src/app/main/master/cityMaster/view-city-master/view-city-master.component';
import { ClaimTypeComponent } from 'src/app/main/master/claimType/claim-type/claim-type.component';
import { ClusterMappingComponent } from 'src/app/main/master/clusterMapping/cluster-mapping/cluster-mapping.component';
import { NewClusterMappingComponent } from 'src/app/main/master/clusterMapping/new-cluster-mapping/new-cluster-mapping.component';
import { ViewClusterMappingComponent } from 'src/app/main/master/clusterMapping/view-cluster-mapping/view-cluster-mapping.component';
import { ClusterMasterComponent } from 'src/app/main/master/clusterMaster/cluster-master/cluster-master.component';
import { NewClusterMasterComponent } from 'src/app/main/master/clusterMaster/new-cluster-master/new-cluster-master.component';
import { ViewClusterMasterComponent } from 'src/app/main/master/clusterMaster/view-cluster-master/view-cluster-master.component';
import { CodeTypeMasterComponent } from 'src/app/main/master/codeTypeMaster/code-type-master/code-type-master.component';
import { NewCodeTypeMasterComponent } from 'src/app/main/master/codeTypeMaster/new-code-type-master/new-code-type-master.component';
import { ViewCodeTypeMasterComponent } from 'src/app/main/master/codeTypeMaster/view-code-type-master/view-code-type-master.component';
import { CompanyMasterComponent } from 'src/app/main/master/companyMaster/company-master/company-master.component';
import { NewCompanyMasterComponent } from 'src/app/main/master/companyMaster/new-company-master/new-company-master.component';
import { ViewCompanyMasterComponent } from 'src/app/main/master/companyMaster/view-company-master/view-company-master.component';
import { CngrCngeMasterListComponent } from 'src/app/main/master/consignorConsigneeMaster/cngr-cnge-master-list/cngr-cnge-master-list.component';
import { NewCngrCngeMasterComponent } from 'src/app/main/master/consignorConsigneeMaster/new-cngr-cnge-master/new-cngr-cnge-master.component';
import { CountryMasterComponent } from 'src/app/main/master/countryMaster/country-master/country-master.component';
import { Master1Component } from 'src/app/main/master/countryMaster/master/master1.component';
import { CreateNewComponent } from 'src/app/main/master/countryMaster/new-country-master/new-country-master';
import { ViewCountryMasterComponent } from 'src/app/main/master/countryMaster/view-country-master/view-country-master.component';
import { CustomerMasterListComponent } from 'src/app/main/master/customer-master/customer-master-list/customer-master-list.component';
import { NewCustomerMasterComponent } from 'src/app/main/master/customer-master/new-customer-master/new-customer-master.component';
import { ViewCustomerMasterComponent } from 'src/app/main/master/customer-master/view-customer-master/view-customer-master.component';
import { CustomerMisComponent } from 'src/app/main/master/customer-mis/customer-mis.component';
import { ContractBasicInfoComponent } from 'src/app/main/master/customerContractMaster/contract-basic-info/contract-basic-info.component';
import { LabourMasterApprovedComponent } from 'src/app/main/master/customerContractMaster/contractManagementApproved/labour-master-approved/labour-master-approved.component';
import { RateApprovalListComponent } from 'src/app/main/master/customerContractMaster/contractManagementApproved/rate-approval-list/rate-approval-list.component';
import { RateApprovalComponent } from 'src/app/main/master/customerContractMaster/contractManagementApproved/rate-approval/rate-approval.component';
import { CreateCustomerContractMasterComponent } from 'src/app/main/master/customerContractMaster/create-customer-contract-master/create-customer-contract-master.component';
import { CustomerContactMasterListComponent } from 'src/app/main/master/customerContractMaster/customer-contact-master-list/customer-contact-master-list.component';
import { CustomerContactMasterComponent } from 'src/app/main/master/customerContractMaster/customer-contact-master/customer-contact-master.component';
import { LabourMasterComponent } from 'src/app/main/master/customerContractMaster/labourMaster/labour-master/labour-master.component';
import { RateUpdateListComponent } from 'src/app/main/master/customerContractMaster/rate-update-list/RateUpdateListComponent';
import { RateUpdateComponent } from 'src/app/main/master/customerContractMaster/rate-update/rate-update.component';
import { CustomerGroupComponent } from 'src/app/main/master/customerGroup/customer-group/customer-group.component';
import { NewCustomerGroupComponent } from 'src/app/main/master/customerGroup/new-customer-group/new-customer-group.component';
import { ViewCustomerGroupComponent } from 'src/app/main/master/customerGroup/view-customer-group/view-customer-group.component';
import { CreateDepartmentMasterComponent } from 'src/app/main/master/departmentMaster/create-department-master/create-department-master.component';
import { DepartmentMasterComponent } from 'src/app/main/master/departmentMaster/department-master/department-master.component';
import { DivisionMasterComponent } from 'src/app/main/master/divisionMaster/division-master/division-master.component';
import { NewDivisionMasterComponent } from 'src/app/main/master/divisionMaster/new-division-master/new-division-master.component';
import { ViewDivisionMasterComponent } from 'src/app/main/master/divisionMaster/view-division-master/view-division-master.component';
import { CreateDriverMasterComponent } from 'src/app/main/master/driver-master/create-driver-master/create-driver-master.component';
import { DriverMasterComponent } from 'src/app/main/master/driver-master/driver-master/driver-master.component';
import { CreateMainAndSubEventMasterComponent } from 'src/app/main/master/eventMaster/MainAndSubEventMaster/create-main-and-sub-event-master/create-main-and-sub-event-master.component';
import { MainAndSubEventMasterListComponent } from 'src/app/main/master/eventMaster/MainAndSubEventMaster/main-and-sub-event-master-list/main-and-sub-event-master-list.component';
import { CreateEventMappingMasterComponent } from 'src/app/main/master/eventMaster/eventMappingMaster/create-event-mapping-master/create-event-mapping-master.component';
import { EventMappingMasterListComponent } from 'src/app/main/master/eventMaster/eventMappingMaster/event-mapping-master-list/event-mapping-master-list.component';
import { ViewEventMappingMasterComponent } from 'src/app/main/master/eventMaster/eventMappingMaster/view-event-mapping-master/view-event-mapping-master.component';
import { EventReasonMasterListComponent } from 'src/app/main/master/eventMaster/eventReasonMaster/event-reason-master-list/event-reason-master-list.component';
import { ViewEventReasonMasterComponent } from 'src/app/main/master/eventMaster/eventReasonMaster/view-event-reason-master/view-event-reason-master.component';
import { CreateEventMasterComponent } from 'src/app/main/master/eventMaster/eventmaster/create-event-master/create-event-master.component';
import { EventMasterComponent } from 'src/app/main/master/eventMaster/eventmaster/event-master/event-master.component';
import { ViewEventMasterComponent } from 'src/app/main/master/eventMaster/eventmaster/view-event-master/view-event-master.component';
import { FinancialYearComponent } from 'src/app/main/master/financialYear/financial-year/financial-year.component';
import { NewFinancialYearComponent } from 'src/app/main/master/financialYear/new-financial-year/new-financial-year.component';
import { ViewFinancialYearComponent } from 'src/app/main/master/financialYear/view-financial-year/view-financial-year.component';
import { GeneralMasterComponent } from 'src/app/main/master/generalMaster/general-master/general-master.component';
import { GenralmasterListComponent } from 'src/app/main/master/generalMaster/genralmaster-list/genralmaster-list.component';
import { UpdateGenMasterListComponent } from 'src/app/main/master/generalMaster/genralmaster-list/update-gen-master-list/update-gen-master-list.component';
import { LaneMasterListComponent } from 'src/app/main/master/laneMaster/lane-master-list/lane-master-list.component';
import { NewLandMasterComponent } from 'src/app/main/master/laneMaster/new-land-master/new-land-master.component';
import { ViewLandMasterComponent } from 'src/app/main/master/laneMaster/view-land-master/view-land-master.component';
import { LanePriorityListComponent } from 'src/app/main/master/lanePriority/lane-priority-list/lane-priority-list.component';
import { UpdateLanePriorityComponent } from 'src/app/main/master/lanePriority/update-lane-priority/update-lane-priority.component';
import { ViewLanePriorityListComponent } from 'src/app/main/master/lanePriority/view-lane-priority-list/view-lane-priority-list.component';
import { CreateMenuAccessMasterComponent } from 'src/app/main/master/menu-accessMaster/create-menu-access-master/create-menu-access-master.component';
import { MenuAccessMasterComponent } from 'src/app/main/master/menu-accessMaster/menu-access-master/menu-access-master.component';
import { MenuMasterComponent } from 'src/app/main/master/menuMaster/menu-master/menu-master.component';
import { NewMenuMasterComponent } from 'src/app/main/master/menuMaster/new-menu-master/new-menu-master.component';
import { ViewMenuMasterComponent } from 'src/app/main/master/menuMaster/view-menu-master/view-menu-master.component';
import { CreateModuleMasterComponent } from 'src/app/main/master/moduleMaster/create-module-master/create-module-master.component';
import { ModuleMasterComponent } from 'src/app/main/master/moduleMaster/module-master/module-master.component';
import { NewOwnerMasterComponent } from 'src/app/main/master/ownerMaster/new-owner-master/new-owner-master.component';
import { OwnerMasterListComponent } from 'src/app/main/master/ownerMaster/owner-master-list/owner-master-list.component';
import { NewPincodeComponent } from 'src/app/main/master/pinCode/new-pincode/new-pincode.component';
import { PinCodeComponent } from 'src/app/main/master/pinCode/pin-code/pin-code.component';
import { ViewPinCodeComponent } from 'src/app/main/master/pinCode/view-pin-code/view-pin-code.component';
import { CreateRoleMasterComponent } from 'src/app/main/master/role-master/create-role-master/create-role-master.component';
import { RoleMasterComponent } from 'src/app/main/master/role-master/role-master.component';
import { NewRoleUserMappingComponent } from 'src/app/main/master/roleUserMapping/new-role-user-mapping/new-role-user-mapping.component';
import { RoleUserMappingComponent } from 'src/app/main/master/roleUserMapping/role-user-mapping/role-user-mapping.component';
import { ViewRoleUserMappingComponent } from 'src/app/main/master/roleUserMapping/view-role-user-mapping/view-role-user-mapping.component';
import { CreateRouteMasterComponent } from 'src/app/main/master/routeMaster/create-route-master/create-route-master.component';
import { RouteMasterListComponent } from 'src/app/main/master/routeMaster/route-master-list/route-master-list.component';
import { ViewRouteMasterComponent } from 'src/app/main/master/routeMaster/view-route-master/view-route-master.component';
import { CreateMappingAverageMatrixComponent } from 'src/app/main/master/routeRateMaster/create-mapping-average-matrix/create-mapping-average-matrix.component';
import { CreateRouteRateMasterComponent } from 'src/app/main/master/routeRateMaster/create-route-rate-master/create-route-rate-master.component';
import { CreateGroupMasterComponent } from 'src/app/main/master/routeRateMaster/groupMaster/create-group-master/create-group-master.component';
import { GroupMasterListComponent } from 'src/app/main/master/routeRateMaster/groupMaster/group-master-list/group-master-list.component';
import { GroupMasterViewComponent } from 'src/app/main/master/routeRateMaster/groupMaster/group-master-view/group-master-view.component';
import { MappingAverageMatrixComponent } from 'src/app/main/master/routeRateMaster/mapping-average-matrix/mapping-average-matrix.component';
import { RouteRateMasterComponent } from 'src/app/main/master/routeRateMaster/route-rate-master/route-rate-master.component';
import { NewStateMasterComponent } from 'src/app/main/master/stateMaster/new-state-master/new-state-master.component';
import { StateMasterComponent } from 'src/app/main/master/stateMaster/state-master/state-master.component';
import { ViewStateMasterComponent } from 'src/app/main/master/stateMaster/view-state-master/view-state-master.component';
import { NewSubCityMasterComponent } from 'src/app/main/master/subCityMaster/new-sub-city-master/new-sub-city-master.component';
import { SubCityMasterComponent } from 'src/app/main/master/subCityMaster/sub-city-master/sub-city-master.component';
import { ViewSubCityMasterComponent } from 'src/app/main/master/subCityMaster/view-sub-city-master/view-sub-city-master.component';
import { NewSubClusterMasterComponent } from 'src/app/main/master/subClusterMaster/new-sub-cluster-master/new-sub-cluster-master.component';
import { SubClusterMasterComponent } from 'src/app/main/master/subClusterMaster/sub-cluster-master/sub-cluster-master.component';
import { ViewSubClusterMasterComponent } from 'src/app/main/master/subClusterMaster/view-sub-cluster-master/view-sub-cluster-master.component';
import { UserBranchMappingComponent } from 'src/app/main/master/user-branch-mapping/user-branch-mapping.component';
import { NewUserMasterComponent } from 'src/app/main/master/userMaster/new-user-master/new-user-master.component';
import { UserMasterComponent } from 'src/app/main/master/userMaster/user-master/user-master.component';
import { ViewUserMasterComponent } from 'src/app/main/master/userMaster/view-user-master/view-user-master.component';
import { VehicleLoadComponentComponent } from 'src/app/main/master/vehicleLoadAbility/vehicle-load-component/vehicle-load-component.component';
import { CreateVehicleMasterComponent } from 'src/app/main/master/vehicleMaster/create-vehicle-master/create-vehicle-master.component';
import { VehicleMasterListComponent } from 'src/app/main/master/vehicleMaster/vehicle-master-list/vehicle-master-list.component';
import { ViewVehicleMasterComponent } from 'src/app/main/master/vehicleMaster/view-vehicle-master/view-vehicle-master.component';
import { CreateVendorMasterComponent } from 'src/app/main/master/vendorMaster/create-vendor-master/create-vendor-master.component';
import { VendorMasterComponent } from 'src/app/main/master/vendorMaster/vendor-master/vendor-master.component';
import { ViewVendorMasterComponent } from 'src/app/main/master/vendorMaster/view-vendor-master/view-vendor-master.component';
import { NewZoneComponent } from 'src/app/main/master/zoneMaster/new-zone/new-zone.component';
import { ViewZoneComponent } from 'src/app/main/master/zoneMaster/view-zone/view-zone.component';
import { ZoneComponent } from 'src/app/main/master/zoneMaster/zone/zone.component';


export const masterRoutes: Routes = [
  {
    path: '', component: Master1Component
  },
  // ....countrymaster
  {
    path: 'country-master', component: CountryMasterComponent
  },
  {
    path: 'country-master/new-country-master', component: CreateNewComponent
  },
  {
    path: 'country-master/update-country-master/:data', component: CreateNewComponent
  },
  {
    path: 'country-master/View-CountryMaster/:id', component: ViewCountryMasterComponent
  },
  // ....stateMaster
  {
    path: 'state-master', component: StateMasterComponent
  },
  {
    path: 'state-master/new-state-master', component: NewStateMasterComponent
  },
  {
    path: 'state-master/update-state-master/:data', component: NewStateMasterComponent
  },
  {
    path: 'state-master/view-state-master/:id', component: ViewStateMasterComponent
  },
  // ....cityMaster

  {
    path: 'city-master', component: CityMasterComponent
  },
  {
    path: 'city-master/new-city-master', component: NewCityMasterComponent
  },
  {
    path: 'city-master/update-city-master/:data', component: NewCityMasterComponent
  },
  {
    path: 'city-master/view-city-master/:id', component: ViewCityMasterComponent
  },
  // ....pinCodeMaster
  {
    path: 'pin-code', component: PinCodeComponent
  },
  {
    path: 'pin-code/new-pin-code', component: NewPincodeComponent
  },
  {
    path: 'pin-code/update-pincode/:data', component: NewPincodeComponent
  },
  {
    path: 'pin-code/view-pin-code/:id', component: ViewPinCodeComponent
  },
  // ....companymaster
  {
    path: 'company-master', component: CompanyMasterComponent
  },
  {
    path: 'company-master/view-company-master/:id', component: ViewCompanyMasterComponent
  },
  {
    path: 'company-master/new-company-master', component: NewCompanyMasterComponent
  },
  {
    path: 'company-master/update-company-master/:data', component: NewCompanyMasterComponent
  },
  // ....division-master
  {
    path: 'division-master', component: DivisionMasterComponent
  },
  {
    path: 'division-master/new-division-master', component: NewDivisionMasterComponent
  },
  {
    path: 'division-master/view-division-master/:id', component: ViewDivisionMasterComponent
  },
  {
    path: 'division-master/update-division-master/:data', component: NewDivisionMasterComponent
  },
  // ....zonemaster
  {
    path: 'zone-master', component: ZoneComponent
  },
  {
    path: 'zone-master/view-zone-master/:id', component: ViewZoneComponent
  },
  {
    path: 'zone-master/new-zone-master', component: NewZoneComponent
  },
  {
    path: 'zone-master/update-zone-master/:data', component: NewZoneComponent
  },
  // ....branch-level
  {
    path: 'branch-level', component: BranchComponent
  },
  {
    path: 'branch-level/new-branch-level', component: NewBranchComponent
  },
  {
    path: 'branch-level/update-branch-level/:data', component: NewBranchComponent
  },
  {
    path: 'branch-level/view-branch-level/:id', component: ViewBranchComponent
  },
  //..uswerMaster
  {
    path: 'user-master', component: UserMasterComponent
  },
  {
    path: 'user-master/view-user-master/:id', component: ViewUserMasterComponent
  },
  {
    path: 'user-master/new-user-master', component: NewUserMasterComponent
  },
  {
    path: 'user-master/update-user-master/:data', component: NewUserMasterComponent
  },
  // ..cluster master
  {
    path: 'cluster-mapping', component: ClusterMappingComponent
  },
  {
    path: 'cluster-mapping/view-cluster-mapping/:id', component: ViewClusterMappingComponent
  },
  {
    path: 'cluster-mapping/new-cluster-mapping', component: NewClusterMappingComponent
  },
  {
    path: 'cluster-mapping/update-cluster-mapping/:data', component: NewClusterMappingComponent
  },
  // .. user-branch-mapping master
  {
    path: 'user-branch-mapping', component: UserBranchMappingComponent
  },
  // branch-master
  {
    path: 'branch-master', component: BranchMasterComponent
  },
  {
    path: 'branch-master/view-branch-master/:id', component: ViewBranchMasterComponent
  },
  {
    path: 'branch-master/new-branch-master', component: NewBranchMasterComponent
  },
  {
    path: 'branch-master/update-branch-master/:data', component: NewBranchMasterComponent
  },
  //cluster-master
  {
    path: 'cluster-master', component: ClusterMasterComponent
  },
  {
    path: 'cluster-master/view-cluster-master/:id', component: ViewClusterMasterComponent
  },
  {
    path: 'cluster-master/new-cluster-master', component: NewClusterMasterComponent
  },
  {
    path: 'cluster-master/update-cluster-master/:data', component: NewClusterMasterComponent
  },
  //sub-cluster-master
  {
    path: 'sub-cluster-master', component: SubClusterMasterComponent
  },
  {
    path: 'sub-cluster-master/view-sub-cluster-master/:id', component: ViewSubClusterMasterComponent
  },
  {
    path: 'sub-cluster-master/new-sub-cluster-master', component: NewSubClusterMasterComponent
  },
  {
    path: 'sub-cluster-master/update-sub-cluster-master/:data', component: NewSubClusterMasterComponent
  },
  {
    path: 'sub-cluster-master/update-cluster-master/:data', component: NewSubClusterMasterComponent
  },
  // ..menu-master
  {
    path: 'menu-master', component: MenuMasterComponent
  },
  {
    path: 'menu-master/view-menu-master/:id', component: ViewMenuMasterComponent
  },
  {
    path: 'menu-master/new-menu-master', component: NewMenuMasterComponent
  },
  {
    path: 'menu-master/update-menu-master/:data', component: NewMenuMasterComponent
  },
  // ..role-master
  {
    path: 'role-master', component: RoleMasterComponent
  },
  {
    path: 'role-master/create-role-master', component: CreateRoleMasterComponent
  },
  {
    path: 'role-master/update-role-master/:data', component: CreateRoleMasterComponent
  },
  {
    path: 'role-master/view-role-master/:viewData', component: CreateRoleMasterComponent
  },
  //.role-user-mapping
  {
    path: 'role-user-mapping', component: RoleUserMappingComponent
  },
  {
    path: 'role-user-mapping/view-role-user-mapping/:id', component: ViewRoleUserMappingComponent
  },
  {
    path: 'role-user-mapping/new-role-user-mapping', component: NewRoleUserMappingComponent
  },
  {
    path: 'role-user-mapping/update-role-user-mapping/:data', component: NewRoleUserMappingComponent
  },
  //.department-master
  {
    path: 'department-master', component: DepartmentMasterComponent
  },
  {
    path: 'department-master/create-department-master', component: CreateDepartmentMasterComponent
  },
  {
    path: 'department-master/update-department-master/:data', component: CreateDepartmentMasterComponent
  },
  {
    path: 'department-master/view-department-master/:viewData', component: CreateDepartmentMasterComponent
  },
  // ..module-master
  {
    path: 'module-master', component: ModuleMasterComponent
  },
  {
    path: 'module-master/create-module-master', component: CreateModuleMasterComponent
  },
  {
    path: 'module-master/update-module-master/:data', component: CreateModuleMasterComponent
  },
  {
    path: 'module-master/view-module-master/:viewData', component: CreateModuleMasterComponent
  },
  //../menu-access-master
  {
    path: 'menu-access-master', component: MenuAccessMasterComponent
  },
  {
    path: 'create-menu-access-master', component: CreateMenuAccessMasterComponent
  },
  {
    path: 'update-menu-access-master/:data', component: CreateMenuAccessMasterComponent
  },
  {
    path: 'view-menu-access-master/:viewData', component: CreateMenuAccessMasterComponent
  },
  //../general-master
  {
    path: 'general-master', component: GeneralMasterComponent
  },
  {
    path: 'general-master-list', component: GenralmasterListComponent
  },
  {
    path: 'view/update-general-master-list', component: UpdateGenMasterListComponent
  },
  //../general-master-configuration

  {
    path: 'general-master-configuration', component: CodeTypeMasterComponent
  },
  {
    path: 'general-master-configuration/new-general-master-configuration', component: NewCodeTypeMasterComponent
  },
  {
    path: 'general-master-configuration/view-general-master-configuration/:id', component: ViewCodeTypeMasterComponent
  },
  {
    path: 'general-master-configuration/update-general-master-configuration/:data', component: NewCodeTypeMasterComponent
  },
  //../sub-city-master
  {
    path: 'sub-city-master', component: SubCityMasterComponent
  },
  {
    path: 'sub-city-master/view-sub-city-master/:id', component: ViewSubCityMasterComponent
  },
  {
    path: 'sub-city-master/new-sub-city-master', component: NewSubCityMasterComponent
  },
  {
    path: 'sub-city-master/update-sub-city-master/:data', component: NewSubCityMasterComponent
  },
  //...financial-year
  {
    path: 'financial-year', component: FinancialYearComponent
  },
  {
    path: 'financial-year/view-financial-year/:id', component: ViewFinancialYearComponent
  },
  {
    path: 'financial-year/new-financial-year', component: NewFinancialYearComponent
  },
  {
    path: 'financial-year/update-financial-year/:data', component: NewFinancialYearComponent
  },
  //../ branch-user-mapping
  {
    path: 'branch-user-mapping', component: BranchUserMappingComponent
  },

  {
    path: 'branch-user-mapping/view-branch-user-mapping/:id', component: ViewBranchUserMappingComponent
  },
  {
    path: 'branch-user-mapping/new-branch-user-mapping', component: NewBranchUserMappingComponent
  },
  {
    path: 'branch-user-mapping/update-branch-user-mapping/:data', component: NewBranchUserMappingComponent
  },

  // vendor master
  {
    path: 'vendor-master', component: VendorMasterComponent
  },
  {
    path: 'vendor-master/view-vendor-master/:id', component: ViewVendorMasterComponent
  },
  {
    path: 'vendor-master/create-vendor-master', component: CreateVendorMasterComponent
  },
  {
    path: 'vendor-master/update-vendor-master/:id', component: CreateVendorMasterComponent
  },

  // customer group master
  {
    path: 'customer-group', component: CustomerGroupComponent
  },
  {
    path: 'customer-group/new-customer-group', component: NewCustomerGroupComponent
  },
  {
    path: 'customer-group/update-customer-group/:data', component: NewCustomerGroupComponent
  },
  {
    path: 'customer-group/view-customer-group/:id', component: ViewCustomerGroupComponent
  },
  // customer master
  {
    path: 'customer-master', component: CustomerMasterListComponent
  },
  {
    path: 'customer-master/new-customer-master', component: NewCustomerMasterComponent
  },
  {
    path: 'customer-master/update-customer-master/:data', component: NewCustomerMasterComponent
  },
  {
    path: 'customer-master/view-customer-master/:viewData', component: ViewCustomerMasterComponent
  },
  //Consignor/Consignee
  {
    path: 'cngr-cnge-master', component: CngrCngeMasterListComponent
  },
  {
    path: 'cngr-cnge-master/new-cngr-cnge-master', component: NewCngrCngeMasterComponent
  },
  {
    path: 'cngr-cnge-master/update-cngr-cnge-master/:data', component: NewCngrCngeMasterComponent
  },
  {
    path: 'cngr-cnge-master/view-cngr-cnge-master/:viewData', component: NewCngrCngeMasterComponent
  },
  // address master
  {
    path: 'address-master', component: AddressMasterComponent
  },
  {
    path: 'address-master/new-address-master', component: NewAddressMasterComponent
  },
  {
    path: 'address-master/update-address-master/:data', component: NewAddressMasterComponent
  },
  {
    path: 'address-master/view-address-master/:id', component: ViewAddressMasterComponent
  },
  // driver master
  {
    path: 'driver-master', component: DriverMasterComponent
  },
  {
    path: 'driver-master/create-driver-master', component: CreateDriverMasterComponent
  },
  {
    path: 'driver-master/update-driver-master/:data', component: CreateDriverMasterComponent
  },
  {
    path: 'driver-master/view-driver-master/:viewData', component: CreateDriverMasterComponent
  },
  // owner master
  {
    path: 'owner-master', component: OwnerMasterListComponent
  },
  {
    path: 'owner-master/new-owner-master', component: NewOwnerMasterComponent
  },
  {
    path: 'owner-master/update-owner-master/:data', component: NewOwnerMasterComponent
  },
  {
    path: 'owner-master/view-owner-master/:viewData', component: NewOwnerMasterComponent
  },
  // tds rate master - 7 aug 2023
  {
    path: 'tds-rate-master', component: TdsRateMasterComponent
  },
  {
    path: 'tds-rate-master/:data', component: TdsRateMasterComponent
  },
  // lane master - 9 aug 2023
  {
    path: 'lane-master-list', component: LaneMasterListComponent
  },
  {
    path: 'lane-master-list/create-lane-master', component: NewLandMasterComponent
  },
  {
    path: 'lane-master-list/update-lane-master/:data', component: NewLandMasterComponent
  },
  {
    path: 'lane-master-list/view-lane-master/:id', component: ViewLandMasterComponent
  },
  //------------------route master -------------------17 aug 2023
  {
    path: 'route-master-list', component: RouteMasterListComponent
  },
  {
    path: 'route-master-list/create-route-master', component: CreateRouteMasterComponent
  },
  {
    path: 'route-master-list/view-route-master/:id', component: ViewRouteMasterComponent
  },
  // -------------vehicle master------------------- 18 aug 2023
  {
    path: 'vehicle-master-list', component: VehicleMasterListComponent
  },
  {
    path: 'vehicle-master-list/create-vehicle-master', component: CreateVehicleMasterComponent
  },
  {
    path: 'vehicle-master-list/update-vehicle-master/:data', component: CreateVehicleMasterComponent
  },
  {
    path: 'vehicle-master-list/view-vehicle-master-list/:id', component: ViewVehicleMasterComponent
  },
  //--------------main-and-sub-event-master---------14 aug 2023
  {
    path: 'main-and-sub-event-master', component: MainAndSubEventMasterListComponent
  },
  {
    path: 'main-and-sub-event-master/create-main-and-sub-event-master', component: CreateMainAndSubEventMasterComponent
  },
  {
    path: 'main-and-sub-event-master/update-main-and-sub-event-master/:data', component: CreateMainAndSubEventMasterComponent
  },
  {
    path: 'main-and-sub-event-master/view-main-and-sub-event-master/:viewData', component: CreateMainAndSubEventMasterComponent
  },
  //--------------event-mapping master need to delete---------14 aug 2023
  {
    path: 'event-mapping-master', component: EventMappingMasterListComponent
  },
  {
    path: 'event-mapping-master/create-event-mapping-master', component: CreateEventMappingMasterComponent

  },
  {
    path: 'event-mapping-master/update-event-mapping-master', component: CreateEventMappingMasterComponent
  },
  {
    path: 'event-mapping-master/view-event-mapping-master', component: ViewEventMappingMasterComponent
  },
  //--------------event- master---------14 aug 2023
  {
    path: 'event-reason-Master', component: EventReasonMasterListComponent
  },
  {
    path: 'event-master', component: EventMasterComponent
  },
  {
    path: 'event-master/create-event-master', component: CreateEventMasterComponent
  },
  {
    path: 'event-master/update-event-master/:id', component: CreateEventMasterComponent
  },
  {
    path: 'event-master/view-event-reason-master/:id', component: ViewEventReasonMasterComponent
  },
  {
    path: 'event-master/view-event-master/:id', component: ViewEventMasterComponent
  },
  //------customer contact master---------------- 22 aug 2023
  {
    path: 'customer-contract-master', component: CustomerContactMasterComponent
  },
  {
    path: 'customer-contract-master/customer-contract-master-list', component: CustomerContactMasterListComponent
  },
  {
    path: 'customer-contract-master/create-customer-contract-master', component: CreateCustomerContractMasterComponent
  },
  {
    path: 'customer-contract-master/contract-basic-infromation', component: ContractBasicInfoComponent
  },
  {
    path: 'rate-update', component: RateUpdateComponent
  },
  {
    path: 'rate-update/rate-update-list/:id', component: RateUpdateListComponent
  },
  // contract Management Approved
{
  path:'rate-approval', component:RateApprovalComponent
},
{
  path:'rate-approval/rate-approval-list', component:RateApprovalListComponent
},
  //--------lane priority-------------------------------29 aug 2023
  {
    path: 'lane-priority-list', component: LanePriorityListComponent
  },
  {
    path: 'lane-priority-list/view-lane-priority', component: ViewLanePriorityListComponent
  },
  {
    path: 'lane-priority-list/update-lane-priority', component: UpdateLanePriorityComponent
  },
  // claime type 
  {
    path: 'claim-type/claim-type-list', component: ClaimTypeComponent
  },
  //vehicle load 
  {
    path: 'vehicle-loadability/vehicle-loadability-list', component: VehicleLoadComponentComponent
  },
  // customer mis
  {
    path: 'customer-mis/customer-mis-list', component: CustomerMisComponent
  },
  // tds-rate-differential-master
  {
    path: 'tds-rate-differential-master', component: TdsRateDifferentialMasterComponent
  },
  {
    path: 'tds-rate-differential-master/create-tds-rate-differential-master', component: CreateTdsRateDifferentialMasterComponent
  },
  //loadability
  {
    path: 'load-ability-mapping', component: LoadAbilityMappingComponent
  },
  //labour master
  {
    path: 'labour-master', component: LabourMasterComponent  // 5 oct 2023 
  },
   //route rate master
 
  {
    path: 'route-rate-master', component: RouteRateMasterComponent
  },
  {
    path: 'route-rate-master/create-route-rate-master/:id', component: CreateRouteRateMasterComponent
  },
  {
    path:'labour-master-approved', component:LabourMasterApprovedComponent
  },
  {
    path:'mapping-average-matrix', component:MappingAverageMatrixComponent
  },
  {
    path:'mapping-average-matrix/create-mapping-average-matrix/:id',component:CreateMappingAverageMatrixComponent
  },
  {
    path:'group-master',component:GroupMasterListComponent
  },
  {
    path:'group-master/create-group-master',component:CreateGroupMasterComponent
  },
  {
    path:'group-master/update-group-master/:data',component:CreateGroupMasterComponent
  },
  {
    path:'group-master/group-master-view/:id',component:GroupMasterViewComponent
  },
  {
    path:'manage-sop',component:ManageSopComponent
  },
  {
    path:'manage-sop/upload-sop',component:UploadSopComponent
  },
  {
    path:'manage-sop/update-upload-sop/:id',component:UploadSopComponent
  },
  {
    path:'manage-sop/view-manage/:id', component:ViewManageComponent
  },

  {
    path:'testssrs',component:TestssrsComponent
  },
]