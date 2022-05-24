import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  DadosPessoais,
  Documentos,
  DocumentosColaboradores,
  Vinculos,
} from 'src/app/siscrh';
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
  esconder = false;
  documentos: Documentos = new Documentos();
  DocumentosAtualizados: any = [];
  constructor(private siscrhService: SiscrhService, public dialog: MatDialog) {}

  openDialog(id: any, arquivo: any): void {
    const dialogRef = this.dialog.open(EditArquivoDialog, {
      width: '900px',
      data: { id_docu: id, nome: arquivo },
    });
  }

  openDialog2(id: any, arquivo: any, qtdTotal:any): void {
    
    const dialogRef = this.dialog.open(DeleteArquivoDialog, {
      width: '800px',
      height: '550px',
      data: { id_docu: id, nome: arquivo,  qtdTotal: qtdTotal },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.carregarDados();
    });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  nomeDocumento:any
adicionarTipo(){
  console.log(this.nomeDocumento)
  this.documentos.tipo = this.nomeDocumento
  this.siscrhService.createDocumento(this.documentos).subscribe((data:any)=>{
    console.log(data)
     this.carregarDados();
     this.carregarDados();
  })
}

  carregarDados() {
    this.DocumentosAtualizados = [];
    this.siscrhService.getDocumentosList().subscribe((data) => {
      this.Documentos = data;
      this.DocumentosAtualizados = [];
    });
    this.siscrhService
      .getDocumentosColaboradoresList()
      .subscribe((data: any) => {
        this.DocumentosAtualizados = [];
        for (let index in this.Documentos) {
          var countTotal = 0;
          for (let i in data) {
            if (data[i].tipo == this.Documentos[index].id) {
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

    this.esconder = true;
  }
}

@Component({
  selector: 'delete-arquivo',
  styleUrls: ['./arquivos-config.component.css'],
  templateUrl: 'delete-arquivo.html',
})
export class DeleteArquivoDialog {
  documentos: DocumentosColaboradores[];
  documentos3: DocumentosColaboradores = new DocumentosColaboradores();
  constructor(
    public dialogRef: MatDialogRef<DeleteArquivoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService,
    private toastr: ToastrService
  ) {
    if (this.data.qtdTotal == 0) {
      this.botaoDelete = false;
      this.esconderDiv = true;
    }
    this.siscrhService
      .getDocumentosColaboradoresList()
      .subscribe((data: any) => {
        this.documentos = data;
      });
    this.documentos2 = [];
    this.siscrhService.getColaboradorList().subscribe((data: any) => {
      this.documentos = data;
      for (let i in data) {
        if (data[i].documentosColaboradores.length > 0) {
          for (let i2 in data[i].documentosColaboradores) {
            if (data[i].documentosColaboradores[i2].tipo == this.data.id_docu) {
              this.documentos2.push({
                id: data[i].id,

                id_docu: data[i].documentosColaboradores[i2].tipo,
              });
            }
          }
        }
      }

      
    });
  }
  esconderDiv = false;
  botaoDelete = true;
  documentos2: any = [];

  deletarArquivo() {
    this.siscrhService.deleteDocumento(this.data.id_docu);
    this.dialogRef.close();
  }

  definirOpcional() {
    for (let i in this.documentos2) {
      this.siscrhService
        .getDocumentosColaboradorByForeignKey(this.documentos2[i].id)
        .subscribe((data: any) => {
          for (let i2 in data) {
            if (data[i2].tipo == this.data.id_docu) {
              this.documentos3.id = data[i2].id;
              this.documentos3.nome = data[i2].nome;
              this.documentos3.nome_documento_upload =
                data[i2].nome_documento_upload;
              this.documentos3.dadosPessoais = { id: this.documentos2[i].id };
              this.documentos3.tipo = 1;
              this.siscrhService
                .createDocumentosColaborador(this.documentos3)
                .subscribe((data: any) => {
                  console.log(data);
                });
            }
          }
        });
    }
    this.botaoDelete = false;
  }
}

@Component({
  selector: 'edit-arquivo',
  templateUrl: 'edit-arquivo.html',
})
export class EditArquivoDialog {
  constructor(
    public dialogRef: MatDialogRef<EditArquivoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
