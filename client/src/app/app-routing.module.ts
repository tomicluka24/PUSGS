import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Other_components/dashboard/dashboard.component';
import { HomeComponent } from './Other_components/home/home.component';
import { RegisterComponent } from './Other_components/register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthFbGuard } from './_guards/auth-fb.guard';
import { UserProfileComponent } from './Other_components/user-profile/user-profile.component';
import { AddProductComponent } from './Admin_components/add-product/add-product.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AllOrdersComponent } from './Admin_components/all-orders/all-orders.component';
import { VerificationComponent } from './Admin_components/verification/verification.component';
import { NewOrderComponent } from './Consumer_components/new-order/new-order.component';
import { PreviousOrdersComponent } from './Consumer_components/previous-orders/previous-orders.component';
import { CurrentOrderComponent } from './Deliverer_components/current-order/current-order.component';
import { MyOrdersComponent } from './Deliverer_components/my-orders/my-orders.component';
import { NewOrdersComponent } from './Deliverer_components/new-orders/new-orders.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { SocialUserDashboardComponent } from './Other_components/social-user-dashboard/social-user-dashboard.component';
import { AdminGuard } from './_guards/admin.guard';
import { DelivererGuard } from './_guards/deliverer.guard';
import { ConsumerGuard } from './_guards/consumer.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'members', component: MemberListComponent, canActivate: [AdminGuard]},
  {path: 'members/:username', component: MemberDetailComponent, canActivate: [AdminGuard]},
  {path: 'member-edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
  {path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard]},
  {path: 'all-orders', component: AllOrdersComponent, canActivate: [AdminGuard]},
  {path: 'verification', component: VerificationComponent, canActivate: [AdminGuard]},
  {path: 'new-order', component: NewOrderComponent, canActivate: [ConsumerGuard]},
  {path: 'previous-orders', component: PreviousOrdersComponent, canActivate: [ConsumerGuard]},
  {path: 'current-order', component: CurrentOrderComponent, canActivate: [DelivererGuard]},
  {path: 'my-orders', component: MyOrdersComponent, canActivate: [DelivererGuard]},
  {path: 'new-orders', component: NewOrdersComponent, canActivate: [DelivererGuard]},
  {path: 'social-user-dashboard', component: SocialUserDashboardComponent},
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
