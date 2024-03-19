import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndentRoutes } from 'src/app/shared/Routes/indentRoutes';

const routes: Routes = IndentRoutes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndentManagementRoutingModule { }
