import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankcomponentComponent } from 'src/layout/blankcomponent/blankcomponent.component';
import { FullcomponentComponent } from 'src/layout/fullcomponent/fullcomponent.component';
import { AuthGuard } from './helper/auth.guard';
import { moduleLevelRoutes } from './shared/Routes/fullPageAccesseedRoutes';
import { PageNotFoundComponent } from './shared/PageNotFound/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: BlankcomponentComponent,
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
   {path:'',component:FullcomponentComponent,canActivate: [AuthGuard],
  // {
  //   path: '', component: FullcomponentComponent,
    children:
      moduleLevelRoutes
  },
  {
   path:'**',component:PageNotFoundComponent
  },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
