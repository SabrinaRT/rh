import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import {
  RegistroAtividade,
  RegistroAtividadeCadastro,
  Usuarios,
} from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { Md5 } from 'ts-md5';
import { RegistroAtividadeComponent } from '../registro-atividade/registro-atividade.component';

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
    public dialog: MatDialog,
    private router: Router,

  
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
  private subject = new Subject<any>();
  sendMessage(message: string) {
    this.subject.next({ text: message });
}
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
    private siscrhService: SiscrhService,
    private toastr: ToastrService,
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
  styleUrls: ['./lista-usuarios.component.css'],
  templateUrl: 'delete-usuario.html',
})
export class DeleteUsuarioDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteUsuarioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private siscrhService: SiscrhService,
    private toastr: ToastrService
  ) {
    this.atualizarDados();
  }
  registroAtividadesAtt: RegistroAtividadeCadastro[];

  botaoOff = true;

  esconderDiv1 = true;
  esconderDiv2 = true;
  esconderDiv3 = true;

  usuario_novo: any;
  esconder = false;

  atualizarDados() {
    this.registroAtividadesAtt = [];
    this.siscrhService
      .getUsuarioCAndUsuarioUListById(this.data.id)
      .subscribe((data: any) => {
        this.registroAtividadesAtt = data;
        if (this.registroAtividadesAtt.length > 0) {
          this.esconderDiv1 = false;
          this.esconderDiv2 = true;
          this.esconderDiv3 = true;
          this.botaoOff = true;
        } else {
          this.esconderDiv1 = true;
          this.esconderDiv2 = true;
          this.esconderDiv3 = false;
          this.botaoOff = false;
        }
        this.esconder = true;
      });
  }
  alterarAtividades() {
    this.esconder = false;
    var count = 0;
    do {
      for (let i in this.registroAtividadesAtt) {
        if (this.registroAtividadesAtt[i].usuarioC.id == this.data.id) {
          this.registroAtividadesAtt[i].usuarioC = {
            id: this.usuario_novo,
          };
          this.siscrhService
            .createRegistroAtividade(this.registroAtividadesAtt[i])
            .subscribe((data: any) => {});
        }

        if (this.registroAtividadesAtt[i].usuarioU.id == this.data.id) {
          this.registroAtividadesAtt[i].usuarioU = {
            id: this.usuario_novo,
          };
          this.siscrhService
            .createRegistroAtividade(this.registroAtividadesAtt[i])
            .subscribe((data: any) => {});
        }
      }
      this.siscrhService
        .getUsuarioCAndUsuarioUListById(this.data.id)
        .subscribe((data: any) => {
          if (data.length > 0) {
            count++;
          }
        });
    } while (count > 0);
    {
      count++;

      this.siscrhService
        .getUsuarioCAndUsuarioUListById(this.data.id)
        .subscribe((data: any) => {
          if (data.length > 0) {
            this.registroAtividadesAtt = [];
            this.registroAtividadesAtt = data;

            for (let i in this.registroAtividadesAtt) {
              if (this.registroAtividadesAtt[i].usuarioC.id == this.data.id) {
                this.registroAtividadesAtt[i].usuarioC = {
                  id: this.usuario_novo,
                };
                this.siscrhService
                  .createRegistroAtividade(this.registroAtividadesAtt[i])
                  .subscribe((data: any) => {});
              }

              if (this.registroAtividadesAtt[i].usuarioU.id == this.data.id) {
                this.registroAtividadesAtt[i].usuarioU = {
                  id: this.usuario_novo,
                };
                this.siscrhService
                  .createRegistroAtividade(this.registroAtividadesAtt[i])
                  .subscribe((data: any) => {});
              }
            }
          }

          this.esconderDiv1 = true;
          this.esconderDiv2 = true;
          this.esconderDiv3 = false;
          this.botaoOff = false;
          this.esconder = true;
        });
    }
  }

  deleteUser() {
    this.siscrhService.deleteUsuario(this.data.id);
    this.toastr.success('Usuário deletado com sucesso!', 'Atenção!');
    this.dialogRef.close();

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
