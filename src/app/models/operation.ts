export class commonProperties {
    createdBy: Number | undefined;
    updatedBy: Number | undefined;
}
 export class emptyRoute extends commonProperties {
    fromCityId:  Number | undefined
    toCityId:  Number | undefined
    movTypeId: Number | undefined
    vehicleId:  Number | undefined
    vehicleNo:string | undefined
    validFrom: string | undefined
    validTo:string | undefined
    id: any;
    }
    export class PODModule extends commonProperties {
 
        docType: Number | undefined
        docketNo:string | undefined
        documentNo:string | undefined
        scanStatus:string | undefined
        documentName:string | undefined
        documentDate:string | undefined
        isActive: Boolean | undefined
      }

      export class EwayBill extends commonProperties {
 
        docketId: Number | undefined
        ewaybillNo:string | undefined
        extExpDate:Number | undefined
        remarks:string | undefined

      }

      export class MvVehicle extends commonProperties {
        srNo:Number | undefined
        vehicleNo: Number | undefined
        blackListResion:string | undefined
     
      }
    