import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs';
import {
  DadosBancarios,
  DadosPessoais,
  DadosProfissionais,
  DadosEstadoCivil,
  Dependentes,
  Setores,
  Vinculos,
  Matriculas,
  SituacaoColaborador,
  TiposDocumentos,
  DocumentosColaboradores,
  CEP,
  Usuarios,
  RegistroAtividade,
  RegistroAtividadeCadastro,
  Email,
  ConfiguracaoSistema,
  FotoColaborador,
  Logo,
} from './siscrh';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SiscrhService {
  constructor(private httpClient: HttpClient) {}

  url: any = 'http://localhost:8080/api';
  url2: any = 'http://localhost:8080';

  getCEP(cep: String): Observable<CEP> {
    return this.httpClient.get<CEP>(`https://viacep.com.br/ws/${cep}/json`);
  }

  getColaboradorList(): Observable<DadosPessoais[]> {
    return this.httpClient.get<DadosPessoais[]>(this.url + `/v1/dados`);
  }

  createColaborador(colaborador: DadosPessoais): Observable<Object> {
    return this.httpClient.post(this.url + `/v1/dados`, colaborador);
  }

  getColaboradorById(id: number): Observable<DadosPessoais> {
    return this.httpClient.get<DadosPessoais>(this.url + `/v1/dados/${id}`);
  }

  getColaboradorByCPF(cpf: String): Observable<DadosPessoais> {
    return this.httpClient.get<DadosPessoais>(this.url + `/v1/dados1/${cpf}`);
  }

  createEstadoCivil(colaborador: DadosEstadoCivil): Observable<Object> {
    return this.httpClient.post(this.url + `/v2/dados`, colaborador);
  }

  getEstadoCivilByForeignKey(id: number): Observable<DadosEstadoCivil> {
    return this.httpClient.get<DadosEstadoCivil>(this.url + `/v2/dados/${id}`);
  }

  createDadosProfissionais(
    colaborador: DadosProfissionais
  ): Observable<Object> {
    return this.httpClient.post(this.url + `/v6/dados`, colaborador);
  }
  getDadosProfissionaisByForeignKey(
    id: number
  ): Observable<DadosProfissionais> {
    return this.httpClient.get<DadosProfissionais>(
      this.url + `/v6/dados/${id}`
    );
  }

  getDocumentosColaboradorByForeignKey(
    id: number
  ): Observable<DocumentosColaboradores[]> {
    return this.httpClient.get<DocumentosColaboradores[]>(
      this.url + `/v27/dados/${id}`
    );
  }

  createDadosBancarios(colaborador: DadosBancarios): Observable<Object> {
    return this.httpClient.post(this.url + `/v4/dados`, colaborador);
  }

  getDadosBancariosByForeignKey(id: number): Observable<DadosBancarios> {
    return this.httpClient.get<DadosBancarios>(this.url + `/v4/dados/${id}`);
  }

  createDependentes(colaborador: Dependentes): Observable<Object> {
    return this.httpClient.post(this.url + `/v3/dados`, colaborador);
  }

  createArquivo(formData: FormData, id: number): Observable<Object> {
    return this.httpClient.post(this.url + `/fotos/${id}`, formData);
  }
  downloadArquivo(id: any, nome: any) {
    window.location.href = this.url +`/fotos/download/${id}/${nome}`;
  }

  deleteArquivo(id: any, idDocu: any) {
    return this.httpClient.get<DocumentosColaboradores[]>(
      this.url +`/fotos/delete/${id}/${idDocu}`
    );
  }

  getDependentesByForeignKey(id: number): Observable<Dependentes> {
    return this.httpClient.get<Dependentes>(this.url + `/v3/dados/${id}`);
  }

  getSetoresList(): Observable<Setores[]> {
    return this.httpClient.get<Setores[]>(this.url + `/v10/dados`);
  }
  getSetoresByForeignKey(id: number): Observable<Setores> {
    return this.httpClient.get<Setores>(this.url + `/v10/dados/${id}`);
  }

  getVinculosList(): Observable<Vinculos[]> {
    return this.httpClient.get<Vinculos[]>(this.url + `/v11/dados`);
  }
  getVinculosByForeignKey(id: number): Observable<Vinculos> {
    return this.httpClient.get<Vinculos>(this.url + `/v11/dados/${id}`);
  }
  deleteVinculo(id: number) {
    this.httpClient.delete(this.url + `/v11/dados/${id}`).subscribe(
      (data) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
  }

  deleteSetores(id: number) {
    this.httpClient.delete(this.url + `/v10/dados/${id}`).subscribe(
      (data) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
  }

  createVinculo(colaborador: Vinculos): Observable<Object> {
    return this.httpClient.post(this.url + `/v11/dados`, colaborador);
  }

  createSetor(colaborador: Setores): Observable<Object> {
    return this.httpClient.post(this.url + `/v10/dados`, colaborador);
  }
  createMatricula(colaborador: Matriculas): Observable<Object> {
    return this.httpClient.post(this.url + `/v12/dados`, colaborador);
  }
  getMatriculasByForeignKey(id: number): Observable<Dependentes> {
    return this.httpClient.get<Dependentes>(this.url + `/v12/dados/${id}`);
  }

  getDadosProfissionaisList(): Observable<DadosProfissionais[]> {
    return this.httpClient.get<DadosProfissionais[]>(this.url + `/v6/dados`);
  }

  createSituacaoColaborador(
    colaborador: SituacaoColaborador
  ): Observable<Object> {
    return this.httpClient.post(this.url + `/v20/dados`, colaborador);
  }

  createDocumento(colaborador: TiposDocumentos): Observable<Object> {
    return this.httpClient.post(this.url + `/v26/dados`, colaborador);
  }

  getDocumentosList(): Observable<TiposDocumentos[]> {
    return this.httpClient.get<TiposDocumentos[]>(this.url + `/v26/dados`);
  }

  deleteDocumento(id: number) {
    this.httpClient.delete(this.url + `/v26/dados/${id}`).subscribe(
      (data) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
  }

  getDocumentosColaboradoresList(): Observable<DocumentosColaboradores[]> {
    return this.httpClient.get<DocumentosColaboradores[]>(
      this.url + `/v27/dados`
    );
  }

  createDocumentosColaborador(
    colaborador: DocumentosColaboradores
  ): Observable<Object> {
    return this.httpClient.post(this.url + `/v27/dados`, colaborador);
  }

  createUsuario(colaborador: Usuarios): Observable<Object> {
    return this.httpClient.post(this.url + `/v2/usuarios`, colaborador);
  }

  getUsuarioList(): Observable<Usuarios[]> {
    return this.httpClient.get<Usuarios[]>(this.url + `/v2/usuarios`);
  }

  deleteUsuario(id: number) {
    return this.httpClient.delete(this.url + `/v2/usuarios/${id}`).subscribe(
      (data) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
  }

  getRegistroAtividadeList(): Observable<RegistroAtividade[]> {
    return this.httpClient.get<RegistroAtividade[]>(
      this.url + `/v27/registros`
    );
  }

  createRegistroAtividade(
    colaborador: RegistroAtividadeCadastro
  ): Observable<Object> {
    return this.httpClient.post(this.url + `/v27/registros`, colaborador);
  }

  getRegistroAtividadeByForeignKey(
    id: number
  ): Observable<RegistroAtividadeCadastro> {
    return this.httpClient.get<RegistroAtividadeCadastro>(
      this.url + `/v27/registros/${id}`
    );
  }

  verificarUser(usuario: any, senha: any): Observable<Usuarios> {
    return this.httpClient.get<Usuarios>(
      this.url + `/v2/usuarios2/usuario=${usuario}&senha=${senha}`
    );
  }

  getUsuarioById(id: number): Observable<Usuarios> {
    return this.httpClient.get<Usuarios>(this.url + `/v2/usuarios/${id}`);
  }

  getUsuarioCAndUsuarioUListById(
    id: number
  ): Observable<RegistroAtividadeCadastro[]> {
    return this.httpClient.get<RegistroAtividadeCadastro[]>(
      this.url + `/v27/registrosC/${id}`
    );
  }

  salvarConfiguracaoSistema(
    colaborador: ConfiguracaoSistema
  ): Observable<Object> {
    return this.httpClient.post(this.url + `/v31/configuracao`, colaborador);
  }

  getConfiguracaoSistema(): Observable<ConfiguracaoSistema[]> {
    return this.httpClient.get<ConfiguracaoSistema[]>(
      this.url + `/v31/configuracao`
    );
  }

 

  enviarEmailRhAtivar(id: number): Observable<DadosProfissionais> {
    return this.httpClient.get<DadosProfissionais>(
      this.url + `/v30/rhAtivar/${id}`
    );
  }
  enviarEmailRhDesativar(id: number): Observable<DadosProfissionais> {
    return this.httpClient.get<DadosProfissionais>(
      this.url + `/v30/rhDesativar/${id}`
    );
  }
  enviarEmailInformaticaAtivo(id: number): Observable<DadosProfissionais> {
    return this.httpClient.get<DadosProfissionais>(
      this.url + `/v30/informaticaAtivo/${id}`
    );
  }
  enviarEmailInformaticaDesativo(id: number): Observable<DadosProfissionais> {
    return this.httpClient.get<DadosProfissionais>(
      this.url + `/v30/informaticaDesativo/${id}`
    );
  }

 

  uploadFotoColaborador(image: FormData, idColab:any): Observable<Object> {
    return this.httpClient.post(this.url + `/v305/upload/image/${idColab}`, image);
  }


  getFotoInfo(idColab:any): Observable<FotoColaborador[]>{
    return this.httpClient.get<FotoColaborador[]>(
      this.url + `/v305/get/image/info/${idColab}`
    );

  }
  getLogo(): Observable<Logo> {
    return this.httpClient.get<Logo>(this.url + `/logo`);
  }

  getLogoInfo(): Observable<Logo[]>{
    return this.httpClient.get<Logo[]>(
      this.url + `/get/image/info`
    );

  }
  
  deleteLogo(): Observable<Object> {
    return this.httpClient.post(`http://localhost:8080/delete/image`, null);
  }


  uploadLogo(formData: FormData): Observable<Object> {
    return this.httpClient.post(this.url + `/upload/image`, formData);
  }


 
  deleteFotoColab(id: number) {
    return this.httpClient.delete(this.url + `/v305/delete/${id}`).subscribe(
      (data) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
  }
}
