import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './components/cadastro/ficha/ficha.component';
import { TabelaColaboradoresComponent } from './components/home/tabela-colaboradores/tabela-colaboradores.component';
import { FichaUpdateComponent } from './components/update/ficha-update/ficha-update.component';


const routes: Routes = [
  {path:"update/:id", component: FichaUpdateComponent},
  {path:"", component:  FichaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
