import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DadosProfissionais, Setores } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { DialogData } from '../vinculos/vinculos.component';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.css'],
})
export class SetoresComponent implements OnInit {
  setores: Setores[];
  dadosProfissionais: DadosProfissionais[];
  Setor: Setores = new Setores();

  array: any = [];
  DadosAtualizados: any = [];

  constructor(private siscrhService: SiscrhService, public dialog: MatDialog) {}

  openDialog(id: any, setor: any): void {
    const dialogRef = this.dialog.open(EditSetorDialog, {
      data: { id_docu: id, nome: setor },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.carregarDadosSetores();
    });
  }

  openDialog2(id: any, setor: any, qtdTotal: any): void {
    const dialogRef = this.dialog.open(DeleteSetorDialog, {
      width: '800px',
      height: '25vw',
      data: { id_docu: id, nome: setor, qtdTotal: qtdTotal },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.carregarDadosSetores();
    });
  }
  esconder = false;
  ngOnInit(): void {
    this.carregarDadosSetores();
  }

  nomeDocumento: any;
  adicionarTipo() {
    this.Setor.setor = this.nomeDocumento;
    this.siscrhService.createSetor(this.Setor).subscribe((data: any) => {
      this.carregarDadosSetores();
    });
  }

  carregarDadosSetores() {
    this.esconder = false;
    this.siscrhService.getSetoresList().subscribe((data) => {
      this.DadosAtualizados = [];
      this.array = [];
      this.setores = [];
      this.dadosProfissionais = [];
      this.setores = data;
    });
    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      this.dadosProfissionais = data;
      for (let i in this.dadosProfissionais) {
        if (this.dadosProfissionais[i].setores != null) {
          this.array.push(this.dadosProfissionais[i].setores.id);
        }
      }
      var lucky = 0;
      for (let i in this.setores) {
        lucky = this.array.filter(
          (obj: any) => obj === this.setores[i].id
        ).length;
        this.DadosAtualizados.push({
          id: this.setores[i].id,
          setor: this.setores[i].setor,
          count: lucky,
        });
      }
      this.esconder = true;
    });
  }
}

@Component({
  selector: 'edit-setor',
  templateUrl: 'edit-setor.html',
})
export class EditSetorDialog {
  constructor(
    public dialogRef: MatDialogRef<EditSetorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService
  ) {}

  setores: Setores = new Setores();

  onNoClick(): void {
    this.dialogRef.close();
  }

  modificar(){
    this.setores.id = this.data.id_docu
    this.setores.setor = this.data.nome
    this.siscrhService.createSetor(this.setores).subscribe((data:any)=>{console.log(data); this.dialogRef.close();})
  }

}

@Component({
  selector: 'delete-setor',
  styleUrls: ['./setores.component.css'],
  templateUrl: 'delete-setor.html',
})
export class DeleteSetorDialog {
  dadosProfissionais: DadosProfissionais = new DadosProfissionais();
  dadosProfissionais2: DadosProfissionais = new DadosProfissionais();
  setores2: Setores[];
  constructor(
    public dialogRef: MatDialogRef<DeleteSetorDialog>,
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
  esconder = true;
  carregarDados() {
    this.array3 = [];
    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      for (let i in data) {
        if (data[i].setores != null) {
          this.array3.push({
            idpessoa: data[i].dadosPessoais.id,
            nome: data[i].dadosPessoais.nome_completo,
            id_setor: data[i].setores.id,
          });
        }
      }

      this.teste = this.array3.filter(
        (el: any) => el.id_setor == this.data.id_docu
      );
      if (this.teste.length == 0) {
        this.botaoDeletarDisabled = false;
      }
      this.esconder = true;
    });

    this.siscrhService.getSetoresList().subscribe((data: any) => {
      this.setores2 = data;
    });
  }
  array3: any = [];
  teste: any;
  setores: Setores = new Setores();

  onNoClick(): void {
    this.dialogRef.close();
  }
  disabledBotaoEBox = false;
  setor: any;
  definirSetor() {
    this.disabledBotaoEBox = true;
    this.esconder = false;
    for (let i in this.teste) {
      this.siscrhService
        .getDadosProfissionaisByForeignKey(this.teste[i].idpessoa)
        .subscribe((data: any) => {
          this.dadosProfissionais2 = data;
          this.dadosProfissionais2.setores = { id: this.setor };
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
        if (data[i].id_setor == this.data.id_docu) {
          count++;
        }
      }
      if (count == 0) {
        this.teste = [];
        this.botaoDeletarDisabled = false;
        this.esconder = true;
      }
    });
  }

  salvarStatus(idForeignKey: any, teste: any) {
    this.siscrhService

      .getDadosProfissionaisByForeignKey(idForeignKey)
      .subscribe((data: any) => {
        this.dadosProfissionais2 = data;
        this.dadosProfissionais2.setores = { id: teste };
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
    for (let i in this.teste) {
      if (this.teste[i].id_setor == this.data.id_docu) {
        count++;
      }
    }
    if (count == 0) {
      this.botaoDeletarDisabled = false;
      this.toastr.warning('', 'Setor poder?? ser deletado!');
    } else {
      this.botaoDeletarDisabled = true;
    }
  }

  botaoDeletarDisabled = true;

  Deletar() {
    this.siscrhService.deleteSetores(this.data.id_docu);
    this.dialogRef.close();
  }

  statusNull() {
    this.disabledBotaoEBox = true;
    for (let i in this.teste) {
      this.siscrhService
        .getDadosProfissionaisByForeignKey(this.teste[i].idpessoa)
        .subscribe((data: any) => {
          this.dadosProfissionais2 = data;
          data.setores = null;
          this.dadosProfissionais2.setores = data.setores;
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
        if (data[i].id_setor == this.data.id_docu) {
          count++;
        }
      }
      if (count == 0) {
        this.teste = [];
        this.botaoDeletarDisabled = false;
      }
    });
  }
}
