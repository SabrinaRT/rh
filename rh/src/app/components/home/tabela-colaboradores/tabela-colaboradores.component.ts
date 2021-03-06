import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  DocumentosColaboradores,
  TabelaInicial,
  Setores,
  Vinculos,
} from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-tabela-colaboradores',
  templateUrl: './tabela-colaboradores.component.html',
  styleUrls: ['./tabela-colaboradores.component.css'],
})
export class TabelaColaboradoresComponent implements OnInit {
  constructor(
    private siscrhService: SiscrhService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.idUser = this.route.snapshot.params['idUser'];
    
    
  }
  DocumentosColaboradores: DocumentosColaboradores =
    new DocumentosColaboradores();
  TabelaInicial: TabelaInicial[];
  array: any = [];
  setores: Setores[];
  vinculos: Vinculos[];
  acessoValue: any;
  situacaoValue: any;
  idUser: any;
  searchValue: any;
  setor: any;
  vinculo: any;
  esconder = false;
  situacao = [
    { status: 'Todos', value: 'Todos' },
    { status: 'Ativo', value: true },
    { status: 'Desativo', value: false },
  ];
  acesso = [
    { status: 'Todos', value: 'Todos' },
    { status: 'Ativo', value: true },
    { status: 'Desativo', value: false },
  ];

  ngOnInit(): void {
    
    this.siscrhService.getSetoresList().subscribe((data: any) => {
      this.setores = data;
    });
    this.siscrhService.getVinculosList().subscribe((data: any) => {
      this.vinculos = data;
    });

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
              setor: 'N??o Definido',
              status: data[i].dadosPessoais.situacaoColaborador.status,
              acessoRede: data[i].dadosPessoais.situacaoColaborador.acessoRede,
            });
          }
        }

        this.TabelaInicial = this.array;
        this.esconder = true;
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve uma falha de conex??o!', 'Erro!');
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
}
function compare2(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
