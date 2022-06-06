import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DadosPessoais, DadosProfissionais, FotoColaborador, SituacaoColaborador } from 'src/app/siscrh';
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

  constructor(private siscrhService:SiscrhService,  private route: ActivatedRoute, private toastr: ToastrService,private router: Router) {
    this.IDColab= this.route.snapshot.params["id"];
    this.idUser = this.route.snapshot.params["idUser"];
  
  }
  idUser:any

  nome:any
  setor:any;
  vinculo:any;
  acessoRede: any;
  status:any
  id:any
  mensagemCodata:any
  mensagemCodataResetSenha:any 

  FotoPerfil=true
  IdFoto:any
  UrlFoto:any
  ngOnInit(): void {

    this.siscrhService.getFotoInfo(this.IDColab).subscribe((data:any)=>{
      this.IdFoto =data.id
      this.UrlFoto = "http://localhost:8080/api/v305/get/image/"+this.IDColab
     
    },(error) => {
      this.FotoPerfil = false
      
    })
  
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

enviarEmailRhDesativar(){
  this.toastr.warning('Estamos enviando a solicitação para a equipe GINF...', 'Aguarde!');
  this.siscrhService.enviarEmailRhDesativar(this.IDColab).subscribe((data:any)=>{
  this.toastr.success('Solicitação enviada com sucesso!', 'Atenção!');
  },
  (error) => {
    console.log('error', error);
    this.toastr.error('Houve algum erro!', 'Erro!');
  })
}

enviarEmailRhAtivar(){
  this.toastr.warning('Estamos enviando a solicitação para a equipe GINF...', 'Aguarde!');
  this.siscrhService.enviarEmailRhAtivar(this.IDColab).subscribe((data:any)=>{
  this.toastr.success('Solicitação enviada com sucesso!', 'Atenção!');
  },
  (error) => {
    console.log('error', error);
    this.toastr.error('Houve algum erro!', 'Erro!');
  })
}

enviarEmailInformaticaAtivo(){
  this.toastr.warning('Estamos enviando enviando o e-mail...', 'Aguarde!');
  this.siscrhService.enviarEmailInformaticaAtivo(this.IDColab).subscribe((data:any)=>{
  this.toastr.success('E-Mail enviado com sucesso!', 'Atenção!');
  },
  (error) => {
    console.log('error', error);
    this.toastr.error('Houve algum erro!', 'Erro!');
  })
}

enviarEmailInformaticaDesativo(){
  this.toastr.warning('Estamos enviando o e-mail...', 'Aguarde!');
  this.siscrhService.enviarEmailInformaticaDesativo(this.IDColab).subscribe((data:any)=>{
  this.toastr.success('E-Mail enviado com sucesso!', 'Atenção!');
  },
  (error) => {
    console.log('error', error);
    this.toastr.error('Houve algum erro!', 'Erro!');
  })
}

downloadFoto(){

  
  this.siscrhService.getFotoInfo(this.IDColab).subscribe((data:any)=>{
    console.log(data)
    var gh  = "data:image/png;base64,"+ data.image
    var a  = document.createElement('a');
    a.href = gh;
    a.download = 'fotoPerfil - ' + this.dadosPessoais.nome_completo +".png";

    a.click()
  })
  
}

fotoColaborador: FotoColaborador = new FotoColaborador();
upload(event: any) {
  if (event.target.files && event.target.files[0]) {
    
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, event.target.files[0].name);
    this.fotoColaborador.image = formData
    this.fotoColaborador.dadosPessoais = { id: this.IDColab };
    this.siscrhService.uploadFotoColaborador(formData, this.IDColab).subscribe(
      (data: any) => {
        console.log(data);
        this.fotoColaborador.id = data.id
        this.UrlFoto = "http://localhost:8080/api/v305/get/image/"+this.IDColab
        this.FotoPerfil = true
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
}
