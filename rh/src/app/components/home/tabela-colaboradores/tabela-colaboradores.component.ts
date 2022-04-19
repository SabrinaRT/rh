import { Component, OnInit } from '@angular/core';
import { DadosPessoais, DadosProfissionais } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-tabela-colaboradores',
  templateUrl: './tabela-colaboradores.component.html',
  styleUrls: ['./tabela-colaboradores.component.css'],
})
export class TabelaColaboradoresComponent implements OnInit {
  constructor(private siscrhService: SiscrhService) {}
  DadosPessoais: DadosPessoais[];
  DadosProfissionais: DadosProfissionais[];

  array: any =[];

  ngOnInit(): void {
    //  JUNTAR OS DOIS DADOS EM UM ARRAY

    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      this.DadosProfissionais = data;
      /* console.log(data) */

      for (let i in data) {
        this.array.push({id:data[i].id, nome:[data[i].dadosPessoais], setor:[data[i].setores], situacao:[data[i].situacaoColaborador]})
      }
      console.log(this.array);
    });
  }
}
