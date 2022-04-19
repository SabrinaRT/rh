import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { DadosPessoais, DadosProfissionais } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
export interface DialogData {
  nome: string;
  id: string;

}
@Component({
  selector: 'app-tabela-colaboradores',
  templateUrl: './tabela-colaboradores.component.html',
  styleUrls: ['./tabela-colaboradores.component.css'],
})
export class TabelaColaboradoresComponent implements OnInit {

  nome: string;
  id: string;

  constructor(public dialog: MatDialog,private siscrhService: SiscrhService) {}

  openDialog(id:any): void {


    console.log(this.array[0].nome.nome_completo)
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '1500px',
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nome = result;
    });
  }

  filtro = new FormControl();

array2 : any =[]
  array: any =[];
  teste:any

  ngOnInit(): void {
    
  

    this.siscrhService.getDadosProfissionaisList().subscribe((data: any) => {
      console.log(data[0].dadosPessoais.nome_completo)
      for (let i in data) {
        this.array.push({id:data[i].id, nome:data[i].dadosPessoais.nome_completo, setor:data[i].setores.setor, situacao:[data[i].situacaoColaborador]})
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  editAcesso(){

  }
  editStatus(){

  }
  editPerfil(){

  }
  baixarArquivo(){

  }
  email(){

  }
  arquivos(){}
}