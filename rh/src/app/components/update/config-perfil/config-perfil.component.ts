import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosPessoais, DadosProfissionais, SituacaoColaborador } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.component.html',
  styleUrls: ['./config-perfil.component.css']
})
export class ConfigPerfilComponent implements OnInit {
  IDColab:any
  dadosPessoais: DadosPessoais = new DadosPessoais();
  dadosProfissionais:DadosProfissionais = new DadosProfissionais();
  situacaoColaborador:SituacaoColaborador = new SituacaoColaborador();

  constructor(private siscrhService:SiscrhService,  private route: ActivatedRoute) {
    this.IDColab= this.route.snapshot.params["id"];
  
  }

  nome:any
  setor:any;
  vinculo:any;
  acessoRede: any;
  status:any
  id:any
  ngOnInit(): void {
  
    this.siscrhService
      .getColaboradorById(this.IDColab)
      .subscribe((data: any) => {
        if (data != null) {
          this.dadosPessoais = data;

          this.status = this.dadosPessoais.situacaoColaborador.status
         this.acessoRede = this.dadosPessoais.situacaoColaborador.acessoRede
         this.id = data.situacaoColaborador.id
          console.log(this.dadosPessoais.situacaoColaborador.acessoRede)

          
        /*   console.log(data); */
          /* let NomeEsplitado = this.dadosPessoais.nome_completo.split(' ');
          let UltimoNome = NomeEsplitado[NomeEsplitado.length - 1];
          let PrimeiroNome = NomeEsplitado[0];
          this.nome = PrimeiroNome + ' ' + UltimoNome; */
        }
      });

      this.siscrhService.getDadosProfissionaisByForeignKey(this.IDColab).subscribe((data:any)=>
      {
        this.dadosProfissionais = data
        this.setor = data.setores.setor
        this.vinculo = data.vinculos.vinculo
        console.log()
      })
  }
  
salvarStatus(){
  this.situacaoColaborador.id = this.id;
  this.situacaoColaborador.acessoRede = this.acessoRede
  this.situacaoColaborador.status = this.status
  this.situacaoColaborador.dadosPessoais = {id:this.IDColab}
  this.siscrhService.createSituacaoColaborador(this.situacaoColaborador).subscribe((data:any)=>{
    console.log(data)
    
  })
}

}
