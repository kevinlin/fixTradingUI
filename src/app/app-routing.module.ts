import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstrumentsComponent} from './instruments/instruments.component';
import {ParametersComponent} from './parameters/parameters.component';

const routes: Routes = [
  {path: '', redirectTo: '/instruments', pathMatch: 'full'},
  {path: 'instruments', component: InstrumentsComponent},
  {path: 'parameters', component: ParametersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
