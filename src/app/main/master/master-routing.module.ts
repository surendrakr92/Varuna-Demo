import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { masterRoutes } from 'src/app/shared/Routes/masterRoutes';

const routes: Routes = masterRoutes;
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
