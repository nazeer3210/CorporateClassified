//token schema for token validation api
export class TokenResponse{
    constructor(
        public EmployeeId:string,
        public valid:boolean,
        public empId:number
    ){}
}