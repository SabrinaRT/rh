import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import {
  DadosPessoais,
  DadosProfissionais,
  Documentos,
  DocumentosColaboradores,
  SituacaoColaborador,
  TabelaInicial,
} from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { FichaComponent } from '../../cadastro/ficha/ficha.component';

@Component({
  selector: 'app-tabela-colaboradores',
  templateUrl: './tabela-colaboradores.component.html',
  styleUrls: ['./tabela-colaboradores.component.css'],
})
export class TabelaColaboradoresComponent implements OnInit {
  constructor(
    private siscrhService: SiscrhService,
    private toastr: ToastrService
  ) {}

  filtro = new FormControl();
  searchValue: any;
  DocumentosColaboradores: DocumentosColaboradores =
    new DocumentosColaboradores();

  TiposDocumentos: Documentos[];
  TabelaInicial: TabelaInicial[];
  array: any = [];
  ngOnInit(): void {
    this.siscrhService.getDocumentosList().subscribe(
      (data: any) => {
        this.TiposDocumentos = data;
      },
      (error) => {
        console.log('error', error);
      }
    );
    this.siscrhService.getDadosProfissionaisList().subscribe(
      (data: any) => {
        for (let i in data) {
          if (data[i].setores != null) {
            this.array.push({
              id: data[i].dadosPessoais.id,
              nome: data[i].dadosPessoais.nome_completo,
              setor: data[i].setores.setor,
              status: data[i].dadosPessoais.situacaoColaborador.status,
              acessoRede: data[i].dadosPessoais.situacaoColaborador.acessoRede,
            });
          } else {
            this.array.push({
              id: data[i].dadosPessoais.id,
              nome: data[i].dadosPessoais.nome_completo,
              setor: 'Não Definido',
              status: data[i].dadosPessoais.situacaoColaborador.status,
              acessoRede: data[i].dadosPessoais.situacaoColaborador.acessoRede,
            });
          }
        }

        this.TabelaInicial = this.array;
        this.esconder =true 
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve uma falha de conexão!', 'Erro!');
      }
    );
  }
  sortData(sort: Sort) {
    const data = this.array.slice();
    if (!sort.active || sort.direction === '') {
      this.array = data;
      return;
    }

    this.array = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nome':
          return compare2(a.nome, b.nome, isAsc);
        case 'setor':
          return compare2(a.setor, b.setor, isAsc);
        case 'situacao':
          return compare2(a.situacao, b.situacao, isAsc);
        case 'acessoRede':
          return compare2(a.acessoRede, b.acessoRede, isAsc);
        default:
          return 0;
      }
    });
  }
  esconder = false
  editContact(id: number) {
    /* console.log(id); */
  }
}
function compare2(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
