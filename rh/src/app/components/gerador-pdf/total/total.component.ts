import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Setores, Vinculos } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css'],
})
export class TotalComponent implements OnInit {
  constructor(private siscrhService: SiscrhService) {}

  array: any = [];
  setores: Setores[];
  vinculos: Vinculos[];
  setor: any;
  vinculo: any;

  print: any;

  status: any;
  acessoRede:any

 

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
          return compare(a.nome, b.nome, isAsc);
        case 'setor':
          return compare(a.setor, b.setor, isAsc);
        case 'vinculo':
          return compare(a.vinculo, b.vinculo, isAsc);

        default:
          return 0;
      }
    });
  }
  ngOnInit(): void {
    var randomnumber = Math.floor(Math.random() * (1000 - 5000 + 1)) + 1000;
    this.siscrhService.getSetoresList().subscribe((data: any) => {
      this.setores = data;
    });
    this.siscrhService.getVinculosList().subscribe((data: any) => {
      this.vinculos = data;
    });

    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      /*  console.log(data) */

      for (let i in data) {

        let teste
        if(data[i].dadosPessoais.situacaoColaborador.acessoRede == true){
          teste = "true"
        }else{
          teste = "false"
        }

        let teste2
        if(data[i].dadosPessoais.situacaoColaborador.status == true){
          teste2 = "true"
        }else{
          teste2 = "false"
        }

        if (data[i].setores != null && data[i].vinculos != null) {
          this.array.push({
            nome: data[i].dadosPessoais.nome_completo,
            setor: data[i].setores.setor,
            vinculo: data[i].vinculos.vinculo,
            acessoRede: teste,
            status: teste2,
          });
        } else if (data[i].setores != null && data[i].vinculos == null) {
          this.array.push({
            nome: data[i].dadosPessoais.nome_completo,
            setor: data[i].setores.setor,
            vinculo: 'Não Definido',
            acessoRede: teste,
            status: teste2,
          });
        } else if (data[i].setores == null && data[i].vinculos != null) {
          this.array.push({
            nome: data[i].dadosPessoais.nome_completo,
            setor: 'Não Definido',
            vinculo: data[i].vinculos.vinculo,
            acessoRede: teste,
            status: teste2,
          });
        } else if (data[i].setores == null && data[i].vinculos == null) {
          this.array.push({
            nome: data[i].dadosPessoais.nome_completo,
            setor: 'Não Definido',
            vinculo: 'Não Definido',
            acessoRede: teste,
            status: teste2,
          });
        }
      }
      console.log(this.array)
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
