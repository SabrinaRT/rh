import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DadosProfissionais, Documentos, Vinculos } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

export interface DialogData {
  nome: any;
  id_docu: any;
  qtdTotal: any;
  reload: any;
}
@Component({
  selector: 'app-vinculos',
  templateUrl: './vinculos.component.html',
  styleUrls: ['./vinculos.component.css'],
})
export class VinculosComponent implements OnInit {
  vinculos: Vinculos[];
  dadosProfissionais: DadosProfissionais[];
  Vinculo: Vinculos = new Vinculos();

  array: any = [];
  DadosAtualizados: any = [];

  constructor(private siscrhService: SiscrhService, public dialog: MatDialog) {}

  openDialog(id: any, vinculo: any): void {
    const dialogRef = this.dialog.open(EditVinculoDialog, {
      data: { id_docu: id, nome: vinculo },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.carregarDadosVinculos();
    });
  }

  openDialog2(id: any, vinculo: any, qtdTotal: any): void {
    const dialogRef = this.dialog.open(DeleteVinculoDialog, {
      width: '800px',
      height: '25vw',
      data: { id_docu: id, nome: vinculo, qtdTotal: qtdTotal },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.carregarDadosVinculos();
    });
  }
  esconder = false;
  ngOnInit(): void {
    this.carregarDadosVinculos();
  }

  nomeDocumento: any;
  adicionarTipo() {
    this.Vinculo.vinculo = this.nomeDocumento;
    this.siscrhService.createVinculo(this.Vinculo).subscribe((data: any) => {
      this.carregarDadosVinculos();
    });
  }

  carregarDadosVinculos() {
    this.esconder = false;
    this.siscrhService.getVinculosList().subscribe((data) => {
      this.DadosAtualizados = [];
      this.array = [];
      this.vinculos = [];
      this.dadosProfissionais = [];
      this.vinculos = data;
    });
    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      this.dadosProfissionais = data;
      for (let i in this.dadosProfissionais) {
        if (this.dadosProfissionais[i].vinculos != null) {
          this.array.push(this.dadosProfissionais[i].vinculos.id);
        }
      }
      var lucky = 0;
      for (let i in this.vinculos) {
        lucky = this.array.filter(
          (obj: any) => obj === this.vinculos[i].id
        ).length;
        this.DadosAtualizados.push({
          id: this.vinculos[i].id,
          vinculo: this.vinculos[i].vinculo,
          count: lucky,
        });
      }
      this.esconder = true;
    });
  }
}

@Component({
  selector: 'edit-vinculo',
  templateUrl: 'edit-vinculo.html',
})
export class EditVinculoDialog {
  constructor(
    public dialogRef: MatDialogRef<EditVinculoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService
  ) {
  }

  
  vinculos: Vinculos = new Vinculos();

  onNoClick(): void {
    this.dialogRef.close();
  }

  modificar(){
    this.vinculos.id = this.data.id_docu
    this.vinculos.vinculo = this.data.nome
    this.siscrhService.createVinculo(this.vinculos).subscribe((data:any)=>{console.log(data); this.dialogRef.close();})
  }


}

@Component({
  selector: 'delete-vinculo',
  styleUrls: ['./vinculos.component.css'],
  templateUrl: 'delete-vinculo.html',
})
export class DeleteVinculoDialog {
  dadosProfissionais: DadosProfissionais = new DadosProfissionais();
  dadosProfissionais2: DadosProfissionais = new DadosProfissionais();
  vinculos2: Vinculos[];
  constructor(
    public dialogRef: MatDialogRef<DeleteVinculoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService,
    private toastr: ToastrService
  ) {
    if (this.data.qtdTotal > 0) {
      this.carregarDados();
      this.esconderOpcao = false;
      this.botaoDeletarDisabled = true;
    } else {
      this.esconderOpcao = true;
      this.botaoDeletarDisabled = false;
    }
  }
  esconderOpcao = true;
  carregarDados() {
    this.array3 = [];
    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      for (let i in data) {
        if (data[i].vinculos != null) {
          this.array3.push({
            idpessoa: data[i].dadosPessoais.id,
            nome: data[i].dadosPessoais.nome_completo,
            id_vinculo: data[i].vinculos.id,
          });
        }
      }

      this.dadosAtualizados = this.array3.filter(
        (el: any) => el.id_vinculo == this.data.id_docu
      );
      if (this.dadosAtualizados.length == 0) {
        this.botaoDeletarDisabled = false;
      }
      this.esconder = true;
    });

    this.siscrhService.getVinculosList().subscribe((data: any) => {
      this.vinculos2 = data;
    });
  }

  vinculo: any;
  definirSetor() {
    this.disabledBotaoEBox = true;
    this.esconder = false;
    for (let i in this.dadosAtualizados) {
      this.siscrhService
        .getDadosProfissionaisByForeignKey(this.dadosAtualizados[i].idpessoa)
        .subscribe((data: any) => {
          this.dadosProfissionais2 = data;
          this.dadosProfissionais2.vinculos = { id: this.vinculo };
          this.siscrhService
            .createDadosProfissionais(this.dadosProfissionais2)
            .subscribe(
              (data: any) => {},
              (error) => {
                console.log('error', error);
              }
            );
        });
    }

    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      let count = 0;
      for (let i in data) {
        if (data[i].id_vinculo == this.data.id_docu) {
          count++;
        }
      }
      if (count == 0) {
        this.dadosAtualizados = [];
        this.botaoDeletarDisabled = false;
        this.esconder = true;
      }
    });
  }
  disabledBotaoEBox = false;
  array3: any = [];
  dadosAtualizados: any;
  vinculos: Vinculos = new Vinculos();
  esconder = false;
  onNoClick(): void {
    this.dialogRef.close(this.data.reload);
  }

  salvarStatus(idForeignKey: any, idChave: any) {
    this.siscrhService

      .getDadosProfissionaisByForeignKey(idForeignKey)
      .subscribe((data: any) => {
        this.dadosProfissionais2 = data;
        this.dadosProfissionais2.vinculos = { id: idChave };
        this.siscrhService
          .createDadosProfissionais(this.dadosProfissionais2)
          .subscribe(
            (data: any) => {
              this.toastr.success(
                'Perfil atualizado com sucesso!',
                'Dados Atualizados'
              );
            },
            (error) => {
              console.log('error', error);
            }
          );
      });

    this.siscrhService
      .getColaboradorById(idForeignKey)
      .subscribe((data: any) => {});

    let count = 0;
    for (let i in this.dadosAtualizados) {
      if (this.dadosAtualizados[i].id_vinculo == this.data.id_docu) {
        count++;
      }
    }
    if (count == 0) {
      this.botaoDeletarDisabled = false;
      this.toastr.warning('', 'Vínculo poderá ser deletado!');
    } else {
      this.botaoDeletarDisabled = true;
    }
  }

  botaoDeletarDisabled = true;

  Deletar() {
    this.siscrhService.deleteVinculo(this.data.id_docu);
    this.dialogRef.close();
  }

  statusNull() {
    for (let i in this.dadosAtualizados) {
      this.siscrhService
        .getDadosProfissionaisByForeignKey(this.dadosAtualizados[i].idpessoa)
        .subscribe((data: any) => {
          this.dadosProfissionais2 = data;
          data.vinculos = null;
          this.dadosProfissionais2.vinculos = data.vinculos;
          this.siscrhService
            .createDadosProfissionais(this.dadosProfissionais2)
            .subscribe(
              (data: any) => {},
              (error) => {
                console.log('error', error);
              }
            );
        });
      this.disabledBotaoEBox = true;
    }

    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      let count = 0;
      for (let i in data) {
        if (data[i].id_vinculo == this.data.id_docu) {
          count++;
        }
      }
      if (count == 0) {
        this.dadosAtualizados = [];
        this.botaoDeletarDisabled = false;
      }
    });
  }
}
