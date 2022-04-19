import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { DadosPessoais, DadosProfissionais } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-tabela-colaboradores',
  templateUrl: './tabela-colaboradores.component.html',
  styleUrls: ['./tabela-colaboradores.component.css'],
})
export class TabelaColaboradoresComponent implements OnInit {
  constructor(private siscrhService: SiscrhService) {
  }
  filtro = new FormControl();


  array: any =[];
  teste:any

  ngOnInit(): void {
    //  JUNTAR OS DOIS DADOS EM UM ARRAY

    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      for (let i in data) {
        this.array.push({id:data[i].id, nome:[data[i].dadosPessoais], setor:[data[i].setores], situacao:[data[i].situacaoColaborador]})
      }
      console.log(this.array);
    });
  }
  sortData(sort: Sort) {
    const data = this.array.slice();
    if (!sort.active || sort.direction === '') {
      this.array = data;
      return;
    }

    this.array = data.sort((a:any, b:any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nome':
          return compare(a.nome, b.nome, isAsc);
        case 'setor':
          return compare(a.setor, b.setor, isAsc);
        case 'situacao':
          return compare(a.situacao, b.situacao, isAsc);
        case 'acessoRede':
          return compare(a.acessoRede, b.acessoRede, isAsc);
        default:
          return 0;
      }
    });
  }
  editContact(id:number) {
   console.log(id)

  }
 
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}