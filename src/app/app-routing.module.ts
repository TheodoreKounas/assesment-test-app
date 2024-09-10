import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  { path: 'data-table', component: DataTableComponent },
 // { path: '', redirectTo: '/data-table', pathMatch: 'full' }, // Default route
  //{path: '**', redirectTo: '/data-table'} //wildcard Route
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
