import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:7239/Account';
  constructor(
    private httpService: HttpClient //private jwthelper: JwtHelperService
  ) {}

  public registerUser(credentials: Credential): void {
    this.httpService
      .post<string>(this.baseUrl, credentials)
      .subscribe((data) => {
        localStorage.setItem('token', data);
      });
  }

  public loginUser(credentials: Credential): void {
    this.httpService
      .post<string>(this.baseUrl + '/login', credentials)
      .subscribe((data) => {
        localStorage.setItem('token', data);
      });
  }

  public logoutUser(): void {
    localStorage.removeItem('token');
  }

  private getRoles(): string {
    const token = localStorage.getItem('token');
    const parts = token.split('.');
    if (parts.length !== 3) {
      return '';
    }
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  }

  private hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  public isUser() {
    return this.hasRole('User');
  }

  public isAdmin() {
    return this.hasRole('Admin');
  }
}
