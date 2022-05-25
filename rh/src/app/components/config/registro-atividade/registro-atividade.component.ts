import { Component, OnInit } from '@angular/core';
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
  constructor(private siscrhService: SiscrhService) {}
  esconder = false;
  ngOnInit(): void {
    this.siscrhService.getRegistroAtividadeList().subscribe((data: any) => {
      this.RegistroAtividade = data;
      this.esconder = true;
    });

    const md5 = new Md5();
    this.siscrhService.verificarUser("sabrina",md5.appendStr('123').end()).subscribe((data:any)=>{
      if(data == null){
        console.log("bloqueado")
        
      }else{
        console.log(data)
      }
    })
  }
}
