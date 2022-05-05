import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './components/cadastro/ficha/ficha.component';
import { PainelConfigComponent } from './components/config/painel-config/painel-config.component';
import { GerarPdfPerfilComponent } from './components/home/gerar-pdf-perfil/gerar-pdf-perfil.component';
import { TabelaColaboradoresComponent } from './components/home/tabela-colaboradores/tabela-colaboradores.component';
import { FichaUpdateComponent } from './components/update/ficha-update/ficha-update.component';
import { PainelComponent } from './components/update/painel/painel.component';


const routes: Routes = [
  {path:"update/:id", component: FichaUpdateComponent},
  {path:"", component:  TabelaColaboradoresComponent},
  {path:"add", component:  FichaComponent},
  {path:"painel/:id", component:  PainelComponent},
  {path:"pdf/:id", component:  GerarPdfPerfilComponent},
  {path:"config", component: PainelConfigComponent},
  {path:"pdf-perfil/:id", component: GerarPdfPerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
