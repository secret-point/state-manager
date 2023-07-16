import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostFormComponent} from "./post-form/post-form.component";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },  { path: 'about', component: AboutComponent },
  { path: 'post/new', component: PostFormComponent },
  { path: 'post/edit/:id', component: PostFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
