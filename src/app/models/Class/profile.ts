export class commonProperties {
    createdBy: Number | undefined
    updatedBy: Number | undefined
}
export class fileUploadCong extends commonProperties {
    fileSatupId:Number|undefined
    webPageId: Number | undefined
    documnetTypeName:  string | undefined
    documnetTypeId:  Number | undefined
    primaryRoutePath: string | undefined
    absolutePath:string | undefined
    primaryVirtualPath: string | undefined
    archiveVirtualPath: string | undefined
    primaryAgeYear: Number | undefined
    archiveAgeYear: Number | undefined
    finalAgeYear: Number | undefined
    isLifetimeAvailable: any | undefined
    isTemporaryFolder: any | undefined
    allowFileExtensions: string | undefined
    maxFileSize:  Number | undefined
    isActive: boolean | undefined
}