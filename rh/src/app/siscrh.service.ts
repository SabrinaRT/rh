import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DadosBancarios, DadosPessoais, DadosProfissionais, DadosEstadoCivil, Dependentes, Setores, Vinculos, Matriculas, SituacaoColaborador, Documentos, DocumentosColaboradores, CEP } from './siscrh';

@Injectable({
  providedIn: 'root',
})
export class SiscrhService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService
    ) {}

    getCEP(cep: String): Observable<CEP> {
      return this.httpClient.get<CEP>(
        `https://viacep.com.br/ws/${cep}/json`
      );
    }
/*   url:any = "http://10.83.1.2:8080/gprevback/api" */
url:any = "http://localhost:8080/api"
  getColaboradorList(): Observable<DadosPessoais[]> {
    return this.httpClient.get<DadosPessoais[]>(
      this.url + `/v1/dados`
    );
    
  }

  createColaborador(colaborador: DadosPessoais): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v1/dados`,
      colaborador
    );
  }

  getColaboradorById(id: number): Observable<DadosPessoais> {
    return this.httpClient.get<DadosPessoais>(
      this.url + `/v1/dados/${id}`
    );
  }

  getColaboradorByCPF(cpf: String): Observable<DadosPessoais> {
    return this.httpClient.get<DadosPessoais>(
      this.url + `/v1/dados1/${cpf}`
    );
  }

  createEstadoCivil(colaborador: DadosEstadoCivil): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v2/dados`,
      colaborador
    );
  }

  getEstadoCivilByForeignKey(id: number): Observable<DadosEstadoCivil> {
    return this.httpClient.get<DadosEstadoCivil>(
      this.url + `/v2/dados/${id}`
    );
  }


  createDadosProfissionais(colaborador: DadosProfissionais): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v6/dados`,
      colaborador
    );
  }
  getDadosProfissionaisByForeignKey(id: number): Observable<DadosProfissionais> {
    return this.httpClient.get<DadosProfissionais>(
      this.url + `/v6/dados/${id}`
    );
  }

 /*  getDocumentosColaboradorByForeignKey(id: number): Observable<DocumentosColaboradores> {
    return this.httpClient.get<DocumentosColaboradores>(
      this.url + `/v27/dados/${id}`
    );
  } */

  getDocumentosColaboradorByForeignKey(id: number): Observable<DocumentosColaboradores[]> {
    return this.httpClient.get<DocumentosColaboradores[]>(
      this.url + `/v27/dados/${id}`
    );
    
  }




  createDadosBancarios(colaborador: DadosBancarios): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v4/dados`,
      colaborador
    );
  }

  getDadosBancariosByForeignKey(id: number): Observable<DadosBancarios> {
    return this.httpClient.get<DadosBancarios>(
      this.url + `/v4/dados/${id}`
    );
  }

  createDependentes(colaborador: Dependentes): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v3/dados`,
      colaborador
    );
  }

   createArquivo(formData: FormData, id:number): Observable<Object> {
    return this.httpClient.post(
      `http://localhost:8080/fotos/${id}`,formData
      
    );
  }

  getDependentesByForeignKey(id: number): Observable<Dependentes> {
    return this.httpClient.get<Dependentes>(
      this.url + `/v3/dados/${id}`
    );
  }

  getSetoresList(): Observable<Setores[]> {
    return this.httpClient.get<Setores[]>(
      this.url + `/v10/dados`
    );
  }
  getSetoresByForeignKey(id: number): Observable<Setores> {
    return this.httpClient.get<Setores>(
      this.url + `/v10/dados/${id}`
    );
  }

  getVinculosList(): Observable<Vinculos[]> {
    return this.httpClient.get<Vinculos[]>(
      this.url + `/v11/dados`
    );
  }
  getVinculosByForeignKey(id: number): Observable<Vinculos> {
    return this.httpClient.get<Vinculos>(
      this.url + `/v11/dados/${id}`
    );
  }
  deleteVinculo(id: number) {
    this.httpClient
      .delete(this.url + `/v11/dados/${id}`)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error: any) => console.log(error)
      );
  }

   deleteDocumentoColaborador(id: number) {
    this.httpClient
      .delete(this.url + `/v27/dados/${id}`)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error: any) => console.log(error)
      );
  }

  deleteSetores(id: number) {
    this.httpClient
      .delete(this.url + `/v10/dados/${id}`)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error: any) => console.log(error)
      );
  }

  createVinculo(colaborador: Vinculos): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v11/dados`,
      colaborador
    );
  }


  createMatricula(colaborador: Matriculas): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v12/dados`,
      colaborador
    );
  }
  getMatriculasByForeignKey(id: number): Observable<Dependentes> {
    return this.httpClient.get<Dependentes>(
      this.url + `/v12/dados/${id}`
    );
  }

  getDadosProfissionaisList(): Observable<DadosProfissionais[]> {
    return this.httpClient.get<DadosProfissionais[]>(
      this.url + `/v6/dados`
    );
  }



  createSituacaoColaborador(colaborador: SituacaoColaborador): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v20/dados`,
      colaborador
    );
  }



  createDocumento(colaborador: Documentos): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v26/dados`,
      colaborador
    );
  }

  getDocumentosList(): Observable<Documentos[]> {
    return this.httpClient.get<Documentos[]>(
      this.url + `/v26/dados`
    );
  }

  getDocumentosColaboradoresList(): Observable<DocumentosColaboradores[]> {
    return this.httpClient.get<DocumentosColaboradores[]>(
      this.url + `/v27/dados`
    );
  }

  createDocumentosColaborador(colaborador: DocumentosColaboradores): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v27/dados`,
      colaborador
    );
  }

 




}
