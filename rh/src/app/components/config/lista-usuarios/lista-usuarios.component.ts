import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {  RegistroAtividadeCadastro, Usuarios } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { Md5 } from 'ts-md5';

export interface DialogData {
  id: any;
  nome: any;
  nivel: any;
  users: any;
}
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  constructor(
    private siscrhService: SiscrhService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  esconder = true;

  Usuarios: Usuarios[];
  usuarios: Usuarios = new Usuarios();

  nome_usuario: any = null;
  senha: any = null;
  nivel: any;

  niveis = [
    { nome_nivel: 'Administrador', id_nivel: 1 },
    { nome_nivel: 'Recursos Humanos', id_nivel: 2 },
    { nome_nivel: 'Informática', id_nivel: 3 },
  ];

  ngOnInit(): void {
    this.atualizarDados();
  }

  atualizarDados() {
    this.Usuarios = [];
    this.siscrhService.getUsuarioList().subscribe((data: any) => {
      this.Usuarios = data;
    });
  }

  botaoOff = true;
  comparando() {
    if (
      this.senha != null &&
      this.nome_usuario != null &&
      this.nome_usuario.length > 0 &&
      this.senha.length > 0 &&
      this.nivel != null
    ) {
      if (
        this.Usuarios.findIndex(
          (x) =>
            x.usuario === this.nome_usuario.toUpperCase() ||
            x.usuario === this.nome_usuario.toLocaleLowerCase() ||
            x.usuario === this.nome_usuario
        ) != -1
      ) {
        console.log('Entrou 1');
        this.botaoOff = true;
      } else {
        this.botaoOff = false;
      }
    } else {
      this.botaoOff = true;
    }
  }

  createUser() {
    this.usuarios.usuario = this.nome_usuario;
    this.usuarios.senha = this.senha;
    this.usuarios.nivel = this.nivel;
    this.siscrhService.createUsuario(this.usuarios).subscribe(
      (data: any) => {
        console.log(data);
        this.toastr.success(
          'Perfil atualizado com sucesso!',
          'Dados Atualizados'
        );
        this.atualizarDados();
        this.nome_usuario = null;
        this.senha = null;
        this.nivel = null;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  deleteUser(idForeignKey: any) {
    this.siscrhService.deleteUsuario(idForeignKey);
    this.atualizarDados();
    this.atualizarDados();
    this.siscrhService.getUsuarioById(idForeignKey).subscribe(
      (data: any) => {},
      (error) => {
        console.log('error', error);
        this.toastr.success('Usuário deletado com sucesso!', 'Atenção!');
      }
    );
  }
  salvarStatus(idForeignKey: any, nivel: any) {
    this.siscrhService.getUsuarioById(idForeignKey).subscribe((data: any) => {
      console.log(data);
      this.usuarios = data;
      this.usuarios.nivel = nivel;
      this.siscrhService.createUsuario(this.usuarios).subscribe(
        (data: any) => {
          console.log(data);
        },
        (error) => {
          console.log('error', error);
        }
      );
    });

    this.siscrhService.getUsuarioById(idForeignKey).subscribe(
      (data: any) => {
        console.log(data);

        this.toastr.success('Usuário cadastrado com sucesso!', 'Atenção!');
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  openDialog(id: any, nome: any, nivel: any): void {
    const dialogRef = this.dialog.open(EditUsuarioDialog, {
      data: { id: id, nome: nome, nivel: nivel, users: this.Usuarios },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.atualizarDados();
    });
  }

  openDialog2(id: any, nome: any, nivel: any): void {
    const dialogRef = this.dialog.open(DeleteUsuarioDialog, {
      data: { id: id, nome: nome, nivel: nivel, users: this.Usuarios },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.atualizarDados();
    });
  }
}

@Component({
  selector: 'edit-usuario',
  templateUrl: 'edit-usuario.html',
})
export class EditUsuarioDialog {
  constructor(
    public dialogRef: MatDialogRef<EditUsuarioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService
  ) {}

  usuario: Usuarios = new Usuarios();
  senha: any;

  salvarUsuario() {
    const md5 = new Md5();
    this.usuario.id = this.data.id;
    this.usuario.senha = md5.appendStr(this.senha).end();
    this.usuario.usuario = this.data.nome;
    this.usuario.nivel = this.data.nivel;
    this.siscrhService.createUsuario(this.usuario).subscribe((data: any) => {
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  botaoOff = true;
  comparando() {
    if (
      this.senha != null &&
      this.data.nome != null &&
      this.data.nome.length > 0 &&
      this.senha.length > 0
    ) {
      if (
        this.data.users.findIndex(
          (x: any) =>
            x.usuario === this.data.nome.toUpperCase() ||
            x.usuario === this.data.nome.toLocaleLowerCase() ||
            x.usuario === this.data.nome
        ) != -1
      ) {
        this.botaoOff = true;
      } else {
        this.botaoOff = false;
      }
    } else {
      this.botaoOff = true;
    }
  }
}

@Component({
  selector: 'delete-usuario',
  templateUrl: 'delete-usuario.html',
})
export class DeleteUsuarioDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteUsuarioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService
  ) {

    this.siscrhService.getRegistroAtividadeList().subscribe((data:any) =>{
      console.log(data)
      this.registroAtividades = data

      console.log(this.registroAtividades.findIndex((b)=>{ b.usuario_u.id === this.data.id}))

      var count = 0
      for(let i in this.registroAtividades){
        if(this.registroAtividades[i].usuario_c.id == this.data.id )
        {
          console.log("encontrou")
          this.botaoOff = true
          count++
        }
      }
      console.log(count)
    })
  }

  registroAtividades : RegistroAtividadeCadastro [];
  botaoOff = true



  /*   onNoClick(): void {
    this.dialogRef.close();
  } */
}
