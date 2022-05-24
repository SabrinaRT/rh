import { Component, OnInit } from '@angular/core';
import { RegistroAtividade } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-registro-atividade',
  templateUrl: './registro-atividade.component.html',
  styleUrls: ['./registro-atividade.component.css'],
})
export class RegistroAtividadeComponent implements OnInit {
  RegistroAtividade: RegistroAtividade[];
  constructor(private siscrhService: SiscrhService) {}
  esconder = false;
  ngOnInit(): void {
    this.siscrhService.getRegistroAtividadeList().subscribe((data: any) => {
      this.RegistroAtividade = data;
      this.esconder = true;
    });
  }
}
