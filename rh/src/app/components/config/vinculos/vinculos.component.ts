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

  array: any = [];
  array2: any = [];

  constructor(private siscrhService: SiscrhService, public dialog: MatDialog) {}

  openDialog(id: any, vinculo: any): void {
    const dialogRef = this.dialog.open(EditVinculoDialog, {
      width: '600px',
      data: { id_docu: id, nome: vinculo },
    });
  }

  openDialog2(id: any, vinculo: any): void {
    const dialogRef = this.dialog.open(DeleteVinculoDialog, {
      width: '900px',
      height: '550px',
      data: { id_docu: id, nome: vinculo },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.carregarDadosVinculos();
    });
  }
esconder = false
  ngOnInit(): void {
    this.carregarDadosVinculos();
  }

  carregarDadosVinculos() {
    this.array2 = [];
    this.array = [];
    this.vinculos = [];
    this.dadosProfissionais = [];
    this.esconder = false
    this.siscrhService.getVinculosList().subscribe((data) => {
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
        this.array2.push({
          id: this.vinculos[i].id,
          vinculo: this.vinculos[i].vinculo,
          count: lucky,
        });
      }
      this.esconder = true
    });
  }

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  // example
  go() {
    this.viewport.scrollToIndex(23);
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
  ) {}

  vinculos: Vinculos = new Vinculos();

  onNoClick(): void {
    this.dialogRef.close();
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
    this.carregarDados();
  }

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
      
      this.teste = this.array3.filter(
        (el: any) => el.id_vinculo == this.data.id_docu
        
      );
      if(this.teste.length == 0){
        this.botaoDeletarDisabled = false
      }
      this.esconder =true 
    });

    
    this.siscrhService.getVinculosList().subscribe((data: any) => {
      this.vinculos2 = data;
    });
  }

  vinculo:any
  definirSetor(){
    this.disabledBotaoEBox = true
this.esconder =false
    for (let i in this.teste) {
      this.siscrhService
        .getDadosProfissionaisByForeignKey(this.teste[i].idpessoa)
        .subscribe((data: any) => {
          this.dadosProfissionais2 = data;
          this.dadosProfissionais2.vinculos = {id: this.vinculo};
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
        this.teste = [];
        this.botaoDeletarDisabled = false;
        this.esconder =true
      }
    });

  }
  disabledBotaoEBox= false



  array3: any = [];
  teste: any;
  vinculos: Vinculos = new Vinculos();

  esconder = false
  onNoClick(): void {
    this.dialogRef.close(this.data.reload);
  }

  salvarStatus(idForeignKey: any, teste: any) {
    this.siscrhService

      .getDadosProfissionaisByForeignKey(idForeignKey)
      .subscribe((data: any) => {
        this.dadosProfissionais2 = data;
        this.dadosProfissionais2.vinculos = { id: teste };
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
      if (this.teste[i].id_vinculo == this.data.id_docu) {
        count++;
      }
    }
    if (count == 0) {
      this.botaoDeletarDisabled = false;
      this.toastr.warning(
        "",
        'Vínculo poderá ser deletado!'
      );
    }else{
      this.botaoDeletarDisabled = true;
    }
  }

  botaoDeletarDisabled = true;

  Deletar() {
    this.siscrhService.deleteVinculo(this.data.id_docu);
    this.dialogRef.close();
  }

  statusNull() {
    for (let i in this.teste) {
      this.siscrhService
        .getDadosProfissionaisByForeignKey(this.teste[i].idpessoa)
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
    }

    this.siscrhService.getDadosProfissionaisList().subscribe((data:any)=>{

      let count = 0;
    for (let i in data) {
      if (data[i].id_vinculo == this.data.id_docu) {
        count++;
      }
    }
    if (count == 0) {
      this.teste = [];
      this.botaoDeletarDisabled = false;
    }
    })
   
  
    
  }
}
