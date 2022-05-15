import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import {NavigacijaComponent} from './navigacija/navigacija.component'
const routes: Routes = [
  {path:'', component: NavigacijaComponent,
  children: [
    {path: 'home', component: HomeComponent},
    {path: 'products', component: ProizvodiComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
