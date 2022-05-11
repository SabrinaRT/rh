import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DadosProfissionais, Documentos, Vinculos } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

export interface DialogData {
  nome: any;
  id_docu: any;
}
@Component({
  selector: 'app-vinculos',
  templateUrl: './vinculos.component.html',
  styleUrls: ['./vinculos.component.css'],
})
export class VinculosComponent implements OnInit {
  Vinculos: Vinculos[];

  dadosProfissionais: DadosProfissionais[];

  array: any = [];
  array2: any = [];
  array3 = [
    {
      id: 0,
      pessoas: [
        {
          id: 0,
        },
      ],
    },
  ];

  constructor(private siscrhService: SiscrhService, public dialog: MatDialog) {}

  openDialog(id: any, vinculo: any): void {
    const dialogRef = this.dialog.open(EditVinculoDialog, {
      width: '600px',
      data: { id_docu: id, nome: vinculo },
    });
  }

  openDialog2(id: any, vinculo: any): void {
    const dialogRef = this.dialog.open(DeleteVinculoDialog, {
      width: '600px',
      data: { id_docu: id, nome: vinculo },
    });
  }
  n: any;
  ngOnInit(): void {
    this.siscrhService.getVinculosList().subscribe((data) => {
      this.Vinculos = data;
    });
    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      this.dadosProfissionais = data;

      for (let i in this.dadosProfissionais) {
        if (this.dadosProfissionais[i].vinculos != null) {
          this.array.push(this.dadosProfissionais[i].vinculos.id);
        }
      }

      var lucky = 0;
      for (let i in this.Vinculos) {
        lucky = this.array.filter(
          (obj: any) => obj === this.Vinculos[i].id
        ).length;
        console.log(this.Vinculos[i].vinculo + ' - ' + lucky);
        this.array2.push({
          id: this.Vinculos[i].id,
          vinculo: this.Vinculos[i].vinculo,
          count: lucky,
        });
      }
      console.log(this.array2);
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
    this.vinculos.id = this.data.id_docu;
    this.vinculos.vinculo = this.data.nome;
    this.siscrhService.createVinculo(this.vinculos).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}

@Component({
  selector: 'delete-vinculo',
  templateUrl: 'delete-vinculo.html',
})
export class DeleteVinculoDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteVinculoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService
  ) {}

  vinculos: Vinculos = new Vinculos();

  onNoClick(): void {
    this.vinculos.id = this.data.id_docu;
    this.vinculos.vinculo = this.data.nome;
    this.siscrhService.deleteVinculo(this.data.id_docu);
    this.dialogRef.close();
  }
}
