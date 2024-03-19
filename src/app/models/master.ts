export class commonProperties {
    createdBy: Number | undefined;
    updatedBy: Number | undefined;
}
export class CountryMaster extends commonProperties {
    shortCode: String | undefined;
    countryName: String | undefined;
    oldDbRefCode: {} | undefined;
    isActive: String | undefined;
    countryId: any | undefined;
}
export class stateMaster extends commonProperties {
    countryId: Number | undefined;
    shortCode: String | undefined;
    stateName: String | undefined;
    stateCode: String | undefined;
    gstIn: String | undefined;
    isActive: String | undefined;
    stateId: any | undefined;
}
export class cityMaster extends commonProperties {
    cityId: Number | undefined;
    countryId: Number | undefined;
    cityName: String | undefined;
    stateId: Number | undefined;
    isActive: Boolean | undefined;
}
export class pinCodeMaster extends commonProperties {
    pincodeId: Number | undefined;
    pincode: String | undefined;
    cityId: Number | undefined;
    stateId: Number | undefined;
    countryId: Number | undefined;
}
export class companyMaster extends commonProperties {
    companyId: Number | undefined;
    cityId: Number | undefined;
    stateId: Number | undefined;
    countryId: Number | undefined;
    shortCode: String | undefined;
    companyName: String | undefined;
    addressLine1: String | undefined;
    addressLine2: String | undefined;
    isActive: String | undefined;
}
export class divisionMaster extends commonProperties {
    divisionId: Number | undefined;
    divisionCode: String | undefined;
    divisionName: String | undefined;
    isActive: boolean | undefined;
}
export class zoneMaster extends commonProperties {
    shortCode: String | undefined;
    zoneName: String | undefined;
    isActive: boolean | undefined;
    divisionId: Number | undefined;
    zoneId: Number | undefined;
}
export class branchLevel extends commonProperties {
    branchLevelName: String | undefined;
    isActive: boolean | undefined;
    branchLevelId: Number | undefined;
}

export class branchMaster extends commonProperties {
    branchCode: string | undefined;
    branchName: string | undefined;
    addressLine1: string | undefined;
    addressLine2: string | undefined;
    stdCode: string | undefined;
    telno: string | undefined;
    mobileNo: Number | undefined;
    emailId: string | undefined;
    cityId: Number | undefined;
    stateId: Number | undefined;
    zoneId: Number | undefined;
    accountbranchId: Number | undefined;
    reportTobranchId: Number | undefined;
    airService: boolean | undefined;
    railService: boolean | undefined;
    surfaceService: boolean | undefined;
    opBkg: boolean | undefined;
    opDly: Number | undefined;
    opTranship: boolean | undefined;
    isOutSourceBranch: boolean | undefined;
    isFleetHub: boolean | undefined;
    isActive: boolean | undefined;
    branchId: Number | undefined;
}

export class clusterMaster extends commonProperties {
    clusterMaster: String | undefined;
    isActive: boolean | undefined;
    clusterName: String | undefined;
    clusterId: any;
}
export class subClusterMaster extends commonProperties {
    subClusterId: String | undefined;
    subClusterName: String | undefined;
    clusterId: Number | undefined;
    isActive: boolean | undefined;
    oldDbRefCode: String | undefined;
    timeStamp: String | undefined;
}

export class menuMaster extends commonProperties {
    webPageId: Number | undefined;
    menuCaption: String | undefined;
    webPagePath: String | undefined;
    webPageName: String | undefined;
    icon: String | undefined;
    pageDescription: String | undefined;
    toolTip: String | undefined;
    subClusterName: String | undefined;
    parentId: Number | undefined;
    moduleId: Number | undefined;
    displayOrder: Number | undefined;
    deptId: Number | undefined;
    isActive: boolean | undefined;
    subMenuEntities:[] | undefined
}
export class departmentMaster extends commonProperties {
    deptId: Number | undefined;
    departmentName: String | undefined;
    darwinDeptId: string | undefined;
    isActive: boolean | undefined;
}
export class ModuleMaster extends commonProperties {
    moduleId: Number | undefined;
    moduleName: String | undefined;
    moduleImage: String | undefined;
    remarks: String | undefined;
    isActive: boolean | undefined;
}
export class RoleMaster extends commonProperties {
    roleId: Number | undefined;
    roleName: String | undefined;
    description: String | undefined;
    allowNameEdit: String | undefined;
    isActive: boolean | undefined;
}
export class MenuAccessMaster extends commonProperties {
    accessId: Number | undefined;
    webPageId: Number | undefined;
    roleId: Number | undefined;
    haveAdd: boolean | undefined;
    haveRead: boolean | undefined;
    haveUpdate: boolean | undefined;
    haveDelete: boolean | undefined;
    haveAddTCode: boolean | undefined;
    haveReadTCode: boolean | undefined;
    haveUpdateTCode: boolean | undefined;
    isActive: boolean | undefined;
    haveDeleteTCode: boolean | undefined;
}
export class userMaster extends commonProperties {
    userId: Number | undefined;
    userCode: string | undefined;
    password: string | undefined;
    userType: string | undefined;
    branchID: Number | undefined;
    name: string | undefined;
    gender: string | undefined;
    mobileno: Number | undefined;
    dob: String | undefined;
    doj: String | undefined;
    resiAddress: String | undefined;
    rollId: Number | undefined;
    emistId: String | undefined;
    emailId: String | undefined;
    phoneNo: Number | undefined;
    bankId: Number | undefined;
    bankaccNo: Number | undefined;
    ifscCode: Number | undefined;
    mobileDeviceid: Number | undefined;
    isActive: boolean | undefined;
}
export class clusterMapping extends commonProperties {
    clusterMappingId: Number | undefined;
    cityId: Number | undefined;
    clusterId: Number | undefined;
    subClusterId: Number | undefined;
    isActive: boolean | undefined;
    createdOn: String | undefined;
    updatedOn: String | undefined;
    oldDbRefCode: Number | undefined;
}
export class roleUserMaster extends commonProperties {
    roleId: Number | undefined;
    userid: Number | undefined;
    userName: String | undefined;
    defaultRole: String | undefined;
    isActive: boolean | undefined;
    roleName: String | undefined;
    updatedOn: String | undefined;
    createdOn: String | undefined;
}
export class roleUserMapping extends commonProperties {
    roleId: Number | undefined;
    userid: Number | undefined;
    mappingId: Number | undefined;
    userName: String | undefined;
    defaultRole: String | undefined;
    isActive: boolean | undefined;
    roleName: String | undefined;
    updatedOn: String | undefined;
    roles: [] | undefined;
    createdOn: String | undefined;
}
export class branchUserMapping extends commonProperties {
    branchMappingId: Number | undefined;
    branchId: Number | undefined;
    userId: Number | undefined;
    branchName: string | undefined;
    isDefaultBranch: boolean | undefined;
}

export class codeTypeMaster extends commonProperties {
    codeTypeId: Number | undefined;
    headerDesc: string | undefined;
    headerAccess: string | undefined;
    idDesc: string | undefined;
    nameDesc: string | undefined;
    isActive: boolean | undefined;
    toSupport: string | undefined;
}

export class generalMaster extends commonProperties {
    generalId: Number | undefined;
    codeTypeId: string | undefined;
    codeId: Number | undefined;
    codeDesc: string | undefined;
    codeAccess: string | undefined;
    isActive: boolean | undefined;
}
export class finYear extends commonProperties {
    startDate: string | undefined;
    endDate: string | undefined;
    isActive: boolean | undefined;
    fileName: string | undefined;
    finId: any;
}
export class subCityMaster extends commonProperties {
    subCityId: Number | undefined;
    subCityName: string | undefined;
    fleetCity: string | undefined;
    oda: boolean | undefined;
    ola: boolean | undefined;
    cityId: Number | undefined;
    stateId: Number | undefined;
    pinCodeId: Number | undefined;
    isActive: boolean | undefined;
    oldDbRefCode: Number | undefined;
    timeStamp: string | undefined;
}
export class customerGroup extends commonProperties {
    custGroupId: Number | undefined;
    groupCode: string | undefined;
    groupName: string | undefined;
    isActive: boolean | undefined;
    isMainGroup: string | undefined;
    mainGroupId: Number | undefined;
}
export class addressMaster extends commonProperties {
    addressId: Number | undefined;
    addressLine1: string | undefined;
    addressLine2: string | undefined;
    addressLine3: string | undefined;
    cityId: Number | undefined;
    stateId: Number | undefined;
    countryId: Number | undefined;
    pincodeId: Number | undefined;
    addressTypeId: Number | undefined;
    phoneNumber: string | undefined;
    emailId: string | undefined;
    latitude: Number | undefined;
    longitude: Number | undefined;
    isActive: boolean | undefined;
    isNewPickupWithoutExist: any | undefined;
    isLock: any | undefined;
    geofanceStatusId: Number | undefined;
}

export class driverMaster extends commonProperties {
    driverId: Number | undefined;
    manualDriverCode: string | undefined;
    driverName: string | undefined;
    driverDob: Date | undefined;
    driverMobileNo: string | undefined;
    driverWhatsappNo: string | undefined;
    driverQualificationId: string | undefined;
    driverMaritalStatusId: Number | undefined;
    driverReligionId: Number | undefined;
    driverEthnicityId: Number | undefined;
    driverFatherName: string | undefined;
    driverMotherName: string | undefined;
    driverFamilyContactNo: string | undefined;
    driverNeighbourContactNo: string | undefined;
    driverGuardianName: string | undefined;
    driverGuardianContactNo: string | undefined;
    driverLocationId: Number | undefined;
    driverPerAddress: string | undefined;
    driverPerCityName: string | undefined;
    driverPervillageName: string | undefined;
    driverPerpostName: string | undefined;
    driverPerthanaName: string | undefined;
    driverPerthesilName: string | undefined;
    driverPerdistrict: string | undefined;
    driverPerpin: Number | undefined;
    driverPerStateId: Number | undefined;
    driverCurAddress: string | undefined;
    driverCurCityName: string | undefined;
    driverCurVillageName: string | undefined;
    driverCurPostName: string | undefined;
    driverCurThanaName: string | undefined;
    driverCurThesilName: string | undefined;
    driverCurDistrict: string | undefined;
    driverCurPin: Number | undefined;
    driverCurStateId: Number | undefined;
    isAddressVerificationStatus: boolean | undefined;
    addressVerifiedBy: string | undefined;
    driverLicenseNo: Number | undefined;
    licensenoValidityDate: Date | undefined;
    licensenoInitialIssueDate: Date | undefined;
    islicensenoVerified: boolean | undefined;
    licensenoCurrentIssueDate: Date | undefined;
    licensenoIssueByRto: string | undefined;
    licensenoVerificationDate: Date | undefined;
    hmvIssueDate: Date | undefined;
    hmvExpiryDate: Date | undefined;
    driverAadharNo: string | undefined;
    isVerifiedAadhar: boolean | undefined;
    aadharVerificationDate: Date | undefined;
    driverPanNo: string | undefined;
    driverStatusId: Number | undefined;
    driverRejoiningDate: Date | undefined;
    driverPaymentModeId: Number | undefined;
    driverBloodGroupId: Number | undefined;
    driverNomineeName: string | undefined;
    driverGuarantorName: string | undefined;
    driverCategoryId: Number | undefined;
    driverVerificationStatus: boolean | undefined;
    remarks: string | undefined;
    driverTrainingStatus: boolean | undefined;
    driverTrainingDate: Date | undefined;
    driverTrainingGradeId: Number | undefined;
    isVarunaNextAppInstalled: boolean | undefined;
    isRegistered: boolean | undefined;
    isDriverActive: boolean | undefined;
    driverPhotoFile: string | undefined;
    driverRegistrationFile: string | undefined;
    isAddressSame: boolean | undefined; //updation
    buddyName: string | undefined;
    buddyContactNo: string | undefined;
    buddyCode: string | undefined;

    driverDetail: [] | undefined;
}
export class cngr_cnse_Master extends commonProperties {
    consiConseId: Number | undefined;
    name: string | undefined;
    phoneNo: string | undefined;
    emailId: string | undefined;
    identificationTypeId: Number | undefined;
    identificationFilePath: string | undefined;
    addressId: Number | undefined;
    isActive: Boolean | undefined;
}
//owner
export class ownerMaster extends commonProperties {
    ownerId: Number | undefined;
    name: string | undefined;
    address: string | undefined;
    cityId: Number | undefined;
    stateId: Number | undefined;
    countryId: Number | undefined;
    pincodeId: Number | undefined;
    panNo: string | undefined;
    panCardFilePath: string | undefined;
    phoneNo: string | undefined;
    bankId: Number | undefined;
    accountNo: string | undefined;
    clearingCode: string | undefined;
    swiftBIC: string | undefined;
    cancelChequePath: string | undefined;
    isActive: Boolean | undefined;
    ownerDetails: any[] | undefined;
}
export class tdsrateMaster extends commonProperties {
    //new 07 aug 202
    tdsSectionTypeId: Number | undefined;
    activeDate: Number | undefined;
    inActiveDate: Number | undefined;
    isActive: Boolean | undefined;
    tdsSectionId: Number | undefined;
}
export class tdsServiceMaster extends commonProperties {
    //new 08 aug 2023
    tdsSectionTypeId: Number | undefined;
    expenseNature: string | undefined;
    serviceTypeDescription: string | undefined;
    inactiveDate: Number | undefined;
    activeDate: Number | undefined;
    isActive: Boolean | undefined;
    serviceTypeId: Number | undefined;
}
export class laneMaster extends commonProperties {
    //new 10 aug 2023
    fromCityId: Number | undefined;
    toCityId: Number | undefined;
    loadabilityId: Number | undefined;
    ftlTypeId: Number | undefined;
    rateTypeId: Number | undefined;
    isActive: Boolean | undefined;
    laneId: Number | undefined;
}

export class rateMaster extends commonProperties {
    //new 11 aug 2023
    tdsRateId: Number | undefined;
    nonCorporateRate: Number | undefined;
    serviceType: string | undefined;
    thresHoldInvoice: Number | undefined;
    tdsSectionId: Number | undefined;
    codeDec: string | undefined;
    thresHoldAnual: string | undefined;
    corporateRate: Number | undefined;
    isActive: Boolean | undefined;
}
export class customerMaster extends commonProperties {
    custId: Number | undefined;
    custGroupId: Number | undefined;
    custName: string | undefined;
    industryTypeId: Number | undefined;
    mobileNo: Number | undefined;
    panNo: string | undefined;
    typeOfOwnerShipId: Number | undefined;
    custCategoryId: Number | undefined;
    custTypeId: Number | undefined;
    custTypeFilePath: string | undefined;
    isCustContractModeOnline: boolean | undefined;
    custStageId: Number | undefined;
    address: string | undefined;
    cityId: Number | undefined;
    pincodeId: Number | undefined;
    bankId: Number | undefined;
    acountNumber: string | undefined;
    tinNumber: string | undefined;
    billSubmissionTypeId: Number | undefined;
    isPodRequired: boolean | undefined;
    serviceOptedId: Number | undefined;
    decisionMakerEmpId: Number | undefined;
    isActive: boolean | undefined;
    isMainGroup: boolean | undefined;
    mainGroupId: Number | undefined;
    customerADD: any = customerADD;
    customerBranch: any = customerBranch;
    customerKAM: any = customerKAM;
    customerCngrCnge: any = customerCngrCnge;
    customerPayBasis: any = customerPayBasis;
}
export class customerADD {
    addressId: Number | undefined;
    isGstApplicable: boolean | undefined;
    gstNumber: string | undefined;
    isTanApplicable: boolean | undefined;
    tanNumber: string | undefined;
    isActive: boolean | undefined;
}
export class customerBranch {
    branchId: Number | undefined;
}
export class customerKAM {
    kamTypeId: Number | undefined;
    kamEmpId: Number | undefined;
    isActive: boolean | undefined;
}
export class customerCngrCnge {
    consiConseId: Number | undefined;
    isActive: boolean | undefined;
}
export class customerPayBasis {
    payBasisId: Number | undefined;
}
export class CustomerContract extends commonProperties {
    //new 14 aug 2023
    contractId: Number | undefined;
    clausegeneralId: Number | undefined;
    clauseBehaviour: string | undefined;
    isActive: Boolean | undefined;
    contractClauseId: Number | undefined;
}
export class routeMaster extends commonProperties {
    routeId: Number | undefined;
    fromCityId: Number | undefined;
    toCityId: Number | undefined;
    routeCategoryId: Number | undefined;
    routeKm: Number | undefined;
    routeStartDate: Number | undefined;
    routeEndDate: Number | undefined;
    contrlBranchId: Number | undefined;
    transitHour: Number | undefined;
    expressHour: Number | undefined;
    isTwoPointDieselAllow: Boolean | undefined;
    isEmptyAllow: Boolean | undefined;
    supperExpressHour: Number | undefined;
    isMultiPointDieselAllow: Boolean | undefined;
    isActive: Boolean | undefined;
    toSupport: string | undefined;
}

export class vehicleMaster extends commonProperties {
    vehicleDetailId:Number | undefined
    isActive: Boolean | undefined;
    vehicleTypeId: Number | undefined;
    vehicleNo: Number | 0 | undefined;
    vehicleRegNo: string | undefined;
    veicleRegDate: Number | undefined;
    vehicleChesisNo: string | undefined;
    vehicleEngineNo: string | undefined;
    vehicleFitnessValidityDate: Number | undefined;
    vehicleBranchId: Number | undefined;
    vehicleLength: string | undefined;
    vehicleHeight: Number | undefined;
    vehicleUnloadingWeight: Number | undefined;
    vehicleWeidth: Number | undefined;
    vehicleStatusId: Number | undefined;
    thcAttachedStatus: Boolean | undefined;
    isGpsDeviseEnabled: Boolean | undefined;
    vehicleFtlTypeId: Number | undefined;
    insuranceFromDate: Number | undefined;
    insuranceTypeId: Number | undefined;
    insuranceToDate: Number | undefined;
    insurancePartyNameId: Number | undefined;
    claimStatus: Boolean | undefined;
    lastClaimDate: Number | undefined;
    policyAttachmentFileName: string | undefined;
    loadInsurance: Boolean | undefined;
    vehiclePermitValidityDate: Number | undefined;
    noOfTyres: Number | undefined;
    isVehicleStatusEnabled: Boolean | undefined;
    vehicleContainerId: Number | undefined;
    oldVehicleNo: string | undefined;
    vehiclePurchaseDate: Number | undefined;
    vehiclePurchaseAmount: Number | undefined;
    vehicleSoldDate: Number | undefined;
    vehicleSaleAmount: Number | undefined;
    vehicleManufacturingYear: Number | undefined;
    vehicleModelNoId: Number | undefined;
    vehicleLoadCapacityId: Number | undefined;
    vehiclePermitValidityDateFIveYears: Number | undefined;
    vehicleTaxValidityDate: Number | undefined;
    vehicleTotalRunKm: Number | undefined;
    gpsServiceProviderId: Number | undefined;
    vehicletTrailerRegistrationNumber: Number | undefined;
    vehicleFloorTypeId: Number | undefined;
    vehicleFirstTankCapacity: Number | undefined;
    vehicleSecondTankCapacity: Number | undefined;
    noOfTank: Number | undefined;
    accidentDate: Number | undefined;
    accidentRemarks: string | undefined;
    vehicleAdblueTankCapacity: Number | undefined;
    vehicleFrontPhotoFileName: string | undefined;
    vehicleBackPhotoFileName: string | undefined;
    isVehicleActive: Boolean | undefined;
}
export class EventReasonMaster extends commonProperties {
    reasonId: Number | undefined
    descriptions: string | undefined
    subEventId: Number | undefined
    isActive: Boolean | undefined
}
export class prqRequest extends commonProperties {
    prqId:Number | undefined
    prqDt: string | undefined
    placementDt: string | undefined
    custId:Number | undefined
    orgnId: Number | undefined
    destId:Number | undefined
    modeId:Number | undefined
    ftlTypeId: Number | undefined
    pkpDlvryId:Number | undefined
    fromCityId:Number | undefined
    toCityId: Number | undefined
    prodCdId: Number | undefined
    businessType: Number | undefined
    ctrNo: Number | undefined
    payBasisId: Number | undefined
    dockNo: string | undefined
    prqStatusId: Number | undefined
    prqStatusRemarks: string | undefined
    prqStatusEntryDateTime: Number | undefined
    prqStatusReasonId: Number | undefined
    prqStatusEntryBy:Number | undefined
    isApproved: Boolean | undefined
    approvedBy: Number | undefined
    approvedDateTime: Number | undefined
    approvedReasonId:Number | undefined
    freight: Number | undefined
    freightAmt:Number | undefined
    agreedTransitDays: Number | undefined
    loadingChargesPayable: Number | undefined
    loadingRecoverable:Number | undefined
    advance: Number | undefined
    balance: Number | undefined
    balReceivedLocId: Number | undefined
    contactPersonName: string | undefined
    contactNo: string | undefined
    dalla: Number | undefined
    munshiana: Number | undefined
    commission: Number | undefined
    cashDiscount: Number | undefined
    latePenelty: Number | undefined
    firstDeliveryCityId: Number | undefined
    pickupCityId: Number | undefined
    pickupAddressid: Number | undefined
    currentStatusId: Number | undefined
    billingAddressId: Number | undefined
    brokerName: string | undefined
    brokerMobileno: string | undefined
    transName: string | undefined
    transMobileno: string | undefined
    assignVehicletypeId: Number | undefined
    primarySourceAsPerContractId: Number | undefined
    vehicleTypeLoadabilityId: Number | undefined
    rateTypeLoadId: Number | undefined
    isriskPurchase:Boolean | undefined
    noofDriver: Number | undefined
    kantaSlipName: string | undefined
    kantaWeight: Number | undefined
    borderRouteId: Number | undefined
    consigneePaymentTermsId: Number | undefined
    loadingDalaCharge: Number | undefined
    unloadingCharge: Number | undefined
    detentionClause: string | undefined
    thcCopyBhadaChitti: string | undefined
    rateDifference: Number | undefined
    remark: string | undefined
}
export class groupMaster extends commonProperties {
    groupId:Number | undefined
    groupName:string | undefined
    groupDesc:string | undefined
    isBaseGroup: Boolean | undefined
    loadedAvgPerKML: Number | undefined
    emptyAvgPerKML: Number | undefined
    baseGroupId: Number | undefined
    excessCash: Number | undefined
    cashValueTypeId: Number | undefined
    excessToll: Number | undefined
    tollValueTypeId: Number | undefined
    isActive: Boolean | undefined
}
export class UploadSOP extends commonProperties {
    sopFileId:Number | undefined
     sopFileName:string | undefined
     moduleName:string | undefined
     sopTitle:string | undefined
     sopDescription:string | undefined
     fileName:string | undefined
     customer:string | undefined
      isActive: Boolean | undefined
   }
   export class PODpfmtarget extends commonProperties {
    scanDaysId:Number | undefined
    zoneId: Number | undefined
    branchId:Number | undefined
    podScanDays:Number | undefined
    pfmScanDays:Number | undefined
    isActive: Boolean | undefined
 }