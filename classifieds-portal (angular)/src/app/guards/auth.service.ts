import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from "../model/tokenResponse";

@Injectable({
    providedIn:'root'
})

//to handle token validation
export class AuthService{

    //authentication microservice
    authserviceurl = "https://localhost:44305/api/Authenticate"

    constructor(private http:HttpClient){}

    //to check validity of the token
    isAuthenticated(token:string){
        let options={
            headers:{"Authorization":"Bearer "+token}
        }
       return this.http.get<TokenResponse>(this.authserviceurl  ,options);
    }

    //to logout the user
    logout(){
        localStorage.clear()
    }
}