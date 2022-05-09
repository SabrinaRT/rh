import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosBancarios, DadosEstadoCivil, DadosPessoais, DadosProfissionais } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-gerar-pdf-perfil',
  templateUrl: './gerar-pdf-perfil.component.html',
  styleUrls: ['./gerar-pdf-perfil.component.css']
})
export class GerarPdfPerfilComponent implements OnInit {

  dadosPessoais:DadosPessoais = new DadosPessoais();
  dadosBancarios:DadosBancarios = new DadosBancarios();
  dadosEstadoCivil: DadosEstadoCivil = new DadosEstadoCivil();
  dadosProfissionais: DadosProfissionais = new DadosProfissionais();

  constructor(private siscrhService:SiscrhService, private route:ActivatedRoute) {
    this.IDColab = this.route.snapshot.params["id"];

  
   }

   

IDColab:any
  ngOnInit(): void {
   
    this.siscrhService.getColaboradorById(this.IDColab).subscribe((data:any)=>{
      this.dadosPessoais = data
      console.log(data)

    })

    this.siscrhService
    .getDadosBancariosByForeignKey(this.IDColab)
    .subscribe((data: any) => {
      if (data != null) {
        this.dadosBancarios = data;
        
      }
    },
    (error) => {
      console.log('error', error);
    });

  this.siscrhService
    .getEstadoCivilByForeignKey(this.IDColab)
    .subscribe((data: any) => {
      if (data != null) {
        this.dadosEstadoCivil = data;

        
      }
    });

  
  this.siscrhService
    .getDadosProfissionaisByForeignKey(this.IDColab)
    .subscribe((data: any) => {
      console.log(data)
      if (data != null) {
        this.dadosProfissionais = data;

        if( this.dadosProfissionais.setores != null){
          this.setor = data.setores.setor;
        }
    
        if(this.dadosProfissionais.vinculos != null){
          this.vinculo = data.vinculos.vinculo;
        }

      }
    },
    (error) => {
      console.log('error', error);
    });
    
  }
  setor:any
  vinculo:any

  print:any

  


}
