import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentityRole } from './task';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseURL: string = 'https://localhost:7239/Administration';
  private accountURL: string = 'https://localhost:7239/Account';
  constructor(private httpService: HttpClient) {}

  public getRoles(): Observable<IdentityRole[]> {
    return this.httpService.get<IdentityRole[]>(this.baseURL + '/GetRoles');
  }

  public postRole(rolename: string): void {
    const role = {
      roleName: rolename,
    };
    this.httpService.post(this.baseURL, role).subscribe();
  }

  public updateRole(roleToFind: string, roleName: string) {
    const role = {
      roleName: roleToFind,
    };

    return this.httpService.put(this.baseURL + `?roleName=${roleName}`, role);
  }

  public setRole(email: string, role: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      email: email,
      role: role,
    };
    this.httpService
      .post(this.accountURL + `/SetRole?email=${email}&role=${role}`, body, {
        headers: headers,
      })
      .subscribe();
  }

  public getUserRoles(name: string): Observable<string[]> {
    return this.httpService.get<string[]>(
      this.accountURL + `GetUserRoles?name=${name}`
    );
  }
}
