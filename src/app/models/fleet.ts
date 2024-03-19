export class commonProperties {
    createdBy: Number | undefined;
    updatedBy: Number | undefined;
}
export class MainCat extends commonProperties {
 
    catId:Number | undefined
    catName: string | undefined
    catDescription:  string | undefined
    isActive: Boolean | undefined
}
export class SubCategory extends commonProperties {
 
    catId:Number | undefined
    subCatName: string | undefined
    subCatDescription:  string | undefined
    isActive: Boolean | undefined
 
 
}
export class Remarks extends commonProperties {
 
    subCatID:Number | undefined
    remarks: string | undefined
    isActive: Boolean | undefined
 
}