//response schema for rest api
export class AuthResponse{
    constructor(
        public username:string,
        public token:string,
        public empid:string
        ){}
}