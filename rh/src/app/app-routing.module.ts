import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './components/cadastro/ficha/ficha.component';
import { PainelConfigComponent } from './components/config/painel-config/painel-config.component';
import { GerarPdfPerfilComponent } from './components/home/gerar-pdf-perfil/gerar-pdf-perfil.component';
import { GerarPdfTotalComponent } from './components/home/gerar-pdf-total/gerar-pdf-total.component';
import { TabelaColaboradoresComponent } from './components/home/tabela-colaboradores/tabela-colaboradores.component';
import { LoginComponent } from './components/login/login.component';
import { FichaUpdateComponent } from './components/update/ficha-update/ficha-update.component';
import { PainelComponent } from './components/update/painel/painel.component';


const routes: Routes = [

  {path:"", component:  LoginComponent},
  {path:":idUser/home", component:  TabelaColaboradoresComponent},
  
  {path:":idUser/update/:id", component: FichaUpdateComponent},
 
  {path:":idUser/add", component:  FichaComponent},
  {path:":idUser/painel/:id", component:  PainelComponent},
  {path:":idUser/pdf/:id", component:  GerarPdfPerfilComponent},
  {path:":idUser/config", component: PainelConfigComponent},
  {path:":idUser/pdf-perfil/:id", component: GerarPdfPerfilComponent},
  {path:":idUser/gerador", component: GerarPdfTotalComponent},
 


   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
