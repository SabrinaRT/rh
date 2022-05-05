import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private siscrhService:SiscrhService,  private route: ActivatedRoute, private toastr: ToastrService) {
    this.IDColab= this.route.snapshot.params["id"];
  
  }

  nome:any
  setor:any;
  vinculo:any;
  acessoRede: any;
  status:any
  id:any
  mensagemCodata:any
  mensagemCodataResetSenha:any 
  ngOnInit(): void {
  
    this.siscrhService
      .getColaboradorById(this.IDColab)
      .subscribe((data: any) => {
        if (data != null) {
          this.dadosPessoais = data;

          this.status = this.dadosPessoais.situacaoColaborador.status
         this.acessoRede = this.dadosPessoais.situacaoColaborador.acessoRede
         this.id = data.situacaoColaborador.id
        }
      });

      this.siscrhService.getDadosProfissionaisByForeignKey(this.IDColab).subscribe((data:any)=>
      {
        this.dadosProfissionais = data
        
        if(data.setores != null){
          this.setor = data.setores.setor
        }
        if(data.vinculos != null){
          this.vinculo = data.vinculos.vinculo
        }

        if(this.dadosProfissionais.email_institucional != null){
          this.verificacaoEmail = true
        }else{
          this.verificacaoEmail = false
        }
        this.mensagemCodata =
        'Por gentileza, criar um E-Mail Institucional PBprev para: \nNome Completo: ' + this.dadosPessoais.nome_completo + ' \nCPF: ' + this.dadosPessoais.cpf +'\nSetor: ' + this.setor;
        console.log(this.dadosProfissionais.email_institucional)
        this.mensagemCodataResetSenha =
        'Por gentileza, resetar senha de E-Mail de: \nNome Completo: ' + this.dadosPessoais.nome_completo + ' \nCPF: ' + this.dadosPessoais.cpf +'\nE-Mail Institucional: ' +  this.dadosProfissionais.email_institucional;




      })
  }
  verificacaoEmail:any
  
salvarStatus(){
  this.situacaoColaborador.id = this.id;
  this.situacaoColaborador.acessoRede = this.acessoRede
  this.situacaoColaborador.status = this.status
  this.situacaoColaborador.dadosPessoais = {id:this.IDColab}
  this.siscrhService.createSituacaoColaborador(this.situacaoColaborador).subscribe((data:any)=>{
    
    this.toastr.success( 'Dados Atualizados!');
  },(error) => {
    console.log('error', error);
    this.toastr.error('Houve alguma falha de conexão!', 'Erro!');
  })
}

}
