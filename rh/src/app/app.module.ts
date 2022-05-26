import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FichaComponent } from './components/cadastro/ficha/ficha.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { FichaUpdateComponent } from './components/update/ficha-update/ficha-update.component';
import { TextMaskModule } from 'angular2-text-mask';
import { TabelaColaboradoresComponent } from './components/home/tabela-colaboradores/tabela-colaboradores.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { PainelComponent } from './components/update/painel/painel.component';
import { ArquivosComponent } from './components/update/arquivos/arquivos.component';
import { ConfigPerfilComponent } from './components/update/config-perfil/config-perfil.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { AniversariosComponent } from './components/home/aniversarios/aniversarios.component';
import { GerarPdfPerfilComponent } from './components/home/gerar-pdf-perfil/gerar-pdf-perfil.component';
import { PainelConfigComponent } from './components/config/painel-config/painel-config.component';
import { ArquivosConfigComponent, DeleteArquivoDialog, EditArquivoDialog } from './components/config/arquivos-config/arquivos-config.component';
import { DeleteVinculoDialog, EditVinculoDialog, VinculosComponent } from './components/config/vinculos/vinculos.component';
import { DeleteSetorDialog, EditSetorDialog, SetoresComponent } from './components/config/setores/setores.component'
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ToastrModule } from 'ngx-toastr';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatRadioModule} from '@angular/material/radio';
import { SearchfilterPipe } from './searchfilter.pipe';
import { TotalComponent } from './components/gerador-pdf/total/total.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UsuariosComponent } from './components/config/usuarios/usuarios.component';
import { RegistroAtividadeComponent } from './components/config/registro-atividade/registro-atividade.component';
import { LoginComponent } from './components/login/login.component';
import { SearchfilterPipe2 } from './searchfilter2.pipe';
import { ListaUsuariosComponent } from './components/config/lista-usuarios/lista-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    FichaComponent,
    FichaUpdateComponent,
    TabelaColaboradoresComponent,
    PainelComponent,
    ArquivosComponent,
    ConfigPerfilComponent,
    AniversariosComponent,
    GerarPdfPerfilComponent,
    PainelConfigComponent,
    ArquivosConfigComponent,
    VinculosComponent,
    SetoresComponent,
    SearchfilterPipe,
    SearchfilterPipe2,
    TotalComponent,
    EditVinculoDialog,
    DeleteVinculoDialog,
    DeleteSetorDialog,
    EditSetorDialog,
    DeleteArquivoDialog,
    UsuariosComponent,
    EditArquivoDialog,
    RegistroAtividadeComponent,
    LoginComponent,
    ListaUsuariosComponent
    
  ],
  imports: [
    MatTooltipModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MatExpansionModule,
    MatGridListModule,
    MatTabsModule,
    BrowserModule, 
    FormsModule, 
    MatFormFieldModule,
    MatDialogModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ClipboardModule,
    BrowserModule,
    MatSlideToggleModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatStepperModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    TextMaskModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
