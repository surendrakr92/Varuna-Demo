export interface User {
    token:User | null;
    username: string;
    password: string;
    refreshToken:string | undefined;
}
export class Currentuser {
   branchId:string |undefined;
   branchName:string |undefined;
   email:string |undefined;
   id:string |undefined;
   refreshToken:string |undefined
   userCode:string|undefined
   userName:string|undefined
}
