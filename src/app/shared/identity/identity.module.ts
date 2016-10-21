import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityService } from './identity.service';
import { IdentifyGuard } from "./identify.guard";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [IdentityService, IdentifyGuard],
})
export class IdentityModule { }
