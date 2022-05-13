import { Component, OnInit } from '@angular/core';
import { DadosPessoais, Documentos, Setores, Vinculos } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-arquivos-config',
  templateUrl: './arquivos-config.component.html',
  styleUrls: ['./arquivos-config.component.css'],
})
export class ArquivosConfigComponent implements OnInit {
  Documentos: Documentos[];
  DadosPessoais: DadosPessoais[];

  teste: any = [];
  constructor(private siscrhService: SiscrhService) {}

  ngOnInit(): void {
    this.siscrhService.getDocumentosList().subscribe((data) => {
      this.Documentos = data;
    });

    this.siscrhService.getColaboradorList().subscribe((data) => {
      this.DadosPessoais = data;

      let teste = '';
      
      for (let i2 in this.Documentos) {
        let countTotal = 0;
        let countTem = 0;
        let countNTem = 0;
        teste = this.Documentos[i2].tipo;
        for (let i in this.DadosPessoais) {
          if (
            this.DadosPessoais[i].documentosColaboradores.filter(
              (x) => x.tipo === this.Documentos[i2].id
            ).length == 1 
          ) {
            countTotal++;
          }
          if (
            this.DadosPessoais[i].documentosColaboradores.filter(
              (x) => x.tipo === this.Documentos[i2].id && x.status === false
            ).length == 1 
          ) {
            countNTem++;
          }
          if (
            this.DadosPessoais[i].documentosColaboradores.filter(
              (x) => x.tipo === this.Documentos[i2].id && x.status === true
            ).length == 1 
          ) {
            countTem++;
          }
        }
        this.teste.push({
          id:this.Documentos[i2].id,
          nome: this.Documentos[i2].tipo,
          qtdTotal:countTotal,
          qtdTem:countTem,
          qtdNTem:countNTem,

        })
        

        
      }
      

      console.log(this.teste);
    });
  }
}
