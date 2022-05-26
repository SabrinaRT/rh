import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  constructor(
    private siscrhService: SiscrhService,
    private toastr: ToastrService
  ) {}
  esconder = true;

  Usuarios: Usuarios[];
  usuarios: Usuarios = new Usuarios();

  nome_usuario: any;
  senha: any;
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

        this.toastr.success(
          'Usuário cadastrado com sucesso!',
          'Atenção!'
        );
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
