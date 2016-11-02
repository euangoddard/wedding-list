
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { LoginComponent } from "./login/login.component";
import { AdminListComponent } from "./admin-list/admin-list.component";
import { IdentifyComponent } from "./identify/identify.component";

import { IdentifyGuard } from "./shared/identity/identify.guard";
import { AuthGuard } from "./shared/auth/auth.guard.service";


const ROUTES: Routes = [
  {path: '', component: ListComponent, canActivate: [AuthGuard, IdentifyGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'identify', component: IdentifyComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminListComponent, canActivate: [AuthGuard, IdentifyGuard]},
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);