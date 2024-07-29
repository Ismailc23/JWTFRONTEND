import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/users/current-user`);
  }

  public loginGenerateToken(loginUserDto){
    return this.http.post(`${baseUrl}/auth/loginMethod`,loginUserDto);
  }

  public loginUser(token){
    localStorage.setItem("token",token);
    return true;
  }

  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=="" || tokenStr==null)
    {
      return false;
    }
    else{
      return true;
    }
  }

  public logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("customerId");
    return true;
  }

  public getToken()
  {
    return localStorage.getItem("token");
  }

  public setUser(user)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }

  public getUser()
  {
    let userStr=localStorage.getItem("user");
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  public getUserRole()
  {
    let user=this.getUser();
    return user.roles[0].name;
  }
}
