import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { IdentityRole } from '../task';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  rolesData: IdentityRole[];
  rolesForm: FormGroup;
  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.getRoles();
  }

  ngOnInit(): void {
    this.rolesForm = this.fb.group({
      roles: this.fb.array([]),
    });
  }

  private getRoles(): void {
    this.adminService.getRoles().subscribe((data) => {
      if (data) {
        this.rolesData = data;
        this.rolesData.forEach((role) => {
          this.addRole(role);
        });
      }
    });
  }

  addRole(roleData: IdentityRole): void {
    const roleGroup = this.fb.group({
      id: new FormControl({ value: roleData.id, disabled: true }),
      name: new FormControl(roleData.name),
    });
    (this.rolesForm.get('roles') as FormArray).push(roleGroup);
  }

  onUpdateRole(roleToFind: string, roleName: string): void {
    this.adminService.updateRole(roleToFind, roleName).subscribe((data) => {
      if (data) {
        this.getRoles();
      }
    });
  }

  openUserRoleDialog(): void {}
}
