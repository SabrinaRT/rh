import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DadosPessoais, Documentos, Vinculos } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { DialogData } from '../vinculos/vinculos.component';

@Component({
  selector: 'app-arquivos-config',
  templateUrl: './arquivos-config.component.html',
  styleUrls: ['./arquivos-config.component.css'],
})
export class ArquivosConfigComponent implements OnInit {
  Documentos: Documentos[];
  DadosPessoais: DadosPessoais[];

  DocumentosAtualizados: any = [];
  constructor(private siscrhService: SiscrhService) {}

  ngOnInit(): void {
    this.siscrhService.getDocumentosList().subscribe((data) => {
      this.Documentos = data;
    });

    this.siscrhService.getColaboradorList().subscribe((data) => {
      this.DadosPessoais = data;

      for (let index in this.Documentos) {
        let countTotal = 0;
        let countTem = 0;
        let countNTem = 0;

        for (let index2 in this.DadosPessoais) {
          if (
            this.DadosPessoais[index2].documentosColaboradores.filter(
              (x) => x.tipo === this.Documentos[index].id
            ).length == 1
          ) {
            countTotal++;
          }
         
        }
        this.DocumentosAtualizados.push({
          id: this.Documentos[index].id,
          nome: this.Documentos[index].tipo,
          qtdTotal: countTotal,
        });
      }

    });
  }
}



@Component({
  selector: 'delete-arquivo',
  styleUrls: ['./arquivos-config.component.css'],
  templateUrl: 'delete-arquivo.html',
})
export class DeleteArquivoDialog {
  dadosPessoais: DadosPessoais = new DadosPessoais();
  dadosPessoais2: DadosPessoais = new DadosPessoais();
  documetos2: Documentos[];
  constructor(
    public dialogRef: MatDialogRef<DeleteArquivoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService,
    private toastr: ToastrService
  ) {


   
  }

}

