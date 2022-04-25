import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosPessoais } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-gerar-pdf-perfil',
  templateUrl: './gerar-pdf-perfil.component.html',
  styleUrls: ['./gerar-pdf-perfil.component.css']
})
export class GerarPdfPerfilComponent implements OnInit {

  dadosPessoais:DadosPessoais = new DadosPessoais();

  constructor(private siscrhService:SiscrhService, private route:ActivatedRoute) {
    this.IDColab = this.route.snapshot.params["id"];
   }
IDColab:any
  ngOnInit(): void {

    this.siscrhService.getColaboradorById(this.IDColab).subscribe((data:any)=>{
      this.dadosPessoais = data
      console.log(this.dadosPessoais)

    })

  }

}
