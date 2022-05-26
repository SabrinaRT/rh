import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroAtividade } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-registro-atividade',
  templateUrl: './registro-atividade.component.html',
  styleUrls: ['./registro-atividade.component.css'],
})
export class RegistroAtividadeComponent implements OnInit {
  RegistroAtividade: RegistroAtividade[];
  constructor(
    private siscrhService: SiscrhService,
    private route: ActivatedRoute
  ) {
    this.idUser = this.route.snapshot.params['idUser'];
  }
  idUser: any;
  searchValue:any
  esconder = false;
  ngOnInit(): void {
    this.siscrhService.getRegistroAtividadeList().subscribe((data: any) => {
      this.RegistroAtividade = data;
      this.esconder = true;
    });
  }
}
