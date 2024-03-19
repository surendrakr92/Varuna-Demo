import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterRoutingModule } from './master-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserBranchMappingComponent } from './user-branch-mapping/user-branch-mapping.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { CountryMasterComponent } from './countryMaster/country-master/country-master.component';
import { CreateNewComponent } from './countryMaster/new-country-master/new-country-master';
import { ViewCountryMasterComponent } from './countryMaster/view-country-master/view-country-master.component';
import { NewStateMasterComponent } from './stateMaster/new-state-master/new-state-master.component';
import { StateMasterComponent } from './stateMaster/state-master/state-master.component';
import { ViewStateMasterComponent } from './stateMaster/view-state-master/view-state-master.component';
import { Master1Component } from './countryMaster/master/master1.component';
import { CityMasterComponent } from './cityMaster/city-master/city-master.component';
import { NewCityMasterComponent } from './cityMaster/new-city-master/new-city-master.component';
import { ViewCityMasterComponent } from './cityMaster/view-city-master/view-city-master.component';
import { PinCodeComponent } from './pinCode/pin-code/pin-code.component';
import { NewPincodeComponent } from './pinCode/new-pincode/new-pincode.component';
import { ViewPinCodeComponent } from './pinCode/view-pin-code/view-pin-code.component';
import { CompanyMasterComponent } from './companyMaster/company-master/company-master.component';
import { ViewCompanyMasterComponent } from './companyMaster/view-company-master/view-company-master.component';
import { NewCompanyMasterComponent } from './companyMaster/new-company-master/new-company-master.component';
import { DivisionMasterComponent } from './divisionMaster/division-master/division-master.component';
import { NewDivisionMasterComponent } from './divisionMaster/new-division-master/new-division-master.component';
import { ViewDivisionMasterComponent } from './divisionMaster/view-division-master/view-division-master.component';
import { NewZoneComponent } from './zoneMaster/new-zone/new-zone.component';
import { ViewZoneComponent } from './zoneMaster/view-zone/view-zone.component';
import { ZoneComponent } from './zoneMaster/zone/zone.component';
import { BranchComponent } from './branchLevel/branchLevel/branchLevel.component';
import { ViewBranchComponent } from './branchLevel/view-branchLevel/view-branchLevel.component';
import { NewBranchComponent } from './branchLevel/new-branchLevel/new-branchLevel.component';
import { BranchMasterComponent } from './branchMaster/branch-master/branch-master.component';
import { ViewBranchMasterComponent } from './branchMaster/view-branch-master/view-branch-master.component';
import { NewBranchMasterComponent } from './branchMaster/new-branch-master/new-branch-master.component';
import { IsActiveFilterPipe } from 'src/app/shared/Pipe/is-active-filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClusterMasterComponent } from './clusterMaster/cluster-master/cluster-master.component';
import { ViewClusterMasterComponent } from './clusterMaster/view-cluster-master/view-cluster-master.component';
import { NewClusterMasterComponent } from './clusterMaster/new-cluster-master/new-cluster-master.component';
import { NewSubClusterMasterComponent } from './subClusterMaster/new-sub-cluster-master/new-sub-cluster-master.component';
import { ViewSubClusterMasterComponent } from './subClusterMaster/view-sub-cluster-master/view-sub-cluster-master.component';
import { SubClusterMasterComponent } from './subClusterMaster/sub-cluster-master/sub-cluster-master.component';
import { MenuMasterComponent } from './menuMaster/menu-master/menu-master.component';
import { NewMenuMasterComponent } from './menuMaster/new-menu-master/new-menu-master.component';
import { ViewMenuMasterComponent } from './menuMaster/view-menu-master/view-menu-master.component';
import { CreateDepartmentMasterComponent } from './departmentMaster/create-department-master/create-department-master.component';
import { DepartmentMasterComponent } from './departmentMaster/department-master/department-master.component';
import { ModuleMasterComponent } from './moduleMaster/module-master/module-master.component';
import { CreateModuleMasterComponent } from './moduleMaster/create-module-master/create-module-master.component';
import { CreateRoleMasterComponent } from './role-master/create-role-master/create-role-master.component';
import { MenuAccessMasterComponent } from './menu-accessMaster/menu-access-master/menu-access-master.component';
import { CreateMenuAccessMasterComponent } from './menu-accessMaster/create-menu-access-master/create-menu-access-master.component';
import { ClusterMappingComponent } from './clusterMapping/cluster-mapping/cluster-mapping.component';
import { ViewClusterMappingComponent } from './clusterMapping/view-cluster-mapping/view-cluster-mapping.component';
import { NewClusterMappingComponent } from './clusterMapping/new-cluster-mapping/new-cluster-mapping.component';
import { NewUserMasterComponent } from './userMaster/new-user-master/new-user-master.component';
import { UserMasterComponent } from './userMaster/user-master/user-master.component';
import { ViewUserMasterComponent } from './userMaster/view-user-master/view-user-master.component';
import { RoleUserMappingComponent } from './roleUserMapping/role-user-mapping/role-user-mapping.component';
import { ViewRoleUserMappingComponent } from './roleUserMapping/view-role-user-mapping/view-role-user-mapping.component';
import { NewRoleUserMappingComponent } from './roleUserMapping/new-role-user-mapping/new-role-user-mapping.component';
import { BranchUserMappingComponent } from './branchUserMapping/branch-user-mapping/branch-user-mapping.component';
import { NewBranchUserMappingComponent } from './branchUserMapping/new-branch-user-mapping/new-branch-user-mapping.component';
import { ViewBranchUserMappingComponent } from './branchUserMapping/view-branch-user-mapping/view-branch-user-mapping.component';
import { GeneralMasterComponent } from './generalMaster/general-master/general-master.component';
import { CodeTypeMasterComponent } from './codeTypeMaster/code-type-master/code-type-master.component';
import { NewCodeTypeMasterComponent } from './codeTypeMaster/new-code-type-master/new-code-type-master.component';
import { ViewCodeTypeMasterComponent } from './codeTypeMaster/view-code-type-master/view-code-type-master.component';
import { FinancialYearComponent } from './financialYear/financial-year/financial-year.component';
import { ViewFinancialYearComponent } from './financialYear/view-financial-year/view-financial-year.component';
import { NewFinancialYearComponent } from './financialYear/new-financial-year/new-financial-year.component';

import { SubCityMasterComponent } from './subCityMaster/sub-city-master/sub-city-master.component';
import { NewSubCityMasterComponent } from './subCityMaster/new-sub-city-master/new-sub-city-master.component';
import { ViewSubCityMasterComponent } from './subCityMaster/view-sub-city-master/view-sub-city-master.component';
import { GenralmasterListComponent } from './generalMaster/genralmaster-list/genralmaster-list.component';
import { UpdateGenMasterListComponent } from './generalMaster/genralmaster-list/update-gen-master-list/update-gen-master-list.component';
import { VendorMasterComponent } from './vendorMaster/vendor-master/vendor-master.component';
import { CreateVendorMasterComponent } from './vendorMaster/create-vendor-master/create-vendor-master.component';
import { ViewVendorMasterComponent } from './vendorMaster/view-vendor-master/view-vendor-master.component';
import { CustomerGroupComponent } from './customerGroup/customer-group/customer-group.component';
import { NewCustomerGroupComponent } from './customerGroup/new-customer-group/new-customer-group.component';
import { ViewCustomerGroupComponent } from './customerGroup/view-customer-group/view-customer-group.component';
import { CustomerMasterListComponent } from './customer-master/customer-master-list/customer-master-list.component';
import { NewCustomerMasterComponent } from './customer-master/new-customer-master/new-customer-master.component';
import { CngrCngeMasterListComponent } from './consignorConsigneeMaster/cngr-cnge-master-list/cngr-cnge-master-list.component';
import { NewCngrCngeMasterComponent } from './consignorConsigneeMaster/new-cngr-cnge-master/new-cngr-cnge-master.component';
import { AddressMasterComponent } from './addressMaster/address-master/address-master.component';
import { NewAddressMasterComponent } from './addressMaster/new-address-master/new-address-master.component';
import { ViewAddressMasterComponent } from './addressMaster/view-address-master/view-address-master.component';
import { DriverMasterComponent } from './driver-master/driver-master/driver-master.component';
import { CreateDriverMasterComponent } from './driver-master/create-driver-master/create-driver-master.component';
import { NewOwnerMasterComponent } from './ownerMaster/new-owner-master/new-owner-master.component';
import { OwnerMasterListComponent } from './ownerMaster/owner-master-list/owner-master-list.component';
import { TdsRateMasterComponent } from './TdsRateMaster/tds-rate-master/tds-rate-master.component';
import { LaneMasterListComponent } from './laneMaster/lane-master-list/lane-master-list.component';
import { NewLandMasterComponent } from './laneMaster/new-land-master/new-land-master.component';
import { ViewLandMasterComponent } from './laneMaster/view-land-master/view-land-master.component';
import { ViewCustomerMasterComponent } from './customer-master/view-customer-master/view-customer-master.component';
import { CreateMainAndSubEventMasterComponent } from './eventMaster/MainAndSubEventMaster/create-main-and-sub-event-master/create-main-and-sub-event-master.component';
import { MainAndSubEventMasterListComponent } from './eventMaster/MainAndSubEventMaster/main-and-sub-event-master-list/main-and-sub-event-master-list.component';
import { CreateEventMappingMasterComponent } from './eventMaster/eventMappingMaster/create-event-mapping-master/create-event-mapping-master.component';
import { EventMappingMasterListComponent } from './eventMaster/eventMappingMaster/event-mapping-master-list/event-mapping-master-list.component';
import { ViewEventMappingMasterComponent } from './eventMaster/eventMappingMaster/view-event-mapping-master/view-event-mapping-master.component';
import { EventReasonMasterListComponent } from './eventMaster/eventReasonMaster/event-reason-master-list/event-reason-master-list.component';
import { RouteMasterListComponent } from './routeMaster/route-master-list/route-master-list.component';
import { ViewRouteMasterComponent } from './routeMaster/view-route-master/view-route-master.component';
import { CreateVehicleMasterComponent } from './vehicleMaster/create-vehicle-master/create-vehicle-master.component';
import { VehicleMasterListComponent } from './vehicleMaster/vehicle-master-list/vehicle-master-list.component';
import { ViewVehicleMasterComponent } from './vehicleMaster/view-vehicle-master/view-vehicle-master.component';
import { EventMasterComponent } from './eventMaster/eventmaster/event-master/event-master.component';
import { CreateEventMasterComponent } from './eventMaster/eventmaster/create-event-master/create-event-master.component';
import { CustomerContactMasterComponent } from './customerContractMaster/customer-contact-master/customer-contact-master.component';
import { CreateRouteMasterComponent } from './routeMaster/create-route-master/create-route-master.component';
import { LanePriorityListComponent } from './lanePriority/lane-priority-list/lane-priority-list.component';
import { ViewLanePriorityListComponent } from './lanePriority/view-lane-priority-list/view-lane-priority-list.component';
import { ContractBasicInfoComponent } from './customerContractMaster/contract-basic-info/contract-basic-info.component';
import { CreateCustomerContractMasterComponent } from './customerContractMaster/create-customer-contract-master/create-customer-contract-master.component';
import { CustomerContactMasterListComponent } from './customerContractMaster/customer-contact-master-list/customer-contact-master-list.component';
import { UpdateLanePriorityComponent } from './lanePriority/update-lane-priority/update-lane-priority.component';
import { ClaimTypeComponent } from './claimType/claim-type/claim-type.component';
import { VehicleLoadComponentComponent } from './vehicleLoadAbility/vehicle-load-component/vehicle-load-component.component';
import { CustomerMisComponent } from './customer-mis/customer-mis.component';
import { RateUpdateListComponent } from './customerContractMaster/rate-update-list/RateUpdateListComponent';
import { RateUpdateComponent } from './customerContractMaster/rate-update/rate-update.component';
import { CreateTdsRateDifferentialMasterComponent } from './TDSAutomation/create-tds-rate-differential-master/create-tds-rate-differential-master.component';
import { TdsRateDifferentialMasterComponent } from './TDSAutomation/tds-rate-differential-master/tds-rate-differential-master.component';
import { LoadAbilityMappingComponent } from './LoadAbilityMapping/load-ability-mapping/load-ability-mapping.component';
import { LabourMasterComponent } from './customerContractMaster/labourMaster/labour-master/labour-master.component';
import { CreateRouteRateMasterComponent } from './routeRateMaster/create-route-rate-master/create-route-rate-master.component';
import { RouteRateMasterComponent } from './routeRateMaster/route-rate-master/route-rate-master.component';
import { UpperCaseDirective } from 'src/app/shared/directive/uppercaseDirective';
import { NgxPaginationModule } from 'ngx-pagination';
import { RateApprovalComponent } from './customerContractMaster/contractManagementApproved/rate-approval/rate-approval.component';
import { RateApprovalListComponent } from './customerContractMaster/contractManagementApproved/rate-approval-list/rate-approval-list.component';
import { LabourMasterApprovedComponent } from './customerContractMaster/contractManagementApproved/labour-master-approved/labour-master-approved.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TitleCaseDirective } from 'src/app/shared/directive/titleCaseDirective';
import { CreateMappingAverageMatrixComponent } from './routeRateMaster/create-mapping-average-matrix/create-mapping-average-matrix.component';
import { CreateGroupMasterComponent } from './routeRateMaster/groupMaster/create-group-master/create-group-master.component';
import { GroupMasterListComponent } from './routeRateMaster/groupMaster/group-master-list/group-master-list.component';
import { GroupMasterViewComponent } from './routeRateMaster/groupMaster/group-master-view/group-master-view.component';
import { MappingAverageMatrixComponent } from './routeRateMaster/mapping-average-matrix/mapping-average-matrix.component';
import { ManageSopComponent } from './SOP/manage-sop/manage-sop.component';
import { UploadSopComponent } from './SOP/upload-sop/upload-sop.component';
import { TestssrsComponent } from './SSRS/testssrs/testssrs.component';
import { ViewManageComponent } from './SOP/view-manage/view-manage.component';


@NgModule({
  declarations: [
    Master1Component,
    CountryMasterComponent,
    CreateNewComponent,
    ViewCountryMasterComponent,
    StateMasterComponent,
    NewStateMasterComponent,
    ViewStateMasterComponent,
    CityMasterComponent,
    NewCityMasterComponent,
    PinCodeComponent,
    BranchComponent,
    NewBranchComponent,
    ViewBranchComponent,
    ZoneComponent,
    CompanyMasterComponent,
    DivisionMasterComponent,
    UserMasterComponent,
    ViewUserMasterComponent,
    NewUserMasterComponent,
    UserBranchMappingComponent,
    RoleMasterComponent,
    RoleUserMappingComponent,
    ViewCityMasterComponent,
    NewPincodeComponent,
    ViewPinCodeComponent,
    ViewCompanyMasterComponent,
    NewCompanyMasterComponent,
    NewDivisionMasterComponent,
    ViewDivisionMasterComponent,
    NewZoneComponent,
    ViewZoneComponent,
    ViewBranchComponent,
    BranchMasterComponent,
    ViewBranchMasterComponent,
    NewBranchMasterComponent,
    IsActiveFilterPipe,
    ClusterMasterComponent,
    ViewClusterMasterComponent,
    NewClusterMasterComponent,
    NewSubClusterMasterComponent,
    ViewSubClusterMasterComponent,
    SubClusterMasterComponent,
    MenuMasterComponent,
    NewMenuMasterComponent,
    ViewMenuMasterComponent,
    CreateDepartmentMasterComponent,
    DepartmentMasterComponent,
    ModuleMasterComponent,
    CreateModuleMasterComponent,
    CreateRoleMasterComponent,
    MenuAccessMasterComponent,
    CreateMenuAccessMasterComponent,
    ClusterMappingComponent,
    ViewClusterMappingComponent,
    NewClusterMappingComponent,
    ViewRoleUserMappingComponent,
    NewRoleUserMappingComponent,
    BranchUserMappingComponent,
    NewBranchUserMappingComponent,
    ViewBranchUserMappingComponent,
    GeneralMasterComponent,
    CodeTypeMasterComponent,
    NewCodeTypeMasterComponent,
    ViewCodeTypeMasterComponent,
    FinancialYearComponent,
    ViewFinancialYearComponent,
    NewFinancialYearComponent,
    VendorMasterComponent,
    SubCityMasterComponent,
    NewSubCityMasterComponent,
    ViewSubCityMasterComponent,
    GenralmasterListComponent,
    UpdateGenMasterListComponent,
    CreateVendorMasterComponent,
    ViewVendorMasterComponent,
    CustomerGroupComponent,
    NewCustomerGroupComponent,
    ViewCustomerGroupComponent,
    CustomerMasterListComponent,
    NewCustomerMasterComponent,
    CngrCngeMasterListComponent,
    NewCngrCngeMasterComponent,
    AddressMasterComponent,
    NewAddressMasterComponent,
    ViewAddressMasterComponent,
    DriverMasterComponent,
    CreateDriverMasterComponent,
    NewOwnerMasterComponent,
    OwnerMasterListComponent,
    TdsRateMasterComponent,
    LaneMasterListComponent,
    NewLandMasterComponent,
    ViewLandMasterComponent,
    ViewCustomerMasterComponent,
    EventReasonMasterListComponent,
    ViewEventMappingMasterComponent,
    CreateEventMappingMasterComponent,
    EventMappingMasterListComponent,
    CreateMainAndSubEventMasterComponent,
    MainAndSubEventMasterListComponent,
    ViewVehicleMasterComponent,
    CreateVehicleMasterComponent,
    VehicleMasterListComponent,
    ViewRouteMasterComponent,
    RouteMasterListComponent,
    EventMasterComponent,
    CreateEventMasterComponent,
    CustomerContactMasterComponent,
    CreateRouteMasterComponent,
    LanePriorityListComponent,
    ViewLanePriorityListComponent,
    CustomerContactMasterListComponent,
    CreateCustomerContractMasterComponent,
    ContractBasicInfoComponent,
    UpdateLanePriorityComponent,
    ClaimTypeComponent,
    VehicleLoadComponentComponent,
    CustomerMisComponent,
    RateUpdateListComponent,
    RateUpdateComponent,
    CreateTdsRateDifferentialMasterComponent,
    TdsRateDifferentialMasterComponent,
    LoadAbilityMappingComponent,
    LabourMasterComponent,
    RouteRateMasterComponent,
    CreateRouteRateMasterComponent,
    UpperCaseDirective,
    RateApprovalComponent,
    RateApprovalListComponent,
    LabourMasterApprovedComponent,
    TitleCaseDirective,
    GroupMasterViewComponent,
    CreateGroupMasterComponent,
    GroupMasterListComponent,
    CreateMappingAverageMatrixComponent,
    MappingAverageMatrixComponent,
    ManageSopComponent,
    UploadSopComponent,
    TestssrsComponent,
    ViewManageComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    MasterRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class MasterModule { }
