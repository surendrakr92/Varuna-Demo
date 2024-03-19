export class commonProperties {
    createdBy: Number | undefined;
    updatedBy: Number | undefined;
}
export class MvVehicleList extends commonProperties{
    vehicleNo: string | undefined
    locationId:Number | undefined
    isActive: Boolean | undefined
    unionVehId:Number | undefined
}