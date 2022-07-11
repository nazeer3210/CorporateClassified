import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthResponse } from "../model/authResponse";
import { Offer } from "../model/Offer";
import { Employee } from "../model/Employee";
import { messageResponse } from '../model/messageResponse';

@Injectable({
  providedIn: 'root'
})

//service to call all the microservice
export class ConfigService {

  //authentication microservice
  loginserviceUrl = "https://localhost:44305/api/Authenticate"

  //offer microservice
  offerserviceUrl = "https://localhost:44389/api/Offer"

  //employee microservice
  employeeserviceUrl = "https://localhost:44351/api/Employee"

  //points microservice
  pointsserviceUrl = "https://localhost:44385/api/Points"

  constructor(private http: HttpClient) { }

  //------------------------authentication microservice calls -----------------------
  //retrieve token after login
  getUserToken(empDetails: any) {
    return this.http.post<AuthResponse>(this.loginserviceUrl, empDetails);
  }



  //--------------------offer microservice calls --------------------------------
  //get offers by category
  getOffers(token: string, category: string) {
    let options = {
      headers: { "Authorization": "Bearer " + token}
    }
    return this.http.get<Offer[]>(this.offerserviceUrl + "/GetOfferByCategory/" + category, options)
  }

  //get offers by top likes ( top 3 offers)
  getOffersByTopLikes(token: string) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.get<Offer[]>(this.offerserviceUrl + "/GetOfferByTopThreeLikes", options)
  }

  //get offers by posted date
  getOffersByOpenedDate(token: string, OpenedDate: string) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.get<Offer[]>(this.offerserviceUrl + "/GetOfferByOpenedDate/" + OpenedDate, options)
  }

  //get offer details for a particular offer
  getOfferDetailsById(token: string, id: number) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.get<Offer>(this.offerserviceUrl + "/GetOfferDetails/" + id, options)
  }

  //update the offer details 
  updateOffer(token: String, offer: Offer) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.post<messageResponse>(this.offerserviceUrl + '/editOffer', offer, options)
  }

  //add a new offer
  addOffer(token: String, offer: Offer) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.post<messageResponse>(this.offerserviceUrl + "/PostOffer", offer, options)
  }

  //engage an offer
  engageOffer(token: String, offerId: number, empId: number) {
    let options = {
      headers: { "Authorization": "Bearer " + token },
      params: { "offerId": offerId, "employeeId": empId }
    }
    return this.http.post<messageResponse>(this.offerserviceUrl + "/engageOffer", null, options)
  }



  //---------------------------------employee microservice calls -------------------------------
  //save the like of the user
  saveLike(token: string, id: number) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.post(this.employeeserviceUrl + "/likeOffer/" + id, null, options)
  }

  //get the profile of the user
  getProfile(token: String, id: number) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.get<Employee>(this.employeeserviceUrl + "/viewProfile/" + id, options)
  }

  //retrive all the offers of the user
  getMyOffers(token: String, id: number) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.get<Offer[]>(this.employeeserviceUrl + "/viewEmployeeOffers/" + id, options)
  }

  //retrived user's recently liked posts
  getRecentlyLiked(token: string) {
    let options = {
      headers: { "Authorization": "Bearer " + token },
    }
    return this.http.get<Offer[]>(this.employeeserviceUrl + "/recentlyLiked", options)
  }



  //---------------------------------points microservice calls ----------------------------------
  //refresh the points of the user
  updatePoints(token: String, id: number) {
    let options = {
      headers: { "Authorization": "Bearer " + token }
    }
    return this.http.post<messageResponse>(this.pointsserviceUrl + "/refreshpointsbyemp/" + id, null, options)
  }

}