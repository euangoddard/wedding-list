import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard.service';
import { AdminGuard } from './admin.guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AuthGuard, AdminGuard],
})
export class AuthModule { }
