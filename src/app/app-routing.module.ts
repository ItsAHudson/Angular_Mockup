import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CfmComponent } from './cfm/cfm.component';
import { HomeComponent } from './home/home.component';
import { CFMEditComponent } from './cfm-edit/cfm-edit.component';
import { CFMHistoryComponent } from './cfm-history/cfm-history.component';
import { TransactionMonitoringComponent } from './transaction-monitoring/transaction-monitoring.component';



const routes: Routes = [
  //This is where different html pages are assigned their respective values
  { path: '', component: HomeComponent },
  { path: 'cfm', component: CfmComponent },
  { path: 'edit', component: CFMEditComponent },
  { path: 'history', component: CFMHistoryComponent },
  { path: 'transaction-monitoring', component: TransactionMonitoringComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
