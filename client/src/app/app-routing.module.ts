import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Other components/dashboard/dashboard.component';
import { HomeComponent } from './Other components/home/home.component';
import { RegisterComponent } from './Other components/register/register.component';
import { AuthGuard } from './_guard/auth.guard';
import { AuthFbGuard } from './_guard/auth-fb.guard';
import { UserProfileComponent } from './Other components/user-profile/user-profile.component';
import { AddProductComponent } from './Admin components/add-product/add-product.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AllOrdersComponent } from './Admin components/all-orders/all-orders.component';
import { VerificationComponent } from './Admin components/verification/verification.component';
import { NewOrderComponent } from './Consumer components/new-order/new-order.component';
import { PreviousOrdersComponent } from './Consumer components/previous-orders/previous-orders.component';
import { CurrentOrderComponent } from './Deliverer components/current-order/current-order.component';
import { MyOrdersComponent } from './Deliverer components/my-orders/my-orders.component';
import { NewOrdersComponent } from './Deliverer components/new-orders/new-orders.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'members', component: MemberListComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'all-orders', component: AllOrdersComponent},
  {path: 'verification', component: VerificationComponent},
  {path: 'new-order', component: NewOrderComponent},
  {path: 'previous-orders', component: PreviousOrdersComponent},
  {path: 'current-order', component: CurrentOrderComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'new-orders', component: NewOrdersComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];


// , canActivate: [AuthGuard, AuthFbGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
