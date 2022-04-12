import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DadosBancarios, DadosPessoais, DadosProfissionais, DadosEstadoCivil, Dependentes } from './siscrh';

@Injectable({
  providedIn: 'root',
})
export class SiscrhService {
  constructor(private httpClient: HttpClient) {}

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

  getColaboradorByName(cpf: String): Observable<DadosPessoais> {
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

  getEstadoCivilById(id: number): Observable<DadosEstadoCivil> {
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

  getDadosProfissionaisById(id: number): Observable<DadosProfissionais> {
    return this.httpClient.get<DadosProfissionais>(
      this.url + `/v6/dados/${id}`
    );
  }

  createDadosBancarios(colaborador: DadosBancarios): Observable<Object> {
    return this.httpClient.post(
      this.url + `/v4/dados`,
      colaborador
    );
  }

  getDadosBancariosById(id: number): Observable<DadosBancarios> {
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

  getDependentesById(id: number): Observable<Dependentes> {
    return this.httpClient.get<Dependentes>(
      this.url + `/v3/dados/${id}`
    );
  }






}
