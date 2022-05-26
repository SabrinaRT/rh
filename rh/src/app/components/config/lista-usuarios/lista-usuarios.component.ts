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
  nivel:any
  Usuarios: Usuarios[];
  usuarios: Usuarios = new Usuarios();

  niveis = [
    { nome_nivel: 'Administrador', id_nivel: 1 },
    { nome_nivel: 'Recursos Humanos', id_nivel: 2 },
    { nome_nivel: 'Informática', id_nivel: 3 },
  ];

  ngOnInit(): void {
    this.siscrhService.getUsuarioList().subscribe((data: any) => {
      this.Usuarios = data;
    });
  }

  salvarStatus(idForeignKey: any, teste: any) {
    this.siscrhService.getUsuarioById(idForeignKey).subscribe((data: any) => {
      console.log(data);
      this.usuarios = data;
      this.usuarios.nivel = teste;
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
          'Perfil atualizado com sucesso!',
          'Dados Atualizados'
        );
      },
      (error) => {
        console.log('error', error);
      }
    );

    /*   let count = 0;
    for (let i in this.teste) {
      if (this.teste[i].id_setor == this.data.id_docu) {
        count++;
      }
    }
    if (count == 0) {
      this.botaoDeletarDisabled = false;
      this.toastr.warning('', 'Vínculo poderá ser deletado!');
    } else {
      this.botaoDeletarDisabled = true;
    } */
  }
}
